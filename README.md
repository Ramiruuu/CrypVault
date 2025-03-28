# CryptVault 
CryptVault is a web-based encryption tool designed to secure text and files using AES encryption, powered by CryptoJS. Below are notes detailing its functionality, design, usage, and considerations.

## Preview
![image](https://github.com/user-attachments/assets/6cab17ef-4c74-4738-a8f9-3bb8bc15053a)

## Overview
CryptVault provides an intuitive interface for generating encryption keys, encrypting/decrypting text, and processing multiple files. It combines a modern glassmorphism UI with practical features for personal data security.

## Features
- **Key Generation**: Create and download secure AES keys for encryption.
- **Text Encryption**: Encrypt and decrypt text with a single click, including clipboard support.
- **File Processing**: Batch encrypt/decrypt files with automatic downloads (`.enc` for encrypted, `_decrypted` for decrypted).
- **Tabbed Interface**: Separate tabs for text and file operations enhance usability.
- **Responsive Design**: Adapts seamlessly to desktop and mobile devices.
- **UI/UX**: Glassmorphism style with smooth fade animations and a vibrant color palette.

### Dependencies
- **CryptoJS**: Uses version 4.1.1 (loaded via CDN) for AES encryption.
- **HTML/CSS/JS**: Built with vanilla web technologies—no additional frameworks.

### Encryption
- **Algorithm**: AES (Advanced Encryption Standard) via CryptoJS.
- **Key**: 256-bit keys generated client-side using `CryptoJS.lib.WordArray.random(32)`.
- **Limitations**: AES-only (no HMAC), less secure than hybrid systems like Fernet.

### File Handling
- Files are processed in memory using the FileReader API.
- Output files are downloaded as plain text with custom extensions.

### Color Palette
- **Background**: Gradient from `#1e3c72` (deep blue) to `#2a5298` (mid-blue).
- **Encrypt Button**: `#00b4db` (cyan) → `#0083b0` (hover).
- **Decrypt Button**: `#ff6b6b` (soft red) → `#d45252` (hover).
- **Elements**: White text on translucent backgrounds with blur effects.

### Animations
- **Fade Effect**: Tab content fades in over 0.5s using CSS `@keyframes`.
- **Button Hover**: Scale transform (1.05x) with 0.3s ease transition.

### Glassmorphism
- Achieved with `backdrop-filter: blur(10px)`, `rgba` backgrounds, and subtle shadows.

## Usage Tips

1. **Key Management**:
   - Generate a key and save it immediately (e.g., via "Download Key").
   - Without the key, encrypted data cannot be recovered.

2. **Text Operations**:
   - Copy encrypted output for secure sharing.
   - Ensure the correct key is used for decryption.

3. **File Operations**:
   - Select multiple files for batch processing.
   - Encrypted files append `.enc`; decrypted files append `_decrypted`.

## Security Considerations

- **Client-Side**: All encryption happens in the browser—no server dependency.
- **Weaknesses**: AES via CryptoJS lacks integrity checking (e.g., HMAC). Use with caution for sensitive data.
- **Recommendations**: For critical applications, integrate a backend with stronger cryptography (e.g., Python’s `cryptography` library).

## Potential Improvements
- **Web Crypto API**: Replace CryptoJS with native browser cryptography for better security.
- **Key Validation**: Add checks for key length/strength.
- **Local Storage**: Temporarily save keys or settings (opt-in).
- **Drag-and-Drop**: Enhance file input with drag-and-drop support.
- **Progress Indicators**: Show progress for large file batches.

## Known Issues
- **Memory Limits**: Large files may crash the browser due to client-side processing.
- **No Persistence**: Key and data reset on page refresh—user must manage keys manually.
- **Decryption Failures**: Invalid keys or malformed input silently fail with a message.

## Development Notes
- **Testing**: Tested in Chrome, Firefox, and Edge—ensure compatibility with modern browsers.
- **Extensibility**: JavaScript logic is modular; add new features in `script.js`.
- **Styling**: CSS is organized for easy tweaks—adjust colors or effects in `styles.css`.

## Deployment
- Host statically (e.g., GitHub Pages) or run locally by opening `index.html`.
- No backend required, making it portable and lightweight.

## Vercel Link Host
https://cryp-vault.vercel.app/

---
Last Updated: March 27, 2025
