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
          <li><router-link to="/task">Task</router-link></li>  <!-- Task link -->
        </ul>
      </aside>

      <!-- Main Content -->
      <main class="content">
        <h2>Task List</h2>
        <!-- Add Project Button -->
        <button class="btn btn-primary mb-3" @click="showModal">
          <i class="bi bi-plus-circle"></i> Add Task
        </button>

        <!-- Bootstrap Table for Task List -->
        <div class="table-responsive">
          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Task Title</th>
                <th>Description</th>
                <th>Project Name</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task in tasks" :key="task.id" :draggable="true" @dragstart="onDragStart($event, task)" @dragover="onDragOver($event)" @drop="onDrop($event, task)">
                <td>{{ task.title }}</td>
                <td>{{ task.description }}</td>
                <td>{{ task.project }}</td>
                <td>{{ task.priority }}</td>
                <td>{{ task.dueDate }}</td>
                <td>{{ task.status }}</td>
                <td>
                <button
                  class="btn btn-info btn-sm"
                  @click="editProject(project)"
                >
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button
                  class="btn btn-danger btn-sm"
                  @click="deleteProject(project)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  data() {
    return {
      tasks: [
        { id: 1, title: "Task 1", description: "Description for Task 1", project: "Project A", priority: "High", dueDate: "2024-12-25", status: "Pending" },
        { id: 2, title: "Task 2", description: "Description for Task 2", project: "Project B", priority: "Medium", dueDate: "2024-12-26", status: "In Progress" },
        { id: 3, title: "Task 3", description: "Description for Task 3", project: "Project C", priority: "Low", dueDate: "2024-12-27", status: "Completed" },
      ],
      draggedTask: null,
    };
  },
  methods: {
    logout() {
      alert("Logging out...");
      this.$router.push("/");
    },
    onDragStart(event, task) {
      this.draggedTask = task;
      event.dataTransfer.setData("taskId", task.id);
    },
    onDragOver(event) {
      event.preventDefault(); // This is necessary to allow dropping
    },
    onDrop(event, task) {
      event.preventDefault();
      if (this.draggedTask && this.draggedTask.id !== task.id) {
        const draggedIndex = this.tasks.findIndex(t => t.id === this.draggedTask.id);
        const droppedIndex = this.tasks.findIndex(t => t.id === task.id);
        this.tasks.splice(droppedIndex, 0, this.tasks.splice(draggedIndex, 1)[0]);
      }
    }
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

/* Bootstrap Table Styling */
.table-responsive {
  margin-top: 20px;
}

.table th, .table td {
  vertical-align: middle;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}

.table-bordered th, .table-bordered td {
  border: 1px solid #ddd;
}
</style>
