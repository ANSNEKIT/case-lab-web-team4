<template>
  <div class="home container">
    <!--    <Preloader :first-load="!hasPageBeenLoaded" @loaded="loaded"></Preloader>-->
    <div v-if="tracks">
      <div class="page-choice">
        <Button
          @click="showAll = false" :active="!showAll"
          class="myTracks-btn">
          <i class='fas fa-location-arrow'></i> Мои треки
        </Button>
        <Button @click="showAll = true" :active="showAll" class="catalog-btn">
          Каталог
        </Button>
        <Button
          v-if="userRole === 'teacher'"
          :btn-orange="true" class="create-btn">
          <i class="fas fa-plus"></i> Создать трек
        </Button>
      </div>
      <div class="tracks-cnt">
        <TrackCard
          v-for="track in showAll ? tracks : assignedTracks"
          :key="track.id"
          :show-all="showAll"
          :status="track.status"
          :dateFinish="track.data.dateTimeFinish"
          :id="track.id"
          :name="track.data.name"
          :description="track.data.previewText"
          :imgUrl="track.data.previewPicture"
          class="card"
        />
      </div>
    </div>
    <p v-else class="no-tracks">There are no tracks yet</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import gsap from 'gsap';
// import Track from '@/services/track/track';
import TrackCard from '../components/trackRelated/TrackCard';
import Button from '../components/Button';
// import Preloader from '../components/Preloader';
export default {
  name: 'Home',
  components: {
    TrackCard,
    Button,
    // Preloader,
  },

  data() {
    return {
      baseUrl: 'https://tml9.rosatom.ru',
      showAll: true,
    };
  },

  async mounted() {
    if (!this.tracks.length) {
      console.log(this.token);
      await this.getTracks(this.token);
    }
    gsap.fromTo('body', { opacity: 0 }, { opacity: 1, duration: 0.7 });
  },

  computed: {
    ...mapState({
      tracks: 'tracks',
      userRole: 'userRole',
      token: 'token',
    }),

    actualTracks() {
      // ВКЛЮЧИМ,КОГДА ПОЧИНЯТ ДАТЫ
      // return [...this.tracks].filter(i => i.data.dateTimeFinish > Date.now())
      // ПОКА ДАННАЯ ФУНКЦИЯ НИЧЕГО НЕ ДЕЛАЕТ
      return this.tracks;
    },

    assignedTracks() {
      // ПОКА ДАННАЯ ФУНКЦИЯ НИЧЕГО НЕ ДЕЛАЕТ, ТК НЕТ ПОДХОДЯЩИХ ТРЕКОВ
      // return [...this.tracks].filter(i => i.assigned === false)
      return this.tracks;
    },

  },

  methods: {
    ...mapActions(['getTracks']),
    // getTrack() {
    //   Track.getTrackById(34, 'teacher');
    // },
    loaded() {
    },

  },
};
</script>

<style lang="scss" scoped>
.page-choice {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  @media (min-width: 968px) {
    justify-content: start;
    gap: 20px;
  }

  .myTracks-btn {

    i {
      font-size: 16px;
    }
  }

  .create-btn {
    margin-left: auto;

    border: unset;

  }
}

.tracks-cnt {
  margin-top: 60px;

  display: grid;
  grid-template-columns: repeat(auto-fill, 342px);
  gap: 10px;
  row-gap: 50px;
  justify-content: space-around;
  align-items: end;
  justify-items: stretch;

  @media (min-width: 986px) {
    justify-content: space-between;
  }
}
</style>
