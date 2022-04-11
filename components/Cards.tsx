import * as React from 'react';

import type { IFont } from '../lib/interfaces';
import { useStore } from '../lib/store';

import fonts from '../public/data.json';

export const Cards: React.FC = () => {
	const { content, fontSize } = useStore(s => s);

	const customMap = ['molle', 'syne-italic'];

	const fontsPerPage = 12;
	const [lastViewPosition, setLastViewPosition] = React.useState(fontsPerPage);
	const [loadedFonts, setLoadedFonts] = React.useState<IFont[]>(fonts.slice(0, fontsPerPage));

	React.useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', (e) => {
				// @ts-ignore
				const scrollTop: number = e.target.documentElement.scrollTop;
				// @ts-ignore
				const scrollHeight: number = e.target.documentElement.scrollHeight;

				if (window.innerHeight + scrollTop + 1 >= scrollHeight) {
					setLoadedFonts(
						current => {
							return current.concat(fonts.slice(lastViewPosition, lastViewPosition + fontsPerPage));
						});

					setLastViewPosition(current => current + fontsPerPage);
				}
			});
		}
	});

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
				loadedFonts.map(
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