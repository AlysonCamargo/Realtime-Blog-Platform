const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { body, validationResult } = require('express-validator');

// Middleware de validação
const validatePost = [
    body('title').trim().isLength({ min: 3, max: 200 }).withMessage('Title must be 3-200 characters'),
    body('content').trim().isLength({ min: 10 }).withMessage('Content must be at least 10 characters'),
    body('author').trim().notEmpty().withMessage('Author name is required'),
    body('category').optional().isIn(['Technology', 'Lifestyle', 'Travel', 'Food', 'Business', 'Other'])
];

// GET /api/posts - Listar todos os posts com filtros
router.get('/', async (req, res) => {
    try {
        const { category, search, sort = '-createdAt', limit = 20, page = 1 } = req.query;
        
        let query = { published: true };
        
        // Filtro por categoria
        if (category && category !== 'All') {
            query.category = category;
        }
        
        // Busca por texto
        if (search) {
            query.$text = { $search: search };
        }
        
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        const posts = await Post.find(query)
            .sort(sort)
            .limit(parseInt(limit))
            .skip(skip);
        
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
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET /api/posts/featured - Posts em destaque
router.get('/featured', async (req, res) => {
    try {
        const posts = await Post.find({ published: true, featured: true })
            .sort('-createdAt')
            .limit(5);
        
        res.json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET /api/posts/stats - Estatísticas
router.get('/stats', async (req, res) => {
    try {
        const totalPosts = await Post.countDocuments({ published: true });
        const totalViews = await Post.aggregate([
            { $match: { published: true } },
            { $group: { _id: null, total: { $sum: '$views' } } }
        ]);
        const totalLikes = await Post.aggregate([
            { $match: { published: true } },
            { $group: { _id: null, total: { $sum: '$likes' } } }
        ]);
        
        const categoryCounts = await Post.aggregate([
            { $match: { published: true } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        
        res.json({
            success: true,
            stats: {
                totalPosts,
                totalViews: totalViews[0]?.total || 0,
                totalLikes: totalLikes[0]?.total || 0,
                categories: categoryCounts
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET /api/posts/:id - Buscar post por ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({ success: false, error: 'Post not found' });
        }
        
        // Incrementar views
        post.views += 1;
        await post.save();
        
        res.json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST /api/posts - Criar novo post
router.post('/', validatePost, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        
        const post = new Post(req.body);
        await post.save();
        
        res.status(201).json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// PUT /api/posts/:id - Atualizar post
router.put('/:id', validatePost, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!post) {
            return res.status(404).json({ success: false, error: 'Post not found' });
        }
        
        res.json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// DELETE /api/posts/:id - Deletar post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        
        if (!post) {
            return res.status(404).json({ success: false, error: 'Post not found' });
        }
        
        res.json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST /api/posts/:id/like - Dar like no post
router.post('/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({ success: false, error: 'Post not found' });
        }
        
        post.likes += 1;
        await post.save();
        
        res.json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST /api/posts/:id/comments - Adicionar comentário
router.post('/:id/comments', [
    body('author').trim().notEmpty().withMessage('Author name is required'),
    body('content').trim().isLength({ min: 1 }).withMessage('Comment cannot be empty')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({ success: false, error: 'Post not found' });
        }
        
        post.comments.push(req.body);
        await post.save();
        
        res.status(201).json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
