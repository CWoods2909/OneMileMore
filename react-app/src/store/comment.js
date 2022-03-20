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
        console.log(comments);
        dispatch(getComments(comments))
        return comments
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
                console.log(action.comments);
            }
            return newState

            default:
                return state;
    }
}

export default commentReducer