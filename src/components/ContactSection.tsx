import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { useConfig } from '../contexts/ConfigContext';

const ContactSection = () => {
  const { config } = useConfig();
  return (
    <section id="contact" className="py-24 bg-charcoal px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold uppercase tracking-[0.2em] text-sm mb-4 block">
            Get In Touch
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-cream mb-4">
            Location & Contact
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto">
            We're here to assist you with any inquiries about your stay
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-[400px] rounded-2xl overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5669283795595!2d77.20900311508096!3d28.61393908242046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2daa9eb4d0b%3A0x717971125923e5d!2sIndia%20Gate!5e0!3m2!1sen!2sin!4v1641234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale contrast-125 opacity-80"
            />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ x: 5 }}
              className="bg-charcoal-light rounded-xl p-6 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-cream mb-1">Address</h3>
                <p className="text-cream/60">Hospital Road</p>
                <p className="text-cream/60">Bhuj, Gujarat, India</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              className="bg-charcoal-light rounded-xl p-6 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-cream mb-1">Phone</h3>
                <a
                  href={`tel:${config.whatsappNumber}`}
                  className="text-cream/60 hover:text-gold transition-colors"
                >
                  +{config.whatsappNumber}
                </a>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              className="bg-charcoal-light rounded-xl p-6 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-cream mb-1">Email</h3>
                <a
                  href={`mailto:${config.ownerEmail}`}
                  className="text-cream/60 hover:text-gold transition-colors"
                >
                  {config.ownerEmail}
                </a>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              className="bg-charcoal-light rounded-xl p-6 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-cream mb-1">Reception Hours</h3>
                <p className="text-cream/60">24/7 Front Desk Available</p>
                <p className="text-cream/60">Check-in: 3:00 PM | Check-out: 11:00 AM</p>
              </div>
            </motion.div>

            <motion.a
              href={`https://wa.me/${config.whatsappNumber}?text=Hi, I'd like to inquire about booking at ${config.hotelName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 bg-green-600 hover:bg-green-700 rounded-xl text-white font-semibold transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
