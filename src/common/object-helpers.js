export let updateObjectInArray = (items, itemId, objPropName, editObjProps) => {
    return items.map (u => {
        if (u[objPropName] === itemId) {
            return {...u, ...editObjProps}
        }
        return u
    })
}