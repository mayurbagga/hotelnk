import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Star, Users, Calendar, Video } from 'lucide-react';
import { Room } from '../config';
import BookingWizard from './BookingWizard';

interface RoomDetailModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
}

const RoomDetailModal = ({ room, isOpen, onClose }: RoomDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBooking, setShowBooking] = useState(false);

  if (!room) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-charcoal-light rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-charcoal/80 rounded-full flex items-center justify-center text-cream hover:text-gold transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Slider */}
            <div className="relative h-64 md:h-96 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={room.images[currentImageIndex]}
                  alt={room.name}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-charcoal/60 rounded-full flex items-center justify-center text-cream hover:bg-gold hover:text-charcoal transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-charcoal/60 rounded-full flex items-center justify-center text-cream hover:bg-gold hover:text-charcoal transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {room.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === currentImageIndex ? 'bg-gold' : 'bg-cream/40'
                    }`}
                  />
                ))}
              </div>

              {room.virtualTour && (
                <button className="absolute top-4 left-4 flex items-center gap-2 bg-gold text-charcoal px-4 py-2 rounded-full font-semibold text-sm">
                  <Video className="w-4 h-4" />
                  360° Virtual Tour
                </button>
              )}
            </div>

            {/* Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="p-8"
            >
              <motion.div variants={itemVariants} className="flex items-center justify-between mb-4">
                <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-cream">
                  {room.name}
                </h2>
                <div className="flex items-center gap-1 text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </motion.div>

              <motion.p variants={itemVariants} className="text-cream/70 text-lg mb-6">
                {room.description}
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-cream/70">
                  <Users className="w-5 h-5 text-gold" />
                  <span>Up to {room.maxGuests} guests</span>
                </div>
                <div className="flex items-center gap-2 text-cream/70">
                  <Calendar className="w-5 h-5 text-gold" />
                  <span>Instant booking available</span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-8">
                <h3 className="text-cream font-semibold mb-3">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {room.amenities.map((amenity, idx) => (
                    <motion.div
                      key={amenity}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: { delay: idx * 0.1 }
                        }
                      }}
                      className="flex items-center gap-2 bg-gold/10 rounded-lg px-4 py-2 text-gold"
                    >
                      <div className="w-2 h-2 rounded-full bg-gold" />
                      <span>{amenity}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center justify-between">
                <div>
                  <span className="text-cream/60">Starting from</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-gold text-4xl font-semibold">
                      ₹{room.pricePerNight.toLocaleString()}
                    </span>
                    <span className="text-cream/40">/night</span>
                  </div>
                </div>

                <motion.button
                  onClick={() => setShowBooking(true)}
                  className="shimmer-button px-8 py-4 rounded-full text-charcoal font-semibold text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book This Room
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>

          <BookingWizard
            room={room}
            isOpen={showBooking}
            onClose={() => setShowBooking(false)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RoomDetailModal;
