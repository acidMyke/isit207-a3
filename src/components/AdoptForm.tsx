import { useCallback, useState, type SubmitEventHandler } from 'react';
import type { Applicant } from '../context/Store/Data';
import { ApplicantForm } from './ApplicantForm';
import { usePetDataStore } from '../context/Store/Provider';

type AdoptFormProps = {
  petId: string;
};

export const AdoptForm = ({ petId }: AdoptFormProps) => {
  const { adoptPet } = usePetDataStore();
  const [applicant, setApplicant] = useState<Applicant>({
    fullname: '',
    email: '',
    phoneNumber: '',
  });

  const handleSubmit = useCallback<SubmitEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();
      if (!e.currentTarget.checkValidity()) return;

      adoptPet({ petId, applicant });
      e.currentTarget.reset();
    },
    [adoptPet],
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      <ApplicantForm value={applicant} onChange={setApplicant} />

      <button type='submit' className='btn-action-gradient'>
        Adopt Pet
      </button>
    </form>
  );
};
