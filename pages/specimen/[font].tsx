import * as React from 'react';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import fonts from '../../public/data.json';
import { IFont } from '../../lib/interfaces';
import { glyphs } from '../../lib/glyphs';

const Layout = dynamic(() => import('../../layouts/App'), { ssr: false });

import { useStore } from '../../lib/store';
import { loadStylesheet } from '../../lib/util';

const Font: NextPage = () => {
	// These fonts do not load font weights as fontsource does not support it.
	// Instead these fonts store the CSS as 'latin' directly.
	const customMap = ['molle', 'syne-italic'];

	const { content, updateContent, fontSize } = useStore(s => s);

	const router = useRouter();
	const { font } = router.query;

	const getFont = (name: string): IFont => {
		return fonts.find(({ family }) => family === name) as IFont;
	}

	const [currentFont, setCurrentFont] = React.useState<IFont>();

	const fontMap = {
		100: 'Thin',
		300: 'Light',
		400: 'Regular',
		500: 'Medium',
		700: 'Bold',
		900: 'Black'
	};

	React.useEffect(() => {
		if (font)
			setCurrentFont(getFont(font as string));
	}, [font]);

	React.useEffect(() => {
		if (currentFont) {
			currentFont?.weights.forEach(weight => {
				let url = customMap.includes(currentFont?.id as string) ? 'latin' : weight;
				loadStylesheet(`https://cdn.jsdelivr.net/npm/@fontsource/${currentFont?.id}@latest/${url}.css`);
			});
		}
	}, [currentFont]);

	return (
		<Layout
			title={currentFont?.family as string}
		>
			<div className='d:flex ji:space-between ai:center'>
				<h1 className='f:36'>{currentFont?.family}</h1>
				<div />
			</div>

			<div className='my:40 p:8 bg:gray-80 r:10'>
				<code>
					{`<link 
						rel='stylesheet' 
						href='https://cdn.jsdelivr.net/npm/@fontsource/${currentFont?.id}@latest/latin.min.css' 
					/>`}
				</code>
			</div>

			<ul>
				{
					currentFont?.weights.map(
						(weight, index) =>
							<li
								key={index}
								className='bb:1 b:gray-80 py:40'
							>
								<p className='mb:20 f:gray-60'>
									{
										// @ts-ignore
										fontMap[weight]
									} {weight}
								</p>
								<input
									style={{
										fontSize,
										fontFamily: currentFont?.family,
										fontWeight: weight
									}}
									className='min-w:100%'
									value={content}
									onChange={e => {
										e.preventDefault();
										updateContent(e.target.value);
									}}
								/>
							</li>
					)
				}
			</ul>

			<div className='mt:32'>
				<h2 className='f:light f:32'>Sample glyphs</h2>
				<div className='d:grid grid-cols:30 mt:20'>
					{
						glyphs.map((glyph, index) =>
							<p
								key={index}
								className='b:1 b:gray-70 text:center p:8 f:20 f:medium'
								style={{
									fontFamily: currentFont?.family,
								}}
							>
								{glyph}
							</p>
						)
					}
				</div>
			</div>
		</Layout>
	)
};

export default Font;