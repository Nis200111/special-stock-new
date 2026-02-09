/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // ... other experimental options
  },
  serverExternalPackages: ['sharp', 'fluent-ffmpeg', 'exiftool-vendored', 'ffmpeg-static'],
};

export default nextConfig;
