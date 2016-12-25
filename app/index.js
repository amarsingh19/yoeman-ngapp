'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var yosay = require('yosay');
var chalk = require('chalk');
var generatorParams;

module.exports = generators.Base.extend({

    constructor: function () {
        //yoprompts.prompts();
        generators.Base.apply(this, arguments);

        this.argument('appName', {type: String, required: true});

        generatorParams = {
            appName: _.startCase(this.appName),
            moduleName: _.camelCase(this.appName)
        };

        this.option('includerxjs', {
            desc: 'Optionally includes rxjs library.',
            type: Boolean,
            default: false
        });
    },
    prompting: function () {
        var that = this;
        this.log(yosay('Welcome to ' + chalk.yellow('ngapp (Angular app)') + ' generator !!'));

        var defaultNgAppName = this.config.get('ngappname') || 'my-app';
        var defaultLibSelection = this.config.get('jslibs') || '';
        var defaultLodashSelection;
        var defaultMomentJSSelection;
        var defaultRxJSSelection;
        if (defaultLibSelection == '') {
            defaultLodashSelection = true;
            defaultMomentJSSelection = true;
            defaultRxJSSelection = true;
        }
        else {
            defaultLibSelection = _.slice(defaultLibSelection, ',');
            defaultLodashSelection = _.includes(defaultLibSelection, 'lodash');
            defaultMomentJSSelection = _.includes(defaultLibSelection, 'momentjs');
            defaultRxJSSelection = _.includes(defaultLibSelection, 'includerxjs');
        }

        return this.prompt([{
            type: 'input',
            name: 'ngappname',
            message: 'Please enter the Angular App Name (ng-app).',
            default: defaultNgAppName
        },
            {
                type: 'checkbox',
                name: 'jslibs',
                message: 'Which JS libraries would you like to include?',
                choices: [
                    {
                        name: 'lodash',
                        value: 'lodash',
                        checked: defaultLodashSelection
                    },
                    {
                        name: 'Moment.js',
                        value: 'momentjs',
                        checked: defaultMomentJSSelection
                    },
                    {
                        name: 'RxJS',
                        value: 'includerxjs',
                        checked: defaultRxJSSelection
                    }
                ]
            }]).then(function (answers) {


            that.config.set('installdep', answers.installdep);
            that.config.set('ngappname', answers.ngappname);
            that.config.set('jslibs', answers.jslibs);

            generatorParams.moduleName = answers.ngappname;
            generatorParams.includeLodash = _.includes(answers.jslibs, 'lodash');
            generatorParams.includeMoment = _.includes(answers.jslibs, 'momentjs');
            generatorParams.includerxjs = _.includes(answers.jslibs, 'includerxjs');
        });
    },
    configuring: function () {
    },
    writing: {
        appStaticFiles: function () {
            this.copy('_favicon.ico', 'src/favicon.ico');
            this.copy('home/_home.less', 'src/home/home.less');
            this.copy('about/_about.less', 'src/about/about.less');
            this.copy('common/components/_appLoading.less', 'src/common/components/appLoading.less');

            this.directory('styles', 'src/styles');
        }
        ,
        html: function () {
            this.fs.copyTpl(
                this.templatePath('_index.html'),
                this.destinationPath('src/index.html'), generatorParams
            );

            this.fs.copyTpl(
                this.templatePath('home/_home.html'),
                this.destinationPath('src/home/home.html'), generatorParams
            );

            this.fs.copyTpl(
                this.templatePath('about/_about.html'),
                this.destinationPath('src/about/about.html'), generatorParams
            );
        },
        script: function () {
            this.fs.copyTpl(
                this.templatePath('_app.js'),
                this.destinationPath('src/app.js'), generatorParams
            );

            this.fs.copyTpl(
                this.templatePath('home/_homeCtrl.js'),
                this.destinationPath('src/home/homeCtrl.js'), generatorParams
            );

            this.fs.copyTpl(
                this.templatePath('home/_homeCtrl.spec.js'),
                this.destinationPath('src/home/homeCtrl.spec.js'), generatorParams
            );

            this.fs.copyTpl(
                this.templatePath('home/_homeRouteConfig.js'),
                this.destinationPath('src/home/homeRouteConfig.js'), generatorParams
            );

            this.fs.copyTpl(
                this.templatePath('about/_aboutCtrl.js'),
                this.destinationPath('src/about/aboutCtrl.js'), generatorParams
            );

            this.fs.copyTpl(
                this.templatePath('about/_aboutCtrl.spec.js'),
                this.destinationPath('src/about/aboutCtrl.spec.js'), generatorParams
            );

            this.fs.copyTpl(
                this.templatePath('about/_aboutRouteConfig.js'),
                this.destinationPath('src/about/aboutRouteConfig.js'), generatorParams
            );

            this.fs.copyTpl(
                this.templatePath('common/components/_appLoading.js'),
                this.destinationPath('src/common/components/apLoading.js'), generatorParams
            );

        },
        git: function () {
            this.copy('gitignore', '.gitignore');
        },
        gruntfile: function () {
            this.copy('_Gruntfile.js', 'Gruntfile.js');
            this.copy('_karma.conf.js', 'karma.conf.js');
            this.copy('jshintrc', '.jshintrc');
        },
        packageJSON: function () {
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'), generatorParams
            );
        },
        bower: function () {
            var bowerJson = {
                name: _.kebabCase(generatorParams.appName),
                license: 'MIT',
                dependencies: {}
            };

            bowerJson.dependencies['angular'] = '~1.4.6';
            bowerJson.dependencies['angular-bootstrap'] = '~0.14.0';
            bowerJson.dependencies['angular-ui-router'] = '~0.2.15';
            if (generatorParams.includeLodash == true) {
                bowerJson.dependencies['lodash'] = '~3.10.0';
            }
            bowerJson.dependencies['bootstrap-less'] = '~3.2.0';
            bowerJson.dependencies['toastr'] = '~2.1.1';


            if (generatorParams.includeMoment == true) {
                bowerJson.dependencies['moment'] = '~2.10.6';
            }

            if (generatorParams.includerxjs == true) {
                bowerJson.dependencies['rxjs'] = '~4.0.7';
            }
            this.fs.writeJSON('bower.json', bowerJson);
            this.copy('bowerrc', '.bowerrc');

        }
    },
    conflicts: function () {
    },
    install: function () {
        var that = this;
        var defaultInstallOption = that.config.get('installdep') || 'Y';
        return this.prompt([{
            type: 'input',
            name: 'installdep',
            message: 'Install dependencies now? (Y/N)',
            default: defaultInstallOption
        }]).then(function (answers) {
            that.config.set('installdep', answers.installdep);
        });
        if (this.config.get('installdep') == 'Y') {
            this.installDependencies({
                skipInstall: this.options['skip-install']
            });
        }
    },
    end: function () {
        this.log(chalk.yellow.bold('Installation successful!'));

        var howToInstall =
            '\nAfter running ' + chalk.yellow.bold('npm install & bower install') +
            ', inject your front end dependencies by running ' +
            chalk.yellow.bold('grunt server') +
            '.';

        if (this.config.get('installdep') != 'Y') {
            this.log(howToInstall);
            return;
        }
    }
});