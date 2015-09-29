module.exports = function (grunt) {
  grunt.initConfig({
    watch: {
      compass: {
        files: ['public/scss/styles.scss'],
        tasks: ['compass:dev']
      },
      postcss: {
        files: ['public/scss/styles.scss'],
        tasks: ['postcss']
      },
      //    options: {
      //         livereload: true,
      //     },
    },
    compass: {
      dev: {
        options: {
          sassDir: 'public/scss',
          cssDir: 'public/css',
          specify: ['public/scss/styles.scss'],
          imagesPath: 'images',
          noLineComments: false,
          // outputStyle: 'compressed'
        }
      }
    },
    // postcss: {
    //   options: {
    //     processors: [
    //       require('autoprefixer')({
    //         browsers: ['> 1%'] //, 'ie 8', 'ie 7', 'FirefoxAndroid', 'ExplorerMobile', 'ChromeAndroid'
    //       }).postcss,
    //     ]
    //   },
    //   dist: { src: 'public/css/*.css' }
    // },
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({
            browsers: ['last 2 versions']
          })
        ]
      },
      dist: {
        src: 'public/css/*.css'
      }
    },
    svg2png: {
        assets: {
            // specify files in array format with multiple src-dest mapping
            files: [
                // rasterize all SVG files in "img" and its subdirectories to "img/png"
                // { src: ['assets/img/*.svg'], dest: 'assets/img/png/' },
                // rasterize SVG file to same directory
                { src: ['public/images/*.svg'] }
            ]
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-svg2png');


  grunt.registerTask('default', ['svg2png']);
};
