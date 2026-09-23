export interface TrackingUpdate {
  location: string;
  status: string;
  description: string;
  date: string;
  time: string;
}

export interface Shipment {
  trackingNumber: string;

  sender: string;
  receiver: string;
  item_photo?: string;

  originCountry: string;
  originState: string;
  originCity: string;
  originAddress: string;

  destinationCountry: string;
  destinationState: string;
  destinationCity: string;
  destinationAddress: string;

  weight: string;
  payment_amount: number;


  paymentMethod: string;
  paymentStatus: string;

  status: string;
  createdAt: string;

  // New tracking fields
  currentLocation: string;
  nextLocation: string;
  estimatedDelivery: string;
  trackingHistory: TrackingUpdate[];
}