import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const targetURL = request.query.url as string;

  if (!targetURL) {
    return response.status(400).json({ error: 'URL parameter is missing' });
  }

  try {
    const res = await axios.get(targetURL);
    const html = res.data;
    const $ = cheerio.load(html);

    const title = $('meta[property="og:title"]').attr('content');
    const image = $('meta[property="og:image"]').attr('content');
    const description = $('meta[property="og:description"]').attr('content');

    return response.status(200).json({
      title,
      image,
      description,
    });
  } catch (error) {
    return response.status(500).json({ error: 'Failed to fetch OG data' });
  }
}
