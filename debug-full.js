const DevicePrint = require("./src/deviceprint.js");

// Mock browser environment for Node.js
global.window = {
  crypto: {
    subtle: {
      digest: async (algorithm, data) => {
        const crypto = require("crypto");
        return crypto.createHash("sha256").update(Buffer.from(data)).digest();
      },
    },
  },
};

global.navigator = {
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  language: "en-US",
  platform: "Win32",
  hardwareConcurrency: 8,
  deviceMemory: 8,
  cookieEnabled: true,
  doNotTrack: null,
  maxTouchPoints: 0,
  plugins: { length: 0 },
};

global.screen = {
  width: 1920,
  height: 1080,
  colorDepth: 24,
  availWidth: 1920,
  availHeight: 1040,
  orientation: { type: "landscape-primary" },
};

global.document = {
  createElement: () => ({
    getContext: () => null,
    style: {},
    innerHTML: "",
    className: "",
    offsetHeight: 0,
  }),
  body: {
    appendChild: () => {},
    removeChild: () => {},
  },
};

global.TextEncoder = require("util").TextEncoder;
global.performance = { now: () => Date.now() };
global.speechSynthesis = undefined;
// Intl is globally available in Node.js

async function debugFullPreset() {
  console.log("🧪 Debugging FULL Preset Stability\n");

  const results = [];

  // Generate fingerprint 3 times
  for (let i = 0; i < 3; i++) {
    const dp = new DevicePrint({ signals: "FULL" });
    const result = await dp.generate();
    results.push(result);

    console.log(`Iteration ${i + 1}:`);
    console.log(`  Fingerprint: ${result.fingerprint}`);
    console.log(`  Components: ${Object.keys(result.components).length}\n`);

    // Small delay
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Compare results
  console.log("📊 Comparison Analysis:\n");

  const allSame = results.every(
    (r) => r.fingerprint === results[0].fingerprint,
  );

  if (allSame) {
    console.log("✅ All fingerprints are IDENTICAL!\n");
  } else {
    console.log("❌ Fingerprints DIFFER!\n");

    // Find which components are changing
    const componentKeys = Object.keys(results[0].components);
    const changingComponents = [];

    for (const key of componentKeys) {
      const values = results.map((r) => JSON.stringify(r.components[key]));
      const allValuesMatch = values.every((v) => v === values[0]);

      if (!allValuesMatch) {
        changingComponents.push({
          key,
          values: results.map((r, i) => ({
            iteration: i + 1,
            value: r.components[key],
          })),
        });
      }
    }

    if (changingComponents.length > 0) {
      console.log("🔍 Changing Components:\n");
      for (const comp of changingComponents) {
        console.log(`  ${comp.key}:`);
        comp.values.forEach((v) => {
          console.log(
            `    Iteration ${v.iteration}: ${JSON.stringify(v.value)}`,
          );
        });
        console.log("");
      }
    } else {
      console.log(
        "⚠️  No individual components changed, but fingerprint hash differs",
      );
      console.log("    This indicates a key ordering issue\n");

      // Show component keys order for each iteration
      console.log("Component Keys Order:");
      results.forEach((r, i) => {
        console.log(
          `  Iteration ${i + 1}: ${Object.keys(r.components).length} keys`,
        );
      });
    }
  }

  // Show fingerprints
  console.log("\nFingerprints:");
  results.forEach((r, i) => {
    console.log(`  ${i + 1}: ${r.fingerprint}`);
  });
}

debugFullPreset().catch(console.error);
