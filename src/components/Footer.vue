<template>
  <footer id="contact">
    <div class="container">
      <!-- Cột 1: Thông tin liên hệ -->
      <div class="column">
        <h3>THÔNG TIN LIÊN HỆ</h3>
        <br>
        <p>Địa chỉ: Phòng B603 - 33 Vĩnh Viễn, Phường 02, Quận 10, TP.HCM</p>
        <p>Email: khoacntt@kthcm.edu.vn</p>
        <p>Số điên thoại: 028.38 330 731 (Số nội bộ: 16)</p>
        <p>Fanpage:<a href="https://www.facebook.com/hce.cntt" target="_blank">
            https://www.facebook.com/hce.cntt
          </a> </p>
      </div>

      <!-- Cột 2: Bản đồ -->
      <div class="column">
        <!-- <h3>Bản đồ</h3> -->
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6052521641054!2d106.67075587316931!3d10.764875359410498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ee10bef3c07%3A0xfd59127e8c2a3e0!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEtpbmggdOG6vyBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1744983007577!5m2!1svi!2s"
            width="100%" height="200" style="border: 0;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>

      <!-- Cột 3: Logo HCE + Đối tác + Mạng xã hội -->
      <div class="column">
        <div class="logo-partners">
          <div class="logo">
            <a href="https://www.kthcm.edu.vn/">
              <img src="https://cdn.haitrieu.com/wp-content/uploads/2023/01/Logo-Truong-Cao-dang-Kinh-te-TP.HCM_.png"
                alt="Logo Trường" />
            </a>
          </div>
          <div class="partner-logos-inline">
            <h3 style="font-size: 15px;">ĐỐI TÁC</h3>
            <a href="https://nhanhoa.com/"><img src="../image/doitac.png" alt="Đối tác 1" /></a>
            <a href="https://www.dpicenter.edu.vn/"><img src="../image/doitac2.jpg" alt="Đối tác 2" /></a>
          </div>
        </div>

        <p style="margin-top: 10px;">© 2025 Khoa CNTT, Trường cao đẳng kinh tế TP.HCM</p>

        <div class="social">
          <span>Follow Us</span>
          <div class="icons">
            <a href="https://www.facebook.com/hce.cntt"><i class="fab fa-facebook-f"></i></a>
            <i class="fab fa-linkedin-in"></i>
            <a href="https://www.youtube.com/@hcetruongcaoangkinhtetphcm5071"><i class="fab fa-youtube"></i></a>
            <i class="fab fa-tiktok"></i>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>

</script>

<style scoped>
footer {
  background: linear-gradient(to right, #141e30, #243b55);
  color: white;
  padding: 50px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  overflow: hidden;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1500px;
  margin: 0 auto;
  gap: 30px;
}

.column {
  flex: 1 1 300px;
  min-width: 280px;
  margin: 10px 0;
  font-size: 14px;
  color: #ccc;
  transition: transform 0.3s ease;
}

.column:hover {
  transform: translateY(-5px);
}

.column h3 {
  margin-bottom: 10px;
  color: #00c3ff;
  font-size: 20px;
  position: relative;
}

.column h3::after {
  content: "";
  width: 50px;
  height: 3px;
  background: #00c3ff;
  display: block;
  margin-top: 6px;
}

.column a {
  color: #61dafb;
  text-decoration: none;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

.column a:hover {
  color: #ffffff;
  text-shadow: 0 0 10px #00c3ff;
}

.logo img {
  height: 110px;
  border-radius: 8px;
  transition: transform 0.4s ease;
}

.logo img:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(0, 195, 255, 0.5);
}

.logo-partners {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.partner-logos-inline h3 {
  margin-bottom: 10px;
  color: #00c3ff;
}

.partner-logos-inline a img {
  height: 70px;
  width: auto;
  object-fit: contain;
  margin-right: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 6px;
}

.partner-logos-inline a img:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px #00c3ff;
}

.map-container {
  margin-top: 10px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
}

.social {
  margin-top: 30px;
}

.social span {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #ffffff;
}

.icons i {
  font-size: 22px;
  margin-right: 15px;
  cursor: pointer;
  transition: transform 0.3s ease, color 0.3s ease;
  color: #00c3ff;
}

.icons i:hover {
  transform: scale(1.3);
  color: #ffffff;
  text-shadow: 0 0 10px #00c3ff;
}

/* Responsive */
@media (max-width: 768px) {
  .logo img {
    height: 80px;
    margin-bottom: 20px;
  }

  .map-container iframe {
    height: 200px;
  }

  .social {
    width: 100%;
  }
}

</style>