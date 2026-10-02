# 01 - Set up GitHub secrets

The workflow authenticates to AWS with two repository secrets. No key pair secret is needed; CloudFormation creates the key pair.

## 1. Fork the repository

Click **Fork** at the top of the repository page. You will make all changes in your fork.

## 2. Get the keys from the AWS Academy sandbox

1. Open your AWS Academy course and start the sandbox.
2. Open the credentials panel for the sandbox.
3. Copy the **Access Key ID** (starts with `AKIA`, no `/`).
4. Copy the **Secret Access Key**.

> Don't swap the two values or add spaces or newlines when pasting. Either mistake makes the workflow fail with a signature error.

## 3. Add them to GitHub

In your fork, go to **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.

| Secret name             | Value                      |
| ----------------------- | -------------------------- |
| `AWS_ACCESS_KEY_ID`     | Your AWS Access Key ID     |
| `AWS_SECRET_ACCESS_KEY` | Your AWS Secret Access Key |

## 4. Enable Actions in your fork

GitHub disables workflows in new forks. Open the **Actions** tab and click **I understand my workflows, go ahead and enable them**.

## 5. Check the region

The workflow uses `us-east-1`. If your sandbox uses another region, change `AWS_REGION` in [.github/workflows/deploy.yml](../.github/workflows/deploy.yml).

## Troubleshooting

- **SignatureDoesNotMatch / InvalidClientTokenId**: the keys were swapped, have stray whitespace, or are no longer valid. Copy them again and update both secrets.
- If your sandbox gives you new keys each time it starts, update both secrets before you push.

Next: [02 - Customize your profile](02-customize-your-profile.md)
