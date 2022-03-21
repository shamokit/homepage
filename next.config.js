/**
 * @type { import("next").NextConfig}
 */
module.exports = {
	reactStrictMode: true,
	trailingSlash: true,
	swcMinify: true,
	experimental: {
		styledComponents: true,
		cpus: 4,
		esmExternals: true,
		swcLoader: true,
	},
	images: {
    domains: ['cover.openbd.jp'],
  },
}
