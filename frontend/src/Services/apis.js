const BASE_URL = "http://localhost:4000"


export const concernEndpoint = {
    CREATE_CONCERN: `${BASE_URL}/add-concern`,
    GET_CONCERN: `${BASE_URL}/get-all-concern`,
}

export const treatmentEndpoint = {
    CREATE_TREATEMENT: `${BASE_URL}/add-treatment`,
    GET_ALL_TREATMENT: `${BASE_URL}/get-all-treatment`,
}

export const packageEndpoint = {
    CREATE_PACKAGE: `${BASE_URL}/add-package`,
    GET_ALL_PACKAGE: `${BASE_URL}/get-all-package`,
}

export const enquiryEndpoint = {
    CREATE_ENQUIRY: `${BASE_URL}/create-enquiry`,   
    GET_ALL_ENQUIRY: `${BASE_URL}/get-all-enquiry`,
}