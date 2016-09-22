fis
.match('js/**.jsx', {
    isMod: false,
    parser: fis.plugin('babel2'),
    rExt: '.js'
})
.match('css/**.less', {
    parser: fis.plugin('less'),
    rExt: '.css'
});