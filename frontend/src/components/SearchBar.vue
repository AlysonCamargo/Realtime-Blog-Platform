<template>
  <div class="search-bar">
    <div class="search-input-wrapper">
      <span class="search-icon">🔍</span>
      <input
        :value="search"
        @input="$emit('update:search', $event.target.value)"
        @keyup.enter="$emit('search')"
        type="text"
        placeholder="Search insights..."
        class="search-input"
      >
    </div>

    <div class="select-wrapper">
      <select
        :value="category"
        @change="$emit('update:category', $event.target.value); $emit('search')"
        class="category-select"
      >
        <option value="All">All Categories</option>
        <option value="Technology">Technology</option>
        <option value="Lifestyle">Lifestyle</option>
        <option value="Travel">Travel</option>
        <option value="Food">Food</option>
        <option value="Business">Business</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <button @click="$emit('search')" class="btn btn-primary search-btn">
      Search
    </button>
  </div>
</template>

<script setup>
defineProps({
  search: String,
  category: String
});

defineEmits(['update:search', 'update:category', 'search']);
</script>