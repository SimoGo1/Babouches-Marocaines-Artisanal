import clsx from 'clsx';
import { flattenConnection, Image, Money, useMoney } from '@shopify/hydrogen';
import type { MoneyV2, Product } from '@shopify/hydrogen/storefront-api-types';

import type { ProductCardFragment } from 'storefrontapi.generated';
import { Text } from '~/components/Text';
import { Link } from '~/components/Link';
import { Button } from '~/components/Button';
import { AddToCartButton } from '~/components/AddToCartButton';
import { isDiscounted, isNewArrival } from '~/lib/utils';
import { getProductPlaceholder } from '~/lib/placeholders';
import { useState } from 'react';

export function ProductCard({
  product,
  label,
  className,
  loading,
  onClick,
  quickAdd,
}: {
  product: ProductCardFragment;
  label?: string;
  className?: string;
  loading?: HTMLImageElement['loading'];
  onClick?: () => void;
  quickAdd?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  let cardLabel;

  const cardProduct: Product = product?.variants
    ? (product as Product)
    : getProductPlaceholder();
  if (!cardProduct?.variants?.nodes?.length) return null;

  const firstVariant = flattenConnection(cardProduct.variants)[0];

  if (!firstVariant) return null;
  const { price, compareAtPrice } = firstVariant;

  // Use the variants image as default, but if we have images(first: 2), we can use the second one
  const images = (product as any).images?.nodes || [];
  const primaryImage = firstVariant.image || images[0];
  const secondaryImage = images.length > 1 ? images[1] : primaryImage;
  const displayImage = isHovered && secondaryImage ? secondaryImage : primaryImage;

  if (label) {
    cardLabel = label;
  } else if (isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2)) {
    cardLabel = 'Sale';
  } else if (isNewArrival(product.publishedAt)) {
    cardLabel = 'New';
  }

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        onClick={onClick}
        to={`/products/${product.handle}`}
        prefetch="viewport"
      >
        <div className={clsx('grid gap-4', className)}>
          <div
            className="card-image aspect-[4/5] bg-primary/5 relative overflow-hidden"
          >
            {primaryImage && (
              <Image
                className="object-cover w-full h-full transition-opacity duration-300"
                style={{
                  opacity: isHovered && secondaryImage && secondaryImage.url !== primaryImage.url ? 0 : 1,
                  position: 'absolute',
                  inset: 0,
                }}
                sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
                aspectRatio="4/5"
                data={primaryImage}
                alt={primaryImage.altText || `Picture of ${product.title}`}
                loading={loading}
              />
            )}
            {secondaryImage && secondaryImage.url !== primaryImage.url && (
              <Image
                className="object-cover w-full h-full transition-opacity duration-300"
                style={{
                  opacity: isHovered ? 1 : 0,
                  position: 'absolute',
                  inset: 0,
                }}
                sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
                aspectRatio="4/5"
                data={secondaryImage}
                alt={secondaryImage.altText || `Second picture of ${product.title}`}
                loading="lazy"
              />
            )}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
              style={{
                backgroundColor: 'rgba(3, 32, 56, 0.45)',
                opacity: isHovered ? 1 : 0,
              }}
            >
              <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold tracking-wide text-primary shadow-md">
                View Details
              </span>
            </div>
            {/* Invisible spacer to maintain aspect ratio since images are absolute */}
            <div style={{ aspectRatio: '4/5' }} />

            <Text
              as="label"
              size="fine"
              className="absolute top-0 right-0 m-4 text-right text-notice z-10"
            >
              {cardLabel}
            </Text>
          </div>
          <div className="grid gap-1">
            <Text
              className="w-full overflow-hidden whitespace-normal text-ellipsis"
              as="h3"
            >
              {product.title}
            </Text>
            <div className="flex flex-wrap gap-4 items-center">
              <Text className="flex flex-wrap gap-4">
                <Money withoutTrailingZeros data={price!} />
                {isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2) && (
                  <CompareAtPrice
                    className={'opacity-50'}
                    data={compareAtPrice as MoneyV2}
                  />
                )}
              </Text>
            </div>
          </div>
        </div>
      </Link>
      {quickAdd && firstVariant.availableForSale && (
        <AddToCartButton
          lines={[
            {
              quantity: 1,
              merchandiseId: firstVariant.id,
            },
          ]}
          variant="secondary"
          className="mt-2"
        >
          <Text as="span" className="flex items-center justify-center gap-2">
            Add to Cart
          </Text>
        </AddToCartButton>
      )}
      {quickAdd && !firstVariant.availableForSale && (
        <Button variant="secondary" className="mt-2" disabled>
          <Text as="span" className="flex items-center justify-center gap-2">
            Sold out
          </Text>
        </Button>
      )}
    </div>
  );
}

function CompareAtPrice({
  data,
  className,
}: {
  data: MoneyV2;
  className?: string;
}) {
  const { currencyNarrowSymbol, withoutTrailingZerosAndCurrency } =
    useMoney(data);

  const styles = clsx('strike', className);

  return (
    <span className={styles}>
      {currencyNarrowSymbol}
      {withoutTrailingZerosAndCurrency}
    </span>
  );
}
