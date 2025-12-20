import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "nativewind/jsx-runtime";
import { Text, View } from "react-native";
import { Link } from 'solito/link';
export function MissingScreen() {
    return (_jsx(_Fragment, { children: _jsxs(View, { className: "flex-1 items-center justify-center p-3 bg-red-300", children: [_jsx(Text, { className: "text-black-400", children: "Tab two!!" }), _jsx(Text, { className: "text-black-600", children: "This screen doesnt exist." }), _jsx(Link, { href: "/", children: _jsx(Text, { className: "text-black-400", children: "Go to home screen!" }) })] }) }));
}
