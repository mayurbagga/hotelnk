import { useState } from 'react';
import { X } from 'lucide-react';
import { Room } from '../config';
import { differenceInDays } from 'date-fns';
import { useBooking } from '../hooks/useBooking';
import Step1_Dates from './booking/Step1_Dates';
import Step2_GuestDetails from './booking/Step2_GuestDetails';
import Step3_Payment from './booking/Step3_Payment';
import Step4_Confirmation from './booking/Step4_Confirmation';

interface BookingWizardProps {
  room: Room;
  isOpen: boolean;
  onClose: () => void;
}

const BookingWizard = ({ room, isOpen, onClose }: BookingWizardProps) => {
  const {
    state,
    setDates,
    setGuests,
    setGuestDetails,
    setPaymentScreenshot,
    setBookingId,
    nextStep,
    prevStep,
    resetBooking
  } = useBooking();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateNights = () => {
    if (state.checkIn && state.checkOut) {
      return differenceInDays(state.checkOut, state.checkIn);
    }
    return 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return nights * room.pricePerNight;
  };

  const nights = calculateNights();
  const total = calculateTotal();

  const stepControls = {
    step: state.step,
    nextStep,
    prevStep,
    room,
    state,
    setDates,
    setGuests,
    setGuestDetails,
    setPaymentScreenshot,
    setBookingId,
    nights,
    total: total,
    calculateNights,
    calculateTotal,
    onClose,
    resetBooking,
    isSubmitting,
    setIsSubmitting
  };

  const renderStep = () => {
    switch (state.step) {
      case 1:
        return <Step1_Dates {...stepControls} />;
      case 2:
        return <Step2_GuestDetails {...stepControls} />;
      case 3:
        return <Step3_Payment {...stepControls} />;
      case 4:
        return <Step4_Confirmation {...stepControls} />;
      default:
        return <Step1_Dates {...stepControls} />;
    }
  };

  const handleClose = () => {
    resetBooking();
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-charcoal/90 backdrop-blur-sm"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-charcoal-light rounded-t-3xl md:rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-charcoal-light border-b border-cream/10 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="font-playfair text-xl text-cream font-semibold">
                  Book {room.name}
                </h2>
                <p className="text-cream/60 text-sm">Step {state.step} of 4</p>
              </div>
              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center text-cream hover:text-gold transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="px-6 pt-4">
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`flex-1 h-1 rounded-full transition-colors ${
                      step <= state.step ? 'bg-gold' : 'bg-cream/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="p-6 overflow-hidden">
              <div key={state.step}>
                {renderStep()}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingWizard;
