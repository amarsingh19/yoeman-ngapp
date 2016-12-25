'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var yosay = require('yosay');
var chalk = require('chalk');
var generatorParams;

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        this.argument('name', {type: String, required: true});

        generatorParams = {
            moduleName: this.config.get('ngappname'),
            directiveFileName: this.name,
            directiveName: _.camelCase(this.name),
            directiveMarkup: _.kebabCase(this.name)
        };
    },
    prompting: function () {
        var that = this;
        this.log(yosay('Welcome to ' + chalk.yellow('YANG!') + ' sub-generator!'));
/*
        var defaultNgAppName = this.config.get('ngappname') || 'my-app';
        var defaultLibSelection = this.config.get('jslibs') || '';
        var defaultLodashSelection;
        var defaultMomentJSSelection;
        var defaultRxJSSelection;
        if(defaultLibSelection == ''){
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
            message: 'Angular App Name (ng-app)',
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

            //done();
        });*/
    },
    _copyDirectiveFile: function(fileExtension){
        this.fs.copyTpl(
            this.templatePath('_directive.' + fileExtension),
            this.destinationPath('src/common/components/' + this.name + '/' + this.name + '.' + fileExtension), generatorParams
        );
    },
    writing: {
        lessFiles: function () {
            this._copyDirectiveFile('less');
        }
        ,
        html: function () {
            this._copyDirectiveFile('html');
        },
        script: function () {
            this._copyDirectiveFile('js');
            this._copyDirectiveFile('spec.js');
        }
    },
    conflicts: function () {
    },
    install: function () {

    },
    end: function () {
        this.log(chalk.yellow.bold('Directive created successfully!'));
    }
});