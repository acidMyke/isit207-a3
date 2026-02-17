import { useAuth } from '../context/Auth';

function AdoptPage() {
  useAuth({ allowedRoles: ['member'] });

  return <div>AdoptPage</div>;
}

export default AdoptPage;
