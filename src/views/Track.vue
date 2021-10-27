<template>
  <div class="track">
    <!--    <Preloader></Preloader>-->
    <img :src="track.data.previewPicture ? baseUrl + track.data.previewPicture : placeholderBig"
         class="track-cover" alt="preview picture"/>
    <div class="track-content container">
        <router-link :to="{ name: 'Tracks' }" class="link-back"
        ><i class="fas fa-arrow-left"></i>В каталог
        </router-link>
        <Button
          :btn-orange="true"
          class="redact-btn">
          <i class="fas fa-pencil"></i> Редактировать
        </Button>
      <TrackInfoMain :name="track.data.name" :description="track.data.previewText"/>
      <TrackInfoSub
        :date-start-prop="track.data.dateTimeStart"
        :date-finish-prop="track.data.dateTimeFinish"
      />
    </div>
  </div>
</template>

<script>
// import Track from '../services/track/track';
// import Preloader from '../components/Preloader';
import Button from '../components/Button';
import placeholderBig from '../../public/placeholderBig.png';
import TrackInfoMain from '../components/trackRelated/TrackInfoMain';
import TrackInfoSub from '../components/trackRelated/TrackInfoSub';

export default {
  name: 'track',
  components: {
    // Track
    // Preloader,
    Button,
    TrackInfoMain,
    TrackInfoSub,
  },
  computed: {
    track() {
      return this.$store.getters.getTrackByIdStore(+this.$route.params.id);
    },
  },
  data() {
    return {
      baseUrl: 'https://tml9.rosatom.ru',
      placeholderBig,
    };
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

  .redact-btn{
    border-radius: 6px;
    border: unset;
    box-shadow: 0px 2px 7px rgba(139, 164, 249, .6);
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
