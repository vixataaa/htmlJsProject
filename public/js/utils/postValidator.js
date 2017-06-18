const postValidator = function() {
    const minTitleLength = 5;
    const minDescriptionLength = 10;
    const minCommentLength = 5;


    function validateNewPost(title, description) {
        if(title.length < minTitleLength) {
            throw new Error(`Title needs to be at least ${minTitleLength} characters long.`);
        }
        if(description.length < minDescriptionLength) {
            throw new Error(`Description needs to be at least ${minDescriptionLength} characters long.`);
        }        
    }

    function validateNewComment(comment) {
        if(comment.length < minCommentLength) {
            throw new Error(`Comments need to be at least ${minCommentLength} characters long.`);            
        }
    }

    return {
        validateNewPost : validateNewPost,
        validateNewComment : validateNewComment
    };
};

export { postValidator };