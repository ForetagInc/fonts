import * as React from 'react';
import type { NextPage } from 'next';

import { useStore } from '../lib/store';
import { Cards } from '../components/Cards';
import { Layout } from '../layouts/App';

const Home: NextPage = () => {
	const {
		content,
		updateContent,
		fontSize,
		setFontSize,
		toInitialState
	} = useStore(s => s);

	const [search, setSearch] = React.useState('');

	return (
		<Layout
			title='Browse Fonts'
		>
			<div className='d:flex mb:20 b:1 r:30 b:gray-10 b:gray-60@dark px:8'>
				<div className='flex-grow:0.5 d:flex ai:center br:1 b:gray-10 b:gray-60@dark'>
					<i className='ri-search-line mr:8 f:gray-20' />
					<input
						className='outline:none f:15 py:12'
						type='text'
						placeholder='Search fonts'
						value={search}
						onChange={e => {
							e.preventDefault();
							setSearch(e.target.value);
						}}
					/>
				</div>
				<div className='flex-grow:1 d:flex ai:center px:8 br:1 b:gray-10 b:gray-60@dark'>
					<small className='mr:16 bg:blue-40 f:white px:8 py:2 r:40'>Preview</small>
					<input
						className='outline:none w:100%'
						type='text'
						placeholder='Preview'
						value={content}
						onChange={e => {
							e.preventDefault();
							updateContent(e.target.value);
						}}
					/>
				</div>
				<div className='flex-grow:1 d:flex ai:center px:8 br:1 b:gray-10 b:gray-60@dark'>
					<input
						className='w:100%'
						type='range'
						value={fontSize}
						onChange={(e) => {
							e.preventDefault();
							setFontSize(e.target.value);
						}}
						min={8}
						max={300}
					/>
				</div>
				<div className='d:flex ai:center px:8'>
					<i
						className='ri-restart-line f:blue-40:hover cursor:pointer'
						onClick={() => { toInitialState(); }}
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
