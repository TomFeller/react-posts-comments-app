import React from 'react';
import {editData, postData} from "../actions/data-actions";
import {Loader} from "./utils/loader/loader";

class PostForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            body: this.props.body,
            id: this.props.id,
            formOpen: this.props.isActive,
            action: this.props.id ? editData : postData
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
        const {action, title, body, id} = this.state;
         const data = {
            id: id,
            title: title,
            body: body
        };
        this.setState({
            isLoading: true
        });

        action('posts', data, this.handleSuccess);

    };

    handleSuccess = (data) => {
        this.setState({
            isLoading: false
        });
        if (!this.props.id) {
            this.props.addNewPost(data);
        } else {
            this.props.updatePost(data);
            this.props.closeForm()
        }
    };

    toggleForm = () => {
        this.setState({
            formOpen: !this.state.formOpen
        })
    };

    render() {
        const {title, body, isLoading, formOpen} = this.state;
        const {closeForm} = this.props;
        return (
            <div>
                <button onClick={closeForm ? closeForm : this.toggleForm}>{formOpen ? 'close form' : 'Add new post'}</button>
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

                    {isLoading ? <Loader size={10}/> : <button onClick={this.handleSubmit}>{this.props.id ? 'save' : 'submit'}</button>}
                </form>
                }
            </div>
        )
    }
}

export default PostForm;