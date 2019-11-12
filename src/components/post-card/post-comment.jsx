import React from 'react';
import {getData} from "../../actions/data-actions";
import './comment.css';

class PostComment extends React.Component {
    render() {
        const {id, postId, name, email, body} = this.props;

        return (
            <div id={`comment-${id}`} className={'comment'}>
                <div className={'comment-header'}>
                    <h6>{email}</h6>
                </div>
                <div className={'comment-body'}>
                    <p>{body}</p>
                </div>
            </div>
        )
    }
}

export default PostComment;
