import { Html, Head, Main, NextScript } from 'next/document';

const Document: React.FC = () => {
	return (
		<Html>
			<Head />
			<body className='f:gray-60 bg:fade-88@dark f:white@dark'>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default Document;