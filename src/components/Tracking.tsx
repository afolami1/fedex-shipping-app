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
        "https://globalshippingonline247.onrender.com/api/track/" + number + "/"
      );

      console.log("Django response:", response.data);

      const data = response.data;

      const formattedShipment: Shipment = {
        trackingNumber: data.tracking_number,
        sender: data.sender,
        receiver: data.receiver,

        item_photo: data.item_photo,

        originCountry: data.origin_country,
        originState: data.origin_state,
        originCity: data.origin_city,
        originAddress: data.origin_address,

        destinationCountry: data.destination_country,
        destinationState: data.destination_state,
        destinationCity: data.destination_city,
        destinationAddress: data.destination_address,

        weight: data.weight,
        payment_amount: data.payment_amount,

        paymentMethod: data.payment_method,
        paymentStatus: data.payment_status,

        status: data.status,
        createdAt: data.created_at,

        currentLocation: data.current_location,
        nextLocation: data.next_location,
        estimatedDelivery: data.estimated_delivery,

        trackingHistory: (data.tracking_updates || []).map(
          (update: any) => ({
            location: update.location,
            status: update.status,
            description: update.description,
            date: update.date,
            time: update.time,
          })
        ),
      };

      setShipment(formattedShipment);
      setError("");
    } catch (error: any) {
      console.error("Tracking error:", error);

      setShipment(null);

      if (error.response) {
        if (error.response.status === 404) {
          setError(
            "Shipment not found. Please check your tracking number."
          );
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

        <form
          onSubmit={handleTrack}
          className="tracking-form"
        >
          <input
            type="text"
            placeholder="Enter tracking number"
            value={trackingNumber}
            onChange={(e) =>
              setTrackingNumber(e.target.value)
            }
          />

          <button type="submit">
            Track Shipment
          </button>
        </form>

        {error && (
          <p className="tracking-error">
            {error}
          </p>
        )}

        {shipment && (
          <div className="tracking-result">
            <div className="tracking-header">
              <h3>Shipment Tracking</h3>

              <div className="tracking-number">
                {shipment.trackingNumber}
              </div>
            </div>

            {shipment.item_photo && (
              <div className="shipment-item-photo">
                <h3>Item Photo</h3>

                <img
                  src={
                    shipment.item_photo.startsWith("http")
                      ? shipment.item_photo
                      : "http://127.0.0.1:8000" +
                        shipment.item_photo
                  }
                  alt="Shipment item"
                />
              </div>
            )}

            <div className="tracking-status-box">
              <span>Current Status</span>
              <strong>{shipment.status}</strong>
            </div>

            <div className="tracking-route">
              <div className="route-location">
                <span>FROM</span>

                <strong>
                  {shipment.originCity},{" "}
                  {shipment.originCountry}
                </strong>

                <small>
                  {shipment.originAddress}
                </small>
              </div>

              <div className="route-arrow">
                →
              </div>

              <div className="route-location">
                <span>TO</span>

                <strong>
                  {shipment.destinationCity},{" "}
                  {shipment.destinationCountry}
                </strong>

                <small>
                  {shipment.destinationAddress}
                </small>
              </div>
            </div>

            <div className="tracking-info">
              <div className="tracking-info-item">
                <span>Current Location</span>
                <strong>
                  {shipment.currentLocation}
                </strong>
              </div>

              <div className="tracking-info-item">
                <span>Next Destination</span>
                <strong>
                  {shipment.nextLocation}
                </strong>
              </div>

              <div className="tracking-info-item">
                <span>Estimated Delivery</span>
                <strong>
                  {shipment.estimatedDelivery}
                </strong>
              </div>

              <div className="tracking-info-item">
                <span>Package Weight</span>
                <strong>
                  {shipment.weight} kg
                </strong>
              </div>

              <div className="tracking-info-item">
                <span>Sender</span>
                <strong>
                  {shipment.sender}
                </strong>
              </div>

              <div className="tracking-info-item">
                <span>Receiver</span>
                <strong>
                  {shipment.receiver}
                </strong>
              </div>

              <div className="tracking-info-item">
                <span>Payment Status</span>
                <strong>
                  {shipment.paymentStatus}
                </strong>
              </div>

              {Number(shipment.payment_amount) > 0 && (
                <div className="tracking-info-item">
                  <span>Payment Amount</span>

                  <strong>
                    $
                    {Number(
                      shipment.payment_amount
                    ).toLocaleString()}
                  </strong>
                </div>
              )}
            </div>

            <h3 className="history-title">
              Shipment History
            </h3>

            <div className="tracking-history">
              {shipment.trackingHistory.length === 0 ? (
                <p>No tracking updates yet.</p>
              ) : (
                shipment.trackingHistory.map(
                  (update, index) => (
                    <div
                      className="tracking-event"
                      key={index}
                    >
                      <div className="tracking-dot"></div>

                      <div className="tracking-event-content">
                        <h4>{update.status}</h4>

                        <p>
                          <strong>
                            Location:
                          </strong>{" "}
                          {update.location}
                        </p>

                        {update.description && (
                          <p>
                            {update.description}
                          </p>
                        )}

                        <small>
                          {update.date} —{" "}
                          {update.time}
                        </small>
                      </div>
                    </div>
                  )
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tracking;