const path = require('path');
const includeAll = require('include-all');
const SEED_DATA_PATH = './src/seed-data/';

const bulkCreateOptions = { ignoreDuplicates: true };

class SeedDataHelper {

    seed(db, callback) {
        includeAll.optional({
            dirname: path.resolve(SEED_DATA_PATH),
            filter: /(.+)\.(json)$/,
            depth: 1,
            caseSensitive: true
        }, function onLoad(err, data) {
            if (err) {
                throw err;
            }

            db.GlobalSetting.bulkCreate(data['global-setting'], bulkCreateOptions).then(() => {
                callback();
            });
        });
    }
}

module.exports = new SeedDataHelper();