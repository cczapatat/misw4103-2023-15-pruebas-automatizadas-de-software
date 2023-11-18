const compareImages = require("resemblejs/compareImages");
const config = require("./config.json");
const fs = require('fs');
const path = require('path');

const { browsers, options } = config;

async function executeTest(){
    if(browsers.length === 0){
      return;
    }
    let resultInfo = {}
    let datetime = new Date().toISOString().replace(/:/g,".");

    for (let i = 2; i <= 10; i++) {
        for (let j = 0; j<=20; j++) {
            if (!fs.existsSync(`./vrt/results/${datetime}`)){
                fs.mkdirSync(`./vrt/results/${datetime}`, { recursive: true });
            }
            const filePathNew = path.resolve("./cypress/screenshots",`scenario_${i}_${j}_new.png`);  
            const filePathOld = path.resolve("./cypress/screenshots",`scenario_${i}_${j}_old.png`);  
            //const filePathNewShort = `./cypress/screenshots/scenario_${i}_${j}_new.png`;
            //const filePathOldShort = `./cypress/screenshots/scenario_${i}_${j}_old.png`;
            console.log("Reading path image: " + filePathOld);
            console.log("Reading path image: " + filePathNew);
            if(fs.existsSync(filePathNew) && fs.existsSync(filePathOld)){
                console.log('The path exists');
                console.log("Reading image: " + filePathOld);
                console.log("Reading image: " + filePathNew);
                const fileContentNew = fs.readFileSync(filePathNew);
                const fileContentOld = fs.readFileSync(filePathOld);

                const data = await compareImages(
                    fileContentOld,
                    fileContentNew,
                    options
                );
                resultInfo[`scenario_${i}_${j}`] = {
                    isSameDimensions: data.isSameDimensions,
                    dimensionDifference: data.dimensionDifference,
                    rawMisMatchPercentage: data.rawMisMatchPercentage,
                    misMatchPercentage: data.misMatchPercentage,
                    diffBounds: data.diffBounds,
                    analysisTime: data.analysisTime,
                    filePathOld: `scenario_${i}_${j}_old.png`,
                    filePathNew: `scenario_${i}_${j}_new.png`
                }
                fs.writeFileSync(`./vrt/results/${datetime}/compare-scenario_${i}_${j}.png`, data.getBuffer());
            }
            
            // Break the inner loop if the file doesn't exist
            if (!fs.existsSync(filePathNew) || !fs.existsSync(filePathOld)) {
                console.log('The path not exists')
                //break;
            }
        }
    }
    
    fs.writeFileSync(`./vrt/results/${datetime}/report.html`, createReport(datetime, resultInfo));
    fs.copyFileSync('./index.css', `./vrt/results/${datetime}/index.css`);
    // copy old and new
    const sourceDirectory = './cypress/screenshots';
    const destinationDirectory = `./vrt/results/${datetime}`;

    copyFiles(sourceDirectory, destinationDirectory);
    console.log('------------------------------------------------------------------------------------')
    console.log("Execution finished. Check the report under the results folder")
    return resultInfo;  
  }
(async ()=>console.log(await executeTest()))();

function browser(b, info){
    return `<div class=" browser" id="test0">
    <div class=" btitle">
        <h2>Comparison: ${b}</h2>
        <p>Data: ${JSON.stringify(info)}</p>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Reference</span>
        <img class="img2" src="${info.filePathOld}" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test</span>
        <img class="img2" src="${info.filePathNew}" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="./compare-${b}.png" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`
}

function createReport(datetime, resInfo){
    let scenarioList = [];
    for (let i = 1; i <= 20; i++) {
        for (let j = 0; j<=20 ; j++) {
            scenarioList.push(`scenario_${i}_${j}`);
        }
    }
    return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for 
                 <a href="${config.url}"> ${config.url}</a>
            </h1>
            <p>Executed: ${datetime}</p>
            <div id="visualizer">
                ${scenarioList.filter(el => resInfo[el] != null ).map(b=>browser(b, resInfo[b]))}
            </div>
        </body>
    </html>`
}

function copyFiles(sourceDir, destinationDir) {
  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.error('Error reading source directory:', err);
      return;
    }

    files.forEach((file) => {
      const sourcePath = path.join(sourceDir, file);
      const destinationPath = path.join(destinationDir, file);

      fs.copyFile(sourcePath, destinationPath, (err) => {
        if (err) {
          console.error('Error copying file:', err);
          return;
        }

        console.log(`Copied ${sourcePath} to ${destinationPath}`);
      });
    });
  });
}