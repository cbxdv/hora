import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import * as s from './styles'

const ContextMenu: React.FC<ContextMenuProps> = ({ menuItems, position, closeHandler }) => {
    const ref = useRef<HTMLDivElement>(null)

    const [x, setX] = useState<number>(position.x)
    const [y, setY] = useState<number>(position.y)

    const correctPositions = (newX = position.x, newY = position.y) => {
        if (ref.current) {
            if (x + ref.current.offsetWidth > window.innerWidth) {
                setX(window.innerWidth - ref.current.offsetWidth - 10)
            } else {
                setX(newX)
            }

            if (y + ref.current.offsetHeight >= window.innerHeight) {
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
        if (event.key === 'Escape') {
            closeHandler()
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', closeHandler, true)
        document.addEventListener('mousedown', handleClickOutside, true)
        document.addEventListener('keydown', keyBindHandler, true)
        correctPositions()
        return () => {
            document.addEventListener('scroll', closeHandler, true)
            document.removeEventListener('mousedown', handleClickOutside, true)
            document.removeEventListener('keydown', keyBindHandler, true)
        }
    }, [])

    return createPortal(
        <s.ContextMenuContainer $x={x} $y={y} ref={ref}>
            {menuItems.map((item) => (
                <s.MenuItem key={item.id} onClick={item.action} $danger={item.danger}>
                    <s.MenuItemIcon $danger={item.danger}>{<item.icon />}</s.MenuItemIcon>
                    <span>{item.name}</span>
                </s.MenuItem>
            ))}
        </s.ContextMenuContainer>,
        document.getElementById('context-menu') as Element
    )
}

type ContextMenuProps = {
    menuItems: {
        id: string
        name: string
        icon: React.FunctionComponent
        action: () => void
        danger?: boolean
    }[]
    position: {
        x: number
        y: number
    }
    closeHandler: () => void
}

export default ContextMenu
