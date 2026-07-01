import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { CONFIG } from '../config';

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const words = `Welcome to ${CONFIG.hotelName}`.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const child = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Background with parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/room-photos/room-6.jpeg')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal" />
      </motion.div>

      {/* Ambient particle overlay */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gold/20 blur-sm"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`
            }}
            animate={{
              y: [null, `${Math.random() * 100}%`],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 h-full flex flex-col items-center justify-center px-4"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div variants={child} className="mb-4">
            <span className="text-gold uppercase tracking-[0.3em] text-sm font-medium">
              Luxury Redefined
            </span>
          </motion.div>

          <motion.h1
            variants={container}
            initial="hidden"
            animate="visible"
            className="font-playfair text-4xl md:text-6xl lg:text-7xl font-semibold mb-6"
          >
            {words.map((word, index) => (
              <motion.span
                key={index}
                variants={child}
                className={`inline-block mr-3 ${index === 2 || index === 3 ? 'text-gradient-gold' : 'text-cream'}`}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={child}
            className="text-cream/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light"
          >
            Experience unparalleled luxury in the heart of serenity. Where every moment becomes a treasured memory.
          </motion.p>

          <motion.div variants={child}>
            <motion.a
              href="#rooms"
              className="shimmer-button inline-block px-8 py-4 rounded-full text-charcoal font-semibold text-lg shadow-lg shadow-gold/20"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(201, 168, 76, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              animate={{
                backgroundPosition: ['0% 0%', '200% 0%']
              }}
              transition={{
                backgroundPosition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }
              }}
            >
              Check Availability
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-gold/60" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
