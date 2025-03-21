
# How to Deploy to GitHub Pages

This project is configured to automatically deploy to GitHub Pages when you push changes to the main branch.

## Manual Deployment

If you want to deploy manually, follow these steps:

1. Make sure you have enabled GitHub Pages in your repository settings:
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to "GitHub Pages" section
   - Select "GitHub Actions" as the source

2. Trigger a deployment by:
   - Pushing changes to the main branch, or
   - Running the workflow manually from the "Actions" tab in your GitHub repository

## Custom Domain

If you want to use your custom domain (heynia.com):

1. Go to your repository's "Settings" tab
2. Scroll down to "GitHub Pages" section
3. In the "Custom domain" field, enter: heynia.com
4. Check "Enforce HTTPS" if you want secure connections

Remember to update your DNS settings with your domain provider to point to GitHub Pages.
