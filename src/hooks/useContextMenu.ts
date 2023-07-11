import { useState, MouseEvent } from 'react'

/**
 * Ease the use of context menu in a component. Provides options and states for making the
 * context menu work and position based on the position of the click. The following properties are
 * returned with the use of this hook.
 * - `isContextMenuVisible` -  a booleaan indicating whether the menu is open
 * - `mousePos` -  position of the mouse where the context meny has to be placed
 * - `showContextMenu` -  function to make context menu visible and has to passed to the container that detects clicks
 * - `hideContextMenu` -  function to make context menu hidden
 */
const useContextMenu = ({ onContextMenu }: useContextMenuProps = {}) => {
    const [isContextMenuVisible, setIsContextMenuVisible] = useState<boolean>(false)
    const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

    /**
     * Opens the context menu. If a onContextMenu function is provided, then it is executed
     * before making the context menu visible
     */
    const showContextMenu = (event: MouseEvent) => {
        event.stopPropagation()

        // Getting the position of the click and storing them
        const x = event.clientX
        const y = event.clientY
        setMousePos({
            x,
            y
        })

        // Custom login that has to be run over a context handler call
        // Provided in props if necessary
        if (onContextMenu != null) {
            onContextMenu(event)
        }

        // Make context menu visible
        setIsContextMenuVisible(true)
    }

    /**
     * Hides the context menu
     */
    const hideContextMenu = () => {
        setIsContextMenuVisible(false)
    }

    return {
        isContextMenuVisible,
        mousePos,
        showContextMenu,
        hideContextMenu
    }
}

type useContextMenuProps = {
    onContextMenu?: (event: MouseEvent) => void
}

export default useContextMenu
