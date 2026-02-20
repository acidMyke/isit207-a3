import { useState } from 'react';
import type { CreatePetParam } from '../context/Store/Data';
import PetEntryForm from '../components/PetEntryForm';
import PetProfile from '../components/PetProfile';
import { RehomePetForm } from '../components/RehomePetForm';
import { useLocation } from 'wouter';
import ConfirmationPage from './Confirmation';

function RehomePage() {
  const [, navigate] = useLocation();
  const [currentStepper, setStepper] = useState<0 | 1>(0);
  const [createPetParam, setCreatePetParam] = useState<CreatePetParam>();

  if (currentStepper === 0 || createPetParam == undefined) {
    return (
      <div style={{ maxWidth: '48rem', margin: '0px auto' }}>
        <PetEntryForm
          onSubmit={payload => {
            setStepper(1);
            setCreatePetParam(payload);
          }}
          defualtData={createPetParam}
        />
      </div>
    );
  } else {
    return (
      <div style={{ maxWidth: '48rem', margin: '0px auto' }}>
        <PetProfile pet={createPetParam} />
        <RehomePetForm
          createPetParam={createPetParam}
          onCancelButtonClick={() => setStepper(0)}
          afterSubmit={rehomeId =>
            navigate(ConfirmationPage.createUrl('rehome', rehomeId))
          }
        />
      </div>
    );
  }
}

export default RehomePage;
