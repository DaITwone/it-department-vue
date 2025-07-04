<template>
  <main>
    <!-- Phần banner cố định -->
    <div class="fixed-banner">
      <section class="hero">
        <h2>KHOA CÔNG NGHỆ THÔNG TIN</h2>
        <p>
          <span class="number-1">{{ countFounded }}</span> Thành lập |
          <span class="number-2">{{ countMajors }}</span> ngành đào tạo |
          <span class="number-3">{{ countEmployment }}%</span> SV có việc ngay |
          <span class="number-4">{{ countEnrollment }}%</span> Chỉ tiêu
        </p>

      </section>

      <!-- Carousel đúng chuẩn Bootstrap -->
      <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
            aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
            aria-label="Slide 2"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://tuyensinhhot.com/file/61c576bbb79b3e354b40e336/Hce_truong.jpg" class="d-block w-100"
              alt="Hình ảnh 1">
          </div>
          <div class="carousel-item">
            <img src="https://static.ladipage.net/5e96cb0987452449346df7d3/hce_img_-3-20240402030754-p7mte.jpg"
              class="d-block w-100" alt="Hình ảnh 2">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next">
          <span class="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>

    <!-- Giới thiệu -->
    <section class="container py-5" id="about">
      <div class="row align-items-center">

        <!-- Cột trái: Nội dung -->
        <div class="col-md-5 mt-4 mt-md-0">
          <p class="text-uppercase text-muted fw-semibold mb-1">Chào mừng đến với..</p>
          <h2 class="fw-bold" style="color:#004080e5">KHOA CÔNG NGHỆ THÔNG TIN</h2>
          <ul>
            <li><span style="color: red; font-weight: bold;">Năm 1989</span>: Tổ Tin học được hình thành với 3 thành
              viên thực hiện chức năng giảng dạy Tin học cho các ngành đào tạo khác trong nhà trường.</li><br>
            <li><span style="color: red; font-weight: bold;">Tháng 11/2020</span>: Trên cơ sở phát triển từ Tổ Tin học,
              Khoa CNTT chính thức thành lập với 10 thành viên, là một khoa chuyên ngành, đào tạo chuyên sâu về mảng
              Công nghệ thông tin, Quản trị Mạng máy tính, Đồ họa đa phương tiện và giảng dạy Tin học cho các ngành đào
              tạo khác trong nhà trường.</li><br>
            <li><span style="color: red; font-weight: bold;">Từ 2020 cho đến nay</span>: Khoa CNTT không ngừng phát
              triển về quy mô và nâng cao chất lượng đào tạo, thể hiện uy tín và năng lực giảng dạy của đội ngũ giảng
              viên của Khoa.</li>
          </ul>

          <div class="row text-center mt-4">
            <div class="col">
              <h3 class="text-primary fw-bold">4500+</h3>
              <p class="small">Sinh viên cao đẳng</p>
            </div>
            <div class="col">
              <h3 class="text-primary fw-bold">500+</h3>
              <p class="small">Học viên trung cấp</p>
            </div>
            <div class="col">
              <h3 class="text-primary fw-bold">100+</h3>
              <p class="small">Giảng viên</p>
            </div>
          </div>
        </div>

        <!-- Cột giữa: 2 hình -->
        <div class="col-md-3 d-flex flex-column gap-3">
          <img src="/src/image/img2.jpg" alt="Giải thưởng" class="img-fluid rounded-3 shadow-sm">
          <img src="/src/image/img3.jpg" alt="Tập thể" class="img-fluid rounded-3 shadow-sm">
        </div>

        <!-- Cột phải: Hình lớn + vòng tròn -->
        <div class="col-md-4 position-relative">
          <img src="/src/image/img1.jpg" alt="Diễn giả" class="img-fluid rounded-3 shadow-sm">
          <div class="years-circle position-absolute text-white text-center">
            <div>>35</div>
            <small>Năm</small>
          </div>
        </div>

      </div>
    </section>

    <!-- Chương trình đào tạo -->
    <section class="container py-5" id="programs">
      <h2 class="fw-bold text-center" style="color:#004080e5;">CAO ĐẲNG CHÍNH QUY</h2><br>

      <!-- Form thêm/sửa -->
      <div v-if="isAdmin" class="mb-4">
        <input v-model="newProgram.title" placeholder="Tên chương trình" class="form-control mb-2" />
        <input v-model="newProgram.desc" placeholder="Mô tả" class="form-control mb-2" />
        <input v-model="newProgram.icon" placeholder="Icon URL" class="form-control mb-2" />
        <input v-model="newProgram.link" placeholder="Liên kết" class="form-control mb-2" />

        <button v-if="editingId" @click="updateProgram" class="btn btn-warning">Cập nhật</button>
        <button v-else @click="addProgram" class="btn btn-success">+ Thêm chương trình</button>
      </div>

      <!-- Danh sách chương trình -->
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        <div class="col" v-for="(item, index) in programs" :key="item.id">
          <div class="card h-100 shadow-sm text-center p-3">
            <img :src="item.icon" width="40" class="mx-auto mb-2" />
            <h6>{{ item.title }}</h6>
            <p class="small">{{ item.description }}</p>
            <a v-if="item.link" :href="item.link" target="_blank" class="text-primary small">Tìm hiểu thêm →</a>

            <div v-if="isAdmin" class="mt-2">
              <button class="btn btn-sm btn-outline-primary me-1" @click="editProgram(item)">Sửa</button>
              <button class="btn btn-sm btn-outline-danger" @click="deleteProgram(item.id)">Xoá</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tin tức & Sự kiện -->
    <section class="container py-5" id="news">
      <h2 class="fw-bold text-center" style="color:#004080e5;">TIN TỨC VÀ SỰ KIỆN</h2><br>

      <!-- ✅ Form thêm/sửa tin tức -->
      <div v-if="isAdmin" class="mb-4">
        <h5 class="text-primary">Thêm/Sửa tin tức</h5>
        <input v-model="newNews.image" placeholder="Link hình ảnh" class="form-control mb-2" />
        <textarea v-model="newNews.text" placeholder="Nội dung" class="form-control mb-2" />
        <input v-model="newNews.date" placeholder="Ngày đăng (VD: 14/06/2025)" class="form-control mb-2" />
        <button v-if="editingNewsId" @click="updateNews" class="btn btn-warning me-2">Cập nhật</button>
        <button v-else @click="addNews" class="btn btn-success">+ Thêm tin</button>
      </div>

      <!-- ✅ Danh sách tin tức -->
      <div class="d-flex overflow-auto gap-4 pb-2 news-scroll">
        <div class="card flex-shrink-0" style="width: 300px;" v-for="(news, index) in newsItems" :key="index">
          <img :src="news.image" class="card-img-top" alt="Tin tức" />
          <div class="card-body">
            <p class="card-text small">{{ news.text }}</p>
            <p class="text-muted small">{{ news.date }}</p>

            <!-- ✅ Nút chỉnh sửa / xoá -->
            <div v-if="isAdmin">
              <button class="btn btn-sm btn-outline-primary me-1" @click="editNews(news)">Sửa</button>
              <button class="btn btn-sm btn-outline-danger" @click="deleteNews(news.id)">Xoá</button>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- Nghiên cứu -->
    <section class="container py-5" id="research">
      <h2 class="fw-bold" style="color:#004080e5; text-align: center;">NGHIÊN CỨU</h2><br>
      <p class="lead text-center">Trí tuệ nhân tạo, Khoa học dữ liệu, và nhiều hơn nữa.</p>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue' 
import { useNews } from '../composables/useNews'   
import { usePrograms } from '../composables/usePrograms'

const isAdmin = ref(false) // Biến kiểm tra xem người dùng có phải là admin không

// Lấy ra các biến và hàm từ useNews() để thao tác với tin tức
const {
  newsItems,        // Danh sách các tin tức
  newNews,          // Dữ liệu tin tức dùng trong form thêm/sửa
  editingNewsId,    // ID của tin tức đang chỉnh sửa
  fetchNews,        // Hàm lấy danh sách tin
  addNews,          // Thêm tin
  editNews,         // Gán dữ liệu tin vào form
  updateNews,       // Cập nhật tin
  deleteNews        // Xoá tin
} = useNews()

// Tương tự, lấy ra các biến/hàm liên quan đến chương trình đào tạo
const {
  programs,         // Danh sách chương trình
  newProgram,       // Dữ liệu chương trình mới
  editingId,        // ID của chương trình đang sửa
  fetchPrograms,    // Lấy danh sách chương trình
  addProgram,       // Thêm chương trình
  editProgram,      // Sửa chương trình
  updateProgram,    // Cập nhật chương trình
  deleteProgram     // Xoá chương trình
} = usePrograms()

// Các biến để hiển thị số đếm hiệu ứng animate
const countFounded = ref(0)      // Năm thành lập
const countMajors = ref(0)       // Số ngành
const countEmployment = ref(0)   // Tỷ lệ có việc
const countEnrollment = ref(0)   // Tỷ lệ tuyển sinh

// Hàm làm hiệu ứng tăng số đếm từng bước một (Có sẵn cấu trúc)
const animateCount = (refValue, target, duration = 1000) => {
  const frameRate = 60                    // 60 khung hình mỗi giây
  const totalFrames = Math.round((duration / 1000) * frameRate) // Tổng số bước
  const increment = target / totalFrames // Mỗi bước tăng bao nhiêu
  let current = 0
  let frame = 0

  const timer = setInterval(() => {
    current += increment
    frame++
    if (frame >= totalFrames) {
      refValue.value = target
      clearInterval(timer) // Dừng khi đủ số frame
    } else {
      refValue.value = Math.round(current) // Làm tròn để hiển thị đẹp
    }
  }, 1000 / frameRate) // Chạy mỗi frame
}

// Khi component mounted, chạy các hàm khởi tạo
onMounted(() => {
  // Kiểm tra người dùng từ localStorage
  const user = JSON.parse(localStorage.getItem('user'))
  if (user?.role === 'admin') isAdmin.value = true // Nếu là admin thì hiển thị các chức năng quản trị

  // Chạy hiệu ứng đếm
  animateCount(countFounded, 1989, 1500)
  animateCount(countMajors, 24, 1000)
  animateCount(countEmployment, 80, 1000)
  animateCount(countEnrollment, 100, 1000)

  // Lấy dữ liệu chương trình đào tạo và tin tức từ Supabase
  fetchPrograms()
  fetchNews()
})
</script>

<style scoped>
.hero {
  text-align: center;
  padding: 22px 20px;
  /* background: #f0f0f0; */
  background-image: url(https://img.freepik.com/premium-vector/modern-abstract-technology-background-design-vector-illustration_29865-4885.jpg?uid=R197231633&ga=GA1.1.633229106.1745393051&semt=ais_hybrid&w=740);
}

.hero h2,
.hero p {
  opacity: 0;
  animation-fill-mode: forwards;
}

.hero h2 {
  transform: translateY(30px);
  animation: fadeInUp 1.5s ease-out forwards;
}

.hero p {
  transform: translateX(-30px);
  animation: slideInLeft 1.5s ease-out 0.5s forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Sử dụng 1 lớp chung cho số */
[class^="number-"] {
  font-weight: bold;
}

/* Số thứ tự có thể dùng modifier hoặc biến nếu dùng SCSS hoặc utility framework */
.number-1 {
  color: red;
}

.number-2 {
  color: #27ae60;
}

.number-3 {
  color: blue;
}

.number-4 {
  color: #e67e22;
}

.carousel-inner img {
  height: 600px;
  object-fit: cover;
  width: 100%;
  display: block;
}

.news-scroll::-webkit-scrollbar {
  height: 6px;
}

.news-scroll::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

/* Card hover effect */
.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

/* Circle overlay */
.years-circle {
  position: absolute;
  top: 30%;
  left: -30px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(33, 115, 255, 0.8);
  color: white;
  font-size: 1.4rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-50%);
}

/* Image hover zoom */
img {
  transition: transform 0.3s ease;
  display: block;
}

img:hover {
  transform: scale(1.05);
  cursor: pointer;
}
</style>
