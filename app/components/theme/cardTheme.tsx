// themes/cardThemes.ts
import { createTheme } from "flowbite-react";

export const customTheme = createTheme({
    card: {
        "root": {
            "base": "flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800",
            "children": "flex h-full flex-col justify-start gap-4 p-4",
            "horizontal": {
                "off": "flex-col",
                "on": "flex-col md:max-w-xl md:flex-row"
            },
            "href": "hover:bg-gray-100 dark:hover:bg-gray-700"
        },
        "img": {
            "base": "",
            "horizontal": {
                "off": "rounded-t-lg",
                "on": "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            }
        }
    }
});

// Custom theme for upcomming task cards
export const customTheme1 = createTheme({
    card: {
        "root": {
            "base": "flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800",
            "children": "flex h-full flex-col justify-start gap-4 p-2",
            "horizontal": {
                "off": "flex-col",
                "on": "flex-col md:max-w-xl md:flex-row"
            },
            "href": "hover:bg-gray-100 dark:hover:bg-gray-700"
        },
        "img": {
            "base": "",
            "horizontal": {
                "off": "rounded-t-lg",
                "on": "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            }
        }
    }
});
