# DevicePrint

> **Note**: This library was generated using AI (GitHub Copilot with Claude Sonnet 4.5) as an original implementation.

A lightweight JavaScript library for computing unique device fingerprints based on browser and device characteristics.

## Features

DevicePrint collects and analyzes various browser and device attributes to create a unique fingerprint:

- **Browser Information**: User agent, language, plugins, Do Not Track settings
- **Display Properties**: Screen resolution, color depth, available screen size
- **System Information**: Platform, CPU class, hardware concurrency, device memory
- **Canvas Fingerprinting**: Unique rendering characteristics
- **WebGL Fingerprinting**: Graphics card vendor and renderer information
- **Audio Fingerprinting**: Audio context characteristics
- **Font Detection**: Installed system fonts
- **Storage APIs**: LocalStorage, SessionStorage, IndexedDB availability
- **Touch Support**: Touch event and max touch points detection
- **Timezone**: Offset and timezone name
- **Consistency Checks**: Detects potential spoofing or discrepancies

## Installation

### Direct Download

Download the `deviceprint.js` file and include it in your HTML:

```html
<script src="path/to/src/deviceprint.js"></script>
```

### npm (if published)

```bash
npm install deviceprint
```

## Usage

### Basic Usage

```javascript
// Create a new DevicePrint instance
const devicePrint = new DevicePrint();

// Generate the fingerprint
devicePrint.generate().then(result => {
  console.log('Fingerprint:', result.fingerprint);
  console.log('Components:', result.components);
});
```

### Getting Individual Components

```javascript
const devicePrint = new DevicePrint();

// Get specific components
console.log('User Agent:', devicePrint.getUserAgent());
console.log('Screen Resolution:', devicePrint.getScreenResolution());
console.log('Platform:', devicePrint.getPlatform());
console.log('Timezone:', devicePrint.getTimezone());
```

### Complete Example

```javascript
async function identifyDevice() {
  const devicePrint = new DevicePrint();
  
  try {
    const result = await devicePrint.generate();
    
    // The fingerprint hash (unique identifier)
    console.log('Device Fingerprint:', result.fingerprint);
    
    // All collected components
    console.log('Screen Resolution:', result.components.screenResolution);
    console.log('Timezone:', result.components.timezone);
    console.log('Platform:', result.components.platform);
    console.log('Hardware Concurrency:', result.components.hardwareConcurrency);
    console.log('Detected Fonts:', result.components.fonts);
    
    // Send to server for verification/storage
    await fetch('/api/fingerprint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result)
    });
    
  } catch (error) {
    console.error('Error generating fingerprint:', error);
  }
}

identifyDevice();
```

## API Reference

### Class: DevicePrint

#### Methods

##### `generate()`

Generates a complete device fingerprint.

**Returns:** `Promise<Object>` 
- `fingerprint` (string): SHA-256 hash of all components
- `components` (object): All collected device/browser attributes

```javascript
const result = await devicePrint.generate();
// result.fingerprint -> "a1b2c3d4e5f6..."
// result.components -> { userAgent: "...", platform: "...", ... }
```

##### Individual Component Methods

All methods return immediately (synchronous) except `generate()`, `getCanvasFingerprint()`, and `getAudioFingerprint()`:

- `getUserAgent()` - Browser user agent string
- `getLanguage()` - Browser language
- `getColorDepth()` - Screen color depth
- `getScreenResolution()` - [width, height]
- `getAvailableScreenResolution()` - Available screen dimensions
- `getTimezoneOffset()` - Timezone offset in minutes
- `getTimezone()` - Timezone name (e.g., "America/New_York")
- `hasSessionStorage()` - SessionStorage availability
- `hasLocalStorage()` - LocalStorage availability
- `hasIndexedDB()` - IndexedDB availability
- `getCpuClass()` - CPU class (if available)
- `getPlatform()` - Operating system platform
- `getDoNotTrack()` - Do Not Track setting
- `getPlugins()` - Array of installed browser plugins
- `getCanvasFingerprint()` - Canvas rendering fingerprint (async)
- `getWebGLFingerprint()` - WebGL renderer information
- `getWebGLVendor()` - WebGL vendor
- `getAdBlock()` - Ad blocker detection
- `getTouchSupport()` - Touch capability information
- `getFonts()` - Detected system fonts
- `getAudioFingerprint()` - Audio context fingerprint (async)
- `getHardwareConcurrency()` - Number of CPU cores
- `getDeviceMemory()` - Device RAM in GB
- `getCookieEnabled()` - Cookie support

## Fingerprint Components

The generated fingerprint includes:

| Component | Description |
|-----------|-------------|
| `userAgent` | Browser identification string |
| `language` | Browser/system language |
| `colorDepth` | Screen color depth in bits |
| `screenResolution` | Physical screen dimensions |
| `availableScreenResolution` | Available screen space |
| `timezoneOffset` | UTC offset in minutes |
| `timezone` | IANA timezone identifier |
| `sessionStorage` | SessionStorage support |
| `localStorage` | LocalStorage support |
| `indexedDB` | IndexedDB support |
| `cpuClass` | CPU architecture class |
| `platform` | Operating system |
| `doNotTrack` | DNT header value |
| `plugins` | Browser plugins list |
| `canvas` | Canvas rendering hash |
| `webgl` | WebGL vendor/renderer |
| `webglVendor` | WebGL vendor only |
| `adBlock` | Ad blocker presence |
| `hasLiedLanguages` | Language inconsistencies |
| `hasLiedResolution` | Resolution inconsistencies |
| `hasLiedOs` | OS inconsistencies |
| `hasLiedBrowser` | Browser inconsistencies |
| `touchSupport` | Touch capabilities |
| `fonts` | Available system fonts |
| `audio` | Audio context signature |
| `hardwareConcurrency` | Logical processors |
| `deviceMemory` | RAM capacity |
| `cookieEnabled` | Cookie support |

## Browser Compatibility

DevicePrint works in all modern browsers:

- Chrome 50+
- Firefox 45+
- Safari 10+
- Edge 14+
- Opera 37+

Some features may not be available in older browsers (they will return 'not supported' or 'unknown').

## Privacy Considerations

Device fingerprinting can be used for both legitimate purposes (fraud detection, security) and privacy-invasive tracking. Please use this library responsibly:

- ✅ **Good uses**: Fraud prevention, security verification, analytics
- ❌ **Bad uses**: Tracking users without consent, circumventing privacy controls

Always:
- Inform users about data collection
- Comply with GDPR, CCPA, and other privacy regulations
- Provide opt-out mechanisms
- Store fingerprints securely

## Credits & Attribution

This library implements fingerprinting techniques based on published research and industry-standard methods:

### Research Papers
- **Canvas Fingerprinting**: Mowery, K., & Shacham, H. (2012). "Pixel Perfect: Fingerprinting Canvas in HTML5"
- **Browser Fingerprinting**: Eckersley, P. (2010). "How Unique Is Your Web Browser?" - EFF Panopticlick
- **Audio Fingerprinting**: Englehardt, S., & Narayanan, A. (2016). "Online tracking: A 1-million-site measurement and analysis"

### Inspiration
While this is an original implementation, the fingerprinting techniques are well-established in the field. Similar approaches can be found in:
- FingerprintJS / Fingerprint.com
- ClientJS
- Augur

All code in this library is original and independently implemented. See [CREDITS.md](CREDITS.md) for detailed attribution information.

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Changelog

### 1.0.0 (2026-02-19)
- Initial release
- Canvas, WebGL, and Audio fingerprinting
- 30+ device/browser characteristics
- SHA-256 hashing support
- Cross-browser compatibility
