const ADD_EVENT = 'events/ADD_EVENT'
const EDIT_EVENT = 'events/EDIT_EVENT'
const LOAD_EVENTS = 'events/LOAD_EVENTS'
const DELETE_EVENT = 'events/DELETE_EVENT'

const add = (evt) => ({
    type: ADD_EVENT,
    evt
})

const edit = (evt) => ({
    type: EDIT_EVENT,
    evt
})

const load = (evt) => ({
    type: LOAD_EVENTS,
    evt
})

const destroy = (evt) => ({
    type: DELETE_EVENT,
    evt
})

// get all events
export const allEvents = () => async dispatch => {
    const response = await fetch(`/api/events/all`)

    if (response.ok) {
        const events = await response.json();
        dispatch(load(events))
        return events
    }
}


//new event
export const newEvent = (eventName, location, length, date, time, description) => async dispatch => {
    const response = await fetch(`/api/events/create`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({eventName, location, length, date, time, description})
    })
    if(response.ok){
        const newEvent = await response.json()
        if(newEvent?.errors) return newEvent
        dispatch(add(newEvent))
        return newEvent
    }
    
}

//delete event
export const deleteEvent = (evt) => async dispatch => {
    const response = await fetch(`/api/events/${evt.id}`,{
        method: 'DELETE'
    })
    if(response.ok){
        const delete_Event = await response.json();
        dispatch(destroy(delete_Event))
        return delete_Event
    }
}

//edit event
export const edtEvent = (id, eventName, location, length, date, time, description) => async dispatch => {
    const response = await fetch(`/api/events/${id}`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id, eventName, location, length, date, time, description})
    })
    if(response.ok){
        const event = await response.json()
        if(event?.errors) return event
        dispatch(edit(event))
        return event
    }
}



//events reducer
const initialState = {}

const eventReducer = (state = initialState, action) => {
    let newState;

    switch(action.type){
        case LOAD_EVENTS:
            newState = {...state}
            action.evt.events.forEach(event => {
                newState[event.id] = event
            });  
            return newState

        case ADD_EVENT:
            newState = {...state}
            newState[action.evt.id] = action.evt
            return newState;

        case DELETE_EVENT:
            newState = {...state}
            delete newState[action.evt.id]
            return newState

        case EDIT_EVENT:
            newState = {...state}
            newState[action.evt.id] = action.evt
            return newState

            default:
                return state
        }
    }

export default eventReducer