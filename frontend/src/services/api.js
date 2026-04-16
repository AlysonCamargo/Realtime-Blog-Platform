import axios from 'axios';
import { useToast } from 'vue-toastification';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 10000,
});

// Interceptor to handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const toast = useToast();
        const message = error.response?.data?.error || 'An unexpected error occurred';
        // Only show toast from client-side if window is available
        if (typeof window !== 'undefined') {
            toast.error(message);
        }
        return Promise.reject(error);
    }
);

export const postService = {
    getPosts(params) {
        return api.get('/posts', { params });
    },
    getFeaturedPosts() {
        return api.get('/posts/featured');
    },
    getStats() {
        return api.get('/posts/stats');
    },
    getPost(id) {
        return api.get(`/posts/${id}`);
    },
    createPost(data) {
        return api.post('/posts', data);
    },
    updatePost(id, data) {
        return api.put(`/posts/${id}`, data);
    },
    deletePost(id) {
        return api.delete(`/posts/${id}`);
    },
    likePost(id) {
        return api.post(`/posts/${id}/like`);
    },
    commentPost(id, data) {
        return api.post(`/posts/${id}/comments`, data);
    }
};

export default api;
