import type { Config } from 'tailwindcss'

export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}",
        "./node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
        screens: {
            'xxs': '375px',
            'xs': '425px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
            '3xl': '1980px',
            '4xl': '2048px',
        },
    },
    plugins: [
        require('flowbite/plugin'),
    ],
} satisfies Config