<template>
  <div class="container py-5" v-if="post">
    <div class="row">
      <!-- Cột trái: Nội dung bài viết -->
      <div class="col-lg-8 mb-4">
        <h1 class="text-primary fw-bold mb-3">{{ post.title }}</h1>
        <p class="text-muted">{{ post.date }}</p>
        <img :src="post.image" class="img-fluid rounded mb-4" alt="Ảnh bài viết" />
        <p class="news-content">{{ post.content }}</p>
      </div>

      <!-- Cột phải: Bài viết khác + Form -->
      <div class="col-lg-4">
        <h4 class="fw-semibold mb-3 border-bottom pb-2 d-flex justify-content-between align-items-center">
          Các bài viết khác
          <button
            v-if="user.role === 'admin'"
            @click="handleAddPost"
            class="btn btn-success btn-sm"
            title="Thêm bài viết mới"
          >
            Thêm
          </button>
        </h4>

        <div v-for="item in relatedNews" :key="item.id" class="mb-3 position-relative">
        <!-- Nội dung bài viết khác -->
        <router-link :to="`/news/${item.id}`" class="text-decoration-none text-dark d-block">
          <div class="d-flex align-items-start gap-2">
            <img :src="item.image" alt="ảnh" width="60" height="60" class="rounded" />
            <div>
              <p class="mb-1 fw-medium">{{ item.title }}</p>
              <small class="text-muted">{{ item.date }}</small>
            </div>
          </div>
        </router-link>

        <!-- Nút admin nằm ngoài router-link -->
        <div
          v-if="user.role === 'admin'"
          class="admin-actions mt-2"
        >
          <button @click="handleEditPost(item)" class="btn btn-warning btn-sm w-100 mb-1">Sửa</button>
          <button @click="handleDeletePost(item)" class="btn btn-danger btn-sm w-100">Xóa</button>
        </div>
        </div>


        <!-- Gửi thắc mắc -->
        <div class="contact-section mt-5">
          <h4 class="mb-3 text-primary">Gửi thắc mắc cho chúng tôi</h4>
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <input type="text" class="form-control" placeholder="Họ và tên" v-model="form.name" required />
            </div>
            <div class="mb-3">
              <input type="email" class="form-control" placeholder="Email" v-model="form.email" required />
            </div>
            <div class="mb-3">
              <textarea class="form-control" rows="4" placeholder="Nội dung câu hỏi..." v-model="form.message" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Gửi</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="container py-5 text-center">
    <h2 class="text-danger">Bài viết không tồn tại hoặc đã bị xóa.</h2>
  </div>

  <!-- Modal thêm/sửa bài viết -->
<div v-if="showForm" class="modal-overlay">
  <div class="modal-content">
    <h5 class="mb-3">{{ editMode ? 'Sửa bài viết' : 'Thêm bài viết mới' }}</h5>
    <form @submit.prevent="submitPost">
      <div class="mb-3">
        <input v-model="formPost.title" class="form-control" placeholder="Tiêu đề bài viết" required />
      </div>
      <div class="mb-3">
        <input v-model="formPost.image" class="form-control" placeholder="Link ảnh" required />
      </div>
      <div class="mb-3">
        <textarea v-model="formPost.content" class="form-control" rows="5" placeholder="Nội dung bài viết" required></textarea>
      </div>
      <div class="d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-secondary btn-sm" @click="cancelForm">Hủy</button>
        <button type="submit" class="btn btn-primary btn-sm">{{ editMode ? 'Cập nhật' : 'Thêm mới' }}</button>
      </div>
    </form>
  </div>
</div>

</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { supabase } from '@/supabase'

// Nhận ID bài viết từ props
const props = defineProps({
  id: {
    type: String,
    required: true,
  }
})

// Lưu user đăng nhập (lấy từ localStorage)
const user = ref({ username: '', role: '' })

// Bài viết hiện tại và danh sách bài viết liên quan
const post = ref(null)
const relatedNews = ref([])

// Form liên hệ
const form = ref({
  name: '',
  email: '',
  message: ''
})

// Khi component mount
onMounted(async () => {
  // Lấy user từ localStorage
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser)
    } catch (err) {
      console.error('Lỗi phân tích user từ localStorage:', err)
    }
  }

  await fetchPost()
})

// Theo dõi khi props.id thay đổi để fetch lại bài viết
watch(() => props.id, fetchPost)

// Lấy dữ liệu bài viết hiện tại + các bài viết khác
async function fetchPost() {
  try {
    const idNum = parseInt(props.id)

    // Bài viết hiện tại
    const { data: postData, error: postError } = await supabase
      .from('news')
      .select('*')
      .eq('id', idNum)
      .single()

    if (postError) throw postError
    post.value = postData

    // Bài viết liên quan
    const { data: related, error: relatedError } = await supabase
      .from('news')
      .select('*')
      .neq('id', idNum)
      .order('date', { ascending: false })

    if (relatedError) throw relatedError
    relatedNews.value = related
  } catch (err) {
    console.error('Lỗi khi lấy bài viết:', err.message)
    post.value = null
  }
}

// Xử lý gửi form liên hệ
function handleSubmit() {
  const { name, email, message } = form.value
  if (!name || !email || !message) {
    alert('Vui lòng điền đầy đủ thông tin.')
    return
  }

  alert(`Cảm ơn ${name}, chúng tôi đã nhận được thắc mắc của bạn!`)
  form.value = { name: '', email: '', message: '' }
}

//Trạng thái form modal
const showForm = ref(false)
const editMode = ref(false) // true nếu là sửa, false nếu là thêm

const formPost = ref({
  id: null,
  title: '',
  image: '',
  content: '',
})

// Mở form thêm bài
function handleAddPost() {
  editMode.value = false
  formPost.value = { id: null, title: '', image: '', content: '' }
  showForm.value = true
}

// Mở form sửa bài
function handleEditPost(item) {
  editMode.value = true
  formPost.value = { ...item }
  showForm.value = true
}

// Gửi form (thêm hoặc cập nhật)
async function submitPost() {
  try {
    const postData = {
      title: formPost.value.title,
      image: formPost.value.image,
      content: formPost.value.content,
      date: new Date().toISOString(),
    };

    let response;
    if (editMode.value) {
      // Cập nhật bài viết
      response = await supabase
        .from('news')
        .update(postData)
        .eq('id', formPost.value.id);
    } else {
      // Thêm mới bài viết
      response = await supabase
        .from('news')
        .insert([postData])
        .select()
        .single();
    }

    if (response.error) {
      throw response.error;
    }

    alert(editMode.value ? 'Cập nhật bài viết thành công!' : 'Thêm bài viết thành công!');
    showForm.value = false;
    await fetchPost();
  } catch (err) {
    alert('Lỗi: ' + err.message);
  }
}

// Xử lý xóa bài viết
async function handleDeletePost(item) {
  if (!confirm(`Bạn có chắc chắn muốn xóa bài viết "${item.title}" không?`)) {
    return; // Nếu người dùng hủy, không làm gì
  }

  try {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', item.id);

    if (error) throw error;

    alert('Xóa bài viết thành công!');
    await fetchPost(); // Cập nhật lại danh sách bài viết
  } catch (err) {
    alert('Lỗi khi xóa bài viết: ' + err.message);
  }
}


// Hủy form
function cancelForm() {
  showForm.value = false
}

</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.2);
}


/* Container */
.container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Animation fadeIn + slideUp */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Tiêu đề lớn */
h1.text-primary {
  font-size: 2rem;
  color: #0B3D91;
  font-weight: 700;
  text-shadow: 1px 1px 3px rgba(11, 61, 145, 0.3);
  margin-bottom: 1.2rem;
  animation: fadeInUp 0.8s ease forwards;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

/* Ngày tháng */
p.text-muted {
  font-size: 1.1rem;
  color: #6c757d;
  margin-bottom: 2rem;
  animation: fadeInUp 1s ease forwards;
  animation-delay: 0.3s;
  opacity: 0;
  animation-fill-mode: forwards;
  font-weight: 600;
  letter-spacing: 0.03em;
}

/* Ảnh chính bài viết */
img.img-fluid {
  width: 100%;
  max-height: 460px;
  object-fit: cover;
  border-radius: 24px;
  box-shadow:
    0 8px 15px rgba(0, 123, 255, 0.3),
    0 16px 40px rgba(0, 123, 255, 0.15);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.5s ease;
  cursor: pointer;
  margin-bottom: 2rem;
}

img.img-fluid:hover {
  transform: scale(1.08); /* Chỉ phóng to nhẹ */
  box-shadow:
    0 12px 25px rgba(0, 123, 255, 0.6),
    0 28px 70px rgba(0, 123, 255, 0.3);
  filter: drop-shadow(0 0 10px rgba(0, 123, 255, 0.7));
}

/* Ảnh nhỏ trong danh sách bài viết khác */
.col-lg-4 img {
  border-radius: 14px;
  object-fit: cover;
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.col-lg-4 .router-link:hover img {
  transform: scale(1.22); /* Chỉ phóng to nhẹ */
  filter: drop-shadow(0 0 5px rgba(0, 123, 255, 0.7));
}


/* Nội dung bài viết */
.news-content {
  white-space: pre-line;
  line-height: 2.1;
  font-size: 1.25rem;
  color: #222;
  padding: 2rem 2.5rem;
  background: linear-gradient(135deg, #e9f2ff, #d3e6ff);
  border-left: 8px solid #007bff;
  border-radius: 28px;
  box-shadow:
    0 10px 30px rgba(0, 123, 255, 0.1),
    0 16px 50px rgba(0, 123, 255, 0.07);
  transition: background-color 0.4s ease, box-shadow 0.4s ease;
  animation: fadeInUp 1.2s ease forwards;
  cursor: text;
  user-select: text;
}

.news-content:hover {
  background: linear-gradient(135deg, #c8deff, #a7ccff);
  box-shadow:
    0 16px 50px rgba(0, 123, 255, 0.2),
    0 24px 80px rgba(0, 123, 255, 0.15);
}

/* Cột phải */
.col-lg-4 {
  background: #f0f7ff;
  padding: 2rem;
  border-radius: 24px;
  box-shadow:
    0 6px 18px rgba(0, 123, 255, 0.12),
    0 12px 40px rgba(0, 123, 255, 0.07);
  transition: box-shadow 0.3s ease;
}

.col-lg-4:hover {
  box-shadow:
    0 14px 50px rgba(0, 123, 255, 0.3),
    0 22px 75px rgba(0, 123, 255, 0.22);
}

/* Tiêu đề bên phải */
.col-lg-4 h4 {
  color: #007bff;
  font-weight: 900;
  font-size: 1.8rem;
  letter-spacing: 0.07em;
  border-bottom: 3px solid #007bff;
  padding-bottom: 0.7rem;
  margin-bottom: 2rem;
  animation: fadeInUp 1s ease forwards;
  text-transform: uppercase;
}

/* Link bài viết khác */
.col-lg-4 .router-link {
  display: block;
  padding: 1rem 1.2rem;
  border-radius: 24px;
  transition: 
    background-color 0.35s ease, 
    transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.35s ease,
    color 0.35s ease;
  margin-bottom: 1.6rem;
  color: #1c1c1c;
  text-decoration: none;
  box-shadow:
    0 2px 10px rgba(0, 0, 0, 0.04);
  font-weight: 700;
  font-size: 1.05rem;
}

.col-lg-4 .router-link:hover {
  background-color: #cfe3ff;
  transform: translateY(-8px) scale(1.04);
  box-shadow:
    0 10px 25px rgba(0, 123, 255, 0.3);
  color: #0049b7;
  text-decoration: none;
}

/* Hình ảnh nhỏ và text bên phải */
.col-lg-4 .d-flex {
  gap: 16px;
  align-items: flex-start;
}

.col-lg-4 img {
  border-radius: 14px;
  object-fit: cover;
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.col-lg-4 .router-link:hover img {
  transform: scale(1.22) rotate(5deg);
  filter: drop-shadow(0 0 5px rgba(0, 123, 255, 0.7));
}

.col-lg-4 p {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
  color: #2a2a2a;
  transition: color 0.3s ease;
}

.col-lg-4 .router-link:hover p {
  color: #007bff;
}

.col-lg-4 small {
  color: #6c757d;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 991px) {
  .col-lg-8,
  .col-lg-4 {
    max-width: 100%;
    flex: 0 0 100%;
  }
  .col-lg-4 {
    margin-top: 3rem;
  }
}

/*  */
.contact-section {
  margin-top: 3rem;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 20px;
  box-shadow: 0 6px 16px rgba(0, 123, 255, 0.1);
  transition: box-shadow 0.3s ease;
}

.contact-section form {
  width: 100%;
}
</style>

