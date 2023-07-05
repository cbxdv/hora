type normalizeObjectType = (obj: any) => any
/**
 * Removes all the properties which have a value of `null` or `undefined`
 * @param obj Any object
 * @returns The normalized object
 */
export const normalizeObject: normalizeObjectType = (obj: any) => {
    if (obj == null) {
        return obj
    }

    // If it is not an object, then it can be any of the other primitive types
    // So, it is returned
    if (typeof obj != 'object') {
        return obj
    }

    // If having length method, then it may be an array.
    // If so, then it is returned
    if (obj?.length != null) {
        return obj
    }

    return Object.fromEntries(
        Object.entries(obj)
            .filter(([_, val]) => val != null)
            .map(([key, val]) => [key, val === Object(val) ? normalizeObject(val) : val])
    )
}

type transferToFromType = (objA: any, objB: any) => any
/**
 * Transfer properties from B to A object. It returns a super object with all the properties
 * in object A with values in object B and defaults values to object A if not found in B
 * @param objA Object that acts as a parent
 * @param objB Object that acts as a child
 * @returns A transfered object
 */
export const transferToFrom: transferToFromType = (objA, objB) => {
    // If B is undefined or null, return A
    if (objB == null) {
        return objA
    }

    // Convert A to entries, useful for iterating
    const aE = Object.entries(objA)

    // Array for storing resultant object entries
    let resE = []

    // Iterating through A and changing with B values
    resE = aE.map(([key, val]) => {
        const bVal = objB[key]
        if (typeof val === 'object' || val === Object(val)) {
            // If its an object, then it can be JS-Object or Array
            // If having length method, then it may be an array.
            if (bVal?.length != null) {
                return [key, bVal]
            }
            // If value is a object then recurse the value object
            return [key, transferToFrom(val, bVal)]
        } else {
            // If value is a value check which one to include
            if (bVal == null) {
                // If value in B is null or undefined, return value in A
                return [key, val]
            } else {
                // If value in B is defined, return value in B
                return [key, bVal]
            }
        }
    })

    // Convert entries to object
    const res = Object.fromEntries(resE)

    return res
}
