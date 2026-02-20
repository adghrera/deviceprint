/**
 * DevicePrint Test Suite
 * Comprehensive unit and integration tests
 */

// Simple assertion helper
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected}, but got ${actual}`);
  }
}

function assertNotNull(value, message) {
  if (value === null || value === undefined) {
    throw new Error(message || "Value should not be null or undefined");
  }
}

function assertType(value, type, message) {
  if (typeof value !== type) {
    throw new Error(
      message || `Expected type ${type}, but got ${typeof value}`,
    );
  }
}

function assertArray(value, message) {
  if (!Array.isArray(value)) {
    throw new Error(message || "Expected an array");
  }
}

function assertInstanceOf(value, constructor, message) {
  if (!(value instanceof constructor)) {
    throw new Error(message || `Expected instance of ${constructor.name}`);
  }
}

// Test Suites
const testSuites = [
  {
    name: "Initialization Tests",
    tests: [
      {
        name: "DevicePrint class should be defined",
        fn: async () => {
          assert(
            typeof DevicePrint === "function",
            "DevicePrint should be a constructor function",
          );
        },
      },
      {
        name: "Should create a new instance",
        fn: async () => {
          const dp = new DevicePrint();
          assertInstanceOf(
            dp,
            DevicePrint,
            "Should be instance of DevicePrint",
          );
        },
      },
      {
        name: "Instance should have components object",
        fn: async () => {
          const dp = new DevicePrint();
          assertType(dp.components, "object", "Components should be an object");
        },
      },
      {
        name: "Instance should have generate method",
        fn: async () => {
          const dp = new DevicePrint();
          assertType(dp.generate, "function", "generate should be a function");
        },
      },
    ],
  },
  {
    name: "Browser Information Tests",
    tests: [
      {
        name: "getUserAgent should return a string",
        fn: async () => {
          const dp = new DevicePrint();
          const userAgent = dp.getUserAgent();
          assertType(userAgent, "string", "User agent should be a string");
          assert(userAgent.length > 0, "User agent should not be empty");
        },
      },
      {
        name: "getLanguage should return language code",
        fn: async () => {
          const dp = new DevicePrint();
          const language = dp.getLanguage();
          assertType(language, "string", "Language should be a string");
          assert(
            language.length >= 2,
            "Language code should be at least 2 characters",
          );
        },
      },
      {
        name: "getPlatform should return platform string",
        fn: async () => {
          const dp = new DevicePrint();
          const platform = dp.getPlatform();
          assertType(platform, "string", "Platform should be a string");
        },
      },
      {
        name: "getCookieEnabled should return boolean",
        fn: async () => {
          const dp = new DevicePrint();
          const cookieEnabled = dp.getCookieEnabled();
          assertType(
            cookieEnabled,
            "boolean",
            "Cookie enabled should be a boolean",
          );
        },
      },
      {
        name: "getDoNotTrack should return value",
        fn: async () => {
          const dp = new DevicePrint();
          const dnt = dp.getDoNotTrack();
          assertNotNull(dnt, "Do Not Track should not be null");
        },
      },
    ],
  },
  {
    name: "Display Properties Tests",
    tests: [
      {
        name: "getColorDepth should return number",
        fn: async () => {
          const dp = new DevicePrint();
          const colorDepth = dp.getColorDepth();
          assertType(colorDepth, "number", "Color depth should be a number");
          assert(colorDepth > 0, "Color depth should be positive");
        },
      },
      {
        name: "getScreenResolution should return array",
        fn: async () => {
          const dp = new DevicePrint();
          const resolution = dp.getScreenResolution();
          assertArray(resolution, "Screen resolution should be an array");
          assertEqual(
            resolution.length,
            2,
            "Resolution should have 2 elements",
          );
          assert(
            resolution[0] > 0 && resolution[1] > 0,
            "Resolution values should be positive",
          );
        },
      },
      {
        name: "getAvailableScreenResolution should return array",
        fn: async () => {
          const dp = new DevicePrint();
          const resolution = dp.getAvailableScreenResolution();
          assertArray(
            resolution,
            "Available screen resolution should be an array",
          );
          assertEqual(
            resolution.length,
            2,
            "Resolution should have 2 elements",
          );
        },
      },
      {
        name: "getHasLiedResolution should return boolean",
        fn: async () => {
          const dp = new DevicePrint();
          const hasLied = dp.getHasLiedResolution();
          assertType(
            hasLied,
            "boolean",
            "Has lied resolution should be a boolean",
          );
        },
      },
    ],
  },
  {
    name: "Timezone Tests",
    tests: [
      {
        name: "getTimezoneOffset should return number",
        fn: async () => {
          const dp = new DevicePrint();
          const offset = dp.getTimezoneOffset();
          assertType(offset, "number", "Timezone offset should be a number");
        },
      },
      {
        name: "getTimezone should return string",
        fn: async () => {
          const dp = new DevicePrint();
          const timezone = dp.getTimezone();
          assertType(timezone, "string", "Timezone should be a string");
        },
      },
    ],
  },
  {
    name: "Storage Tests",
    tests: [
      {
        name: "hasSessionStorage should return boolean",
        fn: async () => {
          const dp = new DevicePrint();
          const hasStorage = dp.hasSessionStorage();
          assertType(
            hasStorage,
            "boolean",
            "Session storage check should return boolean",
          );
        },
      },
      {
        name: "hasLocalStorage should return boolean",
        fn: async () => {
          const dp = new DevicePrint();
          const hasStorage = dp.hasLocalStorage();
          assertType(
            hasStorage,
            "boolean",
            "Local storage check should return boolean",
          );
        },
      },
      {
        name: "hasIndexedDB should return boolean",
        fn: async () => {
          const dp = new DevicePrint();
          const hasIDB = dp.hasIndexedDB();
          assertType(
            hasIDB,
            "boolean",
            "IndexedDB check should return boolean",
          );
        },
      },
    ],
  },
  {
    name: "Hardware Tests",
    tests: [
      {
        name: "getHardwareConcurrency should return value",
        fn: async () => {
          const dp = new DevicePrint();
          const concurrency = dp.getHardwareConcurrency();
          assert(
            concurrency !== null && concurrency !== undefined,
            "Hardware concurrency should have a value",
          );
        },
      },
      {
        name: "getDeviceMemory should return value",
        fn: async () => {
          const dp = new DevicePrint();
          const memory = dp.getDeviceMemory();
          assert(
            memory !== null && memory !== undefined,
            "Device memory should have a value",
          );
        },
      },
      {
        name: "getCpuClass should return string",
        fn: async () => {
          const dp = new DevicePrint();
          const cpuClass = dp.getCpuClass();
          assertType(cpuClass, "string", "CPU class should be a string");
        },
      },
    ],
  },
  {
    name: "Plugin & Extension Tests",
    tests: [
      {
        name: "getPlugins should return array",
        fn: async () => {
          const dp = new DevicePrint();
          const plugins = dp.getPlugins();
          assertArray(plugins, "Plugins should be an array");
        },
      },
      {
        name: "getAdBlock should return boolean",
        fn: async () => {
          const dp = new DevicePrint();
          const adBlock = dp.getAdBlock();
          assertType(
            adBlock,
            "boolean",
            "Ad block detection should return boolean",
          );
        },
      },
    ],
  },
  {
    name: "Touch Support Tests",
    tests: [
      {
        name: "getTouchSupport should return object",
        fn: async () => {
          const dp = new DevicePrint();
          const touchSupport = dp.getTouchSupport();
          assertType(
            touchSupport,
            "object",
            "Touch support should be an object",
          );
        },
      },
      {
        name: "Touch support should have required properties",
        fn: async () => {
          const dp = new DevicePrint();
          const touchSupport = dp.getTouchSupport();
          assert(
            "maxTouchPoints" in touchSupport,
            "Should have maxTouchPoints",
          );
          assert("touchEvent" in touchSupport, "Should have touchEvent");
          assert("touchStart" in touchSupport, "Should have touchStart");
        },
      },
    ],
  },
  {
    name: "Canvas Fingerprint Tests",
    tests: [
      {
        name: "getCanvasFingerprint should return value",
        fn: async () => {
          const dp = new DevicePrint();
          const canvas = await dp.getCanvasFingerprint();
          assertNotNull(canvas, "Canvas fingerprint should not be null");
        },
      },
      {
        name: "Canvas fingerprint should be consistent",
        fn: async () => {
          const dp = new DevicePrint();
          const canvas1 = await dp.getCanvasFingerprint();
          const canvas2 = await dp.getCanvasFingerprint();
          assertEqual(
            canvas1,
            canvas2,
            "Canvas fingerprint should be consistent",
          );
        },
      },
    ],
  },
  {
    name: "WebGL Tests",
    tests: [
      {
        name: "getWebGLFingerprint should return value",
        fn: async () => {
          const dp = new DevicePrint();
          const webgl = dp.getWebGLFingerprint();
          assertNotNull(webgl, "WebGL fingerprint should not be null");
        },
      },
      {
        name: "getWebGLVendor should return value",
        fn: async () => {
          const dp = new DevicePrint();
          const vendor = dp.getWebGLVendor();
          assertNotNull(vendor, "WebGL vendor should not be null");
        },
      },
    ],
  },
  {
    name: "Font Detection Tests",
    tests: [
      {
        name: "getFonts should return array",
        fn: async () => {
          const dp = new DevicePrint();
          const fonts = dp.getFonts();
          assertArray(fonts, "Fonts should be an array");
        },
      },
      {
        name: "Font detection should be consistent",
        fn: async () => {
          const dp = new DevicePrint();
          const fonts1 = dp.getFonts();
          const fonts2 = dp.getFonts();
          assertEqual(
            JSON.stringify(fonts1),
            JSON.stringify(fonts2),
            "Font detection should be consistent",
          );
        },
      },
    ],
  },
  {
    name: "Audio Fingerprint Tests",
    tests: [
      {
        name: "getAudioFingerprint should return value",
        fn: async () => {
          const dp = new DevicePrint();
          const audio = await dp.getAudioFingerprint();
          assertNotNull(audio, "Audio fingerprint should not be null");
        },
      },
      {
        name: "Audio fingerprint should be string",
        fn: async () => {
          const dp = new DevicePrint();
          const audio = await dp.getAudioFingerprint();
          assertType(audio, "string", "Audio fingerprint should be a string");
        },
      },
    ],
  },
  {
    name: "Consistency Check Tests",
    tests: [
      {
        name: "getHasLiedLanguages should return boolean",
        fn: async () => {
          const dp = new DevicePrint();
          const hasLied = dp.getHasLiedLanguages();
          assertType(
            hasLied,
            "boolean",
            "Has lied languages should be a boolean",
          );
        },
      },
      {
        name: "getHasLiedOs should return boolean",
        fn: async () => {
          const dp = new DevicePrint();
          const hasLied = dp.getHasLiedOs();
          assertType(hasLied, "boolean", "Has lied OS should be a boolean");
        },
      },
      {
        name: "getHasLiedBrowser should return boolean",
        fn: async () => {
          const dp = new DevicePrint();
          const hasLied = dp.getHasLiedBrowser();
          assertType(
            hasLied,
            "boolean",
            "Has lied browser should be a boolean",
          );
        },
      },
    ],
  },
  {
    name: "Hash Generation Tests",
    tests: [
      {
        name: "simpleHash should return string",
        fn: async () => {
          const dp = new DevicePrint();
          const hash = dp.simpleHash("test string");
          assertType(hash, "string", "Simple hash should return a string");
        },
      },
      {
        name: "simpleHash should be consistent",
        fn: async () => {
          const dp = new DevicePrint();
          const hash1 = dp.simpleHash("test string");
          const hash2 = dp.simpleHash("test string");
          assertEqual(
            hash1,
            hash2,
            "Simple hash should be consistent for same input",
          );
        },
      },
      {
        name: "simpleHash should differ for different inputs",
        fn: async () => {
          const dp = new DevicePrint();
          const hash1 = dp.simpleHash("string 1");
          const hash2 = dp.simpleHash("string 2");
          assert(
            hash1 !== hash2,
            "Simple hash should differ for different inputs",
          );
        },
      },
      {
        name: "computeHash should return string",
        fn: async () => {
          const dp = new DevicePrint();
          dp.components = { test: "value" };
          const hash = await dp.computeHash();
          assertType(hash, "string", "Compute hash should return a string");
          assert(hash.length > 0, "Hash should not be empty");
        },
      },
    ],
  },
  {
    name: "Integration Tests",
    tests: [
      {
        name: "generate should return result object",
        fn: async () => {
          const dp = new DevicePrint();
          const result = await dp.generate();
          assertType(result, "object", "Result should be an object");
        },
      },
      {
        name: "Result should have fingerprint property",
        fn: async () => {
          const dp = new DevicePrint();
          const result = await dp.generate();
          assert(
            "fingerprint" in result,
            "Result should have fingerprint property",
          );
          assertType(
            result.fingerprint,
            "string",
            "Fingerprint should be a string",
          );
          assert(
            result.fingerprint.length > 0,
            "Fingerprint should not be empty",
          );
        },
      },
      {
        name: "Result should have components property",
        fn: async () => {
          const dp = new DevicePrint();
          const result = await dp.generate();
          assert(
            "components" in result,
            "Result should have components property",
          );
          assertType(
            result.components,
            "object",
            "Components should be an object",
          );
        },
      },
      {
        name: "Components should have all expected properties",
        fn: async () => {
          const dp = new DevicePrint();
          const result = await dp.generate();
          const expectedProps = [
            "language",
            "colorDepth",
            "screenResolution",
            "platform",
            "timezone",
            "cookieEnabled",
            "hardwareConcurrency",
            "fonts",
            "touchSupport",
          ];

          for (const prop of expectedProps) {
            assert(
              prop in result.components,
              `Components should have ${prop} property`,
            );
          }
        },
      },
      {
        name: "Fingerprint should be consistent across calls",
        fn: async () => {
          const dp1 = new DevicePrint();
          const result1 = await dp1.generate();

          // Wait a bit
          await new Promise((resolve) => setTimeout(resolve, 100));

          const dp2 = new DevicePrint();
          const result2 = await dp2.generate();

          assertEqual(
            result1.fingerprint,
            result2.fingerprint,
            "Fingerprint should be consistent",
          );
        },
      },
      {
        name: "collectComponents should populate all components",
        fn: async () => {
          const dp = new DevicePrint();
          await dp.collectComponents();

          const componentCount = Object.keys(dp.components).length;
          assert(componentCount >= 15, "Should collect at least 15 components");
        },
      },
      {
        name: "Multiple instances should be independent",
        fn: async () => {
          const dp1 = new DevicePrint();
          const dp2 = new DevicePrint();

          dp1.components.test = "value1";

          assert(
            !("test" in dp2.components),
            "Instances should be independent",
          );
        },
      },
    ],
  },
  {
    name: "Edge Cases & Error Handling",
    tests: [
      {
        name: "Should handle missing browser features gracefully",
        fn: async () => {
          const dp = new DevicePrint();
          // These should not throw even if features are missing
          const result = await dp.generate();
          assertNotNull(result, "Should complete even with missing features");
        },
      },
      {
        name: "Empty components should still generate hash",
        fn: async () => {
          const dp = new DevicePrint();
          dp.components = {};
          const hash = await dp.computeHash();
          assertType(
            hash,
            "string",
            "Should generate hash for empty components",
          );
          assert(hash.length > 0, "Hash should not be empty");
        },
      },
      {
        name: "Should handle special characters in components",
        fn: async () => {
          const dp = new DevicePrint();
          dp.components = { test: "🌐 <>&\"'\\/" };
          const hash = await dp.computeHash();
          assertType(hash, "string", "Should handle special characters");
        },
      },
    ],
  },
  {
    name: "Configuration & Presets Tests",
    tests: [
      {
        name: "Should use DEFAULT preset by default",
        fn: async () => {
          const dp = new DevicePrint();
          assertArray(dp.enabledSignals, "Should have enabled signals array");
          assert(
            dp.enabledSignals.length > 0,
            "Should have some signals enabled",
          );
        },
      },
      {
        name: "Should accept DEFAULT preset by name",
        fn: async () => {
          const dp = new DevicePrint({ signals: "DEFAULT" });
          assertArray(dp.enabledSignals, "Should have enabled signals array");
          assert(
            dp.enabledSignals.includes("language"),
            "Should include language",
          );
          assert(
            !dp.enabledSignals.includes("userAgent"),
            "Should NOT include userAgent (stable preset)",
          );
        },
      },
      {
        name: "Should accept EXTENDED preset",
        fn: async () => {
          const dp = new DevicePrint({ signals: "EXTENDED" });
          assert(
            dp.enabledSignals.length > 20,
            "EXTENDED should have more signals",
          );
          assert(
            dp.enabledSignals.includes("mediaPreferences"),
            "Should include new signals",
          );
        },
      },
      {
        name: "Should accept FULL preset",
        fn: async () => {
          const dp = new DevicePrint({ signals: "FULL" });
          assert(
            dp.enabledSignals.includes("batteryInfo"),
            "FULL should include batteryInfo",
          );
          assert(
            dp.enabledSignals.includes("permissions"),
            "FULL should include permissions",
          );
        },
      },
      {
        name: "Should accept custom signal array",
        fn: async () => {
          const dp = new DevicePrint({
            signals: ["userAgent", "platform", "language"],
          });
          assertEqual(
            dp.enabledSignals.length,
            3,
            "Should have exactly 3 signals",
          );
          assert(
            dp.enabledSignals.includes("userAgent"),
            "Should include userAgent",
          );
          assert(
            !dp.enabledSignals.includes("canvas"),
            "Should not include canvas",
          );
        },
      },
      {
        name: "Should support exclude option",
        fn: async () => {
          const dp = new DevicePrint({
            signals: "DEFAULT",
            exclude: ["canvas", "webgl"],
          });
          assert(
            !dp.enabledSignals.includes("canvas"),
            "Should exclude canvas",
          );
          assert(!dp.enabledSignals.includes("webgl"), "Should exclude webgl");
          assert(
            dp.enabledSignals.includes("userAgent"),
            "Should still include others",
          );
        },
      },
      {
        name: "isSignalEnabled should work correctly",
        fn: async () => {
          const dp = new DevicePrint({ signals: ["userAgent", "platform"] });
          assert(
            dp.isSignalEnabled("userAgent"),
            "Should return true for enabled signal",
          );
          assert(
            !dp.isSignalEnabled("canvas"),
            "Should return false for disabled signal",
          );
        },
      },
      {
        name: "generate should include signalsUsed in result",
        fn: async () => {
          const dp = new DevicePrint({ signals: ["userAgent", "platform"] });
          const result = await dp.generate();
          assert("signalsUsed" in result, "Result should have signalsUsed");
          assertArray(result.signalsUsed, "signalsUsed should be an array");
        },
      },
      {
        name: "Should only collect enabled signals",
        fn: async () => {
          const dp = new DevicePrint({
            signals: ["userAgent", "platform", "language"],
          });
          await dp.collectComponents();

          const keys = Object.keys(dp.components);
          assert(keys.includes("userAgent"), "Should have userAgent");
          assert(keys.includes("platform"), "Should have platform");
          assert(!keys.includes("canvas"), "Should not have canvas");
        },
      },
    ],
  },
  {
    name: "New Signals Tests",
    tests: [
      {
        name: "getMediaPreferences should return object or not supported",
        fn: async () => {
          const dp = new DevicePrint();
          const result = dp.getMediaPreferences();
          assert(result !== null, "Should return a value");
        },
      },
      {
        name: "getLocaleInfo should return object",
        fn: async () => {
          const dp = new DevicePrint();
          const result = dp.getLocaleInfo();
          assert(result !== null, "Should return locale info");
        },
      },
      {
        name: "getScreenOrientation should return value",
        fn: async () => {
          const dp = new DevicePrint();
          const result = dp.getScreenOrientation();
          assertNotNull(result, "Should return orientation");
        },
      },
      {
        name: "getPointerInfo should return object",
        fn: async () => {
          const dp = new DevicePrint();
          const result = dp.getPointerInfo();
          assertType(result, "object", "Should return object");
        },
      },
      {
        name: "getMathFingerprint should return math constants",
        fn: async () => {
          const dp = new DevicePrint();
          const result = dp.getMathFingerprint();
          assertType(result, "object", "Should return object");
          assert("pi" in result, "Should have pi constant");
          assert("e" in result, "Should have e constant");
        },
      },
      {
        name: "getMediaSupport should return codec support",
        fn: async () => {
          const dp = new DevicePrint();
          const result = dp.getMediaSupport();
          assert(result !== null, "Should return media support info");
        },
      },
      {
        name: "getExtendedWebGLInfo should return extended info",
        fn: async () => {
          const dp = new DevicePrint();
          const result = dp.getExtendedWebGLInfo();
          assertNotNull(result, "Should return WebGL info");
        },
      },
      {
        name: "getSpeechVoices should return array or not supported (async)",
        fn: async () => {
          const dp = new DevicePrint();
          const result = await dp.getSpeechVoices();
          assert(result !== null, "Should return voices info");
        },
      },
      {
        name: "getNetworkInfo should return value",
        fn: async () => {
          const dp = new DevicePrint();
          const result = dp.getNetworkInfo();
          assertNotNull(result, "Should return network info");
        },
      },
      {
        name: "getGamepads should return array or not supported",
        fn: async () => {
          const dp = new DevicePrint();
          const result = dp.getGamepads();
          assertNotNull(result, "Should return gamepads info");
        },
      },
      {
        name: "getBatteryInfo should return value (async)",
        fn: async () => {
          const dp = new DevicePrint();
          const result = await dp.getBatteryInfo();
          assertNotNull(result, "Should return battery info");
        },
      },
      {
        name: "getMediaDevices should return value (async)",
        fn: async () => {
          const dp = new DevicePrint();
          const result = await dp.getMediaDevices();
          assertNotNull(result, "Should return media devices info");
        },
      },
      {
        name: "getPerformanceMetrics should return metrics (async)",
        fn: async () => {
          const dp = new DevicePrint();
          const result = await dp.getPerformanceMetrics();
          assertNotNull(result, "Should return performance metrics");
        },
      },
      {
        name: "getPermissions should return permissions (async)",
        fn: async () => {
          const dp = new DevicePrint();
          const result = await dp.getPermissions();
          assertNotNull(result, "Should return permissions info");
        },
      },
    ],
  },
  {
    name: "Preset Exports Tests",
    tests: [
      {
        name: "PRESETS should be exported",
        fn: async () => {
          assert(
            "PRESETS" in DevicePrint,
            "DevicePrint should have PRESETS property",
          );
          assertType(
            DevicePrint.PRESETS,
            "object",
            "PRESETS should be an object",
          );
        },
      },
      {
        name: "PRESETS should have DEFAULT",
        fn: async () => {
          assert(
            "DEFAULT" in DevicePrint.PRESETS,
            "Should have DEFAULT preset",
          );
          assertArray(
            DevicePrint.PRESETS.DEFAULT,
            "DEFAULT should be an array",
          );
        },
      },
      {
        name: "PRESETS should have EXTENDED",
        fn: async () => {
          assert(
            "EXTENDED" in DevicePrint.PRESETS,
            "Should have EXTENDED preset",
          );
          assertArray(
            DevicePrint.PRESETS.EXTENDED,
            "EXTENDED should be an array",
          );
        },
      },
      {
        name: "PRESETS should have FULL",
        fn: async () => {
          assert("FULL" in DevicePrint.PRESETS, "Should have FULL preset");
          assertArray(DevicePrint.PRESETS.FULL, "FULL should be an array");
        },
      },
      {
        name: "EXTENDED should have more signals than DEFAULT",
        fn: async () => {
          assert(
            DevicePrint.PRESETS.EXTENDED.length >
              DevicePrint.PRESETS.DEFAULT.length,
            "EXTENDED should have more signals than DEFAULT",
          );
        },
      },
      {
        name: "FULL should have more signals than EXTENDED",
        fn: async () => {
          assert(
            DevicePrint.PRESETS.FULL.length >
              DevicePrint.PRESETS.EXTENDED.length,
            "FULL should have more signals than EXTENDED",
          );
        },
      },
    ],
  },
];

console.log(
  `Test suite loaded: ${testSuites.length} suites, ${testSuites.reduce((sum, s) => sum + s.tests.length, 0)} tests`,
);
