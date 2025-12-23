const { withExpo } = require('@expo/next-adapter')
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reanimated (and thus, Moti) doesn't work with strict mode currently...
  // https://github.com/nandorojo/moti/issues/224
  // https://github.com/necolas/react-native-web/pull/2330
  // https://github.com/nandorojo/moti/issues/224
  // once that gets fixed, set this back to true
  reactStrictMode: true,
  transpilePackages: [
    'expo-router',
    'react-native',
    'react-native-web',
    'solito',
    'app',
    'react-native-svg',
    'nativewind',
    'react-native-gesture-handler',
    'react-native-css-interop',
    'lucide-react-native',
    'clsx',
    'tailwind-merge',
    'class-variance-authority',
    '@tanstack/react-query'
  ],
  webpack: (config) => {
    // Force singleton instances across monorepo to prevent Context mismatch
    config.resolve.alias = {
      ...config.resolve.alias,
      'react': path.dirname(require.resolve('react/package.json')),
      '@tanstack/react-query': path.dirname(require.resolve('@tanstack/react-query/package.json'))
    }
    return config
  }
}

module.exports = withExpo(nextConfig)
