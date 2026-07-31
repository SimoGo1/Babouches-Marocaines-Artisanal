export function Testimonial() {
    return (
        <section
            style={{
                backgroundColor: '#1d2a36',
                color: '#ffffff',
                padding: '6rem 2rem',
                textAlign: 'center',
                fontFamily: "'Inter', sans-serif",
            }}
        >
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {/* Five Stars */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '2rem', color: '#b8a05a' }}>
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    ))}
                </div>

                {/* Quote */}
                <blockquote
                    style={{
                        margin: '0 0 3rem',
                        padding: 0,
                        border: 'none',
                    }}
                >
                    <p
                        style={{
                            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                            fontFamily: "'Playfair Display', serif",
                            lineHeight: 1.4,
                            fontWeight: 400,
                        }}
                    >
                        "The attention to detail and quality of craftsmanship in every Babouches Marocaines shoe is simply unmatched. True artisanal excellence."
                    </p>
                </blockquote>

                {/* Attribution */}
                <p
                    style={{
                        fontSize: '1rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        letterSpacing: '0.05em',
                    }}
                >
                    - The Luxury Report
                </p>
            </div>
        </section>
    );
}
