import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api'; // Use the centralized API
import { toast } from 'react-toastify';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    const verify = async () => {
      try {
        await authAPI.verifyEmail(token);
        setStatus('Verified! Redirecting to login...');
        toast.success('Email Verified Successfully!');
        setTimeout(() => navigate('/login'), 2000);
      } catch (err) {
        setStatus('Verification Failed. Invalid or expired token.');
        toast.error('Verification Failed');
      }
    };
    if (token) verify();
  }, [token, navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">{status}</h2>
      </div>
    </div>
  );
};

export default VerifyEmail;
