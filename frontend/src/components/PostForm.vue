<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ post ? 'Edit Article' : 'New Article' }}</h2>
        <button @click="$emit('close')" class="close-btn">&times;</button>
      </div>

      <form @submit.prevent="handleSubmit" class="post-form">
        <div class="form-grid">
          <div class="form-group">
            <label for="title">Title</label>
            <input
              v-model="formData.title"
              type="text"
              id="title"
              required
              placeholder="Insight title"
              class="form-control"
            >
          </div>

          <div class="form-group">
            <label for="author">Author</label>
            <input
              v-model="formData.author"
              type="text"
              id="author"
              required
              placeholder="Your name"
              class="form-control"
            >
          </div>

          <div class="form-group">
            <label for="category">Category</label>
            <select v-model="formData.category" id="category" class="form-control">
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Business">Business</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div class="form-group checkbox-wrapper">
            <label class="checkbox-label">
              <input v-model="formData.featured" type="checkbox">
              <span class="checkbox-text">Feature this article</span>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label for="content">Content</label>
          <textarea
            v-model="formData.content"
            id="content"
            required
            rows="5"
            placeholder="Share your thoughts..."
            class="form-control"
          ></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="tags">Tags (comma separated)</label>
            <input
              v-model="tagsInput"
              type="text"
              id="tags"
              placeholder="ai, dev, future"
              class="form-control"
            >
          </div>

          <div class="form-group">
            <label for="imageUrl">Visual URL</label>
            <input
              v-model="formData.imageUrl"
              type="url"
              id="imageUrl"
              placeholder="https://images.unsplash.com/..."
              class="form-control"
            >
          </div>
        </div>

        <div class="form-actions">
          <button type="button" @click="$emit('close')" class="btn btn-secondary">
            Discard
          </button>
          <button type="submit" class="btn btn-primary" :disabled="submitting">
            {{ submitting ? 'Publishing...' : 'Publish Now' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { postService } from '../services/api';
import { useToast } from 'vue-toastification';

const props = defineProps({
  post: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close', 'save']);
const toast = useToast();

const formData = ref({
  title: '',
  author: '',
  content: '',
  category: 'Other',
  tags: [],
  imageUrl: '',
  featured: false
});

const tagsInput = ref('');
const submitting = ref(false);

watch(() => props.post, (newPost) => {
  if (newPost) {
    formData.value = { ...newPost };
    tagsInput.value = newPost.tags ? newPost.tags.join(', ') : '';
  }
}, { immediate: true });

const handleSubmit = async () => {
  submitting.value = true;
  try {
    const data = {
      ...formData.value,
      tags: tagsInput.value
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
    };

    if (props.post) {
      await postService.updatePost(props.post._id, data);
      toast.success('Article synchronized');
    } else {
      await postService.createPost(data);
      toast.success('Insight shared');
    }

    emit('save');
    emit('close');
  } catch (error) {
    // Error handled by api.js
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.checkbox-wrapper {
  display: flex;
  align-items: flex-end;
  padding-bottom: 8px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
}

.checkbox-text {
  font-size: 0.875rem;
  color: var(--text-muted);
}

@media (max-width: 600px) {
  .form-grid, .form-row {
    grid-template-columns: 1fr;
  }
}
</style>