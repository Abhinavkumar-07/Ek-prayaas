import React from 'react';
import '../styles/App.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="page-header">
        <h1>About Ek-Prayas</h1>
        <p>Our story, mission, and vision for a better society</p>
      </div>
      
      <div className="page-content">
        <section style={{marginBottom: '3rem'}}>
          <h2 style={{color: '#00BFA5', marginBottom: '1rem'}}>Who We Are</h2>
          <p style={{fontSize: '1.125rem', lineHeight: '1.8', marginBottom: '1.5rem'}}>
            Ek-Prayas is a student-led social welfare club that was established with a vision to create meaningful change in society. We are a group of passionate students who believe in the power of collective action and community service.
          </p>
          <p style={{fontSize: '1.125rem', lineHeight: '1.8'}}>
            Our name "Ek-Prayas" translates to "One Effort" - representing our belief that every small effort counts and together, we can create a significant impact on society.
          </p>
        </section>

        <section style={{marginBottom: '3rem'}}>
          <h2 style={{color: '#00BFA5', marginBottom: '1rem'}}>Our Mission</h2>
          <p style={{fontSize: '1.125rem', lineHeight: '1.8'}}>
            To create a society where kindness, equality, and support reach everyone, especially those who need it most. We strive to bridge gaps in education, healthcare, and social welfare through our dedicated initiatives and volunteer efforts.
          </p>
        </section>

        <section>
          <h2 style={{color: '#00BFA5', marginBottom: '1rem'}}>Our Vision</h2>
          <p style={{fontSize: '1.125rem', lineHeight: '1.8'}}>
            We envision a world where every individual has access to quality education, healthcare, and a dignified life. Through our initiatives like Kitabi Udaan, Old Age Home visits, and Blood Donation camps, we're working towards making this vision a reality.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
