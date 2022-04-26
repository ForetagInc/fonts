import { Html, Head, Main, NextScript } from 'next/document';

const Document: React.FC = () => {
	return (
		<Html>
			<Head>
				<link rel='icon' href='/images/logo.svg' type='image/svg+xml' />
				<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "1257ede7809142c5ba20a63eb11d9763"}'></script>
			</Head>
			<body className='f:gray-60 bg:fade-88@dark f:white@dark'>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default Document;