<template>
    <div class="search-bar">
      <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input
          :value="search"
          @input="$emit('update:search', $event.target.value)"
          @keyup.enter="$emit('search')"
          type="text"
          placeholder="Buscar posts..."
          class="search-input"
        >
      </div>
  
      <select
        :value="category"
        @change="$emit('update:category', $event.target.value); $emit('search')"
        class="category-select"
      >
        <option value="All">Todas as Categorias</option>
        <option value="Technology">Technology</option>
        <option value="Lifestyle">Lifestyle</option>
        <option value="Travel">Travel</option>
        <option value="Food">Food</option>
        <option value="Business">Business</option>
        <option value="Other">Other</option>
      </select>
  
      <button @click="$emit('search')" class="btn btn-primary">
        Buscar
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SearchBar',
    props: {
      search: String,
      category: String
    },
    emits: ['update:search', 'update:category', 'search']
  };
  </script>
  