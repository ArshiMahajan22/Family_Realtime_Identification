function preload(){}

function setup(){
    canvas = createCanvas(275, 275);
    canvas.position(500, 325);
    video = createCapture(VIDEO);
    video.hide();
    video.size(275, 275);

    Classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/7QB8LLOmA/model.json', modelLoaded);
}

function modelLoaded(){
    console.log("Ml5 Version", ml5.version);
    console.log("Model Loaded");
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("Object").innerHTML = results[0].label;
        document.getElementById("Confidence").innerHTML = results[0].confidence.toFixed(3) * 100 + "%";
    }
}

function draw(){
    image(video, 0, 0, 275, 275);
    Classifier.classify(video, gotResult);
}