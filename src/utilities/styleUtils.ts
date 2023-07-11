type getPixesToScrollInListType = (
    listRef: React.RefObject<HTMLDivElement> | null,
    listItemRef: React.RefObject<HTMLDivElement> | null
) => number
/**
 * Gives number of pixels that have to be scrolled, to get item to be brought to middle of the
 * container. The calculation uses the position and height of item and container to calculate an
 * appropriate position. Can be used with `scrollTo` to get the item into middle (view).
 * @param listRef The ref of the container that has the item
 * @param listItemRef The ref of the item that has to be scrolled into the view
 * @returns Number to pixels
 */
export const getPixelsToScrollInList: getPixesToScrollInListType = (listRef, listItemRef) => {
    if (!listRef || !listItemRef || !listRef.current || !listItemRef.current) {
        return 0
    }
    const list = listRef.current
    const item = listItemRef.current
    const num = item.offsetTop - (list.getBoundingClientRect().height - item.getBoundingClientRect().height) / 2
    return num
}
