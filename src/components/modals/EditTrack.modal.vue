<template>
  <v-modal>
    <template v-slot:header>
      <h2 class="track-name">Настройки трека "{{
          truncate(currentData.name, 38, "...") || "Имя трека"
        }}"</h2>
      <div class="group">
        <input type="text" required v-model="currentData.name"/>
        <span class="highlight"></span>
        <span class="bar"></span>
      </div>
    </template>
    <template v-slot:body>
      <div class="group">
        <textarea type="text" class="description" v-model="currentData.previewText"
                  required> </textarea>
        <span class="highlight"></span>
        <span class="bar"></span>
      </div>
      <div class="dates-cnt">
        <div class="date-block start">
          <p class="">Дата открытия</p>
          <Datepicker inputClassName="input-date"
                      uid="start"
                      :yearRange="yearRange"
                      :maxDate="currentData.dateTimeFinish"
                      v-model="currentData.dateTimeStart">
          </Datepicker>
        </div>
        <div class="date-block finish">
          <p class="">Дата закрытия</p>
          <Datepicker
            uid="finish"
            inputClassName="input-date"
            :yearRange="yearRange"
            :minDate="currentData.dateTimeStart"
            v-model="currentData.dateTimeFinish"
          ></Datepicker>
        </div>
      </div>
      <input
        type="file"
        style="display:none;"
        id="loadFile"
        accept=".jpg, .jpeg, .png"
        @change="onFileSelected"
      />
      <label for="loadFile">
        <Button>Загрузить обложку</Button>
      </label>
    </template>
    <template v-slot:footer>
      <div class="modal-footer">
        <Button :btn-orange="true" class="modal-default-button" @click="modalClose">
          Отмена
        </Button>
        <Button @click="editTrack" :btn-blue="true">Подтвердить</Button>
      </div>
    </template>
  </v-modal>
</template>

<script>
import Datepicker from 'vue3-date-time-picker';
import { mapActions, mapState, mapGetters } from 'vuex';
import vModal from './v-modal.vue';
import Button from '../Button.vue';
import track from '@/services/track/track';

export default {
  name: 'EditTrackModal',
  props: {
    track: {
      type: Object,
    },

  },

  components: {
    vModal,
    Datepicker,
    Button,
  },
  computed: {
    ...mapGetters(['getTrackByIdStore']),
    ...mapState(['baseUrl', 'userRole']),

    yearRange() {
      const currentYear = new Date().getFullYear();
      return [currentYear - 5, currentYear + 5];
    },

    // previewPictureComputed() {
    //   return this.baseUrl + this.currentData.previewPicture;
    // },

    pictureToUploadComputed() {
      const fd = new FormData();
      fd.append('image', this.pictureToUpload);
      return 'https://www.pexels.com/photo/woman-in-white-tank-top-9441882/';
    },

    totalDataToUpload() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      const data = this.currentData;
      data.previewPicture = this.pictureToUploadComputed;
      return data;
    },
  },
  data() {
    return {
      currentData: {
        id: this.track.id,
        name: this.track.data.name || '',
        previewText: this.track.data.previewText || '',
        dateTimeStart: new Date(this.track.data.dateTimeStart) || '',
        dateTimeFinish: new Date(this.track.data.dateTimeFinish) || '',

      },
      previewPicture: this.track.data.previewPicture || '',

      pictureToUpload: '',

    };
  },
  methods: {
    ...mapActions(['redactTrack']),

    modalClose() {
      document.body.style.overflow = 'auto';
      this.$emit('modalClose');
    },
    truncate(text, length, suffix) {
      if (text.length > length) {
        return text.substring(0, length) + suffix;
      }
      return text;
    },

    onFileSelected(event) {
      // eslint-disable-next-line prefer-destructuring
      this.pictureToUpload = event.target.files[0];
    },
    async editTrack() {
      await track.changeTrack(this.currentData.id, this.totalDataToUpload, this.userRole)
        .then(() => this.redactTrack(this.currentData));
      this.modalClose();
    },
    //
    // async uploadImage() {
    //   await track.uploadImage(this.currentData.id, fd, this.userRole);
    // },

    addTrack() {

    },
  },

};
</script>

<style scoped lang="scss">
.track-name {
  font-weight: 800;
  font-size: 36px;
  color: #1f2041;
  margin-bottom: 16px;
}

.description {
  resize: vertical;
  min-height: 150px;
  margin-bottom: 16px;
}

.dates-cnt {
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;

  .date-block {
    flex-grow: 1;
    min-width: 220px;
  }

  .input-date {
  }
}

.modal-footer {
  display: flex;
  justify-content: space-between;
}

// ===========================================================
.group {
  position: relative;
}

input,
textarea {
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: 1px solid #8ba4f9;
  border-bottom: 1px solid #757575;
}

input:focus,
textarea:focus {
  outline: none;
}

/* LABEL ======================================= */

/* active state */
input:focus ~ label,
input:valid ~ label,
textarea:focus ~ label,
textarea:valid ~ label {
  top: -20px;
  font-size: 14px;
  color: #5264ae;
}

/* BOTTOM BARS ================================= */
.bar {
  position: relative;
  display: block;
}

.bar:before,
.bar:after {
  content: "";
  height: 2px;
  width: 0;
  bottom: 1px;
  position: absolute;
  background: #5264ae;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

.bar:before {
  left: 50%;
}

.bar:after {
  right: 50%;
}

/* active state */
input:focus ~ .bar:before,
input:focus ~ .bar:after,
textarea:focus ~ .bar:before,
textarea:focus ~ .bar:after {
  width: 50%;
}

/* HIGHLIGHTER ================================== */
.highlight {
  position: absolute;
  height: 60%;
  width: 100px;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
}
</style>
