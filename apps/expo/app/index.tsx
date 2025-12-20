import { LandingScreen } from 'app/features/landing/screen';
import { Stack } from 'expo-router';

export default function Screen() {
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <LandingScreen />
        </>
    );
}
