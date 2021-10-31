<template>
  <div class="track">
    <!--    <Preloader></Preloader>-->
    <img :src="previewPicture" class="track-cover" alt="preview picture" />
    <div class="track-content container">
      <router-link :to="{ name: 'Tracks' }" class="link-back">
        <i class="fas fa-arrow-left"></i>
        В каталог
      </router-link>
      <Button v-if="isMaster" :btn-orange="true" class="redact-btn" @click="modalOpen">
        <i class="fas fa-pencil"></i>
        Редактировать
      </Button>
      <TrackInfoMain :name="track.data.name" :description="track.data.previewText" />
      <TrackInfoSub
        :date-start-prop="track.data.dateTimeStart"
        :date-finish-prop="track.data.dateTimeFinish"
      />
      <EditTrackModal class="an-appear" v-show="isModalOpen" @modalClose="modalClose"
                      :track="track" ></EditTrackModal>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { gsap } from 'gsap';
// import Track from '../services/track/track';
// import Preloader from '../components/Preloader';
import Button from '@/components/Button.vue';
import TrackInfoMain from '@/components/trackRelated/TrackInfoMain.vue';
import TrackInfoSub from '@/components/trackRelated/TrackInfoSub.vue';
import placeholderBig from '../../public/placeholderBig.png';

import EditTrackModal from '@/components/modals/EditTrack.modal.vue';

export default {
  name: 'track',
  mounted() {
    gsap.fromTo('.an-appear', { opacity: 0 }, { opacity: 1, duration: 0.4 });
  },
  components: {
    // Track
    // Preloader,
    Button,
    TrackInfoMain,
    TrackInfoSub,
    EditTrackModal,
  },
  computed: {
    ...mapGetters(['getUserRole', 'getTrackByIdStore']),
    ...mapState(['baseUrl']),
    track() {
      return this.getTrackByIdStore(+this.$route.params.id);
    },
    isMaster() {
      return this.getUserRole === 'teacher';
    },
    previewPicture() {
      if (this.track.data.previewPicture) {
        return `${this.baseUrl}${this.track.data.previewPicture}`;
      }
      return this.placeholderBig;
    },
  },
  data() {
    return {
      placeholderBig,
      isModalOpen: false,
    };
  },
  methods: {
    modalClose() {
      this.isModalOpen = false;
    },

    modalOpen() {
      document.body.style.overflow = 'hidden';
      this.isModalOpen = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.track {
  color: #1f2041;
}

.track-cover {
  max-height: 500px;
  width: 100%;
  object-fit: contain;
  filter: brightness(90%);
  background: rgba(0, 0, 0, 0.1);
}

.link-back {
  display: flex;
  gap: 10px;
  align-items: center;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
}

.redact-btn {
  border-radius: 6px;
  border: unset;
  box-shadow: 0px 2px 4px rgba(139, 164, 249, 0.3);
}

.track-content {
  margin-top: 16px;
  padding-bottom: 30px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 60px;
}

@media (min-width: 800px) {
  .track-content {
    grid-template-columns: 1fr 6fr 2fr;
  }
  // ИЗ TRACK-INFO-MAIN COMPONENT
  .track-info-main {
    grid-column-start: 2;
  }
  // ИЗ TRACK-INFO-SUB COMPONENT
  .track-info-sub {
    text-align: left;
  }

  .link-back {
    grid-column: span 2;
  }
}
</style>
