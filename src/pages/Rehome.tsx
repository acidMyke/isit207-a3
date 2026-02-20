import { useState } from 'react';
import type { CreatePetParam } from '../context/Store/Data';
import PetEntryForm from '../components/PetEntryForm';
import PetProfile from '../components/PetProfile';

function RehomePage() {
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
      </div>
    );
  }
}

export default RehomePage;
