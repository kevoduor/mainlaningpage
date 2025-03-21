
# How to Connect Lovable to GitHub and Deploy to heynia.com

## Step 1: Connect Lovable to GitHub

1. Log in to your Lovable account
2. Open your project
3. Click on the GitHub icon in the top-right corner
4. Follow the prompts to authorize Lovable to access your GitHub account
5. Connect to your repository: https://github.com/kevoduor/mainlaningpage
6. Lovable will push your code to this GitHub repository

## Step 2: Configure GitHub Pages

1. Go to your GitHub repository: https://github.com/kevoduor/mainlaningpage
2. Click on "Settings"
3. Scroll down to "Pages" in the left sidebar
4. Under "Build and deployment":
   - Source: Select "GitHub Actions"
5. Under "Custom domain":
   - Enter: heynia.com
   - Check "Enforce HTTPS" (once the domain is verified)

## Step 3: Configure Namecheap DNS Settings

1. Log in to your Namecheap account
2. Go to the Domain List and find heynia.com
3. Click "Manage"
4. Click "Advanced DNS"
5. Add the following records:

   ### A Records (for apex domain):
   - Type: A | Host: @ | Value: 185.199.108.153 | TTL: Automatic
   - Type: A | Host: @ | Value: 185.199.109.153 | TTL: Automatic
   - Type: A | Host: @ | Value: 185.199.110.153 | TTL: Automatic
   - Type: A | Host: @ | Value: 185.199.111.153 | TTL: Automatic

   ### CNAME Record (for www subdomain):
   - Type: CNAME | Host: www | Value: kevoduor.github.io | TTL: Automatic

6. Wait for DNS changes to propagate (can take up to 48 hours)

## Step 4: Verify the Connection

1. After DNS propagation, go back to your GitHub repository's settings
2. Under "Pages", verify that your domain is showing as verified
3. Check "Enforce HTTPS" for secure connections
4. Visit heynia.com to see your deployed site

## Troubleshooting

If your site isn't appearing at heynia.com after following these steps:

1. Check if the GitHub Actions workflow ran successfully:
   - Go to the "Actions" tab in your repository
   - Look for the most recent workflow run and check if it completed without errors

2. Verify your DNS settings:
   - You can use a tool like https://dnschecker.org to verify your DNS configuration
   - Enter heynia.com and check if the A records are pointing to GitHub's IP addresses

3. Check GitHub Pages settings:
   - In your repository settings, under Pages, make sure it shows "Your site is published at https://heynia.com"

4. Remember that DNS changes can take 24-48 hours to fully propagate globally
