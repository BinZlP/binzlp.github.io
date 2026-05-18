// Global site metadata.
export const SITE_TITLE = 'BinZIP tech blog';
export const SITE_DESCRIPTION = 'Systems, AI, and software engineering notes by BinZIP.';

export const CATEGORY_LABELS = {
	systems: 'Systems',
	ai: 'AI',
	'it-news': 'IT News',
	etc: 'Etc',
} as const;

export type Category = keyof typeof CATEGORY_LABELS;
