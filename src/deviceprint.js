/**
 * DevicePrint - A JavaScript library for computing device fingerprints
 * @version 1.0.0
 *
 * Generated using AI: GitHub Copilot with Claude Sonnet 4.5
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
   * Main DevicePrint class
   */
  class DevicePrint {
    constructor() {
      this.components = {};
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
      };
    }

    /**
     * Collect all fingerprint components
     */
    async collectComponents() {
      this.components = {
        userAgent: this.getUserAgent(),
        language: this.getLanguage(),
        colorDepth: this.getColorDepth(),
        screenResolution: this.getScreenResolution(),
        availableScreenResolution: this.getAvailableScreenResolution(),
        timezoneOffset: this.getTimezoneOffset(),
        timezone: this.getTimezone(),
        sessionStorage: this.hasSessionStorage(),
        localStorage: this.hasLocalStorage(),
        indexedDB: this.hasIndexedDB(),
        cpuClass: this.getCpuClass(),
        platform: this.getPlatform(),
        doNotTrack: this.getDoNotTrack(),
        plugins: this.getPlugins(),
        canvas: await this.getCanvasFingerprint(),
        webgl: this.getWebGLFingerprint(),
        webglVendor: this.getWebGLVendor(),
        adBlock: this.getAdBlock(),
        hasLiedLanguages: this.getHasLiedLanguages(),
        hasLiedResolution: this.getHasLiedResolution(),
        hasLiedOs: this.getHasLiedOs(),
        hasLiedBrowser: this.getHasLiedBrowser(),
        touchSupport: this.getTouchSupport(),
        fonts: this.getFonts(),
        audio: await this.getAudioFingerprint(),
        hardwareConcurrency: this.getHardwareConcurrency(),
        deviceMemory: this.getDeviceMemory(),
        cookieEnabled: this.getCookieEnabled(),
      };
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
  }

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
