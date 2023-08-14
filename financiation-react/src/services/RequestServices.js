export const dataHandler = (item, tokens) => {
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

export const getVisitFromLocations = async (tokens) => {

    let text = Object.keys(locations).join()
    console.log(text)

    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }
    let response = await fetch(`/api/visits?locs=${text}`, {headers: headers})
    let data = await response.json()
    console.log(data)
    return data
}

export const getFaqFromMinistry = async (tokens) => {

    let text = Object.keys(ministryDepartments).join()
    console.log(text)

    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }
    let response = await fetch(`/api/faqs?deps=${text}`, {headers: headers})
    let data = await response.json()
    console.log(data)
    return data
}