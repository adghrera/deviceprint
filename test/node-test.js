#!/usr/bin/env node
/**
 * Simple Node.js test runner for basic DevicePrint tests
 * Note: Some browser-specific features won't work in Node.js
 * For full testing, use test/test.html in a browser
 */

const assert = require("assert");

// Mock browser APIs for Node.js environment
global.window = {
  sessionStorage: {},
  localStorage: {},
  indexedDB: {},
  crypto: {
    subtle: null, // Will use fallback hash
  },
};

global.document = {
  createElement: (tag) => {
    const element = {
      getContext: () => ({
        font: "",
        textBaseline: "",
        fillStyle: "",
        fillRect: () => {},
        fillText: () => {},
        beginPath: () => {},
        arc: () => {},
        closePath: () => {},
        fill: () => {},
        measureText: (text) => ({ width: text.length * 8 }),
      }),
      toDataURL: () => "data:image/png;base64,mock",
      style: {},
      className: "",
      innerHTML: "",
      appendChild: () => {},
      offsetHeight: 0,
      width: 200,
      height: 50,
    };
    return element;
  },
  body: {
    appendChild: () => {},
    removeChild: () => {},
  },
  createEvent: () => {
    throw new Error("TouchEvent not supported");
  },
};

global.navigator = {
  userAgent: "Node.js Test Runner",
  language: "en-US",
  platform: "Node",
  hardwareConcurrency: 4,
  deviceMemory: 8,
  get cookieEnabled() {
    return true;
  },
  doNotTrack: null,
  plugins: [],
};

global.screen = {
  width: 1920,
  height: 1080,
  availWidth: 1920,
  availHeight: 1040,
  colorDepth: 24,
};

global.Intl = require("util").types;

// Load the library
const DevicePrint = require("../src/deviceprint.js");

console.log("🧪 Running DevicePrint Node.js Tests\n");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`✅ ${name}`);
  } catch (error) {
    failed++;
    console.log(`❌ ${name}`);
    console.log(`   Error: ${error.message}\n`);
  }
}

// Run basic tests
test("DevicePrint class should be defined", () => {
  assert(typeof DevicePrint === "function");
});

test("Should create a new instance", () => {
  const dp = new DevicePrint();
  assert(dp instanceof DevicePrint);
});

test("Instance should have components object", () => {
  const dp = new DevicePrint();
  assert(typeof dp.components === "object");
});

test("getUserAgent should return a string", () => {
  const dp = new DevicePrint();
  const ua = dp.getUserAgent();
  assert(typeof ua === "string");
  assert(ua.length > 0);
});

test("getLanguage should return a string", () => {
  const dp = new DevicePrint();
  const lang = dp.getLanguage();
  assert(typeof lang === "string");
});

test("getColorDepth should return a number", () => {
  const dp = new DevicePrint();
  const depth = dp.getColorDepth();
  assert(typeof depth === "number");
});

test("getScreenResolution should return array", () => {
  const dp = new DevicePrint();
  const res = dp.getScreenResolution();
  assert(Array.isArray(res));
  assert(res.length === 2);
});

test("getPlatform should return a string", () => {
  const dp = new DevicePrint();
  const platform = dp.getPlatform();
  assert(typeof platform === "string");
});

test("getCookieEnabled should return a value", () => {
  const dp = new DevicePrint();
  const enabled = dp.getCookieEnabled();
  // In Node.js mock environment, this might return undefined, true, or false
  assert(
    enabled === undefined || typeof enabled === "boolean",
    "Should return boolean or undefined in Node.js",
  );
});

test("hasSessionStorage should return a boolean", () => {
  const dp = new DevicePrint();
  const has = dp.hasSessionStorage();
  assert(typeof has === "boolean");
});

test("hasLocalStorage should return a boolean", () => {
  const dp = new DevicePrint();
  const has = dp.hasLocalStorage();
  assert(typeof has === "boolean");
});

test("simpleHash should return a string", () => {
  const dp = new DevicePrint();
  const hash = dp.simpleHash("test");
  assert(typeof hash === "string");
  assert(hash.length > 0);
});

test("simpleHash should be consistent", () => {
  const dp = new DevicePrint();
  const hash1 = dp.simpleHash("test");
  const hash2 = dp.simpleHash("test");
  assert(hash1 === hash2);
});

test("simpleHash should differ for different inputs", () => {
  const dp = new DevicePrint();
  const hash1 = dp.simpleHash("test1");
  const hash2 = dp.simpleHash("test2");
  assert(hash1 !== hash2);
});

test("getHardwareConcurrency should return value", () => {
  const dp = new DevicePrint();
  const hc = dp.getHardwareConcurrency();
  assert(hc !== null && hc !== undefined);
});

test("getTouchSupport should return object", () => {
  const dp = new DevicePrint();
  const touch = dp.getTouchSupport();
  assert(typeof touch === "object");
});

test("getPlugins should return array", () => {
  const dp = new DevicePrint();
  const plugins = dp.getPlugins();
  assert(Array.isArray(plugins));
});

// Async tests
async function runAsyncTests() {
  console.log("\n🔄 Running async tests...\n");

  try {
    const dp = new DevicePrint();
    const result = await dp.generate();

    assert(typeof result === "object", "generate should return object");
    passed++;
    console.log("✅ generate should return object");

    assert("fingerprint" in result, "result should have fingerprint");
    passed++;
    console.log("✅ result should have fingerprint");

    assert(
      typeof result.fingerprint === "string",
      "fingerprint should be string",
    );
    passed++;
    console.log("✅ fingerprint should be string");

    assert(result.fingerprint.length > 0, "fingerprint should not be empty");
    passed++;
    console.log("✅ fingerprint should not be empty");

    assert("components" in result, "result should have components");
    passed++;
    console.log("✅ result should have components");

    const componentCount = Object.keys(result.components).length;
    assert(componentCount > 0, "should have components");
    passed++;
    console.log(`✅ should have components (${componentCount} collected)`);
  } catch (error) {
    failed++;
    console.log(`❌ Async test failed: ${error.message}\n`);
  }

  // Print summary
  console.log("\n" + "=".repeat(50));
  console.log(`📊 Test Results: ${passed} passed, ${failed} failed`);
  console.log("=".repeat(50) + "\n");

  if (failed > 0) {
    console.log("❌ Some tests failed");
    process.exit(1);
  } else {
    console.log("✅ All tests passed!");
    console.log(
      "\n💡 For comprehensive browser-based tests, run: test/test.html\n",
    );
    process.exit(0);
  }
}

// Run async tests after sync tests
runAsyncTests();
