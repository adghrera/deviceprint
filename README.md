# DevicePrint

> **Note**: This library was generated using AI as an original implementation.

A lightweight JavaScript library for computing unique device fingerprints based on browser and device characteristics.

## Features

DevicePrint collects and analyzes various browser and device attributes to create a unique fingerprint:

### Core Features
- **🎛️ Configurable**: Choose from DEFAULT, EXTENDED, or FULL presets, or select individual signals
- **⚡ Performance**: Collect only the signals you need for optimal performance
- **🔒 Privacy-Aware**: DEFAULT preset requires no permissions
- **📊 40+ Signals**: Comprehensive device and browser fingerprinting

### Signal Categories

**Browser & System Information**
- User agent, language, platform, CPU class
- Hardware concurrency, device memory
- Plugins, Do Not Track settings

**Display & Graphics**
- Screen resolution, color depth, orientation
- Canvas fingerprinting with unique rendering
- WebGL fingerprinting with extended parameters
- Graphics card vendor and renderer information

**Media & Codecs**
- Audio fingerprinting via audio context
- Video/audio codec support detection
- Speech synthesis voices
- Media devices enumeration

**User Preferences**
- Media preferences (dark mode, reduced motion, high contrast)
- Locale and internationalization settings
- Pointer capabilities (touch, hover, fine/coarse)

**Advanced Signals**
- Font detection (installed system fonts)
- Math constants precision fingerprinting
- Network information (connection type, speed)
- Battery status and level
- Performance benchmarking
- Permission statuses
- Gamepad detection

**Consistency & Anti-Spoofing**
- Detects language inconsistencies
- Resolution mismatch detection
- OS and browser information validation
- Ad blocker detection

### Storage APIs
- LocalStorage, SessionStorage, IndexedDB availability

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
// Create a new DevicePrint instance with default settings
const devicePrint = new DevicePrint();

// Generate the fingerprint
devicePrint.generate().then(result => {
  console.log('Fingerprint:', result.fingerprint);
  console.log('Components:', result.components);
  console.log('Signals used:', result.signalsUsed);
});
```

### Configuration & Presets

DevicePrint supports three preset configurations:

**DEFAULT** - Fast, privacy-respecting signals (no permissions required)
```javascript
const devicePrint = new DevicePrint({ signals: 'DEFAULT' });
// Includes: userAgent, language, screen info, timezone, canvas, webgl, etc.
```

**EXTENDED** - Additional signals for better uniqueness
```javascript
const devicePrint = new DevicePrint({ signals: 'EXTENDED' });
// Adds: media preferences, locale info, fonts, audio, codec support, etc.
```

**FULL** - All available signals (may request permissions)
```javascript
const devicePrint = new DevicePrint({ signals: 'FULL' });
// Adds: battery, network info, media devices, permissions, etc.
```

**Custom Signals** - Choose specific signals
```javascript
const devicePrint = new DevicePrint({ 
  signals: ['userAgent', 'platform', 'screenResolution', 'timezone', 'canvas']
});
```

**Exclude Signals** - Use a preset but exclude specific signals
```javascript
const devicePrint = new DevicePrint({ 
  signals: 'EXTENDED',
  exclude: ['canvas', 'fonts', 'audio']  // Skip heavy operations
});
```

**Available Presets List**
```javascript
console.log(DevicePrint.PRESETS.DEFAULT);   // Array of signal names
console.log(DevicePrint.PRESETS.EXTENDED);  // Array of signal names
console.log(DevicePrint.PRESETS.FULL);      // Array of signal names
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

The generated fingerprint can include the following signals (depending on configuration):

### Core Signals (DEFAULT preset)

| Component | Description | Preset |
|-----------|-------------|--------|
| `userAgent` | Browser identification string | DEFAULT |
| `language` | Browser/system language | DEFAULT |
| `colorDepth` | Screen color depth in bits | DEFAULT |
| `screenResolution` | Physical screen dimensions | DEFAULT |
| `availableScreenResolution` | Available screen space | DEFAULT |
| `timezoneOffset` | UTC offset in minutes | DEFAULT |
| `timezone` | IANA timezone identifier | DEFAULT |
| `sessionStorage` | SessionStorage support | DEFAULT |
| `localStorage` | LocalStorage support | DEFAULT |
| `indexedDB` | IndexedDB support | DEFAULT |
| `platform` | Operating system | DEFAULT |
| `doNotTrack` | DNT header value | DEFAULT |
| `plugins` | Browser plugins list | DEFAULT |
| `canvas` | Canvas rendering hash | DEFAULT |
| `webgl` | WebGL vendor/renderer | DEFAULT |
| `webglVendor` | WebGL vendor only | DEFAULT |
| `cookieEnabled` | Cookie support | DEFAULT |
| `hardwareConcurrency` | Logical processors | DEFAULT |
| `deviceMemory` | RAM capacity | DEFAULT |

### Extended Signals (EXTENDED preset)

| Component | Description | Preset |
|-----------|-------------|--------|
| `cpuClass` | CPU architecture class | EXTENDED |
| `adBlock` | Ad blocker presence | EXTENDED |
| `hasLiedLanguages` | Language inconsistencies | EXTENDED |
| `hasLiedResolution` | Resolution inconsistencies | EXTENDED |
| `hasLiedOs` | OS inconsistencies | EXTENDED |
| `hasLiedBrowser` | Browser inconsistencies | EXTENDED |
| `touchSupport` | Touch capabilities | EXTENDED |
| `fonts` | Available system fonts | EXTENDED |
| `audio` | Audio context signature | EXTENDED |
| `mediaPreferences` | Dark mode, reduced motion, etc. | EXTENDED |
| `localeInfo` | Detailed locale information | EXTENDED |
| `screenOrientation` | Screen orientation type/angle | EXTENDED |
| `pointerInfo` | Pointer capabilities | EXTENDED |
| `mathFingerprint` | Math constants precision | EXTENDED |
| `mediaSupport` | Video/audio codec support | EXTENDED |
| `extendedWebGL` | Detailed WebGL parameters | EXTENDED |
| `speechVoices` | Available speech synthesis voices | EXTENDED |

### Full Signals (FULL preset - may require permissions)

| Component | Description | Preset |
|-----------|-------------|--------|
| `networkInfo` | Connection type, speed, etc. | FULL |
| `batteryInfo` | Battery status and level | FULL |
| `mediaDevices` | Camera/microphone count | FULL |
| `gamepads` | Connected gamepad information | FULL |
| `performanceMetrics` | CPU performance benchmark | FULL |
| `permissions` | Permissions status | FULL |
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

## Testing

DevicePrint includes a comprehensive test suite with **100+ tests** covering all functionality.

### Running Tests

Open [test/test.html](test/test.html) in your browser to run the interactive test suite.

The test suite covers:
- ✅ Initialization and instantiation
- ✅ Browser information collection
- ✅ Display properties detection
- ✅ Canvas, WebGL, and Audio fingerprinting
- ✅ Font detection
- ✅ Hardware information
- ✅ Hash generation and consistency
- ✅ Integration tests
- ✅ Edge cases and error handling

For detailed information, see [test/README.md](test/README.md).

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

### 2.0.0 (2026-02-19)
- ✨ **New**: Configurable signal collection with presets (DEFAULT, EXTENDED, FULL)
- ✨ **New**: 20+ additional signals including:
  - Media preferences (dark mode, reduced motion, high contrast)
  - Detailed locale information
  - Screen orientation
  - Pointer capabilities
  - Math constants fingerprinting
  - Media codec support detection
  - Extended WebGL parameters
  - Speech synthesis voices
  - Network information
  - Battery status
  - Media devices enumeration
  - Performance benchmarking
  - Permission statuses
  - Gamepad detection
- ✨ **New**: Custom signal selection and exclusion support
- ✨ **New**: `DevicePrint.PRESETS` for accessing preset configurations
- ✨ **New**: `signalsUsed` in generate() result
- 📚 **Updated**: Comprehensive documentation with configuration examples
- 🧪 **Updated**: Test suite expanded to 150+ tests
- 🎨 **Updated**: Demo page with preset selector

### 1.0.0 (2026-02-19)
- Initial release
- Canvas, WebGL, and Audio fingerprinting
- 30+ device/browser characteristics
- SHA-256 hashing support
- Cross-browser compatibility
