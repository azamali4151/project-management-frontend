<!-- src/components/SideNavbar.vue -->
<template>
  <aside class="sidebar">
    <ul>
      <li><router-link to="/dashboard">{{ $t('dashboard') }}</router-link></li>
      <li><router-link to="/project">{{ $t('project') }}</router-link></li>
      <li><router-link to="/task">{{ $t('task') }}</router-link></li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "SideNavbar",
};
</script>

<style scoped>
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
</style>
