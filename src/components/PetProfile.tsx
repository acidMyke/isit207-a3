import type { Pet } from '../context/Store/Data';
import { IndexedDbImage } from './IndexedDbImage';

type PetProfileProps = {
  pet: Pet;
};

const PetProfile = ({ pet }: PetProfileProps) => {
  const ageYears = Math.floor(pet.ageMonth / 12);
  const remainingMonths = pet.ageMonth % 12;

  const formattedAge =
    ageYears > 0
      ? `${ageYears} yr${ageYears > 1 ? 's' : ''} ${remainingMonths} mo`
      : `${pet.ageMonth} mo`;

  return (
    <section id='petProfile'>
      <div>
        <IndexedDbImage imageId={pet.id} alt={pet.name} />
      </div>

      <div>
        <header>
          <h1>{pet.name}</h1>
        </header>

        <p>{pet.breed}</p>

        <div>
          <span>{pet.species}</span>
          <span>{pet.gender}</span>
          <span>{formattedAge}</span>
        </div>

        <p>{pet.description}</p>
      </div>
    </section>
  );
};

export default PetProfile;
