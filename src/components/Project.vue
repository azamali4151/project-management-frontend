<template>
  <div class="dashboard">
      <!-- Use the TopNavbar component -->
    <TopNavbar />

    <div class="main-container">
      <!-- Use the SideNavbar component -->
      <SideNavbar />

      <!-- Main Content -->
      <main class="content">
        <h2>Project List</h2>
        <!-- Add Project Button -->
        <button class="btn btn-primary mb-3" @click="showModal">
          <i class="bi bi-plus-circle"></i> Add Project
        </button>

        <!-- Project Table -->
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(project, index) in projects" :key="index">
              <td>{{ project.title }}</td>
              <td>{{ project.description }}</td>
              <td>{{ project.start_date }}</td>
              <td>{{ project.end_date }}</td>
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

        <!-- Add Project Modal -->
        <div class="modal" tabindex="-1" :class="{'d-block': isModalOpen}" @click="closeModal">
          <div class="modal-dialog" @click.stop>
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Add Project</h5>
                <button type="button" class="btn-close" @click="closeModal"><span class="close-icon">&#10006;</span></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="addProject">
                  <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      v-model="newProject.title"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea
                      class="form-control"
                      id="description"
                      rows="3"
                      v-model="newProject.description"
                      required
                    ></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="startDate" class="form-label">Start Date</label>
                    <input
                      type="date"
                      class="form-control"
                      id="startDate"
                      v-model="newProject.startDate"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="endDate" class="form-label">End Date</label>
                    <input
                      type="date"
                      class="form-control"
                      id="endDate"
                      v-model="newProject.endDate"
                      required
                    />
                  </div>
                  <button type="submit" class="btn btn-primary">Add Project</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  <div>
    <!-- Edit Project Modal -->
    <div class="modal" tabindex="-1" :class="{'d-block': isEditModalOpen}" @click="closeEditModal">
          <div class="modal-dialog" @click.stop>
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Add Project</h5>
                <button type="button" class="btn-close" @click="closeEditModal"><span class="close-icon">&#10006;</span></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="updateProject">
                  <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      v-model="newProject.title"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea
                      class="form-control"
                      id="description"
                      rows="3"
                      v-model="newProject.description"
                      required
                    ></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="startDate" class="form-label">Start Date</label>
                    <input
                      type="date"
                      class="form-control"
                      id="startDate"
                      v-model="newProject.start_date"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="endDate" class="form-label">End Date</label>
                    <input
                      type="date"
                      class="form-control"
                      id="endDate"
                      v-model="newProject.start_date"
                      required
                    />
                  </div>
                  <button type="submit" class="btn btn-primary">Update Project</button>
                </form>
              </div>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
import axiosInstance from '../axiosInstance';
import TopNavbar from './TopNavbar.vue'; 
import SideNavbar from './SideNavbar.vue';

export default {
  name: "Project",
   components: {
    TopNavbar,
    SideNavbar,
  },
  data() {
    return {
      isModalOpen: false,
      isEditModalOpen:false,
      newProject: {
        title: "",
        description: "",
        start_date: "",
        end_date: "",
      },
      projects: [],
    };
  },
  methods: {
    async fetchProjects() {
      try {
        const response = await axiosInstance.get('/projects');
        this.projects = response.data;
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Handle error appropriately, e.g., show a notification to the user
      }
    },
    async addProject() {
      if (this.newProject.title && this.newProject.description) {
        try {
          const response = await axiosInstance.post('/projects', this.newProject);
          this.projects.push(response.data);
          this.newProject.title = '';
          this.newProject.description = '';
          this.newProject.startDate = '';
          this.newProject.endDate = '';
          this.newProject.status = 'Not Started';
          this.closeModal();
        } catch (error) {
          console.error('Error adding project:', error);
          // Handle error appropriately, e.g., show a notification to the user
        }
      }
    },
    logout() {
      alert("Logging out...");
      this.$router.push("/");
    },
   editProject(project) {
      this.newProject = { ...project }; // Create a copy to avoid direct mutation
      this.isEditModalOpen = true;
    },
    // Close the modal
    closeEditModal() {
      this.isEditModalOpen = false;
      this.resetForm();
    },
    // Reset the form data
    resetForm() {
      this.newProject = {
        id: null,
        title: '',
        description: '',
        startDate: '',
        endDate: '',
      };
    },
    // Update the project
    async updateProject() {
      try {
        const response = await axiosInstance.put(`/projects/${this.newProject.id}`, this.newProject);
        // Update the project in the local array
        const index = this.projects.findIndex(project => project.id === this.newProject.id);
        if (index !== -1) {
          this.projects.splice(index, 1, response.data);
        }
        this.closeEditModal();
        alert('Project updated successfully.');
      } catch (error) {
        console.error('Error updating project:', error);
        alert('An error occurred while updating the project.');
      }
    },
   async deleteProject(project) {
      try {
      const response = await axiosInstance.delete(`/projects/${project.id}`);
      if (response.status === 200) {
        // Display success alert
        alert('Project deleted successfully.');
        // Refresh the project list
        await this.fetchProjects();
      } else {
        // Handle unexpected response status
        console.error('Unexpected response status:', response.status);
        alert('Failed to delete the project. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('An error occurred while deleting the project. Please try again.');
    }
    },
    showModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
  mounted() {
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
  padding: 8px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-title {
  margin: 0;
  font-size: 20px;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.logout-btn {
  background-color: white;
  color: #007bff;
  border: none;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
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

/* Table Styling */
table {
  width: 100%;
  margin-top: 20px;
}

th, td {
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

.btn {
  margin-right: 5px;
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

.modal .modal-body {
  margin-top: 10px;
}
</style>
