@echo off
echo ========================================
echo Firebase Storage CORS Configuration
echo ========================================
echo.
echo This script applies CORS settings to your Firebase Storage bucket
echo to fix the "CORS policy blocked" error when uploading files.
echo.
echo Prerequisites:
echo 1. Google Cloud SDK (gcloud) installed
echo 2. gsutil command available in PATH
echo.
echo ========================================
echo.

REM Get the storage bucket from user input
set /p BUCKET="Enter your Firebase Storage Bucket name (e.g., your-project-id.appspot.com): "

echo.
echo Applying CORS configuration to: %BUCKET%
echo.

gsutil cors set cors.json gs://%BUCKET%

echo.
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS: CORS configuration applied successfully!
    echo.
    echo Verifying CORS configuration...
    gsutil cors get gs://%BUCKET%
) else (
    echo ERROR: Failed to apply CORS configuration.
    echo.
    echo Please make sure:
    echo 1. gsutil is installed and in your PATH
    echo 2. You have permission to access this bucket
    echo 3. The bucket name is correct
)

echo.
pause