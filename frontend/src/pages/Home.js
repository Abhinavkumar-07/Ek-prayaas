import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaHandsHelping, FaUsers, FaArrowRight } from 'react-icons/fa';
import { getInitiatives, getEvents } from '../services/api';
import '../styles/Home.css';

const Home = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [initiativesRes, eventsRes] = await Promise.all([
        getInitiatives({ limit: 3 }),
        getEvents({ status: 'upcoming', limit: 3 })
      ]);
      setInitiatives(initiativesRes.data.data);
      setUpcomingEvents(eventsRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const stats = [
    { icon: <FaUsers />, number: '500+', label: 'Students Helped' },
    { icon: <FaHandsHelping />, number: '50+', label: 'Volunteers' },
    { icon: <FaHeart />, number: '150+', label: 'Elderly Visited' }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <motion.div
            className="hero-logo"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <div className="logo-circle">
              <div className="logo-people">
                <span className="person person-1"></span>
                <span className="person person-2"></span>
                <span className="person person-3"></span>
              </div>
            </div>
          </motion.div>
          
          <motion.h1
            className="hero-title"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Together, We Can Change Lives
            <br />
            <span className="highlight">One Step at a Time</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            From rural India to educational success, we work with our giving every child the chance when it's needed most.
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Link to="/contact" className="btn btn-primary">
              Join Us Today
            </Link>
            <Link to="/about" className="btn btn-secondary">
              Learn More
            </Link>
          </motion.div>
        </div>

        <div className="hero-scroll">
          <span>Scroll Down</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="our-story">
        <div className="container">
          <motion.div
            className="story-content"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="story-text">
              <span className="section-label">Our Story</span>
              <h2 className="section-title">Who We Are</h2>
              <p>
                Ek-Prayas is a student-led social welfare club committed to making a positive impact in society. We believe in the power of collective action and work towards creating opportunities for those who need it most.
              </p>
              <p>
                Our Mission: To create a society where kindness, equality, and support reach everyone, especially those in need.
              </p>
              <Link to="/about" className="link-arrow">
                Read Our Full Story <FaArrowRight />
              </Link>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <img src="/api/placeholder/500/400" alt="Ek-Prayas Story" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <h3 className="stat-number">{stat.number}</h3>
                <p className="stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="initiatives-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">What We Do</span>
            <h2 className="section-title">The Guiding Lights Behind the Mission</h2>
          </div>

          <div className="initiatives-grid">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative._id}
                className="initiative-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="initiative-image">
                  <img src={initiative.image} alt={initiative.title} />
                </div>
                <div className="initiative-content">
                  <h3>{initiative.title}</h3>
                  <p>{initiative.shortDescription}</p>
                  <Link to={`/initiatives/${initiative.slug}`} className="link-arrow">
                    Learn More <FaArrowRight />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="section-cta">
            <Link to="/initiatives" className="btn btn-primary">
              View All Initiatives
            </Link>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="events-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Events</span>
            <h2 className="section-title">Our Previous Initiatives</h2>
          </div>

          <div className="events-carousel">
            {upcomingEvents.map((event) => (
              <motion.div
                key={event._id}
                className="event-card"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="event-image">
                  <img src={event.image} alt={event.title} />
                  <div className="event-date">
                    <span className="day">{new Date(event.date).getDate()}</span>
                    <span className="month">
                      {new Date(event.date).toLocaleString('default', { month: 'short' })}
                    </span>
                  </div>
                </div>
                <div className="event-content">
                  <span className="event-category">{event.category}</span>
                  <h3>{event.title}</h3>
                  <p>{event.shortDescription}</p>
                  <Link to={`/events/${event.slug}`} className="link-arrow">
                    View Details <FaArrowRight />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="section-cta">
            <Link to="/events" className="btn btn-secondary">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ready to Make a Difference?</h2>
            <p>Join our community of changemakers and help us create a better tomorrow</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Get Involved
              </Link>
              <Link to="/events" className="btn btn-outline">
                Upcoming Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
