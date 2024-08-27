/**
 * Tailwind CSS configuration file.
 *
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  // Enabling dark mode for Tailwind CSS.
  darkMode: "class",

  // Specifying the content files for Tailwind CSS.
  content: ["./src/**/*.{js,ts,jsx,tsx,css}"],

  // Theme customization for Tailwind CSS.
  theme: {
    extend: {
      // Extending text color options for light and dark themes.
      textColor: {
        light: {
          base: "var(--color-text-light-base)",
          muted: "var(--color-text-light-muted)",
        },
        dark: {
          base: "var(--color-text-dark-base)",
          muted: "var(--color-text-dark-muted)",
        },
      },

      // Extending background color options for light and dark themes.
      backgroundColor: {
        light: {
          fill: "var(--color-light-fill)",
          muted: "var(--color-fill-light-muted)",
          button: "var(--color-light-button)",
          "button-hover": "var(--color-button-light-hover)",
          "button-selected": "var(--color-button-light-selected)",
          "button-selected-hover": "var(--color-button-light-selected-hover)",
          "list-selected": "var(--color-list-light-selected)",
          "list-hover": "var(--color-list-light-hover)",
        },
        dark: {
          fill: "var(--color-dark-fill)",
          muted: "var(--color-fill-dark-muted)",
          button: "var(--color-dark-button)",
          "button-hover": "var(--color-button-dark-hover)",
          "button-selected": "var(--color-button-dark-selected)",
          "button-selected-hover": "var(--color-button-dark-selected-hover)",
          "list-selected": "var(--color-list-dark-selected)",
          "list-hover": "var(--color-list-dark-hover)",
        },
      },
    },
  },

  // Array of plugins used in Tailwind CSS.
  plugins: [],
};
