/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // ... other experimental options
  },
  serverExternalPackages: ['sharp', 'fluent-ffmpeg', 'exiftool-vendored', 'ffmpeg-static'],
  turbopack: {
    root: 'e:/special-stock-01'
  }
};

export default nextConfig;
