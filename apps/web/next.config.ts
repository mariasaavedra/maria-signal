import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@m7/mopidy'],
  output: 'standalone',
  env: { MOPIDY_RPC_URL: "http://audio-os.local:6680/mopidy/rpc" }
};

export default nextConfig;