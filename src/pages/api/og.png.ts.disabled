import type { APIRoute } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

export const prerender = false;

// Cache for font and background image
let interBold: ArrayBuffer | null = null;
let backgroundBase64: string | null = null;

async function loadFont(siteUrl: string): Promise<ArrayBuffer> {
	if (interBold) return interBold;

	// Satori requires TTF/OTF format (not WOFF/WOFF2)
	const fontResponse = await fetch(`${siteUrl}/inter-bold.ttf`);
	if (!fontResponse.ok) {
		throw new Error(`Font fetch failed: ${fontResponse.status}`);
	}
	interBold = await fontResponse.arrayBuffer();
	return interBold;
}

async function loadBackgroundImage(siteUrl: string): Promise<string> {
	if (backgroundBase64) return backgroundBase64;

	try {
		const response = await fetch(`${siteUrl}/og-background.png`);
		const arrayBuffer = await response.arrayBuffer();
		const base64 = Buffer.from(arrayBuffer).toString('base64');
		backgroundBase64 = `data:image/png;base64,${base64}`;
		return backgroundBase64;
	} catch (error) {
		console.error('Failed to load background image:', error);
		return '';
	}
}

export const GET: APIRoute = async ({ request }) => {
	const url = new URL(request.url);
	const title = url.searchParams.get('title') || 'GashiStudios';
	const subtitle = url.searchParams.get('subtitle') || 'Documentation';

	// Use request origin for both local dev and production
	const siteUrl = url.origin;
	const [fontData, bgImage] = await Promise.all([
		loadFont(siteUrl),
		loadBackgroundImage(siteUrl),
	]);

	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					width: '100%',
					height: '100%',
					display: 'flex',
					position: 'relative',
				},
				children: [
					// Background image
					bgImage ? {
						type: 'img',
						props: {
							src: bgImage,
							style: {
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								objectFit: 'cover',
							},
						},
					} : {
						// Fallback gradient if image fails to load
						type: 'div',
						props: {
							style: {
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								background: 'linear-gradient(135deg, #1a0a2e 0%, #16082a 30%, #0d0618 70%, #0a0412 100%)',
							},
						},
					},
					// Content overlay - positioned on the right side
					{
						type: 'div',
						props: {
							style: {
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								padding: '60px 80px',
							},
							children: [
								// Title - positioned on the right
								{
									type: 'div',
									props: {
										style: {
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'flex-end',
											textAlign: 'right',
											gap: '16px',
										},
										children: [
											// Main title
											{
												type: 'div',
												props: {
													style: {
														fontSize: title.length > 25 ? '52px' : title.length > 18 ? '60px' : '72px',
														fontWeight: 700,
														color: 'white',
														lineHeight: 1.1,
														letterSpacing: '-2px',
														maxWidth: '700px',
														textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
													},
													children: title,
												},
											},
											// Subtitle
											{
												type: 'div',
												props: {
													style: {
														fontSize: '26px',
														fontWeight: 500,
														color: 'rgba(196, 181, 253, 0.95)',
														letterSpacing: '-0.5px',
														maxWidth: '600px',
														textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
													},
													children: subtitle,
												},
											},
										],
									},
								},
							],
						},
					},
					// Bottom right - site URL
					{
						type: 'div',
						props: {
							style: {
								position: 'absolute',
								bottom: '40px',
								right: '60px',
								display: 'flex',
								alignItems: 'center',
								gap: '12px',
							},
							children: [
								{
									type: 'span',
									props: {
										style: {
											fontSize: '20px',
											fontWeight: 600,
											color: 'rgba(255, 255, 255, 0.7)',
											textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
										},
										children: 'gashistudios.site',
									},
								},
							],
						},
					},
				],
			},
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: 'Inter',
					data: fontData,
					weight: 700,
					style: 'normal',
				},
			],
		}
	);

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: 1200,
		},
	});

	const pngData = resvg.render();
	const pngBuffer = pngData.asPng();

	return new Response(pngBuffer, {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	});
};
