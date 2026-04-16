import { ref, computed } from 'vue';
import { postService } from '../services/api';
import { useToast } from 'vue-toastification';

export function usePosts() {
    const posts = ref([]);
    const featuredPosts = ref([]);
    const stats = ref({
        totalPosts: 0,
        totalViews: 0,
        totalLikes: 0,
        categories: []
    });
    
    const loading = ref(false);
    const searchQuery = ref('');
    const selectedCategory = ref('All');
    
    const toast = useToast();

    const fetchPosts = async () => {
        loading.value = true;
        try {
            const params = {};
            if (searchQuery.value) params.search = searchQuery.value;
            if (selectedCategory.value !== 'All') params.category = selectedCategory.value;

            const response = await postService.getPosts(params);
            posts.value = response.data.data;
        } catch (error) {
            console.error('Failed fetching posts:', error);
        } finally {
            loading.value = false;
        }
    };

    const fetchFeaturedPosts = async () => {
        try {
            const response = await postService.getFeaturedPosts();
            featuredPosts.value = response.data.data;
        } catch (error) {
            console.error('Failed fetching featured posts', error);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await postService.getStats();
            stats.value = response.data.stats;
        } catch (error) {
            console.error('Failed fetching stats', error);
        }
    };

    const refreshData = async () => {
        await Promise.all([fetchPosts(), fetchFeaturedPosts(), fetchStats()]);
    };

    const handleLike = async (postId) => {
        try {
            await postService.likePost(postId);
            refreshData(); // Could be optimized by mutating local state instead of full refetch
        } catch (error) {}
    };

    const handleView = async (postId) => {
        try {
            await postService.getPost(postId);
        } catch (error) {}
    };

    const handleDelete = async (postId) => {
        if (!confirm('Tem certeza que deseja deletar este post?')) return;
        
        try {
            await postService.deletePost(postId);
            toast.success('Post deletado com sucesso!');
            refreshData();
        } catch (error) {}
    };

    return {
        posts,
        featuredPosts,
        stats,
        loading,
        searchQuery,
        selectedCategory,
        fetchPosts,
        fetchFeaturedPosts,
        fetchStats,
        refreshData,
        handleLike,
        handleView,
        handleDelete
    };
}
