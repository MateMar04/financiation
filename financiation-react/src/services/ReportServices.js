export const dataHandler = (item) => {
    if (Object.keys(item).length == 3) {
        {/* IS LOCATION, FAQ or MINISTRY*/}
        if (item.id_ministry_department != undefined) {
            console.log("IS FAQ")
        } else {
            if (item.id_department != undefined) {
                console.log("IS LOCATION")
            } else {
                console.log("IS MINISTRY")
            }
        }
    } else {
        console.log("IS VISIT")
    }

}