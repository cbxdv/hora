import { AnimatePresence } from 'framer-motion'
import { createContext, useContext, useRef, useState, useCallback } from 'react'

import Alert from '@components/Alert'

const ConfirmDialog = createContext<((data: any) => Promise<boolean>) | null>(null)

export function ConfirmDialogProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState({ isOpen: false })
    const fn = useRef<(response: boolean) => void>()

    const confirm = useCallback(
        (data: any) => {
            setState({ ...data, isOpen: true })
            return new Promise<boolean>(resolve => {
                fn.current = (choice: boolean) => {
                    resolve(choice)
                    setState({ ...state, isOpen: false })
                }
            })
        },
        [setState]
    )

    return (
        <ConfirmDialog.Provider value={confirm}>
            {children}
            <AnimatePresence>
                {state.isOpen && (
                    <Alert
                        title='Alert'
                        description='Are you sure?'
                        acceptText='YES'
                        rejectText='NO'
                        {...state}
                        action={(choice: boolean) => fn.current && fn.current(choice)}
                        closeHandler={() => {}}
                    />
                )}
            </AnimatePresence>
        </ConfirmDialog.Provider>
    )
}

export default function useConfirm() {
    return useContext(ConfirmDialog)
}
