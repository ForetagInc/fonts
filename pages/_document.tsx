import { Html, Head, Main, NextScript } from 'next/document';

const Document: React.FC = () => {
	return (
		<Html>
			<Head>
				<link rel='icon' href='/images/logo.svg' type='image/svg+xml' />
			</Head>
			<body className='f:gray-60 bg:fade-88@dark f:white@dark'>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default Document;