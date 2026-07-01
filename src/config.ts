export interface Room {
  id: string;
  name: string;
  pricePerNight: number;
  maxGuests: number;
  available: boolean;
  totalRooms: number;
  bookedDates: string[];
  description: string;
  amenities: string[];
  images: string[];
  virtualTour: boolean;
}

export interface Config {
  hotelName: string;
  ownerEmail: string;
  upiId: string;
  upiName: string;
  whatsappNumber: string;
  emailjsServiceId: string;
  emailjsTemplateId_guest: string;
  emailjsTemplateId_owner: string;
  emailjsPublicKey: string;
  rooms: Room[];
}

export const CONFIG: Config = {
  hotelName: "Hotel NK",
  ownerEmail: "info@hotelnk.in",
  upiId: "myu98198@okicici",
  upiName: "Hotel NK",
  whatsappNumber: "9979898198",
  emailjsServiceId: "YOUR_SERVICE_ID",
  emailjsTemplateId_guest: "TEMPLATE_GUEST",
  emailjsTemplateId_owner: "TEMPLATE_OWNER",
  emailjsPublicKey: "YOUR_PUBLIC_KEY",

  rooms: [
    {
      id: "deluxe",
      name: "Deluxe Room",
      pricePerNight: 3500,
      maxGuests: 2,
      available: true,
      totalRooms: 5,
      bookedDates: ["2024-01-15", "2024-01-16", "2024-02-20"],
      description: "Elegant room with city view, king bed, and premium amenities.",
      amenities: ["Free WiFi", "Air Conditioning", "Room Service", "Smart TV"],
      images: [
        "/room-photos/room-1.jpeg",
        "/room-photos/room-2.jpeg",
        "/room-photos/room-3.jpeg"
      ],
      virtualTour: true
    },
    {
      id: "suite",
      name: "Executive Suite",
      pricePerNight: 7500,
      maxGuests: 3,
      available: true,
      totalRooms: 3,
      bookedDates: ["2024-01-10", "2024-01-11"],
      description: "Spacious suite with separate living area, jacuzzi, and panoramic views.",
      amenities: ["Free WiFi", "Jacuzzi", "Mini Bar", "Butler Service", "Smart TV"],
      images: [
        "/room-photos/room-4.jpeg",
        "/room-photos/room-5.jpeg",
        "/room-photos/room-6.jpeg"
      ],
      virtualTour: true
    },
    {
      id: "presidential",
      name: "Presidential Villa",
      pricePerNight: 18000,
      maxGuests: 5,
      available: true,
      totalRooms: 1,
      bookedDates: ["2024-01-05", "2024-01-06", "2024-01-07"],
      description: "Our crown jewel — a private villa with a plunge pool and dedicated staff.",
      amenities: ["Private Pool", "Dedicated Butler", "Chef on Request", "Helipad Access"],
      images: [
        "/room-photos/room-7.jpeg",
        "/room-photos/room-8.jpeg",
        "/room-photos/room-9.jpeg",
        "/room-photos/room-10.jpeg",
        "/room-photos/room-11.jpeg"
      ],
      virtualTour: true
    }
  ]
};
