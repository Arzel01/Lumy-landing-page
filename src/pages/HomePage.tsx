import PageLayout from '../layouts/PageLayout';
import Hero from '../components/Hero';
import Unboxing from '../components/Unboxing';
import Reviews from '../components/Reviews';

export default function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <Unboxing />
      <Reviews />
    </PageLayout>
  );
}
