<template>
  <div class="egov-login-container">
    <!-- Cột trái: Ảnh minh họa hoặc logo -->
    <div class="egov-left">
      <img
        src="https://img.freepik.com/free-vector/bio-robots-replacing-animal-testing-isometric-composition-with-automated-rhinoceros-research-procedure-scientific-laboratory_1284-28848.jpg?uid=R197231633&ga=GA1.1.633229106.1745393051&semt=ais_hybrid&w=740"
        alt=""> <!-- <h3>HỆ THỐNG QUẢN TRỊ EGOV</h3> -->
    </div>

    <!-- Cột phải: Form đăng nhập -->
    <div class="egov-right">
      <h2 style="text-align: center; font-weight: bolder; font-family: 'georgia', sans-serif;">ĐĂNG KÝ</h2>

      <!-- Biểu mẫu(form) đăng ký -->
      <!-- @submit cách viết gọn v-on:submit dùng để lắng nghe sự kiện submit-->
      <!-- .prevent: 1 event modifier ngăn trình duyệt thực hiện hành vi mặc định khi form submit (không reload trang) -->
      <!-- v-on: chỉ thị (directive) dùng để lắng nghe (bắt) các sự kiện DOM như: click, submit, input, change,... -->
      <form @submit.prevent="signUp">
        <!-- Tên đăng nhập -->
        <label for="username">Tên đăng nhập:</label>
        <input type="text" id="username" v-model="form.username" required />
        <p v-if="errors.username" class="error">{{ errors.username }}</p>

        <!-- Mật khẩu -->
        <label for="password">Mật khẩu:</label>
        <input type="password" id="password" v-model="form.password" required />
        <p v-if="errors.password" class="error">{{ errors.password }}</p>

        <!-- Nhập lại mật khẩu -->
        <label for="confirm-password">Nhập lại mật khẩu:</label>
        <input type="password" id="confirm-password" v-model="form.confirmPassword" required />
        <p v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</p>

        <!-- Loại tài khoản -->
        <label for="role">Bạn là:</label>
        <select id="role" v-model="form.role" required>
          <option value="" disabled>-- Chọn tài khoản --</option>
          <option value="student">Sinh viên</option>
          <option value="teacher">Giảng viên</option>
        </select>
        <p v-if="errors.role" class="error">{{ errors.role }}</p>

        <!-- Nút đăng ký -->
        <button type="submit" :disabled="loading">
          {{ loading ? 'ĐANG ĐĂNG KÝ...' : 'ĐĂNG KÝ' }}
        </button>

        <!-- Lỗi từ API (nếu có) -->
        <p v-if="errors.apiError" class="error">{{ errors.apiError }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'

const router = useRouter()
const loading = ref(false)
const errors = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  role: '',
  apiError: ''
})

// Dữ liệu người dùng nhập
const form = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  role: ''
})

// Hàm kiểm tra dữ liệu đầu vào
const validateForm = () => {
  let valid = true
  errors.username = ''
  errors.password = ''
  errors.confirmPassword = ''
  errors.role = ''
  errors.apiError = ''

  if (!form.username) {
    errors.username = 'Vui lòng nhập tên đăng nhập.'
    valid = false
  }

  if (!form.password) {
    errors.password = 'Vui lòng nhập mật khẩu.'
    valid = false
  }

  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Mật khẩu xác nhận không khớp.'
    valid = false
  }

  if (!form.role) {
    errors.role = 'Vui lòng chọn loại tài khoản.'
    valid = false
  }

  return valid
}

// Hàm xử lý đăng ký
const signUp = async () => {
  if (!validateForm()) return

  loading.value = true

  try {
    // Kiểm tra xem username đã tồn tại chưa
    const { data: existingUser } = await supabase
      .from('users')
      .select('username')
      .eq('username', form.username)

    if (existingUser.length > 0) {
      errors.apiError = 'Tên đăng nhập đã tồn tại!'
      loading.value = false
      return
    }

    // Thêm người dùng vào Supabase
    const { error } = await supabase
      .from('users')
      .insert([
        { username: form.username, password: form.password, role: form.role }
      ])

    if (error) throw error

    alert('🎉 Đăng ký thành công!')
    router.push('/login')

    // Reset form
    form.username = ''
    form.password = ''
    form.confirmPassword = ''
    form.role = ''

  } catch (error) {
    console.error(error)
    errors.apiError = 'Đăng ký thất bại. Vui lòng thử lại sau.'
  } finally {
    loading.value = false
  }
}
</script>


<style scoped>
/* ========================
📌 BỐ CỤC CHUNG
======================== */
.egov-login-container {
  display: flex;
  min-height: 100vh;
  flex-direction: row;
}

.egov-left,
.egov-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: fadeIn 1s ease-in-out both;
}

.egov-left {
  color: white;
  align-items: center;
  padding: 40px;
  text-align: center;
}

.egov-left img {
  max-width: 600px;
  margin-bottom: 20px;
}

.egov-right {
  padding: 60px;
  background-image: url(); /* ← Thêm background nếu cần */
}

h2 {
  margin-bottom: 30px;
  color: #004080;
  font-family: 'Georgia', serif;
  text-align: center;
}

/* ========================
📌 FORM ĐĂNG KÝ
======================== */
form label {
  display: block;
  margin-top: 10px;
}

form input,
form select {
  width: 100%;
  padding: 12px;
  margin-top: 5px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
}

form select {
  width: 100%;
}

button {
  width: 100%;
  padding: 12px;
  background: #004080;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background: #0066cc;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 2px;
}

/* ========================
📱 MOBILE (<768px)
======================== */
@media (max-width: 767px) {
  .egov-login-container {
    flex-direction: column;
  }

  .egov-left {
    padding: 20px;
  }

  .egov-left img {
    height: auto;
    max-width: 100%;
  }

  .egov-right {
    padding: 30px 20px;
  }

  form input,
  form select,
  button {
    font-size: 16px;
  }
}

/* ========================
📱 TABLET (768px - 1024px)
======================== */
@media (min-width: 768px) and (max-width: 1024px) {
  .egov-login-container {
    flex-direction: column;
  }

  .egov-left {
    padding: 30px 20px;
    align-items: center;
  }

  .egov-left img {
    max-width: 90%;
    height: auto;
  }

  .egov-right {
    padding: 40px 30px;
  }

  form input,
  form select,
  button {
    font-size: 16px;
  }

  form select {
    width: 100%;
    padding: 10px;
  }

  button {
    padding: 14px;
  }
}

/* ========================
✨ ANIMATION
======================== */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

