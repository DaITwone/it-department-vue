import { ref, reactive } from "vue"; 
import { supabase } from "../supabase"; 

// Export hàm composable dùng để quản lý chương trình đào tạo
export function usePrograms() {
  // Danh sách tất cả chương trình (hiển thị ở trang)
  const programs = ref([]);

  // Biến lưu thông tin form thêm/sửa chương trình
  const newProgram = reactive({
    title: "",
    desc: "", // sẽ được ánh xạ thành `description` khi gửi lên Supabase
    icon: "",
    link: ""
  });

  // ID của chương trình đang được chỉnh sửa (nếu có)
  const editingId = ref(null);

  // Hàm fetch tất cả chương trình từ bảng "programs" trên Supabase
  const fetchPrograms = async () => {
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .order("id", { ascending: false }); // Sắp xếp ID giảm dần
    if (!error) programs.value = data; // Nếu không lỗi, gán dữ liệu vào biến
  };

  // Hàm thêm chương trình mới
  const addProgram = async () => {
    if (!newProgram.title) return alert("Tiêu đề không được để trống"); // Kiểm tra rỗng

    // Gửi dữ liệu lên Supabase để insert
    const { error } = await supabase.from("programs").insert([newProgram]);

    // Nếu thành công, reset form và refetch
    if (!error) {
      Object.assign(newProgram, {
        title: "",
        desc: "",
        icon: "",
        link: ""
      });
      await fetchPrograms();
    }
  };

  // Gán thông tin 1 chương trình vào form để sửa
  const editProgram = (program) => {
    editingId.value = program.id;
    Object.assign(newProgram, { ...program }); // Copy toàn bộ data vào form
  };

  // Cập nhật thông tin chương trình đã chọn
  const updateProgram = async () => {
    if (!editingId.value) return alert("Không tìm thấy ID để cập nhật.");

    // Kiểm tra thông tin bắt buộc
    if (!newProgram.title || !newProgram.desc)
      return alert("Vui lòng nhập đủ thông tin chương trình.");

    // Gửi cập nhật lên Supabase
    const { error } = await supabase
      .from("programs")
      .update({
        title: newProgram.title,
        description: newProgram.desc, // Chuyển `desc` thành `description` đúng tên cột Supabase
        icon: newProgram.icon,
        link: newProgram.link
      })
      .eq("id", editingId.value); // Tìm đúng dòng theo ID

    if (!error) {
      alert("Cập nhật thành công!");
      editingId.value = null; // Reset ID
      Object.assign(newProgram, {
        title: "",
        desc: "",
        icon: "",
        link: ""
      }); // Reset form
      await fetchPrograms(); // Làm mới dữ liệu
    } else {
      alert("Cập nhật thất bại.");
    }
  };

  // Xoá một chương trình theo ID
  const deleteProgram = async (id) => {
    if (!confirm("Xoá chương trình này?")) return; // Xác nhận trước khi xoá
    const { error } = await supabase.from("programs").delete().eq("id", id);
    if (!error) fetchPrograms(); // Nếu thành công, làm mới lại danh sách
  };

  // Trả về tất cả biến và hàm để component sử dụng
  return {
    programs,
    newProgram,
    editingId,
    fetchPrograms,
    addProgram,
    editProgram,
    updateProgram,
    deleteProgram
  };
}
