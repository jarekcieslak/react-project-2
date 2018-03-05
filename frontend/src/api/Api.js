import {allPostsError, allPostsLoad, allPostsReceived, postVoteSuccess} from "../post-list/PostListActions";
import {mapJsonToPosts} from "../post-list/PostListMappers";
import {AUTH_HEADER, BASE_URL} from "../Constants";
import {
    postCommentsError,
    postCommentsLoad,
    postCommentsReceived,
    postDeleteCommentError,
    postDeleteCommentLoad,
    postDeleteCommentReceived,
    postDeleteError,
    postDeleteLoad,
    postDeleteReceived,
    postDetailsError,
    postDetailsLoad,
    postDetailsReceived
} from "../post-details/PostDetailsActions";
import {guid} from "../utils/uuid";
import {
    postAddCommentError,
    postAddCommentLoad,
    postAddCommentReceived,
    postEditCommentError,
    postEditCommentLoad,
    postEditCommentReceived,
    postVoteCommentError,
    postVoteCommentLoad,
    postVoteCommentReceived,
} from "../comments/PostCommentActions";
import {mapJsonToComments} from "../comments/PostCommentsMapper";
import {
    postAddError,
    postAddLoad,
    postAddReceived,
    postEditError,
    postEditLoad,
    postEditReceived
} from "../post-form/PostFormActions";
import {allCategoriesError, allCategoriesLoad, allCategoriesReceived} from "../categories/CategoriesActions";


// LIST
export const fetchAllPosts = () => dispatch => {
    dispatch(allPostsLoad());
    return fetch(`${BASE_URL}/posts`, {headers: AUTH_HEADER})
        .then(res => res.json())
        .then(data => mapJsonToPosts(data))
        .then(data => new Promise(resolve => setTimeout(() => resolve(dispatch(allPostsReceived(data))), 500)))
        .catch(error => dispatch(allPostsError()))
};


// DETAILS
export const fetchPostDetails = (id) => dispatch => {
    if (id) {
        dispatch(postDetailsLoad());

        return fetch(`${BASE_URL}/posts/${id}`, {headers: AUTH_HEADER})
            .then((res) => res.json())
            .then(data => new Promise(resolve => setTimeout(() => resolve(dispatch(postDetailsReceived(data))), 500)))
            .catch(error => dispatch(postDetailsError()))
    }
};

export const deletePost = (id) => dispatch => {
    if (id) {
        dispatch(postDeleteLoad());
        return fetch(`${BASE_URL}/posts/${id}`, {method: 'DELETE', headers: AUTH_HEADER})
            .then((res) => res.json())
            .then(data => {
                dispatch(postDeleteReceived(data))
            })
            .catch(error => dispatch(postDeleteError()))
    }
};

export const createPost = (data) => dispatch => {
    if (data) {
        dispatch(postAddLoad());

        return genericPostDataHandler(`${BASE_URL}/posts`,
            {
                id: guid(),
                timestamp: Date.now(),
                title: data.title,
                body: data.body,
                author: data.author,
                category: data.category
            })
            .then(res => res.json())
            .then(data => dispatch(postAddReceived(data)))
            .catch(error => dispatch(postAddError()))
    }
};

// PUT /comments/:id
// USAGE:
//     Edit the details of an existing comment
//
// PARAMS:
//     timestamp: timestamp. Get this however you want.
//     body: String
export const editPost = (postId, data) => dispatch => {
    if (data) {
        dispatch(postEditLoad());

        return genericPutDataHandler(`${BASE_URL}/posts/${postId}`,
            {
                timestamp: Date.now(),
                body: data.body
            })
            .then(res => res.json())
            .then(data => dispatch(postEditReceived(data)))
            .catch(error => dispatch(postEditError()))
    }
};


export const votePost = (id, isVoteUp) => dispatch => {
    if (id) {
        return genericPostDataHandler(`${BASE_URL}/posts/${id}`, {option: isVoteUp ? 'upVote' : 'downVote'})
            .then(res => res.json())
            .then(data => {
                return dispatch(postVoteSuccess(data))
            })
    }
};


// COMMENTS
export const fetchPostComments = (id) => dispatch => {
    if (id) {
        dispatch(postCommentsLoad());
        return fetch(`${BASE_URL}/posts/${id}/comments`, {headers: AUTH_HEADER})
            .then((res) => res.json())
            .then(data => mapJsonToComments(data))
            .then(data => new Promise(resolve => setTimeout(() => resolve(dispatch(postCommentsReceived(data))), 300)))
            .catch(error => dispatch(postCommentsError()))
    }
};

export const postNewComment = (postId, comment, author) => dispatch => {
    if (postId && comment && author) {
        dispatch(postAddCommentLoad());
        return genericPostDataHandler(`${BASE_URL}/comments`,
            {
                id: guid(),
                timestamp: Date.now(),
                body: comment,
                author: author,
                parentId: postId
            })
            .then(res => res.json())
            .then(data => dispatch(postAddCommentReceived(data)))
            .catch(error => {
                console.log(error);
                dispatch(postAddCommentError())
            })
    }
};

// PUT /comments/:id
// USAGE:
//     Edit the details of an existing comment
//
// PARAMS:
//     timestamp: timestamp. Get this however you want.
//     body: String
export const updateComment = (commentId, body) => dispatch => {
    if (commentId && body) {
        dispatch(postEditCommentLoad());
        return genericPutDataHandler(`${BASE_URL}/comments/${commentId}`, {
            timestamp: Date.now(),
            body: body
        })
            .then(res => res.json())
            .then(data => dispatch(postEditCommentReceived(data)))
            .catch(error => dispatch(postEditCommentError()))
    }
};


export const voteComment = (id, isVoteUp) => dispatch => {
    if (id) {
        dispatch(postVoteCommentLoad(id));
        return genericPostDataHandler(`${BASE_URL}/comments/${id}`, {option: isVoteUp ? 'upVote' : 'downVote'})
            .then(res => res.json())
            .then(data => dispatch(postVoteCommentReceived(data)))
            .catch(error => dispatch(postVoteCommentError()))
    }
};
export const deleteComment = (id) => dispatch => {
    if (id) {
        dispatch(postDeleteCommentLoad());
        return fetch(`${BASE_URL}/comments/${id}`, {method: 'DELETE', headers: AUTH_HEADER})
            .then((res) => res.json())
            .then(data => dispatch(postDeleteCommentReceived(data)))
            .catch(error => dispatch(postDeleteCommentError()))
    }
};


function genericPostDataHandler(url, data) {
    // Default options are marked with *
    return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *omit
        headers: {
            ...AUTH_HEADER,
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *same-origin
        redirect: 'follow', // *manual, error
        referrer: 'no-referrer', // *client
    })
}

function genericPutDataHandler(url, data) {
    return fetch(url, {
        headers: {
            ...AUTH_HEADER,
            'content-type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(data)
    })

}


// LIST
export const fetchAllCategories = () => dispatch => {
    dispatch(allCategoriesLoad());
    return fetch(`${BASE_URL}/categories`, {headers: AUTH_HEADER})
        .then(res => res.json())
        .then(data => new Promise(resolve => setTimeout(() => resolve(dispatch(allCategoriesReceived(data))), 300)))
        .catch(error => dispatch(allCategoriesError()))
};


export const Api = {
    fetchAllPosts: fetchAllPosts,
    fetchPostDetails: fetchPostDetails,
    fetchAllCategories: () => fetchAllCategories(),

    addPost: (data) => createPost(data),
    editPost: (id, data) => editPost(id, data),
    deletePost: (id) => deletePost(id),

    postNewComment: (postId, comment, author) => postNewComment(postId, comment, author),
    updateComment: (commentId, body) => updateComment(commentId, body)
};
