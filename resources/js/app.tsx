import '../css/app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import B2BLanding from './Pages/Landing/B2BLanding';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'AviPetApp';

const lazyPages = import.meta.glob('./Pages/**/*.tsx');

createInertiaApp({
    title: (title) => (title ? `${title}` : appName),
    resolve: async (name) => {
        if (name === 'Landing/B2BLanding') {
            return B2BLanding;
        }
        const loader = lazyPages[`./Pages/${name}.tsx`];
        if (!loader) {
            throw new Error(`Inertia page not found: ./Pages/${name}.tsx`);
        }
        const page = (await loader()) as any;
        return page.default;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#6D28D9',
    },
});
