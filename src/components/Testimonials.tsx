import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'London, UK',
    rating: 5,
    text: 'An absolutely breathtaking experience. The Presidential Villa exceeded all expectations. The staff made us feel like royalty, and the sunset views from the private pool were unforgettable.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 2,
    name: 'Rajesh Mehta',
    location: 'Mumbai, India',
    rating: 5,
    text: 'Perfect for our anniversary celebration. The Executive Suite was spacious and luxurious. The spa treatments were world-class. Will definitely return!',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 3,
    name: 'Emily Chen',
    location: 'Singapore',
    rating: 5,
    text: 'The attention to detail is remarkable. From the personalized welcome note to the curated dining experiences, every moment was curated to perfection.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 4,
    name: 'Michael Brown',
    location: 'New York, USA',
    rating: 5,
    text: 'The Deluxe Room offered incredible value for the level of luxury provided. The city views were stunning, and the bed was possibly the most comfortable I have ever slept in.',
    image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        damping: 20
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
      transition: {
        type: 'spring' as const,
        damping: 20
      }
    })
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-gradient-hotel px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold uppercase tracking-[0.2em] text-sm mb-4 block">
            Guest Stories
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-cream mb-4">
            What Our Guests Say
          </h2>
        </motion.div>

        <div className="relative">
          <div className="flex justify-center mb-8">
            <div className="relative h-[400px] md:h-[350px] w-full max-w-3xl perspective-1000">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 bg-charcoal-light rounded-2xl p-8 md:p-12 shadow-xl"
                  style={{
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <Quote className="w-12 h-12 text-gold/30 mb-4" />

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-gold fill-current" />
                    ))}
                  </div>

                  <p className="text-cream text-lg md:text-xl leading-relaxed mb-8">
                    "{currentTestimonial.text}"
                  </p>

                  <div className="flex items-center gap-4">
                    <img
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-gold"
                    />
                    <div>
                      <h4 className="font-semibold text-cream">{currentTestimonial.name}</h4>
                      <p className="text-cream/60 text-sm">{currentTestimonial.location}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <motion.button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-charcoal flex items-center justify-center text-cream hover:bg-gold hover:text-charcoal transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'bg-gold w-6' : 'bg-cream/30'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              className="w-12 h-12 rounded-full bg-charcoal flex items-center justify-center text-cream hover:bg-gold hover:text-charcoal transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
