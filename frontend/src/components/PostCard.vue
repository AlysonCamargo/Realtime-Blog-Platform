<template>
  <article class="post-card" :class="{ featured: featured }">
    <div v-if="post.imageUrl" class="post-image">
      <img :src="post.imageUrl" :alt="post.title" loading="lazy">
    </div>

    <div class="post-content">
      <div class="post-meta">
        <span class="post-category">{{ post.category }}</span>
        <span class="post-date">{{ formatDate(post.createdAt) }}</span>
      </div>

      <h3 class="post-title">{{ post.title }}</h3>
      <p class="post-excerpt">{{ getExcerpt(post.content) }}</p>

      <div class="post-tags" v-if="post.tags && post.tags.length > 0">
        <span v-for="tag in post.tags" :key="tag" class="tag">
          #{{ tag }}
        </span>
      </div>

      <div class="post-author-row">
        <div class="post-author">
          <span class="author-icon">👤</span>
          <span>{{ post.author }}</span>
        </div>
        
        <div class="post-stats">
          <div class="stat" title="Views">
            <span class="stat-icon">👀</span>
            <span>{{ formatCount(post.views) }}</span>
          </div>
          <div class="stat" title="Likes">
            <span class="stat-icon">❤️</span>
            <span>{{ formatCount(post.likes) }}</span>
          </div>
        </div>
      </div>

      <div class="post-actions">
        <button @click="$emit('like', post._id)" class="btn-action btn-like">
          Like
        </button>
        <button @click="$emit('edit', post)" class="btn-action btn-edit">
          Edit
        </button>
        <button @click="$emit('delete', post._id)" class="btn-action btn-delete">
          Delete
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  }
});

defineEmits(['like', 'view', 'edit', 'delete']);

const getExcerpt = (content, length = 100) => {
  if (!content) return '';
  return content.length > length 
    ? content.substring(0, length) + '...'
    : content;
};

const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const formatCount = (num) => {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num;
};
</script>