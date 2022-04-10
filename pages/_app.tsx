import '../styles/globals.css';
import type { AppProps } from 'next/app';

import '@master/styles';

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}

export default MyApp
