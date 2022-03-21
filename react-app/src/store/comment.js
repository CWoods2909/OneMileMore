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

const deleteComment = (id, eventId) => {
    return {
        type: DELETE_COMMENT,
        payload: {id, eventId}
    }
}

//Get all
export const getAllComments = (id) => async dispatch =>{
    const response = await fetch (`/api/comments/${id}`,{
        method: 'GET'
    })
    if(response.ok){
        const {comments} = await response.json();
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

//comment reducer
const initialState = {}
const commentReducer = (state = initialState, action) =>{
    let newState;

    switch(action.type){
        case GET_COMMENTS:
            newState = {...state}
            if(action.comments.length > 0){
                newState[action.comments[0].eventId] = action.comments
            }
            return newState
        
        case ADD_COMMENT:
            newState = {...state}
            newState[action.postComment.eventId] =
            action.postComment
            // console.log(action.postComment);
            return newState
            
            default:
                return state;
    }
}

export default commentReducer