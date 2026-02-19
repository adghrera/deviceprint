# Credits and Attribution

## AI Generation Notice

**This library was generated using AI** (GitHub Copilot with Claude Sonnet 4.5) in February 2026.

## Implementation

This library is an **original implementation** created specifically for this project. All source code was written from scratch and is not copied from any existing open-source library.

## Fingerprinting Techniques

The fingerprinting methods used in this library are based on **publicly documented research** and **industry-standard techniques**:

### Academic Research

1. **Canvas Fingerprinting**
   - Paper: Mowery, K., & Shacham, H. (2012). "Pixel Perfect: Fingerprinting Canvas in HTML5"
   - Conference: IEEE Symposium on Security and Privacy
   - Technique: Uses canvas rendering inconsistencies across devices

2. **Browser Fingerprinting**
   - Paper: Eckersley, P. (2010). "How Unique Is Your Web Browser?"
   - Organization: Electronic Frontier Foundation (EFF)
   - Project: Panopticlick
   - Technique: Combines multiple browser attributes for uniqueness

3. **Audio Context Fingerprinting**
   - Paper: Englehardt, S., & Narayanan, A. (2016). "Online tracking: A 1-million-site measurement and analysis"
   - Conference: ACM CCS
   - Technique: Audio signal processing differences

### Standard Web APIs Used

All fingerprinting is accomplished using standard, documented Web APIs:
- Canvas API (HTML5)
- WebGL API
- Web Audio API
- Navigator interface
- Screen interface
- Intl API

## Similar Projects

While this implementation is original, these open-source projects implement similar fingerprinting techniques:

- **FingerprintJS** (fingerprintjs.com) - Most popular commercial solution
- **Fingerprintjs2** - Open-source predecessor
- **ClientJS** - Lightweight fingerprinting library
- **Augur** - Another fingerprinting library

## Why Similar?

Fingerprinting techniques are **convergent** - there are only so many ways to:
- Read browser/device properties
- Generate canvas signatures
- Detect fonts
- Access hardware information

The **standard approaches** are well-documented and widely known. What differs between implementations is:
- Code structure and organization
- API design
- Additional features
- Performance optimizations
- Browser compatibility handling

## License

This implementation is released under the MIT License, making it free for commercial and non-commercial use.

## Transparency

This document exists to ensure transparency about:
- What is original code (all of it)
- What are established techniques (fingerprinting methods)
- What research inspired the implementation
- How this relates to other projects

If you have questions about the implementation or attribution, please open an issue.
