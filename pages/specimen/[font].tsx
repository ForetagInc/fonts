import * as React from 'react';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import fonts from '../../public/data.json';
import { IFont } from '../../lib/interfaces';

import { Layout } from '../../layouts/App';
import { useStore } from '../../lib/store';

const Font: NextPage = () => {

	const { content } = useStore(s => s);

	const router = useRouter();
	const { font } = router.query;

	const getFont = (name: string): IFont => {
		return fonts.find(({ family }) => family === name) as IFont;
	}

	const [currentFont, setCurrentFont] = React.useState<IFont>();

	React.useEffect(() => {
		if (font)
			setCurrentFont(getFont(font as string));
	}, [font]);

	return (
		<Layout
			title={currentFont?.family as string}
		>
			<h1>{currentFont?.family}</h1>

			<ul>
				{
					currentFont?.weights.map(
						(weight, index) => <li>{content}</li>
					)
				}
			</ul>
		</Layout>
	)
};

export default Font;