import { useState } from 'react';
import { PetSelection } from '../components/PetSelection';
import { AdoptForm } from '../components/AdoptForm';

function AdoptPage() {
  const [petId, setPetId] = useState<string | undefined>();

  if (!petId) {
    return <PetSelection onSelect={setPetId} />;
  }

  return (
    <AdoptForm
      petId={petId}
      onBackButtonClick={() => {
        setPetId(undefined);
      }}
    />
  );
}

export default AdoptPage;
