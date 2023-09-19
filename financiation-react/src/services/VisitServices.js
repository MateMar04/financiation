export const getVisits = async (tokens) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }
    let response = await fetch('/api/visits', {headers: headers})
    let data = await response.json()
    return data
};

export const getLatestVisits = async (tokens) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }
    let response = await fetch('/api/visits/latest', {headers: headers})
    let data = await response.json()
    return data
};

export const getLatestVisitRequests = async (tokens) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }
    let response = await fetch('/api/visits/latest/requests', {headers: headers})
    let data = await response.json()
    return data
};
