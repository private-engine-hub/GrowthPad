import { jsx as _jsx, jsxs as _jsxs } from "nativewind/jsx-runtime";
import { Text, View } from "react-native";
import { MotiLink } from "solito/moti/app";
import { vars } from "nativewind";
const theme = vars({
    "--theme-fg": "red",
});
const HomeScreen = () => {
    return (_jsxs(View, { className: "flex-1 items-center justify-center bg-orange-200", style: theme, children: [_jsx(Text, { className: "font-bold text-3xl text-[--theme-fg]", children: " Welcome to Solito." }), _jsx(Text, { className: "font-bold my-4 text-[--theme-fg]", children: "Variables!" }), _jsx(Text, { className: "font-bold text-xl active:scale-150 active:text-[--theme-fg] transition duration-[500ms]", children: "Transitions" }), _jsx(Text, { className: "font-bold my-8 animate-bounce placeholder:text-white", children: "Animations" }), _jsx(MotiLink, { href: "/user/fernando", animate: ({ hovered, pressed }) => {
                    'worklet';
                    return {
                        scale: pressed ? 0.95 : hovered ? 1.1 : 1,
                        rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
                    };
                }, transition: {
                    type: 'timing',
                    duration: 150,
                }, children: _jsx(Text, { selectable: false, className: "text-base font-bold mt-5", children: "Moti Link" }) })] }));
};
export default HomeScreen;
