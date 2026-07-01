import { useState } from 'react';
import { ChevronLeft, ChevronRight, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

interface Step2Props {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  state: {
    checkIn: Date | null;
    checkOut: Date | null;
    guests: number;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    specialRequests: string;
  };
  setGuestDetails: (details: Partial<{
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    specialRequests: string;
  }>) => void;
  nights: number;
  room: { name: string; pricePerNight: number };
}

const Step2_GuestDetails = ({
  nextStep,
  prevStep,
  state,
  setGuestDetails,
  nights,
  room
}: Step2Props) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!state.guestName.trim()) {
      newErrors.guestName = 'Name is required';
    }

    if (!state.guestEmail.trim()) {
      newErrors.guestEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.guestEmail)) {
      newErrors.guestEmail = 'Invalid email format';
    }

    if (!state.guestPhone.trim()) {
      newErrors.guestPhone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(state.guestPhone.replace(/\D/g, ''))) {
      newErrors.guestPhone = 'Enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      nextStep();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setGuestDetails({ [field]: value });
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-playfair text-2xl text-cream mb-2">Guest Details</h3>
        <p className="text-cream/60">Please provide your contact information</p>
      </div>

      {/* Booking Summary */}
      <div className="bg-charcoal rounded-xl p-4">
        <div className="flex justify-between items-center text-cream/70 mb-2">
          <span>{room.name}</span>
          <span>₹{room.pricePerNight.toLocaleString()}/night</span>
        </div>
        <div className="flex justify-between items-center text-cream/70 mb-2">
          <span>
            {state.checkIn && format(state.checkIn, 'MMM dd')} - {state.checkOut && format(state.checkOut, 'MMM dd')}
          </span>
          <span>{nights} nights</span>
        </div>
        <div className="flex justify-between items-center text-gold text-xl font-semibold pt-2 border-t border-cream/10">
          <span>Total</span>
          <span>₹{(room.pricePerNight * nights).toLocaleString()}</span>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-cream/70 text-sm mb-2">
            <User className="w-4 h-4 text-gold" />
            Full Name
          </label>
          <input
            type="text"
            value={state.guestName}
            onChange={(e) => handleInputChange('guestName', e.target.value)}
            className={`w-full bg-charcoal rounded-xl px-4 py-3 text-cream border ${
              errors.guestName ? 'border-red-500' : 'border-cream/10'
            } focus:border-gold focus:outline-none transition-colors`}
            placeholder="John Doe"
          />
          {errors.guestName && (
            <p
              className="text-red-500 text-sm mt-1"
            >
              {errors.guestName}
            </p>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2 text-cream/70 text-sm mb-2">
            <Mail className="w-4 h-4 text-gold" />
            Email Address
          </label>
          <input
            type="email"
            value={state.guestEmail}
            onChange={(e) => handleInputChange('guestEmail', e.target.value)}
            className={`w-full bg-charcoal rounded-xl px-4 py-3 text-cream border ${
              errors.guestEmail ? 'border-red-500' : 'border-cream/10'
            } focus:border-gold focus:outline-none transition-colors`}
            placeholder="john@example.com"
          />
          {errors.guestEmail && (
            <p
              className="text-red-500 text-sm mt-1"
            >
              {errors.guestEmail}
            </p>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2 text-cream/70 text-sm mb-2">
            <Phone className="w-4 h-4 text-gold" />
            Phone Number
          </label>
          <input
            type="tel"
            value={state.guestPhone}
            onChange={(e) => handleInputChange('guestPhone', e.target.value)}
            className={`w-full bg-charcoal rounded-xl px-4 py-3 text-cream border ${
              errors.guestPhone ? 'border-red-500' : 'border-cream/10'
            } focus:border-gold focus:outline-none transition-colors`}
            placeholder="9876543210"
          />
          {errors.guestPhone && (
            <p
              className="text-red-500 text-sm mt-1"
            >
              {errors.guestPhone}
            </p>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2 text-cream/70 text-sm mb-2">
            <MessageSquare className="w-4 h-4 text-gold" />
            Special Requests (Optional)
          </label>
          <textarea
            value={state.specialRequests}
            onChange={(e) => handleInputChange('specialRequests', e.target.value)}
            className="w-full bg-charcoal rounded-xl px-4 py-3 text-cream border border-cream/10 focus:border-gold focus:outline-none transition-colors resize-none h-24"
            placeholder="Early check-in, dietary requirements, etc."
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-cream/10 text-cream hover:bg-cream/20 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-charcoal font-semibold hover:bg-gold-light transition-colors"
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Step2_GuestDetails;
