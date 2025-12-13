import { Parcel, User } from "../types";

// This service mimics fetching data from a Google Sheet
// Later, we will replace this with actual API calls to your Master Sheet

const MOCK_DELAY = 800; // Simulate network delay

const MOCK_DATABASE: Record<string, { user: User; parcels: Parcel[] }> = {
  'ivan@test.com': {
    user: {
      email: 'ivan@test.com',
      name: 'Ivan Petrov',
      clientCode: 'HB-007'
    },
    parcels: [
      {
        id: '1',
        trackingNumber: 'SF123456789',
        description: 'Nike Sneakers (2 pairs)',
        status: 'warehouse',
        weight: 1.2,
        dateAdded: '2023-10-01',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80'
      },
      {
        id: '2',
        trackingNumber: 'YT987654321',
        description: 'Xiaomi Smart Home Sensor',
        status: 'shipped',
        weight: 0.3,
        price: 15,
        internationalTracking: 'LV999888777CN',
        dateAdded: '2023-09-28',
        imageUrl: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=200&q=80'
      },
      {
        id: '3',
        trackingNumber: 'JD11223344',
        description: 'Winter Jacket',
        status: 'registered',
        dateAdded: '2023-10-05',
      }
    ]
  },
  'demo@happybox.service': {
    user: {
        email: 'demo@happybox.service',
        name: 'Demo Client',
        clientCode: 'HB-DEMO'
    },
    parcels: [
        {
            id: '101',
            trackingNumber: 'CN123000999',
            description: 'Sample Package',
            status: 'delivered',
            weight: 5.5,
            price: 60,
            dateAdded: '2023-08-15'
        }
    ]
  }
};

export const sheetService = {
  login: async (email: string): Promise<{ user: User; parcels: Parcel[] } | null> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = MOCK_DATABASE[email.toLowerCase()];
        resolve(data || null);
      }, MOCK_DELAY);
    });
  },

  // Future method: Fetch latest parcels for a logged-in user
  fetchParcels: async (email: string): Promise<Parcel[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = MOCK_DATABASE[email.toLowerCase()];
            resolve(data ? data.parcels : []);
        }, MOCK_DELAY);
    });
  }
};