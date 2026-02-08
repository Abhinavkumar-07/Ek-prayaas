import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { teamAPI } from '../services/api';

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 1. DEFAULT TEAM DATA (Fallback) ---
  const defaultTeam = [
    {
      _id: '1',
      name: 'Aarav Sharma',
      role: 'President',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80'
    },
    {
      _id: '2',
      name: 'Sneha Gupta',
      role: 'Vice President',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'
    },
    {
      _id: '3',
      name: 'Rohan Verma',
      role: 'General Secretary',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
    },
    {
      _id: '4',
      name: 'Priya Singh',
      role: 'Event Management Head',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    {
      _id: '5',
      name: 'Vikram Malhotra',
      role: 'Technical Head',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
    },
    {
      _id: '6',
      name: 'Ananya Das',
      role: 'Content & PR Head',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
    },
    {
      _id: '7',
      name: 'Rahul Mehta',
      role: 'Treasurer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
    },
    {
      _id: '8',
      name: 'Ishita Patel',
      role: 'Outreach Coordinator',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
    }
  ];

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      // --- 2. TRY FETCHING REAL DATA ---
      const response = await teamAPI.getAll();
      const data = response.data?.data || [];

      // If data exists, use it. If empty, use default.
      setTeam(data.length > 0 ? data : defaultTeam);

    } catch (error) {
      // --- 3. SILENT FAIL (Load Defaults) ---
      console.log('Backend not reachable, showing default team.');
      setTeam(defaultTeam);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="bg-gradient-to-r from-primary to-primary-dark py-16">
        <div className="max-w-7xl mx-auto container-padding text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4"
          >
            Our Team
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90"
          >
            Meet the dedicated people behind Ek-Prayas
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            {loading ? (
              Array(8).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-neutral-200 h-64 rounded-lg mb-4" />
                  <div className="bg-neutral-200 h-4 rounded mb-2" />
                  <div className="bg-neutral-200 h-3 w-2/3 rounded" />
                </div>
              ))
            ) : team.length === 0 ? (
              <div className="col-span-4 text-center py-16">
                <p className="text-neutral-600">Team information coming soon!</p>
              </div>
            ) : (
              team.map((member, index) => (
                <motion.div 
                  key={member._id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="relative overflow-hidden rounded-lg mb-4 shadow-lg">
                    <img
                      src={member.image || 'https://via.placeholder.com/300'}
                      alt={member.name}
                      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="text-white font-medium text-sm">Connect on LinkedIn</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-xl text-neutral-800 group-hover:text-primary transition-colors">{member.name}</h3>
                  <p className="text-sm text-primary font-medium uppercase tracking-wide mt-1">{member.role}</p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;