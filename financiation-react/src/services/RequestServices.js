export const dataHandler = async (item, tokens) => {
    if (Object.keys(item).length === 3) {
        if (item.id_ministry_department !== undefined) {
            toggle(faqs, item)
        } else {
            if (item.id_department !== undefined) {
                toggle(locations, item)
            } else {
                toggle(ministryDepartments, item)
            }
        }
    } else {
        toggle(visits, item)
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

