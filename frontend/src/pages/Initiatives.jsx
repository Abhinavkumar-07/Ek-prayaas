import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { initiativesAPI } from '../services/api';
import { toast } from 'react-toastify';

const Initiatives = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchInitiatives();
  }, []);

  const fetchInitiatives = async () => {
    try {
      const response = await initiativesAPI.getAll();
      setInitiatives(response.data.data);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load initiatives');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'education', 'elderly-care', 'health', 'environment'];
  
  const filteredInitiatives = filter === 'all' 
    ? initiatives 
    : initiatives.filter(init => init.category === filter);

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-dark py-16">
        <div className="max-w-7xl mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Initiatives</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover how we're making a difference in education, elderly care, and community welfare
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === cat
                    ? 'bg-primary text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives Grid */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto container-padding">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="bg-neutral-200 h-48 rounded-lg mb-4" />
                  <div className="bg-neutral-200 h-6 rounded mb-2" />
                  <div className="bg-neutral-200 h-4 rounded" />
                </div>
              ))}
            </div>
          ) : filteredInitiatives.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-neutral-600 text-lg">No initiatives found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredInitiatives.map((initiative, index) => (
                <motion.div
                  key={initiative._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/initiatives/${initiative._id}`} className="card group block">
                    <div className="relative overflow-hidden">
                      <img
                        src={initiative.image || 'https://via.placeholder.com/400x300'}
                        alt={initiative.title}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                          {initiative.category}
                        </span>
                      </div>
                      {initiative.status && (
                        <div className="absolute bottom-4 left-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            initiative.status === 'active' ? 'bg-green-500 text-white' :
                            initiative.status === 'completed' ? 'bg-neutral-500 text-white' :
                            'bg-yellow-500 text-white'
                          }`}>
                            {initiative.status}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-primary transition-colors">
                        {initiative.title}
                      </h3>
                      <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                        {initiative.shortDescription || initiative.description}
                      </p>
                      {initiative.impact && (
                        <div className="flex flex-wrap gap-4 text-sm">
                          {initiative.impact.studentsHelped > 0 && (
                            <div className="text-primary font-medium">
                              {initiative.impact.studentsHelped}+ Students
                            </div>
                          )}
                          {initiative.impact.booksDistributed > 0 && (
                            <div className="text-secondary font-medium">
                              {initiative.impact.booksDistributed}+ Books
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Initiatives;
