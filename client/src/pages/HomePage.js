import React from "react";
import Layout from "./../components/Layout";
import Banner from "../components/Banner";
import BelowBanner from "../components/BelowBanner";
import Services from "../components/Services";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
const HomePage = () => {
  return (
    <Layout>
      <Banner />
      <BelowBanner />
      <Services />
      <ContactSection />
      <Footer />
    </Layout>
  );
};

export default HomePage;
