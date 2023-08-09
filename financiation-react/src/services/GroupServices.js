export const getGroups = async (tokens) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }
    let response = await fetch('/api/group/', {headers: headers})
    let data = await response.json()
    return data
}


export const getGroupCoordinators = async (tokens, group) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }
    let response = await fetch(`/api/groups/${group.id}/coordinators`, {headers: headers})
    let data = await response.json()
    return data
};

export const getGroupAdvisors = async (tokens, group) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }
    let response = await fetch(`/api/groups/${group.id}/advisors`, {headers: headers})
    let data = await response.json()
    return data
};