import { createMDX } from 'fumadocs-mdx/next';
/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/craft', destination: '/craft/orientation/intro-ccc', permanent: false },
      { source: '/junior', destination: '/junior/warm-ups/junior-warmups', permanent: false },
      { source: '/senior-core', destination: '/senior-core/s1-toolkit/s1-geometry', permanent: false },
      { source: '/senior-advanced', destination: '/senior-advanced/graph-algorithms/graph-representation-senior', permanent: false },
      { source: '/advanced', destination: '/advanced/segtree-lazy', permanent: false },
      { source: '/docs', destination: '/craft/orientation/intro-ccc', permanent: false },
      { source: '/docs/:path*', destination: '/:path*', permanent: false },
    ];
  },
};
const withMDX = createMDX();
export default withMDX(config);
