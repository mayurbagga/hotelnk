import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link } from 'react-scroll';
import { useConfig } from '../contexts/ConfigContext';

const Navbar = () => {
  const { config } = useConfig();
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  const background = useTransform(
    scrollY,
    [0, 100],
    ['rgba(26, 26, 46, 0)', 'rgba(26, 26, 46, 0.95)']
  );

  const border = useTransform(
    scrollY,
    [0, 100],
    ['rgba(245, 240, 232, 0)', 'rgba(245, 240, 232, 0.1)']
  );

  const navLinks = ['hero', 'rooms', 'amenities', 'testimonials', 'contact'];

  return (
    <motion.nav
      style={{ background, borderBottom: border }}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="hero"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            className="cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <img
                src="/hotelnklogo.png"
                alt={`${config.hotelName} Logo`}
                className="h-20 object-contain"
              />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((section) => (
              <Link
                key={section}
                to={section}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className="text-cream/60 hover:text-gold transition-colors cursor-pointer text-sm font-medium"
                activeClass="text-gold"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href={`tel:${config.whatsappNumber}`}
              className="flex items-center gap-2 text-cream/60 hover:text-gold transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">Call Now</span>
            </motion.a>
            <Link
              to="rooms"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
            >
              <motion.button
                className="px-6 py-2.5 shimmer-button text-charcoal rounded-full text-sm font-bold shadow-[0_0_15px_rgba(201,168,76,0.3)] tracking-wide whitespace-nowrap"
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(201,168,76,0.5)' }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  backgroundPosition: ['0% 0%', '200% 0%']
                }}
                transition={{
                  backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' }
                }}
              >
                BOOK NOW
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cream p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-charcoal-light rounded-2xl p-6 mt-2 mb-4"
          >
            <div className="space-y-4">
              {navLinks.map((section) => (
                <Link
                  key={section}
                  to={section}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className="block text-cream/60 hover:text-gold transition-colors cursor-pointer py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Link>
              ))}
              <div className="pt-4 border-t border-cream/10">
                <Link
                  to="rooms"
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  onClick={() => setIsOpen(false)}
                  className="block w-full"
                >
                  <motion.button
                    className="w-full py-4 shimmer-button text-charcoal rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(201,168,76,0.3)] tracking-wide"
                    whileTap={{ scale: 0.98 }}
                    animate={{
                      backgroundPosition: ['0% 0%', '200% 0%'],
                      boxShadow: [
                        '0 0 20px rgba(201,168,76,0.3)',
                        '0 0 40px rgba(201,168,76,0.5)',
                        '0 0 20px rgba(201,168,76,0.3)'
                      ]
                    }}
                    transition={{
                      backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' },
                      boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                    }}
                  >
                    BOOK NOW
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
