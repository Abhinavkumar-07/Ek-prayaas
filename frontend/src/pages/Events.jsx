import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { eventsAPI } from '../services/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await eventsAPI.getAll();
      setEvents(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="max-w-7xl mx-auto container-padding text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Our Events</h1>
          <p className="text-xl">Join us in our upcoming activities and celebrations</p>
        </div>
      </section>

      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="bg-neutral-200 h-48 rounded mb-4" />
                  <div className="bg-neutral-200 h-6 rounded mb-2" />
                </div>
              ))
            ) : events.length === 0 ? (
              <div className="col-span-3 text-center py-16">
                <p className="text-neutral-600">No events found.</p>
              </div>
            ) : (
              events.map((event) => (
                <Link key={event._id} to={`/events/${event._id}`} className="card group">
                  <img
                    src={event.coverImage || 'https://via.placeholder.com/400x300'}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">{event.title}</h3>
                    <p className="text-sm text-neutral-600">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
