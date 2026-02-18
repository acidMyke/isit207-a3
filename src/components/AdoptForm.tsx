import { useCallback, useMemo, useState, type SubmitEventHandler } from 'react';
import type { Applicant } from '../context/Store/Data';
import { ApplicantForm } from './ApplicantForm';
import { usePetDataStore } from '../context/Store/Provider';

type AdoptFormProps = {
  petId: string;
  onBackButtonClick: () => void;
};

export const AdoptForm = ({ petId, onBackButtonClick }: AdoptFormProps) => {
  const { adoptPet, getPetById } = usePetDataStore();
  const [applicant, setApplicant] = useState<Applicant>({
    fullname: '',
    email: '',
    phoneNumber: '',
  });
  const pet = useMemo(() => getPetById(petId), [petId]);

  const handleSubmit = useCallback<SubmitEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();
      if (!e.currentTarget.checkValidity()) return;

      adoptPet({ petId, applicant });
      e.currentTarget.reset();
    },
    [adoptPet],
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
      <button type='button' className='btn-link' onClick={onBackButtonClick}>
        Cancel
      </button>
    </form>
  );
};
