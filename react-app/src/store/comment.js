const GET_COMMENTS = 'comments/loadAllComments'
const ADD_COMMENT = 'comments/createComment'
const EDIT_COMMENT = 'comments/updateComment'
const DELETE_COMMENT = 'comments/destroyComment'

const getComments = (comments) => {
    return {
        type: GET_COMMENTS,
        comments
    }
}

const addComment = (postComment) => {
    return {
        type: ADD_COMMENT,
        postComment
    }
}

const editComment = (updateComment) => {
    return {
        type: EDIT_COMMENT,
        updateComment
    }
}

const deleteComment = (id) => {
    return {
        type: DELETE_COMMENT,
        id
    }
}

//Get all
export const getAllComments = () => async dispatch =>{
    const response = await fetch (`/api/comments/`,{
        method: 'GET'
    })
    if(response.ok){
        const comments = await response.json();
        console.log(comments);
        dispatch(getComments(comments))
        return comments
    }
}

//post comment
export const newComment = (body, event) => async dispatch => {
    const response = await fetch (`/api/comments/${event}`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({body})
        
    })
    if(response.ok){
        const new_comment = await response.json()
        if(new_comment?.errors) return new_comment
        dispatch(addComment(new_comment))
        return new_comment
    }
}

//delete comment
export const commentDelete = (id) => async dispatch => {
    console.log(id);
    const response = await fetch(`/apa/events/${id}`, {
        method: 'DELETE'
    })
    if(response.ok){
        const deleted = await response.json()
        dispatch(deleteComment(deleted))
        return deleted
    }
}

//comment reducer
const initialState = {}
const commentReducer = (state = initialState, action) =>{
    let newState;

    switch(action.type){
        case GET_COMMENTS:
            newState = {...state}
                action.comments.comments.forEach(comment => {
                    newState[comment.id] = comment
                });
                return newState
            
        case ADD_COMMENT:
            newState = {...state}
            newState[action.postComment.eventId] = action.postComment
            return newState

        case DELETE_COMMENT:
            newState = {...state}
            newState[action.comment.id] = action.comment 
            return newState
            
            default:
                return state;
    }
}

export default commentReducer