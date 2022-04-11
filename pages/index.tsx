import * as React from 'react';

import type { NextPage } from 'next';

import { useStore } from '../lib/store';
import { Cards } from '../components/Cards';

const Home: NextPage = () => {
	const { content, updateContent } = useStore(s => s);

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
				<Cards />
			</div>
		</div>
	)
}

export default Home;
