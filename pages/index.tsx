import * as React from 'react';

import type { NextPage } from 'next';
import type { IFont } from './interfaces';

import * as fonts from '../public/data.json';
import { useStore } from '../lib/store';

import InfiniteScroll from 'react-infinite-scroller';

const Home: NextPage = () => {
	const customMap = ['molle', 'syne-italic'];

	const fontsPerPage = 12;
	const [lastViewPosition, setLastViewPosition] = React.useState(0);
	const [loadedFonts, setLoadedFonts] = React.useState<IFont[]>();

	const { content, updateContent, fontSize } = useStore(s => s);

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

	const loadFonts = (page: number) => {
		// @ts-ignore
		setLoadedFonts(current => {
			return [
				...current,
				fonts.slice(lastViewPosition, lastViewPosition + fontsPerPage)
			]
		});

		setLastViewPosition(current => current + fontsPerPage);
	}

	return (
		<div className='h:100vh f:gray-60 bg:gray-80@dark f:white@dark'>
			<div className='py:16 bb:1 b:gray-10 b:gray-50@dark'>
				<div className='d:flex mx:auto w:80% justify-content:space-between align-items:center'>
					<h1 className='f:24 f:regular'>
						Fonts
					</h1>

					<p>Test</p>
				</div>
			</div>

			<div className='mx:auto w:80% py:24'>
				<div className='mb:20'>
					<input
						type='text'
						value={content}
						onChange={e => {
							e.preventDefault();
							updateContent(e.target.value);
						}}
					/>
				</div>

				<div className='p:grid grid-cols:3@lg grid-cols:2@md grid-cols:1 gap:20'>
					<InfiniteScroll
						pageStart={0}
						useWindow={false}
						// loadMore={loadFonts(0)}
						hasMore={lastViewPosition < fonts.length}
					>
						{
							(fonts as unknown as IFont[]).map(
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
					</InfiniteScroll>
				</div>
			</div>
		</div>
	)
}

export default Home;
