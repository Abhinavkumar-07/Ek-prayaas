import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaHandsHelping, FaGraduationCap, FaUserFriends } from 'react-icons/fa';
import { initiativesAPI, eventsAPI } from '../services/api';
import { toast } from 'react-toastify';

const Home = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [initiativesRes, eventsRes] = await Promise.all([
        initiativesAPI.getFeatured(),
        eventsAPI.getUpcoming(),
      ]);
      setInitiatives(initiativesRes.data.data.slice(0, 3));
      setUpcomingEvents(eventsRes.data.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: FaGraduationCap, label: 'Students Helped', value: '5000+', color: 'text-accent-orange' },
    { icon: FaHeart, label: 'Lives Touched', value: '10,000+', color: 'text-secondary' },
    { icon: FaUserFriends, label: 'Active Volunteers', value: '200+', color: 'text-primary' },
    { icon: FaHandsHelping, label: 'Initiatives', value: '15+', color: 'text-accent-purple' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-secondary pt-32 pb-20 overflow-hidden">
        {/* Animated Background Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-accent-yellow flex items-center justify-center text-white font-bold">
                    E
                  </div>
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold">
                    P
                  </div>
                </div>
                <span className="text-white/90 font-medium">Ek-Prayas</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Together, We Can<br />
                <span className="text-accent-yellow">Change Lives</span><br />
                One Step at a Time
              </h1>

              <p className="text-white/90 text-lg mb-8 leading-relaxed">
                Join our student-led movement to empower government school students through education, support elderly communities, and create lasting positive impact in society.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/get-involved" className="btn-primary bg-white text-primary hover:bg-neutral-100">
                  Join Us Today
                </Link>
                <Link to="/about" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
                  Learn More
                </Link>
              </div>
            </motion.div>

            {/* Right Image/Graphic */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800"
                  alt="Students learning together"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x600/00CEC9/FFFFFF?text=Ek-Prayas';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 max-w-xs"
              >
                <p className="text-sm font-semibold text-neutral-800">
                  "Ek-Prayas changed my perspective on giving back to society"
                </p>
                <p className="text-xs text-neutral-600 mt-2">- Student Volunteer</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 ${stat.color} mb-3`}>
                  <stat.icon size={28} />
                </div>
                <h3 className="text-3xl font-bold text-neutral-900">{stat.value}</h3>
                <p className="text-neutral-600 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title text-primary">Our Story</h2>
              <h3 className="text-2xl font-semibold text-neutral-800 mb-4">Who We Are</h3>
              <p className="text-neutral-600 leading-relaxed mb-4">
                Ek-Prayas is a student-led social welfare club committed to making a positive impact in society. We believe that even small efforts can create meaningful change when done with dedication and compassion.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-6">
                Our mission is to create a society where kindness, equality, and support reach everyone, especially those in need. Through our initiatives, we aim to support each and every person to live a life with dignity and hope.
              </p>
              <Link to="/about" className="btn-primary">
                Read Full Story
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400"
                alt="Education initiative"
                className="rounded-lg shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400"
                alt="Community service"
                className="rounded-lg shadow-lg mt-8"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title text-center">Our Initiatives</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Discover the programs and projects that drive our mission forward
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="bg-neutral-200 h-48 rounded-lg mb-4" />
                  <div className="bg-neutral-200 h-6 rounded mb-2" />
                  <div className="bg-neutral-200 h-4 rounded" />
                </div>
              ))
            ) : (
              initiatives.map((initiative, index) => (
                <motion.div
                  key={initiative._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/initiatives/${initiative._id}`} className="card group block">
                    <div className="relative overflow-hidden">
                      <img
                        src={initiative.image || 'https://via.placeholder.com/400x300'}
                        alt={initiative.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                          {initiative.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-primary transition-colors">
                        {initiative.title}
                      </h3>
                      <p className="text-neutral-600 text-sm line-clamp-3">
                        {initiative.shortDescription || initiative.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Link to="/initiatives" className="btn-outline">
              View All Initiatives
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join us in our mission to create positive change. Whether you want to volunteer, donate, or partner with us, there's a place for you at Ek-Prayas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/get-involved" className="bg-white text-primary hover:bg-neutral-100 px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
                Become a Volunteer
              </Link>
              <Link to="/contact" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-semibold transition-all">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
