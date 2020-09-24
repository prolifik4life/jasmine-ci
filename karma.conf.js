module.exports = function(config) {
    config.set({
        frameworks: ['jasmine', 'jasmine-matchers'],
        preprocessors: {
            '*.js': ['coverage']
        },
        color: true,
        singleRun: true,
        files: [
            '*.js',
            '*.spec.js'
        ],
        plugins: [
            'karma-jasmine', 
            'karma-jasmine-matchers', 
            'karma-chrome-launcher',
            'karma-coverage'],
        browsers: ['ChromeHeadless'],
        reporters: ['dots', 'coverage'],
        coverageReporter: { // Coverage reporter output
            dir: 'coverage/',
            reporters: [
                { 
                    type: 'html',
                    subdir: 'html'
                }
            ]
        }
    });
}