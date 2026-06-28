const BASE_URL = (process.env.BASE_URL || "").replace(/\/+$/, "");
if (!BASE_URL) {
  console.error("Usage: BASE_URL=https://zerodha-api.onrender.com node smoke-test.mjs");
  process.exit(1);
}

const TEST_USER = {
  name: `Test User ${Date.now()}`,
  email: `smoke-${Date.now()}@test.zerodha`,
  phone: `99999${String(Date.now()).slice(-5)}`,
  password: "TestPass123!",
};

let token = null;
let userId = null;
let testStock = "AAPL";
let buyOrder = null;

const results = [];
let passed = 0;
let failed = 0;

function assert(condition, label, detail) {
  if (condition) {
    passed++;
    results.push({ status: "PASS", label, detail: detail || "" });
  } else {
    failed++;
    results.push({ status: "FAIL", label, detail: detail || "" });
  }
}

async function api(method, path, opts = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  let body;
  try {
    body = await res.json();
  } catch {
    body = null;
  }
  return { status: res.status, body, res };
}

async function run() {
  console.log(`\n═══════════════════════════════════════════`);
  console.log(`  ZERODHA PRODUCTION SMOKE TESTS`);
  console.log(`  Target: ${BASE_URL}`);
  console.log(`  User:   ${TEST_USER.email}`);
  console.log(`═══════════════════════════════════════════\n`);

  // ── 1. Health ──────────────────────────────────────
  console.log("── 1. Health Check ───────────────────────");
  {
    const { status, body } = await api("GET", "/health");
    assert(status === 200, "GET /health → 200", `Got ${status}`);
    assert(body?.status === "ok", "/health returns status ok", JSON.stringify(body));
  }

  // ── 2. Signup ──────────────────────────────────────
  console.log("\n── 2. Signup ──────────────────────────────");
  {
    const { status, body } = await api("POST", "/api/auth/signup", {
      body: TEST_USER,
    });
    assert(status === 201, "POST /api/auth/signup → 201", `Got ${status}`);
    assert(!!body?.token, "Response includes token", "token length: " + (body?.token?.length || 0));
    assert(body?.user?.name === TEST_USER.name, "Response includes user.name", body?.user?.name);
    assert(body?.user?.email === TEST_USER.email, "Response includes user.email", body?.user?.email);
    assert(!!body?.user?._id, "Response includes user._id", body?.user?._id);
    token = body.token;
    userId = body.user._id;
  }

  // ── 3. Duplicate signup rejected ──────────────────
  console.log("\n── 3. Duplicate Signup ────────────────────");
  {
    const { status } = await api("POST", "/api/auth/signup", { body: TEST_USER });
    assert(status === 409, "POST /api/auth/signup (dup) → 409", `Got ${status}`);
  }

  // ── 4. Login ───────────────────────────────────────
  console.log("\n── 4. Login ───────────────────────────────");
  {
    const { status, body } = await api("POST", "/api/auth/login", {
      body: { email: TEST_USER.email, password: TEST_USER.password },
    });
    assert(status === 200, "POST /api/auth/login → 200", `Got ${status}`);
    assert(!!body?.token, "Response includes token", "token length: " + (body?.token?.length || 0));
    assert(body?.user?.email === TEST_USER.email, "Response includes user.email", body?.user?.email);
    token = body.token; // refresh token
  }

  // ── 5. Login with wrong password ───────────────────
  console.log("\n── 5. Login (wrong password) ──────────────");
  {
    const { status } = await api("POST", "/api/auth/login", {
      body: { email: TEST_USER.email, password: "WrongPassword!" },
    });
    assert(status === 401, "POST /api/auth/login (wrong pw) → 401", `Got ${status}`);
  }

  // ── 6. Protected route (profile) ───────────────────
  console.log("\n── 6. Protected Route (Profile) ───────────");
  {
    const { status, body } = await api("GET", "/api/profile");
    assert(status === 200, "GET /api/profile → 200", `Got ${status}`);
    assert(body?.user?.email === TEST_USER.email, "Profile returns correct user", body?.user?.email);
  }

  // ── 7. Protected route without token ───────────────
  console.log("\n── 7. Protected Route (no token) ──────────");
  {
    const saved = token;
    token = null;
    const { status } = await api("GET", "/api/profile");
    assert(status === 401, "GET /api/profile (no token) → 401", `Got ${status}`);
    token = saved;
  }

  // ── 8. Initial funds ───────────────────────────────
  console.log("\n── 8. Initial Funds ───────────────────────");
  {
    const { status, body } = await api("GET", "/api/funds");
    assert(status === 200, "GET /api/funds → 200", `Got ${status}`);
    assert(body?.fund?.availableBalance === 100000, "Initial balance is 100000", `Got ${body?.fund?.availableBalance}`);
    assert(Array.isArray(body?.transactions), "Transactions is an array", `length: ${body?.transactions?.length}`);
  }

  // ── 9. Deposit funds ───────────────────────────────
  console.log("\n── 9. Deposit Funds ───────────────────────");
  {
    const { status, body } = await api("POST", "/api/funds/deposit", {
      body: { amount: 50000 },
    });
    assert(status === 200, "POST /api/funds/deposit → 200", `Got ${status}`);
    assert(body?.fund?.availableBalance === 150000, "Balance updated to 150000", `Got ${body?.fund?.availableBalance}`);

    // Verify persistence via GET
    const { body: getBody } = await api("GET", "/api/funds");
    assert(getBody?.fund?.availableBalance === 150000, "Persistence: GET /api/funds confirms 150000", `Got ${getBody?.fund?.availableBalance}`);
    assert(getBody?.transactions?.some(t => t.type === "deposit"), "Transaction record created", "type=deposit found");
  }

  // ── 10. Buy stock ──────────────────────────────────
  console.log("\n── 10. Buy Stock ──────────────────────────");
  {
    const { status, body } = await api("POST", "/api/trade/buy", {
      body: { name: testStock, qty: 10, price: 150 },
    });
    assert(status === 200, "POST /api/trade/buy → 200", `Got ${status}`);
    assert(body?.message === "Buy order executed", "Buy executed message", body?.message);
    assert(body?.fund?.availableBalance === 148500, "Balance deducted: 150000 - 1500 = 148500", `Got ${body?.fund?.availableBalance}`);
    assert(body?.fund?.usedMargin === 1500, "Used margin updated: 1500", `Got ${body?.fund?.usedMargin}`);

    // Verify order created
    const { body: ordersBody } = await api("GET", "/api/orders");
    const order = ordersBody?.find(o => o.name === testStock && o.mode === "BUY");
    assert(!!order, "Order created for buy", JSON.stringify(order));
    assert(order.status === "executed", "Order status is executed", order?.status);
    assert(order.qty === 10, "Order qty is 10", String(order?.qty));
    assert(order.price === 150, "Order price is 150", String(order?.price));
    buyOrder = order;

    // Verify holding created
    const { body: holdingsBody } = await api("GET", "/api/holdings");
    const holding = holdingsBody?.find(h => h.name === testStock);
    assert(!!holding, "Holding created", JSON.stringify(holding));
    assert(holding.qty === 10, "Holding qty is 10", String(holding?.qty));
    assert(holding.avg === 150, "Holding avg price is 150", String(holding?.avg));
    assert(holding.investment === 1500, "Holding investment is 1500", String(holding?.investment));
  }

  // ── 11. Buy more (test weighted avg price) ─────────
  console.log("\n── 11. Buy More (weighted avg) ────────────");
  {
    const { status, body } = await api("POST", "/api/trade/buy", {
      body: { name: testStock, qty: 5, price: 200 },
    });
    assert(status === 200, "POST /api/trade/buy (2nd) → 200", `Got ${status}`);
    assert(body?.fund?.availableBalance === 147500, "Balance: 148500 - 1000 = 147500", `Got ${body?.fund?.availableBalance}`);

    // weighted avg = (10*150 + 5*200) / 15 = 166.67
    const { body: holdingsBody } = await api("GET", "/api/holdings");
    const holding = holdingsBody?.find(h => h.name === testStock);
    assert(holding?.qty === 15, "Holding qty is 15", String(holding?.qty));
    assert(Math.abs(holding?.avg - 166.67) < 0.01, "Holding avg ≈ 166.67", String(holding?.avg));
    assert(holding?.investment === 2500, "Holding investment is 2500", String(holding?.investment));
  }

  // ── 12. Insufficient funds buy rejected ────────────
  console.log("\n── 12. Insufficient Funds Rejected ────────");
  {
    const { status } = await api("POST", "/api/trade/buy", {
      body: { name: "GOOGL", qty: 999999, price: 999999 },
    });
    assert(status === 400, "POST /api/trade/buy (insufficient) → 400", `Got ${status}`);
  }

  // ── 13. Watchlist ──────────────────────────────────
  console.log("\n── 13. Watchlist ──────────────────────────");
  {
    // Add symbol
    const { status: addStatus, body: addBody } = await api("POST", "/api/watchlist/add", {
      body: { symbol: testStock },
    });
    assert(addStatus === 200, "POST /api/watchlist/add → 200", `Got ${addStatus}`);
    assert(addBody?.items?.some(i => i.symbol === testStock), "Watchlist contains added symbol", JSON.stringify(addBody?.items?.map(i => i.symbol)));

    // Duplicate add → 409
    const { status: dupStatus } = await api("POST", "/api/watchlist/add", {
      body: { symbol: testStock },
    });
    assert(dupStatus === 409, "POST /api/watchlist/add (dup) → 409", `Got ${dupStatus}`);

    // List watchlist
    const { body: listBody } = await api("GET", "/api/watchlist");
    assert(listBody?.items?.some(i => i.symbol === testStock), "GET /api/watchlist includes symbol", JSON.stringify(listBody?.items?.map(i => i.symbol)));

    // Remove symbol
    const { status: delStatus } = await api("DELETE", `/api/watchlist/${testStock}`);
    assert(delStatus === 200, "DELETE /api/watchlist/:symbol → 200", `Got ${delStatus}`);

    // Verify removed
    const { body: afterDel } = await api("GET", "/api/watchlist");
    assert(!afterDel?.items?.some(i => i.symbol === testStock), "Symbol removed from watchlist", JSON.stringify(afterDel?.items?.map(i => i.symbol)));
  }

  // ── 14. Sell stock (partial) ──────────────────────
  console.log("\n── 14. Sell Stock (partial) ───────────────");
  {
    const { status, body } = await api("POST", "/api/trade/sell", {
      body: { name: testStock, qty: 5, price: 250 },
    });
    assert(status === 200, "POST /api/trade/sell → 200", `Got ${status}`);
    assert(body?.message === "Sell order executed", "Sell executed message", body?.message);
    assert(body?.pnl > 0, "PnL is positive (sold at 250, avg 166.67)", `pnl=${body?.pnl}`);

    const { body: ordersBody } = await api("GET", "/api/orders");
    const sellOrder = ordersBody?.find(o => o.name === testStock && o.mode === "SELL");
    assert(!!sellOrder, "Sell order created", JSON.stringify(sellOrder));

    const { body: holdingsBody } = await api("GET", "/api/holdings");
    const holding = holdingsBody?.find(h => h.name === testStock);
    assert(holding?.qty === 10, "Holding qty reduced to 10", String(holding?.qty));

    const { body: posBody } = await api("GET", "/api/positions");
    const pos = posBody?.find(p => p.name === testStock);
    assert(!!pos, "Position still exists (qty > 0)", "qty=" + pos?.qty);
  }

  // ── 15. Sell all remaining ─────────────────────────
  console.log("\n── 15. Sell All Remaining ─────────────────");
  {
    const { status, body } = await api("POST", "/api/trade/sell", {
      body: { name: testStock, qty: 10, price: 260 },
    });
    assert(status === 200, "POST /api/trade/sell (all) → 200", `Got ${status}`);

    // Verify holding removed (qty reached 0)
    const { body: holdingsBody } = await api("GET", "/api/holdings");
    const holding = holdingsBody?.find(h => h.name === testStock);
    assert(!holding, "Holding removed when qty reaches 0", JSON.stringify(holding));

    // Verify position removed
    const { body: posBody } = await api("GET", "/api/positions");
    const pos = posBody?.find(p => p.name === testStock);
    assert(!pos, "Position removed when qty reaches 0", JSON.stringify(pos));
  }

  // ── 16. Orders list ───────────────────────────────
  console.log("\n── 16. Orders List ────────────────────────");
  {
    const { status, body } = await api("GET", "/api/orders");
    assert(status === 200, "GET /api/orders → 200", `Got ${status}`);
    assert(Array.isArray(body), "Orders is an array", `length: ${body?.length}`);
    assert(body?.length >= 4, "At least 4 orders exist (2 buy + 2 sell)", `count: ${body?.length}`);

    // Filter by mode
    const { body: buys } = await api("GET", "/api/orders?mode=BUY");
    assert(buys?.length >= 2, "Orders filtered by mode=BUY", `count: ${buys?.length}`);
    assert(buys?.every(o => o.mode === "BUY"), "All filtered orders are BUY", "");
  }

  // ── 17. Holdings list ─────────────────────────────
  console.log("\n── 17. Holdings List ──────────────────────");
  {
    const { status, body } = await api("GET", "/api/holdings");
    assert(status === 200, "GET /api/holdings → 200", `Got ${status}`);
    assert(Array.isArray(body), "Holdings is an array", `length: ${body?.length}`);
  }

  // ── 18. Cancel order (delete pending) ──────────────
  console.log("\n── 18. Cancel Non-existent Order ──────────");
  {
    const fakeId = "000000000000000000000000";
    const { status } = await api("PATCH", `/api/orders/${fakeId}/cancel`);
    assert(status === 404, "PATCH /api/orders/:id/cancel (fake) → 404", `Got ${status}`);
  }

  // ── 19. Summary endpoint ───────────────────────────
  console.log("\n── 19. Summary ────────────────────────────");
  {
    const { status, body } = await api("GET", "/api/summary");
    assert(status === 200, "GET /api/summary → 200", `Got ${status}`);
    assert(typeof body === "object", "Summary returns an object", typeof body);
  }

  // ── 20. Positions endpoint ─────────────────────────
  console.log("\n── 20. Positions ──────────────────────────");
  {
    const { status, body } = await api("GET", "/api/positions");
    assert(status === 200, "GET /api/positions → 200", `Got ${status}`);
    assert(Array.isArray(body), "Positions is an array", `length: ${body?.length}`);
    // Should be empty since we sold everything
    assert(body?.length === 0, "Positions empty after full sell", `count: ${body?.length}`);
  }

  // ── 21. Withdraw funds ─────────────────────────────
  console.log("\n── 21. Withdraw Funds ─────────────────────");
  {
    const { status, body } = await api("POST", "/api/funds/withdraw", {
      body: { amount: 147500 },
    });
    assert(status === 200, "POST /api/funds/withdraw → 200", `Got ${status}`);
    assert(body?.fund?.availableBalance === 0, "Balance after full withdraw is 0", `Got ${body?.fund?.availableBalance}`);

    // Verify transaction recorded
    const { body: getBody } = await api("GET", "/api/funds");
    assert(getBody?.transactions?.some(t => t.type === "withdraw"), "Withdraw transaction recorded", "");
  }

  // ── 22. Insufficient withdraw rejected ─────────────
  console.log("\n── 22. Insufficient Withdraw Rejected ─────");
  {
    const { status } = await api("POST", "/api/funds/withdraw", {
      body: { amount: 100 },
    });
    assert(status === 400, "POST /api/funds/withdraw (insufficient) → 400", `Got ${status}`);
  }

  // ── 23. Profile update ─────────────────────────────
  console.log("\n── 23. Profile Update ─────────────────────");
  {
    const updatedName = `${TEST_USER.name} UPDATED`;
    const { status, body } = await api("PUT", "/api/profile", {
      body: { name: updatedName },
    });
    assert(status === 200, "PUT /api/profile → 200", `Got ${status}`);
    assert(body?.user?.name === updatedName, "Profile name updated", body?.user?.name);
  }

  // ── Report ─────────────────────────────────────────
  console.log(`\n═══════════════════════════════════════════`);
  console.log(`  TEST RESULTS`);
  console.log(`═══════════════════════════════════════════`);
  console.log(`  Total:  ${results.length}`);
  console.log(`  Passed: ${passed}`);
  console.log(`  Failed: ${failed}`);
  console.log(`  Rate:   ${(passed / results.length * 100).toFixed(1)}%`);
  console.log(`───────────────────────────────────────────`);
  for (const r of results) {
    const icon = r.status === "PASS" ? "✓" : "✗";
    console.log(`  ${icon} ${r.label}`);
    if (r.detail) console.log(`       ${r.detail}`);
  }
  console.log(`───────────────────────────────────────────\n`);

  process.exit(failed > 0 ? 1 : 0);
}

run().catch((err) => {
  console.error("\n✗ UNEXPECTED ERROR:", err);
  process.exit(1);
});
