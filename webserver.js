var browserSync = require('browser-sync').create();
browserSync.init({
		port: 8080,
    // browser: ["google chrome canary"],
    server: {
      baseDir: "./",
      directory: true
    }
  });