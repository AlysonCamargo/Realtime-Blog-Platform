<template>
    <article class="post-card" :class="{ featured: featured }">
      <div v-if="post.imageUrl" class="post-image">
        <img :src="post.imageUrl" :alt="post.title">
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
  
        <div class="post-author">
          <span class="author-icon">👤</span>
          <span>{{ post.author }}</span>
        </div>
  
        <div class="post-stats">
          <span class="stat">
            <span class="stat-icon">👀</span>
            {{ post.views }}
          </span>
          <span class="stat">
            <span class="stat-icon">❤️</span>
            {{ post.likes }}
          </span>
          <span class="stat">
            <span class="stat-icon">💬</span>
            {{ post.comments?.length || 0 }}
          </span>
        </div>
  
        <div class="post-actions">
          <button @click="$emit('like', post._id)" class="btn-action btn-like">
            ❤️ Curtir
          </button>
          <button @click="$emit('edit', post)" class="btn-action btn-edit">
            ✏️ Editar
          </button>
          <button @click="$emit('delete', post._id)" class="btn-action btn-delete">
            🗑️ Deletar
          </button>
        </div>
      </div>
    </article>
  </template>
  
  <script>
  export default {
    name: 'PostCard',
    props: {
      post: {
        type: Object,
        required: true
      },
      featured: {
        type: Boolean,
        default: false
      }
    },
    emits: ['like', 'view', 'edit', 'delete'],
    methods: {
      getExcerpt(content, length = 150) {
        return content.length > length 
          ? content.substring(0, length) + '...'
          : content;
      },
      formatDate(date) {
        const d = new Date(date);
        return d.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });
      }
    }
  };
  </script>
  