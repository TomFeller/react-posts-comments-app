import React from 'react';
import {postData} from "../actions/data-actions";
import {Loader} from "./utils/loader/loader";

class CommentForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            body: 'Your comment',
            name: 'Your Name',
            email: 'your@email.com'
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {title, body, email} = this.state;
        const data = {
            name: title,
            body: body,
            email: email
        };
        this.setState({
            isLoading: true
        });
        postData(`posts/${this.props['postId']}/comments`, data, this.handleSuccess);
    };

    handleSuccess = (data) => {
        this.setState({
            isLoading: false
        });
        this.props.addComment(data);
    };


    render() {
        const {name, body,  email, isLoading} = this.state;
        return (
            <div style={{backgroundColor: '#e6e6e4'}}>
                <h4 style={{textAlign: 'center', margin: 0}}>Add your comment</h4>
                <form style={{padding: '10px'}}>
                    <div className='field'>
                        <label>Title</label>
                        <input type={'text'}
                               style={{display: 'block', width: '100%', height: '30px'}}
                               onChange={this.handleChange}
                               name={'name'}
                               value={name}/>
                    </div>
                    <div className='field'>
                        <label>Title</label>
                        <input type={'text'}
                               style={{display: 'block', width: '100%', height: '30px'}}
                               onChange={this.handleChange}
                               name={'email'}
                               value={email}/>
                    </div>
                    <div className='field'>
                        <label style={{width: '100%'}}>Your Comment</label>
                        <textarea onChange={this.handleChange}
                                  rows={5}
                                  value={body}
                                  style={{display: 'block', width: '100%'}}
                                  name={'body'}>{body}</textarea>
                    </div>

                    {isLoading ? <Loader size={10}/> : <button onClick={this.handleSubmit}>submit</button>}
                </form>
            </div>
        )
    }
}

export default CommentForm;