const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'mapinfo/maps.json');
const maps = JSON.parse(fs.readFileSync(filePath, 'utf8'));

let firstFinishes = {};
maps.forEach(map => {
    firstFinishes[map.firstFinisher] = firstFinishes.hasOwnProperty(map.firstFinisher) ? firstFinishes[map.firstFinisher] + 1 : 1;
});

let sortable = [];
for (let finisher in firstFinishes) {
    sortable.push([finisher, firstFinishes[finisher]]);
}

sortable.sort((a, b) => b[1] - a[1]);
console.log("Top 10 - No. first finishes");
console.log("-----------------------------")
console.table(sortable.slice(0, 20));