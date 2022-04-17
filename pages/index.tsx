import * as React from 'react';

import Head from 'next/head';
import type { NextPage } from 'next';

import { useStore } from '../lib/store';
import { Cards } from '../components/Cards';

const Home: NextPage = () => {
	const {
		isDark,
		toggleTheme,
		fontSize,
		content,
		updateContent
	} = useStore(s => s);

	// Theme selector
	React.useEffect(() => {
		let html = document.querySelector('html')?.classList;

		if (isDark)
			html?.add('dark');
		else
			html?.remove('dark');
	}, [isDark]);

	const [search, setSearch] = React.useState('');

	return (
		<div className='h:100vh'>
			<Head>
				<title>Browser Fonts - Foretag Fonts</title>
			</Head>
			<div className='py:16 bb:1 b:gray-10 b:gray-60@dark'>
				<div className='d:flex mx:auto w:80% justify-content:space-between align-items:center'>
					<h1 className='f:24 f:regular'>
						Fonts
					</h1>

					<i
						className='ri-contrast-fill f:20 f:blue-40:hover cursor:pointer'
						onClick={() => toggleTheme()}
					/>
				</div>
			</div>

			<div className='mx:auto w:80% py:24'>
				<div className='d:flex mb:20 b:1 r:30 b:gray-10 b:gray-60@dark px:8'>
					<div className='d:flex align-items:center br:1 b:gray-10 b:gray-60@dark min-w:300'>
						<i className='ri-search-line mr:8 f:gray-20' />
						<input
							className='outline:none f:15 w:100% py:12'
							type='text'
							placeholder='Search fonts'
							value={search}
							onChange={e => {
								e.preventDefault();
								setSearch(e.target.value);
							}}
						/>
					</div>
					<div className='d:flex align-items:center px:8 br:1 b:gray-10 b:gray-60@dark min-w:500'>
						<small className='mr:16 bg:blue-40 f:white px:8 py:2 r:40'>Preview</small>
						<input
							className='outline:none'
							type='text'
							placeholder='Preview'
							value={content}
							onChange={e => {
								e.preventDefault();
								updateContent(e.target.value);
							}}
						/>
					</div>
				</div>
				<Cards
					search={search}
				/>
			</div>
		</div>
	)
}

export default Home;
