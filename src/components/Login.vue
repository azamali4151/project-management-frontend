<template>
  <div class="login-container">
    <div class="form-container">
      <h2 class="form-title">Login Form</h2>

      <form @submit.prevent="save">
        <div class="form-group">
          <label>User Name</label>
          <input
            type="text"
            v-model="user.email"
            class="form-control"
            placeholder="User Name"
          />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input
            type="password"
            v-model="user.password"
            class="form-control"
            placeholder="Password"
          />
        </div>

        <!-- Button with Loader -->
        <button type="submit" class="btn btn-primary" :disabled="isLoading">
          Login
          <div v-if="isLoading" class="loader-small"></div>
        </button>
      </form>
    </div>

    <div class="gradient-background"></div>
  </div>
</template>

<script>
import axiosInstance from '../axiosInstance';

export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      isLoading: false, // to track the loading state
    };
  },
  methods: {
    save() {
      if (this.user.email && this.user.password) {
        this.saveData();
      } else {
        alert("Please fill in all fields!");
      }
    },
    saveData() {
      this.isLoading = true; // Show loader when the login process starts

      axiosInstance
        .post("/login", this.user)
        .then(({ data }) => {
          console.log("Login Response:", data);

          // Save token and user info
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          // Update axios instance with the token
          axiosInstance.defaults.headers.Authorization = `Bearer ${data.token}`;

          //alert("Login successful!");

          // Clear form fields
          this.user.email = "";
          this.user.password = "";

          // Navigate to Dashboard
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          console.error("Login Error:", error.response || error);
          alert("Login failed! Please check your credentials.");
        })
        .finally(() => {
          this.isLoading = false; // Hide loader after the request is complete
        });
    },
  },
};
</script>

<style scoped>
/* Container for the entire login page */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
}

/* Gradient background under the form */
.gradient-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #ff7e5f, #feb47b); /* Gradient colors */
  z-index: -1;
  opacity: 0.6;
}

/* Styling for the form container */
.form-container {
  max-width: 400px;
  width: 100%;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.form-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* Styling for input fields */
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  text-align: left;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
}

/* Button Styling */
.btn {
  width: 100%;
  padding: 12px;
  font-size: 18px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: relative; /* To position the loader inside the button */
}

.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Loader Styling (small loader next to button) */
.loader-small {
  position: absolute;
  right: 15px; /* Position the loader at the right side of the button */
  top: 30%;
  transform: translateY(-50%);
  border: 3px solid #f3f3f3;
  border-top: 3px solid #007bff;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  animation: spin 1s linear infinite;
}

/* Animation for spinning loader */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
