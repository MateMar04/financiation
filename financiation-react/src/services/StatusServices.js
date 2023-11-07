export const getUserStatusesById = async (tokens, statusId) => {

    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }

    let response = await fetch(`/api/user-statuses/${statusId}`, {headers: headers})
    let data = await response.json()
    return data
}

export const getVisitStatuses = async (tokens) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }

    let response = await fetch(`/api/visit-statuses`, {headers: headers})
    let data = await response.json()
    return data
}