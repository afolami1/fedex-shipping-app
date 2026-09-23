import { useState } from "react";

import Header from "./components/Header";
import Hero from "./components/hero";
import ShipmentForm from "./components/ShipmentForm";
import Tracking from "./components/Tracking";
import PopularItems from "./components/PopularItems";
import Services from "./components/Services";
import WhyChoose from "./components/WhyChoose";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

function App() {
  const [page, setPage] = useState<"dashboard" | "create" | "track">(
    "dashboard"
  );

  return (
    <>
      <Header />

      {page === "dashboard" && (
  <>
    <Hero
      onCreateShipment={() => setPage("create")}
      onTrackPackage={() => setPage("track")}
    />

    <PopularItems />
    <Services />
    <WhyChoose />
    <ContactSection />
  </>
)}

      {page === "create" && (
        <div id="shipment">
          <ShipmentForm />
        </div>
      )}

      {page === "track" && (
        <div id="tracking">
          <Tracking />
        </div>
      )}
      <Footer />
    </>
  );
}

export default App;