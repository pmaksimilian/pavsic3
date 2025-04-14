/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports for cPanel hosting
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
