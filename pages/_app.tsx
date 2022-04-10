import '../styles/globals.css';
import type { AppProps } from 'next/app';

import '@master/styles';
import * as React from 'react';


const SafeHydrate: React.FC<React.PropsWithChildren<{}>> = (props) => {
	return (
		<div suppressHydrationWarning>
			{typeof window === 'undefined' ? null : props.children}
		</div>
	)
}

function App({ Component, pageProps }: AppProps) {
	return <SafeHydrate>
		<Component {...pageProps} />
	</SafeHydrate>;
}

export default App;
