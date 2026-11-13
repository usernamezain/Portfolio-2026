import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()
  );

  return rss({
    title: 'Zain Ali Developer (zainalidev) | Engineering & Vibe Coding Notes',
    description: 'Technical essays, architectural breakdowns, AI engineering, Vibe Coding, and WebGL physics by Zain Ali Mughal.',
    site: context.site || 'https://zaindev.me',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      author: post.data.author,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: `
      <language>en-us</language>
      <copyright>Copyright © ${new Date().getFullYear()} Zain Ali Mughal (zainalidev). All rights reserved.</copyright>
      <managingEditor>me@zaindev.me (Zain Ali Mughal)</managingEditor>
      <webMaster>me@zaindev.me (Zain Ali Mughal)</webMaster>
      <atom:link href="https://zaindev.me/rss.xml" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" />
    `,
  });
}

