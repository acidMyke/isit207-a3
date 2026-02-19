import { useState } from 'react';
import type { CreatePetParam } from '../context/Store/Data';
import PetEntryForm from '../components/PetEntryForm';

function RehomePage() {
  const [createPetParam, setCreatePetParam] = useState<CreatePetParam>();

  return (
    <div style={{ maxWidth: '48rem', margin: '0px auto' }}>
      <PetEntryForm onSubmit={setCreatePetParam} />
    </div>
  );
}

export default RehomePage;
