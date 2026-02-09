'use client';

import dynamic from 'next/dynamic';

// Dynamic import for KeyboardShortcutsModal - only load when user presses '?' key
const KeyboardShortcutsModal = dynamic(() => import('./KeyboardShortcutsModal'), { ssr: false });

export default function DynamicKeyboardShortcutsModal() {
  return <KeyboardShortcutsModal />;
}
