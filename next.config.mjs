/** @type {import('next').NextConfig} */

import nextPwa from 'next-pwa';

const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'firebasestorage.googleapis.com',
			}
		]
	}
};

const withPWA = nextPwa({
	dest: "public"
});

export default withPWA(nextConfig);
