import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/Card/LatestCollection";
import BestSeller from "../components/Card/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  );
};

export default Home;
