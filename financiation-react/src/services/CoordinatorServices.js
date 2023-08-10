export const getCoordinators = async (tokens) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }
    let response = await fetch('/api/coordinators', {headers: headers})
    let data = await response.json()
    return data
}

export const getCoordinatorUsers = async (tokens) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }
    let response = await fetch('/api/coordinator-users', {headers: headers})
    let data = await response.json()
    return data
}