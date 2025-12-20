import { jsx as _jsx, jsxs as _jsxs } from "nativewind/jsx-runtime";
import { Text, View } from "react-native";
import { vars } from "nativewind";
import { TextLink } from "solito/link";
const theme = vars({
    "--theme-rg": "blue",
});
const TabTwoScreen = () => {
    return (_jsxs(View, { className: "flex-1 items-center justify-center bg-green-200", style: theme, children: [_jsx(Text, { className: "font-bold text-3xl text-[--theme-fg] my-6", children: " Welcome to Solito !" }), _jsx(TextLink, { href: "/user/fernando", children: "Regular Link" })] }));
};
export default TabTwoScreen;
