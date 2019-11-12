import React from 'react';
import {getData} from "../actions/data-actions";
import PostCard from "./post-card/post-card";
import PostForm from "./post-form";
import {Loader} from "./utils/loader/loader";

class Feed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            posts: []
        }
    }

    componentDidMount() {
        getData('posts', this.handleSuccess)
    }

    handleSuccess = (data) => {
        this.setState({
            posts: data,
            isLoading: false
        })
    };

    addNewPost = (data) => {
        console.log(data)
        const posts = this.state.posts.unshift(data);
        this.setState({
            posts: this.state.posts
        })
    };

    render() {
        const {posts, isLoading} = this.state;
        return (
            <div style={{backgroundColor: '#13e9ff'}}>
                {isLoading ?
                    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center'}}>
                        <Loader size={15}/>
                    </div>
                    :
                    <div>
                        <h3 style={{marginTop: 0}}>Posts</h3>
                        <PostForm addNewPost={this.addNewPost}/>
                        {posts.map((post, p) => <PostCard key={p} {...post}/>)}
                    </div>
                }
            </div>
        )
    }
}

export default Feed;