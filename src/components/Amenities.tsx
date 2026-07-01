import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Waves, UtensilsCrossed, Car, Dumbbell, Wifi, Coffee, Sparkles, Shield, Clock } from 'lucide-react';

const amenities = [
  { icon: Waves, title: 'Infinity Pool', description: 'Rooftop infinity pool with panoramic views' },
  { icon: Sparkles, title: 'Luxury Spa', description: 'World-class spa and wellness center' },
  { icon: UtensilsCrossed, title: 'Fine Dining', description: 'Multi-cuisine restaurant by celebrity chefs' },
  // { icon: Car, title: 'Valet Parking', description: 'Complimentary valet and secure parking' },
  // { icon: Dumbbell, title: 'Fitness Center', description: 'State-of-the-art gym equipment' },
  { icon: Wifi, title: 'High-Speed WiFi', description: 'Complimentary high-speed internet' },
  { icon: Coffee, title: 'In-Room Dining', description: '24/7 room service available' },
  { icon: Shield, title: '24/7 Security', description: 'Round-the-clock security surveillance' },
  // { icon: Clock, title: 'Concierge', description: 'Personalized concierge services' }
];

const Amenities = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 20
      }
    }
  };

  return (
    <section id="amenities" className="py-24 bg-slate-hotel px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold uppercase tracking-[0.2em] text-sm mb-4 block">
            Hotel Facilities
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-cream mb-4">
            Premium Amenities
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto">
            Indulge in our curated collection of world-class facilities designed for your comfort
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {amenities.map((amenity) => (
            <motion.div
              key={amenity.title}
              variants={item}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group bg-charcoal rounded-xl p-6 text-center hover:bg-gold/10 transition-colors cursor-pointer"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gold/10 rounded-full flex items-center justify-center group-hover:bg-gold transition-colors">
                <amenity.icon className="w-8 h-8 text-gold group-hover:text-charcoal transition-colors" />
              </div>
              <h3 className="font-semibold text-cream mb-2">{amenity.title}</h3>
              <p className="text-cream/60 text-sm">{amenity.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Amenities;
