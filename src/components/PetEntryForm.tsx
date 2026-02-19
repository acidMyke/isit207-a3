import { useCallback, type SubmitEventHandler } from 'react';
import type { CreatePetParam } from '../context/Store/Data';

type PetEntryFormProps = {
  onSubmit: (param: CreatePetParam) => void;
};

function PetEntryForm({}: PetEntryFormProps) {
  const onFormSubmit = useCallback<SubmitEventHandler<HTMLFormElement>>(e => {
    e.preventDefault();
  }, []);

  return (
    <form onSubmit={onFormSubmit}>
      <h2>Pet Information</h2>

      <div className='formfield'>
        <label>Name</label>
        <input required />
        <p>Please enter the pet's name.</p>
      </div>

      <div className='formfield canwrap'>
        <label>Species</label>
        <select>
          <option value='dog'>Dog</option>
          <option value='cat'>Cat</option>
        </select>
      </div>

      <div className='formfield canwrap'>
        <label>Gender</label>
        <select>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>
      </div>

      <div className='formfield canwrap'>
        <label>Age (months)</label>
        <input type='number' min={0} required />
        <p>Please enter a valid age.</p>
      </div>

      <div className='formfield canwrap'>
        <label>Breed</label>
        <input required />
        <p>Please enter the breed.</p>
      </div>

      <div className='formfield'>
        <label>Description</label>
        <textarea required minLength={10} />
        <p>Please enter at least 10 characters.</p>
      </div>
    </form>
  );
}

export default PetEntryForm;
