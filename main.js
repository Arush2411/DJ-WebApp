song = "";
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;

function preload()
{
song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotposes);
}

function modelLoaded()
{
    console.log("PoseNet is Initialized");
}

function draw()
{
    image(video , 0 , 0 , 600 , 500);
    
    fill("#FF0000");
    stroke("#FF0000");

    
if(scorerightWrist > 0.2)
{
    circle(rightWristX , rightWristY , 20);
    if(rightWristY > 0 && rightWristY <= 100)
    {
        song.rate(0.5);
        document.getElementById("speed").innerHTML = "Speed = 0.5x" ;
    }
    else if(rightWristY > 100 && rightWristY <= 200)
    {
        song.rate(1);
        document.getElementById("speed").innerHTML = "Speed = 1x" ;
    }
    else if(rightWristY > 200 && rightWristY <= 300)
    {
        song.rate(1.5);
        document.getElementById("speed").innerHTML = "Speed = 1.5x" ;
    }
    else if(rightWristY > 300 && rightWristY <= 400)
    {
        song.rate(2);
        document.getElementById("speed").innerHTML = "Speed = 2x" ;
    }
    else if(rightWristY > 400 && rightWristY <= 500)
    {
        song.rate(2.5);
        document.getElementById("speed").innerHTML = "Speed = 2.5x" ;
    }
}

    if(scoreleftWrist > 0.2)
{
    circle(leftWristX , leftWristY , 20);
    InNumberLeftWrist = Number(leftWristY);
    remove_decimals = floor(InNumberLeftWrist);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);

}

}

function play()
{
    
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop()
{
    song.stop();
    document.getElementById("volume").innerHTML = "Volume"
    document.getElementById("speed").innerHTML = "Speed"
}

function gotposes(results)
{
if(results.length > 0)
{
console.log(results);
scoreleftWrist = results[0].pose.keypoints[9].score;
scorerightWrist = results[0].pose.keypoints[10].score;

console.log("scoreleftWrist = " + scoreleftWrist + " scorerightWrist = " + scorerightWrist);

leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.leftWrist.y;
console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristX);
console

rightWristX = results[0].pose.rightWrist.x;
rightWristY = results[0].pose.rightWrist.y;
console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
}
}
