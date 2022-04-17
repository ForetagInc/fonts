import * as React from 'react';

import Head from 'next/head';

import { useStore } from '../lib/store';

interface ILayoutProps {
	title: string;
}

export const Layout: React.FC<ILayoutProps> = (props) => {
	const {
		isDark,
		toggleTheme
	} = useStore(s => s);

	// Theme selector
	React.useEffect(() => {
		let html = document.querySelector('html')?.classList;

		if (isDark)
			html?.add('dark');
		else
			html?.remove('dark');
	}, [isDark]);

	return (
		<>
			<Head>
				<title>{props.title} - Foretag Fonts</title>
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

				{props.children}
			</div>
		</>

	)
}