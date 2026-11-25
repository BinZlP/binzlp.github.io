import { getCollection, type CollectionEntry } from 'astro:content';
import { CATEGORY_LABELS } from '../consts';

export const blogLanguages = ['ko', 'en'] as const;
export type BlogLang = (typeof blogLanguages)[number];
export type Post = CollectionEntry<'blog'>;

export const blogUi = {
	ko: {
		description: '시스템, AI, 개발 생산성과 IT 흐름을 기록하는 BinZIP의 기술 블로그입니다.',
		blog: '글 목록', categories: '카테고리', tags: '태그', about: '소개', latest: '최근 글',
		read: '글 읽기', topics: '시스템 · AI · 소프트웨어 엔지니어링',
		intro: '기술 메모와 시스템 설계, AI, IT 소식을 모았습니다.',
		category: { systems: '시스템', ai: 'AI', 'it-news': 'IT 소식', etc: '기타' },
		empty: '아직 이 카테고리에 올라온 글이 없습니다.',
	},
	en: {
		description: 'BinZIP’s notes on systems, AI, developer productivity, and the software industry.',
		blog: 'Blog', categories: 'Categories', tags: 'Tags', about: 'About', latest: 'Latest posts',
		read: 'Read posts', topics: 'Systems · AI · Software Engineering',
		intro: 'Engineering notes on system design, AI, and the software industry.',
		category: CATEGORY_LABELS,
		empty: 'There are no posts in this category yet.',
	},
} as const;

export function otherLang(lang: BlogLang): BlogLang {
	return lang === 'ko' ? 'en' : 'ko';
}

export function localePath(lang: BlogLang, path: string): string {
	const unprefixed = path.replace(/^\/en(?=\/|$)/, '') || '/';
	return lang === 'en' ? '/en' + unprefixed : unprefixed;
}

export function localeParams(lang: BlogLang) {
	return { locale: lang === 'en' ? 'en' : undefined };
}

export function localePaths() {
	return blogLanguages.map(lang => ({ params: localeParams(lang), props: { lang } }));
}

// A translation has the same collection ID as its original, prefixed with en/.
export function postSlug(post: Post) {
	return post.id.replace(/^en\//, '');
}

export function postUrl(lang: BlogLang, post: Post) {
	return localePath(lang, `/blog/${postSlug(post)}/`);
}

export async function publishedPosts(lang: BlogLang) {
	const posts = await getCollection('blog', post =>
		!post.data.draft && post.id.startsWith('en/') === (lang === 'en')
	);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf() || a.id.localeCompare(b.id));
}

export async function articlePaths(lang: BlogLang) {
	const [posts, translations] = await Promise.all([publishedPosts(lang), publishedPosts(otherLang(lang))]);
	const translated = new Set(translations.map(postSlug));
	return posts.map(post => ({
		params: { slug: postSlug(post) },
		props: { post, lang, alternatePath: translated.has(postSlug(post)) ? postUrl(otherLang(lang), post) : null },
	}));
}
