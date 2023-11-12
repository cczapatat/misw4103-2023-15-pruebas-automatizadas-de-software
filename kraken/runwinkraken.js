const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const numFiles = 20;

function runWorker(fileIndex) {
    pathrel = path.resolve("features",`scenario_${fileIndex}.feature`);  
    const currentFileName = pathrel;
  for (var i=fileIndex+1; i<= 20; i++){
    try{

        pathrel2 = path.resolve("features",`scenario_${i}.feature`); 
        pathrel2ren = pathrel2+"d";
        
        fs.renameSync(pathrel2, pathrel2ren);

    } catch(error){
        console.error('file not renamed');
    }
    
  }

  const command = `npm run krakenwin`;

  console.log(`Running worker for ${currentFileName}...`);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running worker for ${currentFileName}:`, error);
      process.exit(1);
    }

    console.log(`Worker completed for ${currentFileName}.`);

    // Rename files before running the worker for the next iteration
    try {
      pathrel3 = path.resolve("features",`scenario_${fileIndex}.feature`); 
        pathrel3ren = pathrel3+"d";
        
        fs.renameSync(pathrel3, pathrel3ren);
    } catch(error){
        console.error('file not renamed');
    }
    
    for (var i=fileIndex+1; i<= 20; i++){
        try {
          pathrel4 = path.resolve("features",`scenario_${i}.featured`); 
          pathrel4ren = pathrel4.slice(0, -1);
            fs.renameSync(pathrel4, pathrel4ren);
            
        } catch(error){
            console.error('file not renamed');
        }
        
    }

    if (fileIndex < numFiles ) {
      // If there are more files, run the worker for the next one
      runWorker(fileIndex + 1);
    } else {
      console.log('All files processed.');
      restoreFilenames();
    }
  });
}
function restoreFilenames(){
    for (var i=0; i<= 20; i++){
        try {
          pathrel5 = path.resolve("features",`scenario_${i}.featured`); 
        pathrel5ren = pathrel5.slice(0, -1);
            
            fs.renameSync(pathrel5, pathrel5ren);
        } catch(error){
            console.error('file not renamed');
        }
        
    } 
}
// Start the process with the first file
runWorker(1);
