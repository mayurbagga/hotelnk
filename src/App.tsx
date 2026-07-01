import { motion } from 'framer-motion';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import RoomsGallery from './components/RoomsGallery';
import Amenities from './components/Amenities';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-charcoal"
    >
      <Navbar />
      <Hero />
      <RoomsGallery />
      <Amenities />
      <Testimonials />
      <ContactSection />
      <Footer />
    </motion.div>
  );
}

export default App;
