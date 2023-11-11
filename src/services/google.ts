import { load } from 'cheerio';
import {
  S40UA,
  fsLinkPattern,
  googleCustomSearch,
  googleSearchUrl,
} from '../contants';

export class GoogleServices {
  async search(keyword: string, start?: number) {
    const response = await fetch(
      googleSearchUrl(keyword + ' site:www.fshare.vn', 'vi', start),
      {
        headers: {
          'user-agent': S40UA,
        },
      },
    );
    const html = await response.text();
    const $ = load(html);

    const results: object[] = [];

    $('a.ZWRArf').each((_, el) => {
      const htmlTitle = $(el).children('span').html();
      const [link] = $(el).attr('href')!.match(fsLinkPattern)!;

      results.push({ htmlTitle, link: decodeURIComponent(link) });
    });

    return results;
  }

  async customSearch(keyword: string, start?: number) {
    const response = await fetch(googleCustomSearch(keyword, start));
    const { items } = await response.json();

    return items ?? [];
  }
}
