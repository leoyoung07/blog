'use strict';
import moment from 'moment';
export default class Util {
  static navTo(url: string) {
    window.location.href = url;
  }
  static getLocalDateTime(utcDateTime: moment.MomentInput) {
    return moment.utc(utcDateTime).utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
  }
}
