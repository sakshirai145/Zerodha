import React from 'react';
import Hero from './Hero';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import Universe from './Universe';

function ProductsPage() {
  return (
    <>
      <Hero />
      <LeftSection imageUrl="media/kite.png"
      ProductName="Kite"
  ProductDescription="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."
  tryDemo="media/kite-demo.mp4"
  learnMore="media/kite-learn-more.mp4"
  googlePlay="https://play.google.com/store/apps/details?id=com.kite"
  appStore="https://apps.apple.com/us/app/kite/id1234567890"/>


  <RightSection imageUrl="media/console.png"
      ProductName="Console"
  ProductDescription="The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations."
  learnMore="media/console-learn-more.mp4"/>


  <LeftSection imageUrl="media/Coin.png"
      ProductName="Coin"
  ProductDescription="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices."
  tryDemo="media/coin-demo.mp4"
  learnMore="media/coin-learn-more.mp4"
  googlePlay="https://play.google.com/store/apps/details?id=com.coin"
  appStore="https://apps.apple.com/us/app/kite/id1234567890"/>


   <RightSection imageUrl="media/kiteconnect.png"
  ProductName="Kite Connect API"
  ProductDescription="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase."
  learnMore="media/coin-learn-more.mp4" />




  <LeftSection imageUrl="media/kiteconnect.png"
      ProductName="Varsity mobile"
  ProductDescription="An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go."
  tryDemo="media/kite-demo.mp4"
  learnMore="media/kite-learn-more.mp4"
  googlePlay="https://play.google.com/store/apps/details?id=com.kite"
  appStore="https://apps.apple.com/us/app/kite/id1234567890"/>
      <Universe />
    </>
  );
}

export default ProductsPage;
