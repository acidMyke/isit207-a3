export type Pet = {
  id: string;
  status: 'released' | 'adopted';
  name: string;
  species: 'dog' | 'cat';
  gender: 'male' | 'female';
  ageMonth: number;
  breed: string;
  image: string;
  description: string;
  statusDate: string;
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

export type Release = {
  id: string;
  petId: string;

  applicant: Applicant;

  releaseDate: string;
  reason: string;
};
