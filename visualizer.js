window.onload = function() {
    
    var file = document.getElementById("song");
    var audio = document.getElementById("audio");
    var image = document.getElementById("image");
    var state = 1;
    var frequency = document.getElementById("frequency");
    var freqstate = 1;
    var img = new Image();
    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    
    frequency.onchange = function() {
      console.log("new frequency");
      if(frequency.value == 256){
        freqstate = 1;
      }else if(frequency.value == 512){
        freqstate = 2;
      }
      else if(frequency.value == 1024){
        freqstate = 3
      }
      file.onchange;
    }

    function freq(){
      if(freqstate == 1){
        return 256;
      }else if(freqstate == 2){
        return 512;
      }else{
        return 1024;
      }
    }

    image.onchange = function() {
      console.log("new image");
      if(image.value == 1){
        console.log('black');
        state = 1;
      }else if(image.value == 2){
        img.src = "https://i.ibb.co/p0G7YyL/If-you-want-to-use-this-for-your-projects-or-something-else-please-request-permission-first-This-wor.jpg";
        console.log("retro")
        state = 2;
      }
      background();
    }
    
    function background(){
      if(state == 1){
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
      }else if(state == 2){
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, WIDTH, HEIGHT);
      }
    }

    file.onchange = function() {
      var files = this.files;
      audio.src = URL.createObjectURL(files[0]);
      audio.load();
      audio.play();
      var context = new AudioContext();
      var src = context.createMediaElementSource(audio);
      var analyser = context.createAnalyser();
  
      src.connect(analyser);
      analyser.connect(context.destination);
  
      analyser.fftSize = freq();
  
      var bufferLength = analyser.frequencyBinCount;
  
      var dataArray = new Uint8Array(bufferLength);
  
      var barWidth = (WIDTH / bufferLength) * 2.5;
      var barHeight;
      var x = 0;

      function visualize() {
        requestAnimationFrame(visualize);
  
        x = 0;
  
        analyser.getByteFrequencyData(dataArray);
        background();
        analyser.fftSize = freq();
  
        for (var i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i];
          
          var r = barHeight + (25 * (i/bufferLength));
          var g = 300 * (i/bufferLength);
          var b = 100;
  
          ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
          ctx.fillRect(x, HEIGHT - 2*barHeight, barWidth, 2*barHeight);
          x += barWidth + 1;
        }
      }
  
      audio.play();
      visualize();
    }
 };
  