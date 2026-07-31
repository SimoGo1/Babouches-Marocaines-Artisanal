import type { MetaArgs } from '@shopify/remix-oxygen';

export const meta = () => {
  return [{ title: 'About Us | Babouches Marocaines' }];
};

export default function AboutUs() {
  return (
    <div
      style={{
        fontFamily: "'Playfair Display', serif",
        color: '#1a1a1a',
        backgroundColor: '#fff',
        padding: '4rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            marginBottom: '1.5rem',
            lineHeight: 1.1,
          }}
        >
          About Babouches Marocaines
        </h1>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '2rem' }}>
          Babouches Marocaines is a celebration of handcrafted Moroccan footwear, where heritage design and premium materials meet modern comfort. Each pair is assembled by skilled artisans using techniques passed down through generations.
        </p>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <section>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Our Story</h2>
            <p style={{ margin: 0, lineHeight: 1.75 }}>
              We began with a simple mission: to bring the authentic spirit of Moroccan babouches to a global audience. Our brand honors traditional craftsmanship while introducing refined details for everyday luxury.
            </p>
          </section>
          <section>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Craftsmanship</h2>
            <p style={{ margin: 0, lineHeight: 1.75 }}>
              Every product is handmade with careful attention to materials, stitching, and finish. We source premium leather and fabrics, then blend artisanal skill with thoughtful design to create shoes that age beautifully.
            </p>
          </section>
          <section>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Sustainability</h2>
            <p style={{ margin: 0, lineHeight: 1.75 }}>
              We strive for conscious production by choosing durable materials and partners who respect ethical standards. Our products are designed to last and to be meaningful additions to your wardrobe.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
