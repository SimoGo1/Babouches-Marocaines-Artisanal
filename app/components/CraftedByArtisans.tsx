import { Link } from '~/components/Link';

export function CraftedByArtisans() {
    return (
        <section
            className="grid grid-cols-1 md:grid-cols-2 mx-auto max-w-[1920px] bg-white font-sans"
        >
            {/* Left Image */}
            <div
                className="w-full h-64 md:h-[100%] min-h-[300px] md:min-h-[400px] bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/d13bc9ae-d010-4c1b-8a24-9a263f3b097f.jpg')",
                }}
            />

            {/* Right Content */}
            <div
                className="py-16 px-8 md:py-24 md:px-16 flex flex-col justify-center max-w-[650px] mx-auto md:mx-0"
            >
                <h2
                    style={{
                        fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 400,
                        color: '#1a1a1a',
                        margin: '0 0 1.5rem',
                        lineHeight: 1.2,
                    }}
                >
                    Crafted by Master Artisans
                </h2>
                <p
                    style={{
                        color: '#555',
                        fontSize: '1.05rem',
                        lineHeight: 1.8,
                        marginBottom: '2rem',
                    }}
                >
                    Every Babouches Marocaines shoe is a testament to traditional craftsmanship, requiring over 30 hours of meticulous handwork. Our master artisans combine time-honored techniques with contemporary design to create footwear of exceptional quality.
                </p>
                <div>
                    <Link
                        to="/about"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: '#1a1a1a',
                            textDecoration: 'none',
                            fontWeight: 500,
                            fontSize: '1.05rem',
                            borderBottom: '1px solid currentColor',
                            paddingBottom: '0.2rem',
                            transition: 'color 0.2s ease, gap 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            const target = e.currentTarget as HTMLElement;
                            target.style.color = '#b8a05a';
                            target.style.gap = '0.75rem';
                        }}
                        onMouseLeave={(e) => {
                            const target = e.currentTarget as HTMLElement;
                            target.style.color = '#1a1a1a';
                            target.style.gap = '0.5rem';
                        }}
                    >
                        Discover Our Process
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
