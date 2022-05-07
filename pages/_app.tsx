import '../styles/globals.css';
import 'remixicon/fonts/remixicon.css';

import type { AppProps } from 'next/app';

import '@master/styles';

import * as React from 'react';

function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}

export default App;
