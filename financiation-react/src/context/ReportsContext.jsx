import {createContext, useContext, useState} from "react";
import AuthContext from "./AuthContext";

const ReportsContext = createContext();

export default ReportsContext;

export const ReportsProvider = ({children}) => {


    let {authTokens} = useContext(AuthContext)

    const [selectedLocations, setSelectedLocations] = useState({});
    const [selectedMinistryDepartments, setSelectedMinistryDepartments] = useState({});

    const [visits, setVisits] = useState({});
    const [faqs, setFaqs] = useState({});

    const [requests, setRequests] = useState({});

    let dataHandler = async (title, e) => {
        switch (title) {
            case 'Departamentos':
                toggle('Departamentos', selectedMinistryDepartments, e)
                await getFaqFromMinistryForFilters(authTokens.access).then(r => setFaqs(r))
                break
            case 'Localidades':
                toggle('Localidades', selectedLocations, e)
                await getVisitFromLocationsForFilters(authTokens.access).then(r => setVisits(r))
                break
            case 'Visitas':
                let locality_id = visits.filter(v => v.id == e.target.value)[0].id_locality
                toggle('Visitas', selectedLocations[locality_id], e)
                break
            case 'Motivos':
                let ministryDepartment_id = faqs.filter(f => f.id == e.target.value)[0].id_ministry_department
                toggle('Motivos', selectedMinistryDepartments[ministryDepartment_id], e)
                break
        }
    }

    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(authTokens.access),
        "Accept": "application/json"
    }

    let toggle = (type, dict, e) => {
        let checkbox = e.target
        if (checkbox.checked) {
            dict[checkbox.value] = {}
        } else {
            delete dict[checkbox.value]
        }
    }

    let decorateData = (data, type) => {
        data.forEach((element) => {
            element.type = type
            element.checked = false
        })
    }

    let extractData = (dict) => {
        let arr = []
        for (const [key, value] of Object.entries(dict)) {
            if (Object.keys(value).join() !== '')
                arr.push(Object.keys(value).join())
        }
        return arr.join()
    }

    let getMinistryDepartmentsForFilters = async () => {

        let response = await fetch('/api/ministry-departments', {headers: headers})
        let data = await response.json()

        decorateData(data, 'ministryDepartment');


        return data
    };


    let getLocationsForFilters = async () => {
        let response = await fetch('/api/locations', {headers: headers})
        let data = await response.json()

        decorateData(data, 'locations');

        return data
    };

    let getVisitFromLocationsForFilters = async () => {

        let text = Object.keys(selectedLocations).join()

        let response = await fetch(`/api/visits?locs=${text}`, {headers: headers})
        let data = await response.json()

        data.forEach((element) => {
            element.type = 'visit'
            element.checked = selectedLocations[element.id_locality].hasOwnProperty(element.id)
        })

        setVisits(data)

        return data
    }

    let getFaqFromMinistryForFilters = async () => {

        let text = Object.keys(selectedMinistryDepartments).join()

        let response = await fetch(`/api/faqs?deps=${text}`, {headers: headers})
        let data = await response.json()

        decorateData(data, 'faq');

        setFaqs(data)

        return data
    }

    let getRequestsFromVisitDepsFaqs = async () => {

        let deps_ = Object.keys(selectedMinistryDepartments).join()
        let faqs_ = extractData(selectedMinistryDepartments)
        let visits_ = extractData(selectedLocations)

        console.log(deps_)
        console.log(faqs_)
        console.log(visits_)

        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(tokens),
            "Accept": "application/json"
        }

        let response = await fetch(`/api/reports?deps=${deps_}&faqs=${faqs_}&visits=${visits_}`, {headers: headers})
        let data = await response.json()
        setRequests(data)
        return data

    }


    let contextData = {
        visits: visits,
        locations: selectedLocations,
        ministryDepartments: selectedMinistryDepartments,
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