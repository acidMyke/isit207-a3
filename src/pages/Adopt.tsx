import { useState } from 'react';
import { PetSelection } from '../components/PetSelection';

function AdoptPage() {
  const [petId, setPetId] = useState<string | undefined>();

  return <PetSelection onSelect={setPetId} />;
}

export default AdoptPage;
