# DevicePrint Test Suite

Comprehensive unit and integration tests for the DevicePrint library.

## Running the Tests

### Browser-Based Tests

1. Open `test.html` in your web browser:
   - **Direct**: Open `test/test.html` in any modern browser
   - **File URL**: `file:///path/to/deviceprint/test/test.html`
   - **Or use a local server**: 
     ```bash
     # Using Python
     python -m http.server 8000
     # Then open http://localhost:8000/test/test.html
     
     # Using Node.js
     npx http-server
     # Then open http://localhost:8080/test/test.html
     ```

2. Click **"Run All Tests"** to execute the complete test suite

3. View results:
   - **Green**: Tests passed ✅
   - **Red**: Tests failed ❌
   - **Duration**: Time taken for each test

## Test Coverage

The test suite includes **100+ tests** covering:

### Initialization Tests (4 tests)
- Class definition and instantiation
- Method availability
- Component initialization

### Browser Information Tests (5 tests)
- User agent detection
- Language identification
- Platform detection
- Cookie support
- Do Not Track settings

### Display Properties Tests (4 tests)
- Color depth
- Screen resolution
- Available screen resolution
- Resolution consistency checks

### Timezone Tests (2 tests)
- Timezone offset
- Timezone name (IANA)

### Storage Tests (3 tests)
- SessionStorage availability
- LocalStorage availability
- IndexedDB availability

### Hardware Tests (3 tests)
- Hardware concurrency (CPU cores)
- Device memory
- CPU class

### Plugin & Extension Tests (2 tests)
- Plugin detection
- Ad blocker detection

### Touch Support Tests (2 tests)
- Touch capability detection
- Touch properties validation

### Canvas Fingerprint Tests (2 tests)
- Canvas fingerprint generation
- Consistency verification

### WebGL Tests (2 tests)
- WebGL fingerprint generation
- WebGL vendor detection

### Font Detection Tests (2 tests)
- Font enumeration
- Consistency verification

### Audio Fingerprint Tests (2 tests)
- Audio context fingerprinting
- Type validation

### Consistency Check Tests (3 tests)
- Language consistency
- OS consistency
- Browser consistency

### Hash Generation Tests (4 tests)
- Simple hash function
- Hash consistency
- Hash uniqueness
- SHA-256 hashing

### Integration Tests (7 tests)
- Full fingerprint generation
- Result structure validation
- Component completeness
- Consistency across calls
- Instance independence

### Edge Cases & Error Handling (3 tests)
- Missing feature handling
- Empty component handling
- Special character handling

## Test Structure

### Test File Organization

```
test/
├── test.html      # Test runner UI
├── tests.js       # Test suite definitions
└── README.md      # This file
```

### Test Suite Format

Each test suite contains:
- **Name**: Category of tests
- **Tests**: Array of individual test cases

Each test has:
- **Name**: Description of what is being tested
- **Function**: Async test function that throws on failure

### Assertions

Available assertion helpers:
- `assert(condition, message)` - Basic assertion
- `assertEqual(actual, expected, message)` - Equality check
- `assertNotNull(value, message)` - Null check
- `assertType(value, type, message)` - Type check
- `assertArray(value, message)` - Array check
- `assertInstanceOf(value, constructor, message)` - Instance check

## Writing New Tests

Add new tests to `tests.js`:

```javascript
{
  name: 'Your Test Category',
  tests: [
    {
      name: 'Should do something specific',
      fn: async () => {
        const dp = new DevicePrint();
        const result = dp.someMethod();
        
        assert(result !== null, 'Result should not be null');
        assertType(result, 'string', 'Result should be a string');
      }
    }
  ]
}
```

## Features

- ✅ **Interactive UI**: Beautiful, user-friendly test runner
- ✅ **Real-time Results**: See tests pass/fail as they run
- ✅ **Progress Bar**: Visual progress indicator
- ✅ **Statistics**: Pass/fail counts and duration
- ✅ **Error Details**: Detailed error messages for failures
- ✅ **Retry Failed**: Re-run only failed tests
- ✅ **No Dependencies**: Pure JavaScript, no test framework required

## Browser Compatibility

Tests run in:
- ✅ Chrome/Edge 50+
- ✅ Firefox 45+
- ✅ Safari 10+
- ✅ Opera 37+

## Troubleshooting

### Tests Won't Run

**Problem**: "DevicePrint is not defined"
- **Solution**: Ensure the path to `../src/deviceprint.js` is correct in `test.html`

**Problem**: "Failed to load module script"
- **Solution**: Some browsers require a local server for ES6 modules. Use Python or Node.js http-server

### Tests Failing

**Problem**: Canvas/WebGL tests fail
- **Solution**: Some headless browsers don't support canvas/WebGL rendering

**Problem**: Audio tests timeout
- **Solution**: Audio context may require user interaction in some browsers

## Continuous Testing

For automated testing, consider integrating with:
- **Playwright**: `npm install -D @playwright/test`
- **Puppeteer**: `npm install -D puppeteer`
- **Selenium**: For cross-browser testing

Example Playwright test:

```javascript
const { test, expect } = require('@playwright/test');

test('DevicePrint generates fingerprint', async ({ page }) => {
  await page.goto('http://localhost:8000/test/test.html');
  await page.click('#runBtn');
  await page.waitForSelector('.stat-value.passed');
  
  const passed = await page.textContent('#passedCount');
  expect(parseInt(passed)).toBeGreaterThan(0);
});
```

## Contributing

When adding new features to DevicePrint:

1. ✅ Write tests first (TDD approach)
2. ✅ Ensure all existing tests pass
3. ✅ Add integration tests for new functionality
4. ✅ Document expected behavior

## License

Same as DevicePrint - MIT License
