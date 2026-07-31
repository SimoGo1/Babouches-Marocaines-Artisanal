import { useParams, Form } from '@remix-run/react';
import { type EnhancedMenu, type ChildEnhancedMenuItem } from '~/lib/utils';
import { Link } from '~/components/Link';

type FooterProps = {
    menu?: EnhancedMenu | null;
};

export function Footer({ menu }: FooterProps) {
    const currentYear = new Date().getFullYear();

    // Social Icon components (direct SVG paths)
    const InstagramIcon = () => (
        <svg
            className="w-5 h-5 text-slate-400 hover:text-white transition-colors duration-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
    );

    const FacebookIcon = () => (
        <svg
            className="w-5 h-5 text-slate-400 hover:text-white transition-colors duration-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    );

    const LinkedinIcon = () => (
        <svg
            className="w-5 h-5 text-slate-400 hover:text-white transition-colors duration-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    );

    // Fallback links matching the image
    const defaultQuickLinks = [
        { id: '1', title: 'Products', to: '/products' },
        { id: '2', title: 'Our Craft', to: '/our-craft' },
        { id: '3', title: 'Care Guide', to: '/care-guide' },
        { id: '4', title: 'About Us', to: '/about-us' },
    ];

    const defaultPolicies = [
        { id: '5', title: 'Search', to: '/search' },
    ];

    // Helper to render dynamic items from Shopify menu or default links
    const renderLinksColumn = (columnTitle: string, defaultItems: Array<{ id: string; title: string; to: string }>) => {
        // Check if menu has this section
        const menuItem = menu?.items?.find(
            (item) => item.title.toLowerCase() === columnTitle.toLowerCase()
        );

        if (menuItem && menuItem.items && menuItem.items.length > 0) {
            return menuItem.items.map((subItem: ChildEnhancedMenuItem) => {
                const to = subItem.to.startsWith('http') ? subItem.to : subItem.to;
                const target = subItem.target;
                return (
                    <li key={subItem.id}>
                        {to.startsWith('http') ? (
                            <a
                                href={to}
                                target={target}
                                rel="noopener noreferrer"
                                className="hover:text-white text-slate-400 transition-colors duration-200"
                            >
                                {subItem.title}
                            </a>
                        ) : (
                            <Link
                                to={to}
                                target={target}
                                className="hover:text-white text-slate-400 transition-colors duration-200"
                            >
                                {subItem.title}
                            </Link>
                        )}
                    </li>
                );
            });
        }

        // Default lists
        return defaultItems.map((item) => (
            <li key={item.id}>
                <Link
                    to={item.to}
                    className="hover:text-white text-slate-400 transition-colors duration-200"
                >
                    {item.title}
                </Link>
            </li>
        ));
    };

    return (
        <footer className="bg-[#17202c] text-white pt-16 pb-8 border-t border-slate-900 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Newsletter Section */}
                <div className="flex flex-col items-center text-center pb-12 mb-12 border-b border-slate-800/80">
                    <h2 className="text-3xl md:text-4xl font-serif tracking-normal text-white mb-3">
                        Join the Artisans Circle
                    </h2>
                    <p className="text-sm md:text-base text-slate-400 max-w-xl mb-6">
                        Subscribe to receive updates on new collections, craftsmanship insights, and exclusive offers.
                    </p>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            alert('Subscribed successfully!');
                        }}
                        className="flex flex-col sm:flex-row gap-3 w-full max-w-lg justify-center"
                    >
                        <input
                            type="email"
                            placeholder="Your email address"
                            required
                            className="bg-[#1e2733] border border-slate-700/80 px-4 py-3 rounded text-sm text-white placeholder-slate-500 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 flex-grow transition duration-200"
                        />
                        <button
                            type="submit"
                            className="bg-[#cca23e] hover:bg-[#b08c35] text-white text-sm font-semibold tracking-wide py-3 px-6 rounded transition duration-200"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>

                {/* 4-Column Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 pb-16">

                    {/* Column 1: Brand Info */}
                    <div className="space-y-4">
                        <h3
                        className="text-xl tracking-wide text-white uppercase"
                        style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
                    >
                        Babouches Marocaines
                    </h3>
                        <p className="text-sm text-slate-400 leading-relaxed font-light pr-4">
                            Artisinal footwear for the modern sophisticate. Crafted with precision, designed for distinction.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <InstagramIcon />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FacebookIcon />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <LinkedinIcon />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-serif text-white">
                            Contact
                        </h3>
                        <ul className="space-y-3 text-sm text-slate-400 font-light">
                            <li className="flex items-start gap-3">
                                <svg
                                    className="w-5 h-5 text-slate-400 mt-0.5 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span>
                                    123 Artisan Way<br />
                                    Luxury District, RABAT 10001 MOROCCO
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg
                                    className="w-5 h-5 text-slate-400 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                                <span>+212 (06) 7352-9197</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg
                                    className="w-5 h-5 text-slate-400 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <span>m.riyati@pyxicom.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-serif text-white">
                            Quick Links
                        </h3>
                        <ul className="space-y-2.5 text-sm text-slate-400 font-light">
                            {renderLinksColumn('Quick Links', defaultQuickLinks)}
                        </ul>
                    </div>

                    {/* Column 4: Policies/Search */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-serif text-white">
                            Policies
                        </h3>
                        <ul className="space-y-2.5 text-sm text-slate-400 font-light">
                            {renderLinksColumn('Policies', defaultPolicies)}
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-800/80 text-xs text-slate-500 font-light">
                    <p>© {currentYear} Babouches Marocaines. All rights reserved.</p>
                    <p>Crafted with passion in Rabat Mohammed RIYATI.</p>
                </div>

            </div>
        </footer>
    );
}
