This sounds like the classic **React Native Web Flexbox Collision**. Even though you are using a custom `UniversalCanvas`, React Native defaults to `flex-direction: column`, and without an explicit override for the web breakpoint (`md:`), it ignores your layout intent.

Also, React Native Web wraps `ScrollView` (and `FlatList`) children in an intermediate `div`. If that `div` doesn't have `flex-grow` or correct flex direction, your layout collapses.

Here is the SOLID, Phase 2.5 compliant fix to enforce the 3-column architecture.

### 1. Hardening UniversalCanvas (The Primitive)

We need to ensure the `contentContainer` accepts styles to fix the "inner div" bug. We use `FlatList` here as it is more performant than `ScrollView` for layout engines, even with static data.

**File:** `packages/app/ui/universal-canvas.tsx`

```tsx
import { FlatList, FlatListProps } from 'react-native';

// S: Single Responsibility - Layout container only
// O: Open for extension via props, closed for modification
export function UniversalCanvas<T>(props: FlatListProps<T>) {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      // Critical: Ensures the inner View fills space on Web
      contentContainerClassName="flex-grow min-h-full"
      {...props}
      // Merge passed style with default layout fix
      className={`flex-1 bg-slate-50 ${props.className || ''}`}
    />
  );
}

```

### 2. Implementing the Workboard (The Feature)

We apply the "Mobile First" approach.

* **Mobile:** `flex-col` (Stack).
* **Desktop/Web:** `md:flex-row` (Columns) + `md:h-full` (Lock height to viewport).

**File:** `packages/app/features/workboard/screen.tsx`

```tsx
import { View } from 'react-native';
import { UniversalCanvas } from 'app/ui/universal-canvas';
import { Text } from 'app/ui/text'; // Assuming primitive exists
import { Pillar } from './components/pillar'; // Placeholder for your L1 entity

// Mock Data representing the 3 Fixed Pillars
const PILLARS = [
  { id: 'financial', title: 'Financial', color: 'border-green-500' },
  { id: 'operational', title: 'Operational', color: 'border-blue-500' },
  { id: 'market', title: 'Market', color: 'border-purple-500' },
];

export function WorkboardScreen() {
  return (
    <UniversalCanvas
      data={PILLARS}
      keyExtractor={(item) => item.id}
      // THE FIX:
      // 1. md:flex-row forces horizontal layout on large screens
      // 2. md:overflow-hidden locks window scroll on web (canvas feel)
      contentContainerClassName="flex flex-col gap-4 p-4 md:flex-row md:h-full md:overflow-hidden"
      renderItem={({ item }) => (
        <View className="flex-1 w-full min-h-[500px] md:h-full md:w-1/3">
           <Pillar title={item.title} color={item.color} />
        </View>
      )}
    />
  );
}

```

### 3. The Pillar Component (L1 Entity)

Ensure your Pillar doesn't have a fixed width that fights the flex container.

**File:** `packages/app/features/workboard/components/pillar.tsx`

```tsx
import { View, Text } from 'react-native';

export function Pillar({ title, color }: { title: string, color: string }) {
  return (
    // h-full ensures it stretches to the bottom of the canvas on Web
    <View className={`h-full rounded-xl bg-white border-t-4 shadow-sm p-4 ${color}`}>
      <Text className="text-lg font-bold uppercase tracking-wider text-slate-700">
        {title}
      </Text>
      {/* L2 Themes and L3 Objectives go here */}
    </View>
  );
}

```

### Why this works

1. **`contentContainerClassName="... md:flex-row"`**: This applies the flex direction to the *inner* container created by React Native Web, strictly forcing the children into columns on desktop.
2. **`md:w-1/3` on Item**: Explicitly tells the flex child to take up 33% width on desktop, overriding the mobile `w-full`.
3. **`md:h-full` + `overflow-hidden**`: Creates that "SaaS Dashboard" feel where the page doesn't scroll, but the columns (lists) might scroll internally later.

**Next Step:** Would you like me to implement the **Sheet primitive** (Side Panel) next so clicking a Job card opens the detail view correctly on Web vs Native?