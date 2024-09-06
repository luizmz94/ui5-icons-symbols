
# UI5 Icons Symbols

⚠️ **IMPORTANT:** This extension requires the **SAP Icon Font** to be installed on your machine for proper functionality. You can download and install the font from the following link:

[Download SAP Icon Font](https://experience.sap.com/fiori-design-web/downloads/#sap-icon-font)

This Visual Studio Code extension enhances your development workflow by displaying SAP UI5 icons next to their URI references in HTML, XML, JavaScript, and TypeScript files.

## Features

- Automatically detects SAP UI5 icon URIs (`sap-icon://...`) in your files and visually displays the corresponding icon.
- Supports `html`, `xml`, `javascript`, and `typescript` files.
  
Example of how the icons are displayed:

![Demonstração da extensão](sample.gif)

## Requirements

**SAP Icon Font** must be installed for the icons to display correctly. [Download and install the font here](https://experience.sap.com/fiori-design-web/downloads/#sap-icon-font).

### How to install SAP Icon Font

#### macOS

Run the following command in the terminal:

```bash
if [ ! -f ~/Library/Fonts/SAP-icons.ttf ]; then
    echo 'SAP-icons.ttf not found. Installing...'
    curl -o SAP-icons_Horizon_5.9_Fonts.zip https://experience.sap.com/wp-content/uploads/sites/56/2024/07/SAP-icons_Horizon_5.9_Fonts.zip && \
    unzip SAP-icons_Horizon_5.9_Fonts.zip && \
    mkdir -p ~/Library/Fonts && \
    mv SAP-icons_Horizon_5.9_Fonts/SAP-icons.ttf ~/Library/Fonts/ && \
    rm -rf SAP-icons_Horizon_5.9_Fonts.zip SAP-icons_Horizon_5.9_Fonts && \
    echo 'SAP-icons_Horizon_5.9 installed successfully!'
else
    echo 'SAP-icons.ttf is already installed.'
fi
```

#### Windows

Run the following command in PowerShell:

```powershell
$downloadFolder = [System.IO.Path]::Combine([Environment]::GetFolderPath('UserProfile'), 'Downloads')
$zipUrl = "https://experience.sap.com/wp-content/uploads/sites/56/2024/07/SAP-icons_Horizon_5.9_Fonts.zip"
$zipPath = [System.IO.Path]::Combine($downloadFolder, "SAP-icons_Horizon_5.9_Fonts.zip")
$extractPath = [System.IO.Path]::Combine($downloadFolder, "SAP-icons_Horizon_5.9_Fonts")

if (-Not (Test-Path "$downloadFolder\SAP-icons.ttf")) {
    Write-Host "SAP-icons.ttf not found. Downloading and extracting to Downloads folder..."
    Invoke-WebRequest -Uri $zipUrl -OutFile $zipPath
    Expand-Archive -Path $zipPath -DestinationPath $extractPath
    $ttfFile = Get-ChildItem -Path $extractPath -Recurse -Filter 'SAP-icons.ttf' | Select-Object -First 1
    if ($ttfFile) {
        Move-Item $ttfFile.FullName -Destination $downloadFolder
        Start-Process "$downloadFolder\SAP-icons.ttf"
        Write-Host "SAP-icons.ttf downloaded and ready to install. Check your Downloads folder."
    } else {
        Write-Host "SAP-icons.ttf not found after extraction."
    }
    Remove-Item -Recurse -Force $zipPath, $extractPath
} else {
    Write-Host "SAP-icons.ttf is already in the Downloads folder."
}
```


## Extension Settings

This extension doesn't add any VS Code settings at the moment.

## Known Issues

There are currently no known issues. If you encounter any, please report them.

## Release Notes

### 1.0.0

- Initial release of UI5 Icons Symbols.
- Added support for detecting and displaying icons in HTML, XML, JavaScript, and TypeScript files.

### 1.0.1 - 3 
- Bug fix!

---

## For more information

For more details about how to create extensions for Visual Studio Code or how to contribute to this extension, check the following:

- [Visual Studio Code API](https://code.visualstudio.com/api)
- [Visual Studio Code Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

**Enjoy using UI5 Icons Symbols!**
