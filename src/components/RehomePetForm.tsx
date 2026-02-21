import { useCallback, useState, type SubmitEventHandler } from 'react';
import type { Applicant, CreatePetParam } from '../context/Store/Data';
import { ApplicantForm } from './ApplicantForm';
import { usePetDataStore } from '../context/Store/Provider';
import { useAuth } from '../context/Auth';

type RehomePetProps = {
  createPetParam: CreatePetParam;
  onCancelButtonClick: () => void;
  afterSubmit: (rehomeId: string) => void;
};

export const RehomePetForm = ({
  createPetParam,
  onCancelButtonClick,
  afterSubmit,
}: RehomePetProps) => {
  const { rehomePet } = usePetDataStore();
  const { getAsApplicant } = useAuth();
  const [applicant, setApplicant] = useState<Applicant>(() => getAsApplicant());

  const handleSubmit = useCallback<SubmitEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();
      if (!e.currentTarget.checkValidity()) return;
      const form = e.currentTarget;
      const formData = new FormData(form);
      const reason = String(formData.get('reason') ?? '').trim();

      const { rehomeEventId, saveImagePr } = rehomePet({
        createPetParam,
        applicant,
        reason,
      });
      saveImagePr.then(() => afterSubmit(rehomeEventId));
    },
    [createPetParam, applicant],
  );

  return (
    <form onSubmit={handleSubmit}>
      <ApplicantForm value={applicant} onChange={setApplicant} />
      <div className='formfield'>
        <label>Reason for rehome</label>
        <textarea required minLength={10} name='reason' />
        <p>Please enter at least 10 characters.</p>
      </div>
      <button type='submit' className='btn-action-gradient'>
        Rehome Pet
      </button>
      <button type='button' className='btn-link' onClick={onCancelButtonClick}>
        Cancel
      </button>
    </form>
  );
};
