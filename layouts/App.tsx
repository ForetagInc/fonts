import * as React from 'react';

import Head from 'next/head';

import { useStore } from '../lib/store';

interface ILayoutProps {
	title: string;
}

export const Layout: React.FC<ILayoutProps> = (props) => {
	const {
		isDark
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
		<div className='mx:auto w:80% py:24'>
			<Head>
				<title>{props.title} - Foretag Fonts</title>
			</Head>
			{props.children}
		</div>
	)
}