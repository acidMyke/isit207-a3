import { useLocalStorageState } from '../../hooks';
import type { Adoption, Pet, Release } from './Data';

export function createStoreState() {
  const [pets, setPets] = useLocalStorageState<Pet[]>('pets', []);
  const [adoptions, setAdoptions] = useLocalStorageState<Adoption[]>(
    'adoptions',
    [],
  );
  const [releases, setReleases] = useLocalStorageState<Release[]>(
    'releases',
    [],
  );
  return {
    pets,
    setPets,
    adoptions,
    setAdoptions,
    releases,
    setReleases,
  };
}

export function createActions(states: ReturnType<typeof createStoreState>) {
  const { pets, adoptions, releases, setPets, setAdoptions, setReleases } =
    states;
  const generateId = () => crypto.randomUUID();
  const today = () => new Date().toISOString();

  const addPet = (pet: Omit<Pet, 'id' | 'status' | 'statusDate'>) => {
    const newPet: Pet = {
      ...pet,
      id: generateId(),
      status: 'released',
      statusDate: today(),
    };

    setPets(prev => [...prev, newPet]);
  };

  const updatePet = (petId: string, updates: Partial<Omit<Pet, 'id'>>) => {
    setPets(prev =>
      prev.map(pet => (pet.id === petId ? { ...pet, ...updates } : pet)),
    );
  };

  const deletePet = (petId: string) => {
    setPets(prev => prev.filter(pet => pet.id !== petId));
    setAdoptions(prev => prev.filter(a => a.petId !== petId));
    setReleases(prev => prev.filter(r => r.petId !== petId));
  };

  return { addPet, updatePet, deletePet };
}
