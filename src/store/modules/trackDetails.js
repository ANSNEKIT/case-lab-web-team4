/* eslint no-shadow:  0 */ // --> OFF
import TrackDetail from '@/services/track/trackDetail';
import { setItem, getItem } from '@/helpers/localStorageHelper';

const state = {
  details: getItem('details') || [], // Массив. Содержит айди трека и объект с деталями
};

const getters = {
  // eslint-disable-next-line no-unused-vars
  getTrackDetailsFromStore: (state) => (id) => state.details.find((i) => i.id === id),
};
const mutations = {
  addTrackDetails(state, payload) {
    state.details.push(payload);
    setItem('details', state.details);
  },
};

const actions = {

  // Получить элементы трека ----------------------
  async getTrackDetails({ commit }, trackId) {
    const response = await TrackDetail.getTrackDetail(trackId, 'teacher');
    if (response) {
      commit('addTrackDetails', { id: trackId, details: response });
    }
  },

  // удаление отдельного элемента в треке ------------
  async removeTrackItem({ commit }, ids) {
    // console.log(commit);
    // const trackId = ids[0];
    const itemId = ids[1];
    // console.log('store: trackId = ', trackId);
    // console.log('store: id = ', itemId);
    const response = await TrackDetail.removeTrackItem(itemId, this.state.user.role);
    console.log(response);
    if (response) {
      commit('changeSuccessStatus', true);
      commit('removeTrackItem', itemId);
    } else {
      commit('changeSuccessStatus', false);
    }
  },
  // -----------------------------------------
};

export default {
  state, getters, mutations, actions,
};
