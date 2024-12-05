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
    console.log(newTraining);
    console.log(JSON.stringify(newTraining));
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
    return fetch(url, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in deleting entry: " + response.statusText);
            }
            return response.json();
        })
}

export function updateTraining(url, training) {
    return fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(training)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in updating entry: " + response.statusText);
            }
            return response.json();
        })
}