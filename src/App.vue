<template>
  <div>
    <!--    <div id="nav">-->
    <!--      <router-link to="/">Главная</router-link>
     | <router-link to="/catalog">Каталог</router-link> |-->
    <!--      <router-link to="/tracks">Треки</router-link>-->
    <!--    </div>-->
    <router-link to='/login'> Сменить роль </router-link>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "assets/zero.css";
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;0,700;0,800;1,400&family=Roboto:wght@300;400;700;900&display=swap");
#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 10px 12px;
}
</style>
