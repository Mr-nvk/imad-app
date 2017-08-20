console.log('Loaded!');

var element=document.getElementById('main-text');
element.innerHTML='new value';

var img=document.getElementById('madi');
var marginLeft=0;
function moveRight(){
    marginLeft.marginLeft=+10;
    log.style.marginLeft=margin+'px';
    
}
img.onclick=function(){
    img.style.mrginleft='600px';
    var inrerval=setInterval(moveRight,100);
    
};