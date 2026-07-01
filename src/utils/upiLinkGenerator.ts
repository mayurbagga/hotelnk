import { CONFIG } from '../config';

export const generateUPILink = (
  amount: number,
  guestName: string,
  bookingId: string
): string => {
  const transactionNote = `Hotel Booking - ${guestName} - ${bookingId}`;
  const params = new URLSearchParams({
    pa: CONFIG.upiId,
    pn: CONFIG.upiName,
    am: amount.toString(),
    cu: 'INR',
    tn: transactionNote
  });

  return `upi://pay?${params.toString()}`;
};

export const generateUPIDisplayText = (
  amount: number,
  _guestName: string,
  bookingId: string
): string => {
  return `Pay ₹${amount.toLocaleString()} to ${CONFIG.upiName} for booking ${bookingId}`;
};
