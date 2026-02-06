import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../services/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents().then(res => {
      setEvents(res.data.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-header"><h1>Our Events</h1></div>
      <div className="page-content">
        {loading ? <div className="loading"><div className="spinner"></div></div> : 
         <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'2rem'}}>
          {events.map(e => (
            <div key={e._id} style={{background:'white',borderRadius:'16px',overflow:'hidden',boxShadow:'0 4px 20px rgba(0,0,0,0.08)'}}>
              <div style={{height:'220px',background:'#00BFA5'}}></div>
              <div style={{padding:'1.5rem'}}>
                <h3>{e.title}</h3>
                <p>{new Date(e.date).toLocaleDateString()}</p>
                <Link to={`/events/${e.slug}`}>View Details →</Link>
              </div>
            </div>
          ))}
         </div>
        }
      </div>
    </div>
  );
};

export default Events;
