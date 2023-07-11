/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-pastel":
					"linear-gradient(25deg,rgba(214,232,232,.02),#f3fdfa 20%,#eceffe 40%,#ffeded 60%,hsla(0,100%,99%,.67) 80%,#faf5ed)",
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	corePlugins: {
		preflight: false,
	},
};
