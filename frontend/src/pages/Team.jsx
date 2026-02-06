import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { teamAPI } from '../services/api';

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await teamAPI.getAll();
      setTeam(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="bg-gradient-to-r from-primary to-primary-dark py-16">
        <div className="max-w-7xl mx-auto container-padding text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Our Team</h1>
          <p className="text-xl">Meet the people behind Ek-Prayas</p>
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
                </div>
              ))
            ) : team.length === 0 ? (
              <div className="col-span-4 text-center py-16">
                <p className="text-neutral-600">Team information coming soon!</p>
              </div>
            ) : (
              team.map((member) => (
                <motion.div key={member._id} className="text-center">
                  <img
                    src={member.image || 'https://via.placeholder.com/300'}
                    alt={member.name}
                    className="w-full aspect-square object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
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
