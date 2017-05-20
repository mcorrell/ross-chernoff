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

var data;

var cloud_series;
var mountain_series;
var tree_series;

/*
  Some people don't like color in their paintings, and just want a baseline condition
  where all of the glyphs we use end up just black and white.
  Personally, I like to play with color and shade and just sort of explore with my world,
  but the wonderful thing about painting is that you can do whatever you want.
  It's your world, and it's important to have fun.
*/

var monochrome = false;

function preload(){
  data = loadTable("data/bobross.csv","csv","header");
}

function setup(){

  /*
    Here's a fun little dataset I thought we'd use: it's how many times different features
    appeared in each of the 31 seasons of The Joy of Painting.
    So the clouds will be counting clouds, the mountains mountains, and the trees trees.
    I think it's nice when things represent what they're supposed to, don't you?
  */

  cloud_series = data.getColumn("Clouds%").map(Number);
  mountain_series = data.getColumn("Mountains%").map(Number);
  tree_series = data.getColumn("Trees%").map(Number);


/*
  We'll just define each of our colors while we're at it:
*/

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

}

function draw(){
  /*
   Now first we're going to take a clean canvas that I've pre-treated with a coat of magic white.
   And what we're going to do today is visualize a set of wonderful little time series.
   I've got my own time series that I'm visualizing, but the wonderful thing about painting
   is that it's your world, you can visualize whatever time series you'd like.
  */

  createCanvas(900,450);
  background(255);
  noLoop();

  drawSimple();

}


function drawSimple(){
  /*
   Let's just make a very simple glyph-like representation of the time series for now.
   We'll get fancier with brushes and textures once we've got the basics under control.
  */
  drawSky();
  drawClouds();
  drawMountains();
  drawTrees();
  drawWater();

  /*
   And that's it! We've got a finished painting of three time series.
   See how easy that was? And you can create one too, all by yourself.

   Thanks for painting with me, I hope to see you all again real soon!
  */
}

function drawSky(){
  /*
   Let's choose just a real simple color for our sky, a mixture of thalo blue and white.
  */
  if(!monochrome)
    background(lerpColor(thalo_blue,titanium_white,0.75));
}

function drawClouds(){
  /*
   Now let's draw fluffy little titanium white clouds, just nice Catmull Rom splines
   control points for every data point.
  */
  var delta;
  delta = width/cloud_series.length;
  if(!monochrome){
    fill(titanium_white);
  }
  else{
    fill(0);
  }

  noStroke();
  beginShape();
  curveVertex(-delta/2.0,height/8);
  curveVertex(0,height/8);
  for(var i = 0;i<cloud_series.length;i++){
    curveVertex(i*delta + (delta/2.0), (height/8)+ (height/8*cloud_series[i]));
  }
  curveVertex(width , height/8);
  curveVertex(width + (delta/2.0) , height/8);
  endShape();

  /*
   This will give us a big cumulus cloud with a flat base. And that's great.
   But I like my happy clous to have a nice soft shape to them, so let's mirror
   it on the bottom side.
  */

  beginShape();
  curveVertex(-delta/2.0,height/8);
  curveVertex(0,height/8);
  for(var i = 0;i<cloud_series.length;i++){
    curveVertex(i*delta  + (delta/2.0), (height/8)- (height/8*cloud_series[i]));
  }
  curveVertex(width , height/8);
  curveVertex(width+(delta/2.0) , height/8);
  endShape();

  /*
    And finally, we'll fill in the gaps.
  */

  if(!monochrome){
    stroke(titanium_white);
  }
  else{
    stroke(0);
  }
  strokeWeight(2);
  line(0, height/8, width, height/8);

  /*
    Let's clean our brush and bring things back to normal.
    Just really beat the devil out of it!
  */

  strokeWeight(1);
  noStroke();
}

function drawMountains(){
  /*
   And now the big all-mighty mountains, with strong, big triangles for each value.
   We'll be using my "mountain mixture", which is van dyke brown with just a touch of dark sienna.
  */

  var mountain_mix = monochrome ? color(0) : lerpColor(van_dyke_brown,dark_sienna,0.2);
  fill(mountain_mix);
  delta = width/mountain_series.length;

  for(var i = 0;i<mountain_series.length;i++){
    triangle(((i-1) * delta) + (delta/2),height/2,(i * delta) + (delta/2), height/2 - ((height/4)*mountain_series[i]), ((i+1) * delta) + (delta/2), height/2);
  }

  /*
   Let's have the bottom of our mountains recede just a little bit, creating the illusion of mist.
   With our magic white canvas, these kinds of effects can happen automatically.
  */

  var lerpAmount = 0;
  var mheight = height/2;
  var lerpDelta = 1.5/mheight;
  for(var i = 0;i<mheight;i++){
    stroke(lerpColor(mountain_mix, color(255,0), lerpAmount));
    line(0,i + mheight, width, i + mheight);
    lerpAmount+= lerpDelta;
  }
  noStroke();
}

function drawTrees(){
  /*
   Let's add a line of happy little trees!
   We'll just plop down a tree at regular intervals, linearly interpolating between values.
  */

  var tHeight,index,tColor;

  /*
    We want these trees to recede into the background, so we'll make them sap green with a touch of
    van dyke brown.
  */

  tColor = lerpColor(sap_green,van_dyke_brown,0.45);

  for(var i = -delta/2;i<width+delta/2;i+=4){
    index = map(i,delta/2,width-delta/2,0,tree_series.length-1);
    index = constrain(index,0,tree_series.length-1);
    tHeight = ((height/4) * lerp( tree_series[floor(index)], tree_series[ceil(index)], index - floor(index)));
    drawTree(i,3*(height/4),40,tHeight,tColor);
  }

  /*
  Just by making our trees lighter, we can bring them into the foreground, and create the illusion
  of a deep forest.
  */

  tColor = lerpColor(sap_green,van_dyke_brown,0.25);

  for(var i = -delta/2;i<width+delta/2;i+=8 + 10*random()){
    index = map(i,delta/2,width-delta/2,0,tree_series.length-1);
    index = constrain(index,0,tree_series.length-1);
    tHeight = ((height/4) * lerp( tree_series[floor(index)], tree_series[ceil(index)], index - floor(index)));
    drawTree(i,3*(height/4),30,tHeight,tColor);
  }

  /*
    And we want to make sure we're interpolating our points, so let's add a line
    of extra trees in front.
    These should be a little brighter, so they pop out right into the foreground,
    so we'll load up our brush with sap green, and to that we'll add just a little bit of cadmium yellow.
    The cad yellow is a strong color, so it only takes a little bit!
  */

  tColor = lerpColor(sap_green,cadmium_yellow,0.1);

  delta = width/mountain_series.length;
  for(var i = 0;i<tree_series.length;i++){
    drawTree((i*delta) + (delta/2), 3*(height/4), 35, (height/4) * tree_series[i],tColor);
  }

}

function drawTree(x,y,w,h,tColor){
  var maxHeight = (height/4);
  /*
    For the trunk of our tree, we'll use just a thin line of van dyke brown, just showing the suggestion
    of a trunk.
  */

  if(!monochrome){
    fill(van_dyke_brown);
  }
  else{
    fill(0);
  }
  triangle(x-1,y,x,y-h,x+1,y);

  if(!monochrome){
    fill(tColor);
  }
  else{
    fill(0);
  }

  /*
    For our branches, we'll just use our fan brush, a just push in a spray of needles.
    Growing up in Alaska, there would always be these big beautiful fir trees.
 */
  var maxLayers = 7;
  var layerHeight = maxHeight/maxLayers;
  var layers = floor(map(h,0,maxHeight,0,maxLayers));
  var layerWidth;
  for(var i = 1;i<layers;i++){
    layerWidth = (layerHeight*(layers-i)) * (w/h);
    triangle(x, y-(layerHeight*(i+1)), x - (layerWidth/2), y-(layerHeight*(i-1)), x + (layerWidth/2), y-(layerHeight*(i-1)));
  }

  /*
    And we can't forget just a happy little tree top.
  */

  layerWidth = (layerHeight) * (w/h);
  triangle(x, y-h, x - (layerWidth/2), y-h+(2*layerHeight), x + (layerWidth/2), y-h+(2*layerHeight));
}

function drawWater(){
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
}
