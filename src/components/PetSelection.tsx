import { useMemo, useState } from 'react';
import { usePetDataStore } from '../context/Store/Provider';
import './Pets.css';

type PetSelectionProps = {
  onSelect: (petId: string) => void;
};

export const PetSelection = ({ onSelect }: PetSelectionProps) => {
  const { pets } = usePetDataStore();
  const [species, setSpecies] = useState<'all' | 'dog' | 'cat'>('all');
  const [gender, setGender] = useState<'all' | 'male' | 'female'>('all');
  const [search, setSearch] = useState('');

  const filteredPets = useMemo(() => {
    return pets.filter(pet => {
      if (species !== 'all' && pet.species !== species) return false;
      if (gender !== 'all' && pet.gender !== gender) return false;
      if (
        search &&
        !`${pet.name} ${pet.breed}`.toLowerCase().includes(search.toLowerCase())
      )
        return false;

      return true;
    });
  }, [pets, species, gender, search]);

  return (
    <div id='petSelection'>
      <h2>Select a Pet to Adopt</h2>

      <form onSubmit={e => e.preventDefault()}>
        <div className='formfield'>
          <label>Species</label>
          <select
            value={species}
            onChange={e => setSpecies(e.target.value as typeof species)}
          >
            <option value='all'>All</option>
            <option value='dog'>Dog</option>
            <option value='cat'>Cat</option>
          </select>
        </div>

        <div className='formfield'>
          <label>Gender</label>
          <select
            value={gender}
            onChange={e => setGender(e.target.value as typeof gender)}
          >
            <option value='all'>All</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
        </div>

        <div className='formfield'>
          <label>Search</label>
          <input
            type='text'
            placeholder='Search name or breed...'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <p></p>
        </div>
      </form>
      <div id='petSelectionResults'>
        {filteredPets.length === 0 && <h3>No pets match your filters.</h3>}

        {filteredPets.map(pet => (
          <div key={pet.id} className='petCard'>
            <img src={pet.image} alt={pet.name} />

            <h3>{pet.name}</h3>
            <p>
              {pet.breed} • {pet.ageMonth} months • {pet.gender}
            </p>

            <button
              className='btn-primary'
              disabled={pet.status !== 'available'}
              onClick={() => onSelect(pet.id)}
            >
              {pet.status === 'available' ? 'Select' : 'Adopted'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
