const fs = require("fs");
const path = require("path");

const name = '../dir';
const lastDir = 'dir';

fs.mkdir(`${lastDir}`, () => {});
fs.readdir(name, (err, files) => {
    for (const file of files) {
        if (file !== `${lastDir}`) {
            console.log(file);
            let str = `${name}/${file}`;
            fs.stat(str, function (err, stats) {
                if (stats.isDirectory()) {
                    fs.readdir(str, function (err, deepFiles) {
                        for (const deepFile of deepFiles) {
                            console.log(file + '/' + deepFile);
                            fs.stat(`${str}/${deepFile}`, (err, deepStats) => {
                                if (deepStats.isFile() && deepFile.length >= 4 && deepFile.indexOf('.txt') !== -1) {
                                    fs.readFile('E:\\CWP\\WebstormProjects\\cwp-01\\config.json', (err, strLast) => {
                                       let copyright = JSON.parse(strLast.toString());
                                        fs.readFile(`${str}/${deepFile}`, (err, deepStr) => {
                                            fs.writeFile(`${name}/${lastDir}/${deepFile}`, `${copyright.copyright}
                                        ${deepStr.toString()}${copyright.copyright}`, () => {
                                            });
                                        })
                                    })
                                }
                            });
                        }
                    })
                }
                else if (file.length >= 4 && file.indexOf('.txt') !== -1) {
                    fs.readFile('E:\\CWP\\WebstormProjects\\cwp-01\\config.json', (err, strLast) => {
                        fs.readFile(`${name}/${file}`, (err, deepStr) => {
                            fs.writeFile(`${name}/${lastDir}/${file}`, `${copyright.copyright}${deepStr.toString()}${copyright.copyright}`, () => {
                            });
                        })
                    })
                }
            })
        }
    }
    fs.watch(`${name}/${lastDir}`, {encoding: 'buffer'}, (eventType, filename) => {
        if (filename) { console.log(filename.toString()); }
    });
});