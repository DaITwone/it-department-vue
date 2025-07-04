<template>
  <div class="container py-5">
    <!-- Bootstrap Carousel -->
    <div id="newsCarousel" class="carousel slide mb-5" data-bs-ride="carousel">
      <div class="carousel-inner rounded">
        <div
          v-for="(img, idx) in sliderImages"
          :key="idx"
          :class="['carousel-item', { active: idx === 0 }]"
        >
          <img
            :src="img"
            :alt="`Ảnh slide ${idx + 1}`"
            class="d-block w-100"
            style="height: 500px; object-fit: cover;"
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#newsCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#newsCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <!-- Tiêu đề -->
    <h1 class="text-center fw-bold text-primary mb-4">TIN TỨC VÀ SỰ KIỆN</h1>

    <!-- Tìm kiếm -->
    <div class="row mb-3 justify-content-center">
      <div class="col-md-6">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Tìm kiếm bài viết..."
        />
      </div>
    </div>

    <!-- Thông tin kết quả -->
    <div v-if="searchQuery" class="text-center text-secondary mb-4">
      Tìm thấy {{ filteredNews.length }} bài viết
    </div>

    <!-- Danh sách bài viết -->
    <div class="row g-4">
      <div
        v-if="filteredNews.length === 0"
        class="col-12 text-center text-muted mt-4"
      >
        Không tìm thấy bài viết phù hợp.
      </div>

      <div
        v-for="(item, index) in filteredNews"
        :key="item.id"
        class="col-12 col-sm-6 col-lg-4"
        :style="{ '--delay': (index * 0.1) + 's' }"
      >
        <div class="card h-100 shadow-sm">
          <router-link :to="`/news/${item.id}`">
            <img
              v-if="item.image"
              :src="item.image"
              class="card-img-top"
              style="object-fit: cover; height: 200px;"
              :alt="item.title"
            />
          </router-link>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-subtitle mb-2 text-muted">{{ item.date }}</p>
            <p class="card-text flex-grow-1 text-truncate">{{ item.content }}</p>
            <router-link
              :to="`/news/${item.id}`"
              class="mt-auto text-primary fw-medium"
            >
              Xem chi tiết →
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/supabase'

const sliderImages = [
  'https://static-images.vnncdn.net/files/publish/2023/9/17/tin-tuc-cong-nghe-thong-tin-o-trung-quoc-cac-hang-cong-nghe-lon-bat-tay-hop-tac-333.jpg?width=0&s=OpY9TQZzhj1ybSunfwUW7g',
  'https://chuyennguyentrai.edu.vn/uploads/TIN%20TUC/NAM%202020/TIN%20GIAO%20DUC/24.4.2020/cong-nghe-thong-tin-4-0.jpg',
]

const newsList = ref([])
const searchQuery = ref('')

// Xóa dấu tiếng Việt
function removeVietnameseTones(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

const filteredNews = computed(() => {
  const query = removeVietnameseTones(searchQuery.value.trim())
  return newsList.value.filter(item => {
    const title = removeVietnameseTones(item.title)
    const content = removeVietnameseTones(item.content)
    return (
      title.includes(query) ||
      content.includes(query) ||
      item.date.includes(searchQuery.value)
    )
  })
})

// Load từ Supabase
onMounted(async () => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false }) // Sắp xếp mới nhất trước

    if (error) throw error
    newsList.value = data || []
  } catch (error) {
    console.error('Lỗi tải dữ liệu từ Supabase:', error.message)
    newsList.value = []
  }
})

</script>


<style scoped>
.container {
  max-width: 1320px;
  margin: 0 auto;
}

/* ====== CAROUSEL ====== */
.carousel-inner {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}
.carousel-item img {
  border-radius: 0.75rem;
  transition: transform 0.6s ease, box-shadow 0.6s ease;
}
.carousel-item img:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(0, 123, 255, 0.3);
}
.carousel-control-prev-icon,
.carousel-control-next-icon {
  transition: transform 0.3s ease, filter 0.3s ease;
}
.carousel-control-prev-icon:hover,
.carousel-control-next-icon:hover {
  transform: scale(1.2);
  filter: drop-shadow(0 0 5px rgba(0, 123, 255, 0.7));
}

/* ====== TITLE ====== */
h1.text-primary {
  font-size: 2.5rem;
  position: relative;
  animation: fadeIn 1s ease-in-out;
}
h1.text-primary::after {
  content: '';
  width: 80px;
  height: 4px;
  background-color: #0d6efd;
  display: block;
  margin: 0.5rem auto 0;
  border-radius: 5px;
}

/* ====== CARD ====== */
.card {
  border-radius: 1rem;
  overflow: hidden;
  background: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  animation: fadeInUp 0.6s forwards;
  animation-delay: var(--delay, 0s);
}
.card:hover {
  transform: translateY(-10px) scale(1.03);
  box-shadow: 0 15px 30px rgba(0, 123, 255, 0.3);
  cursor: pointer;
}
.card-img-top {
  transition: transform 0.4s ease;
}
.card-img-top:hover {
  transform: scale(1.1);
}

/* ====== INPUT ====== */
input.form-control {
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}
input.form-control:focus {
  box-shadow: 0 0 8px 2px rgba(13, 110, 253, 0.5);
  border-color: #0d6efd;
  outline: none;
}

/* ====== ANIMATIONS ====== */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* ====== RESPONSIVE ====== */
@media (max-width: 576px) {
  h1.text-primary {
    font-size: 1.75rem;
  }
  .card-title {
    font-size: 1rem;
  }
  .card-text {
    font-size: 0.9rem;
  }
  .carousel-item img {
    height: 250px;
  }
}

/*  */
.contact-section {
  padding: 2rem;
  background-color: #f1f9ff;
  border-radius: 1rem;
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.1);
}
.contact-section h4 {
  font-weight: bold;
}
.contact-section form input,
.contact-section form textarea {
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.contact-section form input:focus,
.contact-section form textarea:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 5px rgba(13, 110, 253, 0.3);
}
</style>
