import { useLocalStorageState } from '../../hooks';
import {
  createDefaultPets,
  generateId,
  type Adoption,
  type Applicant,
  type CreatePetParam,
  type Pet,
  type Rehome,
} from './Data';

export function createStoreState() {
  const [pets, setPets] = useLocalStorageState<Pet[]>('pets', []);
  const [adoptions, setAdoptions] = useLocalStorageState<Adoption[]>(
    'adoptions',
    [],
  );
  const [rehomes, setRehomes] = useLocalStorageState<Rehome[]>('rehomes', []);
  return {
    pets,
    setPets,
    adoptions,
    setAdoptions,
    rehomes,
    setRehomes,
  };
}

export function createActions(states: ReturnType<typeof createStoreState>) {
  const { pets, setPets, setAdoptions, setRehomes } = states;
  const today = () => new Date().toISOString();
  const getPetById = (petId: string) => pets.find(p => p.id === petId);

  const addPet = (pet: CreatePetParam) => {
    const newPet: Pet = {
      ...pet,
      id: generateId(),
      status: 'available',
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
    setRehomes(prev => prev.filter(r => r.petId !== petId));
  };

  const adoptPet = (data: { petId: string; applicant: Applicant }) => {
    const pet = getPetById(data.petId);

    if (!pet) throw new Error('Pet not found');
    if (pet.status === 'adopted') throw new Error('Pet is already adopted');

    const adoption: Adoption = {
      id: generateId(),
      petId: data.petId,
      applicant: data.applicant,
      adoptionDate: today(),
    };

    setAdoptions(prev => [...prev, adoption]);
    setPets(prev =>
      prev.map(p =>
        p.id === data.petId
          ? { ...p, status: 'adopted', statusDate: adoption.adoptionDate }
          : p,
      ),
    );

    return { adoptionId: adoption.id };
  };

  const rehomePet = (data: {
    pet: CreatePetParam;
    applicant: Applicant;
    reason: string;
  }) => {
    const newPet: Pet = {
      ...data.pet,
      id: generateId(),
      status: 'available',
      statusDate: today(),
    };

    setPets(prev => [...prev, newPet]);

    const rehomeEvent = {
      id: generateId(),
      petId: newPet.id,
      applicant: data.applicant,
      reason: data.reason,
      releaseDate: today(),
    };
    setRehomes(prev => [...prev, rehomeEvent]);
  };

  (window as any).resetData = () => {
    const retData: any = {};
    setPets(pets => {
      retData.pets = pets;
      return createDefaultPets();
    });
    setAdoptions(adoptions => {
      retData.adoptions = adoptions;
      return [];
    });
    setRehomes(rehomes => {
      retData.rehomes = rehomes;
      return [];
    });
    return retData;
  };

  return { addPet, updatePet, deletePet, getPetById, adoptPet, rehomePet };
}
