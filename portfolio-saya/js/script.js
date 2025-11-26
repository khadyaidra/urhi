/**
 * 1. FUNGSI TOGGLE NAVIGASI MOBILE
 * Membuka dan menutup menu navigasi saat tombol menu diklik pada layar kecil.
 */

// 1. Dapatkan elemen-elemen DOM yang dibutuhkan
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.getElementById('navbar');
const body = document.body; // Untuk mencegah scrolling saat menu terbuka

// 2. Tambahkan event listener untuk mendeteksi klik pada tombol toggle
menuToggle.addEventListener('click', () => {
    // a. Toggle kelas 'active' pada navbar
    // Kelas 'active' ini akan kita definisikan di CSS untuk menampilkan menu
    navbar.classList.toggle('active');

    // b. Toggle kelas 'menu-open' pada body
    // Ini berguna untuk mematikan scrolling di background saat menu terbuka
    body.classList.toggle('menu-open');

    // c. Ganti ikon toggle (Hamburger <-> Close)
    const icon = menuToggle.querySelector('i');
    if (navbar.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times'); // Ubah ikon ke 'X'
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars'); // Kembalikan ikon ke 'Hamburger'
    }
});

/**
 * 2. FUNGSI SCROLL AKTIF
 * Menambahkan kelas 'active' pada tautan navigasi yang sesuai dengan section yang sedang dilihat.
 */

// (Fungsi ini akan kita kembangkan di langkah selanjutnya)

// 3. FUNGSI PENUTUP MENU (UX Improvement)
// Secara otomatis menutup menu saat tautan di dalamnya diklik (khusus mobile)
const navLinks = document.querySelectorAll('#navbar a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Cek jika menu sedang aktif di mobile, jika ya, tutup
        if (navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            body.classList.remove('menu-open');
            // Kembalikan ikon ke 'Hamburger'
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        }
    });
});

/**
 * 2. FUNGSI SCROLL SPY (PENANDA TAUTAN AKTIF)
 * Menambahkan kelas 'active' ke tautan navigasi saat section terkait terlihat di viewport.
 */

// 1. Dapatkan semua section yang memiliki ID untuk navigasi
const sections = document.querySelectorAll('section[id]');

// 2. Tambahkan event listener untuk mendeteksi peristiwa scroll
window.addEventListener('scroll', () => {
    // Tentukan posisi scroll saat ini
    let current = '';

    // Loop melalui setiap section
    sections.forEach(section => {
        // Mendapatkan posisi section relatif terhadap viewport
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Offset 150px dari atas. Ini menentukan kapan section dianggap "aktif"
        const offset = 150; 

        // Logika penentuan section aktif:
        // Jika posisi scroll saat ini melewati bagian atas section
        // DAN posisi scroll saat ini kurang dari (bagian atas section + tinggi section)
        if (pageYOffset >= sectionTop - offset) {
            current = section.getAttribute('id');
        }
    });

    // 3. Hapus kelas 'active' dari semua tautan, lalu tambahkan hanya ke tautan yang sesuai
    navLinks.forEach(link => {
        link.classList.remove('active');
        // Cari tautan yang href-nya cocok dengan ID section yang aktif saat ini
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Catatan: Fungsi ini tidak akan berjalan dengan sempurna pada footer karena footer bukan section[id]
// dan posisi scroll di akhir halaman seringkali melewati section terakhir. Ini adalah batasan umum
// dari implementasi Scroll Spy dasar.

/**
 * 3. FUNGSI BACK TO TOP BUTTON
 * Menampilkan/menyembunyikan tombol dan mengimplementasikan smooth scroll.
 */

// 1. Dapatkan elemen tombol
const backToTopBtn = document.getElementById('backToTopBtn');

// 2. Tampilkan/Sembunyikan tombol saat scroll
window.addEventListener('scroll', () => {
    // Tombol akan muncul setelah di-scroll melewati 300 piksel
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// 3. Fungsi Smooth Scroll saat tombol diklik
backToTopBtn.addEventListener('click', () => {
    // Metode modern untuk smooth scroll
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
});