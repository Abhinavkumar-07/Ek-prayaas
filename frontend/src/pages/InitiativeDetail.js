import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInitiativeBySlug } from '../services/api';

const InitiativeDetail = () => {
  const { slug } = useParams();
  const [initiative, setInitiative] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInitiativeBySlug(slug).then(res => {
      setInitiative(res.data.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="loading"><div className="spinner"></div></div>;
  if (!initiative) return <div className="page-content"><p>Initiative not found</p></div>;

  return (
    <div>
      <div className="page-header"><h1>{initiative.title}</h1></div>
      <div className="page-content">
        <p style={{fontSize:'1.125rem',lineHeight:'1.8'}}>{initiative.description}</p>
      </div>
    </div>
  );
};

export default InitiativeDetail;
