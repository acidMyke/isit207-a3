import { useRoute } from 'wouter';
import { usePetDataStore } from '../context/Store/Provider';
import './ConfirmationPage.css';

type ConfirmationType = 'adoption' | 'rehome';
const ConfirmationPagePath = '/confirmation/:type/:id' as const;

function ConfirmationPageComponent() {
  const { adoptions, rehomes } = usePetDataStore();
  const [, params] = useRoute(ConfirmationPagePath);

  const type = params?.type as ConfirmationType | undefined;
  const id = params?.id;

  const isValidType = type === 'adoption' || type === 'rehome';

  if (!id || !isValidType) {
    return <InvalidState />;
  }

  const record =
    type === 'adoption'
      ? adoptions.find(a => a.id === id)
      : rehomes.find(r => r.id === id);

  if (!record) {
    return <InvalidState />;
  }

  return (
    <section className='confirmation'>
      <p>
        {type === 'adoption'
          ? 'Adoption Confirmed'
          : 'Rehome Request Submitted'}
      </p>

      <h1>#{id}</h1>

      <p>
        Thank you for your {type}. Our team will review your request and contact
        you shortly with the next steps.
      </p>

      <p>A copy of this acknowledgement is sent to your email</p>
    </section>
  );
}

function InvalidState() {
  return (
    <section className='confirmation invalid'>
      <h1>Invalid confirmation</h1>
      <p>The confirmation link is invalid or no longer exists.</p>
    </section>
  );
}

export const ConfirmationPage = Object.assign(ConfirmationPageComponent, {
  path: ConfirmationPagePath,
  createUrl: (type: ConfirmationType, id: string) =>
    `/confirmation/${type}/${id}`,
});

export default ConfirmationPage;
