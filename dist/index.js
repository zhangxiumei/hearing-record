/*!
 * hearing-record.js v1.0.6
 * Released under the MIT License.
 */
import hearingRecord from './hearingRecord.js';

var compnents = {
  hearingRecord: hearingRecord
};
var install = function install(Vue) {
  if (install.installed) return;
  Object.keys(compnents).forEach(function (c) {
    Vue.component(compnents[c].name, compnents[c]);
  });
};
var index = {
  install: install
};

export { index as default };
