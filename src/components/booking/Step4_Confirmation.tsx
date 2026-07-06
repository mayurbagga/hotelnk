import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle, Calendar, Mail, Phone } from 'lucide-react';
import { format } from 'date-fns';
import { useConfig } from '../../contexts/ConfigContext';
import { sendEmails } from '../../utils/emailService';

interface Step4Props {
  step: number;
  state: {
    checkIn: Date | null;
    checkOut: Date | null;
    guests: number;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    specialRequests: string;
    paymentScreenshot: string | null;
    bookingId: string | null;
  };
  room: { name: string; pricePerNight: number };
  nights: number;
  total: number;
  onClose: () => void;
  resetBooking: () => void;
}

const Step4_Confirmation = ({
  state,
  room,
  nights,
  total,
  onClose,
  resetBooking
}: Step4Props) => {
  const { config } = useConfig();
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 100,
      origin: { y: 0.7 }
    };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sendConfirmationEmails = async () => {
      if (!state.bookingId) return;

      const result = await sendEmails(config, {
        bookingId: state.bookingId,
        guestName: state.guestName,
        guestEmail: state.guestEmail,
        guestPhone: state.guestPhone,
        roomName: room.name,
        checkIn: state.checkIn ? format(state.checkIn, 'MMM dd, yyyy') : '',
        checkOut: state.checkOut ? format(state.checkOut, 'MMM dd, yyyy') : '',
        nights,
        totalAmount: total,
        specialRequests: state.specialRequests,
        upiReference: state.bookingId
      });

      if (result) {
        setEmailSent(true);
      } else {
        setEmailError(true);
      }
    };

    sendConfirmationEmails();
  }, []);

  const handleClose = () => {
    resetBooking();
    onClose();
  };

  return (
    <div className="space-y-6 text-center">
      <div
        className="flex justify-center"
      >
        <div className="relative">
          <div
            className="w-24 h-24 rounded-full bg-gold/20 flex items-center justify-center"
          >
            <div>
              <CheckCircle className="w-12 h-12 text-gold" />
            </div>
          </div>

          <div
            className="absolute -inset-4 rounded-full border-2 border-gold/30"
          />
        </div>
      </div>

      <div>
        <h3 className="font-playfair text-3xl text-cream mb-2">Booking Confirmed!</h3>
        <p className="text-cream/60">Your reservation has been received</p>
      </div>

      <div
        className="bg-charcoal rounded-xl p-6 text-left"
      >
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-cream/10">
          <Calendar className="w-5 h-5 text-gold" />
          <div>
            <p className="text-cream font-semibold">
              {state.checkIn && format(state.checkIn, 'MMM dd')} - {state.checkOut && format(state.checkOut, 'MMM dd, yyyy')}
            </p>
            <p className="text-cream/60 text-sm">{nights} nights at {room.name}</p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-cream/60">Booking Reference</span>
            <span className="text-gold font-semibold">{state.bookingId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cream/60">Guest</span>
            <span className="text-cream">{state.guestName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cream/60">Total Paid</span>
            <span className="text-cream font-semibold">₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div
        className="bg-gold/10 border border-gold/20 rounded-xl p-4"
      >
        <p className="text-cream/70">
          Your booking is under review. Our manager will contact you at{' '}
          <span className="text-gold font-medium">{state.guestPhone}</span> within 2-4 hours
          to verify your payment and finalize your reservation.
        </p>
      </div>

      {emailSent && (
        <div
          className="flex items-center justify-center gap-2 text-green-500 text-sm"
        >
          <Mail className="w-4 h-4" />
          Confirmation email sent to {state.guestEmail}
        </div>
      )}

      {emailError && (
        <div
          className="flex items-center justify-center gap-2 text-yellow-500 text-sm"
        >
          <Mail className="w-4 h-4" />
          Confirmation email pending (EmailJS not configured)
        </div>
      )}

      <div
        className="space-y-3"
      >
        <div className="flex items-center justify-center gap-4 text-sm text-cream/60">
          <a
            href={`tel:${config.whatsappNumber}`}
            className="flex items-center gap-1 hover:text-gold transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call Hotel
          </a>
          <span>|</span>
          <a
            href={`https://wa.me/${config.whatsappNumber}`}
            className="flex items-center gap-1 hover:text-gold transition-colors"
          >
            WhatsApp
          </a>
        </div>

        <button
          onClick={handleClose}
          className="w-full py-4 bg-gold text-charcoal rounded-xl font-semibold hover:bg-gold-light transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Step4_Confirmation;
