# 03 - Deploy and connect

Prerequisite: [02 - Customize your profile](02-customize-your-profile.md).

## Deploy

The **Deploy React site to EC2** workflow runs automatically on pushes to `main` that change the site (`src/`, `public/`, `index.html`, ...), the template, or the workflow itself. To run it manually:

1. Go to the **Actions** tab → **Deploy React site to EC2** → **Run workflow**.
2. Optionally pick an instance type.

What the workflow does:

| Job | Step | What happens |
| --- | --- | --- |
| build | Validate profile.json | Checks your JSON and photo name |
| build | Install dependencies, Build | `npm ci` and `npm run build` create `dist/` |
| deploy | Deploy stack | Creates the stack `react-profile-stack` the first time; afterwards only updates it if the template changed |
| deploy | Find instance and current public IP | Starts the instance if it was stopped and reads its current IP |
| deploy | Get SSH key from SSM | Downloads the private key CloudFormation created |
| deploy | Wait for SSH and first-boot setup | Waits until the instance accepts SSH and UserData has installed nginx |
| deploy | Copy site to EC2 | Copies `dist/` into `/usr/share/nginx/html` over SCP |
| deploy | Check the site is live | Fetches the page to make sure nginx serves it |

## Open your site

The run summary page starts with **Live at http://&lt;ip&gt;**. Click it.

The footer of the page shows the commit that was deployed, so you can confirm your latest push is live.

> The address is `http://`, not `https://`. If your browser upgrades it to `https://`, it won't load. Type `http://` explicitly.

## Connect over SSH

The private key is stored in SSM Parameter Store. Using the AWS CLI configured with your sandbox credentials:

```bash
KEY_ID=<KeyPairId from the workflow outputs>
aws ssm get-parameter --name /ec2/keypair/$KEY_ID --with-decryption \
  --query Parameter.Value --output text --region us-east-1 > ec2-key.pem
chmod 400 ec2-key.pem
ssh -i ec2-key.pem ec2-user@<PublicIp>
```

Useful commands on the instance:

```bash
ls /usr/share/nginx/html            # the deployed site files
systemctl status nginx              # is nginx running?
sudo tail /var/log/nginx/access.log # requests to your site
sudo cat /var/log/cloud-init-output.log  # output of the UserData script
```

## Update the stack

Edit [infra/ec2-instance.yaml](../infra/ec2-instance.yaml), commit, and push to `main`. CloudFormation applies the change set.

To restrict SSH to your IP, change the `SSHLocation` default to `<your-ip>/32`. The workflow deploys over SSH from GitHub's servers, so a restricted rule will make the **Copy site to EC2** step fail.

## Troubleshooting

- **Validate profile.json fails**: read the red message; it names the field or the JSON error. See [02 - Customize your profile](02-customize-your-profile.md#json-rules-that-trip-people-up).
- **Photo doesn't show (initials appear instead)**: the `photo` value doesn't match the file in `public/` exactly.
- **Stack in `ROLLBACK_COMPLETE`**: delete it from the CloudFormation console, then re-run the workflow.
- **Template errors**: check the "Validate template" step output.
- **UserData failed**: the "Wait for SSH and first-boot setup" step prints the last lines of `/var/log/cloud-init-output.log`.
- **Site worked before but the URL no longer loads**: the instance was stopped and started, so its IP changed. Re-run the workflow; the summary shows the new IP.
