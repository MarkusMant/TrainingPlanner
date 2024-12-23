export function getTrainings() {
    return fetch(import.meta.env.VITE_API_URL_TRAININGS)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in fetching trainings: " + response.statusText);
            }
            return response.json();
        });
}
export function getTrainingsWithCustomer() {
    return fetch(import.meta.env.VITE_API_URL_TRAININGS_WITH_CUSTOMER)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in fetching trainings: " + response.statusText);
            }
            return response.json();
        });
}

export function saveTraining(newTraining) {
    return fetch(import.meta.env.VITE_API_URL_TRAININGS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTraining)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error("Error in saving entry: " + JSON.stringify(err));
            });
        }
        return response.json();
    });
}

export function deleteTraining(url) {
    console.log(url);
    return fetch(url, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in deleting entry: " + response.statusText);
            }
            return response.json();
        })
}