<template>
  <div class="weather-wrapper">
    <div class="weather-container" :class="{ 'favorite': this.weather.favorite }">
      <div class="buttons-container">
        <div class="to-favorites-btn" v-show="isMainPage">
          <CustomButton
              :button-class="'to-favorites buttons-container__btn'"
              :button-text="buttonText"
              @click="this.addToFavorites(weather.id, 'favorites')"
              :is-disabled="false"
          />
        </div>
        <CustomButton
            :button-class="'remove-btn buttons-container__btn'"
            :button-text="$t('buttons.remove')"
            @click="openModal()"
        />
      </div>
      <h3 class="weather-card-city">{{ weather.code }}</h3>

      <div class="change-tabs">
        <CustomButton
            @click="changeTab('1-day')"
            :button-text="$t('buttons.todaysForecast')"
            :button-class="this.selectedTab === '1-day' ? 'button-days active' : 'button-days'"
        />
        <span>/</span>
        <CustomButton
            @click="changeTab('5-day')"
            :button-text="$t('buttons.fiveDayForecast')"
            :button-class="this.selectedTab === '5-day' ? 'button-days active' : 'button-days'"
        />
      </div>
      <ConfirmModal
          :is-open="isModalOpen"
          :message="$t('modals.confirmModal.message')"
          @deleteConfirmed="deleteConfirmed"
          :on-cancel="closeModal"
      />
      <WarningModal
          :show-modal="isWarningModal"
          :warning-message="$t('modals.warningModal')"
          @click="closeWarningModal"
      />


      <div v-show="selectedTab === '1-day'">
        <WeatherCardListOneDay
            :list="sortForSpecificDays"
        />
        <LineChartComponent
            :chart-id="generateChartId('1-day')"
            :labels="labels"
            :data="dataTemperatures"
        />
      </div>
      <div v-show="selectedTab === '5-day'">
        <WeatherCardListFiveDays
            :list="sortForSpecificDays"
        />
        <LineChartComponent
            :chart-id="generateChartId('5-day')"
            :labels="daysOfWeekKeys"
            :data="averageTempByDay"
        />
      </div>
    </div>
  </div>
</template>

<script>
import WeatherCardListOneDay from "@/components/WeatherWrapper/WeatherCardList/WeatherCardListOneDay .vue";
import WeatherCardListFiveDays from "@/components/WeatherWrapper/WeatherCardListFiveDays/WeatherCardListFiveDays.vue";
import ConfirmModal from "@/components/modals/ConfirmModal/ConfirmModal.vue";
import CustomButton from "@/components/UI/CustomButton.vue";
import WarningModal from "@/components/modals/WarningModal/WarningModal.vue";
import LineChartComponent from "@/components/LineChartComponent/LineChartComponent .vue";

import {
  addToLocalStorage,
  getItemsFromLocalStorage,
  updateLocalStorage
} from "@/services/localStorageService";
import {preventBodyScroll} from "@/helpers/scrollControl";
import {getDayOfMonth, getDayOfWeek, getMonthInfo} from "@/helpers/formatDateWithLocale";
import {localeForFormatting} from "@/helpers/i18nHelpers";

export default {
  name: "WeatherWrapper",
  props: ['weather'],
  components: {
    WeatherCardListOneDay,
    WeatherCardListFiveDays,
    ConfirmModal,
    CustomButton,
    WarningModal,
    LineChartComponent,
  },
  data() {
    return {
      selectedTab: '1-day',
      isModalOpen: false,
      isWarningModal: false,
      selectedData: {},
    }
  },
  methods: {

    changeTab(tab) {
      this.selectedTab = tab
    },
    shiftDays(object) {
      const daysOfWeek = Object.keys(object);
      const shiftedObject = {};

      daysOfWeek.forEach(day => {
        shiftedObject[day] = object[day];
      });

      const transformData = Object.entries(shiftedObject).map(([day, weatherData]) => {
        return {
          day,
          weatherData,
          dayOfMonth: getDayOfMonth(weatherData[0].dt_txt,),
          week: getDayOfWeek(weatherData[0].dt_txt,  localeForFormatting(this.locale)),
          month: getMonthInfo(weatherData[0].dt_txt, localeForFormatting(this.locale))
        };
      });

      return transformData;
    },

    openModal() {
      this.isModalOpen = true;
      preventBodyScroll(true)
    },
    closeModal() {
      this.isModalOpen = false;
      preventBodyScroll(false)
    },
    closeWarningModal() {
      this.isWarningModal = false
      preventBodyScroll(false)
    },

    deleteConfirmed() {
      this.removeCity(this.weather.id)
      this.closeModal()
    },

    numberOfFavorites() {
      const maxFavorites = 5;
      const favorites = getItemsFromLocalStorage('favorites');
      return favorites.length >= maxFavorites
    },

    async addToFavorites(cityId, key) {
      console.log(cityId)
      const weatherItem = this.weather
      const cities = await getItemsFromLocalStorage(key)

      if (await cities.includes(cityId)) {
        updateLocalStorage(key, cities, cityId)
        weatherItem.favorite = false
      } else {
        if (this.numberOfFavorites()) {
          preventBodyScroll(true)
          this.isWarningModal = true
          return false
        } else {
          weatherItem.favorite = true
          await addToLocalStorage(cityId, key);
        }

      }
    },

    removeCity(cityName) {

      this.$emit('removeCityById', cityName);
    },


    arrayToObject(currentDayName, array) {
      const resultObject = {
        [currentDayName]: array,
      };

      return Object.entries(resultObject).map(([day, weatherData]) => ({
        day,
        weatherData,
      }));
    },

    generateChartId(tabName) {
      return `chart-${this.weather.code}-${tabName}`;
    },

  },

  computed: {

    sortForSpecificDays() {
      const isOneDayTab = this.selectedTab === '1-day';
      const localSelectedData = isOneDayTab ? this.weather.list[this.getCurrentDayName] : this.weather.list;

      if (localSelectedData && Object.keys(localSelectedData).length > 0) {
        return isOneDayTab ? this.arrayToObject(this.getCurrentDayName, localSelectedData) : this.shiftDays(localSelectedData);
      } else {
        return [];
      }
    },


    buttonText() {
      const translationKey = this.weather.favorite ? 'buttons.favorited.removeFromFavorite' : 'buttons.favorited.addToFavorite';
      return this.$t(translationKey);
    },

    isMainPage() {
      return this.$route.path === '/';
    },

    labels() {
      return (this.sortForSpecificDays[0].weatherData ?? []).map((item) => {
        const time = new Date(item.dt_txt).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        return time;
      });
    },
    dataTemperatures() {
      return this.sortForSpecificDays[0]?.weatherData?.map((item) => {
        const temperature = item.main.temp;
        return temperature % 1 < 0.5 ? Math.floor(temperature) : Math.ceil(temperature);
      }) ?? [];
    },
    daysOfWeekKeys() {
      const listObject = this.weather.list;

      if (listObject && Object.keys(listObject).length > 0) {
        return Object.keys(listObject);
      } else {
        return [];
      }
    },
    averageTempByDay() {
      const listObject = this.weather.list;

      if (listObject && Object.keys(listObject).length > 0) {
        const result = [];

        for (const dayOfWeek in listObject) {
          if (Object.prototype.hasOwnProperty.call(listObject, dayOfWeek)) {
            const dayData = listObject[dayOfWeek];

            const averageTemp =
                Math.round(
                    dayData.reduce((sum, entry) => sum + entry.main.temp, 0) / dayData.length
                );
            result.push(averageTemp);
          }
        }
        return result;
      } else {
        return [];
      }
    },
    getCurrentDayName() {
      const dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      return dayName.charAt(0).toUpperCase() + dayName.slice(1);
    }

  },

}
</script>


<style scoped>
.button-days.active {
  color: #177de5;
}

.button-days {
  background-color: transparent;
  padding: 5px;
}

.buttons-container {
  display: flex;
  justify-content: end;
}

.favorite {
  border: 2px solid gold !important;
}

.buttons-container__btn {
  background: transparent;
}

.to-favorites:active:hover {
  color: #177de5;
}

.weather-container {
  border: 2px solid transparent;
  padding: 10px;
  border-bottom: 1px solid #9d9d9d;
}

.remove-btn:hover {
  color: #ce1f1f;
}

.change-tabs {
  display: flex;
  color: black;
  align-items: center;
}

.weather-wrapper {
  padding: 10px 15px 15px 15px;
  color: black;
}


@media (max-width: 500px) {
  .weather-card-city {
    font-size: 17px;
    margin: 10px 0;
  }

  .change-tabs {
    margin-bottom: 10px;
  }

  .buttons-container__btn {
    font-size: 13px;
  }

  .change-tabs button {
    font-size: 13px;
  }

  .weather-container {
    padding: 5px;
  }

  .weather-wrapper {
    padding: 5px;

  }

}
</style>