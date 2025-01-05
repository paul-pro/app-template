import { type Config } from "tailwindcss";

export default {
    content: ["./src/**/*.tsx"],
  theme: {
  	extend: {
  		colors: {
  			background: "hsl(var(--background))",
  			foreground: "hsl(var(--foreground))",
  			border: "hsl(var(--border))",
  		},
  	}
  },
} satisfies Config;
