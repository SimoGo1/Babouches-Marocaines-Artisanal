import { useEffect, useRef, useState } from 'react';
import type { HomepageFeaturedProductsQuery } from 'storefrontapi.generated';
import { ProductCard } from '~/components/ProductCard';

type AutoProductCarouselProps = HomepageFeaturedProductsQuery & {
    title?: string;
};

export function AutoProductCarousel({
    products,
    title = 'Our Collections',
}: AutoProductCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let animationFrameId: number;
        let lastTime = 0;

        const scroll = (time: number) => {
            if (!isHovered && scrollRef.current) {
                // smooth delta-based scrolling
                if (lastTime !== 0) {
                    const delta = time - lastTime;
                    // scroll 1 pixel every 16ms roughly (~60 fps)
                    const scrollAmount = (delta * 1) / 16;

                    if (scrollRef.current) {
                        scrollRef.current.scrollLeft += scrollAmount;

                        // If scrolled to the end, reset to start or loop.
                        // For a simple infinite effect without duplicating DOM, 
                        // we can just reset to 0 when we reach the end.
                        if (
                            scrollRef.current.scrollLeft >=
                            scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 1
                        ) {
                            // Pause slightly then snap back or just snap back
                            scrollRef.current.scrollLeft = 0;
                        }
                    }
                }
                lastTime = time;
            } else {
                lastTime = 0; // reset so it doesn't jump when un-hovered
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isHovered]);

    if (!products || !products.nodes || products.nodes.length === 0) return null;

    return (
        <section
            style={{
                padding: '6rem 0',
                backgroundColor: '#f9f8f6',
                overflow: 'hidden',
                fontFamily: "'Inter', sans-serif",
            }}
        >
            <div style={{ padding: '0 2rem', marginBottom: '3rem', textAlign: 'center' }}>
                <h2
                    style={{
                        fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 400,
                        color: '#1a1a1a',
                        margin: '0',
                    }}
                >
                    {title}
                </h2>
            </div>

            <div
                ref={scrollRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    display: 'flex',
                    gap: '2rem',
                    padding: '0 2rem',
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    cursor: isHovered ? 'grab' : 'auto',
                }}
                className="hide-scrollbar"
            >
                <style>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>

                {/* we loop the products to create a longer slider if needed */}
                {[...products.nodes, ...products.nodes].map((product, index) => (
                    <div
                        key={`${product.id}-${index}`}
                        style={{
                            flex: '0 0 auto',
                            width: '320px',
                        }}
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </section>
    );
}
