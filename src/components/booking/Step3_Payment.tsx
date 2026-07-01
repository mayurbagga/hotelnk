import { QRCodeSVG } from 'qrcode.react';
import { Upload, ExternalLink, Check, AlertCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import { format } from 'date-fns';
import { generateUPILink } from '../../utils/upiLinkGenerator';
import { generateBookingId } from '../../utils/bookingIdGenerator';
import { CONFIG } from '../../config';

interface Step3Props {
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
    paymentScreenshot: string | null;
    bookingId: string | null;
  };
  setPaymentScreenshot: (screenshot: string | null) => void;
  setBookingId: (id: string) => void;
  nights: number;
  room: { name: string; pricePerNight: number };
  total: number;
}

const Step3_Payment = ({
  nextStep,
  prevStep,
  state,
  setPaymentScreenshot,
  setBookingId,
  nights,
  room,
  total
}: Step3Props) => {
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const bookingId = state.bookingId || generateBookingId();
  const upiLink = generateUPILink(total, state.guestName, bookingId);

  if (!state.bookingId) {
    setBookingId(bookingId);
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB');
      setIsUploading(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPaymentScreenshot(reader.result as string);
      setIsUploading(false);
    };
    reader.onerror = () => {
      setUploadError('Failed to read file');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPaymentScreenshot(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-playfair text-2xl text-cream mb-2">Payment Instructions</h3>
        <p className="text-cream/60">Complete payment via UPI to confirm your booking</p>
      </div>

      {/* Booking Summary */}
      <div className="bg-charcoal rounded-xl p-4">
        <h4 className="text-gold font-semibold mb-3">Booking Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-cream/70">
            <span>Booking ID</span>
            <span className="text-cream font-medium">{bookingId}</span>
          </div>
          <div className="flex justify-between text-cream/70">
            <span>Room</span>
            <span className="text-cream">{room.name}</span>
          </div>
          <div className="flex justify-between text-cream/70">
            <span>Dates</span>
            <span className="text-cream">
              {state.checkIn && format(state.checkIn, 'MMM dd')} - {state.checkOut && format(state.checkOut, 'MMM dd, yyyy')}
            </span>
          </div>
          <div className="flex justify-between text-cream/70">
            <span>Guests</span>
            <span className="text-cream">{state.guests}</span>
          </div>
          <div className="flex justify-between text-cream/70">
            <span>Nights</span>
            <span className="text-cream">{nights}</span>
          </div>
          <div className="flex justify-between text-cream/70">
            <span>Rate</span>
            <span className="text-cream">₹{room.pricePerNight.toLocaleString()}/night</span>
          </div>
          <div className="flex justify-between text-gold text-xl font-semibold pt-2 border-t border-cream/10 mt-2">
            <span>Total Amount</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* UPI Payment Section */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* QR Code */}
        <div
          className="flex-1 flex flex-col items-center bg-charcoal rounded-xl p-6"
        >
          <div
            className="bg-white p-4 rounded-xl mb-4"
          >
            <QRCodeSVG
              value={upiLink}
              size={180}
              level="H"
              includeMargin={false}
            />
          </div>
          <p className="text-cream/60 text-sm text-center">
            Scan this QR code with any UPI app
          </p>
        </div>

        {/* Payment Details */}
        <div className="flex-1 space-y-4">
          <div className="bg-charcoal rounded-xl p-4">
            <p className="text-cream/60 text-sm mb-1">Pay to</p>
            <p className="text-cream font-semibold">{CONFIG.upiName}</p>
            <p className="text-gold">{CONFIG.upiId}</p>
          </div>

          <a
            href={upiLink}
            className="block w-full py-4 bg-gold text-charcoal rounded-xl font-semibold text-center hover:bg-gold-light transition-colors"
          >
            <div className="flex items-center justify-center gap-2">
              Pay via UPI App
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>

          <p className="text-cream/40 text-xs text-center">
            Tap to open your preferred UPI app (GPay, PhonePe, Paytm, etc.)
          </p>
        </div>
      </div>

      {/* Upload Payment Screenshot */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 transition-colors ${
          state.paymentScreenshot
            ? 'border-gold bg-gold/5'
            : 'border-cream/20 hover:border-cream/40'
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {state.paymentScreenshot ? (
          <div className="flex flex-col items-center">
            <div
              className="relative"
            >
              <img
                src={state.paymentScreenshot}
                alt="Payment screenshot"
                className="max-h-40 rounded-lg mb-4"
              />
              <button
                onClick={() => setPaymentScreenshot(null)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white"
              >
                ×
              </button>
            </div>
            <div className="flex items-center gap-2 text-gold">
              <Check className="w-5 h-5" />
              <span>Payment screenshot uploaded</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {isUploading ? (
              <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full mb-2" />
            ) : (
              <>
                <Upload className="w-10 h-10 text-cream/40 mb-3" />
                <p className="text-cream/60 mb-2">
                  After payment, upload a screenshot
                </p>
                <p className="text-cream/40 text-xs">
                  Drag & drop or click to upload
                </p>
              </>
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {uploadError && (
        <div
          className="flex items-center gap-2 text-red-500 text-sm"
        >
          <AlertCircle className="w-4 h-4" />
          {uploadError}
        </div>
      )}

      <div className="bg-gold/10 border border-gold/20 rounded-xl p-4">
        <p className="text-cream/70 text-sm">
          <strong className="text-gold">Important:</strong> After uploading your payment screenshot, click "Confirm Booking" below. Our manager will verify your payment and contact you within 2-4 hours.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-cream/10 text-cream hover:bg-cream/20 transition-colors"
        >
          Back
        </button>

        <button
          onClick={nextStep}
          disabled={!state.paymentScreenshot}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold ${
            state.paymentScreenshot
              ? 'bg-gold text-charcoal hover:bg-gold-light'
              : 'bg-cream/10 text-cream/40 cursor-not-allowed'
          }`}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default Step3_Payment;
