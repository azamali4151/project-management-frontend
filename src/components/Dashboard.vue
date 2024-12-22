<!-- src/views/Dashboard.vue -->
<template>
  <div class="dashboard">
    <!-- Use the TopNavbar component -->
    <TopNavbar />

    <div class="main-container">
      <!-- Use the SideNavbar component -->
      <SideNavbar />

      <!-- Main Content -->
      <main class="content">
        <h2>{{ $t('welcome') }}</h2>
        <p>{{ $t('content') }}</p>
      </main>
    </div>
  </div>
</template>

<script>
import TopNavbar from './TopNavbar.vue'; 
import SideNavbar from './SideNavbar.vue';

export default {
  name: "Dashboard",
  components: {
    TopNavbar,
    SideNavbar,
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

.main-container {
  display: flex;
  flex: 1;
}

.content {
  flex: 1;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  margin: 10px;
}
</style>
