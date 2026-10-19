/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
        './resources/js/**/*.ts',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Inter"', 'Arial', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            },
            colors: {
                brand: {
                    midnight: '#080B20',
                    navy: '#111936',
                    violet: '#A855F7',
                    cyan: '#35DDF5',
                    magenta: '#E879F9',
                    cloud: '#F4F7FC',
                    ink: '#15213B',
                    slate: '#5C6B85',
                    'violet-deep': '#6D28D9',
                    'cyan-deep': '#0E7490',
                    success: '#0F9F9A',
                    warning: '#B45309',
                    error: '#B91C1C',
                    50: '#f5f3ff',
                    100: '#ede9fe',
                    200: '#ddd6fe',
                    300: '#c4b5fd',
                    400: '#a78bfa',
                    500: '#8b5cf6',
                    600: '#6D28D9',
                    700: '#5b21b6',
                    800: '#4c1d95',
                    900: '#111936',
                },
            },
        },
    },
    plugins: [],
};
