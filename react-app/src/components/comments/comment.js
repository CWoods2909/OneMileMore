import React from 'react';
// import { useSelector } from 'react-redux';

function Comment({ comment }) {
    return (
        <ul className='comment-container'>
            <li>
                {comment?.username}
            </li>
            <li>
                {comment?.body}
            </li>

        </ul>
    )
}
export default Comment