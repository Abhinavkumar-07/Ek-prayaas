import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventsAPI } from '../services/api';
import { HiCalendar, HiLocationMarker, HiClock, HiArrowLeft } from 'react-icons/hi';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await eventsAPI.getById(id);
        setEvent(response.data.data); // Adjust based on your backend response structure
      } catch (err) {
        setError('Failed to load event details.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen pt-32 flex justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
    </div>
  );

  if (error || !event) return (
    <div className="min-h-screen pt-32 container-padding text-center">
      <h2 className="text-2xl font-bold text-red-600">Event Not Found</h2>
      <Link to="/events" className="text-primary hover:underline mt-4 inline-block">Back to Events</Link>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-padding max-w-4xl mx-auto">
        <Link to="/events" className="inline-flex items-center text-neutral-600 hover:text-primary mb-6 transition-colors">
          <HiArrowLeft className="mr-2" /> Back to Events
        </Link>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-64 md:h-96 w-full">
            <img 
              src={event.image || "https://via.placeholder.com/800x400"} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">{event.title}</h1>
            
            {/* Meta Data */}
            <div className="flex flex-wrap gap-4 md:gap-8 text-neutral-600 mb-8 border-b pb-8">
              <div className="flex items-center">
                <HiCalendar className="text-primary text-xl mr-2" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <HiClock className="text-primary text-xl mr-2" />
                <span>{event.time || "Time TBD"}</span>
              </div>
              <div className="flex items-center">
                <HiLocationMarker className="text-primary text-xl mr-2" />
                <span>{event.location}</span>
              </div>
            </div>

            {/* Content */}
            <div className="prose max-w-none text-neutral-700">
              <p className="whitespace-pre-line leading-relaxed text-lg">
                {event.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;