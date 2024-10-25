import React from 'react';
import Carousel from '../../components/ui/carousel'; // Adjust path as necessary

export function HomeComp2() {
  const testimonials = [
    {
      quote: "It was the best of times, it was the worst of times...",
      name: "Charles Dickens",
      title: "A Tale of Two Cities",
    },
    {
      quote: "To be, or not to be, that is the question...",
      name: "William Shakespeare",
      title: "Hamlet",
    },
    {
      quote: "All that we see or seem is but a dream within a dream.",
      name: "Edgar Allan Poe",
      title: "A Dream Within a Dream",
    },
    {
      quote: "It is a truth universally acknowledged...",
      name: "Jane Austen",
      title: "Pride and Prejudice",
    },
    {
      quote: "Call me Ishmael...",
      name: "Herman Melville",
      title: "Moby-Dick",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-[40rem] bg-transparent light-mode"> {/* Add light-mode or dark-mode class based on your app's theme */}
      <Carousel items={testimonials} speed="slow" />
    </div>
  );
}

export default HomeComp2;