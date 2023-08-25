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

    const [totalRequests, setTotalRequests] = useState([{}]);
    const [totalRequestsByAdvisors, setTotalRequestsByAdvisors] = useState([{}]);
    const [totalRequestsByLocations, setTotalRequestsByLocations] = useState([{}]);
    const [totalRequestsByVisits, setTotalRequestsByVisits] = useState([{}]);
    const [totalRequestsByFaqs, setTotalRequestsByFaqs] = useState([{}]);
    const [totalRequestsByMinistryDepartments, setTotalRequestsByMinistryDepartments] = useState([{}]);

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
                let locality_id = visits.filter(v => v.id == e.target.value)[0].location
                toggle('Visitas', selectedLocations[locality_id], e)
                break
            case 'Motivos':
                let ministryDepartment_id = faqs.filter(f => f.id == e.target.value)[0].ministry_department
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

    let checkText = (text) => {
        return text !== '';
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

        if (checkText(text)) {
            let response = await fetch(`/api/visits?locs=${text}`, {headers: headers})
            let data = await response.json()

            data.forEach((element) => {
                element.type = 'visit'
                element.checked = selectedLocations[element.location].hasOwnProperty(element.id)
            })

            setVisits(data)
            return data
        }
        return []

    }

    let getFaqFromMinistryForFilters = async () => {

        let text = Object.keys(selectedMinistryDepartments).join()

        if (checkText(text)) {

            let response = await fetch(`/api/faqs?deps=${text}`, {headers: headers})
            let data = await response.json()

            decorateData(data, 'faq');

            setFaqs(data)

            return data
        }
        return []
    }

    const faqsQP = () => extractData(selectedMinistryDepartments)
    const visitsQP = () => extractData(selectedLocations)


    let getRequestsByVisitFaq = async () => {
        let response = await fetch(`/api/reports?faqs=${faqsQP()}&visits=${visitsQP()}`, {headers: headers})
        let data = await response.json()
        return data
    }
    let getTotalRequests = async () => {
        let response = await fetch(`/api/reports/total-requests?faqs=${faqsQP()}&visits=${visitsQP()}`, {headers: headers})
        let data = await response.json()
        return data
    }

    let getTotalRequestsByAdvisors = async () => {
        let response = await fetch(`/api/reports/total-requests-by-advisors?&faqs=${faqsQP()}&visits=${visitsQP()}`, {headers: headers})
        let data = await response.json()
        return data
    }

    let getTotalRequestsByVisits = async () => {
        let response = await fetch(`/api/reports/total-requests-by-visits?&faqs=${faqsQP()}&visits=${visitsQP()}`, {headers: headers})
        let data = await response.json()
        return data
    }

    let getTotalRequestsByLocations = async () => {
        let response = await fetch(`/api/reports/total-requests-by-locations?&faqs=${faqsQP()}&visits=${visitsQP()}`, {headers: headers})
        let data = await response.json()
        return data
    }

    let getTotalRequestsByFaqs = async () => {
        let response = await fetch(`/api/reports/total-requests-by-faqs?&faqs=${faqsQP()}&visits=${visitsQP()}`, {headers: headers})
        let data = await response.json()
        return data
    }

    let getTotalRequestsByMinistryDepartments = async () => {
        let response = await fetch(`/api/reports/total-requests-by-ministry-departments?&faqs=${faqsQP()}&visits=${visitsQP()}`, {headers: headers})
        let data = await response.json()
        return data
    }

    let generateReports = async () => {

        if (!checkText(faqsQP()) || !checkText(visitsQP())) {
            await getRequestsByVisitFaq().then(r => setRequests(r))
            await getTotalRequests().then(r => setTotalRequests(r))
            await getTotalRequestsByAdvisors.then(r => setTotalRequestsByAdvisors(r))
            await getTotalRequestsByVisits().then(r => setTotalRequestsByVisits(r))
            await getTotalRequestsByLocations().then(r => setTotalRequestsByLocations(r))
            await getTotalRequestsByFaqs.then(r => setTotalRequestsByFaqs(r))
            await getTotalRequestsByMinistryDepartments().then(r => setTotalRequestsByMinistryDepartments(r))
        } else {
            alert('Seleccione algo en todos los campos')
        }

    }




    let contextData = {
        visits: visits,
        locations: selectedLocations,
        ministryDepartments: selectedMinistryDepartments,
        faqs: faqs,
        requests: requests,
        totalRequests: totalRequests,
        totalRequestsByAdvisors: totalRequestsByAdvisors,
        totalRequestsByFaqs: totalRequestsByFaqs,
        totalRequestsByMinistryDepartments: totalRequestsByMinistryDepartments,
        totalRequestsByVisits: totalRequestsByVisits,
        totalRequestsByLocations: totalRequestsByLocations,
        dataHandler: dataHandler,
        getRequestsFromVisitDepsFaqs: getRequestsByVisitFaq,
        getMinistryDepartmentsForFilter: getMinistryDepartmentsForFilters,
        getLocationsForFilter: getLocationsForFilters,
        generateReports: generateReports
    }

    return (
        <ReportsContext.Provider value={contextData}>
            {children}
        </ReportsContext.Provider>
    );

}