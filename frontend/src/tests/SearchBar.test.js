import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchBar from '../components/SearchBar.vue';

describe('SearchBar.vue', () => {
  it('renders search input', () => {
    const wrapper = mount(SearchBar, {
      props: {
        search: '',
        category: 'All'
      }
    });
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('emits search event when button is clicked', async () => {
    const wrapper = mount(SearchBar, {
      props: {
        search: 'test',
        category: 'All'
      }
    });
    // The button has class 'search-btn' in my refactored version
    await wrapper.find('.search-btn').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('search');
  });
});
