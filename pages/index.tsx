import type { NextPage } from 'next';
import type { IFont } from './interfaces';

import { fonts } from '../public/data.json';
import { useStore } from '../lib/store';

const Home: NextPage = () => {

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

	const { content, fontSize } = useStore(s => s);

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
					Test
				</div>

				<div className='p:grid grid-cols:3@lg grid-cols:2@md grid-cols:1 gap:20'>
					{
						(fonts as IFont[]).map(
							(font, index) => {
								loadStylesheet(`https://cdn.jsdelivr.net/npm/${font.package}@4.5/300.css`);

								return <div
									key={index}
									className='b:1 b:gray-5 r:10 px:16 py:24 bg:gray-5:hover cursor:pointer f:black min-h:300'
								>
									<div className='d:flex justify-content:space-between w:100%'>
										<div>
											<p className='f:18'>{font.name}</p>
											<small>{font.by}</small>
										</div>
										<small>
											6 styles
										</small>
									</div>
									<p className='mt:20' style={{ fontSize, fontFamily: font.name }}>
										{content}
									</p>
								</div>
							}
						)
					}
				</div>
			</div>
		</div>
	)
}

export default Home;
