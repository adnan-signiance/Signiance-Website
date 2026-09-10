import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ClientsStrip from "@/components/ClientsStrip";
import Services from "@/components/Services";
import HowWeWork from "@/components/HowWeWork";
import Proof from "@/components/Proof";
import Engagements from "@/components/Engagements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div style={{ padding: "0 14px" }}>
      <Header />
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          borderLeft: "1px solid #E2E0DA",
          borderRight: "1px solid #E2E0DA",
        }}
      >
        <Hero />
        <ClientsStrip />
        <Services />
        <HowWeWork />
        <Proof />
        <Engagements />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
