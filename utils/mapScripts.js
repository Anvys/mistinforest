const fs = require('fs');
// magick mogrify -format png -gravity south -chop 0x32 *.png
// magick mogrify -format png -gravity east -chop 32x0 *.png
let str = ''
for (let j = 24; j >= 0; j--) {
    for (let i = 0; i < 40; i++) {
        str = str + `World_${i < 10 ? '0' + i : i}_${j < 10 ? '0' + j : j}.png\n`
    }
}
fs.writeFile('image.txt', str, (err) => {
    if (err) throw err;
})
// magick montage -mode concatenate -tile 40x25 @image.txt final.jpg
// vips dzsave ../../../../map2/tmp4/final.jpg xxx --layout google --background 0 --centre

const writeFileNames = (name) =>{
    var files = fs.readdirSync(`./src/icons/${name}`);
    const names = files.map(v=>v.substring(0,v.length-4))
    let namesStr = ''
    for (let i = 0; i < names.length; i++) {
        const isLineBreak = (i>0 && (names[i].split('-')[1] !==names[i-1].split('-')[1]))
        namesStr = namesStr + (`${isLineBreak ? '\n':''}'${names[i]}', `)
    }
    fs.writeFile(`${name}.txt`,namesStr , (err) => {
        if (err) throw err;
    })
}
// writeFileNames('res')
// writeFileNames('comp')
// writeFileNames('other')
// writeFileNames('Event')
writeFileNames('abilities1')
writeFileNames('abilities2')
writeFileNames('abilities3')
writeFileNames('alterations')
writeFileNames('portret')