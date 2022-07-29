import fs from 'fs';
function appendToRouter(){
    //    read router.js file and append this to top of it 
        let routerFile = fs.readFileSync('./router.js', 'utf8');
        // console.log(routerFile);
        const routerImport = `import BookingRoute from './routes/BookingRoute.js'`;
        // append to top of router.js
        routerFile = routerImport + '\n' + routerFile;
        fs.writeFileSync('./router.js', routerFile);

        const routerUse = `app.use('/api/v1/', bookingRoute);`;
        // append after the curley brace of router.js 
        routerFile = routerFile.replace('}', routerUse + '\n}');
        fs.writeFileSync('./router.js', routerFile);
        

    
    
}

appendToRouter();

