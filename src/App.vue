<template>
  <div class="container">
    <div class="logo-wrapper">
      <img class="logo-img" src="../src/assets/images/logo.png" alt="">
    </div>
    <div class="links-wrapper">
      <router-link class="link-to-mainpage link-btn" to="/">Головна</router-link>
      <router-link class="link=to=favorites link-btn" to="/favorites-page">Обране</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {}
}
</script>

<style>
.container{
  max-width: 1230px;
  margin: 0 auto;
  padding: 0 15px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
p{
  margin: 10px 0;
}
.router-link-active{
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.3);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.logo-wrapper{
  margin-bottom: 15px;
}
.links-wrapper{
  align-items: center;
  display: flex;
  margin: 0 auto;
}
.logo-img{
  width: 200px;
  height: 200px;
}
.link-btn {
  text-decoration: none;
  width: 100px;
  padding: 15px;
}
</style>
