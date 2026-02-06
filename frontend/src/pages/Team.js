import React, { useEffect, useState } from 'react';
import { getTeam } from '../services/api';

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeam().then(res => {
      setTeam(res.data.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-header"><h1>Our Team</h1></div>
      <div className="page-content">
        {loading ? <div className="loading"><div className="spinner"></div></div> : 
         <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'2.5rem'}}>
          {team.map(member => (
            <div key={member._id} style={{textAlign:'center'}}>
              <div style={{width:'150px',height:'150px',margin:'0 auto 1rem',borderRadius:'50%',background:'#00BFA5'}}></div>
              <h3 style={{marginBottom:'0.5rem'}}>{member.name}</h3>
              <p style={{color:'#00BFA5',fontWeight:600}}>{member.role}</p>
            </div>
          ))}
         </div>
        }
      </div>
    </div>
  );
};

export default Team;
