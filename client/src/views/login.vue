<style scoped>

.log_screen{
  background: black;
  padding-top: 2%;
  height: 100%;
  background-image: url(../assets/network_logo.svg);
}
.welcome{
  text-align: center;
  color: white;
  font-size: 80px;
  font-weight: bold;
  margin-bottom: 1%;
}
.caption{
  text-align: center;
  color: white;
  font-size: 25px !important;
  font-weight: bold;
  margin-bottom: 3%;
}
.login_box{
  margin: auto;
  padding: 25px;
  width: 600px;
  background: linear-gradient(to bottom right, rgb(255, 121, 0),blue);
  border-radius: 10px;
  border-color: black;
  text-align: center;
  box-shadow: 20px 20px 40px 0px rgba(0,0,0,0.4);
  }
  
  .log_title{
    font-size: 45px;
    font-weight: bold;
    padding-bottom: 10px;
  }
  
  .log_subtitle{
    font-size: 20px;
    padding-bottom: 10px;
  }
  
  .log_placeholder{
    padding-bottom: 15px;
  }
  .input{
    width: 45%;
    background-color: white;
    border-radius: 2px;
    padding: 4px;
  }
  
  .log-btn{
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .log{
    font-size: 20px;
    padding-bottom: 5px;
    padding-top: 5px;
    padding-left: 25px;
    padding-right: 25px;
    border-radius: 20px;
    background: black;
    color: white;
  }
  .log:hover {
    background:  rgb(255, 121, 0) !important;
    box-shadow: 20px 20px 40px 0px rgba(0,0,0,0.4);
  }
</style>
  
<template>
  <div class="log_screen">
    <div class=welcome>Bienvenue sur GraphVision</div>
    <div class=caption>Outil de visualisation de donnés</div>
    <div class="login_box">
      <div class="log_title">Connection</div>
      <div class="log_subtitle">Adresse Email</div>
      <div class="log_placeholder">
        <input class="input" v-model="email" type="text" placeholder="Entrer votre E-mail"/>
      </div>
      <div class="log_subtitle">Mot de passe</div>
      <div class="log_placeholder">
        <input class="input" v-model="password" type="password" placeholder="Entrer votre mot de passe" required/>
      </div>
      <div class="log-btn">
        <v-btn class="log" color="black" @click="getValue()">Se connecter</v-btn>
      </div> 
      <span>Pas encore de compte ? <a href="/signup">S'inscrire</a> </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'login',

  data: () => ({
    password: "",
    email: ""
  }),
  methods : {
    getValue(){
      if(this.password == 'test'){
        this.$router.push('/admin')
      }
    }
  }
};
</script>