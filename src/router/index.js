import { createRouter, createWebHistory } from "vue-router";
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import Project from '../components/Project.vue'
import Task from '../components/Task.vue'

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/project",
    name: "Project",
    component: Project,  // Project component route
  },
  {
    path: "/task",
    name: "Task",
    component: Task,  // Project component route
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
