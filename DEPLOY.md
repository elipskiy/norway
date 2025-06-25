# 🚀 Deployment Instructions for GitHub Pages

## Quick Setup

### 1. Repository Setup

This repository is already configured with automated deployment using GitHub Actions.

### 2. Configure API Keys

**Important:** Add your Google Maps API key as a GitHub secret:

1. Go to repository: https://github.com/elipskiy/norway
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `GOOGLE_MAPS_API_KEY`
5. Value: ``

### 3. Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions** (NOT "Deploy from a branch")
3. Save settings

### 4. Deploy the Application

#### Option A: Automatic Deployment

- Push any changes to the `main` branch
- GitHub Actions will automatically build and deploy

#### Option B: Manual Deployment

1. Go to **Actions** tab in your repository
2. Find "Deploy to GitHub Pages" workflow
3. Click **Run workflow** button
4. Select `main` branch and click **Run workflow**

### 5. Access Your Site

After deployment completes, your site will be available at:
**https://elipskiy.github.io/norway-trip/**

## 🔧 How It Works

The deployment process:

1. Automatically creates `config.js` with your API key
2. Builds the application
3. Deploys to GitHub Pages
4. Site is ready to use!

## 🔄 Updates

To update your site:

1. Make changes to your code
2. Push to `main` branch
3. GitHub Actions automatically redeploys

```bash
git add .
git commit -m "Update: description of changes"
git push origin main
```

## 📱 Testing

### Local Testing

```bash
# Start local server
python -m http.server 8000
# or
npx serve .

# Open http://localhost:8000
```

### Mobile Testing

- Open site on mobile device
- Test responsive design
- Test PWA installation

## 🐛 Troubleshooting

### Workflow doesn't run

- Check that API key is set as repository secret
- Verify GitHub Pages is set to "GitHub Actions" source
- Check Actions tab for error messages

### Site doesn't load

- Wait 5-10 minutes after first deployment
- Check that all files are in repository root
- Verify HTTPS is working

### Maps don't work

- Verify API key is correctly set in repository secrets
- Check browser console for errors
- Ensure API key has proper permissions

---

**Happy deploying! 🚀**
