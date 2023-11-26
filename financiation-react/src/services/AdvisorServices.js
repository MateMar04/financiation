export const getAdvisors = async (tokens) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }
    let response = await fetch('/api/advisors', {headers: headers})
    let data = await response.json()
    return data
};

export const getAdvisorUsers = async (tokens) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }
    let response = await fetch('/api/advisor-users', {headers: headers})
    let data = await response.json()
    return data
}

export const getTopThreeAdvisors = async (tokens) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }
    let response = await fetch('/api/top-three-advisors', {headers: headers})
    let data = await response.json()
    return data
}

export const getAdvisorByUser = async (tokens, id) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }
    let response = await fetch(`/api/user/${id}/advisor`, {headers: headers})
    let data = await response.json()
    console.log(data)
    return data
}