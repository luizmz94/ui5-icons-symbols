# UI5 Icons Symbols

⚠️ **IMPORTANT:** This extension requires the **SAP Icon Font** to be installed on your machine for proper functionality. You can download and install the font from the following link:

[Download SAP Icon Font](https://experience.sap.com/fiori-design-web/downloads/#sap-icon-font)

This Visual Studio Code extension enhances your development workflow by displaying SAP UI5 icons next to their URI references in HTML, XML, JavaScript, and TypeScript files.

## Features

- Automatically detects SAP UI5 icon URIs (`sap-icon://...`) in your files and visually displays the corresponding icon.
- Supports `html`, `xml`, `javascript`, and `typescript` files.

Example of how the icons are displayed:

![Extension Demo](sample.gif)

## Requirements

**SAP Icon Font** must be installed for the icons to display correctly. [Download and install the font here](https://experience.sap.com/fiori-design-web/downloads/#sap-icon-font).

### How to install SAP Icon Font

#### macOS

Run the following command in the terminal:

```bash
FONT_DEST=~/Library/Fonts/SAP-icons.ttf
ZIP_NAME=SAP-icons_Horizon_5.10_Fonts.zip
DOWNLOAD_URL="https://experience.sap.com/wp-content/uploads/sites/56/2024/10/$ZIP_NAME"
EXTRACT_DIR=SAP-icons_Horizon_5.10_Fonts

echo "Checking SAP-icons font installation..."

curl -L -o "$ZIP_NAME" "$DOWNLOAD_URL" && \
unzip -o "$ZIP_NAME" -d "$EXTRACT_DIR" && \
mkdir -p ~/Library/Fonts && \
cp -f "$EXTRACT_DIR/Fonts/SAP-icons.ttf" "$FONT_DEST" && \
rm -rf "$ZIP_NAME" "$EXTRACT_DIR" && \
echo "SAP-icons.ttf successfully installed or updated in ~/Library/Fonts/"
```

#### 🪟 Windows

You can install the font in two ways:

---

#### 🔧 **Option 1: Manual installation (no admin rights)**

This script downloads and extracts the font to your Downloads folder and opens the installation window. You will need to click **"Install"** manually.

```powershell
$fontName = "SAP-icons.ttf"
$zipUrl = "https://experience.sap.com/wp-content/uploads/sites/56/2024/10/SAP-icons_Horizon_5.10_Fonts.zip"
$downloadFolder = [Environment]::GetFolderPath("UserProfile") + "\Downloads"
$zipPath = Join-Path $downloadFolder "SAP-icons_Horizon_5.10_Fonts.zip"
$extractPath = Join-Path $downloadFolder "SAP-icons_Horizon_5.10_Fonts"
$fontPath = Join-Path $downloadFolder $fontName

Write-Host "`n🔽 Downloading SAP Icons font..."
Invoke-WebRequest -Uri $zipUrl -OutFile $zipPath
Expand-Archive -Path $zipPath -DestinationPath $extractPath -Force

$ttfFile = Get-ChildItem -Path "$extractPath\Fonts" -Filter $fontName | Select-Object -First 1

if ($ttfFile) {
    Copy-Item $ttfFile.FullName -Destination $fontPath -Force
    Start-Process $fontPath
    Write-Host "`n📝 Installation window will open. Click 'Install'."
} else {
    Write-Host "❌ SAP-icons.ttf not found after extraction."
}

Remove-Item -Recurse -Force $zipPath, $extractPath
```

---

#### 🛡️ **Option 2: System-level installation (admin rights required)**

This script installs the font directly to `C:\Windows\Fonts` and registers it in the system registry without user interaction. **Run as Administrator.**

```powershell
$fontName = "SAP-icons.ttf"
$zipUrl = "https://experience.sap.com/wp-content/uploads/sites/56/2024/10/SAP-icons_Horizon_5.10_Fonts.zip"
$downloadFolder = [Environment]::GetFolderPath("UserProfile") + "\Downloads"
$zipPath = Join-Path $downloadFolder "SAP-icons_Horizon_5.10_Fonts.zip"
$extractPath = Join-Path $downloadFolder "SAP-icons_Horizon_5.10_Fonts"
$systemFontsPath = "$env:SystemRoot\Fonts"
$fontDestPath = Join-Path $systemFontsPath $fontName
$fontRegName = "SAP Icons"

Invoke-WebRequest -Uri $zipUrl -OutFile $zipPath
Expand-Archive -Path $zipPath -DestinationPath $extractPath -Force

$ttfFile = Get-ChildItem -Path "$extractPath\Fonts" -Filter $fontName | Select-Object -First 1

if ($ttfFile) {
    Copy-Item $ttfFile.FullName -Destination $fontDestPath -Force
    New-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Fonts" \
                     -Name "$fontRegName (TrueType)" \
                     -PropertyType String \
                     -Value $fontName \
                     -Force | Out-Null
    Write-Host "✅ Font successfully installed!"
} else {
    Write-Host "❌ SAP-icons.ttf not found after extraction."
}

Remove-Item -Recurse -Force $zipPath, $extractPath
```

## Extension Settings

This extension doesn't add any VS Code settings at the moment.

## Known Issues

There are currently no known issues. If you encounter any, please report them.

## Release Notes

### 1.0.0

- Initial release of UI5 Icons Symbols.
- Added support for detecting and displaying icons in HTML, XML, JavaScript, and TypeScript files.

### 1.0.1 - 5

- Bug fixes.

### 1.0.6

- Updated icon font version to SAP-icons Horizon 5.10.
- Added cross-platform installation scripts (macOS and Windows).
- Added support for automatic font installation on Windows with PowerShell (including system-level registration).
- Improved documentation clarity and user guidance for font setup.

---

## For more information

For more details about how to create extensions for Visual Studio Code or how to contribute to this extension, check the following:

- [Visual Studio Code API](https://code.visualstudio.com/api)
- [Visual Studio Code Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

**Enjoy using UI5 Icons Symbols!**
