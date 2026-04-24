# Changelog

All notable changes to the UI5 Icons Symbols extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.0.10] - 2026-04-24

### Fixed

- Corrected font download URL to use the Horizon theme (`sap_horizon`) instead of the base/Quartz theme from the SAP GitHub repository. The previous URL pointed to Version 4.24 (Quartz); the correct URL now downloads Version 5.13 (Horizon).

---

## [1.0.9] - 2026-04-24

### Fixed

- Font download scripts updated: SAP moved the icon font away from `experience.sap.com`. Scripts now download the TTF directly from the official SAP GitHub repository (`SAP/theming-base-content`), removing the need for ZIP extraction.
- Updated manual download link to the new SAP Design System page (`sap.com/design-system`).

---

## [1.0.8] - 2025-05-15

### Added

- SVG generation for all available icons.
- Improved icon auto-completion suggestions with real-time visual previews.
- Optimized icon rendering performance in larger files.
- Enhanced overall UI responsiveness.

## [1.0.7] - 2025-05-01

### Fixed

- Corrections in the translation of `README.md`.

## [1.0.6] - 2025-04-24

### Added

- Support for SAP-icons Horizon 5.10 font version.
- Cross-platform font installation scripts (macOS & Windows).
- PowerShell script for **silent font installation** on Windows with admin rights.

### Changed

- README.md updated with clearer installation instructions.
- Improved documentation on font requirements and setup process.

## [1.0.5] - 2025-04-10

### Fixed

- Bug fix related to icon rendering in TypeScript files.

## [1.0.4] - 2025-04-01

### Fixed

- Minor performance improvements when parsing large XML files.

## [1.0.3] - 2025-03-15

### Fixed

- Fixed issue with incorrect icon preview when using custom themes.

## [1.0.2] - 2025-03-05

### Fixed

- Icon rendering compatibility fixes for Visual Studio Code 1.88+.

## [1.0.1] - 2025-02-28

### Fixed

- General bug fixes and icon mapping improvements.

---

## [1.0.0] - 2025-02-01

### Added

- Initial release of UI5 Icons Symbols.
- Detects `sap-icon://` URIs and displays corresponding SAP icons.
- Supports HTML, XML, JavaScript, and TypeScript file types.
