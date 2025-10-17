const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters'],
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        trim: true,
        minlength: [10, 'Content must be at least 10 characters']
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true
    },
    category: {
        type: String,
        enum: ['Technology', 'Lifestyle', 'Travel', 'Food', 'Business', 'Other'],
        default: 'Other'
    },
    tags: [{
        type: String,
        trim: true
    }],
    imageUrl: {
        type: String,
        default: null
    },
    likes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    comments: [commentSchema],
    featured: {
        type: Boolean,
        default: false
    },
    published: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Índices para melhor performance
postSchema.index({ title: 'text', content: 'text', tags: 'text' });
postSchema.index({ createdAt: -1 });
postSchema.index({ category: 1 });

// Método virtual para contagem de comentários
postSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

// Método para resumo do post
postSchema.methods.getExcerpt = function(length = 150) {
    return this.content.length > length 
        ? this.content.substring(0, length) + '...'
        : this.content;
};

module.exports = mongoose.model('Post', postSchema);
