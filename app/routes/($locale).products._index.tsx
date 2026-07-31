import {
  json,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import invariant from 'tiny-invariant';
import { useInView } from 'react-intersection-observer';
import {
  Pagination,
  getPaginationVariables,
  getSeoMeta,
  flattenConnection,
} from '@shopify/hydrogen';
import type {
  ProductCollectionSortKeys,
  ProductFilter,
  Filter,
} from '@shopify/hydrogen/storefront-api-types';

import { ProductCard } from '~/components/ProductCard';
import { SortFilter, type SortParam, type AppliedFilter, FILTER_URL_PREFIX } from '~/components/SortFilter';
import { PRODUCT_CARD_FRAGMENT } from '~/data/fragments';
import { getImageLoadingPriority } from '~/lib/const';
import { seoPayload } from '~/lib/seo.server';
import { parseAsCurrency } from '~/lib/utils';
import { routeHeaders } from '~/data/cache';

const PAGE_BY = 12;

export const headers = routeHeaders;

export async function loader({
  request,
  context: { storefront },
}: LoaderFunctionArgs) {
  const variables = getPaginationVariables(request, { pageBy: PAGE_BY });
  const searchParams = new URL(request.url).searchParams;
  const locale = storefront.i18n;

  const { sortKey, reverse } = getSortValuesFromParam(
    searchParams.get('sort') as SortParam,
  );

  const filters = [...searchParams.entries()].reduce(
    (filters, [key, value]) => {
      if (key.startsWith(FILTER_URL_PREFIX)) {
        const filterKey = key.substring(FILTER_URL_PREFIX.length);
        filters.push({
          [filterKey]: JSON.parse(value),
        });
      }
      return filters;
    },
    [] as ProductFilter[],
  );

  const data = await storefront.query(ALL_PRODUCTS_QUERY, {
    variables: {
      ...variables,
      filters,
      sortKey,
      reverse,
      country: locale.country,
      language: locale.language,
    },
  });

  invariant(data, 'No data returned from Shopify API');

  // Fallback to top-level products if there is no 'all' collection
  const products = data.collection?.products || data.products;
  const rawFilters = data.collection?.products?.filters || [];

  const allFilterValues = rawFilters.flatMap((f: Filter) => f.values);
  const appliedFilters = filters
    .map((filter) => {
      const foundValue = allFilterValues.find((value: any) => {
        const valueInput = JSON.parse(value.input as string) as ProductFilter;
        if (valueInput.price && filter.price) return true;
        return JSON.stringify(valueInput) === JSON.stringify(filter);
      });
      if (!foundValue) return null;

      if (foundValue.id === 'filter.v.price') {
        const input = JSON.parse(foundValue.input as string) as ProductFilter;
        const min = parseAsCurrency(input.price?.min ?? 0, locale);
        const max = input.price?.max
          ? parseAsCurrency(input.price.max, locale)
          : '';
        const label = min && max ? `${min} - ${max}` : 'Price';
        return { filter, label };
      }
      return { filter, label: foundValue.label };
    })
    .filter((f): f is AppliedFilter => f !== null);

  const seo = seoPayload.collection({
    url: request.url,
    collection: {
      id: 'all-products',
      title: 'All Products',
      handle: 'products',
      descriptionHtml: 'All the store products',
      description: 'All the store products',
      seo: {
        title: 'Catalog',
        description: 'All the store products',
      },
      metafields: [],
      products,
      updatedAt: '',
    },
  });

  return json({
    products,
    rawFilters,
    appliedFilters,
    seo,
  });
}

export const meta = ({ matches }: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function AllProducts() {
  const { products, rawFilters, appliedFilters } = useLoaderData<typeof loader>();
  const { ref, inView } = useInView();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#fff' }}>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          height: '60vh',
          minHeight: '400px',
          maxHeight: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#1d2a36',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "url('/images/8d84da60-2df0-4a65-a698-5d24c97a8487.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 100%)',
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1200px',
            width: '100%',
            padding: '0 2rem',
            color: '#fff',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              margin: '0 0 1rem',
              letterSpacing: '0.01em',
            }}
          >
            Artisanal Excellence
          </h1>
          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              maxWidth: '500px',
              margin: 0,
              color: 'rgba(255, 255, 255, 0.85)',
            }}
          >
            Each Babouches Marocaines piece embodies the pinnacle of shoemaking craft, where time-honored techniques meet contemporary sophistication.
          </p>
        </div>
      </section>

      {/* Catalog Listing */}
      <section>
        <SortFilter
          filters={rawFilters as Filter[]}
          appliedFilters={appliedFilters}
          collections={[]}
        >
          {/* Sub-header inside SortFilter so it sits next to the filter sidebar if open */}
          <div
            style={{
              background: '#f5f1eb',
              padding: '2rem',
              marginBottom: '3rem',
              borderBottom: '1px solid #e8e3dc',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: '1.75rem',
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                  color: '#1a1a1a',
                  margin: '0 0 0.5rem',
                }}
              >
                The Collection
              </h2>
              <span style={{ fontSize: '0.9rem', color: '#666' }}>
                Showing {products.nodes.length} handcrafted pieces
              </span>
            </div>

            {/* Sort & Filter buttons are controlled by the wrapper by default, but we'll let SortFilter handle its layout */}
            {/* The user screenshot shows "Filter Sort" text buttons. We rely on the wrapper's UI if it's there. */}
          </div>

          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
            <Pagination connection={products}>
              {({
                nodes,
                isLoading,
                PreviousLink,
                NextLink,
                nextPageUrl,
                hasNextPage,
                state,
              }) => (
                <>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                    <PreviousLink
                      style={{
                        padding: '1rem 2rem',
                        border: '1px solid #1a1a1a',
                        fontWeight: 600,
                        color: '#1a1a1a',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        fontSize: '0.85rem',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {isLoading ? 'Loading...' : 'Load previous'}
                    </PreviousLink>
                  </div>

                  <ProductsLoadedOnScroll
                    nodes={nodes}
                    inView={inView}
                    nextPageUrl={nextPageUrl}
                    hasNextPage={hasNextPage}
                    state={state}
                  />

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem', marginBottom: '4rem' }}>
                    <NextLink
                      ref={ref}
                      style={{
                        padding: '1rem 2.5rem',
                        background: '#1d2a36',
                        color: '#ffffff',
                        border: 'none',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        textDecoration: 'none',
                        transition: 'background 0.2s',
                        borderRadius: '2px',
                      }}
                    >
                      {isLoading ? 'Loading...' : 'Load more products'}
                    </NextLink>
                  </div>
                </>
              )}
            </Pagination>
          </div>
        </SortFilter>
      </section>
    </div>
  );
}

function ProductsLoadedOnScroll({
  nodes,
  inView,
  nextPageUrl,
  hasNextPage,
  state,
}: {
  nodes: any;
  inView: boolean;
  nextPageUrl: string;
  hasNextPage: boolean;
  state: any;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (inView && hasNextPage) {
      navigate(nextPageUrl, {
        replace: true,
        preventScrollReset: true,
        state,
      });
    }
  }, [inView, navigate, state, nextPageUrl, hasNextPage]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {nodes.map((product: any, i: number) => (
        <ProductCard
          key={product.id}
          product={product}
          loading={getImageLoadingPriority(i)}
        />
      ))}
    </div>
  );
}

function getSortValuesFromParam(sortParam: SortParam | null) {
  switch (sortParam) {
    case 'price-high-low':
      return { sortKey: 'PRICE', reverse: true };
    case 'price-low-high':
      return { sortKey: 'PRICE', reverse: false };
    case 'best-selling':
      return { sortKey: 'BEST_SELLING', reverse: false };
    case 'newest':
      return { sortKey: 'CREATED', reverse: true };
    case 'featured':
      return { sortKey: 'MANUAL', reverse: false };
    default:
      return { sortKey: 'ID', reverse: false };
  }
}

const ALL_PRODUCTS_QUERY = `#graphql
  query AllProducts(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) @inContext(country: $country, language: $language) {
    collection(handle: "all") {
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
        filters: $filters,
        sortKey: $sortKey,
        reverse: $reverse
      ) {
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
    products(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor,
      sortKey: ID,
      reverse: $reverse
    ) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;
