<template>
  <div class="container">
    <h2>Login Form</h2>
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

      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
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
      axios
        .post("http://127.0.0.1:8000/api/login", this.user)
        .then(({ data }) => {
          console.log("Login Response:", data);

          alert("Login successful!");

          // Clear form fields
          this.user.email = "";
          this.user.password = "";

          // Navigate to Dashboard
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          console.error("Login Error:", error.response || error);
          alert("Login failed! Please check your credentials.");
        });
    },
  },
};
</script>

<style>
.container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
