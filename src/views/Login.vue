<template>
  <div class="egov-login-container">
    <!-- Cột trái: Ảnh minh họa -->
    <div class="egov-left">
      <img src="https://img.freepik.com/free-vector/isometric-infographic-with-charts-people_52683-971.jpg" alt="Login Illustration" />
    </div>

    <!-- Cột phải: Form đăng nhập -->
    <div class="egov-right">
      <h2 class="login-title">ĐĂNG NHẬP HỆ THỐNG</h2>

      <form @submit.prevent="login">
        <label for="username">Tên đăng nhập:</label>
        <input id="username" v-model="form.username" type="text" />
        <p v-if="errors.username" class="error">{{ errors.username }}</p>

        <label for="password">Mật khẩu:</label>
        <input id="password" v-model="form.password" type="password" />
        <p v-if="errors.password" class="error">{{ errors.password }}</p>

        <button type="submit" :disabled="loading">
          {{ loading ? 'ĐANG XỬ LÝ...' : 'ĐĂNG NHẬP' }}
        </button>

        <div class="forgot-password-wrapper">
          <router-link to="/forgot-password">
            <button type="button" class="signup-button">Quên mật khẩu?</button>
          </router-link>
        </div>

        <div class="signup-button-wrapper">
          <router-link to="/sign-up">
            <button type="button" class="signup-button">ĐĂNG KÝ</button>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'

const router = useRouter()
const loading = ref(false)

const form = reactive({
  username: '',
  password: ''
})

const errors = reactive({
  username: '',
  password: ''
})

const validateForm = () => {
  let valid = true
  errors.username = ''
  errors.password = ''

  if (!form.username) {
    errors.username = 'Vui lòng nhập tên đăng nhập.'
    valid = false
  } else if (form.username.length < 3) {
    errors.username = 'Tên đăng nhập phải có ít nhất 8 ký tự số.'
    valid = false
  }

  if (!form.password) {
    errors.password = 'Vui lòng nhập mật khẩu.'
    valid = false
  }

  return valid
}

const login = async () => {
  if (!validateForm()) return

  loading.value = true
  try {
    const { data, error } = await supabase
      .from('users')
      .select('username, role')
      .eq('username', form.username)
      .eq('password', form.password)

    if (error) throw error

    if (data.length > 0) {
      alert('🎉 Đăng nhập thành công!')
      localStorage.setItem('user', JSON.stringify(data[0]))
      form.username = ''
      form.password = ''
      window.location.href = '/'
    } else {
      alert('Sai tên đăng nhập hoặc mật khẩu!')
    }
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error)
    alert('Lỗi kết nối server!')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.egov-login-container {
  display: flex;
  min-height: 100vh;
}

.egov-left, .egov-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  animation: fadeIn 1s ease-in-out both;
}

.egov-left {
  background: linear-gradient(to right, #0241ad, #1f2a90f9);
  color: white;
  align-items: center;
  text-align: center;
  animation-delay: 0.2s;
}

.egov-left img {
  width: 100%;
  max-width: 500px;
  height: auto;
}

.egov-right {
  padding: 60px;
  animation-delay: 0.6s;
}

.login-title {
  text-align: center;
  font-weight: bold;
  color: #004080;
  margin-bottom: 30px;
}

form label {
  display: block;
  margin-top: 10px;
}

form input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
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
}

button:hover {
  background: #0066cc;
}

button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

.signup-button {
  margin-top: 10px;
  background: white;
  color: #004080;
  border: 2px solid #004080;
  font-weight: bold;
  font-size: 15px;
  width: 150px;
  transition: all 0.3s ease;
}

.signup-button:hover {
  background: #004080;
  color: white;
}

.signup-button-wrapper {
  text-align: right;
}

.forgot-password-wrapper {
  float: left;
}

.error {
  color: red;
  font-size: 14px;
  margin: 5px 0 10px;
}

@media (max-width: 768px) {
  .egov-login-container {
    flex-direction: column;
  }

  .egov-left,
  .egov-right {
    padding: 20px;
  }
}

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
