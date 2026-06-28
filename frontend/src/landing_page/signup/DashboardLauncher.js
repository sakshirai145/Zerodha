import { useEffect } from "react";
import LoadingOverlay from "../../components/LoadingOverlay";
import { DASHBOARD_URL } from "../../config";

export default function DashboardLauncher() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const target = token
      ? DASHBOARD_URL + "?token=" + encodeURIComponent(token)
      : DASHBOARD_URL;
    const timer = setTimeout(() => {
      window.location.href = target;
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return <LoadingOverlay visible text="Creating Demo Trading Account..." />;
}
