import type { ReactNode } from 'react';
import './PageLayout.css';

type PageLayoutProp = {
  imageUrl: string;
  title: string;
  children: ReactNode;
};

export function PageLayout({ title, imageUrl, children }: PageLayoutProp) {
  return (
    <div id='pageLayout'>
      <section id='pageLayoutHero'>
        <img src={imageUrl} alt={title} id='pageLayoutHeroImage' />
        <h1 id='pageLayoutHeroTitle'>{title}</h1>
      </section>

      <section className='pageLayoutContent'>{children}</section>
    </div>
  );
}
