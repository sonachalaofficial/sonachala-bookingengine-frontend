# Firebase Storage CORS Fix

## Problem
When uploading files to Firebase Storage from localhost, you encounter:
```
CORS policy blocked
Preflight request failed
net::ERR_FAILED
```

## Solution

### Method 1: Using Google Cloud SDK (Recommended)

1. **Install Google Cloud SDK**
   - Download from: https://cloud.google.com/sdk/docs/install
   - After installation, run `gcloud init` to authenticate

2. **Find your Storage Bucket Name**
   - Go to Firebase Console → Storage
   - Your bucket name looks like: `your-project-id.appspot.com`
   - Or check your `.env` file: `VITE_USER_FIREBASE_STORAGE_BUCKET`

3. **Apply CORS Configuration**
   
   Navigate to this folder and run:
   ```bash
   cd sonachala-userfrontend-main
   gsutil cors set cors.json gs://YOUR_BUCKET_NAME
   ```
   
   Example:
   ```bash
   gsutil cors set cors.json gs://sonachala-hotels.appspot.com
   ```

4. **Verify CORS Configuration**
   ```bash
   gsutil cors get gs://YOUR_BUCKET_NAME
   ```

### Method 2: Using the Batch Script (Windows)

1. Open Command Prompt
2. Navigate to `sonachala-userfrontend-main`
3. Run `apply-cors.bat`
4. Enter your bucket name when prompted

### Method 3: Using Google Cloud Console

1. Go to https://console.cloud.google.com/
2. Select your project
3. Navigate to Cloud Storage → Browser
4. Click on your bucket (the one used by Firebase Storage)
5. Go to "Configuration" tab
6. Click "Edit" next to CORS configuration
7. Add the following:

```json
[
  {
    "origin": ["*"],
    "method": ["GET", "POST", "PUT", "DELETE", "HEAD"],
    "maxAgeSeconds": 3600,
    "responseHeader": [
      "Content-Type",
      "Content-Length",
      "Content-Disposition",
      "Authorization"
    ]
  }
]
```

### Method 4: Using Firebase CLI (Alternative)

If you have Firebase CLI installed:

```bash
# Login to Firebase
firebase login

# Use the Google Cloud project
gcloud config set project YOUR_PROJECT_ID

# Apply CORS
gsutil cors set cors.json gs://YOUR_BUCKET_NAME
```

## Finding Your Bucket Name

### From Firebase Console
1. Go to https://console.firebase.google.com/
2. Select your project
3. Click "Storage" in the left sidebar
4. Click "Files" tab
5. The bucket name appears at the top (e.g., `sonachala-hotels.appspot.com`)

### From .env File
Your `.env` file should have:
```
VITE_USER_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
```

## Common Issues

### Issue: "gsutil not found"
**Solution:** Install Google Cloud SDK and add it to your PATH

### Issue: "Access denied"
**Solution:** 
1. Make sure you're logged in: `gcloud auth login`
2. Make sure you have Owner/Editor permissions on the project

### Issue: "Bucket not found"
**Solution:** Verify the bucket name is correct. It should NOT include the `gs://` prefix in the name.

## After Applying CORS

1. Clear your browser cache (Ctrl+Shift+Delete)
2. Restart your development server (`npm run dev`)
3. Try uploading again

## For Production

The CORS configuration allows all origins (`*`). For production:
1. Consider restricting to your actual domain
2. Update the `origin` array in `cors.json`:

```json
{
  "origin": ["https://yourdomain.com", "https://www.yourdomain.com"],
  ...
}
```

Then re-apply:
```bash
gsutil cors set cors.json gs://YOUR_BUCKET_NAME