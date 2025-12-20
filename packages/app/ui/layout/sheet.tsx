import React, { useRef, useEffect } from 'react';
import { Platform, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react-native';

// Types
interface SheetProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    snapPoints?: string[];
}

export function Sheet({ isOpen, onClose, children, title = "Detail", snapPoints = ['50%', '90%'] }: SheetProps) {
    // -------------------------------------------------------------------------
    // WEB IMPLEMENTATION: Side Panel (Slide Over from Right)
    // -------------------------------------------------------------------------
    if (Platform.OS === 'web') {
        return (
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
                            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-[400px] bg-white shadow-2xl z-50 border-l border-slate-200 flex flex-col"
                        >
                            <div className="flex items-center justify-between p-4 border-b border-slate-100">
                                <span className="font-bold text-lg text-slate-800">{title}</span>
                                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
                                    <X size={20} color="#64748b" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4">
                                {children}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        );
    }

    // -------------------------------------------------------------------------
    // NATIVE IMPLEMENTATION: Bottom Sheet
    // -------------------------------------------------------------------------
    const sheetRef = useRef<BottomSheet>(null);

    // Sync external isOpen state with internal sheet state
    useEffect(() => {
        if (isOpen) {
            sheetRef.current?.expand();
        } else {
            sheetRef.current?.close();
        }
    }, [isOpen]);

    return (
        // Wrapper View to handle absolute positioning if needed, 
        // though typically BottomSheet is rendered at the root or high level.
        // For simplicity in this context we assume it's mounted in the tree.
        isOpen ? (
            <BottomSheet
                ref={sheetRef}
                index={1} // Open to 50% by default? Or 0 for first snap point
                snapPoints={snapPoints}
                enablePanDownToClose
                onClose={onClose}
                backgroundStyle={{ backgroundColor: 'white' }}
                handleIndicatorStyle={{ backgroundColor: '#cbd5e1' }}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                        <X size={24} color="#64748b" />
                    </TouchableOpacity>
                </View>
                <BottomSheetScrollView contentContainerStyle={styles.content}>
                    {children}
                </BottomSheetScrollView>
            </BottomSheet>
        ) : null
    );
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
