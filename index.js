var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var _ = require('lodash');

var instream = fs.createReadStream('./data.csv');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);

var insuranceCompanies = [];
var members = {};
var proc = {};
var arr = [];
var counter = 0;

rl.on('line', function(line) {
    arr.push(line);
});

getInsurance = () => {

    arr.forEach(el => {
        if (counter !== 0) {
            let data = el.split(',');
            let userId = data[0].trim();
            let insuCo = data[3].trim();
            let version = parseInt(data[2].trim(), 10);
            let name = data[1];
            let splitName = name.split(' ');
            data[4] = splitName[0];
            data[5] = splitName[1];

            if (!insuranceCompanies.includes(insuCo)) {
                insuranceCompanies.push(insuCo);
            }

            if (Object.keys(members).includes(userId)) {
                if (version > parseInt(members[userId][2], 10)) {
                    members[userId] = data;
                }
            } else {
                members[userId] = data;
            }
        }
        counter++;
    });
}

processMembers = () => {
    let sorted = _.sortBy(members, o => o[5]);
    
    insuranceCompanies.forEach(el => {
        let data = '';
        _.forOwn(sorted, (value, key) => {
            if (value[3] === el) {
                delete value[4];
                delete value[5];
                data += value+"\n";
            }
        });
        data = data.replace(/,,/g, '');
        fs.writeFileSync(`./${el}.csv`, data);
    });
}

rl.on('close', async () => {
    await getInsurance();
    processMembers();
    console.log(`Total Number of lines processed: ${ counter - 1}`);
    console.log(`Files created: ${insuranceCompanies.length}`);
});
