const postService = require('../services/postService');

//// 게시글 등록
const posting = async (req, res) => {
    try {
        const { title, content, userId, postImage } = req.body;
        await postService.posting(title, content, userId, postImage);
        return res.status(201).json({ message: 'POSTING_SUCCESS' });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

//// 전체 게시글 조회
const inquireAllPosts = async (req, res) => {
    try {
        allPosts = await postService.inquireAllPosts();
        return res.status(201).json({ data: allPosts });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

module.exports = {
    posting,
    inquireAllPosts,
};
