import { useMemo, useState } from 'react';
import { PetSelection } from '../components/PetSelection';
import { AdoptForm } from '../components/AdoptForm';
import PetProfile from '../components/PetProfile';
import { usePetDataStore } from '../context/Store/Provider';
import { useLocation } from 'wouter';
import ConfirmationPage from './Confirmation';

function AdoptPage() {
  const [, navigate] = useLocation();
  const { getPetById } = usePetDataStore();
  const [petId, setPetId] = useState<string | undefined>();
  const pet = useMemo(() => petId && getPetById(petId), [petId]);

  if (!petId || !pet) {
    return <PetSelection onSelect={setPetId} />;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
        maxWidth: '48rem',
        margin: '0px auto',
      }}
    >
      <PetProfile pet={pet} />
      <AdoptForm
        petId={petId}
        onCancelButtonClick={() => setPetId(undefined)}
        afterSubmit={id => navigate(ConfirmationPage.createUrl('adoption', id))}
      />
    </div>
  );
}

export default AdoptPage;
