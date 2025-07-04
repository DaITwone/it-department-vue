<template>
  <div class="teacher-list-container">
    <!-- Bảng danh sách giảng viên -->
    <div class="teacher-list-section">
      <h2>DANH SÁCH GIẢNG VIÊN</h2>
        <button v-if="isAdmin" @click="openAddForm"
  class="add-button">+ Thêm giảng viên</button>
        
      <ul class="teacher-list">
        <li v-for="teacher in teachers" :key="teacher.id" v-show="!selectedTeacher || selectedTeacher.id === teacher.id"
  style="margin-bottom: 16px;">
          <div @click="selectTeacher(teacher)">
            <strong>{{ teacher.name }}</strong> - {{ teacher.department }}
          </div>
          <div class="teacher-actions" v-if="isAdmin">
            <button @click="openEditForm(teacher)">Sửa</button>
            <button @click="deleteTeacher(teacher.id)">Xoá</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Chi tiết giảng viên -->
    <div class="teacher-detail-section" v-if="selectedTeacher">
      <h3>THÔNG TIN GIẢNG VIÊN</h3>
      <img :src="selectedTeacher.image" alt="Hình giảng viên" class="profile-image" />
      <p><strong>Họ tên:</strong> {{ selectedTeacher.name }}</p>
      <p><strong>Năm sinh:</strong> {{ selectedTeacher.date }}</p>
      <p><strong>Giới tính:</strong> {{ selectedTeacher.sex }}</p>
      <p><strong>Chuyên ngành:</strong> {{ selectedTeacher.department }}</p>
      <p><strong>Trình độ đào tạo:</strong> {{ selectedTeacher.level }}</p><br>
      <button @click="selectedTeacher = null" class="back-button">
  ← Quay lại danh sách
</button>

    </div>

    <!-- Form Thêm/Sửa -->
    <div class="form-section" v-if="showForm">
      <h3>{{ isEditing ? 'CẬP NHẬT GIẢNG VIÊN' : 'THÊM GIẢNG VIÊN MỚI' }}</h3>
      <form @submit.prevent="handleSubmit">
        <input v-model="form.name" placeholder="Họ tên" required />
        <input v-model="form.image" placeholder="Link hình ảnh" required />
        <input v-model="form.date" placeholder="Năm sinh" required />
        <input v-model="form.sex" placeholder="Giới tính" required />
        <input v-model="form.department" placeholder="Chuyên ngành" required />
        <input v-model="form.level" placeholder="Trình độ đào tạo" required />
        <div class="form-buttons">
          <button type="submit">{{ isEditing ? 'Lưu thay đổi' : 'Thêm mới' }}</button>
          <button type="button" @click="cancelForm">Huỷ</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase.js'

const teachers = ref([])
const selectedTeacher = ref(null)
const showForm = ref(false)
const isEditing = ref(false)
const isAdmin = ref(false)
const user = ref(null)

const form = ref({
  id: null,
  name: '',
  image: '',
  date: '',
  sex: '',
  department: '',
  level: '',
})

// 1. Load danh sách giảng viên
const fetchTeachers = async () => {
  const { data, error } = await supabase.from('teachers').select('*')
  if (!error) teachers.value = data
  else console.error('Lỗi tải giảng viên:', error.message)
}

// 2. Kiểm tra user đăng nhập
const checkAdmin = async () => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    const parsed = JSON.parse(storedUser)
    user.value = parsed
    isAdmin.value = parsed.username === 'admin'
  }
}

// 3. Mở form thêm
const openAddForm = () => {
  resetForm()
  showForm.value = true
  isEditing.value = false
}

// 4. Mở form sửa
const openEditForm = (teacher) => {
  form.value = { ...teacher }
  showForm.value = true
  isEditing.value = true
}

// 5. Huỷ form
const cancelForm = () => {
  resetForm()
  showForm.value = false
  isEditing.value = false
}

// 6. Reset form
const resetForm = () => {
  form.value = {
    id: null,
    name: '',
    image: '',
    date: '',
    sex: '',
    department: '',
    level: '',
  }
}

// 7. Gửi form (thêm hoặc sửa)
const handleSubmit = async () => {
  if (isEditing.value) {
    await updateTeacher()
  } else {
    await addTeacher()
  }
}

// 8. Thêm mới
const addTeacher = async () => {
  const { data, error } = await supabase.from('teachers').insert([{
    name: form.value.name,
    date: form.value.date,
    sex: form.value.sex,
    department: form.value.department,
    level: form.value.level,
    image: form.value.image,
  }]).select()

  if (error) {
    console.error('Lỗi khi thêm:', error.message)
    return
  }

  if (data) {
    teachers.value.push(data[0])
    cancelForm()
  }
}

// 9. Cập nhật
const updateTeacher = async () => {
  const { id, ...rest } = form.value
  const { error } = await supabase.from('teachers').update(rest).eq('id', id)

  if (!error) {
    const index = teachers.value.findIndex(t => t.id === id)
    if (index !== -1) teachers.value[index] = { id, ...rest }

    if (selectedTeacher.value?.id === id) {
      selectedTeacher.value = { id, ...rest }
    }

    cancelForm()
  } else {
    console.error('Lỗi khi cập nhật:', error.message)
  }
}

// 10. Xoá
const deleteTeacher = async (id) => {
  if (!confirm('Bạn có chắc muốn xoá giảng viên này?')) return

  const { error } = await supabase.from('teachers').delete().eq('id', id)
  if (!error) await fetchTeachers()
  else console.error('Lỗi xoá:', error.message)
}

// 11. Xem chi tiết
const selectTeacher = (teacher) => {
  selectedTeacher.value = teacher
}

// 12. Lifecycle
onMounted(async () => {
  await checkAdmin()
  await fetchTeachers()
})
</script>


<style scoped>
.teacher-list-container {
  display: flex;
  gap: 30px;
  padding: 30px;
  flex-wrap: wrap;
  font-family: 'Segoe UI', sans-serif;
}

.teacher-list-section {
  flex: 1;
  min-width: 300px;
}

.teacher-detail-section {
  flex: 1;
  min-width: 300px;
  border-left: 1px solid #ccc;
  padding-left: 20px;
}

.teacher-list-section h2,
.form-section h3,
.teacher-detail-section h3 {
  color: #1564b3;
  font-weight: bold;
}

.teacher-list {
  list-style: none;
  padding: 0;
}

.teacher-list li {
  background: #f5f5f5;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 8px;
  transition: all 0.3s ease;
}
.teacher-list li:hover {
  background: #e2f0ff;
  transform: translateY(-2px);
}

.teacher-actions button {
  margin-right: 6px;
  margin-top: 6px;
  background-color: #e0ecff;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}
.teacher-actions button:hover {
  background-color: #bcdcff;
}

.profile-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
  border: 3px solid #ccc;
}

.form-section {
  flex: 1;
  min-width: 300px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}

.form-section form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-section input {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.form-buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.form-buttons button {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: #1976d2;
  color: white;
}
.form-buttons button[type="button"] {
  background-color: #999;
}
.add-button {
  padding: 8px 16px;
  margin-bottom: 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.add-button:hover {
  background-color: #218838;
}
.back-button {
  background-color: #f0f0f0;
  border: none;
  color: #1a77c6;
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}
.back-button:hover {
  background-color: #dbeeff;
}
@media (max-width: 768px) {
  .teacher-list-container {
    flex-direction: column;
    padding: 20px;
  }

  .teacher-detail-section {
    border-left: none;
    border-top: 1px solid #ccc;
    padding-left: 0;
    padding-top: 20px;
  }

  .form-section {
    padding: 15px;
  }

  .profile-image {
    width: 100%;
    height: auto;
    max-width: 300px;
  }

  .form-section input {
    font-size: 16px;
  }

  .form-buttons {
    flex-direction: column;
    gap: 8px;
  }

  .form-buttons button {
    width: 100%;
  }

  .add-button {
    width: 100%;
  }

  .back-button {
    width: 100%;
  }
}

</style>
