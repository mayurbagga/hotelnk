import emailjs from '@emailjs/browser';
import { CONFIG } from '../config';

interface BookingData {
  bookingId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalAmount: number;
  specialRequests: string;
  upiReference: string;
}

export const sendEmails = async (bookingData: BookingData): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: bookingData.guestEmail,
      to_name: bookingData.guestName,
      booking_id: bookingData.bookingId,
      room_name: bookingData.roomName,
      check_in: bookingData.checkIn,
      check_out: bookingData.checkOut,
      nights: bookingData.nights.toString(),
      total_amount: `₹${bookingData.totalAmount.toLocaleString()}`,
      guest_phone: bookingData.guestPhone,
      special_requests: bookingData.specialRequests || 'None',
      hotel_name: CONFIG.hotelName,
      hotel_email: CONFIG.ownerEmail,
      hotel_whatsapp: CONFIG.whatsappNumber,
      upi_reference: bookingData.upiReference
    };

    await emailjs.send(
      CONFIG.emailjsServiceId,
      CONFIG.emailjsTemplateId_guest,
      templateParams,
      CONFIG.emailjsPublicKey
    );

    const ownerParams = {
      ...templateParams,
      to_email: CONFIG.ownerEmail,
      guest_email: bookingData.guestEmail
    };

    await emailjs.send(
      CONFIG.emailjsServiceId,
      CONFIG.emailjsTemplateId_owner,
      ownerParams,
      CONFIG.emailjsPublicKey
    );

    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};
