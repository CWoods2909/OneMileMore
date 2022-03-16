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
    const response = await fetch(`/api/events/`)

    if (response.ok) {
        const events = await response.json();
        dispatch(load(events))
        return events
    }
}


//events reducer
const initialState = {}

const eventReducer = (state = initialState, action) => {
    let newState = {...state}

    switch(action.type){
        case LOAD_EVENTS:
            console.log(action);
            action.evt.events.forEach(event => {
                newState[event.id] = event
            });  
            return newState

            default:
                return state
        }
    }

export default eventReducer