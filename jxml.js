const xml2js = require('xml2js')
const fs = require('fs') 
const files = []

const parser = new xml2js.Parser({ attrkey: "ATTR" });

const path = 'particles/'
let dir = fs.readdirSync(path, {withFileTypes: true});
dir.forEach(file => {
    if(file.isFile()) {
        if(file.name.endsWith('.xml')) {
            let datastr = '<?xml version="1.0" encoding="UTF-8" ?><root>' + fs.readFileSync(path + file.name, 'utf-8') + '</root>'
            parser.parseString(datastr, (err, result) => {
                fs.writeFileSync(path + file.name.replace('.xml', '.json'), JSON.stringify(result.root, null, 4), 'utf-8')
            })
            
        }
    }
})
