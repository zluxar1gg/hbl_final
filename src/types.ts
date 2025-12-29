
export type ParcelStatus = 'registered' | 'warehouse' | 'shipped' | 'customs' | 'delivered';

export interface Parcel {
  id: string;
  trackingNumber: string; // Domestic tracking (China)
  description: string;
  status: ParcelStatus;
  weight?: number;
  price?: number;
  imageUrl?: string;
  internationalTracking?: string; // International tracking (if shipped)
  dateAdded: string;
}

export interface User {
  email: string;
  name: string;
  clientCode: string; // e.g. HB-1024
}
