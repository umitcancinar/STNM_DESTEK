// --- Başlangıç Verileri (LocalStorage boşsa kullanılacak varsayılan veriler) ---
const defaultData = {
    applications: [
        { id: 'app1', title: 'TÜBİTAK 2209-A Destek Programı', image: 'https://raw.githubusercontent.com/umitcancinar/STNM_DESTEK/main/STNM_IMAGES.png', desc: 'Üniversite öğrencileri araştırma projeleri destekleme programı. Detaylı bilgi ve danışmanlık.', link: '905541563862' },
        { id: 'app2', title: 'TEKNOFEST Başvuruları', image: 'https://raw.githubusercontent.com/umitcancinar/STNM_DESTEK/main/STNM_IMAGES.png', desc: 'Teknofest yarışmaları için teknoloji geliştirme ve proje danışmanlığı başvuru süreci.', link: '905541563862' }
    ],
    projects: [
        { id: 'proj1', title: 'Savunma sanayi projeleri', image: 'https://raw.githubusercontent.com/umitcancinar/STNM_DESTEK/main/STNM_IMAGES.png', desc: 'Milli savunma hamlesine bizler de katılıyor, okulumuzda öğrendiğimiz bilgileri pratiğe dökerek hayata geçiriyoruz.', link: '#' },
        { id: 'proj2', title: 'Akıllı Savaş Teknolojileri', image: 'https://raw.githubusercontent.com/umitcancinar/STNM_DESTEK/main/STNM_IMAGES.png', desc: 'IoT tabanlı sensörlerle silahlarımızın verimliliğini artıran entegre otomasyon sistemi.', link: '#' }
    ],
    tasks: [
        { id: 'task1', title: 'Görev 1 — Web Teknolojileri Araştırma Raporu ve Uygulaması', image: 'https://raw.githubusercontent.com/umitcancinar/STNM_DESTEK/main/STNM_IMAGES.png', desc: 'Web geliştirme alanında ileri seviye bir framework seçilerek detaylı bir araştırma raporu ve uygulama.', link: '#' },
        { id: 'task2', title: 'Görev 2 — Görüntü İşleme Araştırma Raporu', image: 'https://raw.githubusercontent.com/umitcancinar/STNM_DESTEK/main/STNM_IMAGES.png', desc: 'Görüntü işleme kavramlarının veya algoritmalarının detaylı raporlandırması.', link: '#' },
        { id: 'task3', title: 'Görev 3 — Simülasyon / Robotik Araştırma Raporu', image: 'https://raw.githubusercontent.com/umitcancinar/STNM_DESTEK/main/STNM_IMAGES.png', desc: 'Simülasyon veya robotik alanında bir sistem, yöntem raporlandırması.', link: '#' },
        { id: 'task4', title: 'Görev 4 — Gömülü Sistemler Araştırma Raporu', image: 'https://raw.githubusercontent.com/umitcancinar/STNM_DESTEK/main/STNM_IMAGES.png', desc: 'Gömülü sistemler mimarisine ve donanıma dair kavramsal raporlama görevi.', link: '#' }
    ],
    about: `<p><strong>STNM</strong> olarak misyonumuz, savunma sanayi ürünlerine öğrendiğimiz teorik bilgileri pratiğe dönüştürerek katkı sağlamaktır.</p>
            <p>Uzman kadromuzla birlikte, başta TÜBİTAK ve TEKNOFEST olmak üzere birçok ulusal ve uluslararası platformda projeler yürütmekteyiz. Geleceğin teknolojilerini geliştiren gençlerle ülkemiz savunma sanayine katkı sunmak en büyük tutkumuzdur.</p>`,
    contact: {
        address: 'Fırat Üniversitesi Teknokent, Merkez / Elazığ',
        phone: '0 554 156 38 62',
        email: 'admin@umitcancinar.me',
        hours: 'Hafta İçi: 09:00 - 18:00'
    }
};

// --- Uygulama Sınıfı ---
class App {
    constructor() {
        this.initData();
        this.bindEvents();
        this.initTheme();
        this.renderAll();

        // Yüklenme Animasyonu Gizleme
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loader = document.getElementById('loader');
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    document.getElementById('home').classList.add('active');
                }, 500);
            }, 1000);
        });

        document.getElementById('current-year').textContent = new Date().getFullYear();
    }

    initData() {
        if (!localStorage.getItem('stnm_data')) {
            localStorage.setItem('stnm_data', JSON.stringify(defaultData));
        }
    }

    getData() {
        return JSON.parse(localStorage.getItem('stnm_data'));
    }

    saveData(data) {
        localStorage.setItem('stnm_data', JSON.stringify(data));
        this.renderAll();
    }

    initTheme() {
        const savedTheme = localStorage.getItem('stnm_theme');
        const themeBtn = document.getElementById('theme-toggle');
        const icon = themeBtn.querySelector('i');

        // Varsayılan olarak hep "light" modda açılacak
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            icon.className = 'ri-sun-line';
        } else {
            // Hiç seçilmemişse veya 'light' seçilmişse hep beyaz (light) kalsın
            document.documentElement.setAttribute('data-theme', 'light');
            icon.className = 'ri-moon-line';
        }

        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('stnm_theme', 'light');
                icon.className = 'ri-moon-line';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('stnm_theme', 'dark');
                icon.className = 'ri-sun-line';
            }
        });
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            const header = document.getElementById('main-header');
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        const mobileBtn = document.getElementById('mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('show')) {
                icon.className = 'ri-close-line';
            } else {
                icon.className = 'ri-menu-3-line';
            }
        });

        document.getElementById('admin-login-btn').addEventListener('click', () => {
            if (window.admin && window.admin.isLoggedIn) {
                this.openModal('admin-modal');
                window.admin.renderAdminForms();
                window.admin.renderAdminTables();
            } else {
                this.openModal('login-modal');
            }
        });
    }

    navigate(targetId) {
        document.querySelector('.nav-links').classList.remove('show');
        document.querySelector('#mobile-menu-btn i').className = 'ri-menu-3-line';

        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-item[data-target="${targetId}"]`);
        if (activeLink) activeLink.classList.add('active');

        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    openModal(id) {
        document.getElementById(id).classList.add('show');
    }

    closeModal(id) {
        document.getElementById(id).classList.remove('show');
    }

    renderAll() {
        this.renderApplications(data.applications);
        this.renderProjects(data.projects);
        this.renderTasks(data.tasks);
        this.renderAbout(data.about);
        this.renderContact(data.contact);

        if (window.admin && window.admin.isLoggedIn) {
            window.admin.renderAdminTables();
        }
    }

    renderApplications(applications) {
        const container = document.getElementById('applications-container');
        if (!applications || applications.length === 0) {
            container.innerHTML = '<p class="text-center w-100">Şu an aktif bir başvuru bulunmamaktadır.</p>';
            return;
        }

        container.innerHTML = applications.map(app => `
            <div class="card">
                <div class="card-img-wrapper">
                    <img src="${app.image}" alt="${app.title}">
                </div>
                <div class="card-body">
                    <h3 class="card-title">${app.title}</h3>
                    <p class="card-desc">${app.desc}</p>
                    <div class="card-footer">
                        <a href="https://wa.me/${app.link}?text=Merhaba,%20${encodeURIComponent(app.title)}%20hakkinda%20basvuru%20yapmak%20ve%20bilgi%20almak%20istiyorum." target="_blank" class="btn btn-whatsapp w-100">
                            <i class="ri-whatsapp-line"></i> Başvur & İletişime Geç
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderProjects(projects) {
        const container = document.getElementById('projects-container');
        if (!projects || projects.length === 0) {
            container.innerHTML = '<p class="text-center w-100">Şu an gösterilecek proje bulunmamaktadır.</p>';
            return;
        }

        container.innerHTML = projects.map(proj => `
            <div class="card">
                <div class="card-img-wrapper">
                    <img src="${proj.image}" alt="${proj.title}">
                </div>
                <div class="card-body">
                    <h3 class="card-title">${proj.title}</h3>
                    <p class="card-desc">${proj.desc}</p>
                    <div class="card-footer">
                        <a href="${proj.link === '#' ? 'javascript:void(0)' : proj.link}" ${proj.link !== '#' ? 'target="_blank"' : ''} class="btn btn-primary w-100">
                            İncele <i class="ri-arrow-right-up-line"></i>
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderTasks(tasksList) {
        const container = document.getElementById('tasks-container');
        if (!tasksList || tasksList.length === 0) {
            container.innerHTML = '<p class="text-center w-100">Şu an gösterilecek görevlendirme bulunmamaktadır.</p>';
            return;
        }

        container.innerHTML = tasksList.map(task => `
            <div class="card">
                <div class="card-img-wrapper">
                    <img src="${task.image}" alt="${task.title}">
                </div>
                <div class="card-body">
                    <h3 class="card-title">${task.title}</h3>
                    <p class="card-desc">${task.desc}</p>
                    <div class="card-footer">
                        <a href="${task.link === '#' ? 'javascript:void(0)' : task.link}" ${task.link !== '#' ? 'target="_blank"' : ''} class="btn btn-primary w-100">
                            Görevi İncele <i class="ri-arrow-right-up-line"></i>
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderAbout(aboutHtml) {
        const container = document.getElementById('about-content-container');
        container.innerHTML = aboutHtml;
    }

    renderContact(contact) {
        const container = document.getElementById('contact-content-container');
        container.innerHTML = `
            <div class="contact-item">
                <i class="ri-map-pin-2-line"></i>
                <div>
                    <h4>Adres</h4>
                    <p>${contact.address}</p>
                </div>
            </div>
            <div class="contact-item">
                <i class="ri-phone-line"></i>
                <div>
                    <h4>Telefon</h4>
                    <p><a href="tel:${contact.phone}" style="color:inherit; text-decoration:none;">${contact.phone}</a></p>
                </div>
            </div>
            <div class="contact-item">
                <i class="ri-mail-send-line"></i>
                <div>
                    <h4>E-posta</h4>
                    <p><a href="mailto:${contact.email}" style="color:inherit; text-decoration:none;">${contact.email}</a></p>
                </div>
            </div>
            <div class="contact-item">
                <i class="ri-time-line"></i>
                <div>
                    <h4>Çalışma Saatleri</h4>
                    <p>${contact.hours}</p>
                </div>
            </div>
        `;
    }
}

// --- Admin Sınıfı ---
class Admin {
    constructor() {
        this.isLoggedIn = sessionStorage.getItem('admin_logged_in') === 'true';
        this.EXPECTED_USER_HASH = 'g05tco';
        this.EXPECTED_PASS_HASH = '-xjy3tb';

        this.bindEvents();

        if (this.isLoggedIn) {
            document.getElementById('admin-login-btn').innerHTML = '<i class="ri-dashboard-line"></i>';
        }
    }

    bindEvents() {
        const loginForm = document.getElementById('login-form');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('admin-about-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const data = app.getData();
            data.about = document.getElementById('about-text-input').value;
            app.saveData(data);
            alert('Hakkımızda bölümü başarıyla güncellendi!');
        });

        document.getElementById('admin-contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const data = app.getData();
            data.contact = {
                address: document.getElementById('contact-address-input').value,
                phone: document.getElementById('contact-phone-input').value,
                email: document.getElementById('contact-email-input').value,
                hours: document.getElementById('contact-hours-input').value
            };
            app.saveData(data);
            alert('İletişim bilgileri başarıyla güncellendi!');
        });

        document.getElementById('item-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveItem();
        });
    }

    hashStr(s) {
        let k = 5381;
        for (let i = 0; i < s.length; i++) {
            k = ((k << 5) + k) + s.charCodeAt(i);
        }
        return k.toString(36);
    }

    handleLogin() {
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;
        const errorMsg = document.getElementById('login-error');

        if (this.hashStr(user) === this.EXPECTED_USER_HASH && this.hashStr(pass) === this.EXPECTED_PASS_HASH) {
            this.isLoggedIn = true;
            sessionStorage.setItem('admin_logged_in', 'true');
            document.getElementById('admin-login-btn').innerHTML = '<i class="ri-dashboard-line"></i>';
            app.closeModal('login-modal');
            app.openModal('admin-modal');
            this.renderAdminForms();
            this.renderAdminTables();
            errorMsg.textContent = '';
            document.getElementById('login-form').reset();
        } else {
            errorMsg.textContent = 'Hatalı kullanıcı adı veya şifre!';
        }
    }

    logout() {
        this.isLoggedIn = false;
        sessionStorage.removeItem('admin_logged_in');
        document.getElementById('admin-login-btn').innerHTML = '<i class="ri-user-settings-line"></i>';
        app.closeModal('admin-modal');
    }

    switchTab(tabId) {
        document.querySelectorAll('.admin-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.admin-menu li').forEach(li => li.classList.remove('active'));

        document.getElementById(tabId).classList.add('active');
        event.currentTarget.classList.add('active');
    }

    renderAdminForms() {
        const data = app.getData();
        document.getElementById('about-text-input').value = data.about;
        document.getElementById('contact-address-input').value = data.contact.address;
        document.getElementById('contact-phone-input').value = data.contact.phone;
        document.getElementById('contact-email-input').value = data.contact.email;
        document.getElementById('contact-hours-input').value = data.contact.hours;
    }

    renderAdminTables() {
        const data = app.getData();

        const appList = document.getElementById('admin-applications-list');
        appList.innerHTML = data.applications.map(item => `
            <tr>
                <td><img src="${item.image}" alt=""></td>
                <td>${item.title}</td>
                <td>${item.link}</td>
                <td class="action-btns">
                    <button class="btn btn-secondary icon-btn" style="width:30px;height:30px;font-size:1rem;" onclick="admin.editItem('application', '${item.id}')" title="Düzenle"><i class="ri-edit-line"></i></button>
                    <button class="btn btn-danger icon-btn" style="width:30px;height:30px;font-size:1rem;" onclick="admin.deleteItem('application', '${item.id}')" title="Sil"><i class="ri-delete-bin-line"></i></button>
                </td>
            </tr>
        `).join('');

        const projList = document.getElementById('admin-projects-list');
        projList.innerHTML = data.projects.map(item => `
            <tr>
                <td><img src="${item.image}" alt=""></td>
                <td>${item.title}</td>
                <td>${item.link}</td>
                <td class="action-btns">
                    <button class="btn btn-secondary icon-btn" style="width:30px;height:30px;font-size:1rem;" onclick="admin.editItem('project', '${item.id}')" title="Düzenle"><i class="ri-edit-line"></i></button>
                    <button class="btn btn-danger icon-btn" style="width:30px;height:30px;font-size:1rem;" onclick="admin.deleteItem('project', '${item.id}')" title="Sil"><i class="ri-delete-bin-line"></i></button>
                </td>
            </tr>
        `).join('');

        const taskList = document.getElementById('admin-tasks-list');
        taskList.innerHTML = (data.tasks || []).map(item => `
            <tr>
                <td>${item.title}</td>
                <td>${item.link}</td>
                <td class="action-btns">
                    <button class="btn btn-secondary icon-btn" style="width:30px;height:30px;font-size:1rem;" onclick="admin.editItem('task', '${item.id}')" title="Düzenle"><i class="ri-edit-line"></i></button>
                    <button class="btn btn-danger icon-btn" style="width:30px;height:30px;font-size:1rem;" onclick="admin.deleteItem('task', '${item.id}')" title="Sil"><i class="ri-delete-bin-line"></i></button>
                </td>
            </tr>
        `).join('');
    }

    openItemForm(type, item = null) {
        const form = document.getElementById('item-form');
        form.reset();
        document.getElementById('item-type').value = type;

        const titleEl = document.getElementById('item-modal-title');
        const linkLabel = document.getElementById('item-link-label');
        const linkHint = document.getElementById('item-link-hint');

        if (type === 'application') {
            titleEl.textContent = item ? 'Başvuru Düzenle' : 'Yeni Başvuru Ekle';
            linkLabel.textContent = 'WhatsApp Numarası';
            linkHint.textContent = 'Örn: 905551234567 (Sadece rakam, başında + olmadan)';
        } else if (type === 'task') {
            titleEl.textContent = item ? 'Görev Düzenle' : 'Yeni Görev Ekle';
            linkLabel.textContent = 'Görev Linki / Kaynağı';
            linkHint.textContent = 'Örn: Link yoksa # bırakın';
        } else {
            titleEl.textContent = item ? 'Proje Düzenle' : 'Yeni Proje Ekle';
            linkLabel.textContent = 'Proje Linki';
            linkHint.textContent = 'Örn: https://github.com/... (Link yoksa # bırakın)';
        }

        if (item) {
            document.getElementById('item-id').value = item.id;
            document.getElementById('item-title').value = item.title;
            document.getElementById('item-image').value = item.image;
            document.getElementById('item-desc').value = item.desc;
            document.getElementById('item-link').value = item.link;
        } else {
            document.getElementById('item-id').value = '';
        }

        app.openModal('item-modal');
    }

    editItem(type, id) {
        const data = app.getData();
        let array = data.projects;
        if (type === 'application') array = data.applications;
        if (type === 'task') array = data.tasks;
        const item = array.find(i => i.id === id);
        if (item) {
            this.openItemForm(type, item);
        }
    }

    deleteItem(type, id) {
        if (confirm('Aman dikkat! Bu öğeyi silmek istediğinize emin misiniz?')) {
            const data = app.getData();
            if (type === 'application') {
                data.applications = data.applications.filter(i => i.id !== id);
            } else if (type === 'task') {
                data.tasks = data.tasks.filter(i => i.id !== id);
            } else {
                data.projects = data.projects.filter(i => i.id !== id);
            }
            app.saveData(data);
        }
    }

    saveItem() {
        const type = document.getElementById('item-type').value;
        const id = document.getElementById('item-id').value || 'item_' + Date.now();
        const data = app.getData();

        const newItem = {
            id: id,
            title: document.getElementById('item-title').value,
            image: document.getElementById('item-image').value,
            desc: document.getElementById('item-desc').value,
            link: document.getElementById('item-link').value
        };

        if (!data.tasks) data.tasks = [];
        let array = data.projects;
        if (type === 'application') array = data.applications;
        if (type === 'task') array = data.tasks;

        const index = array.findIndex(i => i.id === id);

        if (index !== -1) {
            array[index] = newItem;
        } else {
            array.push(newItem);
        }

        app.saveData(data);
        app.closeModal('item-modal');
    }
}

// --- Uygulamayı Başlat ---
const app = new App();
const admin = new Admin();
window.app = app;
window.admin = admin;
