/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['openweathermap.org'],
      },
    typescript:{
        ignoreBuildErrors:true,
    },
    eslint:{
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
