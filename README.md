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
FONT_DEST=~/Library/Fonts/SAP-icons.ttf
ZIP_NAME=SAP-icons_Horizon_5.10_Fonts.zip
DOWNLOAD_URL="https://experience.sap.com/wp-content/uploads/sites/56/2024/10/$ZIP_NAME"
EXTRACT_DIR=SAP-icons_Horizon_5.10_Fonts

echo "Verificando instalação da fonte SAP-icons..."

curl -L -o "$ZIP_NAME" "$DOWNLOAD_URL" && \
unzip -o "$ZIP_NAME" -d "$EXTRACT_DIR" && \
mkdir -p ~/Library/Fonts && \
cp -f "$EXTRACT_DIR/Fonts/SAP-icons.ttf" "$FONT_DEST" && \
rm -rf "$ZIP_NAME" "$EXTRACT_DIR" && \
echo "SAP-icons.ttf instalada ou atualizada com sucesso em ~/Library/Fonts/"
```

#### 🪟 Windows

Você pode instalar a fonte de duas formas:

---

#### 🔧 **Opção 1: Instalar manualmente (sem administrador)**

Este script baixa e extrai a fonte para a pasta Downloads e **abre a janela de instalação da fonte**. O usuário deverá clicar em **"Instalar"**.

```powershell
$fontName = "SAP-icons.ttf"
$zipUrl = "https://experience.sap.com/wp-content/uploads/sites/56/2024/10/SAP-icons_Horizon_5.10_Fonts.zip"
$downloadFolder = [Environment]::GetFolderPath("UserProfile") + "\Downloads"
$zipPath = Join-Path $downloadFolder "SAP-icons_Horizon_5.10_Fonts.zip"
$extractPath = Join-Path $downloadFolder "SAP-icons_Horizon_5.10_Fonts"
$fontPath = Join-Path $downloadFolder $fontName

Write-Host "`n🔽 Baixando fonte SAP Icons..."
Invoke-WebRequest -Uri $zipUrl -OutFile $zipPath
Expand-Archive -Path $zipPath -DestinationPath $extractPath -Force

$ttfFile = Get-ChildItem -Path "$extractPath\Fonts" -Filter $fontName | Select-Object -First 1

if ($ttfFile) {
    Copy-Item $ttfFile.FullName -Destination $fontPath -Force
    Start-Process $fontPath
    Write-Host "`n📝 A janela de instalação será aberta. Clique em 'Instalar'."
} else {
    Write-Host "❌ SAP-icons.ttf não encontrada após extração."
}

Remove-Item -Recurse -Force $zipPath, $extractPath
```

---

#### 🛡️ **Opção 2: Instalação automática no sistema (requer administrador)**

Este script **instala a fonte diretamente** na pasta `C:\Windows\Fonts` e a **registra no sistema**, sem precisar clicar em nada. **Execute como administrador.**

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
    Write-Host "✅ Fonte instalada com sucesso!"
} else {
    Write-Host "❌ SAP-icons.ttf não encontrada após extração."
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

- Bug fix!

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
