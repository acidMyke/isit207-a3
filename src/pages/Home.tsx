import { Link } from 'wouter';
import './Home.css';

function HomePage() {
  return (
    <main>
      <section id='home-hero'>
        <div>
          <h1>Give a Pet a Loving Home</h1>
          <p>Every paw deserves love, safety, and a forever family.</p>
          <Link href='/adopt' className='btn-action-gradient'>
            View Pets
          </Link>
        </div>
      </section>
      <section id='home-about'>
        <img
          src='/images/givehelp.webp'
          alt='Shelter volunteers caring for pets'
        />

        <div>
          <h2>About Pet Haven</h2>
          <p>
            Pet Haven is dedicated to rescuing, rehabilitating, and rehoming
            animals in need. Our mission is to connect loving families with pets
            who are waiting for a second chance.
          </p>
        </div>
      </section>
      <section></section>
    </main>
  );
}

export default HomePage;
