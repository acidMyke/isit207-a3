import { useCallback, useState, type SubmitEventHandler } from 'react';
import { validateCreatePet, type CreatePetParam } from '../context/Store/Data';

type PetEntryFormProps = {
  onSubmit: (param: CreatePetParam) => void;
};

function PetEntryForm({ onSubmit }: PetEntryFormProps) {
  const [error, setError] = useState<string | undefined>();

  const onFormSubmit = useCallback<SubmitEventHandler<HTMLFormElement>>(
    async e => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);

      const name = String(formData.get('name') ?? '').trim();
      const species = formData.get('species');
      const gender = formData.get('gender');
      const ageMonth = formData.get('ageMonth');
      const breed = String(formData.get('breed') ?? '').trim();
      const description = String(formData.get('description') ?? '').trim();
      const image = formData.get('image');

      const payload = validateCreatePet(
        {
          name,
          species,
          gender,
          ageMonth,
          breed,
          description,
          image,
        },
        setError,
      );

      if (!payload) {
        return;
      }

      onSubmit(payload);
    },
    [onSubmit, setError],
  );

  return (
    <form onSubmit={onFormSubmit}>
      <h2>Pet Information</h2>

      <div className='formfield'>
        <label>Name</label>
        <input required name='name' />
        <p>Please enter the pet's name.</p>
      </div>

      <div className='formfield canwrap'>
        <label>Species</label>
        <select name='species'>
          <option value='dog'>Dog</option>
          <option value='cat'>Cat</option>
        </select>
      </div>

      <div className='formfield canwrap'>
        <label>Gender</label>
        <select name='gender'>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>
      </div>

      <div className='formfield canwrap'>
        <label>Age (months)</label>
        <input type='number' min={0} required name='ageMonth' />
        <p>Please enter a valid age.</p>
      </div>

      <div className='formfield canwrap'>
        <label>Breed</label>
        <input required name='breed' />
        <p>Please enter the breed.</p>
      </div>

      <div className='formfield'>
        <label>Description</label>
        <textarea required minLength={10} name='description' />
        <p>Please enter at least 10 characters.</p>
      </div>

      <div className='formfield'>
        <label htmlFor=''>Upload image</label>
        <input type='file' accept='image/*' name='image' />
        <p>Required</p>
      </div>

      <div className='formStatus'>
        {error && <p className='error'>{error}</p>}
      </div>
    </form>
  );
}

export default PetEntryForm;
