export const getAddresses = async (tokens) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(tokens),
        "Accept": "application/json"
    }
    let response = await fetch('/api/addresses', {headers: headers})
    let data = await response.json()
    return data
};