import type { APIContext } from 'astro';
import rss from '@astrojs/rss';
import { SITE_TITLE } from '../../consts';
import { blogUi, localePath, localePaths, postUrl, publishedPosts, type BlogLang } from '../../lib/blog';

export const getStaticPaths = localePaths;

export async function GET({ props, site }: APIContext<{ lang: BlogLang }>) {
	const { lang } = props;
	const posts = await publishedPosts(lang);
	return rss({
		title: SITE_TITLE,
		description: blogUi[lang].description,
		site: new URL(localePath(lang, '/'), site),
		customData: `<language>${lang}</language>`,
		items: posts.map(post => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: postUrl(lang, post),
		})),
	});
}
