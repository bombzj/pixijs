const xml2js = require('xml2js')
const fs = require('fs') 
const files = []

const parser = new xml2js.Parser({ attrkey: "ATTR" });

const path = 'particles/'
let dir = fs.readdirSync(path, {withFileTypes: true});
dir.forEach(file => {
    if(file.isFile()) {
        if(file.name.endsWith('.xml')) {
            let datastr = fs.readFileSync(path + file.name, 'utf-8')
            var data = parser.parseString(datastr)
            fs.writeFileSync(path + file.name.replace('.xml', '.json'), JSON.stringify(data, null, 4), 'utf-8')
        }
    }
})
