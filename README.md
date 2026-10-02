# React Profile Card on AWS EC2 (CloudFormation + GitHub Actions)

A React student profile card, hosted on an EC2 instance running nginx. CloudFormation creates the instance and GitHub Actions builds and deploys the site on every push.

## How it works

```
push to main
   │
   ├─ build job ─────  validate profile.json → npm ci → npm run build → dist/
   │
   └─ deploy job ────  CloudFormation deploy (EC2 + nginx, created once)
                       → get SSH key from SSM → copy dist/ to EC2 → check site is live
```

A change to your profile only replaces the site files. The EC2 instance and its IP stay the same.

## Repository layout

```
.
├── .github/workflows/
│   └── deploy.yml           # build + deploy (push to main or manual)
├── infra/
│   └── ec2-instance.yaml    # CloudFormation: key pair, security group, EC2 with nginx
├── src/
│   ├── data/profile.json    # ← your details go here
│   ├── components/          # React components
│   ├── App.jsx
│   └── styles.css
├── public/
│   └── profile.png          # ← your photo goes here
├── scripts/
│   └── validate-profile.mjs # checks profile.json before the build
└── docs/
    ├── 01-setup-github-secrets.md
    ├── 02-customize-your-profile.md
    └── 03-deploy-and-connect.md
```

## What gets created in AWS

- An EC2 key pair (created by CloudFormation; private key stored in SSM Parameter Store)
- A security group allowing SSH (22) and HTTP (80)
- One Amazon Linux 2023 EC2 instance (default `t2.micro`) with nginx installed by UserData

## Quick start

1. Fork this repository.
2. [docs/01-setup-github-secrets.md](docs/01-setup-github-secrets.md): add your AWS keys as GitHub secrets.
3. [docs/02-customize-your-profile.md](docs/02-customize-your-profile.md): put in your details and photo, then push.
4. [docs/03-deploy-and-connect.md](docs/03-deploy-and-connect.md): open your site, SSH in, and fix common problems.

## Run locally (optional)

Requires Node.js 20.19 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
npm run validate   # check profile.json
npm run build      # production build in dist/
```

## Configuration

Defaults live in the `env` block of [.github/workflows/deploy.yml](.github/workflows/deploy.yml) (`AWS_REGION`, `STACK_NAME`). Template parameters (`InstanceType`, `SSHLocation`) are in [infra/ec2-instance.yaml](infra/ec2-instance.yaml).

## Notes

- Never commit credentials or `.pem` files; `.gitignore` excludes the latter.
- SSH (port 22) is open to `0.0.0.0/0` because GitHub-hosted runners don't have fixed IPs. That's fine for a sandbox, but in production you'd restrict it or use a different deploy method.
