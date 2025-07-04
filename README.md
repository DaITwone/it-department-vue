# 🎓 IT Department - Vue 3 Web App

This is a web application for the Information Technology Department, built with Vue 3.  
It helps manage user accounts and display teacher data. All data is stored and managed using **Supabase**.

---

## 🚀 Main Features

- ✅ User registration, login, and password reset
- ✅ Manage teacher list with full CRUD (Create, Read, Update, Delete)
- ✅ Connects to Supabase database
- ✅ Responsive layout for mobile and desktop
- ✅ Built using Vue 3 with the Composition API

---

## 🧰 Technologies Used

- [Vue 3](https://vuejs.org/) – modern JavaScript framework
- [Supabase](https://supabase.io/) – backend and database
- [Vue Router](https://router.vuejs.org/) – for page navigation
- [Vite](https://vitejs.dev/) – development and build tool

---

## ⚙️ Getting Started

### Requirements

- Node.js version 14 or higher
- npm or yarn

### Installation

```bash
git clone https://github.com/DaITwone/it-department-vue.git
cd it-department-vue
npm install
npm run dev
```


## Build for Production

```sh
npm run build
```

### Project Structure
<pre><code> 
it-department-vue/
├─ public/
├─ src/
│  ├─ assets/         # Images, icons, etc.
│  ├─ components/     # Reusable components
│  ├─ views/          # Pages (login, register, dashboard...)
│  ├─ router/         # Routing configuration
│  ├─ stores/         # Pinia (if used)
│  ├─ supabase/       # Supabase client config (supabase.js)
│  ├─ App.vue
│  └─ main.js
├─ .gitignore
├─ package.json
└─ README.md
</code></pre>
