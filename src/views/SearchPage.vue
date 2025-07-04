<template>
  <div class="search-result-container">
    <h2 class="search-title">
      Kết quả tìm kiếm cho: "<span class="highlight">{{ keyword }}</span>"
    </h2>

    <p class="result-count">
      🔎 Tìm thấy {{ filteredRoutes.length }} kết quả
    </p>

    <ul class="search-result-list">
      <li v-for="(item, index) in filteredRoutes" :key="index" class="search-result-item">
        <router-link :to="item.path" class="search-link">
          <i :class="['search-icon', item.icon]"></i>
          {{ item.name }}
        </router-link>
      </li>
    </ul>

    <p v-if="!filteredRoutes.length" class="no-results">
      😢 Không tìm thấy kết quả nào.
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const keyword = computed(() => route.query.q || '')

const routes = [
  { name: 'Trang chủ', path: '/', icon: 'fa-solid fa-house' },
  { name: 'Giới thiệu', path: '/about', icon: 'fa-solid fa-circle-info' },
  { name: 'Bảng vàng', path: '/BV', icon: 'fa-solid fa-trophy' },
  { name: 'Tin tức', path: '/news', icon: 'fa-solid fa-newspaper' },
  { name: 'Liên hệ', path: '/contact', icon: 'fa-solid fa-envelope' },
  { name: 'Đăng nhập', path: '/login', icon: 'fa-solid fa-right-to-bracket' },
  { name: 'Đội ngũ nhân sự', path: '/login', icon: 'fa-solid fa-right-to-bracket' }

]

const filteredRoutes = computed(() =>
  routes.filter(r => r.name.toLowerCase().includes(keyword.value.toLowerCase()))
)
</script>

<style scoped>
.search-result-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.search-title {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.highlight {
  color: #007bff;
  font-weight: bold;
}

.result-count {
  margin-bottom: 16px;
  font-size: 14px;
  color: #555;
}

.search-result-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.search-result-item {
  margin-bottom: 10px;
}

.search-link {
  text-decoration: none;
  color: #333;
  background-color: #fff;
  padding: 10px 14px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  transition: background-color 0.3s, color 0.3s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.search-link:hover {
  background-color: #007bff;
  color: #fff;
}

.search-icon {
  font-size: 16px;
  color: #888;
}

.search-link:hover .search-icon {
  color: #fff;
}

.no-results {
  margin-top: 16px;
  font-style: italic;
  color: #999;
}
</style>