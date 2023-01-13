const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

//// 게시글 등록
router.post('/', postController.posting);

//// 전체 게시글 조회
router.get('/', postController.inquireAllPosts);

module.exports = {
    router,
};
