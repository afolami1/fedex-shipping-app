import { useState, type FormEvent } from "react";
import axios from "axios";
import type { Shipment } from "../types/Shipment";
import "./Tracking.css";

function Tracking() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [error, setError] = useState("");

  const handleTrack = async (e: FormEvent) => {
    e.preventDefault();

    const number = trackingNumber.trim();

    if (!number) {
      setError("Please enter a tracking number.");
      setShipment(null);
      return;
    }

    try {
      console.log("Tracking number:", number);

      const response = await axios.get(
        `https://fedex-backend-5rca.onrender.com/api/track/${number}/`
      );

      console.log("Django response:", response.data);

      const data = response.data;

      const formattedShipment: Shipment = {
        trackingNumber: data.tracking_number,
        sender: data.sender,
        receiver: data.receiver,
        originCountry: data.origin_country,
        originState: data.origin_state,
        originCity: data.origin_city,
        originAddress: data.origin_address,
        destinationCountry: data.destination_country,
        destinationState: data.destination_state,
        destinationCity: data.destination_city,
        destinationAddress: data.destination_address,
        weight: data.weight,
        paymentMethod: data.payment_method,
        paymentStatus: data.payment_status,
        status: data.status,
        createdAt: data.created_at,
        currentLocation: data.current_location,
        nextLocation: data.next_location,
        estimatedDelivery: data.estimated_delivery,
        trackingHistory: data.tracking_updates.map((update: any) => ({
         location: update.location,
         status: update.status,
         description: update.description,
         date: update.date,
         time: update.time,
    })),
};

      setShipment(formattedShipment);
      setError("");
    } catch (error: any) {
      console.error(error);

      setShipment(null);

      if (error.response) {
        if (error.response.status === 404) {
          setError("Shipment not found. Please check your tracking number.");
        } else {
          setError(`Server error: ${error.response.status}`);
        }
      } else if (error.request) {
        setError("Cannot connect to Django server.");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="tracking-container">
      <div className="tracking-box">
        <h2>Track Your Shipment</h2>

        <form onSubmit={handleTrack} className="tracking-form">
          <input
            type="text"
            placeholder="Enter tracking number"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />

          <button type="submit">Track Shipment</button>
        </form>

        {error && <p className="tracking-error">{error}</p>}

        {shipment && (
          <div className="tracking-result">
            <h3>Shipment Details</h3>

            <div className="tracking-info">
              <p>
                <strong>Tracking Number:</strong> {shipment.trackingNumber}
              </p>

              <p>
                <strong>Sender:</strong> {shipment.sender}
              </p>

              <p>
                <strong>Receiver:</strong> {shipment.receiver}
              </p>

              <p>
                <strong>Status:</strong> {shipment.status}
              </p>

              <p>
                <strong>Current Location:</strong> {shipment.currentLocation}
              </p>

              <p>
                <strong>Next Destination:</strong> {shipment.nextLocation}
              </p>

              <p>
                <strong>Estimated Delivery:</strong> {shipment.estimatedDelivery}
              </p>

              <p>
                <strong>Weight:</strong> {shipment.weight}
              </p>

              <p>
                <strong>Payment Status:</strong> {shipment.paymentStatus}
              </p>
            </div>

            <h3>Tracking History</h3>

            <div className="tracking-history">
              {shipment.trackingHistory.length === 0 ? (
                <p>No tracking updates yet.</p>
              ) : (
                shipment.trackingHistory.map((update, index) => (
                  <div className="tracking-event" key={index}>
                    <div className="tracking-dot"></div>

                    <div className="tracking-event-content">
                      <h4>{update.status}</h4>

                      <p>
                        <strong>Location:</strong> {update.location}
                      </p>

                      <p>{update.description}</p>

                      <small>
                        {update.date} — {update.time}
                      </small>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tracking;