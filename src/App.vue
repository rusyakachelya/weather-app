<template>
  <div class="container">
    <div class="switch-lang-wrapper">
      <div
          v-for="lang in languages"
          :key="lang.code"
          @click="switchLang(lang.code)"
          :class="{ 'active-lang': isActiveLang(lang.code) }"
          style="cursor: pointer;"
      >
        {{ lang.label }}
      </div>
    </div>

    <div class="logo-wrapper">
      <img class="logo-img" src="../src/assets/images/logo.png" alt="">
    </div>
    <div class="links-wrapper">
      <router-link class="link-to-mainpage link-btn" to="/">{{ $t('routes.main') }}</router-link>
      <router-link class="link=to=favorites link-btn" to="/favorites-page">{{ $t('routes.favorites') }}</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue';
import {useI18n} from 'vue-i18n';

export default {
  name: "App",
  setup() {
    const {locale} = useI18n({useScope: 'global'});

    const languages = [
      {code: 'uk', label: 'UA'},
      {code: 'en', label: 'EN'},
    ];

    const currentLang = ref(localStorage.getItem('lang'));

    const switchLang = (lang) => {
      locale.value = lang;
      currentLang.value = lang;
      localStorage.setItem('lang', lang);
    };

    const isActiveLang = (langCode) => {
      return currentLang.value === langCode;
    };

    onMounted(() => {

      const activeElement = document.querySelector(`.${currentLang.value}`);
      if (activeElement) {
        activeElement.classList.remove('active-lang');
        const currentElement = document.querySelector(`.${currentLang.value}`);
        if (currentElement) {
          currentElement.classList.add('active-lang');
        }
      }
    });

    return {
      switchLang,
      languages,
      isActiveLang,
    };
  },
};
</script>


<style>
.active-lang {
  font-weight: bold;

}

.container {
  max-width: 1230px;
  margin: 0 auto;
  padding: 0 15px;
}

.switch-lang-wrapper {
  display: flex;
  justify-content: right;
}

.switch-lang-wrapper div {
  padding: 0px 10px 10px 10px;
}

.switch-lang-wrapper div:first-child {
  margin-right: 10px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

p {
  margin: 10px 0;
}

.router-link-active {
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.3);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.logo-wrapper {
  margin-bottom: 10px;
}

.links-wrapper {
  align-items: center;
  display: flex;
  margin: 0 auto;
}

.logo-img {
  width: 200px;
  height: 200px;
}

.link-btn {
  text-decoration: none;
  width: 100px;
  padding: 15px;
}
</style>
