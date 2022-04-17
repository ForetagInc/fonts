export const loadStylesheet = (url: string) => {
	if (typeof window !== 'undefined') {
		let head = document.head;
		let link = document.createElement('link');

		link.type = 'text/css';
		link.rel = 'stylesheet';
		link.href = url;

		head.appendChild(link);
	}
}