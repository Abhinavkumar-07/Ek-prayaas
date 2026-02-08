import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { initiativesAPI } from '../services/api';
import { HiArrowLeft } from 'react-icons/hi';

const InitiativeDetail = () => {
  const { id } = useParams();
  const [initiative, setInitiative] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitiative = async () => {
      try {
        const response = await initiativesAPI.getById(id);
        setInitiative(response.data.data);
      } catch (err) {
        setError('Failed to load initiative details.');
      } finally {
        setLoading(false);
      }
    };
    fetchInitiative();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen pt-32 flex justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
    </div>
  );

  if (error || !initiative) return (
    <div className="min-h-screen pt-32 container-padding text-center">
      <h2 className="text-2xl font-bold text-red-600">Initiative Not Found</h2>
      <Link to="/initiatives" className="text-primary hover:underline mt-4 inline-block">Back to Initiatives</Link>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-padding max-w-5xl mx-auto">
        <Link to="/initiatives" className="inline-flex items-center text-neutral-600 hover:text-primary mb-6 transition-colors">
          <HiArrowLeft className="mr-2" /> Back to Initiatives
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image Section */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={initiative.image || "https://via.placeholder.com/600x600"} 
              alt={initiative.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Section */}
          <div>
            <h1 className="text-4xl font-bold text-neutral-800 mb-6">{initiative.title}</h1>
            <div className="bg-primary/10 text-primary-dark inline-block px-4 py-1 rounded-full text-sm font-semibold mb-6">
              Active Initiative
            </div>
            
            <p className="text-lg text-neutral-700 leading-relaxed whitespace-pre-line mb-8">
              {initiative.description}
            </p>

            <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-100">
              <h3 className="font-bold text-xl mb-3">Want to support this cause?</h3>
              <p className="text-neutral-600 mb-4">Your contribution can help us achieve our goals for this initiative.</p>
              <Link to="/get-involved" className="btn btn-primary inline-block">
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitiativeDetail;