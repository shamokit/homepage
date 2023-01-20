import satori from 'satori';
import { html } from 'satori-html';
import sharp from 'sharp'
const width = 1200;
const height = 630;
function chunk(str: string, size: number) {
	const numChunks = Math.ceil(str.length / size);
	const chunks = new Array(numChunks);
	for (let i = 0, x = 0; i < numChunks; ++i, x += size) {
		chunks[i] = str.substr(x, size);
	}
	return chunks;
}
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }: { url: URL }) => {
	const font = await fetch("https://shamokit.com/ZenKakuGothicNew-Regular.ttf").then((resp) => resp.arrayBuffer());

	const message = url.searchParams.get('message') ?? 'しゃもきっとブログ';
	const chunkMessage = chunk(message, 13)
	const chunkMessageWithBr = chunkMessage.join('\n')
	const markup = html`
		<div
			style="position: relative; display: flex; text-align: center; align-items: center; justify-content: center; box-sizing: border-box; width: 1200px; height: 630px; padding: 80px; background: #0B445A; color: #fff; "
		>
			<div style="position: absolute; top: 30px; left: 30px; display: flex; align-items: center;">
				<div
					style="display: flex; width: 60px; height: 60px; margin-right: 20px; background: #fff; padding: 10px; border-radius: 999px;"
				>
					<img
						src="https://shamokit.com/favicon.png"
						style="display: flex; width: 100%; max-width: 100%; height: 100%;"
					/>
				</div>
				<p style="font-size: 22px;">しゃもきっとブログ</p>
			</div>
			<p style="font-size: 60px; word-break: break-all; white-space: pre-wrap;">${chunkMessageWithBr}</p>
			<p style="position: absolute; bottom: 16px; right: 30px; font-size: 28px;">@shamokit</p>
		</div>
	`;
	const svg = await satori(markup, {
		fonts: [
			{
				name: 'Zen Kaku Gothic New',
				data: font,
				style: 'normal'
			}
		],
		height,
		width
	});

	const image = await sharp(Buffer.from(svg)).png().toBuffer()

	return new Response(image, {
		headers: {
			'content-type': 'image/png'
		}
	});
};
