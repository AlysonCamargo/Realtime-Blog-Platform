<template>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ post ? 'Editar Post' : 'Novo Post' }}</h2>
          <button @click="$emit('close')" class="close-btn">&times;</button>
        </div>
  
        <form @submit.prevent="handleSubmit" class="post-form">
          <div class="form-group">
            <label for="title">Título *</label>
            <input
              v-model="formData.title"
              type="text"
              id="title"
              required
              placeholder="Digite o título do post"
            >
          </div>
  
          <div class="form-group">
            <label for="author">Autor *</label>
            <input
              v-model="formData.author"
              type="text"
              id="author"
              required
              placeholder="Seu nome"
            >
          </div>
  
          <div class="form-row">
            <div class="form-group">
              <label for="category">Categoria</label>
              <select v-model="formData.category" id="category">
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Business">Business</option>
                <option value="Other">Other</option>
              </select>
            </div>
  
            <div class="form-group">
              <label>
                <input v-model="formData.featured" type="checkbox">
                Post em Destaque
              </label>
            </div>
          </div>
  
          <div class="form-group">
            <label for="content">Conteúdo *</label>
            <textarea
              v-model="formData.content"
              id="content"
              required
              rows="10"
              placeholder="Escreva o conteúdo do post..."
            ></textarea>
          </div>
  
          <div class="form-group">
            <label for="tags">Tags (separadas por vírgula)</label>
            <input
              v-model="tagsInput"
              type="text"
              id="tags"
              placeholder="vue, javascript, tutorial"
            >
          </div>
  
          <div class="form-group">
            <label for="imageUrl">URL da Imagem</label>
            <input
              v-model="formData.imageUrl"
              type="url"
              id="imageUrl"
              placeholder="https://example.com/image.jpg"
            >
          </div>
  
          <div class="form-actions">
            <button type="button" @click="$emit('close')" class="btn btn-secondary">
              Cancelar
            </button>
            <button type="submit" class="btn btn-primary" :disabled="submitting">
              {{ submitting ? 'Salvando...' : 'Publicar Post' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  import axios from 'axios';
  
  const API_URL = 'http://localhost:5000/api';
  
  export default {
    name: 'PostForm',
    props: {
      post: {
        type: Object,
        default: null
      }
    },
    emits: ['close', 'save'],
    setup(props, { emit }) {
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
          formData.value = {
            title: newPost.title,
            author: newPost.author,
            content: newPost.content,
            category: newPost.category,
            tags: newPost.tags || [],
            imageUrl: newPost.imageUrl || '',
            featured: newPost.featured || false
          };
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
            await axios.put(`${API_URL}/posts/${props.post._id}`, data);
          } else {
            await axios.post(`${API_URL}/posts`, data);
          }
  
          emit('save');
          emit('close');
        } catch (error) {
          console.error('Error saving post:', error);
          alert('Erro ao salvar post. Verifique os dados e tente novamente.');
        } finally {
          submitting.value = false;
        }
      };
  
      return {
        formData,
        tagsInput,
        submitting,
        handleSubmit
      };
    }
  };
  </script>
  