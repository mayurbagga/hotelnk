import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Linkedin, MapPin, Phone, Mail, Heart } from 'lucide-react';
import { CONFIG } from '../config';
import { Link } from 'react-scroll';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-light border-t border-cream/10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-playfair text-2xl text-cream mb-2">{CONFIG.hotelName}</h3>
              <p className="text-cream/60 text-sm mb-4">
                Experience luxury redefined in the heart of the city. Where every moment becomes a treasured memory.
              </p>
              <div className="flex gap-3">
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center text-cream/60 hover:bg-gold hover:text-charcoal transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center text-cream/60 hover:bg-gold hover:text-charcoal transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center text-cream/60 hover:bg-gold hover:text-charcoal transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center text-cream/60 hover:bg-gold hover:text-charcoal transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-cream font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['hero', 'rooms', 'amenities', 'testimonials', 'contact'].map((section) => (
                  <li key={section}>
                    <Link
                      to={section}
                      spy={true}
                      smooth={true}
                      offset={-80}
                      duration={500}
                      className="text-cream/60 hover:text-gold transition-colors cursor-pointer"
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Rooms */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-cream font-semibold mb-4">Our Rooms</h4>
              <ul className="space-y-2">
                {CONFIG.rooms.map((room) => (
                  <li key={room.id}>
                    <Link
                      to="rooms"
                      spy={true}
                      smooth={true}
                      offset={-80}
                      duration={500}
                      className="text-cream/60 hover:text-gold transition-colors cursor-pointer"
                    >
                      {room.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-cream font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-cream/60">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span className="text-sm">Gujarat, India</span>
                </li>
                <li className="flex items-center gap-2 text-cream/60">
                  <Phone className="w-4 h-4 text-gold" />
                  <a href={`tel:${CONFIG.whatsappNumber}`} className="text-sm hover:text-gold transition-colors">
                    +{CONFIG.whatsappNumber}
                  </a>
                </li>
                <li className="flex items-center gap-2 text-cream/60">
                  <Mail className="w-4 h-4 text-gold" />
                  <a href={`mailto:${CONFIG.ownerEmail}`} className="text-sm hover:text-gold transition-colors">
                    {CONFIG.ownerEmail}
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-cream/10 text-center"
        >
          <div className="flex items-center justify-center gap-1 text-cream/40 text-sm mb-2">
            <span>Powered by trust — no surprise charges</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-cream/60 text-sm">
            <span>&copy; {currentYear} {CONFIG.hotelName}.</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-gold fill-current" /> for luxury travelers
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
