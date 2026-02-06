import { useParams } from 'react-router-dom';
const InitiativeDetail = () => {
  const { id } = useParams();
  return <div className="min-h-screen pt-24 container-padding"><h1>Initiative Detail: {id}</h1></div>;
};
export default InitiativeDetail;
