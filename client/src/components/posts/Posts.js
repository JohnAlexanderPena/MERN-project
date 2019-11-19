import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PostForm from './PostForm'
import PostFeed from './PostFeed'
import Spinner from '../common/Spinner'
import { getPosts } from '../../actions/postActions'

class Posts extends React.Component {

  componentDidMount() {
    this.props.getPosts(); // fetch posts
  }
  render () {
    const { posts, loading } = this.props.post;
    //initialize post content
    let postContent

    //check is posts is null to setup our spinner function
    if(posts === null || loading) {
      postContent = <Spinner />
    } else {
      postContent = <PostFeed posts={posts} />
    }

    return (
      <div className="feed" >
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <PostForm/>
                {postContent}
              </div>
            </div>
          </div>
      </div>
    )
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})
export default connect(mapStateToProps, { getPosts })(Posts);
