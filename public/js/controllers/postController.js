import { templateLoader } from 'templateLoader';
import { genericRequester } from 'genericRequester';
import { userController } from 'userController';
import { postValidator } from 'postValidator';
import toastr from 'toastr';

const postController = function() {
    function displayHomePage() {
        Promise.all([
            templateLoader().loadTemplate('home'),
            genericRequester().get('api/posts')
        ])
        .then(([template, data]) => {
            $('#app-container').html(template(data));
        });
    }

    function displayPostAddingPage() {
        Promise.resolve(
            templateLoader().loadTemplate('add-post')
        )
        .then(template => {
            $('#app-container').html(template);
        })
        .then(() => {
            $('#add-post-btn').on('click', function(ev) {
                const author = localStorage.getItem('username');
                const authorId = localStorage.getItem('userId');
                const postTitle = $('#title-field').val();
                const postDescription = $('#description-field').val();

                try {
                    postValidator().validateNewPost(postTitle, postDescription);
                    addPost(author, authorId, postTitle, postDescription);
                    location.hash = '!/home';
                }
                catch(err) {
                    toastr.error(err.message);
                }
            });
        });
    }

    function displayPostDetailsPage(postId) {
        Promise.all([
            templateLoader().loadTemplate('details-post'),
            genericRequester().get('api/posts/' + postId)
        ])
        .then(([template, data]) => {
            $('#app-container').html(template(data));
        })
        .then(() => {
            $('#add-comment-btn').on('click', function(ev) {
                const commentText = $('#comment-text').val();

                try {
                    postValidator().validateNewComment(commentText);
                    addComment(postId, localStorage.getItem('username'), localStorage.getItem('userId'), commentText);
                    displayPostDetailsPage(postId);                    
                }
                catch(err) {
                    toastr.error(err.message);
                }

            });
        });
    }

    function addPost(author, authorId, postTitle, postDescription) {
        if(!userController().isUserLogged()) {
            throw new Error('You need to be logged in to add a new post.');
        }

        const today = new Date();
        const timestampString = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()} -- ${today.getHours()}:${today.getMinutes()}`;

        const post = {
            author : author,
            authorId : authorId,
            title : postTitle,
            replies : [
                {
                    author : author,
                    authorId : authorId,
                    text : postDescription,
                    timestamp : timestampString
                }
            ]
        };

        genericRequester().post('api/posts', post);
        toastr.success('Post added!');
        location.hash = '!/home';        
    }

    function addComment(postId, author, authorId, text) {
        if(!userController().isUserLogged()) {
            throw new Error('You need to be logged in to add comments.');
        }

        const today = new Date();
        const timestampString = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()} -- ${today.getHours()}:${today.getMinutes()}`;

        const comment = {
            author : author,
            authorId : authorId,
            text : text,
            timestamp : timestampString
        };

        genericRequester().post('api/posts/' + postId, comment);
        toastr.success('Comment added.');
    }

    return {
        displayHomePage : displayHomePage,
        displayPostAddingPage : displayPostAddingPage,
        displayPostDetailsPage : displayPostDetailsPage
    }
};

export { postController };