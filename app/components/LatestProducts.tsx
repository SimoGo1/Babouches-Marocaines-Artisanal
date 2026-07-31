import { flattenConnection, Image, Money } from '@shopify/hydrogen';
import type { MoneyV2 } from '@shopify/hydrogen/storefront-api-types';
import type { ProductCardFragment } from 'storefrontapi.generated';
import { Link } from '~/components/Link';
import { isDiscounted } from '~/lib/utils';

type LatestProductsProps = {
    products: { nodes: ProductCardFragment[] };
    title?: string;
    count?: number;
};

export function LatestProducts({
    products,
    title = 'Our Latest Products',
    count = 3,
}: LatestProductsProps) {
    const items = products?.nodes?.slice(0, count) ?? [];

    return (
        <section
            style={{
                padding: '4rem 2rem',
                background: '#ffffff',
                fontFamily: "'Inter', sans-serif",
            }}
        >
            {/* Section heading */}
            <h2
                style={{
                    textAlign: 'center',
                    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                    fontWeight: 700,
                    color: '#1a1a1a',
                    marginBottom: '3rem',
                    fontFamily: "'Playfair Display', serif",
                    letterSpacing: '0.01em',
                }}
            >
                {title}
            </h2>

            {/* Product grid */}
            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto"
            >
                {items.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>

            {/* View all link */}
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <Link
                    to="/collections/all"
                    style={{
                        display: 'inline-block',
                        padding: '0.75rem 2.5rem',
                        border: '2px solid #1a1a1a',
                        color: '#1a1a1a',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        textDecoration: 'none',
                        transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = '#1a1a1a';
                        el.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = 'transparent';
                        el.style.color = '#1a1a1a';
                    }}
                >
                    View All Products
                </Link>
            </div>
        </section>
    );
}

function ProductItem({ product }: { product: ProductCardFragment }) {
    const variants = flattenConnection(product.variants);
    const firstVariant = variants[0];
    if (!firstVariant) return null;

    const { image, price, compareAtPrice } = firstVariant;
    const onSale = isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2);

    return (
        <Link
            to={`/products/${product.handle}`}
            prefetch="viewport"
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
        >
            <div
                style={{
                    background: '#f8f6f2',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = 'translateY(-4px)';
                    el.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'none';
                }}
            >
                {/* Sale badge */}
                {onSale && (
                    <span
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            left: '1rem',
                            zIndex: 1,
                            background: '#b8a05a',
                            color: '#fff',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            padding: '0.25rem 0.6rem',
                            borderRadius: '2px',
                            textTransform: 'uppercase',
                        }}
                    >
                        Sale
                    </span>
                )}

                {/* Product image */}
                <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: '#f0ece4' }}>
                    {image ? (
                        <Image
                            data={image}
                            alt={image.altText || product.title}
                            aspectRatio="4/3"
                            sizes="(min-width: 1200px) 380px, (min-width: 768px) 33vw, 85vw"
                            style={{
                                objectFit: 'cover',
                                width: '100%',
                                height: '100%',
                                display: 'block',
                                transition: 'transform 0.4s ease',
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                background: '#e5ded3',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#999',
                                fontSize: '0.85rem',
                            }}
                        >
                            No image
                        </div>
                    )}
                </div>
            </div>

            {/* Product info */}
            <div style={{ paddingTop: '1rem' }}>
                <h3
                    style={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#1a1a1a',
                        margin: '0 0 0.4rem',
                        fontFamily: "'Inter', sans-serif",
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {product.title}
                </h3>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.95rem',
                        color: '#555',
                    }}
                >
                    <Money withoutTrailingZeros data={price!} />
                    {onSale && compareAtPrice && (
                        <span style={{ textDecoration: 'line-through', color: '#aaa', fontSize: '0.85rem' }}>
                            <Money withoutTrailingZeros data={compareAtPrice as MoneyV2} />
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}
