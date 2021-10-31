import { createStore } from 'vuex';
import ServiceApi from '@/services/serviceApi';
import tokens from '@/services/tokens';

export default createStore({
  state: {
    userRole: JSON.parse(sessionStorage.getItem('userRole')) || null,
    token: JSON.parse(sessionStorage.getItem('token')) || null,
    tracks: JSON.parse(sessionStorage.getItem('tracks')) || '',
    baseUrl: 'https://tml9.rosatom.ru/',
  },
  getters: {
    getUserRole: (state) => state.userRole,
    getToken: (state) => state.token,
    getTracks: (state) => state.tracks,
    getTrackByIdStore: (state) => (id) => [...state.tracks].find((t) => t.id === id),
  },
  mutations: {
    setRole(state, payload) {
      state.userRole = payload.userRole;
      if (state.userRole) {
        sessionStorage.setItem('userRole', JSON.stringify(state.userRole));
      } else sessionStorage.removeItem('userRole');
    },

    setToken(state, payload) {
      state.token = payload;
      if (state.token) {
        sessionStorage.setItem('token', JSON.stringify(state.token));
      } else sessionStorage.removeItem('token');
    },

    changeTracks(state, payload) {
      state.tracks = payload;
      if (state.tracks && state.tracks.length) {
        sessionStorage.setItem('tracks', JSON.stringify(state.tracks));
      } else sessionStorage.removeItem('tracks');
    },

    redactTrack(state, data) {
      const tracks = state.tracks.concat();
      const idx = tracks.findIndex((t) => t.id === data.id);

      const track = tracks[idx];

      track.data = {
        ...track.data, ...data,
      };

      state.tracks = tracks;
      sessionStorage.setItem('tracks', JSON.stringify(state.tracks));
    },
  },
  actions: {
    changeUserRole({ commit }, role) {
      commit('setRole', { userRole: role });
    },

    changeToken({ commit }, role) {
      commit('setToken', tokens[role]);
    },

    async getTracks({ commit }, token) {
      const response = await ServiceApi.get('rosatom', '/tracks', {
        headers: {
          'X-API-KEY': token,
        },
      });
      if (this.state.userRole !== 'teacher') {
        response.data = response.data.filter((i) => i.data.published === true);
      }
      if (response.data && response.data.length) {
        commit('changeTracks', [...response.data]);
      }
    },

    redactTrack({ commit }, data) {
      console.log(data);
      commit('redactTrack', data);
    },

    clearTracks({ commit }) {
      commit('changeTracks', '');
    },

    clearUserRole({ commit }) {
      commit('setRole', '');
    },

    clearToken({ commit }) {
      commit('setToken', '');
    },
  },
  modules: {},
});
