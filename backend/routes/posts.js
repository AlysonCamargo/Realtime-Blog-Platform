const express = require('express');
const router = express.Router();
const {
  postValidationRules,
  commentValidationRules,
  validate
} = require('../middlewares/validator');
const {
  getPosts,
  getFeaturedPosts,
  getStats,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost
} = require('../controllers/postController');

// Define Routes
router.route('/').get(getPosts).post(postValidationRules(), validate, createPost);

router.get('/featured', getFeaturedPosts);
router.get('/stats', getStats);

router
  .route('/:id')
  .get(getPost)
  .put(postValidationRules(), validate, updatePost)
  .delete(deletePost);

router.post('/:id/like', likePost);
router.post('/:id/comments', commentValidationRules(), validate, commentPost);

module.exports = router;
