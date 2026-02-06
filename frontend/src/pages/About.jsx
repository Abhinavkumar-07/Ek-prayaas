import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="bg-gradient-to-r from-primary to-primary-dark py-16">
        <div className="max-w-7xl mx-auto container-padding text-center text-white">
          <motion.h1 className="text-5xl font-bold mb-4">About Ek-Prayas</motion.h1>
          <p className="text-xl">Learn about our journey, mission, and values</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto container-padding">
          <h2 className="section-title mb-8">Our Mission</h2>
          <p className="text-lg text-neutral-700 leading-relaxed mb-6">
            Ek-Prayas is dedicated to creating positive social change through education, elderly care, and community service. We believe in the power of collective action and the impact of small, consistent efforts.
          </p>
          <p className="text-lg text-neutral-700 leading-relaxed">
            Founded by passionate students, we work to bridge gaps in society and provide support where it's needed most. Our initiatives focus on empowering underprivileged students, caring for elderly communities, and promoting health awareness.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
