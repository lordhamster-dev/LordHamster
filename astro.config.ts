import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkCollapse from "remark-collapse";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
	site: SITE.website,
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		react(),
		sitemap(),
	],
	markdown: {
		remarkPlugins: [
			remarkMath,
			remarkToc,
			[
				remarkCollapse,
				{
					test: "TOC",
				},
			],
		],
		rehypePlugins: [rehypeKatex],
		shikiConfig: {
			// For more themes, visit https://shiki.style/themes
			themes: { light: "catppuccin-latte", dark: "catppuccin-mocha" },
			wrap: true,
		},
	},
	vite: {
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
	},
	scopedStyleStrategy: "where",
	experimental: {
		contentLayer: true,
	},
});
