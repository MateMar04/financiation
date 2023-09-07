export const getMayors = async (tokens) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }
    let response = await fetch('/api/mayors', {headers: headers})
    let data = await response.json()
    return data
};

export const getMayorById = async (tokens, mayorId) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }

    let response = await fetch(`/api/mayors/${mayorId}`, {headers: headers})
    let data = await response.json()
    return data
}


