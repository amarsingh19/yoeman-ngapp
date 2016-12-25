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
            serviceFileName: this.name,
            serviceName: _.camelCase(this.name)
        };
    },
    prompting: function () {
        var that = this;
    },
    _copyServiceFile: function(fileExtension) {
        this.fs.copyTpl(
            this.templatePath('_service.' + fileExtension),
            this.destinationPath('src/common/services/' + this.name + '/' + this.name + '.' + fileExtension), generatorParams
        );
    },
    writing: {
        script: function () {
            this._copyServiceFile('js');
            this._copyServiceFile('spec.js');
        }
    },
    conflicts: function () {
    },
    install: function () {

    },
    end: function () {
        this.log(chalk.yellow.bold('Service created successfully!'));
    }
});