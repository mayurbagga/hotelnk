import { useState, useCallback } from 'react';
import { Room } from '../config';

interface BookingState {
  step: number;
  selectedRoom: Room | null;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests: string;
  paymentScreenshot: string | null;
  bookingId: string | null;
}

export const useBooking = () => {
  const [state, setState] = useState<BookingState>({
    step: 1,
    selectedRoom: null,
    checkIn: null,
    checkOut: null,
    guests: 1,
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    specialRequests: '',
    paymentScreenshot: null,
    bookingId: null
  });

  const setStep = useCallback((step: number) => {
    setState(prev => ({ ...prev, step }));
  }, []);

  const setSelectedRoom = useCallback((room: Room) => {
    setState(prev => ({ ...prev, selectedRoom: room }));
  }, []);

  const setDates = useCallback((checkIn: Date | null, checkOut: Date | null) => {
    setState(prev => ({ ...prev, checkIn, checkOut }));
  }, []);

  const setGuests = useCallback((guests: number) => {
    setState(prev => ({ ...prev, guests }));
  }, []);

  const setGuestDetails = useCallback((details: Partial<Pick<BookingState, 'guestName' | 'guestEmail' | 'guestPhone' | 'specialRequests'>>) => {
    setState(prev => ({ ...prev, ...details }));
  }, []);

  const setPaymentScreenshot = useCallback((screenshot: string | null) => {
    setState(prev => ({ ...prev, paymentScreenshot: screenshot }));
  }, []);

  const setBookingId = useCallback((id: string) => {
    setState(prev => ({ ...prev, bookingId: id }));
  }, []);

  const nextStep = useCallback(() => {
    setState(prev => ({ ...prev, step: prev.step + 1 }));
  }, []);

  const prevStep = useCallback(() => {
    setState(prev => ({ ...prev, step: Math.max(1, prev.step - 1) }));
  }, []);

  const resetBooking = useCallback(() => {
    setState({
      step: 1,
      selectedRoom: null,
      checkIn: null,
      checkOut: null,
      guests: 1,
      guestName: '',
      guestEmail: '',
      guestPhone: '',
      specialRequests: '',
      paymentScreenshot: null,
      bookingId: null
    });
  }, []);

  return {
    state,
    setStep,
    setSelectedRoom,
    setDates,
    setGuests,
    setGuestDetails,
    setPaymentScreenshot,
    setBookingId,
    nextStep,
    prevStep,
    resetBooking
  };
};
