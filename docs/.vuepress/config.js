// .vuepress/config.js
module.exports = {
    title: 'hearingRecord',
    base: '/hearing-record/',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Github', link: 'https://github.com/zhangxiumei/hearing-record.git' },
            { text: 'Npm', link: 'https://www.npmjs.com/package/hearing-record' }
        ],
        sidebar: [
            '/',
            '/componentsDocs/hearingRecord'
        ]
    }
}