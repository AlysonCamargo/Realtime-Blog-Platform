const Post = require('../models/Post');

// Simple async handler to avoid repeating try/catch
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// @desc    Get all posts
// @route   GET /api/posts
const getPosts = asyncHandler(async (req, res) => {
  const { category, search, sort = '-createdAt', limit = 20, page = 1 } = req.query;

  let query = { published: true };

  if (category && category !== 'All') {
    query.category = category;
  }

  if (search) {
    query.$text = { $search: search };
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const posts = await Post.find(query).sort(sort).limit(parseInt(limit)).skip(skip);

  const total = await Post.countDocuments(query);

  res.json({
    success: true,
    data: posts,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / parseInt(limit))
    }
  });
});

// @desc    Get featured posts
// @route   GET /api/posts/featured
const getFeaturedPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ published: true, featured: true }).sort('-createdAt').limit(5);
  res.json({ success: true, data: posts });
});

// @desc    Get post statistics
// @route   GET /api/posts/stats
const getStats = asyncHandler(async (req, res) => {
  const totalPosts = await Post.countDocuments({ published: true });

  const totalViewsData = await Post.aggregate([
    { $match: { published: true } },
    { $group: { _id: null, total: { $sum: '$views' } } }
  ]);
  const totalViews = totalViewsData.length > 0 ? totalViewsData[0].total : 0;

  const totalLikesData = await Post.aggregate([
    { $match: { published: true } },
    { $group: { _id: null, total: { $sum: '$likes' } } }
  ]);
  const totalLikes = totalLikesData.length > 0 ? totalLikesData[0].total : 0;

  const categories = await Post.aggregate([
    { $match: { published: true } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  res.json({
    success: true,
    stats: {
      totalPosts,
      totalViews,
      totalLikes,
      categories
    }
  });
});

// @desc    Get single post
// @route   GET /api/posts/:id
const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  post.views += 1;
  await post.save();
  res.json({ success: true, data: post });
});

// @desc    Create a new post
// @route   POST /api/posts
const createPost = asyncHandler(async (req, res) => {
  const post = await Post.create(req.body);
  res.status(201).json({ success: true, data: post });
});

// @desc    Update a post
// @route   PUT /api/posts/:id
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  res.json({ success: true, data: post });
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  res.json({ success: true, message: 'Post deleted successfully' });
});

// @desc    Like a post
// @route   POST /api/posts/:id/like
const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  post.likes += 1;
  await post.save();
  res.json({ success: true, data: post });
});

// @desc    Add a comment
// @route   POST /api/posts/:id/comments
const commentPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  post.comments.push(req.body);
  await post.save();
  res.status(201).json({ success: true, data: post });
});

module.exports = {
  getPosts,
  getFeaturedPosts,
  getStats,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost
};
