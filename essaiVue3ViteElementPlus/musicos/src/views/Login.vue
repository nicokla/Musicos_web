<template>
  <div class="login">    
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
          <h3 class="title mt-4 mb-5">Musicos</h3>
          <div class="box">
              <form>
                <h3 class="title has-text-black">Login</h3>

                  <div class="field">
                      <div class="control">
                          <input class="input is-large" type="email" placeholder="Your Email" autofocus="">
                      </div>
                  </div>

                  <div class="field">
                      <div class="control">
                          <input class="input is-large" type="password" placeholder="Your Password">
                      </div>
                  </div>
                  <div class="field">
                      <label class="checkbox">
        <input type="checkbox">
        Remember me
      </label>
                  </div>
                  <button class="button is-block is-info is-large is-fullwidth">Login <i class="fa fa-sign-in" aria-hidden="true"></i></button>
              </form>
          </div>
          <p class="has-text-grey">
              <a href="../">Sign Up</a> &nbsp;·&nbsp;
              <a href="../">Forgot Password</a>
          </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "login",
  data() {
    return {
      validCredentials: {
        username: "admin",
        password: "admin"
      },
      model: {
        username: "",
        password: ""
      },
      loading: false,
      rules: {
        username: [
          {
            required: true,
            message: "Username is required",
            trigger: "blur"
          },
          {
            min: 4,
            message: "Username length should be at least 5 characters",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "Password is required", trigger: "blur" },
          {
            min: 5,
            message: "Password length should be at least 5 characters",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    simulateLogin() {
      return new Promise(resolve => {
        setTimeout(resolve, 800);
      });
    },
    async login() {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      this.loading = true;
      await this.simulateLogin();
      this.loading = false;
      if (
        this.model.username === this.validCredentials.username &&
        this.model.password === this.validCredentials.password
      ) {
        this.$message.success("Login successfull");
        this.$router.push('Dashboard')
      } else {
        this.$message.error("Username or password is invalid");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.avatar img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);
    box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);
}

input {
    font-weight: 300;
}

p {
    font-weight: 700;
}

p.subtitle {
    padding-top: 1rem;
}

.login-hr {
    border-bottom: 1px solid black;
}

.has-text-black {
    color: black;
}

.field {
    padding-bottom: 10px;
}

.fa {
    margin-left: 5px;
}
</style>
