require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
	siteMetadata: {
		title: `Asasline `,
		description: `Asasline`,
		author: `AsasLine`,
		siteUrl: `https://www.asasline.com`,
	},
	plugins: [
		{
			resolve: `gatsby-plugin-netlify-identity`,
			options: {
				url: `https://asasline.com/`,
			},
		},
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: 'UA-172939946-3',
				head: true,
			},
		},
		{
			resolve: 'gatsby-plugin-verify-bing',
			options: {
				userIds: ['718A0481697A2590287D541CB5AEEF53'],
			},
		},
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		{
			resolve: 'gatsby-plugin-minify-html',
			options: {
				debug: false,
				config: {
					collapseWhitespace: false,
					minifyCSS: false,
					minifyJS: false,
					removeComments: false,
					removeScriptTypeAttributes: false,
					removeStyleLinkTypeAttributes: false,
					sortAttributes: true,
					useShortDoctype: true,
				},
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		`gatsby-plugin-scroll-reveal`,
		`gatsby-plugin-transition-link`,
		`gatsby-plugin-anchor-links`,
		`gatsby-plugin-netlify-cache`,
		"gatsby-plugin-use-query-params",
		`gatsby-plugin-netlify`,
		{
			resolve: 'gatsby-plugin-preconnect',
			options: {
				domains: [
					'https://gstatic.com',
					'https://cloudfront.net',
					'https://ampproject.org',
				],
			},
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `AsasLine`,
				short_name: `starter`,
				description: `AsasLine`,
				start_url: `/`,
				background_color: `#f7af3d`,
				theme_color: `#f7af3d`,
				display: `standalone`,
				icon: `src/images/gatsby-icon.png`,
			},
		},
		{
			resolve: `gatsby-plugin-canonical-urls`,
			options: {
				siteUrl: `https://asasline.com`,
			},
		},
		{
			resolve: 'gatsby-plugin-mailchimp',
			options: {
				endpoint: process.env.MAILCHIMP_ENDPOINT,
			},
		},
		`gatsby-plugin-fontawesome-css`,
		`gatsby-plugin-sitemap`,
		{
			resolve: 'gatsby-plugin-robots-txt',
			options: {
				host: 'https://asasline.com',
				sitemap: 'https://asasline.com/sitemap.xml',
				policy: [{ userAgent: '*', allow: '/' }],
			},
		},
		{
			resolve: `gatsby-source-contentful`,
			options: {
				spaceId: process.env.CONTENTFUL_SPACE_ID,
				accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
				forceFullSync: true,
			},
		},
		{
			resolve: `gatsby-plugin-intl`,
			options: {
				path: `${__dirname}/src/intl`,
				languages: [`en`, `fr`],
				defaultLanguage: `en`,
				redirect: false,
			},
		},
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
}
