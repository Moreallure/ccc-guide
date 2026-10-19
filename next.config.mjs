import { createMDX } from 'fumadocs-mdx/next';
/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 't1.gstatic.com' }],
  },
  async redirects() {
    return [
      { source: '/essentials', destination: '/essentials/introduction/using-this-guide', permanent: false },
      { source: '/junior', destination: '/junior/warm-ups/first-30-marks', permanent: false },
      { source: '/senior-core', destination: '/senior-core/math-geometry/geometry', permanent: false },
      { source: '/senior-advanced', destination: '/senior-advanced/graph-algorithms/dijkstra', permanent: false },
      { source: '/docs', destination: '/essentials/introduction/using-this-guide', permanent: false },
      { source: '/docs/:path*', destination: '/:path*', permanent: false },
    ];
  },
};
const withMDX = createMDX();
export default withMDX(config);
