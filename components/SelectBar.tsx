import Link from 'next/link';
import * as React from 'react';
import { useStore } from '../lib/store';

export const SelectBar: React.FC = () => {

	const {
		selectedFonts
	} = useStore(s => s);

	return (
		<div className='~all;100ms;ease-in w:400 bg:gray-85'>
			<div className='py:24.5 bb:1 b:gray-10 b:gray-60@dark px:24'>
				<p>Selected families</p>
			</div>
			<div className='p:24'>
				<ul>
					{
						selectedFonts.map((font, index) => (
							<Link
								key={index}
								href={`speciment/${font.family}`}
							>
								<li>
									{font.family}
								</li>
							</Link>
						))
					}
				</ul>
			</div>
		</div>
	)
}