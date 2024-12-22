<!-- src/components/TopNavbar.vue -->
<template>
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
</template>

<script>
export default {
  name: "TopNavbar",
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
</style>
