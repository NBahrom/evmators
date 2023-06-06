/* $(document).ready(function(){
    
    $('.right__information').bind('scroll',chk_scroll);
});


function chk_scroll(e)
{
    var elem = $(e.currentTarget);
    if (elem[0].scrollHeight - elem.scrollTop() == elem.outerHeight())
    {
      document.querySelector(".white__block").style.display = 'none';
      document.querySelector(".white__block2").style.display = 'none';
    }
    else {
      document.querySelector(".white__block").style.display = 'block';
      document.querySelector(".white__block2").style.display = 'block';
    }

}; */

$(".right__information").scroll(function(){
  let whblock = document.querySelector('.white__block');
  let whblock2 = document.querySelector('.white__block2');
  if ( this.scrollHeight - Math.round(this.scrollTop) === this.clientHeight) {
    whblock.classList.toggle('hidden');
    whblock2.classList.toggle('hidden');
  }
  else{
    whblock.classList.remove('hidden');
    whblock2.classList.remove('hidden');
  }
 
});

document.addEventListener("wheel", function(e) {
    document.querySelector('right__information').scrollTo(0, document.getElementById('right__information').scrollTop + e.deltaY);
  }, true);

  document.addEventListener("wheel", function(e) {
    document.getElementById('right__information2').scrollTo(0, document.getElementById('right__information2').scrollTop + e.deltaY);
  }, true);