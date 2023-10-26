//Подключение плагинов-------------------------------------

//Common
const gulp = require("gulp")
const clean = require("gulp-clean")
const fs = require("node:fs")
const server = require("gulp-server-livereload")

//SASS
const sass = require("gulp-sass")(require("sass"))
const autoprefixer = require("gulp-autoprefixer")
const groupMedia = require("gulp-group-css-media-queries")
const csso = require("gulp-csso")
const sassGlob = require("gulp-sass-glob")

//HTML
const fileinclude = require("gulp-file-include")
const htmlclean = require("gulp-htmlclean")

//IMAGES


//---------------------------------------------------------

//Создание задач-------------------------------------------


gulp.task("clean:docs", function (done) {
   if (fs.existsSync("./docs")) {
      return gulp.src("./docs", {read: false}).pipe(clean())
   }
   done()
})

gulp.task("html:docs", function () {
   return gulp
      .src(["./src/html/**/*.html", "!./src/html/blocks/*"])
      .pipe(fileinclude())
      .pipe(htmlclean())
      .pipe(gulp.dest("./docs"))
})

gulp.task("sass:docs", function () {
   return (
      gulp
         .src("./src/sass/**/*.sass")
         .pipe(sassGlob())
         // .pipe(groupMedia())
         .pipe(sass())
         .pipe(autoprefixer())
         .pipe(csso())
         .pipe(gulp.dest("./docs/css"))
   )
})

gulp.task("copy-icons:docs", function () {
   return gulp.src("./src/icons/**/*").pipe(gulp.dest("./docs/icons"))
})
gulp.task("copy-fonts:docs", function () {
   return gulp.src("./src/fonts/**/*").pipe(gulp.dest("./docs/fonts"))
})
gulp.task("copy-mailer:docs", function () {
   return gulp.src("./src/phpmailer/**/*").pipe(gulp.dest("./docs/phpmailer"))
})
gulp.task("copy-js:docs", function () {
   return gulp.src("./src/js/**/*").pipe(gulp.dest("./docs/js"))
})
gulp.task("copy-root:docs", function () {
   return gulp.src("./src/*.+(txt|php)").pipe(gulp.dest("./docs/"))
})
gulp.task("copy-images:docs", function () {
   return gulp.src("./src/img/**/*").pipe(gulp.dest("./docs/img"))
})

gulp.task("server:docs", function () {
   return gulp.src("./docs/").pipe(
      server({
         livereload: true,
         open: true,
      })
   )
})

//---------------------------------------------------------

//Создание макро-задач-------------------------------------

gulp.task(
   "default",
   gulp.series(
      "clean:docs",
      gulp.parallel(
         "html:docs",
         "copy-icons:docs",
         "copy-fonts:docs",
         "copy-images:docs",
         "sass:docs",
         "copy-mailer:docs",
         "copy-js:docs",
         "copy-root:docs"
      ),
      gulp.series("server:docs")
   )
)
