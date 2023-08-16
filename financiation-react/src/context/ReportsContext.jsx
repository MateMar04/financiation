import {createContext, useState} from "react";

const ReportsContext = createContext();

export default ReportsContext;

export const ReportsProvider = ({children}) => {


    const [locations, setLocations] = useState({});
    const [visits, setVisits] = useState({});
    const [ministryDepartments, setMinistryDepartments] = useState({});
    const [faqs, setFaqs] = useState({});

    let dataHandler = async (item, tokens) => {
        if (Object.keys(item).length === 3) {
            if (item.id_ministry_department !== undefined) {
                toggle(faqs, item)
            } else {
                if (item.id_department !== undefined) {
                    toggle(locations, item)
                    await getVisitFromLocations(tokens).then(r => setVisits(r))
                } else {
                    toggle(ministryDepartments, item)
                    await getFaqFromMinistry(tokens).then(r => setFaqs(r))
                }
            }
        } else {
            toggle(visits, item)
        }
    }

    let toggle = (dict, item) => {
        if (item.id in dict) {
            delete dict[item.id]
        } else {
            dict[item.id] = item.id
        }
        console.log(dict)
    }

    let getVisitFromLocations = async (tokens) => {

        let text = Object.keys(locations).join()
        console.log(text)

        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(tokens),
            "Accept": "application/json"
        }
        let response = await fetch(`/api/visits?locs=${text}`, {headers: headers})
        let data = await response.json()
        console.log(data)
        return data
    }

    let getFaqFromMinistry = async (tokens) => {

        let text = Object.keys(ministryDepartments).join()
        console.log(text)

        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(tokens),
            "Accept": "application/json"
        }
        let response = await fetch(`/api/faqs?deps=${text}`, {headers: headers})
        let data = await response.json()
        console.log(data)
        return data
    }


    let contextData = {
        visits: visits,
        locations: locations,
        ministryDepartments: ministryDepartments,
        faqs: faqs,
        dataHandler: dataHandler
    }

    return (
        <ReportsContext.Provider value={contextData}>
            {children}
        </ReportsContext.Provider>
    );

}