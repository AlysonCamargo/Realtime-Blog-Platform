<template>
  <div class="app">
    <!-- Header -->
    <header class="app-header">
      <div class="container">
        <h1 class="logo">⚡ Blog Intel</h1>
        <button @click="showNewPostModal = true" class="btn btn-primary">
          <span>Create Post</span>
        </button>
      </div>
    </header>

    <!-- Stats Dashboard -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">📑</div>
            <div class="stat-content">
              <p>Total Articles</p>
              <h3>{{ stats.totalPosts }}</h3>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📈</div>
            <div class="stat-content">
              <p>Total Engagement</p>
              <h3>{{ formatNumber(stats.totalViews) }}</h3>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🔥</div>
            <div class="stat-content">
              <p>Community Love</p>
              <h3>{{ formatNumber(stats.totalLikes) }}</h3>
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
          @search="fetchPosts"
        />
      </div>
    </section>

    <!-- Featured Posts -->
    <section v-if="featuredPosts.length > 0" class="featured-section">
      <div class="container">
        <h2 class="section-title">✨ Spotlight</h2>
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
          <h2 class="section-title">🌍 Latest Insights</h2>
          <span class="post-count">{{ posts.length }} article(s)</span>
        </div>

        <div v-if="loading" class="loading">
          <div class="spinner"></div>
          <p>Analyzing database...</p>
        </div>

        <div v-else-if="posts.length === 0" class="empty-state">
          <p class="empty-icon">🌑</p>
          <p class="empty-text">The void is empty. Start by creating an insight.</p>
          <button @click="showNewPostModal = true" class="btn btn-primary">
            Create First Post
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

<script setup>
import { ref, onMounted } from 'vue';
import PostCard from './components/PostCard.vue';
import PostForm from './components/PostForm.vue';
import SearchBar from './components/SearchBar.vue';
import { usePosts } from './composables/usePosts';

const {
  posts,
  featuredPosts,
  stats,
  loading,
  searchQuery,
  selectedCategory,
  fetchPosts,
  refreshData,
  handleLike,
  handleView,
  handleDelete
} = usePosts();

const showNewPostModal = ref(false);
const editingPost = ref(null);

const handleEdit = (post) => {
  editingPost.value = post;
};

const handleSave = async () => {
  await refreshData();
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
  refreshData();
});
</script>

<style>
/* Keeping original styles as requested to maintain visual feel, 
   but cleaned up logic drastically */
</style>