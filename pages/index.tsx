import * as React from 'react';

import Head from 'next/head';
import type { NextPage } from 'next';

import { useStore } from '../lib/store';
import { Cards } from '../components/Cards';
import { Layout } from '../layouts/App';

const Home: NextPage = () => {
	const {
		toggleTheme,
		fontSize,
		content,
		updateContent
	} = useStore(s => s);

	const [search, setSearch] = React.useState('');

	return (
		<Layout
			title='Browser Fonts'
		>
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
		</Layout>
	)
}

export default Home;
