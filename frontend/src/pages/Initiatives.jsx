import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { initiativesAPI } from '../services/api';
// Removed toast import to prevent errors

const Initiatives = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // --- 1. FALLBACK DATA (Matches your UI structure) ---
  const defaultInitiatives = [
    {
      _id: '1',
      title: 'Project Shiksha',
      category: 'education',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
      status: 'active',
      description: 'Providing free evening classes and study materials to children in rural areas to bridge the education gap.',
      impact: { studentsHelped: 120, booksDistributed: 450 }
    },
    {
      _id: '2',
      title: 'Elderly Companion Program',
      category: 'elderly-care',
      image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=800&q=80',
      status: 'active',
      description: 'Regular visits to old age homes to spend quality time, organize activities, and provide emotional support.',
      impact: { studentsHelped: 50, booksDistributed: 0 }
    },
    {
      _id: '3',
      title: 'Health & Hygiene Camp',
      category: 'health',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      status: 'completed',
      description: 'Free medical checkups and distribution of hygiene kits to underprivileged families.',
      impact: { studentsHelped: 300, booksDistributed: 0 }
    },
    {
      _id: '4',
      title: 'Green Earth Drive',
      category: 'environment',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      status: 'active',
      description: 'Tree plantation drives and waste management awareness campaigns in local communities.',
      impact: { studentsHelped: 0, booksDistributed: 0 }
    },
    {
      _id: '5',
      title: 'Digital Literacy',
      category: 'education',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      status: 'active',
      description: 'Teaching basic computer skills and internet usage to women and children.',
      impact: { studentsHelped: 80, booksDistributed: 0 }
    },
    {
      _id: '6',
      title: 'Nutrition Support',
      category: 'health',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
      status: 'active',
      description: 'Providing nutritious meals and supplements to malnourished children.',
      impact: { studentsHelped: 150, booksDistributed: 0 }
    }
  ];

  useEffect(() => {
    fetchInitiatives();
  }, []);

  const fetchInitiatives = async () => {
    try {
      // --- 2. TRY FETCHING REAL DATA ---
      const response = await initiativesAPI.getAll();
      const data = response.data?.data || [];
      
      // If data exists, use it. If empty, use default.
      setInitiatives(data.length > 0 ? data : defaultInitiatives);
      
    } catch (error) {
      // --- 3. SILENT FAIL (Load Defaults) ---
      console.log('Using placeholder initiatives.');
      setInitiatives(defaultInitiatives);
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