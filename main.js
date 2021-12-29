Status = "";
objects = [];


function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("object_name").value;
}

function modelLoaded() {
    console.log("Model Loaded!");
    Status = true;
}

function gotResult(error, results)
{
  if(error)
  {
     console.error(error);
  }
  else
  {
      console.log(results);
      objects = results;
  }
}

function draw() {
    image(video, 0, 0, 380, 380);

    if(Status != "")
    {
     objectDetector.detect(video, gotResult);
       for(i = 0; i < objects.length; i++)
       {
           document.getElementById("status").innerHTML = "Status : Objects Detected";
 
           fill("hotpink");
           percent = floor(objects[i].confidence * 100);
           text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
           noFill();
           stroke("hotpink");
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

           if(objects[i].label==object_name)
           {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML = object_name + " Found ";
                synth = window.speechSynthesis;
                utterthis = new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(utterthis);
           }
           else {
            document.getElementById("status").innerHTML = object_name + " Not Found ";
           }
       }
    }
}

