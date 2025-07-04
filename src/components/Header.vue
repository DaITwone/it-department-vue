<template>
  <header :class="{ shrink: isShrink }" class="fade-in">
    <div class="nav-container">
      <!-- Logo -->
      <div class="logo" ref="logo">
        <a href="https://www.kthcm.edu.vn/">
          <img src="https://www.kthcm.edu.vn/wp-content/uploads/2023/10/Ten-truong-do-1000x159.png" alt="Logo Trường" />
        </a>
      </div>

      <!-- Menu chính -->
      <nav class="main-nav">
        <ul>
          <li><router-link to="/" class="nav-link">Trang chủ</router-link></li>
          <li class="has-dropdown">
            <a href="#" class="nav-link">Giới thiệu</a>
            <ul class="dropdown">
              <li><router-link to="/about">Lịch sử hình thành</router-link></li>
              <li><router-link to="/staff">Đội ngũ nhân sự</router-link></li>
            </ul>
          </li>
          <li><router-link to="/news" class="nav-link">Tin tức</router-link></li>
          <li><router-link to="/contact" class="nav-link">Liên hệ</router-link></li>
        </ul>
      </nav>

      <!-- Mobile Menu -->
      <div v-if="isMenuOpen" class="mobile-nav">
        <ul>
          <li><router-link to="/" @click="isMenuOpen = false">Trang chủ</router-link></li>
          <li><router-link to="/about" @click="isMenuOpen = false">Lịch sử hình thành</router-link></li>
          <li><router-link to="/staff" @click="isMenuOpen = false">Đội ngũ nhân sự</router-link></li>
          <li><router-link to="/news" @click="isMenuOpen = false">Tin tức</router-link></li>
          <li><router-link to="/contact" @click="isMenuOpen = false">Liên hệ</router-link></li>

          <!-- Mobile Auth -->
          <li v-if="!isLoggedIn">
            <router-link to="/login" @click="isMenuOpen = false">Đăng nhập</router-link>
          </li>
          <li v-else class="user-info">
            <span>Xin chào, {{ user.username }}</span>
            <button @click="logout">Đăng xuất</button>
          </li>
        </ul>

        <!-- SearchBar trong mobile -->
        <div class="header-search mobile-search">
          <div class="search-container" @click.outside="showSuggestions = false">
            <input v-model="searchQuery" @input="onInput" @keyup.enter="handleSearch" placeholder="Tìm kiếm..."
              class="search-input" />
            <span class="search-icon" @click="handleSearch">
              <i class="fas fa-search"></i>
            </span>
            <ul v-if="showSuggestions && filteredRoutes.length" class="suggestions-list">
              <li v-for="(item, index) in filteredRoutes" :key="index" @click="goTo(item.path)">
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>


      <!-- Toggle menu trên mobile -->
      <div class="menu-toggle" @click="isMenuOpen = !isMenuOpen">
        <span v-if="!isMenuOpen">☰</span>
        <span v-else>✕</span>
      </div>

      <!-- Auth links + search -->
      <div class="auth-links">
        <div v-if="isLoggedIn" class="user-avatar" @click="toggleDropdown">
          <img :src="user?.username === 'admin'
            ? 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
            : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'" alt="Avatar" />
          <div v-if="showDropdown" class="dropdown-logout">
            <p>Xin chào, {{ user.username }}</p>
            <button @click.stop="logout">Đăng xuất</button>
          </div>
        </div>
        <router-link v-else to="/login" class="nav-link">Đăng nhập</router-link>

        <!-- SearchBar desktop -->
        <div class="header-search">
          <div ref="target" class="search-container" @click.outside="showSuggestions = false">
            <input v-model="searchQuery" @input="onInput" @keyup.enter="handleSearch" placeholder="Tìm kiếm..."
              class="search-input" />
            <span class="search-icon" @click="handleSearch">
              <i class="fas fa-search"></i>
            </span>
            <ul v-if="showSuggestions && filteredRoutes.length" class="suggestions-list">
              <li v-for="(item, index) in filteredRoutes" :key="index" @click="goTo(item.path)">
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
/* =============================
   📦 Import
============================= */
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'

/* =============================
   🚀 Router
============================= */
const router = useRouter()

/* =============================
   🔘 UI State
============================= */
const isMenuOpen = ref(false)
const isShrink = ref(false)

/* =============================
   👤 Auth State
============================= */
const isLoggedIn = ref(false)
const user = ref(null)
const showDropdown = ref(false)

/* =============================
   🔍 Search State
============================= */
const searchQuery = ref('')
const showSuggestions = ref(false)
const target = ref(null) // element ref cho click outside

/* =============================
   📌 Search Routes
============================= */
const routes = [
  { name: 'Trang chủ', path: '/' },
  { name: 'Giới thiệu', path: '/about' },
  { name: 'Tin tức', path: '/news' },
  { name: 'Liên hệ', path: '/staff' },
  { name: 'Đăng nhập', path: '/login' },
  { name: 'Đội ngũ nhân sự', path: '/teacher-list' }
]

/* =============================
   🧠 Computed
============================= */
const filteredRoutes = computed(() =>
  searchQuery.value.trim()
    ? routes.filter(r => r.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    : []
)

/* =============================
   ✨ Handlers: UI
============================= */
function handleScroll() {
  isShrink.value = window.scrollY > 120
}

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

/* =============================
   ✨ Handlers: Auth
============================= */
function logout() {
  localStorage.removeItem('user')
  isLoggedIn.value = false
  user.value = null
  showDropdown.value = false
  window.location.href = '/login'
}

/* =============================
   ✨ Handlers: Search
============================= */
function onInput() {
  showSuggestions.value = !!searchQuery.value.trim()
}

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value } })
    showSuggestions.value = false
    searchQuery.value = ''
  }
}

function goTo(path) {
  router.push(path)
  showSuggestions.value = false
  searchQuery.value = ''
}

/* =============================
   🧩 Click Outside (SearchBox)
============================= */
onClickOutside(target, () => {
  showSuggestions.value = false
})

/* =============================
   ⏳ Lifecycle
============================= */
onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
    isLoggedIn.value = true
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>


<style scoped>
/* --- HEADER CƠ BẢN --- */
header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: linear-gradient(to right, #29adeb, #025db8ea);
  transition: all 0.4s ease;
}

header.shrink .nav-container {
  padding: 8px 40px;
}

header.shrink .logo img {
  height: 50px;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  max-width: 1440px;
  margin: auto;
  transition: padding 0.4s ease;
}

/* --- LOGO --- */
.logo img {
  height: 80px;
  transition: height 0.4s ease, filter 0.3s ease;
}

.logo img:hover {
  transform: scale(1.06);
  filter: brightness(1.2);
}

/* --- MENU CHÍNH --- */
.main-nav ul {
  display: flex;
  list-style: none;
  gap: 30px;
  margin: 0;
  padding: 0;
}

.main-nav a,
.auth-links .nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: all 0.3s ease;
}

.main-nav a::after,
.auth-links .nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 0%;
  height: 3px;
  background: linear-gradient(to right, #fdd835, #ff4081);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.main-nav a:hover::after,
.auth-links .nav-link:hover::after {
  width: 100%;
}

/* --- DROPDOWN MENU --- */
.has-dropdown {
  position: relative;
}

.has-dropdown .dropdown {
  position: absolute;
  top: 150%;
  left: 0;
  background: white;
  min-width: 220px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  z-index: 999;
  border-radius: 6px;
}

.has-dropdown:hover .dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown li {
  padding: 0 20px;
}

.dropdown li a {
  color: #0f71d3ea;
  text-decoration: none;
  font-weight: 500;
  display: block;
  padding: 10px 0;
  white-space: nowrap;
}

/* --- AVATAR --- */
.auth-links {
  display: flex;
  align-items: center;
  gap: 30px;
}

.user-avatar {
  position: relative;
  cursor: pointer;
}

.user-avatar img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid white;
  transition: transform 0.2s;
}

.dropdown-logout {
  position: absolute;
  top: 130%;
  right: 0;
  background-color: white;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 999;
  min-width: 140px;
}

.dropdown-logout p {
  margin: 0;
  font-weight: 500;
  color: #333;
}

.dropdown-logout button {
  margin-top: 10px;
  width: 100%;
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  background: #f44336;
  color: white;
  cursor: pointer;
}

/* --- SEARCHBAR --- */
.header-search {
  position: relative;
}

.search-container {
  position: relative;
  display: inline-block;
}

.search-input {
  padding: 8px 30px 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 180px;
}

.search-icon {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 14px;
  cursor: pointer;
}

.suggestions-list {
  position: absolute;
  top: 38px;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  list-style: none;
  padding: 0;
  margin: 4px 0 0;
}

.suggestions-list li {
  padding: 8px;
  cursor: pointer;
}

.suggestions-list li:hover {
  background-color: #eee;
}

/* --- MOBILE --- */
.menu-toggle {
  display: none;
  font-size: 26px;
  color: white;
  cursor: pointer;
}

@media (max-width: 768px) {
  .auth-links {
    display: none;
  }

  .menu-toggle {
    display: block;
  }

  .logo img {
    height: 48px;
    max-width: 80%;
    overflow-x: hidden;
    display: block;
  }

  .main-nav {
    display: none;
  }

  .mobile-nav {
    display: block;
    background: white;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    padding: 16px 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    z-index: 999;
  }

  .mobile-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 10px;
  }

  .mobile-nav a {
    color: #025db8;
    font-weight: 500;
    text-decoration: none;
  }

  .mobile-search .search-input {
    width: 100%;
  }

  .mobile-nav a,
  .mobile-nav button {
    display: block;
    width: 100%;
    text-align: left;
  }
}

/* --- ANIMATION --- */
.fade-in {
  animation: fadeIn 0.8s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
