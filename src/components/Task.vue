<template>
  <div class="dashboard">
    <!-- Use the TopNavbar component -->
    <TopNavbar />

    <div class="main-container">
      <!-- Use the SideNavbar component -->
      <SideNavbar />

      <!-- Main Content -->
      <main class="content">
        <h2>Task List</h2>
        <!-- Add Task Button -->
        <button class="btn btn-primary mb-3" @click="showModal">
          <i class="bi bi-plus-circle"></i> Add Task
        </button>

        <!-- Task List Table -->
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
                  <button class="btn btn-info btn-sm" @click="editTask(task)">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button class="btn btn-danger btn-sm" @click="deleteTask(task)">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Add/Edit Task Modal -->
        <div class="modal" tabindex="-1" :class="{ 'd-block': isModalOpen }" @click="closeModal">
          <div class="modal-dialog" @click.stop>
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Add Task</h5>
                <button type="button" class="btn-close" @click="closeModal">
                  <span class="close-icon">&#10006;</span>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="addTask()">
                  <!-- Task Title -->
                  <div class="mb-3">
                    <label for="title" class="form-label">Task Title</label>
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      v-model="taskForm.title"
                      required
                    />
                  </div>
                  <!-- Task Description -->
                  <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea
                      class="form-control"
                      id="description"
                      rows="3"
                      v-model="taskForm.description"
                      required
                    ></textarea>
                  </div>
                  <!-- Project Select Box -->
                  <div class="mb-3">
                    <label for="project" class="form-label">Project</label>
                    <select
                      class="form-select"
                      id="project"
                      v-model="taskForm.project"
                      required
                    >
                      <option v-for="project in projects" :key="project.id" :value="project.id">
                        {{ project.title }}
                      </option>
                    </select>
                  </div>
                  <!-- Priority -->
                  <div class="mb-3">
                    <label for="priority" class="form-label">Priority</label>
                    <select
                      class="form-select"
                      id="priority"
                      v-model="taskForm.priority"
                      required
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <!-- Due Date -->
                  <div class="mb-3">
                    <label for="dueDate" class="form-label">Due Date</label>
                    <input
                      type="date"
                      class="form-control"
                      id="dueDate"
                      v-model="taskForm.dueDate"
                      required
                    />
                  </div>
                  <!-- Status -->
                  <div class="mb-3">
                    <label for="status" class="form-label">Status</label>
                    <select
                      class="form-select"
                      id="status"
                      v-model="taskForm.status"
                      required
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                   <button type="submit" class="btn btn-primary">
                   Add Task
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axiosInstance from '../axiosInstance';
import TopNavbar from './TopNavbar.vue'; 
import SideNavbar from './SideNavbar.vue';

export default {
  name: "Task",
   components: {
    TopNavbar,
    SideNavbar,
  },
  data() {
    return {
      isModalOpen: false,
      isEditing: false,
      projects: [],
      tasks: [],
      taskForm: {
        id: null,
        title: "",
        description: "",
        project: "",
        priority: "",
        dueDate: "",
        status: "",
      },
       tasks: [
        { id: 1, title: "Task 1", description: "Description for Task 1", project: "Project A", priority: "High", dueDate: "2024-12-25", status: "Pending" },
        { id: 2, title: "Task 2", description: "Description for Task 2", project: "Project B", priority: "Medium", dueDate: "2024-12-26", status: "In Progress" },
        { id: 3, title: "Task 3", description: "Description for Task 3", project: "Project C", priority: "Low", dueDate: "2024-12-27", status: "Completed" },
      ],
      draggedTask: null,
    };
  },
  methods: {
    async fetchProjects() {
      try {
        const response = await axiosInstance.get('/projects');
        this.projects = response.data;
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    },
    showModal(task = null) {
      this.isModalOpen = true;
      if (task) {
        this.isEditing = true;
        this.taskForm = { ...task };
      } else {
        this.isEditing = false;
        this.resetTaskForm();
      }
    },
    closeModal() {
      this.isModalOpen = false;
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
    },
    addTask() {
      const newTask = { ...this.taskForm, id: Date.now() };
      this.tasks.push(newTask);
      this.closeModal();
    },
    updateTask() {
      const index = this.tasks.findIndex((task) => task.id === this.taskForm.id);
      if (index !== -1) {
        this.tasks.splice(index, 1, this.taskForm);
      }
      this.closeModal();
    },
    resetTaskForm() {
      this.taskForm = {
        id: null,
        title: "",
        description: "",
        project: "",
        priority: "",
        dueDate: "",
        status: "",
      };
    },
  },
  created() {
    this.fetchProjects();
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
/* Modal Styling */
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal .modal-dialog {
  position: relative;
  margin: auto;
  top: 10%;
  width: 80%;
}

.modal .modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}

.modal .modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal .modal-header .btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
.close-icon{
    color:black;
}
</style>
