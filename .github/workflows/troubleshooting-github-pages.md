
# Troubleshooting GitHub Pages Deployment

If your website is not appearing at heynia.com, follow these steps:

## 1. Check GitHub Pages Settings

1. Go to your repository on GitHub
2. Click "Settings" → "Pages"
3. Verify that:
   - Source is set to "GitHub Actions"
   - Custom domain is set to "heynia.com"
   - "Enforce HTTPS" is checked

## 2. Verify DNS Configuration on Namecheap

1. Log into Namecheap
2. Go to Domain List → heynia.com → Manage → Advanced DNS
3. Ensure you have these A records pointing to GitHub Pages:
   - A Record: @ → 185.199.108.153
   - A Record: @ → 185.199.109.153
   - A Record: @ → 185.199.110.153
   - A Record: @ → 185.199.111.153
4. You may also have a CNAME record:
   - CNAME Record: www → yourusername.github.io (or your organization name)

## 3. Check CNAME File

1. After deployment, check if the CNAME file exists in your site root
2. It should contain only: `heynia.com`
3. No additional content, domains, or www prefix

## 4. Check GitHub Actions

1. Go to the "Actions" tab in your repository
2. Look at the latest workflow run
3. Check if the deployment succeeded or failed
4. Look for the "Setup CNAME and GitHub Pages config" step to verify CNAME creation

## 5. DNS Propagation

Remember that DNS changes can take 24-48 hours to fully propagate globally.

## 6. Testing Tools

- Use https://whatsmydns.net to check DNS propagation for heynia.com
- Use a tool like https://dnschecker.org to verify your DNS configuration
