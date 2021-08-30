module.exports = {
  experimental: { esmExternals: true },
  reactStrictMode: true,
  images: {
    domains: [
      's3-us-west-2.amazonaws.com',
      's3-us-west-1.amazonaws.com',
      's.gravatar.com',
      'lh3.googleusercontent.com',
      'bucket-opsap-logbook-service-dev.s3.eu-west-1.amazonaws.com'
    ]
  },
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat'
      })
    }

    return config
  }
}
