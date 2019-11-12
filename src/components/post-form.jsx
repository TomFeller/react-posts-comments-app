import React from 'react';
import {postData} from "../actions/data-actions";
import {Loader} from "./utils/loader/loader";

class PostForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: ''
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
        const {title, body} = this.state;
        const data = {
            title: title,
            body: body
        };
        this.setState({
            isLoading: true
        });
        postData('posts', data, this.handleSuccess);
    };

    handleSuccess = (data) => {
        this.setState({
            isLoading: false
        });
        this.props.addNewPost(data);
    };

    toggleForm = () => {
        this.setState({
            formOpen: !this.state.formOpen
        })
    };

    render() {
        const {title, body, isLoading, formOpen} = this.state;
        return (
            <div>
                <button onClick={this.toggleForm}>{formOpen ? 'close form' : 'Add new post'}</button>
                {formOpen &&
                <form style={{padding: '10px'}}>
                    <div className='field'>
                        <label>Title</label>
                        <input type={'text'}
                               style={{display: 'block', width: '100%', height: '30px'}}
                               onChange={this.handleChange}
                               name={'title'}
                               value={title}/>
                    </div>
                    <div className='field'>
                        <label style={{width: '100%'}}>Your Post</label>
                        <textarea onChange={this.handleChange}
                                  rows={5}
                                  value={body}
                                  style={{display: 'block', width: '100%'}}
                                  name={'body'}>{body}</textarea>
                    </div>

                    {isLoading ? <Loader size={10}/> : <button onClick={this.handleSubmit}>submit</button>}
                </form>
                }
            </div>
        )
    }
}

export default PostForm;