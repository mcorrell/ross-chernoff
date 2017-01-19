/*
 Hello everybody, and welcome to the Ross extension to Chernoff faces.
 What we'll be doing today is making a very simple glyph that encodes three seperate time series.
 You'll see all the colors you'll need for today's painting on your screen right below me.
*/

var titanium_white;
var thalo_blue;
var prussian_blue;
var midnight_black;
var dark_sienna;
var van_dyke_brown;
var alizarin_crimson;
var sap_green;
var cadmium_yellow;
var yellow_ochre;
var indian_yellow;
var bright_red;

/*
 And here are our time series. I've already gone ahead and normalized them to the range [0,1],
 but you'll need to do that yourself if you've got your own.
 And of course everybody has their own normalization scheme, maybe you want a common axis.
 That's a-okay with me, so long as everything fits neatly into [0,1]!
 
 If you really want to take things up an extra notch, you could sort the series by frequency.
 I think the tree line is great for those wavey little high frequency series, whereas the clouds
 and mountains I think could use some more sedate, lower frequency signals.
*/

var cloud_series = [0.4,0.2,0.0,0.8];
var mountain_series = [0.8,0.2,0.4,0.0];
var tree_series = [0.0,0.2,0.4,0.8];

function setup(){
  
  titanium_white = color(255,255,255);
  thalo_blue = color(0,15,137);
  prussian_blue = color(0,49,83);
  midnight_black = color(0,0,0);
  dark_sienna = color(60,20,20);
  van_dyke_brown = color(88,70,48);
  alizarin_crimson = color(227,38,54);
  sap_green = color(80,125,42);
  cadmium_yellow = color(255,246,0);
  yellow_ochre = color(204,170,43);
  indian_yellow = color(227,168,87);
  bright_red = color(170,1,20);
  
  /*
   Now first we're going to take a clean canvas that I've pre-treated with a coat of magic white.
   And what we're going to do today is visualize a set of wonderful little time series.
   I've got my own time series that I'm visualizing, but the wonderful thing about painting
   is that it's your world, you can visualize whatever time series you'd like.
  */
  
  createCanvas(450,450);
  noLoop();
}

function draw(){
  
  drawSimple();
  
}


function drawSimple(){
  /*
   Let's just make a very simple glyph-like representation of the time series for now.
   We'll get fancier with brushes and textures once we've got the basics under control.
  */
  
  /*
   Let's choose just a real simple color for our sky, a mixture of thalo blue and white.
  */
  
  background(lerpColor(thalo_blue,titanium_white,0.75));
  
  var delta;
  delta = width/cloud_series.length;
  
  /*
   Now let's draw fluffy little titanium white clouds, just big circles for each value.
  */
  
  fill(titanium_white);
  for(var i = 0;i<cloud_series.length;i++){
    stroke(titanium_white);
    line(i*delta, height/8, (i+1)*delta, height/8);
    noStroke();
    ellipse(i*delta + (delta/2),height/8,delta,height/8*cloud_series[i]);
  }
  
  /*
   And now the big all-mighty mountains, with strong, big triangles for each value.
   We'll be using my "mountain mixture", which is van dyke brown with just a touch of dark sienna.
  */
  
  var mountain_mix = lerpColor(dark_sienna,van_dyke_brown,0.8);
  fill(mountain_mix);
  delta = width/mountain_series.length;
  
  for(var i = 0;i<mountain_series.length;i++){
    triangle(i*delta,height/2,(i * delta) + (delta/2), height/2 - ((height/4)*mountain_series[i]), (i+1)*delta, height/2);
  }
  
  /*
   Let's have the bottom of our mountains recede just a little bit, creating the illusion of mist.
  */
  
  var lerpAmount = 0;
  for(var i = 0;i<height/4;i++){
    stroke(lerpColor(mountain_mix, color(255,0), lerpAmount));
    line(0,i + (height/2), width, i + (height/2));
    lerpAmount+= 1/(height);
  }
  noStroke();
  
  /*
   Let's add a line of happy little trees! We'll load up our brush with sap green, and to that we'll add
   just a little bit of cadmium yellow. The cad yellow is a strong color, so it only takes a little bit!
   We'll just plop down a tree at regular intervals, linearly interpolating between values.
  */
  
  var tHeight,index;
  fill(lerpColor(sap_green,cadmium_yellow,0.1));
  for(var i = 0;i<width;i+=10){
    index = map(i,0,width,0,tree_series.length-1);
    tHeight = ((height/4) * lerp( tree_series[floor(index)], tree_series[ceil(index)], index - floor(index)));
    triangle( i, 3*(height/4), i + 5, 3*(height/4) - tHeight, i + 10, 3*(height/4));
  }
  
  /*
   Finally, we'll add some water down at the bottom of our painting. By just querying the raster, blurring it, and then
   flipping it, we get these neat reflection effects automatically.
  */
  
  var img = get(0,0,width,3*height/4);
  push();
  scale(1.0,-1.0);
  img.filter("BLUR",4);
  image(img,0,-3*height/4,width,-height/4);
  pop();
  
  /*
   A couple of straight white lines help define the shore, and makes the waterline sparkle.
  */
  
  stroke(titanium_white);
  strokeWeight(2);
  line(0,3*height/4,width,3*height/4);
  
  strokeWeight(1);
  line(0,3*height/4 + 3,width,3*height/4 + 3);
  
  strokeWeight(0.5);
  line(0,3*height/4 + 6,width,3*height/4 + 6);
  
  strokeWeight(0.25);
  line(0,3*height/4 + 8,width,3*height/4 + 8);
  
  /*
   And that's it! We've got a finished painting of three time series.
   See how easy that was? And you can create one too, all by yourself.
   
   Thanks for painting with me, I hope to see you all again real soon!
  */
}