export function getCustomers() {
    return fetch(import.meta.env.VITE_API_URL_CUSTOMERS)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in fetching entry: " + response.statusText);
            }
            return response.json();
        })
}

export function deleteCustomer(url) {
    return fetch(url, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in deleting entry: " + response.statusText);
            }
            return response.json();
        })
}

export function saveCustomer(newCustomer) {
    return fetch(import.meta.env.VITE_API_URL_CUSTOMERS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCustomer)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in saving entry: " + response.statusText);
            }
            return response.json();
        })
}

export function updateCustomer(url, customer) {
    return fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in updating entry: " + response.statusText);
            }
            return response.json();
        })
}


