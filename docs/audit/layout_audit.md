# Audit Analysis: Layout Regression in Workboard

**Issue**: The "Card-Cascade" accordions are displaying as vertical rows instead of a 3-column grid on the Web (`localhost:3000`).

## 1. Architecture Review
The project uses a "Universal Monorepo" architecture:
- **Web**: Next.js 13 (App Router) + React Native Web
- **Mobile**: Expo + React Native
- **Styling**: NativeWind v4 (Tailwind CSS)

This architecture IS designed to support shared layouts. The standard `flex-row` utility *should* translate to `flex-direction: row` on both platforms.

## 2. Root Cause Analysis
We observed that even applying `style={{ flexDirection: 'row' }}` inline failed to produce a horizontal layout. 

### Potential Culprits:
1.  **React Native Web Defaults**: `View` components have extremely high specificity for their default `flex-direction: column`.
2.  **Container Constraints**: The parent `ScrollView` (vertical) might be enforcing a narrow width on its content container, causing the flex children to wrap.
3.  **Tailwind Configuration**: If `nativewind` isn't correctly injecting the utility classes into the Next.js CSS bundle, the `className="flex-row"` would do nothing. However, since colors like `bg-blue-600` are working, **Tailwind is compiling**.

### Diagnosis
The issue is isolated to **`ScrollView` behavior on Web**. 
- **Evidence**: `Sidebar` (which uses `View`) correctly respects `flex-row`. `Workboard` (which uses `ScrollView`) ignores `flex-row` and `!flex-row`.
- **Reason**: React Native Web's `ScrollView` injects an inner content wrapping `div` that defaults to `flex-direction: column`. Tailwind classes on the *child* View do not affect this inner wrapper, and `contentContainerStyle` on the ScrollView often faces specificity battles with the atomic CSS.

## 3. Recommended Fix
To achieve a "Universal" solution without ejecting to hardcoded `div`s:
1.  **Platform Split**: Use `Platform.select` to render a standard `div` wrapper on web, and `ScrollView` on Native.
2.  **Explicit Content Style**: Force the `contentContainerStyle` to have `flexDirection: 'row'` (which I tried, but might need `!important` equivalent in JS styles or `nativewind` class forwarding).

**Conclusion**: This is a known nuance of `react-native-web`. Pure Tailwind classes often cannot penetrate the `ScrollView`'s inner Shadow DOM-like structure.
