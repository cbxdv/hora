import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import * as s from './styles'

const ContextMenu: React.FC<ContextMenuProps> = ({ menuItems, position, closeHandler }) => {
    const ref = useRef<HTMLDivElement>(null)

    const [x, setX] = useState<number>(0)
    const [y, setY] = useState<number>(0)

    useEffect(() => {
        const correctPositions = (newX: number, newY: number) => {
            if (ref?.current) {
                // Width
                if (newX + ref.current.offsetWidth > window.innerWidth - 10) {
                    setX(window.innerWidth - ref.current.offsetWidth - 10)
                } else {
                    setX(newX)
                }

                // Height
                if (newY + ref.current.offsetHeight >= window.innerHeight - 10) {
                    setY(window.innerHeight - ref.current.offsetHeight - 10)
                } else {
                    setY(newY)
                }
            }
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                closeHandler()
            } else if (event.button === 2) {
                if (ref.current && ref.current.contains(event.target as Node)) {
                    return
                }
                correctPositions(event.x, event.y)
            }
        }

        const keyBindHandler = (event: KeyboardEvent) => {
            if (event.key === `Escape`) {
                closeHandler()
            }
        }

        document.addEventListener(`scroll`, closeHandler, true)
        document.addEventListener(`mousedown`, handleClickOutside, true)
        document.addEventListener(`keydown`, keyBindHandler, true)
        correctPositions(position.x, position.y)
        return () => {
            document.addEventListener(`scroll`, closeHandler, true)
            document.removeEventListener(`mousedown`, handleClickOutside, true)
            document.removeEventListener(`keydown`, keyBindHandler, true)
        }
    }, [position.x, position.y])

    return createPortal(
        <s.ContextMenuContainer
            $x={x}
            $y={y}
            ref={ref}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            onAuxClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
            {menuItems.map(item => (
                <s.MenuItem
                    key={item.id}
                    $danger={item.danger}
                    onClick={() => {
                        closeHandler()
                        item.action()
                    }}
                    onAuxClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                    <s.MenuItemIcon $danger={item.danger}>{<item.icon />}</s.MenuItemIcon>
                    <span>{item.label}</span>
                </s.MenuItem>
            ))}
        </s.ContextMenuContainer>,
        document.getElementById(`context-menu`) as Element
    )
}

export type ContextMenuItemType = {
    id: string
    label: string
    icon: React.FunctionComponent
    action: () => void
    danger?: boolean
}

type ContextMenuProps = {
    menuItems: ContextMenuItemType[]
    position: {
        x: number
        y: number
    }
    closeHandler: () => void
}

export default ContextMenu
