<template>
  <div class="egov-login-container">
    <div class="egov-left">
      <img src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg" alt="Quên mật khẩu" />
    </div>

    <div class="egov-right">
      <h2 class="title">QUÊN MẬT KHẨU</h2>

      <form @submit.prevent="resetPassword">
        <!-- Username -->
        <label for="username">Tên đăng nhập:</label>
        <input id="username" v-model="form.username" required />
        <p v-if="errors.username" class="error">{{ errors.username }}</p>

        <!-- Send Code -->
        <button type="button" @click="sendCode" :disabled="loading || codeSent" class="btn btn-primary">
          {{ loading ? 'ĐANG GỬI MÃ...' : (codeSent ? 'MÃ ĐÃ GỬI' : 'GỬI MÃ XÁC NHẬN') }}
        </button>

        <!-- Demo Code Display -->
        <p v-if="codeSent" class="code-demo">Mã xác nhận (demo): {{ generatedCode }}</p>

        <!-- Verify Code -->
        <div v-if="codeSent">
          <label for="code">Mã xác nhận:</label>
          <input id="code" v-model="form.code" maxlength="6" required />
          <p v-if="errors.code" class="error">{{ errors.code }}</p>

          <button v-if="!codeVerified" type="button" class="btn btn-verify" @click="verifyCode">
            XÁC MINH MÃ
          </button>
        </div>

        <!-- Reset Password -->
        <div v-if="codeVerified">
          <label for="new-password">Mật khẩu mới:</label>
          <input id="new-password" type="password" v-model="form.newPassword" required />
          <p v-if="errors.newPassword" class="error">{{ errors.newPassword }}</p>

          <label for="confirm-password">Xác nhận mật khẩu mới:</label>
          <input id="confirm-password" type="password" v-model="form.confirmPassword" required />
          <p v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</p>

          <button type="submit" class="btn btn-submit" :disabled="loading">
            {{ loading ? 'ĐANG XỬ LÝ...' : 'ĐẶT LẠI MẬT KHẨU' }}
          </button>
        </div>

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
const codeSent = ref(false)
const codeVerified = ref(false)
const generatedCode = ref('')

const form = reactive({
  username: '',
  code: '',
  newPassword: '',
  confirmPassword: ''
})

const errors = reactive({
  username: '',
  code: '',
  newPassword: '',
  confirmPassword: '',
  apiError: ''
})

// Gửi mã xác nhận
const sendCode = async () => {
  errors.username = ''
  if (!form.username) {
    errors.username = 'Vui lòng nhập tên đăng nhập.'
    return
  }

  loading.value = true
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('username', form.username)
    .single()

  if (error || !data) {
    errors.username = 'Tên đăng nhập không tồn tại.'
    loading.value = false
    return
  }

  generatedCode.value = Math.floor(100000 + Math.random() * 900000).toString()
  alert('Mã xác nhận (demo): ' + generatedCode.value)
  codeSent.value = true
  loading.value = false
}

// Xác minh mã
const verifyCode = () => {
  errors.code = ''
  if (!form.code) {
    errors.code = 'Vui lòng nhập mã xác nhận.'
    return
  }

  if (form.code !== generatedCode.value) {
    errors.code = 'Mã xác nhận không đúng.'
    codeVerified.value = false
    return
  }

  codeVerified.value = true
}

// Đặt lại mật khẩu
const resetPassword = async () => {
  if (!validateForm()) return
  loading.value = true

  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('username', form.username)
    .single()

  if (error || !data) {
    errors.apiError = 'Tên đăng nhập không tồn tại.'
    loading.value = false
    return
  }

  const { error: updateError } = await supabase
    .from('users')
    .update({ password: form.newPassword })
    .eq('id', data.id)

  if (updateError) {
    errors.apiError = 'Lỗi cập nhật mật khẩu.'
    loading.value = false
    return
  }

  alert('🎉 Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.')
  router.push('/login')

  Object.assign(form, {
    username: '',
    code: '',
    newPassword: '',
    confirmPassword: ''
  })
  codeSent.value = false
  generatedCode.value = ''
  codeVerified.value = false
  loading.value = false
}

// Kiểm tra hợp lệ
const validateForm = () => {
  Object.assign(errors, {
    username: '',
    code: '',
    newPassword: '',
    confirmPassword: '',
    apiError: ''
  })

  let valid = true

  if (!form.code || form.code !== generatedCode.value) {
    errors.code = 'Mã xác nhận không đúng.'
    valid = false
    codeVerified.value = false
  }

  if (!form.newPassword) {
    errors.newPassword = 'Vui lòng nhập mật khẩu mới.'
    valid = false
  }

  if (form.newPassword !== form.confirmPassword) {
    errors.confirmPassword = 'Mật khẩu xác nhận không khớp.'
    valid = false
  }

  return valid
}
</script>


<style scoped>
.egov-login-container {
  display: flex;
  min-height: 100vh;
}

.egov-left,
.egov-right {
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 40px;
  animation: fadeIn 1s ease-in-out both;
}

.egov-left img {
  max-width: 600px;
  width: 100%;
  height: auto;
}

.egov-right {
  padding: 60px;
}

.title {
  text-align: center;
  font-weight: bold;
  font-family: Georgia, sans-serif;
  color: #004080;
  margin-bottom: 30px;
}

input {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  margin-bottom: 10px;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-verify {
  background-color: green;
  color: white;
  margin-bottom: 20px;
}

.btn-submit {
  background-color: #004080;
  color: white;
}

.btn-submit:hover {
  background-color: #0066cc;
}

.error {
  color: red;
  font-size: 0.9rem;
}

.code-demo {
  color: green;
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
}

/* Responsive */
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

