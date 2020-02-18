# echo-cancellation-tester

This creates a simple website that tests a browser's ability to turn echo cancellation off.

Echo Cancellation seems to be a somewhat volatile feature. Different browsers and different versions of browsers appear to handle
it differently. This website attempts to evaluate a particular system with a small amount of code.

All of the code that relates to recording is in the folder `audio`.
 
That contains the following files:

`/src/audio/record.js`: Interface to the UI for both recording and playback

`/src/audio/init-gum.js`: The code that calls `getUserMedia()` with the different options.

`src/polyfill-media-recorder.js`: An alternate way of recording for browsers that don't support `MediaRecorder`. (Note: This only includes the features that this website requires. It is not a complete polyfill.)

`/src/audio/buffer-to-wav.js`: Code to turn the recorded buffers into the WAV format for playback or other processing. 

Thanks to
[Bryan Jenning's blog post](https://medium.com/@bryanjenningz/how-to-record-and-play-audio-in-javascript-faa1b2b3e49b)
and
[Matt Diamond's seminal project](https://github.com/mattdiamond/Recorderjs)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

## Deploy

This is hosted on Netlify. The deployment matches the `deploy` branch.
