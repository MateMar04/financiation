export const getFaqs = async (tokens) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }
    let response = await fetch('/api/faqs', {headers: headers})
    let data = await response.json()
    return data
};

export const getFaqsByDivisions = async (tokens, mdId) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }

    let response = await fetch(`/api/faqs?deps=${mdId}`, {headers: headers})
    let data = await response.json()
    return data
}
