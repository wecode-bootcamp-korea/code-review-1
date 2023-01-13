const postDao = require('../models/postDao');

//// 게시글 등록

const posting = async (title, content, userId, postImage) => {
    return await postDao.posting(title, content, userId, postImage);
};

//// 전체 게시물 조회

const inquireAllPosts = async () => {
    const result = await postDao.inquireAllPosts();
    return result;
};

module.exports = {
    posting,
    inquireAllPosts,
};
