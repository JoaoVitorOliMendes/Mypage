function openNav() {
    document.getElementById("mySidenav").style.width = "30%";
    document.getElementById("dark").style.display = "block";
    document.getElementById("dark").style.opacity = "80%";
  }

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("dark").style.display = "none";
  }

  var quot = document.getElementById("qt");
  var tw = document.getElementsByClassName("tweet-this");

  function quote()
  {
    var r = Math.floor((Math.random()*7)+1);
    console.log(r)
      switch (r) 
      {
        case 1:
        quot.innerHTML = "&nbsp&nbsp&nbsp&#8220It's not that I'm so smart, it's just that I stay with problems longer.&rdquo;<span>- Albert Einstein</span>";break;
        case 2:
        quot.innerHTML = "&nbsp&nbsp&nbsp&#8220Once we know the number one, we believe that we know the number two, because one plus one equals two. We forget that first, we must know the meaning of plus.&rdquo;<span>- Jean Luc Godard</span>";break;
        case 3:
        quot.innerHTML = "&nbsp&nbsp&nbsp&#8220No man ever steps in the same river twice, for it’s not the same river and he’s not the same man.&rdquo;<span>- Heraclitus</span>";break;   
        case 4:
        quot.innerHTML = "&nbsp&nbsp&nbsp&#8220There is but one truly serious philosophical problem and that is suicide. Judging whether life is or is not worth living amounts to answering the fundamental question of philosophy.&rdquo;<span>- Albert Camus</span>";break;   
        case 5:
        quot.innerHTML = "&nbsp&nbsp&nbsp&#8220I looked up at the mass of signs and stars in the night sky and laid myself open for the first time to the benign indifference of the world.&rdquo;<span>- Albert Camus</span>";break;   
        case 6:
        quot.innerHTML = "&nbsp&nbsp&nbsp&#8220The consequences of every act are included in the act itself.&rdquo;<span>- George Orwell</span>";break;   
        case 7:
        quot.innerHTML = "&nbsp&nbsp&nbsp&#8220My Dears... Happiness consists of being able to tell the truth without hurting anyone.&rdquo;<span>- Federico Fellini</span>";break;   
          default:
              break;
      }
      r = null;
      tw[0].style.opacity = 1;
    }
  function fadeq()
  {
    tw[0].style.transition = "opacity 1s";
    tw[0].style.opacity = 0, 1000;
    setTimeout(quote, 1000);
  }

  //Slides
  var slideIndex = 1;
  
  function plusSlides(n) {
      showSlides(slideIndex += n);
    }
    
    function currentSlide(n) {
      showSlides(slideIndex = n);
    }
  function showSlides(n) {
      console.log("slide");
      var i;
      var slides = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("dot");
      if (n > slides.length)
      {
        slideIndex = 1
      }    
      if (n < 1)
      {
        slideIndex = slides.length
      }
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none"; 
      }
      for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" ativo", "");
      }
      slides[slideIndex-1].style.display = "block"; 
      slides[slideIndex-1].style.opacity = 1; 
      dots[slideIndex-1].className += " ativo";
    }