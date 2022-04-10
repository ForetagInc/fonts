import * as React from 'react';

export const useStylesheet = (path: string) => {
	const [stylesheet, setStylesheet] = React.useState('');

	React.useEffect(() => {
		let head = document.head;
		let link = document.createElement('link');

		link.type = 'text/css';
		link.rel = 'stylesheet';
		link.href = path;

		head.appendChild(link);

		return () => { head.removeChild(link); };
	}, [stylesheet]);

	return [stylesheet, setStylesheet];
}