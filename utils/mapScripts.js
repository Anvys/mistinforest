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