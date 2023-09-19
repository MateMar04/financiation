export const getUser = async (tokens) => {

    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }

    let response = await fetch(`/auth/users/me/`, {headers: headers})
    let data = await response.json()
    return data
}

export const getMyUser = async (tokens, id) => {

    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }

    let response = await fetch(`/api/users/me/${id}`, {headers: headers})
    let data = await response.json()
    return data
}


export const getUserById = async (tokens, userId) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }

    let response = await fetch(`/api/users/${userId}`, {headers: headers})
    let data = await response.json()
    return data
}

export const getGroupAdvisorUsers = async (tokens, groupId) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }

    let response = await fetch(`/api/groups/${groupId}/advisor-users`, {headers: headers})
    let data = await response.json()
    return data
}

export const getGroupCoordinatorUsers = async (tokens, groupId) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }

    let response = await fetch(`/api/groups/${groupId}/coordinator-users`, {headers: headers})
    let data = await response.json()
    return data
}
export const getUsers = async (tokens) => {

    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }

    let response = await fetch(`/api/users`, {headers: headers})
    let data = await response.json()
    return data
}

