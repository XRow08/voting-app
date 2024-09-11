/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
	container: {
		center: true,
		padding: '15px',	
	},
	screens: {
		sm: '640px',
		md: '768px',
		lg: '960px',
		xl: '1200px'
	},
	fontFamily: {
		'inter': "var(--font-inter)",
		'space-grotesk': ['var(--font-space-grotesk)', 'sans-serif'],
	},
  	extend: {
  		colors: {
			primary: "#ffffff",
			secondary:"#6B6B6B",
			orange: "#FF6F00",
			purple: "#BE73FE",
  			border: 'rgba(255, 255, 255, 0.1)',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
