export let updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map (u => {
        if ((u.id).toString() == itemId) {
            return {...u, ...newObjProps}
        }
        return u
    })
}



