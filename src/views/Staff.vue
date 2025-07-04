<template>
  <section class="about-page">
    <div class="container">
      <div class="main-content">
        <!-- Nội dung chính bên trái -->
        <div class="content-left">
          <router-link to="/teacher-list" style="text-decoration: none;">
            <h1 style="color: #0f71d3ea;">ĐỘI NGŨ NHÂN SỰ</h1>
          </router-link>

          <img class="main-image" src="https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg" alt="Đội ngũ nhân sự" />

          <h4 class="section-title">BAN CHỦ NHIỆM VÀ THƯ KÝ KHOA</h4>
          <div class="staff-section">
            <div class="staff-member" v-for="(staff, index) in leaders" :key="index">
              <img :src="staff.img" class="larger-image" :alt="staff.role" />
              <div class="staff-info">
                <p><strong>{{ staff.role }}</strong></p>
                <p>{{ staff.name }}</p>
              </div>
            </div>
          </div>

          <h4 class="section-title">ĐỘI NGŨ GIẢNG VIÊN</h4>
          <div class="staff-section">
            <div class="staff-member" v-for="(staff, index) in lecturers" :key="index">
              <img :src="staff.img" :alt="staff.name" />
              <div class="staff-info">
                <p><strong>Giảng viên</strong></p>
                <p>{{ staff.name }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="sidebar">
          <div class="sidebar-box">
            <h3 style="color: #0f71d3ea;">TUYỂN SINH</h3>
            <img src="https://84864c160d.vws.vegacdn.vn/uploadimages/news/2025/thptmariecurie/z644971675651497ca625f52af52d3e8c7098707f0cba2_2832025957.jpg" width="100%" alt="Tuyển sinh" />
            <p><br><strong>Thông tin tuyển sinh 2025</strong><br />January 7, 2025</p>
          </div>

          <div class="sidebar-box">
            <h3 style="color: #0f71d3ea;">THỰC TẬP - TUYỂN DỤNG</h3>
            <ul>
              <li>Quản trị hệ thống</li>
              <li>Thiết kế đồ họa</li>
              <li>Thực tập tư vấn & triển khai</li>
              <li>Thực tập lập trình</li>
            </ul>
          </div>

          <div class="sidebar-box">
            <h3 style="color: #0f71d3ea;">BÀI VIẾT MỚI NHẤT</h3>
            <ul>
              <li>AI giúp học tốt hơn khi Internet yếu</li>
              <li>Liên hệ Khoa CNTT</li>
              <li>Giới thiệu về hệ thống LMS</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const leaders = [
  { role: 'Trưởng khoa', name: 'ThS. Trương Tấn Lộc', img: 'https://cntt.kthcm.edu.vn/wp-content/uploads/2024/02/loc64-585x390.jpg' },
  { role: 'Tổ trưởng', name: 'ThS. Nguyễn Thị Phương Thùy', img: 'https://cntt.kthcm.edu.vn/wp-content/uploads/2024/02/thuy64-585x390.jpg' },
  { role: 'Thư ký khoa', name: 'CN Nguyễn Thị Kim Mến', img: 'https://cntt.kthcm.edu.vn/wp-content/uploads/2024/02/men34.jpg' }
]

const lecturers = [
  { name: 'ThS. Trương Châu', img: 'https://cntt.kthcm.edu.vn/wp-content/uploads/2024/02/chau34.jpg' },
  { name: 'ThS. Lê Xuân Mai', img: 'https://cntt.kthcm.edu.vn/wp-content/uploads/2024/02/Mai34.jpg' },
  { name: 'ThS. Nguyễn Tường Nam', img: 'https://cntt.kthcm.edu.vn/wp-content/uploads/2024/02/nam34.jpg' },
  { name: 'ThS. Hồ Thị Thanh Nga', img: 'https://cntt.kthcm.edu.vn/wp-content/uploads/2024/02/Nga34.jpg' },
  { name: 'ThS. Kiều Tài Thắng', img: 'https://cntt.kthcm.edu.vn/wp-content/uploads/2024/02/thang34.jpg' },
  { name: 'ThS. Nguyễn Hải Triều', img: 'https://cntt.kthcm.edu.vn/wp-content/uploads/2024/02/trieu34.jpg' },
  { name: 'ThS. Nguyễn Văn Tú', img: 'https://cntt.kthcm.edu.vn/wp-content/uploads/2024/02/tu34.jpg' },
  { name: 'CN Nguyễn Hoàng Sơn Vĩ', img: 'https://cntt.kthcm.edu.vn/wp-content/uploads/2024/02/vi34.jpg' },
]
</script>

<style scoped>
.about-page {
  background-color: #f9f9f9;
  padding: 40px 20px;
  animation: pageFadeIn 1s ease-out forwards;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.main-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 20px 0;
}

.main-content {
  display: flex;
  gap: 30px;
}

.content-left {
  flex: 2;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.sidebar {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar-box {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  margin: 20px 0;
  color: #004080;
}

.staff-section {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.staff-member {
  display: flex;
  gap: 20px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 20px;
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
}

.larger-image,
.staff-member img {
  width: 200px;
  border-radius: 8px;
  object-fit: cover;
}

.staff-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 16px;
}

ul {
  padding-left: 18px;
  margin: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pageFadeIn {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.staff-member img,
.sidebar-box img {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.staff-member img:hover,
.sidebar-box img:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
