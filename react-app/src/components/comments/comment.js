import React from 'react';
import './Comment.css'

function Comment({ comment }) {
    return (
        <div className='outer-comment'>

            <ul className='comment-container'>
                <strong>
                    {comment?.username}
                </strong>
                <li>
                    {comment?.body}
                </li>

            </ul>
        </div>
    )
}
export default Comment