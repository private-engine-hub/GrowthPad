Initial Analysis:
"Analyze this project structure and give me an overview of the codebase. Check if it follows best practices and identify any major architectural issues."
Code Quality Checks:
"Review the code quality across the project. Look for:
- Proper error handling and null safety
- Memory leaks or performance issues
- Hardcoded values that should be in config files
- TODO or FIXME comments that indicate unfinished work
- Deprecated APIs or packages
- Code duplication that should be refactored"
Security & API Review:
"Check for security issues:
- Exposed API keys or secrets in the code
- Proper HTTPS usage for all API calls
- Input validation and sanitization
- Secure storage of sensitive data
- Authentication token handling"
State Management & Architecture:
"Analyze the state management approach. Is it consistent throughout the app? Check for:
- Proper separation of business logic and UI
- Clean architecture implementation
- Dependency injection setup
- Proper use of providers/bloc/riverpod (whatever they're using)"
Production Readiness:
"Check if this app is production-ready:
- Environment configuration (dev/staging/prod)
- Proper logging implementation (not console.log everywhere)
- Build configurations for release mode
- ProGuard/R8 rules if applicable
- App signing configuration
- Version numbering in pubspec.yaml
- Analytics and crash reporting setup"
Testing:
"Review the test coverage:
- Are there unit tests for business logic?
- Widget tests for key UI components?
- Integration tests for critical user flows?
- What's the overall test coverage percentage?"
Performance & Optimization:
"Check for performance optimizations:
- Unnecessary rebuilds in widgets
- Proper use of const constructors
- Image optimization and caching
- List performance (using ListView.builder for long lists)
- Bundle size optimizations"
Dependencies Review:
"Analyze pubspec.yaml:
- Are all dependencies up to date?
- Any deprecated or abandoned packages?
- Security vulnerabilities in dependencies?
- Unnecessary dependencies that bloat the app?"
Platform-Specific Checks:
"Review platform-specific code:
- iOS: Info.plist permissions and configurations
- Android: AndroidManifest.xml permissions and configurations
- Proper handling of platform differences
- App icons and splash screens configured correctly"
Final Comprehensive Check:
"Give me a production readiness report with:
1. Critical issues that MUST be fixed before production
2. Important issues that SHOULD be fixed
3. Nice-to-have improvements
4. Overall assessment: Is this code production-ready?"