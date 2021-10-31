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
          :track="track"
          class="card"
          @modalOpen="modalOpen(track)"
        />
        <EditTrackModal
          v-if="isModalOpen"
          @modalClose="modalClose"
          :track="trackToShow"></EditTrackModal>
      </div>
    </div>
    <p v-else class="no-tracks">There are no tracks yet</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import gsap from 'gsap';
import EditTrackModal from '@/components/modals/EditTrack.modal.vue';

import TrackCard from '@/components/trackRelated/TrackCard.vue';
import Button from '@/components/Button.vue';
// import Preloader from '../components/Preloader';
export default {
  name: 'Home',
  components: {
    TrackCard,
    Button,
    EditTrackModal,
    // Preloader,
  },

  data() {
    return {
      showAll: true,
      isModalOpen: false,
      trackToShow: '',
    };
  },

  async mounted() {
    if (!this.tracks.length) {
      await this.getTracks(this.token);
    }
    gsap.fromTo('body', { opacity: 0 }, { opacity: 1, duration: 0.7 });
  },

  computed: {
    ...mapState([
      'tracks',
      'userRole',
      'token',
      'baseUrl',
    ]),

    actualTracks() {
      // ВКЛЮЧИМ,КОГДА ПОЧИНЯТ ДАТЫ
      // return [...this.tracks].filter(i => i.data.dateTimeFinish > Date.now())
      // ПОКА ДАННАЯ ФУНКЦИЯ НИЧЕГО НЕ ДЕЛАЕТ
      return this.tracks;
    },

    assignedTracks() {
      // ПОКА ДАННАЯ ФУНКЦИЯ НИЧЕГО НЕ ДЕЛАЕТ, ТК НЕТ ПОДХОДЯЩИХ ТРЕКОВ
      // return [...this.tracks].filter(i => i.assigned === true)
      return this.tracks;
    },

  },

  methods: {
    ...mapActions([
      'getTracks',
    ]),
    // getTrack() {
    //   Track.getTrackById(34, 'teacher');
    // },
    modalOpen(trackToShow) {
      document.body.style.overflow = 'hidden';
      this.trackToShow = trackToShow;
      this.isModalOpen = true;
    },

    modalClose() {
      this.isModalOpen = false;
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
  @media (max-width: 550px) {
    display: grid;
  }
}

.myTracks-btn {
  border: 1px solid ;
  i {
    font-size: 16px;
  }
}

.create-btn {

  border: unset;
  @media (min-width: 550px) {
    margin-left: auto;

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
