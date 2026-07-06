import { Config } from '../config';

export const generateUPILink = (
  config: Config,
  amount: number,
  guestName: string,
  bookingId: string
): string => {
  const transactionNote = `Hotel Booking - ${guestName} - ${bookingId}`;
  const params = new URLSearchParams({
    pa: config.upiId,
    pn: config.upiName,
    am: amount.toString(),
    cu: 'INR',
    tn: transactionNote
  });

  return `upi://pay?${params.toString()}`;
};

export const generateUPIDisplayText = (
  config: Config,
  amount: number,
  _guestName: string,
  bookingId: string
): string => {
  return `Pay ₹${amount.toLocaleString()} to ${config.upiName} for booking ${bookingId}`;
};
