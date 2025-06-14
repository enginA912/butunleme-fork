import React from "react";
import { Routes, Route, Link } from 'react-router-dom';
import Contact from './Contact.jsx';
import AboutUs from './AboutUs.jsx';
import Products from './Products.jsx'; // Products bileşenini içe aktardık
import { useState } from "react";
// import './App.css'; // Eğer App.css dosyanız varsa bunu ekleyebilirsiniz

// Navbar Bileşeni
function Navbar() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "mustafa1234") {
      setShowEmail(true);
      setLoginMessage("");
    } else {
      setShowEmail(false);
      setLoginMessage("Şifre hatalı! Lütfen tekrar deneyin.");
    }
  };

  return (
    <header className="navbar p-4 flex flex-col items-center gap-2 md:flex-row md:justify-between">
      <h1 className="logo text-2xl font-bold">Bonjuteri</h1>
      <nav className="menu flex gap-4">
        <Link to="/">Anasayfa</Link>
        <Link to="/urunler">Tüm Ürünler</Link> {/* Tüm Ürünler linki */}
        <Link to="/hakkimizda">Hakkımızda</Link>
        <Link to="/iletisim">İletişim</Link>
      </nav>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center gap-2 mt-4 md:mt-0"
      >
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={handleEmailChange}
          required
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={handlePasswordChange}
          required
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-300 w-full sm:w-auto"
        >
          Giriş
        </button>
      </form>

      {/* Login mesajları */}
      {showEmail && (
        <div className="mt-2 text-green-700 font-medium text-center w-full">
          Giriş yapılan e-posta adresi: <span className="font-bold">{email}</span>
        </div>
      )}
      {loginMessage && !showEmail && (
        <div className="mt-2 text-red-600 font-medium text-center w-full">
          {loginMessage}
        </div>
      )}
    </header>
  );
}

// Urun Bileşeni: Tek bir ürün kartını temsil eder (App.jsx'te de tanımlı olmalı, Products.jsx ile aynı)
function Urun({ image, title, fiyat }) {
  return (
    <div className="urun border p-4 rounded-lg shadow-md text-center">
      {/* Link'i burada da kullanıyoruz */}
      <Link to={`/urunler/${title.replace(/\s+/g, '-')}`}>
        <img src={image} alt={title} className="mx-auto h-40 object-contain" />
        <h2 className="text-lg font-semibold mt-2" style={{ color: "black" }}>
          {title}
        </h2>
        <p className="fiyat text-sm text-gray-600">
          <s>649.99TL</s> <span className="text-red-500 font-bold">{fiyat}</span>
        </p>
      </Link>
    </div>
  );
}

// UrunListesi Bileşeni: Ürün kartlarını listeler, dışarıdan urunler prop'u alacak şekilde güncellendi
function UrunListesi({ urunler }) { // urunler prop'u eklendi
  return (
    <div className="urun-listesi grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
      {urunler.map((urun, i) => (
        <Urun key={i} {...urun} />
      ))}
    </div>
  );
}

// Footer Bileşeni
function Footer() {
  return (
    <footer className="footer bg-gray-100 p-6 mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
      <div className="footer-section">
        <p>Bonjuteri &copy; 2025</p>
        <p>Tüm hakları saklıdır.</p>
      </div>
      <div className="footer-section">
        <label className="font-bold">İletişim</label>
        <Link to="/iletisim">contact@bonjuteri.com</Link>
      </div>
      <div className="footer-section">
        <label className="font-bold">Sosyal Medya</label>
        <a href="#">Instagram</a>
        <a href="#">Facebook</a>
        <a href="#">Twitter</a>
        <a href="#">LinkedIn</a>
      </div>
      <div className="footer-section">
        <label className="font-bold">Hizmetler</label>
        <a href="#">Ürün İade</a>
        <a href="#">Garanti</a>
        <a href="#">Sıkça Sorulan Sorular</a>
      </div>
    </footer>
  );
}

// Ana App Bileşeni
function App() {
  // Anasayfada gösterilecek ürünler (örneğin ilk 4 ürün)
  const anasayfaUrunleri = [
    { image: "/images/kuyumcu1.webp", title: "14 Ayar Altın Kaplama Gökyüzü Kolye", fiyat: "499.99 TL" },
    { image: "/images/kuyumcu2.webp", title: "14 Ayar Altın Kaplama İtalyan İnci Kalp Kolye", fiyat: "499.99 TL" },
    { image: "/images/kuyumcu3.webp", title: "14 Ayar Altın Kaplama 100 Dilde Seni Seviyorum Kolye", fiyat: "499.99 TL" },
    { image: "/images/kuyumcu3.webp", title: "14 Ayar Altın Kaplama 100 Dilde Seni Seviyorum Kolye", fiyat: "499.99 TL" },
  ];

  return (
    <>
      <Navbar />
      <hr />

      <Routes>
        {/* Anasayfa yolu: Anasayfa için özel ürün listesi */}
        <Route path="/" element={
          <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto', textAlign: 'center' }}>
            <h2>Ana Sayfa Ürünleri</h2>
            <UrunListesi urunler={anasayfaUrunleri} /> {/* Anasayfa ürünlerini UrunListesi'ne gönderiyoruz */}
          </div>
        } />

        {/* Tüm Ürünler yolu: /urunler URL'sine gidildiğinde Products bileşenini gösterir (8 ürün) */}
        <Route path="/urunler" element={<Products />} />

        {/* Hakkımızda yolu */}
        <Route path="/hakkimizda" element={<AboutUs />} />

        {/* İletişim yolu */}
        <Route path="/iletisim" element={<Contact />} />

        {/* Ürün Detay Sayfası için örnek rota (isteğe bağlı) */}
        {/* <Route path="/urunler/:urunAdi" element={<UrunDetay />} /> */}

      </Routes>

      <hr />
      <Footer />
    </>
  );
}

export default App;