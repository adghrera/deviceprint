/**
 * DevicePrint - A JavaScript library for computing device fingerprints
 * @version 2.0.0
 *
 * Generated using AI
 *
 * This library implements fingerprinting techniques based on published research:
 * - Canvas fingerprinting (Mowery & Shacham, 2012)
 * - Browser fingerprinting research (Eckersley, 2010 - EFF Panopticlick)
 * - Audio fingerprinting (Englehardt & Narayanan, 2016)
 *
 * All code is original implementation based on these established techniques.
 */

(function (global) {
  "use strict";

  /**
   * Signal configuration presets
   */
  const SIGNAL_PRESETS = {
    // Fast, privacy-respecting signals (no permissions required)
    DEFAULT: [
      "userAgent",
      "language",
      "colorDepth",
      "screenResolution",
      "availableScreenResolution",
      "timezoneOffset",
      "timezone",
      "sessionStorage",
      "localStorage",
      "indexedDB",
      "platform",
      "doNotTrack",
      "plugins",
      "canvas",
      "webgl",
      "webglVendor",
      "cookieEnabled",
      "hardwareConcurrency",
      "deviceMemory",
    ],

    // Includes additional signals for better uniqueness
    EXTENDED: [
      "userAgent",
      "language",
      "colorDepth",
      "screenResolution",
      "availableScreenResolution",
      "timezoneOffset",
      "timezone",
      "sessionStorage",
      "localStorage",
      "indexedDB",
      "cpuClass",
      "platform",
      "doNotTrack",
      "plugins",
      "canvas",
      "webgl",
      "webglVendor",
      "adBlock",
      "hasLiedLanguages",
      "hasLiedResolution",
      "hasLiedOs",
      "hasLiedBrowser",
      "touchSupport",
      "fonts",
      "audio",
      "hardwareConcurrency",
      "deviceMemory",
      "cookieEnabled",
      "mediaPreferences",
      "localeInfo",
      "screenOrientation",
      "pointerInfo",
      "mathFingerprint",
      "mediaSupport",
      "extendedWebGL",
      "speechVoices",
    ],

    // All available signals (may request permissions)
    FULL: [
      "userAgent",
      "language",
      "colorDepth",
      "screenResolution",
      "availableScreenResolution",
      "timezoneOffset",
      "timezone",
      "sessionStorage",
      "localStorage",
      "indexedDB",
      "cpuClass",
      "platform",
      "doNotTrack",
      "plugins",
      "canvas",
      "webgl",
      "webglVendor",
      "adBlock",
      "hasLiedLanguages",
      "hasLiedResolution",
      "hasLiedOs",
      "hasLiedBrowser",
      "touchSupport",
      "fonts",
      "audio",
      "hardwareConcurrency",
      "deviceMemory",
      "cookieEnabled",
      "mediaPreferences",
      "localeInfo",
      "screenOrientation",
      "pointerInfo",
      "mathFingerprint",
      "mediaSupport",
      "extendedWebGL",
      "speechVoices",
      "networkInfo",
      "batteryInfo",
      "mediaDevices",
      "gamepads",
      "performanceMetrics",
      "permissions",
    ],
  };

  /**
   * Main DevicePrint class
   */
  class DevicePrint {
    /**
     * @param {Object} options - Configuration options
     * @param {String|Array} options.signals - Preset name ('DEFAULT', 'EXTENDED', 'FULL') or array of signal names
     * @param {Object} options.exclude - Signals to exclude from the preset
     */
    constructor(options = {}) {
      this.components = {};

      // Determine which signals to collect
      if (Array.isArray(options.signals)) {
        this.enabledSignals = options.signals;
      } else if (
        typeof options.signals === "string" &&
        SIGNAL_PRESETS[options.signals.toUpperCase()]
      ) {
        this.enabledSignals = SIGNAL_PRESETS[options.signals.toUpperCase()];
      } else {
        this.enabledSignals = SIGNAL_PRESETS.DEFAULT;
      }

      // Apply exclusions
      if (options.exclude && Array.isArray(options.exclude)) {
        this.enabledSignals = this.enabledSignals.filter(
          (s) => !options.exclude.includes(s),
        );
      }
    }

    /**
     * Generate a complete device fingerprint
     * @returns {Promise<object>} Device fingerprint components and hash
     */
    async generate() {
      await this.collectComponents();
      const hash = await this.computeHash();
      return {
        components: this.components,
        fingerprint: hash,
        signalsUsed: Object.keys(this.components),
      };
    }

    /**
     * Check if a signal is enabled
     */
    isSignalEnabled(signalName) {
      return this.enabledSignals.includes(signalName);
    }

    /**
     * Collect all fingerprint components based on enabled signals
     */
    async collectComponents() {
      this.components = {};

      // Collect each enabled signal
      const signalPromises = [];

      // Synchronous signals
      if (this.isSignalEnabled("userAgent"))
        this.components.userAgent = this.getUserAgent();
      if (this.isSignalEnabled("language"))
        this.components.language = this.getLanguage();
      if (this.isSignalEnabled("colorDepth"))
        this.components.colorDepth = this.getColorDepth();
      if (this.isSignalEnabled("screenResolution"))
        this.components.screenResolution = this.getScreenResolution();
      if (this.isSignalEnabled("availableScreenResolution"))
        this.components.availableScreenResolution =
          this.getAvailableScreenResolution();
      if (this.isSignalEnabled("timezoneOffset"))
        this.components.timezoneOffset = this.getTimezoneOffset();
      if (this.isSignalEnabled("timezone"))
        this.components.timezone = this.getTimezone();
      if (this.isSignalEnabled("sessionStorage"))
        this.components.sessionStorage = this.hasSessionStorage();
      if (this.isSignalEnabled("localStorage"))
        this.components.localStorage = this.hasLocalStorage();
      if (this.isSignalEnabled("indexedDB"))
        this.components.indexedDB = this.hasIndexedDB();
      if (this.isSignalEnabled("cpuClass"))
        this.components.cpuClass = this.getCpuClass();
      if (this.isSignalEnabled("platform"))
        this.components.platform = this.getPlatform();
      if (this.isSignalEnabled("doNotTrack"))
        this.components.doNotTrack = this.getDoNotTrack();
      if (this.isSignalEnabled("plugins"))
        this.components.plugins = this.getPlugins();
      if (this.isSignalEnabled("webgl"))
        this.components.webgl = this.getWebGLFingerprint();
      if (this.isSignalEnabled("webglVendor"))
        this.components.webglVendor = this.getWebGLVendor();
      if (this.isSignalEnabled("adBlock"))
        this.components.adBlock = this.getAdBlock();
      if (this.isSignalEnabled("hasLiedLanguages"))
        this.components.hasLiedLanguages = this.getHasLiedLanguages();
      if (this.isSignalEnabled("hasLiedResolution"))
        this.components.hasLiedResolution = this.getHasLiedResolution();
      if (this.isSignalEnabled("hasLiedOs"))
        this.components.hasLiedOs = this.getHasLiedOs();
      if (this.isSignalEnabled("hasLiedBrowser"))
        this.components.hasLiedBrowser = this.getHasLiedBrowser();
      if (this.isSignalEnabled("touchSupport"))
        this.components.touchSupport = this.getTouchSupport();
      if (this.isSignalEnabled("fonts"))
        this.components.fonts = this.getFonts();
      if (this.isSignalEnabled("hardwareConcurrency"))
        this.components.hardwareConcurrency = this.getHardwareConcurrency();
      if (this.isSignalEnabled("deviceMemory"))
        this.components.deviceMemory = this.getDeviceMemory();
      if (this.isSignalEnabled("cookieEnabled"))
        this.components.cookieEnabled = this.getCookieEnabled();
      if (this.isSignalEnabled("mediaPreferences"))
        this.components.mediaPreferences = this.getMediaPreferences();
      if (this.isSignalEnabled("localeInfo"))
        this.components.localeInfo = this.getLocaleInfo();
      if (this.isSignalEnabled("screenOrientation"))
        this.components.screenOrientation = this.getScreenOrientation();
      if (this.isSignalEnabled("pointerInfo"))
        this.components.pointerInfo = this.getPointerInfo();
      if (this.isSignalEnabled("mathFingerprint"))
        this.components.mathFingerprint = this.getMathFingerprint();
      if (this.isSignalEnabled("mediaSupport"))
        this.components.mediaSupport = this.getMediaSupport();
      if (this.isSignalEnabled("extendedWebGL"))
        this.components.extendedWebGL = this.getExtendedWebGLInfo();
      if (this.isSignalEnabled("speechVoices"))
        this.components.speechVoices = this.getSpeechVoices();
      if (this.isSignalEnabled("networkInfo"))
        this.components.networkInfo = this.getNetworkInfo();
      if (this.isSignalEnabled("gamepads"))
        this.components.gamepads = this.getGamepads();

      // Asynchronous signals
      if (this.isSignalEnabled("canvas")) {
        signalPromises.push(
          this.getCanvasFingerprint().then((r) => {
            this.components.canvas = r;
          }),
        );
      }
      if (this.isSignalEnabled("audio")) {
        signalPromises.push(
          this.getAudioFingerprint().then((r) => {
            this.components.audio = r;
          }),
        );
      }
      if (this.isSignalEnabled("batteryInfo")) {
        signalPromises.push(
          this.getBatteryInfo().then((r) => {
            this.components.batteryInfo = r;
          }),
        );
      }
      if (this.isSignalEnabled("mediaDevices")) {
        signalPromises.push(
          this.getMediaDevices().then((r) => {
            this.components.mediaDevices = r;
          }),
        );
      }
      if (this.isSignalEnabled("performanceMetrics")) {
        signalPromises.push(
          this.getPerformanceMetrics().then((r) => {
            this.components.performanceMetrics = r;
          }),
        );
      }
      if (this.isSignalEnabled("permissions")) {
        signalPromises.push(
          this.getPermissions().then((r) => {
            this.components.permissions = r;
          }),
        );
      }

      // Wait for all async signals
      await Promise.all(signalPromises);
    }

    /**
     * Compute hash from components
     */
    async computeHash() {
      const componentString = JSON.stringify(this.components);

      // Use SubtleCrypto if available
      if (window.crypto && window.crypto.subtle) {
        try {
          const encoder = new TextEncoder();
          const data = encoder.encode(componentString);
          const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        } catch (e) {
          // Fallback to simple hash
          return this.simpleHash(componentString);
        }
      }

      return this.simpleHash(componentString);
    }

    /**
     * Simple hash function fallback
     */
    simpleHash(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString(16);
    }

    /**
     * Get user agent string
     */
    getUserAgent() {
      return navigator.userAgent;
    }

    /**
     * Get browser language
     */
    getLanguage() {
      return (
        navigator.language ||
        navigator.userLanguage ||
        navigator.browserLanguage ||
        navigator.systemLanguage ||
        ""
      );
    }

    /**
     * Get color depth
     */
    getColorDepth() {
      return screen.colorDepth || -1;
    }

    /**
     * Get screen resolution
     */
    getScreenResolution() {
      return [screen.width, screen.height];
    }

    /**
     * Get available screen resolution
     */
    getAvailableScreenResolution() {
      return [screen.availWidth, screen.availHeight];
    }

    /**
     * Get timezone offset
     */
    getTimezoneOffset() {
      return new Date().getTimezoneOffset();
    }

    /**
     * Get timezone name
     */
    getTimezone() {
      try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      } catch (e) {
        return "";
      }
    }

    /**
     * Check if session storage is available
     */
    hasSessionStorage() {
      try {
        return !!window.sessionStorage;
      } catch (e) {
        return false;
      }
    }

    /**
     * Check if local storage is available
     */
    hasLocalStorage() {
      try {
        return !!window.localStorage;
      } catch (e) {
        return false;
      }
    }

    /**
     * Check if IndexedDB is available
     */
    hasIndexedDB() {
      try {
        return !!window.indexedDB;
      } catch (e) {
        return false;
      }
    }

    /**
     * Get CPU class
     */
    getCpuClass() {
      return navigator.cpuClass || "unknown";
    }

    /**
     * Get platform
     */
    getPlatform() {
      return navigator.platform || "unknown";
    }

    /**
     * Get Do Not Track setting
     */
    getDoNotTrack() {
      if (navigator.doNotTrack) {
        return navigator.doNotTrack;
      } else if (navigator.msDoNotTrack) {
        return navigator.msDoNotTrack;
      } else if (window.doNotTrack) {
        return window.doNotTrack;
      }
      return "unknown";
    }

    /**
     * Get installed plugins
     */
    getPlugins() {
      if (!navigator.plugins) {
        return [];
      }

      const plugins = [];
      for (let i = 0; i < navigator.plugins.length; i++) {
        const plugin = navigator.plugins[i];
        plugins.push({
          name: plugin.name,
          description: plugin.description,
          filename: plugin.filename,
        });
      }
      return plugins;
    }

    /**
     * Generate canvas fingerprint
     * Based on: Mowery & Shacham (2012) "Pixel Perfect: Fingerprinting Canvas in HTML5"
     */
    async getCanvasFingerprint() {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 200;
        canvas.height = 50;
        const ctx = canvas.getContext("2d");

        // Draw text
        ctx.textBaseline = "top";
        ctx.font = '14px "Arial"';
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = "#069";
        ctx.fillText("DevicePrint 🌐", 2, 15);
        ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
        ctx.fillText("DevicePrint 🌐", 4, 17);

        // Draw shapes
        ctx.beginPath();
        ctx.arc(50, 25, 20, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        return canvas.toDataURL();
      } catch (e) {
        return "not supported";
      }
    }

    /**
     * Get WebGL fingerprint
     */
    getWebGLFingerprint() {
      try {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        if (!gl) {
          return "not supported";
        }

        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        return debugInfo
          ? {
              vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
              renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
            }
          : "not available";
      } catch (e) {
        return "not supported";
      }
    }

    /**
     * Get WebGL vendor
     */
    getWebGLVendor() {
      try {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        if (!gl) {
          return "not supported";
        }

        return gl.getParameter(gl.VENDOR);
      } catch (e) {
        return "not supported";
      }
    }

    /**
     * Detect ad blocker
     */
    getAdBlock() {
      const testAd = document.createElement("div");
      testAd.innerHTML = "&nbsp;";
      testAd.className = "adsbox";
      testAd.style.position = "absolute";
      testAd.style.left = "-9999px";
      document.body.appendChild(testAd);

      const isBlocked = testAd.offsetHeight === 0;
      document.body.removeChild(testAd);

      return isBlocked;
    }

    /**
     * Check if languages are consistent
     */
    getHasLiedLanguages() {
      if (typeof navigator.languages !== "undefined") {
        try {
          const firstLanguages = navigator.languages[0].substr(0, 2);
          if (firstLanguages !== navigator.language.substr(0, 2)) {
            return true;
          }
        } catch (err) {
          return false;
        }
      }
      return false;
    }

    /**
     * Check if resolution is consistent
     */
    getHasLiedResolution() {
      return (
        screen.width < screen.availWidth || screen.height < screen.availHeight
      );
    }

    /**
     * Check if OS info is consistent
     */
    getHasLiedOs() {
      const userAgent = navigator.userAgent.toLowerCase();
      const oscpu = navigator.oscpu;
      const platform = navigator.platform.toLowerCase();

      if (oscpu) {
        const oscpuLower = oscpu.toLowerCase();
        if (oscpuLower.indexOf("win") >= 0 && platform.indexOf("win") < 0)
          return true;
        if (oscpuLower.indexOf("linux") >= 0 && platform.indexOf("linux") < 0)
          return true;
        if (oscpuLower.indexOf("mac") >= 0 && platform.indexOf("mac") < 0)
          return true;
      }

      return false;
    }

    /**
     * Check if browser info is consistent
     */
    getHasLiedBrowser() {
      const userAgent = navigator.userAgent.toLowerCase();
      const productSub = navigator.productSub;

      // Chrome check
      if (userAgent.indexOf("chrome") >= 0 && productSub !== "20030107") {
        return true;
      }

      // Firefox check
      if (userAgent.indexOf("firefox") >= 0 && productSub !== "20100101") {
        return true;
      }

      return false;
    }

    /**
     * Get touch support info
     */
    getTouchSupport() {
      let maxTouchPoints = 0;
      let touchEvent = false;

      if (typeof navigator.maxTouchPoints !== "undefined") {
        maxTouchPoints = navigator.maxTouchPoints;
      } else if (typeof navigator.msMaxTouchPoints !== "undefined") {
        maxTouchPoints = navigator.msMaxTouchPoints;
      }

      try {
        document.createEvent("TouchEvent");
        touchEvent = true;
      } catch (e) {
        // Not supported
      }

      const touchStart = "ontouchstart" in window;

      return {
        maxTouchPoints: maxTouchPoints,
        touchEvent: touchEvent,
        touchStart: touchStart,
      };
    }

    /**
     * Detect installed fonts
     * Uses standard font detection technique via canvas text measurement
     */
    getFonts() {
      const baseFonts = ["monospace", "sans-serif", "serif"];
      const testFonts = [
        "Arial",
        "Verdana",
        "Times New Roman",
        "Courier New",
        "Georgia",
        "Palatino",
        "Garamond",
        "Bookman",
        "Comic Sans MS",
        "Trebuchet MS",
        "Impact",
        "Arial Black",
        "Helvetica",
        "Tahoma",
        "Geneva",
      ];

      const testString = "mmmmmmmmmmlli";
      const testSize = "72px";
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const baseFontWidths = {};
      for (const baseFont of baseFonts) {
        ctx.font = testSize + " " + baseFont;
        baseFontWidths[baseFont] = ctx.measureText(testString).width;
      }

      const detectedFonts = [];
      for (const testFont of testFonts) {
        let detected = false;
        for (const baseFont of baseFonts) {
          ctx.font = testSize + " " + testFont + ", " + baseFont;
          const width = ctx.measureText(testString).width;
          if (width !== baseFontWidths[baseFont]) {
            detected = true;
            break;
          }
        }
        if (detected) {
          detectedFonts.push(testFont);
        }
      }

      return detectedFonts;
    }

    /**
     * Generate audio fingerprint
     * Based on: Englehardt & Narayanan (2016) audio context fingerprinting research
     */
    async getAudioFingerprint() {
      return new Promise((resolve) => {
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext;

          if (!AudioContext) {
            resolve("not supported");
            return;
          }

          const context = new AudioContext();
          const oscillator = context.createOscillator();
          const analyser = context.createAnalyser();
          const gainNode = context.createGain();
          const scriptProcessor = context.createScriptProcessor(4096, 1, 1);

          gainNode.gain.value = 0; // Mute
          oscillator.type = "triangle";
          oscillator.connect(analyser);
          analyser.connect(scriptProcessor);
          scriptProcessor.connect(gainNode);
          gainNode.connect(context.destination);

          scriptProcessor.onaudioprocess = function (event) {
            const output = event.outputBuffer.getChannelData(0);
            let fingerprint = 0;
            for (let i = 0; i < output.length; i++) {
              fingerprint += Math.abs(output[i]);
            }

            oscillator.stop();
            scriptProcessor.disconnect();
            analyser.disconnect();
            gainNode.disconnect();

            resolve(fingerprint.toString());
          };

          oscillator.start(0);
        } catch (e) {
          resolve("not supported");
        }
      });
    }

    /**
     * Get hardware concurrency (CPU cores)
     */
    getHardwareConcurrency() {
      return navigator.hardwareConcurrency || "unknown";
    }

    /**
     * Get device memory
     */
    getDeviceMemory() {
      return navigator.deviceMemory || "unknown";
    }

    /**
     * Check if cookies are enabled
     */
    getCookieEnabled() {
      return navigator.cookieEnabled;
    }

    /**
     * Get CSS media preferences (dark mode, reduced motion, etc.)
     */
    getMediaPreferences() {
      try {
        return {
          colorScheme: window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light",
          reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches,
          reducedTransparency: window.matchMedia(
            "(prefers-reduced-transparency: reduce)",
          ).matches,
          contrast: window.matchMedia("(prefers-contrast: high)").matches
            ? "high"
            : "normal",
          forcedColors: window.matchMedia("(forced-colors: active)").matches,
        };
      } catch (e) {
        return "not supported";
      }
    }

    /**
     * Get detailed locale information
     */
    getLocaleInfo() {
      try {
        return {
          languages: navigator.languages || [navigator.language],
          dateFormat: new Intl.DateTimeFormat().resolvedOptions(),
          numberFormat: new Intl.NumberFormat().resolvedOptions(),
          collation: new Intl.Collator().resolvedOptions(),
        };
      } catch (e) {
        return "not supported";
      }
    }

    /**
     * Get screen orientation
     */
    getScreenOrientation() {
      try {
        if (screen.orientation) {
          return {
            type: screen.orientation.type,
            angle: screen.orientation.angle,
          };
        }
        return "not supported";
      } catch (e) {
        return "not supported";
      }
    }

    /**
     * Get pointer capabilities
     */
    getPointerInfo() {
      try {
        return {
          pointerType: window.matchMedia("(pointer: fine)").matches
            ? "fine"
            : window.matchMedia("(pointer: coarse)").matches
              ? "coarse"
              : "none",
          hoverCapable: window.matchMedia("(hover: hover)").matches,
          anyPointer: window.matchMedia("(any-pointer: fine)").matches
            ? "fine"
            : "coarse",
          anyHover: window.matchMedia("(any-hover: hover)").matches,
        };
      } catch (e) {
        return "not supported";
      }
    }

    /**
     * Get math constants (may vary slightly across browsers/platforms)
     */
    getMathFingerprint() {
      return {
        pi: Math.PI,
        e: Math.E,
        ln2: Math.LN2,
        ln10: Math.LN10,
        log2e: Math.LOG2E,
        log10e: Math.LOG10E,
        sqrt1_2: Math.SQRT1_2,
        sqrt2: Math.SQRT2,
      };
    }

    /**
     * Get media codec support
     */
    getMediaSupport() {
      try {
        const video = document.createElement("video");
        const audio = document.createElement("audio");

        return {
          h264: video.canPlayType('video/mp4; codecs="avc1.42E01E"'),
          h265: video.canPlayType('video/mp4; codecs="hev1.1.6.L93.B0"'),
          webm: video.canPlayType('video/webm; codecs="vp8, vorbis"'),
          av1: video.canPlayType('video/mp4; codecs="av01.0.05M.08"'),
          ogg: audio.canPlayType('audio/ogg; codecs="vorbis"'),
          mp3: audio.canPlayType("audio/mpeg"),
          opus: audio.canPlayType('audio/ogg; codecs="opus"'),
        };
      } catch (e) {
        return "not supported";
      }
    }

    /**
     * Get extended WebGL parameters
     */
    getExtendedWebGLInfo() {
      try {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        if (!gl) return "not supported";

        const ext =
          gl.getExtension("EXT_texture_filter_anisotropic") ||
          gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") ||
          gl.getExtension("MOZ_EXT_texture_filter_anisotropic");

        return {
          aliasedLineWidthRange: Array.from(
            gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE),
          ),
          aliasedPointSizeRange: Array.from(
            gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE),
          ),
          maxAnisotropy: ext
            ? gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
            : null,
          maxCombinedTextureImageUnits: gl.getParameter(
            gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS,
          ),
          maxCubeMapTextureSize: gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE),
          maxFragmentUniformVectors: gl.getParameter(
            gl.MAX_FRAGMENT_UNIFORM_VECTORS,
          ),
          maxRenderbufferSize: gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),
          maxTextureImageUnits: gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS),
          maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
          maxVaryingVectors: gl.getParameter(gl.MAX_VARYING_VECTORS),
          maxVertexAttribs: gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
          maxVertexTextureImageUnits: gl.getParameter(
            gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS,
          ),
          maxVertexUniformVectors: gl.getParameter(
            gl.MAX_VERTEX_UNIFORM_VECTORS,
          ),
          maxViewportDims: Array.from(gl.getParameter(gl.MAX_VIEWPORT_DIMS)),
          shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
          extensions: gl.getSupportedExtensions() || [],
        };
      } catch (e) {
        return "not supported";
      }
    }

    /**
     * Get speech synthesis voices
     */
    getSpeechVoices() {
      try {
        if ("speechSynthesis" in window) {
          const voices = speechSynthesis.getVoices();
          return voices.map((v) => ({
            name: v.name,
            lang: v.lang,
            localService: v.localService,
          }));
        }
        return "not supported";
      } catch (e) {
        return "not supported";
      }
    }

    /**
     * Get network information
     */
    getNetworkInfo() {
      try {
        const conn =
          navigator.connection ||
          navigator.mozConnection ||
          navigator.webkitConnection;
        if (conn) {
          return {
            effectiveType: conn.effectiveType,
            downlink: conn.downlink,
            rtt: conn.rtt,
            saveData: conn.saveData,
          };
        }
        return "not supported";
      } catch (e) {
        return "not supported";
      }
    }

    /**
     * Get gamepad information
     */
    getGamepads() {
      try {
        if (!navigator.getGamepads) return "not supported";

        const gamepads = navigator.getGamepads();
        return Array.from(gamepads)
          .filter((g) => g)
          .map((g) => ({
            id: g.id,
            buttons: g.buttons.length,
            axes: g.axes.length,
          }));
      } catch (e) {
        return "not supported";
      }
    }

    /**
     * Get battery information (async)
     */
    async getBatteryInfo() {
      try {
        if ("getBattery" in navigator) {
          const battery = await navigator.getBattery();
          return {
            charging: battery.charging,
            level: Math.floor(battery.level * 100),
            chargingTime:
              battery.chargingTime === Infinity
                ? "Infinity"
                : battery.chargingTime,
            dischargingTime:
              battery.dischargingTime === Infinity
                ? "Infinity"
                : battery.dischargingTime,
          };
        }
        return "not supported";
      } catch (e) {
        return "not supported";
      }
    }

    /**
     * Get media devices count (async)
     */
    async getMediaDevices() {
      try {
        if (!navigator.mediaDevices?.enumerateDevices) {
          return "not supported";
        }

        const devices = await navigator.mediaDevices.enumerateDevices();
        return {
          audioInput: devices.filter((d) => d.kind === "audioinput").length,
          audioOutput: devices.filter((d) => d.kind === "audiooutput").length,
          videoInput: devices.filter((d) => d.kind === "videoinput").length,
        };
      } catch (e) {
        return "permission denied";
      }
    }

    /**
     * Get performance metrics (async)
     */
    async getPerformanceMetrics() {
      return new Promise((resolve) => {
        try {
          const start = performance.now();
          let iterations = 0;
          const endTime = start + 10; // 10ms benchmark

          while (performance.now() < endTime) {
            Math.sqrt(iterations++);
          }

          const result = {
            iterations,
            timing: performance.now() - start,
          };

          // Add memory info if available
          if (performance.memory) {
            result.memory = {
              jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
              totalJSHeapSize: performance.memory.totalJSHeapSize,
              usedJSHeapSize: performance.memory.usedJSHeapSize,
            };
          }

          resolve(result);
        } catch (e) {
          resolve("not supported");
        }
      });
    }

    /**
     * Get permissions status (async)
     */
    async getPermissions() {
      try {
        if (!navigator.permissions) return "not supported";

        const permNames = [
          "geolocation",
          "notifications",
          "microphone",
          "camera",
        ];
        const results = {};

        for (const perm of permNames) {
          try {
            const result = await navigator.permissions.query({ name: perm });
            results[perm] = result.state;
          } catch {
            results[perm] = "not available";
          }
        }

        return results;
      } catch (e) {
        return "not supported";
      }
    }
  }

  // Export signal presets for external use
  DevicePrint.PRESETS = SIGNAL_PRESETS;

  // Export for different module systems
  if (typeof module !== "undefined" && module.exports) {
    module.exports = DevicePrint;
  } else if (typeof define === "function" && define.amd) {
    define(function () {
      return DevicePrint;
    });
  } else {
    global.DevicePrint = DevicePrint;
  }
})(typeof window !== "undefined" ? window : this);
