# 02 - Customize your profile

Prerequisite: [01 - Set up GitHub secrets](01-setup-github-secrets.md).

You only need to change two things: your details and your photo. You don't need to know React.

## 1. Add your photo

1. Put your photo in the `public/` folder, for example `public/my-photo.jpg`.
2. Any format a browser can show works: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.avif` or `.svg`.
3. A square photo, at least 400 × 400 pixels, looks best.

## 2. Edit your details

Open [src/data/profile.json](../src/data/profile.json) and replace the placeholder values:

```json
{
  "name": "Your Name",
  "tagline": "Your Tagline",
  "photo": "my-photo.jpg",
  "roll": "Your ID / Roll Number",
  "department": "Your Department",
  "year": "Your Year",
  "email": "your.email@example.com",
  "gpa": "0.00",
  "about": "Two or three lines about yourself.",
  "skills": ["Linux", "Git", "Docker", "AWS", "React"],
  "links": {
    "github": "https://github.com/your-username",
    "linkedin": ""
  },
  "quotes": ["Your favourite quote.", "Another one."]
}
```

| Field | Notes |
| --- | --- |
| `name`, `tagline`, `roll`, `department`, `year`, `email`, `gpa` | Required. Keep the quotes around each value, e.g. `"gpa": "3.75"` |
| `photo` | File name inside `public/`. Must match exactly, including uppercase/lowercase and extension |
| `about` | Optional. Leave it as `""` to hide the section |
| `skills` | A list in square brackets. Use `[]` to hide the section |
| `links` | Leave a link as `""` to hide it |
| `quotes` | A list of quotes; the card picks one at random |

### JSON rules that trip people up

- Every value is in double quotes `"..."`, never single quotes.
- Put a comma after every line **except the last one** inside `{ }` or `[ ]`.
- To use a `"` inside a value, write `\"`.

## 3. Commit and push

```bash
git add public/ src/data/profile.json
git commit -m "Add my profile"
git push origin main
```

You can also edit the files directly on github.com and click **Commit changes**.

## 4. Watch the deploy

Open the **Actions** tab. The **Deploy React site to EC2** run takes about 5 minutes the first time (it creates the EC2 instance) and about 1 minute after that.

If `profile.json` has a mistake, the **Validate profile.json** step fails with a red message telling you what to fix. Fix it, commit and push again.

Next: [03 - Deploy and connect](03-deploy-and-connect.md)
