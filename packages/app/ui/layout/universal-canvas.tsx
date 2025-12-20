import { FlatList, Platform, type FlatListProps, View, ScrollView } from 'react-native';
import { Surface } from './surface';

interface UniversalCanvasProps<T> extends Omit<FlatListProps<T>, 'renderItem'> {
    data: T[];
    renderItem: ({ item }: { item: T }) => React.ReactElement;
    keyExtractor: (item: T) => string;
}

export function UniversalCanvas<T>({
    data,
    renderItem,
    keyExtractor,
    ListHeaderComponent,
    ...props
}: UniversalCanvasProps<T>) {

    if (Platform.OS === 'web') {
        return (
            <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
                {ListHeaderComponent && (
                    <View>
                        {typeof ListHeaderComponent === 'function'
                            ? ListHeaderComponent()
                            : ListHeaderComponent}
                    </View>
                )}
                <Surface className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                    {data.map((item) => (
                        <View key={keyExtractor(item)}>
                            {renderItem({ item })}
                        </View>
                    ))}
                </Surface>
            </ScrollView>
        );
    }

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            numColumns={1}
            contentContainerClassName="p-6 gap-4"
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={ListHeaderComponent}
            {...props}
        />
    );
}
