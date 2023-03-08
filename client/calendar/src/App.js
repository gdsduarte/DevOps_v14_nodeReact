import './App.css';
import 'smart-webcomponents-react/source/styles/smart.default.css';

import { useEffect, useState, useRef } from 'react';

import Scheduler from 'smart-webcomponents-react/scheduler';
import { add, edit, remove, getAll } from './eventService';

function App() {

    const [events, setEvents] = useState([]);

    const schedulerRef = useRef(null);

    useEffect(() => {
        getAll()
            .then(events => {

                events = events.map(event => {

                    event.allDay = event.allDay ? true : false;
                    event.dateStart = new Date(event.dateStart);
                    event.dateEnd = new Date(event.dateEnd);

                    return event
                })

                setEvents(events)

            })
            .catch(console.log)
    }
        , []
    )

    const handleItemChange = async (e) => {

        const eventType = e.detail.type;
        const event = e.detail.item;

        switch (eventType) {
            case 'insert':
                addEvent(event)
                break;
            case 'remove':
                removeEvent(event?.id)
                break;
            case 'drag':
            case 'resize':
            case 'update':
                updateEvent(event)
                break;
            default:
                break;
        }
    }

    const addEvent = (event) => add(event)
        .then(event => {

            event.allDay = event.allDay ? true : false;
            event.dateStart = new Date(event.dateStart);
            event.dateEnd = new Date(event.dateEnd);

            setEvents(events => [...events, event])

        })
        .catch(console.log)

    const updateEvent = (event) => edit(event)
        .catch(console.log)

    const removeEvent = (id) => remove(id)
        .catch(console.log)

    const handleEditDialogOpen = (event) => {

        const editors = event.detail.editors;

        if (!editors) {
            return;
        }

        editors.repeat.classList.add('smart-hidden');
        editors.notifications.classList.add('smart-hidden');
        editors.conference.classList.add('smart-hidden');

        editors.description
            .querySelector('.smart-element')
            .placeholder = 'Enter a description for the event..';

    }

    return (
        <>
            <Scheduler
                id="scheduler"
                ref={schedulerRef}
                dataSource={events}
                view="month"
                onItemChange={handleItemChange}
                onEditDialogOpen={handleEditDialogOpen}
            />
        </>
    );
}

export default App;