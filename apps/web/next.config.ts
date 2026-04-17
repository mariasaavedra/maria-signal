import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  transpilePackages: ['@m7/mopidy'],
  output: 'standalone',
  env: { MOPIDY_RPC_URL: "http://audio-os.local:6680/mopidy/rpc" },  
  // Only needed if apps/web imports files from outside apps/web
  // e.g. ../../packages/shared or repo-level files
  outputFileTracingRoot: path.join(__dirname, '../../'),
};

export default nextConfig;