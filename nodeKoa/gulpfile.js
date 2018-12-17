const gulp = require("gulp");
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const watch = require('gulp-rollup');
// 开发环境
gulp.task('builddev', () => {
    return watch('src/nodeui/**/*.js', function () {
    	gulp.src('src/nodeui/**/*.js.js')
        .pipe(babel({
        	babelrc: false, // 防止外部babelrc冲突
        	ignore: ["./src/nodeui/config/*.js"],
            "plugins": ['babel-plugin-transform-es2015-modules-commonjs']
        }))
        .pipe(gulp.dest('dist'))
    });
});

// 配置文件清理
gulp.task('buildConfig', function() {
  gulp.src('src/nodeui/**/*.js')
    // transform the files here.
    .pipe(rollup({ // 入口文件，不用webpack打包node文件，node文件都是平行的。
      // any option supported by Rollup can be set here.
      input: './src/nodeui/config/*.js',
      output: {
      	format: "cjs",
      }
    }))
    .pipe(gulp.dest('./dist'));
});


// 上线环境
gulp.task('buildprod', function () {
	return watch('src/nodeui/**/*.js', function () {
    	gulp.src('src/nodeui/**/*.js.js')
        .pipe(babel({
        	babelrc: false, // 防止外部babelrc冲突,不去抓取外部js
        	ignore: ["./src/nodeui/config/*.js"],
            "plugins": ['babel-plugin-transform-es2015-modules-commonjs']
        }))
        .pipe(gulp.dest('dist'))
    });
})；

gulp.task("lint", function () {

});

let _task = ["builddev"];

if (process.env.NODE_ENV == "production") {
	_task = ["build"]
}

if (process.env.NODE_ENV == "lint") {
	
}


gulp.task("default", _task);

