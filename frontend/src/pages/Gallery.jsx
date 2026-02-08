import React, { useEffect, useState } from 'react';
import { galleryAPI } from '../services/api';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch gallery images from backend
    const fetchGallery = async () => {
      try {
        const response = await galleryAPI.getAll();
        // Assuming the backend returns { success: true, data: [...] }
        setImages(response.data.data || []); 
      } catch (error) {
        console.error("Failed to fetch gallery", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-800 mb-4">Our Gallery</h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Glimpses of our journey and the impact we've created together.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12 bg-neutral-50 rounded-lg">
            <p className="text-neutral-500">No images found in the gallery yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img) => (
              <div key={img._id} className="group relative aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <img 
                  src={img.imageUrl || "https://via.placeholder.com/300"} 
                  alt={img.title || "Gallery Image"} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-medium">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;