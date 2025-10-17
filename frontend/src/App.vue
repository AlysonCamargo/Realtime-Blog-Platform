<template>
    <div class="app">
      <!-- Header -->
      <header class="app-header">
        <div class="container">
          <h1 class="logo">📝 Real-Time Blog</h1>
          <button @click="showNewPostModal = true" class="btn btn-primary">
            ➕ Novo Post
          </button>
        </div>
      </header>
  
      <!-- Stats Dashboard -->
      <section class="stats-section">
        <div class="container">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">📚</div>
              <div class="stat-content">
                <h3>{{ stats.totalPosts }}</h3>
                <p>Total de Posts</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">👀</div>
              <div class="stat-content">
                <h3>{{ formatNumber(stats.totalViews) }}</h3>
                <p>Visualizações</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">❤️</div>
              <div class="stat-content">
                <h3>{{ formatNumber(stats.totalLikes) }}</h3>
                <p>Curtidas</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Search and Filter -->
      <section class="filters-section">
        <div class="container">
          <SearchBar 
            v-model:search="searchQuery"
            v-model:category="selectedCategory"
            @search="handleSearch"
          />
        </div>
      </section>
  
      <!-- Featured Posts -->
      <section v-if="featuredPosts.length > 0" class="featured-section">
        <div class="container">
          <h2 class="section-title">⭐ Posts em Destaque</h2>
          <div class="featured-grid">
            <PostCard
              v-for="post in featuredPosts"
              :key="post._id"
              :post="post"
              :featured="true"
              @like="handleLike"
              @view="handleView"
              @delete="handleDelete"
              @edit="handleEdit"
            />
          </div>
        </div>
      </section>
  
      <!-- All Posts -->
      <section class="posts-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">📰 Últimos Posts</h2>
            <span class="post-count">{{ posts.length }} post(s)</span>
          </div>
  
          <div v-if="loading" class="loading">
            <div class="spinner"></div>
            <p>Carregando posts...</p>
          </div>
  
          <div v-else-if="posts.length === 0" class="empty-state">
            <p class="empty-icon">📭</p>
            <p class="empty-text">Nenhum post encontrado.</p>
            <button @click="showNewPostModal = true" class="btn btn-primary">
              Criar Primeiro Post
            </button>
          </div>
  
          <div v-else class="posts-grid">
            <PostCard
              v-for="post in posts"
              :key="post._id"
              :post="post"
              @like="handleLike"
              @view="handleView"
              @delete="handleDelete"
              @edit="handleEdit"
            />
          </div>
        </div>
      </section>
  
      <!-- New/Edit Post Modal -->
      <PostForm
        v-if="showNewPostModal || editingPost"
        :post="editingPost"
        @close="closeModal"
        @save="handleSave"
      />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import PostCard from './components/PostCard.vue';
  import PostForm from './components/PostForm.vue';
  import SearchBar from './components/SearchBar.vue';
  
  const API_URL = 'http://localhost:5000/api';
  
  export default {
    name: 'App',
    components: {
      PostCard,
      PostForm,
      SearchBar
    },
    setup() {
      const posts = ref([]);
      const featuredPosts = ref([]);
      const stats = ref({
        totalPosts: 0,
        totalViews: 0,
        totalLikes: 0
      });
      const loading = ref(false);
      const showNewPostModal = ref(false);
      const editingPost = ref(null);
      const searchQuery = ref('');
      const selectedCategory = ref('All');
  
      const fetchPosts = async () => {
        loading.value = true;
        try {
          const params = {};
          if (searchQuery.value) params.search = searchQuery.value;
          if (selectedCategory.value !== 'All') params.category = selectedCategory.value;
  
          const response = await axios.get(`${API_URL}/posts`, { params });
          posts.value = response.data.data;
        } catch (error) {
          console.error('Error fetching posts:', error);
          alert('Erro ao carregar posts');
        } finally {
          loading.value = false;
        }
      };
  
      const fetchFeaturedPosts = async () => {
        try {
          const response = await axios.get(`${API_URL}/posts/featured`);
          featuredPosts.value = response.data.data;
        } catch (error) {
          console.error('Error fetching featured posts:', error);
        }
      };
  
      const fetchStats = async () => {
        try {
          const response = await axios.get(`${API_URL}/posts/stats`);
          stats.value = response.data.stats;
        } catch (error) {
          console.error('Error fetching stats:', error);
        }
      };
  
      const handleSearch = () => {
        fetchPosts();
      };
  
      const handleLike = async (postId) => {
        try {
          await axios.post(`${API_URL}/posts/${postId}/like`);
          fetchPosts();
          fetchStats();
        } catch (error) {
          console.error('Error liking post:', error);
        }
      };
  
      const handleView = async (postId) => {
        try {
          await axios.get(`${API_URL}/posts/${postId}`);
        } catch (error) {
          console.error('Error viewing post:', error);
        }
      };
  
      const handleDelete = async (postId) => {
        if (!confirm('Tem certeza que deseja deletar este post?')) return;
  
        try {
          await axios.delete(`${API_URL}/posts/${postId}`);
          fetchPosts();
          fetchFeaturedPosts();
          fetchStats();
        } catch (error) {
          console.error('Error deleting post:', error);
          alert('Erro ao deletar post');
        }
      };
  
      const handleEdit = (post) => {
        editingPost.value = post;
      };
  
      const handleSave = async () => {
        await fetchPosts();
        await fetchFeaturedPosts();
        await fetchStats();
        closeModal();
      };
  
      const closeModal = () => {
        showNewPostModal.value = false;
        editingPost.value = null;
      };
  
      const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num;
      };
  
      onMounted(() => {
        fetchPosts();
        fetchFeaturedPosts();
        fetchStats();
      });
  
      return {
        posts,
        featuredPosts,
        stats,
        loading,
        showNewPostModal,
        editingPost,
        searchQuery,
        selectedCategory,
        handleSearch,
        handleLike,
        handleView,
        handleDelete,
        handleEdit,
        handleSave,
        closeModal,
        formatNumber
      };
    }
  };
  </script>
  