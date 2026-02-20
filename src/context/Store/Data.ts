import { saveImage } from './Indexeddb';

export type Pet = {
  id: string;
  status: 'available' | 'adopted';
  name: string;
  species: 'dog' | 'cat';
  gender: 'male' | 'female';
  ageMonth: number;
  breed: string;
  description: string;
  statusDate: string;
};

export type CreatePetParam = Omit<Pet, 'id' | 'status' | 'statusDate'> & {
  image: File;
};

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

async function fetchAndSaveImage(id: string, url: string): Promise<void> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch image: ${response.status} ${response.statusText}`,
    );
  }

  const blob = await response.blob();

  await saveImage(id, blob);
}

export function createDefaultPets(): Pet[] {
  const staticPetData = [
    {
      name: 'Bella',
      species: 'dog',
      gender: 'female',
      ageMonth: 14,
      breed: 'Retriever',
      imageUrl: '/images/dogs-bella.webp',
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
      imageUrl: '/images/dogs-max.webp',
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
      imageUrl: '/images/cats-luna.webp',
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
      imageUrl: '/images/cats-roger.webp',
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
      imageUrl: '/images/dogs-daisy.webp',
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
      imageUrl: '/images/cats-klowee.webp',
      description:
        'Relaxed and friendly cat who enjoys being carried and staying close to people.',
      statusDate: '2026-02-14',
    },
  ] as const;

  return staticPetData.map(({ imageUrl, ...pet }) => {
    const id = generateId();
    fetchAndSaveImage(id, imageUrl);
    return { ...pet, id, status: 'available' };
  });
}

type UnvalidatedCreatePetParam = {
  [key in keyof CreatePetParam]: FormDataEntryValue | null;
};

export function validateCreatePet(
  data: UnvalidatedCreatePetParam,
  setError: (error: string) => void,
) {
  const {
    name,
    species,
    gender,
    ageMonth: ageMonthRaw,
    breed,
    description,
    image,
  } = data;

  const ageMonth = Number(ageMonthRaw);

  if (!name) {
    setError('Pet name is required.');
    return;
  }

  if (species !== 'dog' && species !== 'cat') {
    setError('Invalid species.');
    return;
  }

  if (gender !== 'male' && gender !== 'female') {
    setError('Invalid gender.');
    return;
  }

  if (!Number.isInteger(ageMonth) || ageMonth < 0) {
    setError('Age must be a valid non-negative number.');
    return;
  }

  if (!breed || typeof breed !== 'string') {
    setError('Breed is required.');
    return;
  }

  if (
    !description ||
    typeof description !== 'string' ||
    description.length < 10
  ) {
    setError('Description must be at least 10 characters.');
    return;
  }

  if (!(image instanceof File)) {
    setError('File error: Unsupported File');
    return;
  }

  return data as unknown as CreatePetParam;
}
