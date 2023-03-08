export const getAll = () => fetch('http://localhost:3001/events')
    .then(res => res.json())

export const getEvent = (id) => fetch(`http://localhost:3001/events/${id}`)
    .then(res => res.json())

export const add = (event) => {

    event.dateStart = formatDate(event.dateStart);
    event.dateEnd = formatDate(event.dateEnd);
    event.status = event.status || '';
    event.description = event.description || '';
    event.backgroundColor = event.backgroundColor || '';

    return fetch('http://localhost:3001/events', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(event)
    })
        .then(res => res.json())
}

export const edit = (event) => {

    event.dateStart = formatDate(event.dateStart);
    event.dateEnd = formatDate(event.dateEnd);
    event.status = event.status || '';
    event.description = event.description || '';
    event.backgroundColor = event.backgroundColor || '';

    return fetch('http://localhost:3001/events', {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(event)
    })
        .then(res => res.json())
}

export const remove = (id) => fetch(`http://localhost:3001/events/${id}`, {
    method: 'DELETE'
})
    .then(res => res.json())

const formatDate = (date) => {

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

    return formattedDate;
}