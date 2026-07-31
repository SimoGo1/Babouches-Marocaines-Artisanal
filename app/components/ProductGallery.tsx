'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { Image } from '@shopify/hydrogen';
import type { MediaFragment } from 'storefrontapi.generated';

/**
 * Premium product gallery: large main image + horizontal thumbnail strip
 */
export function ProductGallery({
  media,
  className,
}: {
  media: MediaFragment[];
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [touchEndY, setTouchEndY] = useState<number | null>(null);

  if (!media.length) return null;

  const images = media
    .filter((m) => m.__typename === 'MediaImage' && m.image)
    .map((m) => ({
      id: m.id,
      image: (m as any).image,
      alt: (m as any).alt || 'Product image',
    }));

  if (!images.length) return null;

  const active = images[activeIndex];
  const hasMultiple = images.length > 1;
  const minSwipeDistance = 50;
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const activeThumbnail = thumbnailRefs.current[activeIndex];
    activeThumbnail?.scrollIntoView({
      inline: 'center',
      block: 'nearest',
      behavior: 'smooth',
    });
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((index) => Math.max(index - 1, 0));
  };

  const handleNext = () => {
    setActiveIndex((index) => Math.min(index + 1, images.length - 1));
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch') return;
    setTouchEndX(null);
    setTouchEndY(null);
    setTouchStartX(event.clientX);
    setTouchStartY(event.clientY);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (touchStartX === null || touchStartY === null) return;
    setTouchEndX(event.clientX);
    setTouchEndY(event.clientY);
  };

  const onPointerUp = () => {
    if (
      touchStartX === null ||
      touchStartY === null ||
      touchEndX === null ||
      touchEndY === null
    ) {
      setTouchStartX(null);
      setTouchStartY(null);
      setTouchEndX(null);
      setTouchEndY(null);
      return;
    }

    const distanceX = touchStartX - touchEndX;
    const distanceY = touchStartY - touchEndY;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    if (isHorizontalSwipe && Math.abs(distanceX) > minSwipeDistance) {
      if (distanceX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    setTouchStartX(null);
    setTouchStartY(null);
    setTouchEndX(null);
    setTouchEndY(null);
  };

  const onPointerCancel = () => {
    setTouchStartX(null);
    setTouchStartY(null);
    setTouchEndX(null);
    setTouchEndY(null);
  };

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        minWidth: 0,
        maxWidth: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Main large image */}
      <div style={{ position: 'relative' }}>
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          style={{
            touchAction: 'pan-y pinch-zoom',
            background: '#f8f5f0',
            borderRadius: '4px',
            overflow: 'hidden',
            aspectRatio: '4/3',
            width: '100%',
            maxWidth: '100%',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <Image
            data={active.image}
            alt={active.alt}
            sizes="(min-width: 768px) 55vw, 100vw"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              display: 'block',
              transition: 'opacity 0.3s ease',
            }}
            loading="eager"
          />
        </div>

        {hasMultiple && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => setActiveIndex((index) => Math.max(index - 1, 0))}
              disabled={activeIndex === 0}
              style={{
                position: 'absolute',
                top: '50%',
                left: '0.75rem',
                transform: 'translateY(-50%)',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '999px',
                border: 'none',
                background: 'rgba(255,255,255,0.95)',
                cursor: activeIndex === 0 ? 'not-allowed' : 'pointer',
                display: 'grid',
                placeItems: 'center',
                boxShadow: '0 8px 18px rgba(0,0,0,0.12)',
              }}
            >
              <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>&larr;</span>
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => setActiveIndex((index) => Math.min(index + 1, images.length - 1))}
              disabled={activeIndex === images.length - 1}
              style={{
                position: 'absolute',
                top: '50%',
                right: '0.75rem',
                transform: 'translateY(-50%)',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '999px',
                border: 'none',
                background: 'rgba(255,255,255,0.95)',
                cursor: activeIndex === images.length - 1 ? 'not-allowed' : 'pointer',
                display: 'grid',
                placeItems: 'center',
                boxShadow: '0 8px 18px rgba(0,0,0,0.12)',
              }}
            >
              <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>&rarr;</span>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div
          style={{
            display: 'flex',
            gap: '0.65rem',
            overflowX: 'auto',
            paddingBottom: '0.25rem',
            paddingTop: '0.25rem',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
            minWidth: 0,
          }}
        >
          {images.map((item, i) => (
            <button
              ref={(element) => {
                thumbnailRefs.current[i] = element;
              }}
              key={item.id || i}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              style={{
                flexShrink: 0,
                minWidth: '72px',
                width: '80px',
                height: '80px',
                border: i === activeIndex ? '2px solid #1a1a1a' : '2px solid transparent',
                borderRadius: '3px',
                overflow: 'hidden',
                background: '#f0ece4',
                cursor: 'pointer',
                padding: 0,
                transition: 'border-color 0.2s ease, opacity 0.2s ease',
                opacity: i === activeIndex ? 1 : 0.7,
                scrollSnapAlign: 'start',
              }}
            >
              <Image
                data={item.image}
                alt={item.alt}
                sizes="80px"
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  display: 'block',
                }}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
