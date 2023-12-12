import {createContext, useContext, useState} from "react";
import AuthContext from "./AuthContext";
import FailedModal from "../components/FailedModal";
import {message, Button, Modal, Input, Popconfirm} from 'antd';

const ReportsContext = createContext();

export default ReportsContext;

export const ReportsProvider = ({children}) => {


    let {authTokens} = useContext(AuthContext)

    const [selectedLocations, setSelectedLocations] = useState({});
    const [selectedMinistryDepartments, setSelectedMinistryDepartments] = useState({});

    const [visits, setVisits] = useState({});
    const [faqs, setFaqs] = useState({});
    const [showfail, setShowfailture] = useState(false);
    const toggleModalfailed = () => setShowfailture(!showfail);

    const [requests, setRequests] = useState({});

    const [totalRequests, setTotalRequests] = useState([]);
    const [totalRequestsByAdvisors, setTotalRequestsByAdvisors] = useState([]);
    const [totalRequestsByLocations, setTotalRequestsByLocations] = useState([]);
    const [totalRequestsByVisits, setTotalRequestsByVisits] = useState([]);
    const [totalRequestsByFaqs, setTotalRequestsByFaqs] = useState([]);
    const [totalRequestsByMinistryDepartments, setTotalRequestsByMinistryDepartments] = useState([]);

    let dataHandler = async (title, e) => {
        switch (title) {
            case 'Reparticiones':
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
                let ministryDepartment_id = faqs.filter(f => f.id == e.target.value)[0].division
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

        let response = await fetch('/api/divisions', {headers: headers})
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
        let response = await fetch(`/api/reports/total-requests-by-divisions?&faqs=${faqsQP()}&visits=${visitsQP()}`, {headers: headers})
        let data = await response.json()
        return data
    }

    let generateReports = async () => {
        if (checkText(faqsQP()) && checkText(visitsQP())) {
            const promises = Promise.all([
                await getRequestsByVisitFaq(),
                await getTotalRequests(),
                await getTotalRequestsByAdvisors(),
                await getTotalRequestsByVisits(),
                await getTotalRequestsByLocations(),
                await getTotalRequestsByFaqs(),
                await getTotalRequestsByMinistryDepartments()
            ]);
    
            promises
                .then((result) => {
                    setRequests(result[0]);
                    setTotalRequests(result[1]);
                    setTotalRequestsByAdvisors(result[2]);
                    setTotalRequestsByVisits(result[3]);
                    setTotalRequestsByLocations(result[4]);
                    setTotalRequestsByFaqs(result[5]);
                    setTotalRequestsByMinistryDepartments(result[6]);
    
                    setAdvisorsData({
                        labels: result[2]?.map((item) => item.name),
                        datasets: [
                            {
                                label: "Consultas",
                                data: result[2]?.map((data) => data.requests),
                                backgroundColor: colors,
                            },
                        ],
                    });
    
                    setFaqsData({
                        labels: result[5]?.map((item) => item.name),
                        datasets: [
                            {
                                label: "Consultas",
                                data: result[5]?.map((data) => data.requests),
                                backgroundColor: colors,
                            },
                        ],
                    });
    
                    setMinistryDepsData({
                        labels: result[6]?.map((item) => item.name),
                        datasets: [
                            {
                                label: "Consultas",
                                data: result[6]?.map((data) => data.requests),
                                backgroundColor: colors,
                            },
                        ],
                    });
    
                    setVisitsData({
                        labels: result[3]?.map((item) => item.name),
                        datasets: [
                            {
                                label: "Consultas",
                                data: result[3]?.map((data) => data.requests),
                                backgroundColor: colors,
                            },
                        ],
                    });
                })
                .catch((err) => {
                    console.log("Error");
                });
        } else {
            message.error("Debes seleccionar al menos una opción en cada campo");
        }
    };

    const colors = ['#ffa43a', '#ffbf75', '#759eff', '#75c7ff', '#ff5252', '#4fc468', '#b66be8', '#B87D4B','#c7ede8']

    const [advisorsData, setAdvisorsData] = useState({
        labels: [],
        datasets: [{
            label: "",
            data: [],
            backgroundColor: []
        }]
    })

    const [faqsData, setFaqsData] = useState({
        labels: [],
        datasets: [{
            label: "",
            data: [],
            backgroundColor: []
        }]
    })

    const [ministryDepsData, setMinistryDepsData] = useState({
        labels: [],
        datasets: [{
            label: "",
            data: [],
            backgroundColor: []
        }]
    })

    const [visitsData, setVisitsData] = useState({
        labels: [],
        datasets: [{
            label: "",
            data: [],
            backgroundColor: []
        }]
    })


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
        advisorsData: advisorsData,
        ministryDepsData: ministryDepsData,
        faqsData: faqsData,
        visitsData: visitsData,
        dataHandler: dataHandler,
        getRequestsFromVisitDepsFaqs: getRequestsByVisitFaq,
        getMinistryDepartmentsForFilter: getMinistryDepartmentsForFilters,
        getLocationsForFilter: getLocationsForFilters,
        generateReports: generateReports
    }

    return (
        <ReportsContext.Provider value={contextData}>
            <FailedModal onClose={() => toggleModalfailed()} message={"Debes seleccionar al menos un casillero en todos los campos"} show={showfail}/>
            {children}
        </ReportsContext.Provider>
    );

}