import { format, parseISO } from 'date-fns';
import { ChevronRight, Calendar, Users } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Room } from '../../config';

interface Step1Props {
  step: number;
  nextStep: () => void;
  room: Room;
  state: {
    checkIn: Date | null;
    checkOut: Date | null;
    guests: number;
  };
  setDates: (checkIn: Date | null, checkOut: Date | null) => void;
  setGuests: (guests: number) => void;
  nights: number;
  total: number;
}

const Step1_Dates = ({
  nextStep,
  room,
  state,
  setDates,
  setGuests,
  nights,
  total
}: Step1Props) => {
  const bookedDates = room.bookedDates.map((d) => parseISO(d));

  const disabledDays = [
    { before: new Date() },
    ...bookedDates
  ];

  const handleSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (range?.from && range?.to) {
      setDates(range.from, range.to);
    } else if (range?.from) {
      setDates(range.from, null);
    }
  };

  const selectedRange = state.checkIn && state.checkOut
    ? { from: state.checkIn, to: state.checkOut }
    : state.checkIn
    ? { from: state.checkIn }
    : undefined;

  const canProceed = state.checkIn && state.checkOut && nights > 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-playfair text-2xl text-cream mb-2">Select Your Dates</h3>
        <p className="text-cream/60">Choose your check-in and check-out dates</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <style>
            {`
              .rdp {
                --rdp-cell-size: 40px;
                --rdp-accent-color: #C9A84C;
                --rdp-background-color: rgba(201, 168, 76, 0.1);
              }
              .rdp-dark {
                color: #F5F0E8;
              }
              .rdp-day_disabled {
                color: rgba(245, 240, 232, 0.3);
                text-decoration: line-through;
              }
              .rdp-day_booked {
                background-color: rgba(201, 168, 76, 0.1);
                border-radius: 8px;
              }
            `}
          </style>
          <DayPicker
            mode="range"
            selected={selectedRange}
            onSelect={handleSelect}
            numberOfMonths={2}
            disabled={disabledDays}
            className="rdp-dark bg-charcoal rounded-xl p-4"
            modifiers={{
              booked: bookedDates
            }}
            modifiersStyles={{
              booked: {
                textDecoration: 'line-through',
                color: 'rgba(245, 240, 232, 0.3)'
              }
            }}
          />
        </div>

        <div className="space-y-4 md:w-48">
          <div className="bg-charcoal rounded-xl p-4">
            <div className="flex items-center gap-2 text-gold mb-2">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-semibold">Check In</span>
            </div>
            <p className="text-cream font-medium">
              {state.checkIn ? format(state.checkIn, 'MMM dd, yyyy') : 'Select date'}
            </p>
          </div>

          <div className="bg-charcoal rounded-xl p-4">
            <div className="flex items-center gap-2 text-gold mb-2">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-semibold">Check Out</span>
            </div>
            <p className="text-cream font-medium">
              {state.checkOut ? format(state.checkOut, 'MMM dd, yyyy') : 'Select date'}
            </p>
          </div>

          <div className="bg-charcoal rounded-xl p-4">
            <div className="flex items-center gap-2 text-gold mb-2">
              <Users className="w-5 h-5" />
              <span className="text-sm font-semibold">Guests</span>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setGuests(Math.max(1, state.guests - 1))}
                className="w-8 h-8 rounded-full bg-cream/10 text-cream flex items-center justify-center hover:bg-gold hover:text-charcoal transition-colors"
              >
                -
              </button>
              <span className="text-cream text-xl font-semibold">{state.guests}</span>
              <button
                onClick={() => setGuests(Math.min(room.maxGuests, state.guests + 1))}
                className="w-8 h-8 rounded-full bg-cream/10 text-cream flex items-center justify-center hover:bg-gold hover:text-charcoal transition-colors"
              >
                +
              </button>
            </div>
            <p className="text-cream/40 text-xs mt-2">Max {room.maxGuests} guests</p>
          </div>
        </div>
      </div>

      {canProceed && (
        <div
          className="bg-gold/10 rounded-xl p-4 border border-gold/20"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-cream/70">₹{room.pricePerNight.toLocaleString()} x {nights} nights</span>
            <span className="text-gold text-2xl font-semibold">
              ₹{total.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={nextStep}
          disabled={!canProceed}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold ${
            canProceed
              ? 'bg-gold text-charcoal hover:bg-gold-light'
              : 'bg-cream/10 text-cream/40 cursor-not-allowed'
          }`}
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Step1_Dates;
