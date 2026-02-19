export type Pet = {
  id: string;
  status: 'available' | 'adopted';
  name: string;
  species: 'dog' | 'cat';
  gender: 'male' | 'female';
  ageMonth: number;
  breed: string;
  image: string;
  description: string;
  statusDate: string;
};

export type CreatePetParam = Omit<Pet, 'id' | 'status' | 'statusDate'>;

export type Applicant = {
  fullname: string;
  email: string;
  phoneNumber: string;
};

export type Adoption = {
  id: string;
  petId: string;

  applicant: Applicant;

  adoptionDate: string;
};

export type Rehome = {
  id: string;
  petId: string;

  applicant: Applicant;

  releaseDate: string;
  reason: string;
};

export const generateId = () =>
  crypto.randomUUID().toLowerCase().replaceAll('-', '').substring(0, 8);

export function createDefaultPets(): Pet[] {
  const staticPetData = [
    {
      name: 'Bella',
      species: 'dog',
      gender: 'female',
      ageMonth: 14,
      breed: 'Retriever',
      image: '/images/dogs-bella.jpg',
      description:
        'Friendly and energetic Labrador who loves playing fetch and enjoys being around children.',
      statusDate: '2026-01-15',
    },
    {
      name: 'Max',
      species: 'dog',
      gender: 'male',
      ageMonth: 36,
      breed: 'German Shepherd',
      image: '/images/dogs-max.jpg',
      description:
        'Loyal and intelligent. Well-trained and responds to basic commands.',
      statusDate: '2026-02-01',
    },
    {
      name: 'Luna',
      species: 'cat',
      gender: 'female',
      ageMonth: 8,
      breed: 'British Shorthair',
      image: '/images/cats-luna.jpg',
      description:
        'Calm and affectionate kitten who enjoys cuddles and quiet environments.',
      statusDate: '2026-02-10',
    },
    {
      name: 'Roger',
      species: 'cat',
      gender: 'male',
      ageMonth: 24,
      breed: 'Maine Coon',
      image: '/images/cats-roger.jpg',
      description:
        'Large and fluffy cat with a gentle personality. Gets along well with other pets.',
      statusDate: '2026-01-28',
    },
    {
      name: 'Daisy',
      species: 'dog',
      gender: 'female',
      ageMonth: 10,
      breed: 'Beagle',
      image: '/images/dogs-daisy.jpg',
      description:
        'Curious and cheerful beagle who loves sniffing around and outdoor walks.',
      statusDate: '2026-02-12',
    },
    {
      name: 'Klowee',
      species: 'cat',
      gender: 'male',
      ageMonth: 18,
      breed: 'Ragdoll',
      image: '/images/cats-klowee.jpg',
      description:
        'Relaxed and friendly cat who enjoys being carried and staying close to people.',
      statusDate: '2026-02-14',
    },
  ] as const;

  return staticPetData.map(pet => ({
    ...pet,
    id: generateId(),
    status: 'available',
  }));
}
