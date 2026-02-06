import React, { useState } from 'react';
import { submitContact, subscribeNewsletter } from '../services/api';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [newsletter, setNewsletter] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContact(formData);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const handleNewsletter = async (e) => {
    e.preventDefault();
    try {
      await subscribeNewsletter({ email: newsletter });
      toast.success('Subscribed successfully!');
      setNewsletter('');
    } catch (error) {
      toast.error('Subscription failed');
    }
  };

  return (
    <div>
      <div className="page-header"><h1>Contact Us</h1></div>
      <div className="page-content" style={{maxWidth:'800px'}}>
        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required style={{padding:'0.75rem',borderRadius:'8px',border:'1px solid #ddd'}} />
          <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required style={{padding:'0.75rem',borderRadius:'8px',border:'1px solid #ddd'}} />
          <input type="tel" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{padding:'0.75rem',borderRadius:'8px',border:'1px solid #ddd'}} />
          <input type="text" placeholder="Subject" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} required style={{padding:'0.75rem',borderRadius:'8px',border:'1px solid #ddd'}} />
          <textarea placeholder="Message" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} required rows="5" style={{padding:'0.75rem',borderRadius:'8px',border:'1px solid #ddd'}}></textarea>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>

        <div style={{marginTop:'3rem',padding:'2rem',background:'#F8F9FA',borderRadius:'12px'}}>
          <h3 style={{marginBottom:'1rem'}}>Subscribe to Newsletter</h3>
          <form onSubmit={handleNewsletter} style={{display:'flex',gap:'0.5rem'}}>
            <input type="email" placeholder="Your email" value={newsletter} onChange={e => setNewsletter(e.target.value)} required style={{flex:1,padding:'0.75rem',borderRadius:'8px',border:'1px solid #ddd'}} />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
