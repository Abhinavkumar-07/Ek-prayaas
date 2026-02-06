import React, { useEffect, useState } from 'react';
import { getGallery } from '../services/api';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGallery().then(res => {
      setImages(res.data.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-header"><h1>Gallery</h1></div>
      <div className="page-content">
        {loading ? <div className="loading"><div className="spinner"></div></div> : 
         <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'1.5rem'}}>
          {images.map(img => (
            <div key={img._id} style={{aspectRatio:'1',borderRadius:'12px',overflow:'hidden',background:'#00BFA5'}}></div>
          ))}
         </div>
        }
      </div>
    </div>
  );
};

export default Gallery;
