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


export const getVisitById = async (tokens, visitId) => {
    try {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(tokens),
            "Accept": "application/json"
        }
        let response = await fetch(`/api/visits/${visitId}`, {headers: headers})
        let data = await response.json()
        return data;
    } catch (error) {
        throw error;
    }
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
