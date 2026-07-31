'use client';

import { useState, useEffect, useCallback } from 'react';
import { Link } from '~/components/Link';

type Slide = {
  image: string;
  heading: string;
  byline: string;
  cta: string;
  ctaLink: string;
};

const slides: Slide[] = [
  {
    image: '/images/8d84da60-2df0-4a65-a698-5d24c97a8487.jpg',
    heading: 'Artisanal Footwear for the Modern Sophisticate',
    byline: 'Handcrafted excellence, designed for distinction',
    cta: 'Explore Collection',
    ctaLink: '/collections/all',
  },
  {
    image: '/images/Gemini_Generated_Image_7vebc7vebc7vebc7.png',
    heading: 'Crafted With Passion, Worn With Pride',
    byline: 'Every stitch tells a story of mastery',
    cta: 'Shop Now',
    ctaLink: '/collections/all',
  },
  {
    image: '/images/d13bc9ae-d010-4c1b-8a24-9a263f3b097f.jpg',
    heading: 'The Art of Fine Leather',
    byline: 'Timeless designs for the discerning customer',
    cta: 'Discover More',
    ctaLink: '/collections/all',
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setIsTransitioning(false);
      }, 400);
    },
    [isTransitioning],
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section
      className="hero-slider"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      {/* Background images */}
      {slides.map((s, i) => (
        <div
          key={s.image}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${s.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === current ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            zIndex: 0,
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        className="px-6 pb-24 pt-12 md:p-16 text-left"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '700px',
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? 'translateY(12px)' : 'translateY(0)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.2,
            marginBottom: '1rem',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          {slide.heading}
        </h1>
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'rgba(255,255,255,0.85)',
            marginBottom: '2rem',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {slide.byline}
        </p>
        <Link
          to={slide.ctaLink}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#b8a05a',
            color: '#ffffff',
            padding: '0.85rem 2rem',
            fontSize: '1rem',
            fontWeight: 600,
            textDecoration: 'none',
            letterSpacing: '0.04em',
            transition: 'background-color 0.25s ease, transform 0.2s ease',
            fontFamily: "'Inter', sans-serif",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = '#9e8a3f';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = '#b8a05a';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          }}
        >
          {slide.cta}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="hidden md:flex items-center justify-center cursor-pointer transition duration-200"
        style={{
          position: 'absolute',
          left: '1.25rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 3,
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.4)',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          backdropFilter: 'blur(8px)',
          color: '#fff',
        }}
        onMouseEnter={(e) =>
        ((e.currentTarget as HTMLButtonElement).style.background =
          'rgba(255,255,255,0.3)')
        }
        onMouseLeave={(e) =>
        ((e.currentTarget as HTMLButtonElement).style.background =
          'rgba(255,255,255,0.15)')
        }
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        onClick={next}
        aria-label="Next slide"
        className="hidden md:flex items-center justify-center cursor-pointer transition duration-200"
        style={{
          position: 'absolute',
          right: '1.25rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 3,
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.4)',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          backdropFilter: 'blur(8px)',
          color: '#fff',
        }}
        onMouseEnter={(e) =>
        ((e.currentTarget as HTMLButtonElement).style.background =
          'rgba(255,255,255,0.3)')
        }
        onMouseLeave={(e) =>
        ((e.currentTarget as HTMLButtonElement).style.background =
          'rgba(255,255,255,0.15)')
        }
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.75rem',
          right: '2rem',
          zIndex: 3,
          display: 'flex',
          gap: '0.65rem',
          alignItems: 'center',
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? '28px' : '10px',
              height: '10px',
              borderRadius: i === current ? '5px' : '50%',
              background: i === current ? '#b8a05a' : 'rgba(255,255,255,0.5)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.75rem',
          left: '3rem',
          zIndex: 3,
          color: 'rgba(255,255,255,0.7)',
          fontSize: '0.85rem',
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '0.1em',
        }}
      >
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
    </section>
  );
}
