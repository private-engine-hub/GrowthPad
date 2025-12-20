import { jsx as _jsx, jsxs as _jsxs } from "nativewind/jsx-runtime";
import { createParam } from 'solito';
import { TextLink } from 'solito/link';
import { Text, View } from 'react-native';
const { useParam } = createParam();
const UserDetailScreen = () => {
    const [id] = useParam('id');
    return (_jsxs(View, { className: "flex-1 items-center justify-center bg-violet-300", children: [_jsx(Text, { className: "mb-4 text-center font-bold", children: `User ID: ${id}` }), _jsx(TextLink, { href: "/", children: "\uD83D\uDC48 Go Home" })] }));
};
export default UserDetailScreen;
