import { ContactPage } from '~/components/ContactPage';
import type { MetaArgs } from '@shopify/remix-oxygen';

export const meta = () => {
    return [{ title: 'Cadence | Contact Us' }];
};

export default function ContactUs() {
    return <ContactPage />;
}
