import start from './gulp/gulp.dev.js';
import build from './gulp/gulp.build.js';

const processType = process.env.NODE_ENV.trim();

if(processType === 'development') {
	start();
} else {
	build();
}



