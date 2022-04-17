import * as React from 'react';

import Head from 'next/head';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import fonts from '../../public/data.json';
import { IFont } from '../../lib/interfaces';

const Font: NextPage = () => {

	const router = useRouter();
	const { font } = router.query;

	const getFont = (name: string): IFont => {
		return fonts.find(({ id }) => id === name) as IFont;
	}

	const [currentFont, setCurrentFont] = React.useState<IFont>();

	React.useEffect(() => {
		if (font)
			setCurrentFont(getFont(font as string));
	}, [font]);

	return (
		<div>
			<Head>
				<title>{currentFont?.family} - Foretag Fonts</title>
			</Head>
			<p>Font: {currentFont?.family}</p>
		</div>
	)
};

export default Font;