
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

## Step 3: Configure Namecheap DNS Settings for Mobile and Desktop Access

1. Log in to your Namecheap account
2. Go to the Domain List and find heynia.com
3. Click "Manage"
4. Click "Advanced DNS"
5. **IMPORTANT**: First, remove any existing URL Redirect Records for the apex domain to avoid conflicts

6. Add the following records (make sure they exactly match these settings):

   ### A Records (for GitHub Pages):
   - Type: A | Host: @ | Value: 185.199.108.153 | TTL: Automatic
   - Type: A | Host: @ | Value: 185.199.109.153 | TTL: Automatic
   - Type: A | Host: @ | Value: 185.199.110.153 | TTL: Automatic
   - Type: A | Host: @ | Value: 185.199.111.153 | TTL: Automatic

   ### CNAME Record (for www subdomain):
   - Type: CNAME | Host: www | Value: kevoduor.github.io | TTL: Automatic

7. To properly redirect the apex domain (heynia.com) to www.heynia.com:
   - Go to the "Redirect Domain" tab in Namecheap (not in Advanced DNS)
   - Select "Permanent (301)" redirect type
   - Enter destination: https://www.heynia.com
   - Make sure to uncheck any "with www" options that would create a redirect loop
   - Check "Enable HTTPS" if possible
   - Save your changes

8. Wait for DNS changes to propagate (can take up to 48 hours)

## Step 4: Testing Mobile Access

1. After completing the DNS configuration:
   - Clear your mobile browser cache
   - Try accessing www.heynia.com from your mobile device
   - If it still doesn't work, try using cellular data instead of WiFi (to avoid cached DNS)
   - Use a mobile DNS checker like https://dnschecker.org (access from your phone)

2. Common mobile-specific DNS issues:
   - Some mobile carriers use their own DNS servers which may update slower
   - Mobile devices often cache DNS information longer than desktops
   - Try forcing your mobile browser to reload the page (pull down to refresh)

## Step 5: Verify the Connection

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
   - Clear your browser cache or use an incognito/private window
   - Open a browser and visit heynia.com
   - You should be automatically redirected to www.heynia.com

5. Remember that DNS changes can take 24-48 hours to fully propagate globally

6. If you're still having issues:
   - Make sure that you're setting up the redirect in Namecheap's "Redirect Domain" section, not as a URL Redirect Record in Advanced DNS
   - Check if your domain registrar has a specific guide for setting up 301 redirects from apex to www
   - Try using a different browser to test the redirect
   - Try accessing the site from a different network (e.g., mobile data instead of WiFi)
