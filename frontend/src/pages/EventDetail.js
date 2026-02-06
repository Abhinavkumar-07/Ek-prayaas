import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventBySlug } from '../services/api';

const EventDetail = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEventBySlug(slug).then(res => {
      setEvent(res.data.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="loading"><div className="spinner"></div></div>;
  if (!event) return <div className="page-content"><p>Event not found</p></div>;

  return (
    <div>
      <div className="page-header"><h1>{event.title}</h1></div>
      <div className="page-content">
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p style={{marginTop:'1rem',fontSize:'1.125rem',lineHeight:'1.8'}}>{event.description}</p>
      </div>
    </div>
  );
};

export default EventDetail;
