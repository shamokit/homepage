import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllPosts } from '@/lib/api'
type Response = {
  cat: string
}
export default (req: NextApiRequest, res: NextApiResponse) => {
	if (req.query['cat']) {
		let allPosts = getAllPosts(
			['title', 'date', 'slug', 'tags'],
			req.query['cat']
		)
		res.statusCode = 200
		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(allPosts))
		return
	}
	res.statusCode = 400;
	res.statusMessage = 'Bad Request';
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({}));
}
