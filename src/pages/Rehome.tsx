import { useState } from 'react';
import type { CreatePetParam } from '../context/Store/Data';
import PetEntryForm from '../components/PetEntryForm';
import PetProfile from '../components/PetProfile';
import { RehomePetForm } from '../components/RehomePetForm';
import { useLocation } from 'wouter';
import ConfirmationPage from './Confirmation';
import { PageLayout } from '../components/PageLayout';

function RehomePage() {
  const [, navigate] = useLocation();
  const [currentStepper, setStepper] = useState<0 | 1>(0);
  const [createPetParam, setCreatePetParam] = useState<CreatePetParam>();

  return (
    <PageLayout imageUrl='/images/rehome-page.webp' title='Rehome Pet'>
      {currentStepper === 0 || createPetParam == undefined ? (
        <PetEntryForm
          onSubmit={payload => {
            setStepper(1);
            setCreatePetParam(payload);
          }}
          defualtData={createPetParam}
        />
      ) : (
        <>
          <PetProfile pet={createPetParam} />
          <RehomePetForm
            createPetParam={createPetParam}
            onCancelButtonClick={() => setStepper(0)}
            afterSubmit={rehomeId =>
              navigate(ConfirmationPage.createUrl('rehome', rehomeId))
            }
          />
        </>
      )}
    </PageLayout>
  );
}

export default RehomePage;
