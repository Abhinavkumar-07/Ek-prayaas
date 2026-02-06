import { useParams } from 'react-router-dom';
const EventDetail = () => {
  const { id } = useParams();
  return <div className="min-h-screen pt-24 container-padding"><h1>Event Detail: {id}</h1></div>;
};
export default EventDetail;
