
# How to Connect Lovable to GitHub and Deploy to www.heynia.com

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
   - Enter: www.heynia.com
   - Check "Enforce HTTPS" (once the domain is verified)

## Step 3: Configure Namecheap DNS Settings for Apex to WWW Redirect

1. Log in to your Namecheap account
2. Go to the Domain List and find heynia.com
3. Click "Manage"
4. Click "Advanced DNS"
5. Add the following records:

   ### A Records (for GitHub Pages):
   - Type: A | Host: @ | Value: 185.199.108.153 | TTL: Automatic
   - Type: A | Host: @ | Value: 185.199.109.153 | TTL: Automatic
   - Type: A | Host: @ | Value: 185.199.110.153 | TTL: Automatic
   - Type: A | Host: @ | Value: 185.199.111.153 | TTL: Automatic

   ### CNAME Record (for www subdomain):
   - Type: CNAME | Host: www | Value: kevoduor.github.io | TTL: Automatic

   ### URL Redirect Record (for apex to www redirect):
   - Type: URL Redirect Record | Host: @ | Value: https://www.heynia.com/ | TTL: Automatic
     - Unmasked Redirect (also called a "301 redirect")

6. Wait for DNS changes to propagate (can take up to 48 hours)

## Step 4: Verify the Connection

1. After DNS propagation, go back to your GitHub repository's settings
2. Under "Pages", verify that your domain is showing as verified
3. Check "Enforce HTTPS" for secure connections
4. Visit www.heynia.com to see your deployed site
5. When users visit heynia.com, they should be automatically redirected to www.heynia.com

## Troubleshooting

If your site isn't appearing correctly after following these steps:

1. Check if the GitHub Actions workflow ran successfully:
   - Go to the "Actions" tab in your repository
   - Look for the most recent workflow run and check if it completed without errors

2. Verify your DNS settings:
   - You can use a tool like https://dnschecker.org to verify your DNS configuration
   - Enter heynia.com and www.heynia.com to check if the records are pointing correctly

3. Check GitHub Pages settings:
   - In your repository settings, under Pages, make sure it shows "Your site is published at https://www.heynia.com"

4. Test the redirect:
   - Open a browser and visit heynia.com
   - You should be automatically redirected to www.heynia.com

5. Remember that DNS changes can take 24-48 hours to fully propagate globally
