/// <reference types="react" />
import { View } from 'react-native';
declare function Card({ className, ...props }: React.ComponentProps<typeof View>): JSX.Element;
declare function CardHeader({ className, ...props }: React.ComponentProps<typeof View>): JSX.Element;
import { Text } from './typography';
declare function CardTitle({ className, ...props }: React.ComponentProps<typeof Text>): JSX.Element;
declare function CardContent({ className, ...props }: React.ComponentProps<typeof View>): JSX.Element;
export { Card, CardHeader, CardTitle, CardContent };
