import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // loading | success | error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link');
      return;
    }

    const verify = async () => {
      try {
        const res = await api.get(`/auth/verify-email?token=${token}`);
        setStatus('success');
        setMessage(res.data.message);
      } catch (error) {
        setStatus('error');
        setMessage(
          error.response?.data?.message || 'Verification failed'
        );
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md text-center max-w-md w-full">
        {status === 'loading' && (
          <p className="text-lg font-semibold">Verifying your email…</p>
        )}

        {status === 'success' && (
          <>
            <p className="text-green-600 text-lg font-semibold mb-4">
              {message}
            </p>
            <button
              onClick={() => navigate('/login')}
              className="btn-primary"
            >
              Go to Login
            </button>
          </>
        )}

        {status === 'error' && (
          <p className="text-red-600 text-lg font-semibold">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
