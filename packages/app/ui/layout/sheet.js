import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "nativewind/jsx-runtime";
import { useRef, useEffect } from 'react';
import { Platform, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react-native';
export function Sheet({ isOpen, onClose, children, title = "Detail", snapPoints = ['50%', '90%'] }) {
    // -------------------------------------------------------------------------
    // WEB IMPLEMENTATION: Side Panel (Slide Over from Right)
    // -------------------------------------------------------------------------
    if (Platform.OS === 'web') {
        return (_jsx(AnimatePresence, { children: isOpen && (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: onClose, className: "fixed inset-0 bg-black/20 backdrop-blur-sm z-50", style: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 } }), _jsxs(motion.div, { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' }, transition: { type: 'spring', damping: 25, stiffness: 200 }, className: "fixed right-0 top-0 bottom-0 w-[400px] bg-white shadow-2xl z-50 border-l border-slate-200 flex flex-col", children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-slate-100", children: [_jsx("span", { className: "font-bold text-lg text-slate-800", children: title }), _jsx("button", { onClick: onClose, className: "p-2 hover:bg-slate-100 rounded-full", children: _jsx(X, { size: 20, color: "#64748b" }) })] }), _jsx("div", { className: "flex-1 overflow-y-auto p-4", children: children })] })] })) }));
    }
    // -------------------------------------------------------------------------
    // NATIVE IMPLEMENTATION: Bottom Sheet
    // -------------------------------------------------------------------------
    const sheetRef = useRef(null);
    // Sync external isOpen state with internal sheet state
    useEffect(() => {
        if (isOpen) {
            sheetRef.current?.expand();
        }
        else {
            sheetRef.current?.close();
        }
    }, [isOpen]);
    return (
    // Wrapper View to handle absolute positioning if needed, 
    // though typically BottomSheet is rendered at the root or high level.
    // For simplicity in this context we assume it's mounted in the tree.
    isOpen ? (_jsxs(BottomSheet, { ref: sheetRef, index: 1, snapPoints: snapPoints, enablePanDownToClose: true, onClose: onClose, backgroundStyle: { backgroundColor: 'white' }, handleIndicatorStyle: { backgroundColor: '#cbd5e1' }, children: [_jsxs(View, { style: styles.header, children: [_jsx(Text, { style: styles.title, children: title }), _jsx(TouchableOpacity, { onPress: onClose, style: styles.closeBtn, children: _jsx(X, { size: 24, color: "#64748b" }) })] }), _jsx(BottomSheetScrollView, { contentContainerStyle: styles.content, children: children })] })) : null);
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b'
    },
    closeBtn: {
        padding: 4
    },
    content: {
        padding: 16
    }
});
