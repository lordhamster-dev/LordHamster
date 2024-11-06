import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
	website: "https://lordhamster.com",
	author: "LordHamster",
	profile: "https://lordhamster.com",
	desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
	title: "LordHamster's Blog",
	ogImage: "astropaper-og.jpg",
	lightAndDarkMode: true,
	postPerIndex: 4,
	postPerPage: 5,
	scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
	showArchives: true,
};

export const LOCALE = {
	lang: "zh", // html lang code. Set this empty and default will be "en"
	langTag: ["zh-CN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const SOCIALS: SocialObjects = [
	{
		name: "Github",
		href: "https://github.com/lordhamster-dev",
		linkTitle: ` ${SITE.title} on Github`,
		active: true,
	},
	{
		name: "Facebook",
		href: "https://github.com/satnaing/astro-paper",
		linkTitle: `${SITE.title} on Facebook`,
		active: false,
	},
	{
		name: "Instagram",
		href: "https://github.com/satnaing/astro-paper",
		linkTitle: `${SITE.title} on Instagram`,
		active: false,
	},
	{
		name: "LinkedIn",
		href: "https://github.com/satnaing/astro-paper",
		linkTitle: `${SITE.title} on LinkedIn`,
		active: false,
	},
	{
		name: "Mail",
		href: "mailto:zhaojinbiao@lordhamster.com",
		linkTitle: `Send an email to ${SITE.title}`,
		active: true,
	},
	{
		name: "X",
		href: "https://github.com/satnaing/astro-paper",
		linkTitle: `${SITE.title} on X`,
		active: false,
	},
	{
		name: "Twitch",
		href: "https://github.com/satnaing/astro-paper",
		linkTitle: `${SITE.title} on Twitch`,
		active: false,
	},
	{
		name: "YouTube",
		href: "https://www.youtube.com/@lordhamster-dev",
		linkTitle: `${SITE.title} on YouTube`,
		active: true,
	},
	{
		name: "WhatsApp",
		href: "https://github.com/satnaing/astro-paper",
		linkTitle: `${SITE.title} on WhatsApp`,
		active: false,
	},
	{
		name: "Snapchat",
		href: "https://github.com/satnaing/astro-paper",
		linkTitle: `${SITE.title} on Snapchat`,
		active: false,
	},
	{
		name: "Pinterest",
		href: "https://github.com/satnaing/astro-paper",
		linkTitle: `${SITE.title} on Pinterest`,
		active: false,
	},
	{
		name: "TikTok",
		href: "https://github.com/satnaing/astro-paper",
		linkTitle: `${SITE.title} on TikTok`,
		active: false,
	},
	{
		name: "CodePen",
		href: "https://github.com/satnaing/astro-paper",
		linkTitle: `${SITE.title} on CodePen`,
		active: false,
	},
	{
		name: "Discord",
		href: "https://github.com/satnaing/astro-paper",
		linkTitle: `${SITE.title} on Discord`,
		active: false,
	},
	{
		name: "GitLab",
		href: "https://github.com/satnaing/astro-paper",
		linkTitle: `${SITE.title} on GitLab`,
		active: false,
	},
	{
		name: "Reddit",
		href: "https://github.com/satnaing/astro-paper",
		linkTitle: `${SITE.title} on Reddit`,
		active: false,
	},
	{
		name: "Skype",
		href: "https://github.com/satnaing/astro-paper",
		linkTitle: `${SITE.title} on Skype`,
		active: false,
	},
	{
		name: "Steam",
		href: "https://github.com/satnaing/astro-paper",
		linkTitle: `${SITE.title} on Steam`,
		active: false,
	},
	{
		name: "Telegram",
		href: "https://github.com/satnaing/astro-paper",
		linkTitle: `${SITE.title} on Telegram`,
		active: false,
	},
	{
		name: "Mastodon",
		href: "https://github.com/satnaing/astro-paper",
		linkTitle: `${SITE.title} on Mastodon`,
		active: false,
	},
];
