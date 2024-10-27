let cloudScales = [];
let cloudNumbers = [];

function preload(){
  whale = loadImage("https://raw.githubusercontent.com/shuyang-DM-GY-6063-2024Fall-B/MidTerm/main/whale.png")

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);


  for (let id = 0; id < 6; id++) {
    let cloudNumber = int(random(6,7)); 
    let cloudScaleArray = []; 


    for (let j = 0; j < cloudNumber; j++) {
      let cloudScale = random(70, 100);
      cloudScaleArray.push(cloudScale);
    }

    cloudScales.push(cloudScaleArray);
    cloudNumbers.push(cloudNumber);
  }
}

function clouds(x, y, time, scales, number) {
  push();
  noStroke()
  fill('black')
  translate(x, y);
  let gap = 0;

  for (let i = 0; i < number; i++) {
    let movement = sin(time + i*100) * 10; 
    let scale = scales[i];
    gap += scale * 0.6;
    if(i == number/2-1 || i == number/2 ||  i == number/2 + 1 ){
      ellipse(gap, movement, scale*1.5 + movement * 0.2,scale*1.2+ movement * 0.2);
    }   
    else{
      ellipse(gap, movement, scale+ movement * 0.2,scale*0.8+ movement * 0.2);
    }
  }
  pop();
}

function waterWave(x,y,wave,length,height,time){
  push()
  fill('black')
  translate(x,y)
  beginShape()
  vertex(0,height)
  for(let a =0; a<length*4; a++  ){
    vertex(a+sin(time), wave*sin(a)*sin(time));
  }
  vertex(length,height)
  endShape()
  pop()
  }

  function thunder(x,y,width,length,scale,time){
    translate(x,y);
    noStroke()
    push();
    fill('black')
    beginShape();
    vertex(0,0);
    vertex(-width,length);
    time = map(sin(time*10),-1,1,0,1);
    let distance = dist(0,length,scale,length-scale);
    vertex(-width,length);
    vertex(0,length);
    vertex(-width,2*length);
    vertex(distance*time,length-distance*time);
    vertex(-width+distance*time,length-distance*time);
    vertex(0,0);
    endShape()
    pop()
  }

  function ship(x,y,a,time){
    // shape of hull
    push();
    fill('black')
    translate(x,y);
    rotate(sin(time*10)*3)
    beginShape();
    vertex(0,0);
    vertex(a*21,0);
    vertex(a*17,a*5);
    vertex(a*8,a*5);
    vertex(a*5,a);
    vertex(a,a);
    vertex(0,0);
    endShape();

    // shape of mast

    fill('black');
    rect(14*a,-10*a,a*0.6,10*a);
    for(let i= 0; i<3;i++){
      let posy =i*3*a-9*a;
      let posx = 12*a-i*a*1.2
      fill('black');
      rect(posx,posy,4.6*a,a*0.3)
      fill('yellow');  

      beginShape()  
      vertex(posx,posy+a*0.3)  
      for( let pixel = 0; pixel< (2*a); pixel++){
        let distance = map(sin((180*pixel)/(2*a)),0,1,0,0.3*a);
        vertex(-distance*abs(sin(time*5))+posx,posy+0.3*a+pixel);
      }
      vertex(posx+4.6*a,posy+a*2.3)  
      vertex(posx+4.6*a,posy+a*0.3)  


      for (let pixel = 2*a; pixel > 0; pixel--) {
        let distance = map(sin((180 * pixel)/(2*a)),0,1,0,0.3*a);
        vertex(-distance*abs(sin(time*5))+posx+4.6*a,posy+ 0.3*a+pixel);
      }
      vertex(posx,posy+a*0.3)
      endShape()  
      a =a+2
    }
    a = a-3
    fill('black');
    rect(9*a,-10*a,a*0.6,10*a);
    for(let i= 0; i<3;i++){
      let posy =i*3*a-9*a;
      let posx = 7*a-i*a*0.8
      fill('black');
      rect(posx,posy,4.6*a,a*0.3)
      fill('yellow');  

      beginShape()  
      vertex(posx,posy+a*0.3)  
      for( let pixel = 0; pixel< (2*a); pixel++){
        let distance = map(sin((180*pixel)/(2*a)),0,1,0,0.3*a);
        vertex(-distance*abs(sin(time*5))+posx,posy+0.3*a+pixel);
      }
      vertex(posx+4.6*a,posy+a*2.3)  
      vertex(posx+4.6*a,posy+a*0.3)  


      for (let pixel = 2*a; pixel > 0; pixel--) {
        let distance = map(sin((180 * pixel)/(2*a)),0,1,0,0.3*a);
        vertex(-distance*abs(sin(time*5))+posx+4.6*a,posy+ 0.3*a+pixel);
      }
      vertex(posx,posy+a*0.3)
      endShape()  
      a =a+2
    }
    pop();
  }

function draw() {
  background(220);
  let time1 = millis() / 100; 


  // test clouds
  for (let id = 0; id < 6; id++) {
    clouds(300 + id * 150, 200 + id * 200, time1, cloudScales[id], cloudNumbers[id]);
  }
  // test sea
  waterWave(-width+(time1*10)%width,height-100,10,width*2,height,time1*10)
  // test thunder
  thunder(200,0,50,100,5,time1)

  // test ship
  ship(width/2,height/2,20,time1)
  image(whale,0,0,whale.width/4,whale.height/4)
  // for orginized picture,there will be three layers of wave,
  // about 6 clouds floation over sky.A rotating ship will sail on the sea, 
  // and a whale will move in response to the mouse. 
  // The title of this book will be placed at the top left of the image.
}

function mouseClicked(){
  // thunder will occur
}

