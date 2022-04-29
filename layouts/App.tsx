import * as React from 'react';

import Head from 'next/head';

import { useStore } from '../lib/store';
import { SelectBar } from '../components/SelectBar';
import Link from 'next/link';

interface ILayoutProps {
	title: string;
}

export const Layout: React.FC<ILayoutProps> = (props) => {
	const {
		isDark,
		isSelectBarOpen,
		toggleTheme,
		toggleSelectBar
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

				<link rel='canonical' href={window?.location.href} />

				<meta name='robots' content='index, follow' />

				<meta name='description' content='An open source, production ready and privacy-friendly fonts repository based on public CDN providers' />
				<meta name='keywords' content='fonts, open, source, cdn, repository, privacy, production, public, free' />
				<meta name='publisher' content='Foretag Inc.' />

				<meta property='og:title' content={`${props.title} - Foretag Fonts`} />
				<meta property='og:description' content='An open source, production ready and privacy-friendly fonts repository based on public CDN providers' />
				<meta property='og:type' content='website' />
			</Head>
			<div className='d:flex'>
				<div className='h:100vh w:100%'>
					<div className='py:16 bb:1 b:gray-10 b:gray-60@dark'>
						<div className={`d:flex ${isSelectBarOpen ? 'ml:40 mr:24' : 'mx:auto w:80%'} justify-content:space-between align-items:center`}>
							<Link href='/'>
								<h1 className='d:flex align-items:center f:24 f:regular cursor:pointer'>
									<img
										className='h:36 mr:8'
										src={`${window?.location.origin}/images/logo.svg`}
										alt='Foretag Logo'
									/>
									Fonts
								</h1>
							</Link>

							<div>
								<i
									className='ri-contrast-fill f:20 f:blue-40:hover cursor:pointer'
									onClick={() => toggleTheme()}
								/>
								<i
									className='ml:24 ri-list-check-2 f:20 f:blue-40:hover cursor:pointer'
									onClick={() => toggleSelectBar()}
								/>
							</div>
						</div>
					</div>
					<div className={isSelectBarOpen ? 'ml:40 mr:24 py:24' : 'mx:auto w:80% py:24'}>
						{props.children}
					</div>
				</div>
				{
					isSelectBarOpen && <SelectBar />
				}
			</div>
		</>

	)
}