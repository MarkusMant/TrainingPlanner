import { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getTrainingsWithCustomer } from '../utils/trainingapi';

const localizer = momentLocalizer(moment);

function Calendar() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getTrainingsWithCustomer()
            .then(data => {
                console.log(data);
                const trainings = data.map(training => ({
                    id: training.id,
                    title: `${training.activity} with ${training.customer.firstname} ${training.customer.lastname}`,
                    start: new Date(training.date),
                    end: new Date(moment(training.date).add(training.duration, 'minutes').toISOString())
                }));
                console.log("formatted events: ", trainings)
                setEvents(trainings);
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <div style={{ height: 800 }}>
            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
}

export default Calendar;