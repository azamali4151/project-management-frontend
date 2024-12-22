<template>
    <div class ="container">
      <h2>Login Form</h2>
                    <form @submit.prevent="save">
                    
                    <div class="form-group">
                        <label>User Name </label>
                        <input type="text" v-model="user.name" class="form-control"  placeholder="User Name">
                    
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input type="text" v-model="user.password" class="form-control"  placeholder="Password">
                    
                    </div>
                   
                    
                    <button type="submit" class="btn btn-primary">Login</button>
                    </form>
     
    </div>

  </template>

  <script>
    
   import axios from 'axios';

 
  export default {
    name: 'Student',
    data () {
      return {
        result: {},
        user:{
                   name: '',
                   password: ''
        }
      }
    },
    mounted() {
          console.log("mounted() called.......");
         
      },
 
    methods: {
          
           save()
           {
            if(this.user.name )
              {
                this.saveData();
              }
           },
           saveData()
           {
            axios.post("http://127.0.0.1:8000/api/check", this.user)
            .then(
              ({data})=>{
                alert("saveddddd");
                 this.user.name = '';
                  this.user.password = ''
              }
            )
           },
      }
  }
  </script>