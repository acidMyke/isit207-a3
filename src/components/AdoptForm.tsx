import { useCallback, useMemo, useState, type SubmitEventHandler } from 'react';
import type { Applicant } from '../context/Store/Data';
import { ApplicantForm } from './ApplicantForm';
import { usePetDataStore } from '../context/Store/Provider';
import { useAuth } from '../context/Auth';

type AdoptFormProps = {
  petId: string;
  onCancelButtonClick: () => void;
  afterSubmit: (adoptionId: string) => void;
};

export const AdoptForm = ({
  petId,
  onCancelButtonClick,
  afterSubmit,
}: AdoptFormProps) => {
  const { adoptPet, getPetById } = usePetDataStore();
  const { getAsApplicant } = useAuth();
  const [applicant, setApplicant] = useState<Applicant>(() => getAsApplicant());
  const pet = useMemo(() => getPetById(petId), [petId]);

  const handleSubmit = useCallback<SubmitEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();
      if (!e.currentTarget.checkValidity()) return;

      const { adoptionId } = adoptPet({ petId, applicant });
      afterSubmit(adoptionId);
    },
    [adoptPet, applicant],
  );

  if (!pet) {
    throw new Error(`No pet found with id ${petId}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <ApplicantForm value={applicant} onChange={setApplicant} />
      <button type='submit' className='btn-action-gradient'>
        Adopt Pet
      </button>
      <button type='button' className='btn-link' onClick={onCancelButtonClick}>
        Cancel
      </button>
    </form>
  );
};
