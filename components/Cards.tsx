import * as React from 'react';

import type { IFont } from '../lib/interfaces';
import { useStore } from '../lib/store';

import fonts from '../public/data.json';

interface ICards {
	search: string;
}

export const Cards: React.FC<ICards> = ({ search }) => {
	const { content, fontSize } = useStore(s => s);

	// These fonts do not load font weights as fontsource does not support it.
	// Instead these fonts store the CSS as 'latin' directly.
	const customMap = ['molle', 'syne-italic'];

	const fontsPerPage = 12;
	const defaultFonts = fonts.slice(0, fontsPerPage);

	const [lastViewPosition, setLastViewPosition] = React.useState(fontsPerPage);

	const [fontCache, setFontCache] = React.useState<IFont[]>([]);
	const [loadedFonts, setLoadedFonts] = React.useState<IFont[]>(defaultFonts);

	const displayFonts = search ? fontCache : loadedFonts;

	// Search functionality
	React.useEffect(() => {
		if (search.length > 0)
			setFontCache(fonts.filter(({ family }) => family.includes(search)));
	}, [search]);

	React.useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', (e) => {
				// @ts-ignore
				const scrollTop: number = e.target.documentElement.scrollTop;
				// @ts-ignore
				const scrollHeight: number = e.target.documentElement.scrollHeight;

				if (window.innerHeight + scrollTop + 300 >= scrollHeight) {
					setLastViewPosition(current => current + fontsPerPage);
				}
			});
		}
	}, []);

	React.useEffect(() => {
		setLoadedFonts(
			current => [
				...current,
				...fonts.slice(lastViewPosition, lastViewPosition + fontsPerPage)
			]
		);
	}, [lastViewPosition]);

	const loadStylesheet = (url: string) => {
		if (typeof window !== 'undefined') {
			let head = document.head;
			let link = document.createElement('link');

			link.type = 'text/css';
			link.rel = 'stylesheet';
			link.href = url;

			head.appendChild(link);
		}
	}

	return (
		<div className='p:grid grid-cols:3@lg grid-cols:2@md grid-cols:1 gap:20'>
			{
				displayFonts.map(
					(font, index) => {
						let url = customMap.includes(font.id) ? 'latin' : font.weights[0];

						loadStylesheet(`https://cdn.jsdelivr.net/npm/@fontsource/${font.id}@latest/${url}.css`);

						return <div
							key={index}
							className='b:1 b:gray-5 r:10 px:16 py:24 bg:gray-5:hover cursor:pointer f:black min-h:300'
						>
							<div className='d:flex justify-content:space-between w:100%'>
								<div>
									<p className='f:18'>{font.family}</p>
									<small>{font.category}</small>
								</div>
								<small>
									{font.weights.length} styles
								</small>
							</div>
							<p className='mt:20' style={{ fontSize, fontFamily: font.family }}>
								{content}
							</p>
						</div>
					}
				)
			}
		</div>
	)
}