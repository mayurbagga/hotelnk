import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Star, Users, ArrowRight } from 'lucide-react';
import { CONFIG, Room } from '../config';
import RoomDetailModal from './RoomDetailModal';

const RoomsGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 20,
        stiffness: 100
      }
    }
  };

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  return (
    <section id="rooms" className="py-24 bg-gradient-hotel px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold uppercase tracking-[0.2em] text-sm mb-4 block">
            Our Accommodations
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-cream mb-4">
            Exquisite Rooms & Suites
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto">
            Each room is thoughtfully designed to offer an unforgettable experience
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {CONFIG.rooms.map((room) => (
            <motion.div
              key={room.id}
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-charcoal-light rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => handleRoomClick(room)}
            >
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />

                {room.virtualTour && (
                  <div className="absolute top-4 right-4 bg-gold/90 text-charcoal px-3 py-1 rounded-full text-xs font-semibold">
                    360° Tour
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-playfair text-2xl text-cream font-semibold">
                    {room.name}
                  </h3>
                  <div className="flex items-center text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-cream/60 text-sm mb-4 line-clamp-2">
                  {room.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.slice(0, 3).map((amenity) => (
                    <span
                      key={amenity}
                      className="text-xs bg-gold/10 text-gold px-2 py-1 rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="text-xs text-cream/40 px-2 py-1">
                      +{room.amenities.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-cream/60 text-sm">
                    <Users className="w-4 h-4 mr-1" />
                    <span>Up to {room.maxGuests} guests</span>
                  </div>
                  <div className="text-right">
                    <span className="text-cream/60 text-sm">From</span>
                    <span className="text-gold text-2xl font-semibold ml-2">
                      ₹{room.pricePerNight.toLocaleString()}
                    </span>
                    <span className="text-cream/40 text-sm">/night</span>
                  </div>
                </div>

                <motion.button
                  className="mt-4 w-full py-3 bg-gold/10 group-hover:bg-gold text-gold group-hover:text-charcoal rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-300"
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Room
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl shadow-[0_0_40px_rgba(201,168,76,0.3)]" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <RoomDetailModal
        room={selectedRoom}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default RoomsGallery;
