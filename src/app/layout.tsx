import './server/mongo';

import type { Metadata } from "next";

import { Inter } from "next/font/google";

import './globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import SocketInit from './socket';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SWDTImarketplace",
	manifest: "/manifest.json"
};

export default function RootLayout({
  	children,
}: Readonly<{
  	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className + " "}>
				<SocketInit />
				{children}
			</body>
		</html>
	);
}
