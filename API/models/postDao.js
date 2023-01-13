const { myDataSource } = require('./myDataSource');

//// 게시글 등록
const posting = async (title, content, userId, postImage) => {
    const result = await myDataSource.query(
        `INSERT INTO posts(
            title,
            content,
            user_id,
            post_image
        ) VALUES (?, ?, ?, ?);
        `,
        [title, content, userId, postImage]
    );
    return result;
};

//// 전체 게시글 조회
const inquireAllPosts = async () => {
    const result = await myDataSource.query(
        `SELECT
        users.id AS userId,
        posts.id AS postingId,
        posts.post_image AS postingImageUrl,
        posts.content AS postingContent
        FROM users
        INNER JOIN posts ON posts.user_id = users.id
        `
    );
    return result;
};

module.exports = {
    posting,
    inquireAllPosts,
};
