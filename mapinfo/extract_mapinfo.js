const fs = require('fs');
const path = require('path');

const filePathIn = path.join(__dirname, 'log.txt');
const filePathOut = path.join(__dirname, 'maps.json');

const readLines = fs.readFileSync(filePathIn).toString().split('\n');

let maps = [];

readLines.forEach(line => {
    let match = /.*\[chat\].*\* "(.*)" by (.*) on (.*) \((★*).*difficulty, (\d*) points?, (\d*) finishes, (\d*) finishers.*by: ?(.*)/gm.exec(line);
    
    if (match) {
        maps.push({
            name: match[1],
            author: match[2],
            category: match[3],
            difficulty: match[4].length,
            points: match[5],
            finishes: match[6],
            finishers: match[7],
            firstFinisher: match[8],
        });
    }
});

fs.writeFileSync(filePathOut, JSON.stringify(maps, null, 2));