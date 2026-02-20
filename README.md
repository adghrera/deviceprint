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

**DEFAULT** - Stable signals that persist across browser/driver updates (21 signals)
```javascript
const devicePrint = new DevicePrint({ signals: 'DEFAULT' });
// Includes: language, screen info, timezone, fonts, hardware, user preferences
// EXCLUDES: userAgent, canvas, webgl (version-sensitive signals)
// ✅ Best for: Long-term device tracking across updates
```

**EXTENDED** - Adds version-sensitive signals for better uniqueness (37 signals)
```javascript
const devicePrint = new DevicePrint({ signals: 'EXTENDED' });
// Adds: userAgent, canvas, webgl, audio, plugins, codec support
// ⚠️  May change when: Browser or GPU drivers are updated
// ✅ Best for: Maximum uniqueness without permissions
```

**FULL** - All available signals including dynamic data (43 signals)
```javascript
const devicePrint = new DevicePrint({ signals: 'FULL' });
// Adds: battery, network info, media devices, permissions
// ⚠️  May request permissions and include time-varying data
// ✅ Best for: Comprehensive fingerprinting with user consent
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

### Stable Signals (DEFAULT preset) - 21 signals

**These signals remain consistent across browser/driver updates:**

| Component | Description | Why Stable |
|-----------|-------------|------------|
| `language` | Browser/system language | User preference |
| `colorDepth` | Screen color depth in bits | Hardware |
| `screenResolution` | Physical screen dimensions | Hardware |
| `availableScreenResolution` | Available screen space | Hardware |
| `timezoneOffset` | UTC offset in minutes | Location |
| `timezone` | IANA timezone identifier | Location |
| `sessionStorage` | SessionStorage support | Feature detection |
| `localStorage` | LocalStorage support | Feature detection |
| `indexedDB` | IndexedDB support | Feature detection |
| `platform` | Operating system | System |
| `doNotTrack` | DNT header value | User preference |
| `cookieEnabled` | Cookie support | User preference |
| `hardwareConcurrency` | Logical processors | Hardware |
| `deviceMemory` | RAM capacity | Hardware |
| `touchSupport` | Touch capabilities | Hardware |
| `fonts` | Available system fonts | Installed fonts |
| `localeInfo` | Detailed locale information | System settings |
| `screenOrientation` | Screen orientation type | Hardware |
| `mathFingerprint` | Math constants precision | System/architecture |
| `mediaPreferences` | Dark mode, reduced motion | User preferences |
| `pointerInfo` | Pointer capabilities | Hardware |

### Version-Sensitive Signals (EXTENDED preset adds 16 more)

**These signals may change when browser/drivers are updated:**

| Component | Description | Changes When |
|-----------|-------------|-------------|
| `userAgent` | Browser identification string | Browser updates |
| `plugins` | Browser plugins list | Browser updates |
| `canvas` | Canvas rendering hash | Browser/GPU driver updates |
| `webgl` | WebGL vendor/renderer | GPU driver updates |
| `webglVendor` | WebGL vendor only | GPU driver updates |
| `audio` | Audio context signature | Browser/audio driver updates |
| `cpuClass` | CPU architecture class | Rare |
| `adBlock` | Ad blocker presence | Extension changes |
| `hasLiedLanguages` | Language inconsistencies | Spoofing detection |
| `hasLiedResolution` | Resolution inconsistencies | Spoofing detection |
| `hasLiedOs` | OS inconsistencies | Spoofing detection |
| `hasLiedBrowser` | Browser inconsistencies | Spoofing detection |
| `mediaSupport` | Video/audio codec support | Browser updates |
| `extendedWebGL` | Detailed WebGL parameters | GPU driver updates |
| `speechVoices` | Available speech synthesis voices | OS/browser updates |

### Dynamic/Permission Signals (FULL preset adds 6 more)

**These signals may require permissions or vary over time:**

| Component | Description | Notes |
|-----------|-------------|-------|
| `networkInfo` | Connection type (WiFi/4G/5G) | Changes with network |
| `batteryInfo` | Battery charging status | May request permission |
| `mediaDevices` | Camera/microphone count | Requires permission |
| `gamepads` | Connected gamepad information | Changes when devices connect |
| `performanceMetrics` | Hardware limits | Stable system info |
| `permissions` | Permissions status | Permission-dependent |

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
