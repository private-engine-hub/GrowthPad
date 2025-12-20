'use client'

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { StyleSheet } from 'react-native'

export default function NativeWindRegistry({
    children,
}: {
    children: React.ReactNode
}) {
    useServerInsertedHTML(() => {
        const sheet = StyleSheet.getSheet()
        if (sheet.textContent) {
            return (
                <style
                    dangerouslySetInnerHTML={{ __html: sheet.textContent }}
                    id={sheet.id}
                />
            )
        }
    })

    return <>{children}</>
}
