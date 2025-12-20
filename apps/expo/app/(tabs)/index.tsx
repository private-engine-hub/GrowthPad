import { WorkboardScreen } from 'app/features/workboard/screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Workboard' }} />
      <WorkboardScreen />
    </>
  )
}