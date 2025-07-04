<template>
  <div class="page-wrapper">
    <div class="container py-4">
      <h2 class="mb-4">Quản lý liên hệ</h2>

      <!-- Form gửi mail (chỉ cho người không phải admin) -->
      <div v-if="!isAdmin" class="mb-4 border p-3 rounded">
        <h4>Gửi liên hệ mới</h4>
        <form @submit.prevent="submitContact">
          <div class="mb-2">
            <input
              v-model="form.name"
              type="text"
              class="form-control"
              placeholder="Họ và tên"
              required
            />
          </div>
          <div class="mb-2">
            <input
              v-model="form.email"
              type="email"
              class="form-control"
              placeholder="Email"
              required
            />
          </div>
          <div class="mb-2">
            <textarea
              v-model="form.message"
              class="form-control"
              placeholder="Nội dung liên hệ"
              rows="3"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary me-2">Gửi liên hệ</button>
        </form>
      </div>

      <!-- Danh sách liên hệ (chỉ hiển thị cho admin) -->
      <div v-if="isAdmin">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Họ và tên</th>
              <th>Email</th>
              <th>Nội dung</th>
              <th>Ngày gửi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in contacts" :key="contact.id">
              <td>{{ contact.name }}</td>
              <td>{{ contact.email }}</td>
              <td>{{ contact.message }}</td>
              <td>{{ new Date(contact.created_at).toLocaleString() }}</td>
            </tr>
            <tr v-if="contacts.length === 0">
              <td colspan="4" class="text-center">Chưa có liên hệ nào.</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Hiển thị thông báo nếu không phải admin -->
      <div v-else>
        <p class="text-center">Chỉ admin mới có thể xem danh sách liên hệ.</p>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'

// Khởi tạo danh sách liên hệ
const contacts = ref([])

// Khởi tạo form lưu trữ dữ liệu người dùng nhập
const form = ref({
  id: null,
  name: '',
  email: '',
  message: '',
})

// Biến trạng thái để biết người dùng là admin hay không
const isAdmin = ref(false)

// ===== Lấy dữ liệu từ Supabase khi trang được load =====
async function fetchContacts() {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    alert('Lỗi khi tải liên hệ: ' + error.message)
  } else {
    contacts.value = data
  }
}

// Kiểm tra quyền admin khi trang load
onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user')) // lấy thông tin người dùng từ localStorage
  if (user && user.role === 'admin') {
    isAdmin.value = true
    fetchContacts() // Tải danh sách liên hệ cho admin
  }
})

// ===== Gửi form: xử lý gửi liên hệ (chỉ cho người không phải admin) =====
async function submitContact() {
  // Kiểm tra nếu thiếu thông tin thì báo lỗi
  if (!form.value.name || !form.value.email || !form.value.message) {
    alert('Vui lòng điền đầy đủ thông tin')
    return
  }

  const { error } = await supabase.from('contacts').insert([{
    name: form.value.name,
    email: form.value.email,
    message: form.value.message,
  }])

  if (error) {
    alert('Lỗi khi thêm mới: ' + error.message)
    return
  }

  alert('Gửi liên hệ thành công!')

  // Reset form sau khi gửi
  resetForm()
}

// ===== Đặt lại form về trạng thái ban đầu =====
function resetForm() {
  form.value = {
    id: null,
    name: '',
    email: '',
    message: '',
  }
}
</script>




<style scoped>
.page-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center; /* căn giữa ngang */
  align-items: center; /* căn giữa dọc */
  background: #f5f7fa;
  padding: 20px;
  box-sizing: border-box;
}

.container {
  max-width: 900px;
  width: 100%;
  background: #fff;
  box-shadow: 0 8px 20px rgb(0 0 0 / 0.15);
  border-radius: 12px;
  padding: 30px 40px;
  color: #333;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  font-weight: 700;
  color: #2c3e50;
  letter-spacing: 1.1px;
  text-transform: uppercase;
  margin-bottom: 30px;
}

h4 {
  font-weight: 600;
  color: #34495e;
  margin-bottom: 20px;
  border-bottom: 2px solid #3498db;
  padding-bottom: 8px;
  text-align: center;
}

form > div {
  max-width: 600px;
  margin: 0 auto 15px auto;
}

form input.form-control,
form textarea.form-control {
  border-radius: 8px;
  border: 1.8px solid #ddd;
  transition: border-color 0.3s ease;
  font-size: 1rem;
  padding: 12px 15px;
  text-align: left;
}

form input.form-control:focus,
form textarea.form-control:focus {
  border-color: #3498db;
  box-shadow: 0 0 8px rgba(52, 152, 219, 0.4);
  outline: none;
}

button.btn-primary {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  border: none;
  padding: 10px 25px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1rem;
  transition: background 0.4s ease;
  box-shadow: 0 5px 15px rgb(37 117 252 / 0.4);
  cursor: pointer;
}

button.btn-primary:hover {
  background: linear-gradient(135deg, #2575fc 0%, #6a11cb 100%);
  box-shadow: 0 8px 20px rgb(37 117 252 / 0.7);
}

button.btn-secondary {
  background-color: #95a5a6;
  border: none;
  padding: 10px 25px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1rem;
  color: white;
  transition: background-color 0.3s ease;
  margin-left: 8px;
}

button.btn-secondary:hover {
  background-color: #7f8c8d;
}

table.table {
  margin-top: 30px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgb(0 0 0 / 0.12);
  font-size: 0.95rem;
  color: #555;
  width: 100%;
}

table.table thead {
  background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
}

table.table th,
table.table td {
  padding: 14px 20px;
  vertical-align: middle;
  border-color: #e3e6f0;
}

table.table tbody tr:hover {
  background-color: #f0f5ff;
  cursor: pointer;
}

button.btn-warning {
  background-color: #f39c12;
  border: none;
  box-shadow: 0 2px 6px rgb(243 156 18 / 0.6);
  transition: background-color 0.3s ease;
  font-weight: 600;
}

button.btn-warning:hover {
  background-color: #d68910;
  box-shadow: 0 4px 10px rgb(214 137 16 / 0.9);
}

button.btn-danger {
  background-color: #e74c3c;
  border: none;
  box-shadow: 0 2px 6px rgb(231 76 60 / 0.6);
  transition: background-color 0.3s ease;
  font-weight: 600;
}

button.btn-danger:hover {
  background-color: #c0392b;
  box-shadow: 0 4px 10px rgb(192 57 43 / 0.9);
}

.text-center {
  font-style: italic;
  color: #999;
  padding: 20px 0;
}
</style>
