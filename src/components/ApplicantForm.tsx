import type { Applicant } from '../context/Store/Data';

type ApplicantFormProps = {
  value: Applicant;
  onChange: (applicant: Applicant) => void;
};

export const ApplicantForm = ({ value, onChange }: ApplicantFormProps) => {
  const handleChange =
    (field: keyof Applicant) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...value, [field]: e.target.value });
    };

  return (
    <>
      <div className='formfield'>
        <label htmlFor='fullname'>Full Name</label>
        <input
          id='fullname'
          type='text'
          required
          minLength={3}
          placeholder='John Doe'
          value={value.fullname}
          onChange={handleChange('fullname')}
        />
        <p>Please enter your full name.</p>
      </div>

      <div className='formfield'>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          required
          placeholder='john@email.com'
          value={value.email}
          onChange={handleChange('email')}
        />
        <p>Please enter a valid email.</p>
      </div>

      <div className='formfield'>
        <label htmlFor='phone'>Phone Number</label>
        <input
          id='phone'
          type='tel'
          required
          pattern='[0-9+\-\s]{7,}'
          placeholder='+1 555 123 4567'
          value={value.phoneNumber}
          onChange={handleChange('phoneNumber')}
        />
        <p>Please enter a valid phone number.</p>
      </div>
    </>
  );
};
