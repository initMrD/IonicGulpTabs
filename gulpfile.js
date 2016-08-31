var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var del = require('del');
var gulpCopy = require('gulp-copy');
var watch = require('gulp-watch');
/**
 * Linting Sass stylesheets with Stylelint
 * http://www.creativenightly.com/2016/02/How-to-lint-your-css-with-stylelint/
 */
var postcss = require('gulp-postcss');
var reporter = require('postcss-reporter');
var syntax_scss = require('postcss-scss');
var stylelint = require('stylelint');

var ngConstant = require('gulp-ng-constant');
var extend = require('gulp-extend');
var args = require('yargs').argv;

var templateCache = require('gulp-angular-templatecache');
var minifyHtml = require('gulp-minify-html');

var imagemin = require('gulp-imagemin');

var uglify = require("gulp-uglify");
var ngAnnotate = require('gulp-ng-annotate');

var inject = require('gulp-inject');

var htmlreplace = require('gulp-html-replace');

/**
 * This is intended to be a temporary solution until the release of gulp 4.0 which has support
 * for defining task dependencies in series or in parallel.
 */
var runSequence = require('run-sequence');

//
// === PATHS ===
//

var files = {
    jsbundle: 'app.bundle.min.js',
    appcss: 'app.css',
    ionicappmincss: 'ionic.app.min.css',
    ionicbundle: 'ionic.bundle.min.js'    // change to 'ionic.bundle.js' for debugging moduleErr errors
};

var paths = {
    html: ['./src/*.html'],
    sass: ['./src/css/scss/*.scss'],
    templates: ['./src/app/**/*.html'],
    images: ['./src/app/**/img/*'],
    commonimages: ['./src/img/*'],
    scripts: ['./src/app/*.js', './src/app/**/*.module.js', './src/app/**/*.js'],
    dist: ['./www'],

    lib: [
        './src/lib/ionic/js/ionic.bundle.js',
        './src/lib/angular-resource/angular-resource.js',
        './src/lib/collide/collide.js',
    ]
};

//
// === TOP LEVEL TASKS (invoke with "gulp <task-name>") ===
//

// default task for DEV
gulp.task('default', ['inject-libs-to-index-html']);

// build task for Development mode、 Staging mode or Production mode
var developmentTask,
    stagingTask,
    productionTask;

// development task
developmentTask = ['sass', 'set-api-config', 'copy-src-to-dest', 'watch-src-folder'];

// production task
productionTask = ['sass', 'index', 'templates', 'copy-fonts', 'set-api-config', 'imagemin', 'common-imagemin', 'scripts', 'minify-third-library-js'];

// staging task
stagingTask = productionTask;

gulp.task('build', function (callback) {
    runSequence('clean',
        eval((args.env || "development") + "Task"),
        function () {
            if (!args.env || (args.env == "development")) {
                gutil.log(gutil.colors.yellow('Watching and auto synchronizing the change from src to www, Ctrl-C to stop watching and quit'));
            }
        });
})

//
// === CHILD TASKS ===
//

// sass task
// =================================================================
gulp.task('sass', function (done) {
    gulp.src('./src/css/scss/ionic.app.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./src/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
});

//
// === CHILD TASKS ===
//

// clean task
// =================================================================
gulp.task('clean', function (cb) {
    return del([
        paths.dist + '/**/*'
    ], cb);
});

// copy all files under the SRC to the WWW directory
// =================================================================
gulp.task('copy-src-to-dest', function () {
    gulp.src(['./src/**/*', './src/index.html'])
        .pipe(gulp.dest('./www'));
});

// watch SRC folder
// =================================================================
gulp.task('watch-src-folder', function () {
    gulp.src(['./src/*', './src/**/*'], {base: './src'})
        .pipe(watch('./src', {base: './src'}))
        .pipe(gulp.dest('./www'));
});

// automatic injection third library script in the index file
// =================================================================
gulp.task('inject-libs-to-index-html', function () {
    gulp.src('./src/index.html')
        .pipe(inject(gulp.src(paths.lib, {read: false}), {relative: true}))
        .pipe(gulp.dest('./src'));
});

// scss lint
// =================================================================
gulp.task("scss-lint", function () {

    // stylelint config rules
    var stylelintConfig = {
        "extends": "stylelint-config-standard",
        "rules": {
            "indentation": [2, {
                "warn": true,
                "except": ["param"],
                "message": "Please use 2 spaces for indentation. Tabs make The Architect grumpy."
            }],
            "number-leading-zero": null,
        }
    }

    var processors = [
        stylelint(stylelintConfig),
        reporter({
            clearMessages: true,
            throwError: true,
        })
    ];

    return gulp.src(['./src/css/scss/*.scss'])
        .pipe(postcss(processors), {syntax: syntax_scss});
});

// api config
// =================================================================
var config = function (env) {
    gulp.src(['./src/app/config/config.default.json', 'src/app/config/config.' + env + '.json'])
        .pipe(extend('config.json', true))
        .pipe(ngConstant({
            name: 'starter.configs',
            deps: [],
        }))
        .pipe(rename(function (path) {
            path.basename = 'config';
            path.extname = '.js';
        }))
        .pipe(gulp.dest('src/app/config'));
};

gulp.task('set-api-config', function () {
    config(args.env || "development")
})

// templatesCache task
// =================================================================
gulp.task('templates', function () {
    gulp.src(paths.templates)
        .pipe(minifyHtml({empty: true}))
        .pipe(templateCache({
            standalone: true,
            root: 'app'
        }))
        .pipe(gulp.dest(paths.dist + '/js'));
});


// imagemin images and output them in dist
// =================================================================
gulp.task('imagemin', function () {
    gulp.src(paths.images)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.dist + '/app'));
});

gulp.task('common-imagemin', function () {
    gulp.src(paths.commonimages)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.dist + '/img'));
});

// minify third library script
// =================================================================
gulp.task('minify-third-library-js', function () {
    gulp.src(paths.lib)
        .pipe(uglify())
        .pipe(concat('app.plugin.min.js'))
        .pipe(gulp.dest(paths.dist + '/js'));
});

// prepare Index.html for dist - ie. using min files
// =================================================================
gulp.task('index', function () {
    gulp.src(paths.html)
        .pipe(htmlreplace({
            'sass': 'css/ionic.app.min.css',
            'css': 'css/app.min.css',
            'js': 'js/app.bundle.min.js',
            'third-library-js': 'js/app.plugin.min.js',
            'templates': 'js/templates.js',
            'shared': 'shared/services/app.services.min.js',
            'ionic': 'lib/ionic/js/' + files.ionicbundle
        }))
        .pipe(gulp.dest(paths.dist + '/.'));
    gulp.src('./src/lib/angular-animate/animate.css').pipe(gulp.dest('./www/lib/angular-animate'));
    gulp.src('./src/lib/angular-material/materialize.min.css').pipe(gulp.dest('./www/lib/angular-material'));
    gulp.src('./src/lib/angular-material/materialize.min.js').pipe(gulp.dest('./www/lib/angular-material'));
    gulp.src('./src/lib/ionic-filter-bar/ionic.filter.bar.min.css').pipe(gulp.dest('./www/lib/ionic-filter-bar'));
    gulp.src('./src/lib/ionic-filter-bar/ionic.filter.bar.min.js').pipe(gulp.dest('./www/lib/ionic-filter-bar'));
    gulp.src('./src/css/mAnimate.css').pipe(gulp.dest('./www/css'));
    gulp.src('./src/lib/angular-animate/ionic-native-transitions.min.js').pipe(gulp.dest('./www/lib/angular-animate'));
    gulp.src('./src/lib/jquery-2.1.1.min.js').pipe(gulp.dest('./www/lib'));
    gulp.src('./src/lib/external/*').pipe(gulp.dest('./www/lib/external'));
});

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

// scripts task
// =================================================================
gulp.task('scripts', function () {
    gulp.src(paths.scripts)
        .pipe(ngAnnotate({
            remove: true,
            add: true,
            single_quotes: true
        }))
        .pipe(uglify())
        .pipe(concat('app.bundle.min.js'))
        .pipe(gulp.dest(paths.dist + '/js'));
});


// copy fonts task
gulp.task('copy-fonts', function () {
    return gulp.src(['./src/font/*', './src/lib/ionic/fonts/*'])
        .pipe(gulpCopy(paths.dist, {prefix: 1}));
});

//
// === OTHER TASKS (used by Ionic CLI default) ===
//

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});
