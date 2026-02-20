import { useMemo, useState } from 'react';
import { PetSelection } from '../components/PetSelection';
import { usePetDataStore } from '../context/Store/Provider';
import { useLocation } from 'wouter';
import { PageLayout } from '../components/PageLayout';
import PetProfile from '../components/PetProfile';
import { AdoptForm } from '../components/AdoptForm';
import ConfirmationPage from './Confirmation';

function AdoptPage() {
  const [, navigate] = useLocation();
  const { getPetById } = usePetDataStore();
  const [petId, setPetId] = useState<string | undefined>();
  const pet = useMemo(() => petId && getPetById(petId), [petId]);

  return (
    <PageLayout imageUrl='/images/adopt-page.webp' title='Adopt Pet'>
      {!petId || !pet ? (
        <PetSelection onSelect={setPetId} />
      ) : (
        <>
          <PetProfile pet={pet} />
          <AdoptForm
            petId={petId}
            onCancelButtonClick={() => setPetId(undefined)}
            afterSubmit={id =>
              navigate(ConfirmationPage.createUrl('adoption', id))
            }
          />
        </>
      )}
    </PageLayout>
  );
}

export default AdoptPage;
