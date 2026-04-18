# Deployment

## Overview

Two types:

1. Base machine
2. App updates

## Base Deployment

```bash
bash infra/package-base-artifact.sh
scp dist/audio-os-base-<version>.tar.gz audio@audio-os:~

ssh audio@audio-os
tar -xzf audio-os-base-<version>.tar.gz
cd audio-os-base-<version>
sudo ./install.sh
```

## App Deployment

```bash
npm run build
tar -czf app.tar.gz .next/standalone .next/static public
scp app.tar.gz audio@audio-os:~
```

```bash
ssh audio@audio-os
mkdir -p ~/app/releases/<version>
tar -xzf app.tar.gz -C ~/app/releases/<version>
ln -sfn ~/app/releases/<version> ~/app/current
systemctl restart app
```

## Principle

Infra is stable. App moves fast.
