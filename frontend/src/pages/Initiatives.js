import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getInitiatives } from '../services/api';

const Initiatives = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInitiatives().then(res => {
      setInitiatives(res.data.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-header"><h1>Our Initiatives</h1></div>
      <div className="page-content">
        {loading ? <div className="loading"><div className="spinner"></div></div> : 
         <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:'2rem'}}>
          {initiatives.map(i => (
            <div key={i._id} style={{background:'white',borderRadius:'16px',overflow:'hidden',boxShadow:'0 4px 20px rgba(0,0,0,0.08)'}}>
              <div style={{height:'240px',background:'#00BFA5'}}></div>
              <div style={{padding:'2rem'}}>
                <h3>{i.title}</h3>
                <p>{i.shortDescription}</p>
                <Link to={`/initiatives/${i.slug}`}>Learn More →</Link>
              </div>
            </div>
          ))}
         </div>
        }
      </div>
    </div>
  );
};

export default Initiatives;
