export const dataHandler = (item) => {
    if (Object.keys(item).length === 3) {
        if (item.id_ministry_department !== undefined) {
            faqsHandler(item)
            console.log("IS FAQ")
        } else {
            if (item.id_department !== undefined) {
                locationsHandler(item)
                console.log("IS LOCATION")
            } else {
                ministryDepartmentsHandler(item)
                console.log("IS MINISTRY")
            }
        }
    } else {
        visitsHandler(item)
        console.log("IS VISIT")
    }
}


const visits = {}
const faqs = {}
const ministryDepartments = {}
const locations = {}

const visitsHandler = (visit) => {
    if (visit.id in visits) {
        visits[visit.id] = visits[visit.id] + 1
        console.log(visits)
    } else {
        visits[visit.id] = 1
        console.log(visits)
    }

}

const faqsHandler = (faq) => {
    if (faq.id in faqs) {
        faqs[faq.id] = faqs[faq.id] + 1
        console.log(faqs)
    } else {
        faqs[faq.id] = 1
        console.log(faqs)
    }
}

const locationsHandler = (location) => {
    if (location.id in locations) {
        locations[location.id] = locations[location.id] + 1
        console.log(locations)
    } else {
        locations[location.id] = 1
        console.log(locations)
    }
}

const ministryDepartmentsHandler = (ministryDepartment) => {
    if (ministryDepartment.id in ministryDepartments) {
        ministryDepartments[ministryDepartment.id] = ministryDepartments[ministryDepartment.id] + 1
        console.log(ministryDepartments)
    } else {
        ministryDepartments[ministryDepartment.id] = 1
        console.log(ministryDepartments)
    }
}