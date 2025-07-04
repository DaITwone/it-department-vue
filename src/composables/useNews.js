import { ref, reactive } from 'vue'              // Import các hàm reactive để tạo state
import { supabase } from '../supabase'           // Import đối tượng supabase đã cấu hình

// Composable function để quản lý tin tức
export function useNews() {
  const newsItems = ref([])                      // Danh sách các tin tức
  const newNews = reactive({                     // Form thêm/sửa tin
    image: '',                                   // Link ảnh
    text: '',                                    // Nội dung tin
    date: ''                                     // Ngày đăng
  })
  const editingNewsId = ref(null)                // ID tin tức đang được chỉnh sửa

  // Lấy toàn bộ tin tức từ Supabase
  const fetchNews = async () => {
    const { data, error } = await supabase
      .from('newss')                              // Truy vấn bảng 'newss'
      .select('*')                                // Lấy tất cả các cột
      .order('id', { ascending: false })          // Sắp xếp tin mới nhất lên đầu
    if (!error) newsItems.value = data            // Nếu không lỗi thì gán vào biến newsItems
  }

  // Thêm tin tức mới
  const addNews = async () => {
    // Kiểm tra thông tin không được để trống
    if (!newNews.text || !newNews.image || !newNews.date)
      return alert("Vui lòng điền đủ thông tin.")

    const { error } = await supabase
      .from('newss')                              // Gửi lên bảng 'newss'
      .insert([newNews])                          // Chèn một bản ghi

    if (!error) {
      // Reset lại form
      Object.assign(newNews, { image: '', text: '', date: '' })
      await fetchNews()                           // Làm mới danh sách
    }
  }

  // Đưa dữ liệu tin đang chỉnh sửa vào form
  const editNews = (news) => {
    editingNewsId.value = news.id                 // Gán ID vào biến để biết đang sửa tin nào
    Object.assign(newNews, { ...news })           // Copy dữ liệu của tin đó vào form
  }

  // Cập nhật tin đã chọn
  const updateNews = async () => {
    const { error } = await supabase
      .from('newss')
      .update({
        image: newNews.image,
        text: newNews.text,
        date: newNews.date
      })
      .eq('id', editingNewsId.value)              // Tìm bản ghi theo ID để cập nhật

    if (!error) {
      // Cập nhật trực tiếp trong danh sách đã có (không cần refetch)
      const index = newsItems.value.findIndex(n => n.id === editingNewsId.value)
      if (index !== -1) {
        newsItems.value[index] = {
          ...newsItems.value[index], ...newNews   // Cập nhật nội dung tin trong danh sách
        }
      }

      // Reset lại form và trạng thái
      editingNewsId.value = null
      Object.assign(newNews, { image: '', text: '', date: '' })
      alert("Tin tức đã được cập nhật!")
    } else {
      alert("Cập nhật thất bại.")
    }
  }

  // Xoá một tin tức
  const deleteNews = async (id) => {
    if (!confirm('Xoá tin tức này?')) return      // Xác nhận trước khi xoá
    const { error } = await supabase
      .from('newss')
      .delete()
      .eq('id', id)                               // Xoá bản ghi có id tương ứng
    if (!error) fetchNews()                       // Làm mới danh sách nếu thành công
  }

  // Trả ra các biến và hàm để component sử dụng
  return {
    newsItems,
    newNews,
    editingNewsId,
    fetchNews,
    addNews,
    editNews,
    updateNews,
    deleteNews
  }
}
