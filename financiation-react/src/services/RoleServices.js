export const getUserRolesById = async (tokens, roleId) => {

    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }

    let response = await fetch(`/api/roles/${roleId}`, {headers: headers})
    let data = await response.json()
    return data
}