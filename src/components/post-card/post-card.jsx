import React from 'react';
import {getData} from "../../actions/data-actions";
import './card.css';
import PostComment from "./post-comment";
import CommentForm from "../comment-form";
import PostForm from "../post-form";

class PostCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            postData: this.props,
            isOpen: false,
            isCommentsOpen: false,
        }
    }

    componentDidMount() {
        getData(`comments?postId=${this.state.postData.id}`, this.handleSuccess)
    }

    getPostComments() {

    }

    handleSuccess = (comments) => {
        this.setState({
            comments: comments
        })
    };

    togglePost = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };

    toggleComments = () => {
        this.setState({
            isCommentsOpen: !this.state.isCommentsOpen
        })
    };

    addComment = (data) => {
        const comments = this.state.comments.unshift(data);
        this.setState({
            posts: this.state.posts
        })
    };

    toggleEditMode = () => {
        this.setState({
            editMode: !this.state.editMode
        })
    };
    render() {
        const {title, body, id} = this.props;
        const {editMode, comments, isCommentsOpen, isOpen, postData} = this.state;
        return (
            <div className={`post-card ${isOpen ? 'active' : ''}`}>

                {editMode ?
                    <PostForm isActive id={id} title={title} body={body} updateMode updatePost={this.props.updatePost} closeForm={this.toggleEditMode}/>
                    :
                    <div>
                        <h4 onClick={this.togglePost} className={`post-title`}
                            style={{fontWeight: isOpen ? 'bold' : 'normal'}}>{title}</h4>

                        {isOpen && <div>
                            <p className={`post-body`}>{body}</p>
                            <button onClick={this.toggleEditMode}>edit post</button>
                        </div>}


                        {comments && <p className={`post-comments-triger`} onClick={this.toggleComments}
                                        style={{...commentsLength, ...isCommentsOpen && commentsLengthActive}}>
                            {comments.length} comments
                        </p>}

                        {isCommentsOpen &&
                        <div className={`post-comments`}>
                            <CommentForm postId={postData.id} addComment={this.addComment}/>
                            {comments.map((comment, c) => <PostComment {...comment} key={c}/>)}
                        </div>
                        }
                    </div>
                }
            </div>
        )
    }
}

export default PostCard;

const commentsLength = {
    color: '#000',
    margin: 0,
    textAlign: 'right',
    fontSize: '12px',
    padding: '5px 0',
    fontWeight: 'bold'
};
const commentsLengthActive = {
    textDecoration: 'underline'
};