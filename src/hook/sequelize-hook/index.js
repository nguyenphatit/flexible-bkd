const dbConfig = require('./../../configs/db.config');
const seedDataHelper = require('./../../helpers/seed-data-helper');
const globalSettingModel = require('./../../models/GlobalSetting');
const taskModel = require('./../../models/Task');
const userModel = require('./../../models/User');

module.exports = function sequelizeHook(sequelize) {

    // define model

    // define GlobalSetting
    GlobalSetting = sequelize.define('globalSetting', globalSettingModel);

    // define Task
    Task = sequelize.define('task', taskModel);
    Task.associate = function (models) {
        models.Task.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'userId'
        });
    }

    // define User
    User = sequelize.define('user', userModel);


    let model = {};
    model.GlobalSetting = GlobalSetting;
    model.Task = Task;
    model.User = User;

    // define association
    Object.keys(model).forEach(modelName => {
        if (model[modelName].associate) {
            model[modelName].associate(model);
        }
    });

    sequelize.authenticate().then(() => {
        sequelize.sync({
            force: dbConfig.migrate === 'drop' ? true : false
        }).then(() => {
            console.log('Drop and re-sync db.');

            seedDataHelper.seed(model, () => console.log('done'));
        });
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });
}