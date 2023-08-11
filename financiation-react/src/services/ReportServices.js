export const dataHandler = (item) => {
    if (Object.keys(item).length === 3) {
        if (item.id_ministry_department !== undefined) {
            toggle(faqs, item)
            console.log("IS FAQ")
        } else {
            if (item.id_department !== undefined) {
                toggle(locations, item)
                console.log("IS LOCATION")
            } else {
                toggle(ministryDepartments, item)
                console.log("IS MINISTRY")
            }
        }
    } else {
        toggle(visits, item)
        console.log("IS VISIT")
    }
}


const visits = {}
const faqs = {}
const ministryDepartments = {}
const locations = {}


const toggle = (dict, item) => {
    if (item.id in dict) {
        delete dict[item.id]
    } else {
        dict[item.id] = item.id
    }
    console.log(dict)
}
