<template>
  <div class="card">
    <p class="completed-sticker sticker" v-if="!showAll && status === ''">
      <!-- // ИЛИ dateFinish < new Date() */ -->
      Завершен <i class="far fa-check-circle"></i>
    </p>
    <div class="track-core">
      <div class="track-img-wrap">
        <img class="track-img"
          :src="imgUrl ? baseUrl + imgUrl : placeholderImage "
          alt="small placeholder. TO BE DONE"
        />
      </div>

      <div class="track-main">
        <div class="track-info">
          <router-link :to="'/track/' + id" tag="h2" class="track-name"
          >{{ name || "Скоро здесь будет название" }}
          </router-link>
          <p class="track-description">
            {{ description || "Скоро здесь будет описание" }}
          </p>
        </div>
        <router-link class="open-track" :to="'/track/' + id">
          <i class="fas fa-arrow-right"></i
          ></router-link>
      </div>
    </div>
    <router-link :to="`/track/${id}/edit`" v-if="isMaster" class="change-track-sticker sticker">
      Изменить <i class="fas fa-pencil"></i>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import placeholderSmall from '../../../public/placeholderSmall.png';

export default {
  name: 'TrackCard',
  props: {
    showAll: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
    },
    dateFinish: {
      type: String,
    },
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    imgUrl: {
      type: String,
    },

  },
  data() {
    return {
      baseUrl: 'https://tml9.rosatom.ru',

      placeholderImage: placeholderSmall,

    };
  },
  computed: {
    ...mapGetters([
      'getUser',
    ]),

    isMaster() {
      return this.getUser.role === 'teacher';
    },
  },
};
</script>

<style scoped lang='scss'>
.card {
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 7px rgba(139, 164, 249, 0.3);
  border-radius: 20px;
  overflow: hidden;
  transition: 0.4s;

  &:hover {
    transform: scale(1.03);
  }

  .sticker {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;

    padding: 6px 20px;
    background: #ffa34f;
    border-radius: 15px 15px 0px 0px;
    color: #ffffff;

    transition: .4s;
  }

  .change-track-sticker {
    cursor: pointer;
    border-radius: 0 0 15px 15px;

    &:hover {
      filter: brightness(110%);
    }
  }
  .track-core{
    height: 450px;

    display: flex;
    flex-direction: column;
  }

  .track-img-wrap {
    // position: relative;
    overflow: hidden;
    height: 200px;

    background: #EDEDED;

  }

  .track-img {
    // position: absolute;
    // top: 0;
    // left: 0;
    // max-width: 100%;
    width: 100%;
    // text-align: center;
    // height: 100%;
    // height: 40%;
  }

  .track-main {
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 20px;
    gap: 20px;

    .track-info {
      flex-grow: 1;

      .track-name {
        cursor: pointer;
        display: block;
        font-weight: 800;
        font-size: 14px;
        color: #5a2dda;
        margin-bottom: 8px;
      }

      .track-description {
        max-height: 70px;

        // УСТАРЕВШИЙ МЕТОД
        -webkit-line-clamp: 3; /* Число отображаемых строк */
        display: -webkit-box; /* Включаем флексбоксы */
        -webkit-box-orient: vertical; /* Вертикальная ориентация */
        overflow: hidden; /* Обрезаем всё за пределами блока */
      }
    }

    .open-track {
      align-self: end;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 20px;

      width: 44px;
      height: 44px;
      border-radius: 50%;

      background: linear-gradient(180deg, #6fcf97 0%, #66d2ea 100%);

      transition: 0.6s;

      &:hover {
        background: linear-gradient(180deg, #34d576 100%, #66d2ea 0%);
      }
    }
  }
}
</style>
