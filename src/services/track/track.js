import serviceApi from '@/services/serviceApi';
import tokens from '@/services/tokens';

export default class Track {
  // eslint-disable-next-line consistent-return
  static async getTrackByIdApi(trackId, userRole) {
    const headers = {};

    if (userRole === 'teacher') {
      headers.headers = { 'X-API-KEY': tokens.teacher };
    }

    if (userRole === 'student') {
      headers.headers = { 'X-API-KEY': tokens.student };
    }

    try {
      const response = await serviceApi.get('rosatom', `track/${trackId}`, headers);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // eslint-disable-next-line consistent-return
  static async createTrack(track, userRole) {
    const headers = {};

    if (userRole === 'teacher') {
      headers.headers = { 'X-API-KEY': tokens.teacher };
    }

    try {
      const response = await serviceApi.post('rosatom', 'track/', track, headers);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // eslint-disable-next-line consistent-return
  static async changeTrack(trackId, track, userRole) {
    const headers = {};

    if (userRole === 'teacher') {
      headers.headers = { 'X-API-KEY': tokens.teacher };
    }

    try {
      const response = await serviceApi.put('rosatom', `track/${trackId}`, track, headers);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // eslint-disable-next-line consistent-return
  static async removeTrack(trackId, userRole) {
    const headers = {};

    if (userRole === 'teacher') {
      headers.headers = { 'X-API-KEY': tokens.teacher };
    }

    try {
      const response = await serviceApi.delete('rosatom', `track/${trackId}`, headers);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
