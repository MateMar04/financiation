import {createContext, useContext, useState} from "react";
import AuthContext from "./AuthContext";

const ReportsContext = createContext();

export default ReportsContext;

export const ReportsProvider = ({children}) => {


    let {authTokens} = useContext(AuthContext)

    const [locations, setLocations] = useState({});
    const [visits, setVisits] = useState({});
    const [ministryDepartments, setMinistryDepartments] = useState({});
    const [faqs, setFaqs] = useState({});
    const [requests, setRequests] = useState();

    let dataHandler = async (title, e) => {
        switch (title) {
            case 'Departamentos':
                toggle(ministryDepartments, e)
                await getFaqFromMinistryForFilters(authTokens.access).then(r => setFaqs(r))
                break
            case 'Localidades':
                toggle(locations, e)
                await getVisitFromLocationsForFilters(authTokens.access).then(r => setVisits(r))
                break
            case 'Visitas':
                toggle(visits, e)
                break
            case 'Motivos':
                toggle(faqs, e)
                break
        }
    }

    let toggle = (dict, e) => {
        let checkbox = e.target
        if (checkbox.checked) {
            dict[checkbox.value] = checkbox.value
        } else {
            delete dict[checkbox.value]
        }
        console.log(dict)
    }

    let getMinistryDepartmentsForFilters = async (tokens) => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(tokens),
            "Accept": "application/json"
        }
        let response = await fetch('/api/ministry-departments', {headers: headers})
        let data = await response.json()

        data.forEach((element) => {
            element.type = 'ministryDepartment'
            element.checked = false
        })

        return data
    };


    let getLocationsForFilters = async (tokens) => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(tokens),
            "Accept": "application/json"
        }
        let response = await fetch('/api/locations', {headers: headers})
        let data = await response.json()

        data.forEach((element) => {
            element.type = 'location'
            element.checked = false
        })

        return data
    };

    let getVisitFromLocationsForFilters = async (tokens) => {

        let text = Object.keys(locations).join()
        console.log(text)

        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(tokens),
            "Accept": "application/json"
        }
        let response = await fetch(`/api/visits?locs=${text}`, {headers: headers})
        let data = await response.json()

        data.forEach((element) => {
            element.type = 'visit'
            element.checked = false
        })

        console.log(data)
        return data
    }

    let getFaqFromMinistryForFilters = async (tokens) => {

        let text = Object.keys(ministryDepartments).join()

        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(tokens),
            "Accept": "application/json"
        }
        let response = await fetch(`/api/faqs?deps=${text}`, {headers: headers})
        let data = await response.json()

        data.forEach((element) => {
            element.type = 'faq'
            element.checked = false
        })

        return data
    }

    let getRequestsFromVisitDepsFaqs = async (tokens) => {

        let deps = Object.keys(ministryDepartments).join()
        let faqs = Object.keys(ministryDepartments).join()
        let visits = Object.keys(ministryDepartments).join()

        console.log(deps)
        console.log(faqs)
        console.log(visits)


        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(tokens),
            "Accept": "application/json"
        }

        let response = await fetch(`/api/reports?deps=${deps}&faqs=${faqs}&visits=${visits}`, {headers: headers})
        let data = await response.json()
        setRequests(data)
        console.log(requests)

    }


    let contextData = {
        visits: visits,
        locations: locations,
        ministryDepartments: ministryDepartments,
        faqs: faqs,
        dataHandler: dataHandler,
        getRequestsFromVisitDepsFaqs: getRequestsFromVisitDepsFaqs,
        getMinistryDepartmentsForFilter: getMinistryDepartmentsForFilters,
        getLocationsForFilter: getLocationsForFilters
    }

    return (
        <ReportsContext.Provider value={contextData}>
            {children}
        </ReportsContext.Provider>
    );

}