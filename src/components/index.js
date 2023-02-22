import hearingRecord from '@/components/hearingRecord/'
const compnents = {
    hearingRecord
}
const install = function (Vue) {
    if (install.installed) return;
    Object.keys(compnents).forEach(c => {
        Vue.component(compnents[c].name, compnents[c])
    })
}

export default {
    install
}