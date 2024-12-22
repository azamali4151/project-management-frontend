<template>
  <div class="dashboard">
    <!-- Top Navigation Bar -->
    <nav class="navbar">
      <div class="navbar-content">
        <h1 class="navbar-title">Dashboard</h1>
        <button class="logout-btn" @click="logout">Logout</button>
      </div>
    </nav>

    <div class="main-container">
      <!-- Side Menu Bar -->
      <aside class="sidebar">
         <ul>
          <li><router-link to="/dashboard">Dashboard</router-link></li>  <!-- Dashboard link -->
          <li><router-link to="/project">Project</router-link></li>  <!-- Project link -->
          <li><router-link to="/task">Task</router-link></li>  <!-- Project link -->
        </ul>
      </aside>

      <!-- Main Content -->
      <main class="content">
        <h2>Welcome to the Dashboard</h2>
        <p>This is the main content area where you can display additional components or information.</p>
        <p>You can add charts, tables, or any relevant data here.</p>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  methods: {
    logout() {
      alert("Logging out...");
      this.$router.push("/");
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
  padding: 8px 15px; /* Reduced padding for a smaller top bar */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-title {
  margin: 0;
  font-size: 20px; /* Smaller font size */
}

.navbar-content {
  display: flex;          /* Enable flexbox layout */
  justify-content: space-between; /* Push the title to the left and the button to the right */
  width: 100%;            /* Ensure the content stretches across the navbar */
}

.logout-btn {
  background-color: white;
  color: #007bff;
  border: none;
  padding: 6px 10px;      /* Reduced padding for smaller button */
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  /* No need for additional positioning styles here, since Flexbox will handle alignment */
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
  height: calc(100vh - 50px); /* Subtract the navbar height */
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
