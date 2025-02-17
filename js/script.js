var canvas = document.getElementById("mazeC");
var ctx = canvas.getContext("2d");
var player = { x: 350, y: 3, width: 12, height: 12, speed: 1 };//x228 y0
var playerStart = { x: 228, y: 0, width: 12, height: 12, speed: 1 };
var timer = { seconds: 120, intervalId: null };
var finish = { x: 240, y: 475 }
var left = false;
var up = false;
var right = false;
var down = false;
var goggles = {x: 370, y: 9, width: 6, height: 6 };
var cGoggles=false;
var gVisited = false;

var mazeLines = [
{ x1: 2, y1: 2, x2: 226, y2: 2 },
{ x1: 242, y1: 2, x2: 482, y2: 2 },
{ x1: 66, y1: 18, x2: 98, y2: 18 },
{ x1: 114, y1: 18, x2: 130, y2: 18 },
{ x1: 178, y1: 18, x2: 290, y2: 18 },
{ x1: 338, y1: 18, x2: 386, y2: 18 },
{ x1: 402, y1: 18, x2: 434, y2: 18 },
{ x1: 18, y1: 34, x2: 50, y2: 34 },
{ x1: 66, y1: 34, x2: 162, y2: 34 },
{ x1: 194, y1: 34, x2: 210, y2: 34 },
{ x1: 258, y1: 34, x2: 306, y2: 34 },
{ x1: 322, y1: 34, x2: 338, y2: 34 },
{ x1: 386, y1: 34, x2: 418, y2: 34 },
{ x1: 2, y1: 50, x2: 34, y2: 50 },
{ x1: 50, y1: 50, x2: 66, y2: 50 },
{ x1: 98, y1: 50, x2: 130, y2: 50 },
{ x1: 146, y1: 50, x2: 178, y2: 50 },
{ x1: 242, y1: 50, x2: 258, y2: 50 },
{ x1: 290, y1: 50, x2: 322, y2: 50 },
{ x1: 370, y1: 50, x2: 386, y2: 50 },
{ x1: 402, y1: 50, x2: 434, y2: 50 },
{ x1: 466, y1: 50, x2: 482, y2: 50 },
{ x1: 18, y1: 66, x2: 34, y2: 66 },
{ x1: 66, y1: 66, x2: 146, y2: 66 },
{ x1: 162, y1: 66, x2: 194, y2: 66 },
{ x1: 210, y1: 66, x2: 242, y2: 66 },
{ x1: 258, y1: 66, x2: 290, y2: 66 },
{ x1: 306, y1: 66, x2: 322, y2: 66 },
{ x1: 338, y1: 66, x2: 402, y2: 66 },
{ x1: 34, y1: 82, x2: 50, y2: 82 },
{ x1: 82, y1: 82, x2: 130, y2: 82 },
{ x1: 146, y1: 82, x2: 162, y2: 82 },
{ x1: 178, y1: 82, x2: 258, y2: 82 },
{ x1: 274, y1: 82, x2: 290, y2: 82 },
{ x1: 322, y1: 82, x2: 338, y2: 82 },
{ x1: 354, y1: 82, x2: 370, y2: 82 },
{ x1: 386, y1: 82, x2: 418, y2: 82 },
{ x1: 450, y1: 82, x2: 466, y2: 82 },
{ x1: 50, y1: 98, x2: 66, y2: 98 },
{ x1: 162, y1: 98, x2: 178, y2: 98 },
{ x1: 194, y1: 98, x2: 210, y2: 98 },
{ x1: 242, y1: 98, x2: 274, y2: 98 },
{ x1: 290, y1: 98, x2: 322, y2: 98 },
{ x1: 338, y1: 98, x2: 354, y2: 98 },
{ x1: 370, y1: 98, x2: 386, y2: 98 },
{ x1: 34, y1: 114, x2: 82, y2: 114 },
{ x1: 114, y1: 114, x2: 130, y2: 114 },
{ x1: 194, y1: 114, x2: 242, y2: 114 },
{ x1: 258, y1: 114, x2: 290, y2: 114 },
{ x1: 306, y1: 114, x2: 322, y2: 114 },
{ x1: 354, y1: 114, x2: 370, y2: 114 },
{ x1: 386, y1: 114, x2: 434, y2: 114 },
{ x1: 450, y1: 114, x2: 466, y2: 114 },
{ x1: 2, y1: 130, x2: 34, y2: 130 },
{ x1: 98, y1: 130, x2: 114, y2: 130 },
{ x1: 130, y1: 130, x2: 194, y2: 130 },
{ x1: 226, y1: 130, x2: 258, y2: 130 },
{ x1: 322, y1: 130, x2: 386, y2: 130 },
{ x1: 402, y1: 130, x2: 450, y2: 130 },
{ x1: 466, y1: 130, x2: 482, y2: 130 },
{ x1: 2, y1: 146, x2: 34, y2: 146 },
{ x1: 50, y1: 146, x2: 66, y2: 146 },
{ x1: 130, y1: 146, x2: 146, y2: 146 },
{ x1: 162, y1: 146, x2: 178, y2: 146 },
{ x1: 226, y1: 146, x2: 242, y2: 146 },
{ x1: 274, y1: 146, x2: 290, y2: 146 },
{ x1: 306, y1: 146, x2: 354, y2: 146 },
{ x1: 386, y1: 146, x2: 402, y2: 146 },
{ x1: 66, y1: 162, x2: 98, y2: 162 },
{ x1: 114, y1: 162, x2: 130, y2: 162 },
{ x1: 146, y1: 162, x2: 162, y2: 162 },
{ x1: 178, y1: 162, x2: 194, y2: 162 },
{ x1: 242, y1: 162, x2: 274, y2: 162 },
{ x1: 338, y1: 162, x2: 466, y2: 162 },
{ x1: 2, y1: 178, x2: 18, y2: 178 },
{ x1: 34, y1: 178, x2: 50, y2: 178 },
{ x1: 82, y1: 178, x2: 114, y2: 178 },
{ x1: 130, y1: 178, x2: 162, y2: 178 },
{ x1: 194, y1: 178, x2: 210, y2: 178 },
{ x1: 226, y1: 178, x2: 242, y2: 178 },
{ x1: 274, y1: 178, x2: 290, y2: 178 },
{ x1: 354, y1: 178, x2: 370, y2: 178 },
{ x1: 402, y1: 178, x2: 450, y2: 178 },
{ x1: 18, y1: 194, x2: 34, y2: 194 },
{ x1: 50, y1: 194, x2: 66, y2: 194 },
{ x1: 146, y1: 194, x2: 178, y2: 194 },
{ x1: 194, y1: 194, x2: 274, y2: 194 },
{ x1: 290, y1: 194, x2: 322, y2: 194 },
{ x1: 338, y1: 194, x2: 386, y2: 194 },
{ x1: 402, y1: 194, x2: 418, y2: 194 },
{ x1: 2, y1: 210, x2: 18, y2: 210 },
{ x1: 34, y1: 210, x2: 82, y2: 210 },
{ x1: 178, y1: 210, x2: 194, y2: 210 },
{ x1: 274, y1: 210, x2: 354, y2: 210 },
{ x1: 370, y1: 210, x2: 402, y2: 210 },
{ x1: 418, y1: 210, x2: 450, y2: 210 },
{ x1: 18, y1: 226, x2: 34, y2: 226 },
{ x1: 82, y1: 226, x2: 98, y2: 226 },
{ x1: 114, y1: 226, x2: 146, y2: 226 },
{ x1: 194, y1: 226, x2: 242, y2: 226 },
{ x1: 274, y1: 226, x2: 338, y2: 226 },
{ x1: 434, y1: 226, x2: 466, y2: 226 },
{ x1: 18, y1: 242, x2: 50, y2: 242 },
{ x1: 98, y1: 242, x2: 130, y2: 242 },
{ x1: 226, y1: 242, x2: 290, y2: 242 },
{ x1: 322, y1: 242, x2: 338, y2: 242 },
{ x1: 370, y1: 242, x2: 434, y2: 242 },
{ x1: 450, y1: 242, x2: 482, y2: 242 },
{ x1: 50, y1: 258, x2: 66, y2: 258 },
{ x1: 82, y1: 258, x2: 146, y2: 258 },
{ x1: 178, y1: 258, x2: 210, y2: 258 },
{ x1: 258, y1: 258, x2: 322, y2: 258 },
{ x1: 338, y1: 258, x2: 354, y2: 258 },
{ x1: 386, y1: 258, x2: 402, y2: 258 },
{ x1: 434, y1: 258, x2: 466, y2: 258 },
{ x1: 2, y1: 274, x2: 50, y2: 274 },
{ x1: 66, y1: 274, x2: 98, y2: 274 },
{ x1: 130, y1: 274, x2: 178, y2: 274 },
{ x1: 210, y1: 274, x2: 258, y2: 274 },
{ x1: 306, y1: 274, x2: 338, y2: 274 },
{ x1: 354, y1: 274, x2: 402, y2: 274 },
{ x1: 418, y1: 274, x2: 434, y2: 274 },
{ x1: 466, y1: 274, x2: 482, y2: 274 },
{ x1: 34, y1: 290, x2: 82, y2: 290 },
{ x1: 98, y1: 290, x2: 130, y2: 290 },
{ x1: 146, y1: 290, x2: 194, y2: 290 },
{ x1: 290, y1: 290, x2: 306, y2: 290 },
{ x1: 354, y1: 290, x2: 370, y2: 290 },
{ x1: 402, y1: 290, x2: 418, y2: 290 },
{ x1: 450, y1: 290, x2: 466, y2: 290 },
{ x1: 18, y1: 306, x2: 50, y2: 306 },
{ x1: 66, y1: 306, x2: 82, y2: 306 },
{ x1: 162, y1: 306, x2: 178, y2: 306 },
{ x1: 194, y1: 306, x2: 226, y2: 306 },
{ x1: 258, y1: 306, x2: 274, y2: 306 },
{ x1: 306, y1: 306, x2: 370, y2: 306 },
{ x1: 386, y1: 306, x2: 402, y2: 306 },
{ x1: 450, y1: 306, x2: 482, y2: 306 },
{ x1: 34, y1: 322, x2: 66, y2: 322 },
{ x1: 82, y1: 322, x2: 98, y2: 322 },
{ x1: 114, y1: 322, x2: 162, y2: 322 },
{ x1: 194, y1: 322, x2: 210, y2: 322 },
{ x1: 226, y1: 322, x2: 242, y2: 322 },
{ x1: 290, y1: 322, x2: 338, y2: 322 },
{ x1: 370, y1: 322, x2: 418, y2: 322 },
{ x1: 434, y1: 322, x2: 466, y2: 322 },
{ x1: 34, y1: 338, x2: 50, y2: 338 },
{ x1: 66, y1: 338, x2: 82, y2: 338 },
{ x1: 98, y1: 338, x2: 178, y2: 338 },
{ x1: 210, y1: 338, x2: 258, y2: 338 },
{ x1: 274, y1: 338, x2: 322, y2: 338 },
{ x1: 338, y1: 338, x2: 434, y2: 338 },
{ x1: 450, y1: 338, x2: 482, y2: 338 },
{ x1: 18, y1: 354, x2: 34, y2: 354 },
{ x1: 50, y1: 354, x2: 66, y2: 354 },
{ x1: 146, y1: 354, x2: 194, y2: 354 },
{ x1: 242, y1: 354, x2: 274, y2: 354 },
{ x1: 290, y1: 354, x2: 338, y2: 354 },
{ x1: 354, y1: 354, x2: 386, y2: 354 },
{ x1: 434, y1: 354, x2: 450, y2: 354 },
{ x1: 2, y1: 370, x2: 34, y2: 370 },
{ x1: 66, y1: 370, x2: 114, y2: 370 },
{ x1: 130, y1: 370, x2: 146, y2: 370 },
{ x1: 178, y1: 370, x2: 210, y2: 370 },
{ x1: 290, y1: 370, x2: 306, y2: 370 },
{ x1: 370, y1: 370, x2: 402, y2: 370 },
{ x1: 434, y1: 370, x2: 466, y2: 370 },
{ x1: 114, y1: 386, x2: 178, y2: 386 },
{ x1: 210, y1: 386, x2: 322, y2: 386 },
{ x1: 338, y1: 386, x2: 354, y2: 386 },
{ x1: 386, y1: 386, x2: 402, y2: 386 },
{ x1: 450, y1: 386, x2: 482, y2: 386 },
{ x1: 18, y1: 402, x2: 34, y2: 402 },
{ x1: 66, y1: 402, x2: 82, y2: 402 },
{ x1: 98, y1: 402, x2: 130, y2: 402 },
{ x1: 146, y1: 402, x2: 162, y2: 402 },
{ x1: 194, y1: 402, x2: 210, y2: 402 },
{ x1: 354, y1: 402, x2: 370, y2: 402 },
{ x1: 434, y1: 402, x2: 466, y2: 402 },
{ x1: 18, y1: 418, x2: 50, y2: 418 },
{ x1: 82, y1: 418, x2: 194, y2: 418 },
{ x1: 226, y1: 418, x2: 258, y2: 418 },
{ x1: 290, y1: 418, x2: 354, y2: 418 },
{ x1: 386, y1: 418, x2: 418, y2: 418 },
{ x1: 34, y1: 434, x2: 82, y2: 434 },
{ x1: 130, y1: 434, x2: 178, y2: 434 },
{ x1: 194, y1: 434, x2: 210, y2: 434 },
{ x1: 242, y1: 434, x2: 274, y2: 434 },
{ x1: 306, y1: 434, x2: 322, y2: 434 },
{ x1: 370, y1: 434, x2: 402, y2: 434 },
{ x1: 418, y1: 434, x2: 466, y2: 434 },
{ x1: 18, y1: 450, x2: 50, y2: 450 },
{ x1: 82, y1: 450, x2: 130, y2: 450 },
{ x1: 178, y1: 450, x2: 194, y2: 450 },
{ x1: 210, y1: 450, x2: 226, y2: 450 },
{ x1: 274, y1: 450, x2: 306, y2: 450 },
{ x1: 322, y1: 450, x2: 370, y2: 450 },
{ x1: 402, y1: 450, x2: 434, y2: 450 },
{ x1: 466, y1: 450, x2: 482, y2: 450 },
{ x1: 2, y1: 466, x2: 34, y2: 466 },
{ x1: 98, y1: 466, x2: 146, y2: 466 },
{ x1: 162, y1: 466, x2: 210, y2: 466 },
{ x1: 242, y1: 466, x2: 290, y2: 466 },
{ x1: 306, y1: 466, x2: 322, y2: 466 },
{ x1: 354, y1: 466, x2: 370, y2: 466 },
{ x1: 450, y1: 466, x2: 466, y2: 466 },
{ x1: 2, y1: 482, x2: 242, y2: 482 },
{ x1: 258, y1: 482, x2: 482, y2: 482 },
{ x1: 2, y1: 2, x2: 2, y2: 482 },
{ x1: 18, y1: 18, x2: 18, y2: 34 },
{ x1: 18, y1: 66, x2: 18, y2: 114 },
{ x1: 18, y1: 162, x2: 18, y2: 178 },
{ x1: 18, y1: 210, x2: 18, y2: 226 },
{ x1: 18, y1: 242, x2: 18, y2: 258 },
{ x1: 18, y1: 290, x2: 18, y2: 354 },
{ x1: 18, y1: 386, x2: 18, y2: 450 },
{ x1: 34, y1: 2, x2: 34, y2: 18 },
{ x1: 34, y1: 50, x2: 34, y2: 66 },
{ x1: 34, y1: 82, x2: 34, y2: 114 },
{ x1: 34, y1: 146, x2: 34, y2: 194 },
{ x1: 34, y1: 226, x2: 34, y2: 242 },
{ x1: 34, y1: 258, x2: 34, y2: 274 },
{ x1: 34, y1: 354, x2: 34, y2: 386 },
{ x1: 50, y1: 18, x2: 50, y2: 82 },
{ x1: 50, y1: 130, x2: 50, y2: 146 },
{ x1: 50, y1: 162, x2: 50, y2: 178 },
{ x1: 50, y1: 194, x2: 50, y2: 226 },
{ x1: 50, y1: 274, x2: 50, y2: 290 },
{ x1: 50, y1: 322, x2: 50, y2: 418 },
{ x1: 50, y1: 466, x2: 50, y2: 482 },
{ x1: 66, y1: 2, x2: 66, y2: 18 },
{ x1: 66, y1: 34, x2: 66, y2: 50 },
{ x1: 66, y1: 66, x2: 66, y2: 98 },
{ x1: 66, y1: 130, x2: 66, y2: 194 },
{ x1: 66, y1: 226, x2: 66, y2: 274 },
{ x1: 66, y1: 306, x2: 66, y2: 322 },
{ x1: 66, y1: 354, x2: 66, y2: 386 },
{ x1: 66, y1: 402, x2: 66, y2: 482 },
{ x1: 82, y1: 50, x2: 82, y2: 66 },
{ x1: 82, y1: 98, x2: 82, y2: 146 },
{ x1: 82, y1: 178, x2: 82, y2: 194 },
{ x1: 82, y1: 210, x2: 82, y2: 258 },
{ x1: 82, y1: 290, x2: 82, y2: 306 },
{ x1: 82, y1: 322, x2: 82, y2: 354 },
{ x1: 82, y1: 386, x2: 82, y2: 402 },
{ x1: 82, y1: 418, x2: 82, y2: 434 },
{ x1: 82, y1: 450, x2: 82, y2: 466 },
{ x1: 98, y1: 34, x2: 98, y2: 50 },
{ x1: 98, y1: 82, x2: 98, y2: 162 },
{ x1: 98, y1: 194, x2: 98, y2: 226 },
{ x1: 98, y1: 274, x2: 98, y2: 354 },
{ x1: 98, y1: 370, x2: 98, y2: 402 },
{ x1: 98, y1: 434, x2: 98, y2: 450 },
{ x1: 98, y1: 466, x2: 98, y2: 482 },
{ x1: 114, y1: 98, x2: 114, y2: 114 },
{ x1: 114, y1: 130, x2: 114, y2: 162 },
{ x1: 114, y1: 178, x2: 114, y2: 242 },
{ x1: 114, y1: 258, x2: 114, y2: 274 },
{ x1: 114, y1: 306, x2: 114, y2: 322 },
{ x1: 114, y1: 354, x2: 114, y2: 370 },
{ x1: 114, y1: 418, x2: 114, y2: 434 },
{ x1: 130, y1: 18, x2: 130, y2: 34 },
{ x1: 130, y1: 66, x2: 130, y2: 98 },
{ x1: 130, y1: 114, x2: 130, y2: 146 },
{ x1: 130, y1: 162, x2: 130, y2: 210 },
{ x1: 130, y1: 274, x2: 130, y2: 306 },
{ x1: 130, y1: 338, x2: 130, y2: 370 },
{ x1: 130, y1: 386, x2: 130, y2: 402 },
{ x1: 130, y1: 434, x2: 130, y2: 450 },
{ x1: 146, y1: 2, x2: 146, y2: 18 },
{ x1: 146, y1: 50, x2: 146, y2: 66 },
{ x1: 146, y1: 82, x2: 146, y2: 114 },
{ x1: 146, y1: 146, x2: 146, y2: 162 },
{ x1: 146, y1: 194, x2: 146, y2: 258 },
{ x1: 146, y1: 290, x2: 146, y2: 322 },
{ x1: 146, y1: 354, x2: 146, y2: 370 },
{ x1: 146, y1: 450, x2: 146, y2: 466 },
{ x1: 162, y1: 2, x2: 162, y2: 34 },
{ x1: 162, y1: 66, x2: 162, y2: 82 },
{ x1: 162, y1: 114, x2: 162, y2: 130 },
{ x1: 162, y1: 146, x2: 162, y2: 162 },
{ x1: 162, y1: 210, x2: 162, y2: 274 },
{ x1: 162, y1: 370, x2: 162, y2: 402 },
{ x1: 162, y1: 434, x2: 162, y2: 482 },
{ x1: 178, y1: 18, x2: 178, y2: 50 },
{ x1: 178, y1: 82, x2: 178, y2: 114 },
{ x1: 178, y1: 162, x2: 178, y2: 258 },
{ x1: 178, y1: 306, x2: 178, y2: 338 },
{ x1: 178, y1: 402, x2: 178, y2: 418 },
{ x1: 194, y1: 34, x2: 194, y2: 82 },
{ x1: 194, y1: 130, x2: 194, y2: 162 },
{ x1: 194, y1: 194, x2: 194, y2: 210 },
{ x1: 194, y1: 226, x2: 194, y2: 242 },
{ x1: 194, y1: 274, x2: 194, y2: 306 },
{ x1: 194, y1: 322, x2: 194, y2: 402 },
{ x1: 194, y1: 418, x2: 194, y2: 450 },
{ x1: 210, y1: 50, x2: 210, y2: 66 },
{ x1: 210, y1: 98, x2: 210, y2: 194 },
{ x1: 210, y1: 210, x2: 210, y2: 258 },
{ x1: 210, y1: 274, x2: 210, y2: 290 },
{ x1: 210, y1: 306, x2: 210, y2: 322 },
{ x1: 210, y1: 338, x2: 210, y2: 354 },
{ x1: 210, y1: 402, x2: 210, y2: 434 },
{ x1: 210, y1: 450, x2: 210, y2: 466 },
{ x1: 226, y1: 18, x2: 226, y2: 50 },
{ x1: 226, y1: 82, x2: 226, y2: 98 },
{ x1: 226, y1: 130, x2: 226, y2: 178 },
{ x1: 226, y1: 194, x2: 226, y2: 210 },
{ x1: 226, y1: 242, x2: 226, y2: 274 },
{ x1: 226, y1: 290, x2: 226, y2: 306 },
{ x1: 226, y1: 322, x2: 226, y2: 338 },
{ x1: 226, y1: 354, x2: 226, y2: 450 },
{ x1: 226, y1: 466, x2: 226, y2: 482 },
{ x1: 242, y1: 18, x2: 242, y2: 66 },
{ x1: 242, y1: 98, x2: 242, y2: 114 },
{ x1: 242, y1: 162, x2: 242, y2: 178 },
{ x1: 242, y1: 210, x2: 242, y2: 226 },
{ x1: 242, y1: 242, x2: 242, y2: 258 },
{ x1: 242, y1: 274, x2: 242, y2: 322 },
{ x1: 242, y1: 338, x2: 242, y2: 370 },
{ x1: 242, y1: 386, x2: 242, y2: 402 },
{ x1: 242, y1: 434, x2: 242, y2: 450 },
{ x1: 242, y1: 466, x2: 242, y2: 482 },
{ x1: 258, y1: 66, x2: 258, y2: 82 },
{ x1: 258, y1: 114, x2: 258, y2: 130 },
{ x1: 258, y1: 146, x2: 258, y2: 162 },
{ x1: 258, y1: 178, x2: 258, y2: 194 },
{ x1: 258, y1: 210, x2: 258, y2: 242 },
{ x1: 258, y1: 258, x2: 258, y2: 290 },
{ x1: 258, y1: 306, x2: 258, y2: 322 },
{ x1: 258, y1: 370, x2: 258, y2: 386 },
{ x1: 258, y1: 402, x2: 258, y2: 418 },
{ x1: 258, y1: 434, x2: 258, y2: 466 },
{ x1: 274, y1: 34, x2: 274, y2: 66 },
{ x1: 274, y1: 82, x2: 274, y2: 98 },
{ x1: 274, y1: 130, x2: 274, y2: 146 },
{ x1: 274, y1: 210, x2: 274, y2: 226 },
{ x1: 274, y1: 274, x2: 274, y2: 370 },
{ x1: 274, y1: 402, x2: 274, y2: 434 },
{ x1: 290, y1: 2, x2: 290, y2: 18 },
{ x1: 290, y1: 66, x2: 290, y2: 82 },
{ x1: 290, y1: 98, x2: 290, y2: 194 },
{ x1: 290, y1: 274, x2: 290, y2: 306 },
{ x1: 290, y1: 354, x2: 290, y2: 370 },
{ x1: 290, y1: 402, x2: 290, y2: 466 },
{ x1: 306, y1: 18, x2: 306, y2: 34 },
{ x1: 306, y1: 66, x2: 306, y2: 98 },
{ x1: 306, y1: 114, x2: 306, y2: 178 },
{ x1: 306, y1: 226, x2: 306, y2: 242 },
{ x1: 306, y1: 290, x2: 306, y2: 306 },
{ x1: 306, y1: 386, x2: 306, y2: 402 },
{ x1: 306, y1: 466, x2: 306, y2: 482 },
{ x1: 322, y1: 2, x2: 322, y2: 18 },
{ x1: 322, y1: 34, x2: 322, y2: 50 },
{ x1: 322, y1: 98, x2: 322, y2: 114 },
{ x1: 322, y1: 162, x2: 322, y2: 194 },
{ x1: 322, y1: 258, x2: 322, y2: 290 },
{ x1: 322, y1: 322, x2: 322, y2: 338 },
{ x1: 322, y1: 370, x2: 322, y2: 402 },
{ x1: 322, y1: 434, x2: 322, y2: 466 },
{ x1: 338, y1: 18, x2: 338, y2: 34 },
{ x1: 338, y1: 50, x2: 338, y2: 66 },
{ x1: 338, y1: 82, x2: 338, y2: 130 },
{ x1: 338, y1: 146, x2: 338, y2: 178 },
{ x1: 338, y1: 242, x2: 338, y2: 258 },
{ x1: 338, y1: 274, x2: 338, y2: 290 },
{ x1: 338, y1: 306, x2: 338, y2: 322 },
{ x1: 338, y1: 338, x2: 338, y2: 370 },
{ x1: 338, y1: 386, x2: 338, y2: 434 },
{ x1: 338, y1: 450, x2: 338, y2: 466 },
{ x1: 354, y1: 18, x2: 354, y2: 66 },
{ x1: 354, y1: 178, x2: 354, y2: 274 },
{ x1: 354, y1: 290, x2: 354, y2: 306 },
{ x1: 354, y1: 322, x2: 354, y2: 338 },
{ x1: 354, y1: 354, x2: 354, y2: 386 },
{ x1: 354, y1: 418, x2: 354, y2: 434 },
{ x1: 370, y1: 34, x2: 370, y2: 50 },
{ x1: 370, y1: 66, x2: 370, y2: 114 },
{ x1: 370, y1: 130, x2: 370, y2: 146 },
{ x1: 370, y1: 210, x2: 370, y2: 258 },
{ x1: 370, y1: 306, x2: 370, y2: 322 },
{ x1: 370, y1: 370, x2: 370, y2: 466 },
{ x1: 386, y1: 2, x2: 386, y2: 18 },
{ x1: 386, y1: 34, x2: 386, y2: 50 },
{ x1: 386, y1: 82, x2: 386, y2: 98 },
{ x1: 386, y1: 114, x2: 386, y2: 130 },
{ x1: 386, y1: 146, x2: 386, y2: 194 },
{ x1: 386, y1: 210, x2: 386, y2: 226 },
{ x1: 386, y1: 274, x2: 386, y2: 290 },
{ x1: 386, y1: 338, x2: 386, y2: 354 },
{ x1: 386, y1: 402, x2: 386, y2: 418 },
{ x1: 386, y1: 450, x2: 386, y2: 482 },
{ x1: 402, y1: 18, x2: 402, y2: 34 },
{ x1: 402, y1: 50, x2: 402, y2: 66 },
{ x1: 402, y1: 98, x2: 402, y2: 114 },
{ x1: 402, y1: 130, x2: 402, y2: 146 },
{ x1: 402, y1: 178, x2: 402, y2: 210 },
{ x1: 402, y1: 226, x2: 402, y2: 258 },
{ x1: 402, y1: 274, x2: 402, y2: 306 },
{ x1: 402, y1: 354, x2: 402, y2: 402 },
{ x1: 402, y1: 434, x2: 402, y2: 466 },
{ x1: 418, y1: 66, x2: 418, y2: 98 },
{ x1: 418, y1: 146, x2: 418, y2: 162 },
{ x1: 418, y1: 210, x2: 418, y2: 226 },
{ x1: 418, y1: 258, x2: 418, y2: 274 },
{ x1: 418, y1: 290, x2: 418, y2: 322 },
{ x1: 418, y1: 338, x2: 418, y2: 434 },
{ x1: 418, y1: 450, x2: 418, y2: 466 },
{ x1: 434, y1: 18, x2: 434, y2: 114 },
{ x1: 434, y1: 146, x2: 434, y2: 162 },
{ x1: 434, y1: 194, x2: 434, y2: 210 },
{ x1: 434, y1: 226, x2: 434, y2: 290 },
{ x1: 434, y1: 306, x2: 434, y2: 338 },
{ x1: 434, y1: 370, x2: 434, y2: 418 },
{ x1: 434, y1: 466, x2: 434, y2: 482 },
{ x1: 450, y1: 2, x2: 450, y2: 66 },
{ x1: 450, y1: 82, x2: 450, y2: 98 },
{ x1: 450, y1: 114, x2: 450, y2: 146 },
{ x1: 450, y1: 178, x2: 450, y2: 210 },
{ x1: 450, y1: 274, x2: 450, y2: 306 },
{ x1: 450, y1: 338, x2: 450, y2: 354 },
{ x1: 450, y1: 418, x2: 450, y2: 466 },
{ x1: 466, y1: 18, x2: 466, y2: 50 },
{ x1: 466, y1: 66, x2: 466, y2: 114 },
{ x1: 466, y1: 146, x2: 466, y2: 226 },
{ x1: 466, y1: 258, x2: 466, y2: 274 },
{ x1: 466, y1: 354, x2: 466, y2: 370 },
{ x1: 466, y1: 402, x2: 466, y2: 434 },
{ x1: 482, y1: 2, x2: 482, y2: 482 },

];

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.strokeStyle = "brown";
    ctx.lineWidth = 2;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(player.x + player.width / 2, player.y + player.height / 2, player.width / 2, 0, Math.PI * 2);
    ctx.fill();
}

function drawMaze() {
    mazeLines.forEach(line => {
        drawLine(line.x1, line.y1, line.x2, line.y2);
    });
    if(!(cGoggles)){
    ctx.fillStyle = "red";
    ctx.fillRect(goggles.x, goggles.y, goggles.width, goggles.height); 
    checkCollisionWithGoggles(); //to tipo da kdr prides zravn da ti ga zbrise
    }   else if(cGoggles==true && gVisited == false) {
		startTimer();
        
		gVisited = true;
        }
    if(gVisited == true && timer.seconds > 110){
        drawSolution();
        player.x = 228;
        player.y = 0;
    }
// Draw goggles
}

function drawTimer() {
    document.getElementById("timer").innerHTML = "Timer: "+ timer.seconds.toString() + "s";
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
    clearCanvas();
    drawMaze();
    drawPlayer();
    drawTimer();
    
}

function startTimer() {
    timer.intervalId = setInterval(function () {
        timer.seconds--;
        update();
        if (timer.seconds <= 0) {
            clearInterval(timer.intervalId);
            alert("Time's up! Game Over!");
        }
    }, 1000);   
}



function movePlayer() {
    if (up && !isCollision(player.x, player.y - player.speed) && mazeEdges(player.x, player.y - player.speed)) {
        player.y -= player.speed;
    }
    if (down && !isCollision(player.x, player.y + player.speed)) {
        player.y += player.speed;
    }
    if (left && !isCollision(player.x - player.speed, player.y)) {
        player.x -= player.speed;
    }
    if (right && !isCollision(player.x + player.speed, player.y)) {
        player.x += player.speed;
    }
    if (player.x >= finish.x && player.x <= finish.x + player.width && player.y >= finish.y && player.y <= finish.y + player.height) {
        clearInterval(timer.intervalId);
        alert("Congratulations! You reached the end of the maze!");
    }
}

function isCollision(nextX, nextY) {
    for (let i = 0; i < mazeLines.length; i++) {
        const line = mazeLines[i];
        if (
            nextX < Math.max(line.x1, line.x2) &&
            nextX + player.width > Math.min(line.x1, line.x2) &&
            nextY < Math.max(line.y1, line.y2) &&
            nextY + player.height > Math.min(line.y1, line.y2)
        ) {
            return true;
        }
    }
    return false;
}

function mazeEdges(nextX, nextY) {
    if (nextY + player.speed > 0 && nextY + player.speed < 500)
        return true;
}

function checkCollisionWithGoggles() {
    if (
        player.x < goggles.x + goggles.width &&
        player.x + player.width > goggles.x &&
        player.y < goggles.y + goggles.height &&
        player.y + player.height > goggles.y
    ) {
        cGoggles=true;
        
}
    }
function drawPlayerAtStart(){
	player.x=228;
	player.y=0;

}
function drawSolution(){
        ctx.strokeStyle=('blue');
        ctx.beginPath();
        ctx.moveTo(234,2);
        ctx.lineTo(234,10);
        ctx.lineTo(170,10);
        ctx.lineTo(170,42);
        ctx.lineTo(138,42);
        ctx.lineTo(138,58);
        ctx.lineTo(90,58);
        ctx.lineTo(90,42);
        ctx.lineTo(74,42);
        ctx.lineTo(74,58);
        ctx.lineTo(58,58);
        ctx.lineTo(58,90);
        ctx.lineTo(42,90);
        ctx.lineTo(42,106);
        ctx.lineTo(74,106);
        ctx.lineTo(74,90);
        ctx.lineTo(90,90);
        ctx.lineTo(90,154);
        ctx.lineTo(74,154);
        ctx.lineTo(74,122);
        ctx.lineTo(42,122);
        ctx.lineTo(42,154);
        ctx.lineTo(58,154);
        ctx.lineTo(58,186);
        ctx.lineTo(42,186);
        ctx.lineTo(42,202);
        ctx.lineTo(26,202);
        ctx.lineTo(26,218);
        ctx.lineTo(42,218);
        ctx.lineTo(42,234);
        ctx.lineTo(58,234);
        ctx.lineTo(58,218);
        ctx.lineTo(74,218);
        ctx.lineTo(74,266);
        ctx.lineTo(106,266);
        ctx.lineTo(106,282);
        ctx.lineTo(122,282);
        ctx.lineTo(122,266);
        ctx.lineTo(154,266);
        ctx.lineTo(154,202);
        ctx.lineTo(170,202);
        ctx.lineTo(170,266);
        ctx.lineTo(202,266);
        ctx.lineTo(202,298);
        ctx.lineTo(218,298);
        ctx.lineTo(218,282);
        ctx.lineTo(234,282);
        ctx.lineTo(234,314);
        ctx.lineTo(218,314);
        ctx.lineTo(218,330);
        ctx.lineTo(202,330);
        ctx.lineTo(202,362);
        ctx.lineTo(218,362);
        ctx.lineTo(218,346);
        ctx.lineTo(234,346);
        ctx.lineTo(234,378);
        ctx.lineTo(250,378);
        ctx.lineTo(250,362);
        ctx.lineTo(266,362);
        ctx.lineTo(266,378);
        ctx.lineTo(282,378);
        ctx.lineTo(282,346);
        ctx.lineTo(330,346);
        ctx.lineTo(330,330);
        ctx.lineTo(346,330);
        ctx.lineTo(346,314);
        ctx.lineTo(362,314);
        ctx.lineTo(362,330);
        ctx.lineTo(426,330);
        ctx.lineTo(426,298);
        ctx.lineTo(442,298);
        ctx.lineTo(442,314);
        ctx.lineTo(474,314);
        ctx.lineTo(474,330);
        ctx.lineTo(442,330);
        ctx.lineTo(442,346);
        ctx.lineTo(426,346);
        ctx.lineTo(426,362);
        ctx.lineTo(458,362);
        ctx.lineTo(458,346);
        ctx.lineTo(474,346);
        ctx.lineTo(474,378);
        ctx.lineTo(442,378);
        ctx.lineTo(442,394);
        ctx.lineTo(474,394);
        ctx.lineTo(474,442);
        ctx.lineTo(458,442);
        ctx.lineTo(458,458);
        ctx.lineTo(474,458);
        ctx.lineTo(474,474);
        ctx.lineTo(442,474);
        ctx.lineTo(442,442);
        ctx.lineTo(410,442);
        ctx.lineTo(410,426);
        ctx.lineTo(378,426);
        ctx.lineTo(378,394);
        ctx.lineTo(394,394);
        ctx.lineTo(394,410);
        ctx.lineTo(410,410);
        ctx.lineTo(410,346);
        ctx.lineTo(394,346);
        ctx.lineTo(394,362);
        ctx.lineTo(362,362);
        ctx.lineTo(362,394);
        ctx.lineTo(346,394);
        ctx.lineTo(346,410);
        ctx.lineTo(362,410);
        ctx.lineTo(362,442);
        ctx.lineTo(330,442);
        ctx.lineTo(330,426);
        ctx.lineTo(298,426);
        ctx.lineTo(298,442);
        ctx.lineTo(314,442);
        ctx.lineTo(314,458);
        ctx.lineTo(298,458);
        ctx.lineTo(298,474);
        ctx.lineTo(250,474);
        ctx.lineTo(250,482);
        ctx.stroke();
}
function gameLoop() {
    movePlayer();
    update();
    requestAnimationFrame(gameLoop);
}

document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37:
        case 65:
            left = true;
            break;
        case 38:
        case 87:
            up = true;
            break;
        case 39:
        case 68:
            right = true;
            break;
        case 40:
        case 83:
            down = true;
            break;
    }
};

document.onkeyup = function (e) {
    switch (e.keyCode) {
        case 37:
        case 65:
            left = false;
            break;
        case 38:
        case 87:
            up = false;
            break;
        case 39:
        case 68:
            right = false;
            break;
        case 40:
        case 83:
            down = false;
            break;
    }
};

gameLoop();