import { useState } from "react";
import axios from "axios";
import "./ShipmentForm.css";

function ShipmentForm() {
const CREATE_SHIPMENT_PASSWORD = "open1234";

const [sender, setSender] = useState("");
const [receiver, setReceiver] = useState("");
const [email, setEmail] = useState("");
const [origin, setOrigin] = useState("");
const [originState, setOriginState] = useState("");
const [originCity, setOriginCity] = useState("");
const [originAddress, setOriginAddress] = useState("");
const [destination, setDestination] = useState("");
const [destinationState, setDestinationState] = useState("");
const [destinationCity, setDestinationCity] = useState("");
const [destinationAddress, setDestinationAddress] = useState("");
const [weight, setWeight] = useState("");
const [paymentMethod, setPaymentMethod] = useState("");
const [paymentStatus, setPaymentStatus] = useState("");
const [Amount, setAmount] = useState("");
const [trackingNumber, setTrackingNumber] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();

console.log("CREATE SHIPMENT BUTTON CLICKED");

const enteredPassword = window.prompt(
  "Enter Create Shipment Password:"
);

if (enteredPassword !== CREATE_SHIPMENT_PASSWORD) {
  alert("Incorrect password.");
  return;
}

if (!paymentMethod) {
  alert("Please choose a payment method.");
  return;
}

const newTrackingNumber =
  "FDX" + Math.floor(100000000 + Math.random() * 900000000);

const calculatedShippingCost = Number(weight) * 154500;

const estimatedDelivery = new Date(
  Date.now() + 5 * 24 * 60 * 60 * 1000
)
  .toISOString()
  .split("T")[0];

const shipmentData = {
  tracking_number: newTrackingNumber,
  sender,
  receiver,

  origin_country: origin,
  origin_state: originState,
  origin_city: originCity,
  origin_address: originAddress,

  destination_country: destination,
  destination_state: destinationState,
  destination_city: destinationCity,
  destination_address: destinationAddress,

  weight: weight,
  shipping_cost: calculatedShippingCost,

  payment_method: paymentMethod,
  payment_status: "Paid",
  payment_amount: Amount || 0,

  status: "Shipment Created",

  current_location: `${originCity}, ${origin}`,
  next_location: "Sorting Facility",
  estimated_delivery: estimatedDelivery,
};

try {
  const response = await axios.post(
    "https://globalshippingonline247.onrender.com/api/",
    shipmentData
  );
  console.log("DJANGO CREATE RESPONSE:", response.data);

  setTrackingNumber(newTrackingNumber);
  setPaymentStatus("Paid");

  alert(
    "Shipment created successfully! Tracking Number: " +
      newTrackingNumber
  );
} catch (error: any) {
  console.error(
    "Shipment creation error:",
    error.response?.data || error.message
  );

  alert(
    "Shipment could not be created. Please make sure the Django server is running."
  );
}
};

const handlePrint = () => {
window.print();
};

const handleDownload = () => {
const receipt = `
GLOBAL SHIPPING

SHIPMENT RECEIPT

================================

Tracking Number: ${trackingNumber}

Sender:
${sender}

Receiver:
${receiver}

Origin:
${originAddress}
${originCity}, ${originState}
${origin}

Destination:
${destinationAddress}
${destinationCity}, ${destinationState}
${destination}

Package Weight: ${weight} kg

Shipping Cost: #${Number(weight) * 154500}

Payment Method: ${paymentMethod}

Payment Status: ${paymentStatus}

================================

Thank you for using Global Shipping
`;
const blob = new Blob([receipt], {
type: "text/plain"
});

const url = URL.createObjectURL(blob);

const link = document.createElement("a");

link.href = url;
link.download = `${trackingNumber}-receipt.txt`;

document.body.appendChild(link);

link.click();

document.body.removeChild(link);

URL.revokeObjectURL(url);

};

return (
<div className="shipment-form-container">
<form onSubmit={handleSubmit} className="shipment-form" >
<h2>Create Shipment</h2>

    <div className="form-group">
      <label>Sender Name</label>

      <input
        type="text"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
        required
      />
    </div>

    <div className="form-group">
      <label>Receiver Name</label>

      <input
        type="text"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        required
      />
    </div>

    <div className="form-group">
      <label>Email Address</label>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>

    <h3>Origin</h3>

    <div className="form-group">
      <label>Country</label>

      <select
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        required
      >
        <option value="">Select Country</option>
        <option value="United States">
          United States
        </option>
        <option value="Canada">Canada</option>
        <option value="United Kingdom">
          United Kingdom
        </option>
        <option value="Nigeria">Nigeria</option>
        <option value="Germany">Germany</option>
      </select>
    </div>

    <div className="form-group">
      <label>State</label>

      <input
        type="text"
        value={originState}
        onChange={(e) => setOriginState(e.target.value)}
        required
      />
    </div>

    <div className="form-group">
      <label>City</label>

      <input
        type="text"
        value={originCity}
        onChange={(e) => setOriginCity(e.target.value)}
        required
      />
    </div>

    <div className="form-group">
      <label>Address</label>

      <input
        type="text"
        value={originAddress}
        onChange={(e) => setOriginAddress(e.target.value)}
        required
      />
    </div>

    <h3>Destination</h3>

    <div className="form-group">
      <label>Country</label>

      <select
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
      >
        <option value="">Select Country</option>
        <option value="United States">
          United States
        </option>
        <option value="Canada">Canada</option>
        <option value="United Kingdom">
          United Kingdom
        </option>
        <option value="MEXICO">MEXICO</option>
        <option value="Germany">Germany</option>
        <option value="PORTUGAL">PORTUGAL</option>
        <option value="SPAIN">SPAIN</option>
      </select>
    </div>

    <div className="form-group">
      <label>State</label>

      <input
        type="text"
        value={destinationState}
        onChange={(e) =>
          setDestinationState(e.target.value)
        }
        required
      />
    </div>

    <div className="form-group">
      <label>City</label>

      <input
        type="text"
        value={destinationCity}
        onChange={(e) =>
          setDestinationCity(e.target.value)
        }
        required
      />
    </div>

    <div className="form-group">
      <label>Address</label>

      <input
        type="text"
        value={destinationAddress}
        onChange={(e) =>
          setDestinationAddress(e.target.value)
        }
        required
      />
    </div>

    <div className="form-group">
      <label>Package Weight (kg)</label>

      <input
        type="number"
        min="0.1"
        step="0.1"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        required
      />

      {weight && Number(weight) > 0 && (
        <p className="shipping-cost">
          Shipping Cost: #{Number(weight) * 154500}
        </p>
      )}
    </div>

    <div className="form-group">
      <label>Amount ($)</label>

      <input
        type="number"
        min="0"
        step="0.01"
        value={Amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
    </div>

    <div className="form-group">
      <label>Payment Method</label>

      <select
        value={paymentMethod}
        onChange={(e) =>
          setPaymentMethod(e.target.value)
        }
        required
      >
        <option value="">
          Select Payment Method
        </option>

        <option value="Credit Card">
          Credit Card
        </option>

        <option value="Debit Card">
          Debit Card
        </option>

        <option value="Bank Transfer">
          Bank Transfer
        </option>

        <option value="Cash">Cash</option>

        <option value="Payment">Payment</option>
      </select>
    </div>

    {paymentMethod === "Payment" && (
      <div className="form-group">
        <label>Amount ($)</label>

        <input
          type="number"
          min="1"
          value={Amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          placeholder="Enter any amount"
          required
        />
      </div>
    )}

    <button type="submit">
      Create Shipment
    </button>
  </form>

  {trackingNumber && (
    <div className="shipment-receipt">
      <h2>Shipment Created Successfully</h2>

      <p>
        <strong>Tracking Number:</strong>{" "}
        {trackingNumber}
      </p>

      <p>
        <strong>Payment Status:</strong>{" "}
        {paymentStatus}
      </p>

      {paymentMethod === "Payment" && (
        <p>
          <strong>Payment Amount:</strong> $
          {Amount}
        </p>
      )}

      <div className="receipt-buttons">
        <button
          type="button"
          onClick={handlePrint}
        >
          Print Receipt
        </button>

        <button
          type="button"
          onClick={handleDownload}
        >
          Download Receipt
        </button>
      </div>

      <div className="telegram-contact">
        <p>
          Need help with your shipment?
        </p>

        <a
          href="https://t.me/veronica_rose"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact the admin for shipping updates
          and other assistance
        </a>
      </div>
    </div>
  )}
</div>
);
}

export default ShipmentForm;