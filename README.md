# Drive Contents Viewer

A Chrome extension that provides an enhanced view of Google Drive folder contents with customizable layouts and file previews.

## Features

- 📁 **Google Drive Integration**: View contents of any Google Drive folder or your "My Drive"
- 🖼️ **File Previews**: Inline previews for Google Docs, Sheets, Slides, images, PDFs, and videos
- 📊 **Customizable Layout**: Adjustable grid columns (1-5) and orientation (horizontal/vertical)
- 🔗 **Quick Actions**: Direct file viewing and link copying
- 🎯 **Drag & Drop**: Reorder files by dragging
- 🌐 **Internationalization**: Multi-language support ready

## Supported File Types

- **Google Workspace**: Documents, Spreadsheets, Presentations
- **Images**: JPEG, PNG, GIF
- **Documents**: PDF files
- **Videos**: MP4, QuickTime, AVI, MKV, WebM
- **Other files**: Direct links for viewing

## Installation

### Method 1: Chrome Web Store (Recommended)
*Coming soon - waiting for store review*

### Method 2: Load as Unpacked Extension

1. **Download this repository**
   ```bash
   git clone https://github.com/overdozer1124/drive-contents-viewer.git
   cd drive-contents-viewer
   ```

2. **Set up Google Cloud Console**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the Google Drive API
   - Create OAuth 2.0 credentials for Chrome extension
   - Copy your Client ID

3. **Configure the extension**
   - Open `manifest.json`
   - Replace `YOUR_CLIENT_ID_HERE` in the `oauth2.client_id` field with your actual Client ID
   - Save the file

4. **Load in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (top right toggle)
   - Click "Load unpacked"
   - Select the `drive-contents-viewer` folder
   - The extension icon should appear in your toolbar

## Usage

1. **Navigate to Google Drive** in your browser
2. **Open any folder** or stay in "My Drive"
3. **Click the extension icon** in the toolbar
4. **Authorize access** to your Google Drive (first time only)
5. **Enjoy the enhanced view** with customizable layout options

### Controls

- **Column Slider**: Adjust the number of columns (1-5)
- **Orientation Toggle**: Switch between horizontal and vertical layouts
- **File Actions**: Hover over files to see "View" and "Copy Link" options
- **Drag & Drop**: Rearrange files by dragging them to new positions

## Development

### Project Structure

```
drive-contents-viewer/
├── manifest.json          # Extension configuration
├── background.js          # Service worker for extension logic
├── preview.html          # Main UI for file viewing
├── preview.js            # Frontend logic and Drive API integration
├── content_script.js     # Content script (minimal usage)
├── icon16.png           # Extension icons
├── icon48.png
├── icon128.png
└── _locales/           # Internationalization
    └── en/
        └── messages.json
```

### Setup for Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/overdozer1124/drive-contents-viewer.git
   cd drive-contents-viewer
   ```

2. **Configure OAuth** (see Installation section above)

3. **Load in Chrome** as unpacked extension

4. **Make changes** and reload the extension to test

### Test Mode

For development without OAuth setup, you can use the test mode files in the `dev/` folder.

## Configuration

### OAuth Setup

You need to set up Google Cloud Console credentials:

1. **Google Cloud Console Setup**:
   - Create or select a project
   - Enable Google Drive API
   - Configure OAuth consent screen
   - Create OAuth 2.0 Client ID for Chrome extension

2. **Update manifest.json**:
   ```json
   {
     "oauth2": {
       "client_id": "YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com",
       "scopes": [
         "https://www.googleapis.com/auth/drive.readonly",
         "https://www.googleapis.com/auth/drive.metadata.readonly"
       ]
     }
   }
   ```

## Security & Privacy

- **Read-only access**: The extension only requests read-only permissions to your Google Drive
- **No data storage**: No personal data is stored locally or transmitted to third parties
- **Secure authentication**: Uses Google's OAuth 2.0 for secure authentication
- **Minimal permissions**: Only requests necessary permissions for core functionality

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Guidelines

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Drive API for file access
- Chrome Extensions API for browser integration
- Icons from Material Design

## Support

If you encounter any issues or have suggestions:

1. Check the [Issues](https://github.com/overdozer1124/drive-contents-viewer/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your browser, extension version, and the issue

---

**Note**: This extension requires Google Drive API access. Please ensure you have the necessary permissions and follow Google's terms of service.