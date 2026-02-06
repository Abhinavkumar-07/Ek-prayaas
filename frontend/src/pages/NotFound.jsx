import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-2xl text-neutral-700 mb-8">Page Not Found</p>
        <Link to="/" className="btn-primary">Go Home</Link>
      </div>
    </div>
  );
};
export default NotFound;
