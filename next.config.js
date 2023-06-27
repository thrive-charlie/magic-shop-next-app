/** @type {import('next').NextConfig} */
const nextConfig = {
	trailingSlash: false,
	images: {
		domains: ["localhost"],
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "8000",
			},
		],
	},
};

module.exports = nextConfig;
