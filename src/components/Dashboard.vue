<template>
  <div class="dashboard">
    <!-- Top Navigation Bar -->
    <nav class="navbar">
      <div class="navbar-content">
        <h1 class="navbar-title">{{ $t('dashboard') }}</h1>
        <div class="language-switcher">
          <label for="language">Language: </label>
          <select id="language" v-model="selectedLanguage" @change="changeLanguage">
            <option value="en">English</option>
            <option value="bn">বাংলা</option>
          </select>
        </div>
        <button class="logout-btn" @click="logout">{{ $t('logout') }}</button>
      </div>
    </nav>

    <div class="main-container">
      <!-- Side Menu Bar -->
      <aside class="sidebar">
        <ul>
          <li><router-link to="/dashboard">{{ $t('dashboard') }}</router-link></li>
          <li><router-link to="/project">{{ $t('project') }}</router-link></li>
          <li><router-link to="/task">{{ $t('task') }}</router-link></li>
        </ul>
      </aside>

      <!-- Main Content -->
      <main class="content">
        <h2>{{ $t('welcome') }}</h2>
        <p>{{ $t('content') }}</p>
        <p>{{ $t('charts') }}</p>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      selectedLanguage: 'en', // Default language initialized
    };
  },
  methods: {
    logout() {
      alert(this.$t('logout'));
      this.$router.push("/");
    },
    changeLanguage() {
      this.$i18n.locale = this.selectedLanguage;
    },
  },
};
</script>

<style scoped>
/* General styling for the dashboard layout */
.dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  color: #333;
}

/* Top Navigation Bar */
.navbar {
  background-color: #007bff;
  color: white;
  padding: 8px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-title {
  margin: 0;
  font-size: 20px;
}

.language-switcher {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
}

.language-switcher select {
  border: none;
  background-color: white;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.logout-btn {
  background-color: white;
  color: #007bff;
  border: none;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #e6e6e6;
}

/* Main container */
.main-container {
  display: flex;
  flex: 1;
}

/* Sidebar */
.sidebar {
  width: 250px;
  background-color: #333;
  color: white;
  padding: 15px;
  height: calc(100vh - 50px);
  overflow-y: auto;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  margin: 15px 0;
}

.sidebar ul li a {
  color: white;
  text-decoration: none;
  font-size: 16px;
}

.sidebar ul li a:hover {
  text-decoration: underline;
}

/* Main Content */
.content {
  flex: 1;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  margin: 10px;
}
</style>
