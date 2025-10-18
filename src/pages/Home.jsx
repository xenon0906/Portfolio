import React, { lazy, Suspense } from 'react';
import Hero from '../components/Hero/Hero';
import { SkeletonCard } from '../components/UI/SkeletonLoader';

// Lazy load sections for better performance
const About = lazy(() => import('../components/About/About'));
const Education = lazy(() => import('../components/Education/Education'));
const Experience = lazy(() => import('../components/Experience/Experience'));
const Services = lazy(() => import('../components/Services/Services'));

const SectionLoader = () => (
  <div className="py-32 px-4">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(4)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  </div>
);

export const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />

      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Education />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Experience />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Services />
      </Suspense>
    </div>
  );
};

export default Home;
