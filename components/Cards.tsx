import * as React from 'react';

import Link from 'next/link';

import type { IFont } from '../lib/interfaces';
import { useStore } from '../lib/store';

import fonts from '../public/data.json';
import { loadStylesheet } from '../lib/util';

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
		else
			setFontCache([]);
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

	// Load fonts when the lastViewPosition changes
	React.useEffect(() => {
		setLoadedFonts(
			current => [
				...current,
				...fonts.slice(lastViewPosition, lastViewPosition + fontsPerPage)
			]
		);
	}, [lastViewPosition]);

	return (
		<div className='p:grid grid-cols:3@lg grid-cols:2@md grid-cols:1 gap:20'>
			{
				displayFonts.map(
					(font, index) => {
						let url = customMap.includes(font.id) ? 'latin' : font.weights[0];

						loadStylesheet(`https://cdn.jsdelivr.net/npm/@fontsource/${font.id}@latest/${url}.css`);

						return <Link
							key={index}
							href={`/specimen/${font.family}`}
						>
							<div
								className='b:1 b:gray-7 b:gray-60@dark r:10 px:16 py:24 bg:fade-5:hover bg:fade-90:hover@dark cursor:pointer f:black f:white@dark min-h:300 break-word'
							>
								<div className='d:flex justify-content:space-between w:100%'>
									<div>
										<p className='f:18'>{font.family}</p>
										<small className='f:gray-60@dark text-transform:capitalize'>{font.category.replace('-', ' ')}</small>
									</div>
									<small>
										{font.weights.length} styles
									</small>
								</div>
								<p className='mt:20' style={{ fontSize, fontFamily: font.family }}>
									{content}
								</p>
							</div>
						</Link>
					}
				)
			}
		</div>
	)
}