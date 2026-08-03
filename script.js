function toggleTheme(){
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    document.getElementById('icon-moon').style.display = next==='light' ? 'block' : 'none';
    document.getElementById('icon-sun').style.display = next==='dark' ? 'block' : 'none';
  }
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  document.getElementById('icon-moon').style.display = prefersDark ? 'none' : 'block';
  document.getElementById('icon-sun').style.display = prefersDark ? 'block' : 'none';

  window.addEventListener('scroll', function(){
    var h = document.documentElement;
    var scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    document.getElementById('progress-fill').style.height = scrolled + '%';
  });

  (function(){
    var canHover = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!canHover || reduceMotion) return;

    document.body.classList.add('has-custom-cursor');
    var ring = document.getElementById('cursor-ring');
    var mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;
    var ringX = mouseX, ringY = mouseY;

    window.addEventListener('mousemove', function(e){
      mouseX = e.clientX; mouseY = e.clientY;
    });

    document.querySelectorAll('a, button, input, textarea').forEach(function(el){
      el.addEventListener('mouseenter', function(){ ring.classList.add('hover'); });
      el.addEventListener('mouseleave', function(){ ring.classList.remove('hover'); });
    });

    function loop(){
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = 'translate(' + ringX + 'px,' + ringY + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  })();

  document.getElementById('contact-form').addEventListener('submit', function(e){
    e.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value || ('Portfolio contact from ' + name);
    var message = document.getElementById('message').value;
    var subj = encodeURIComponent(subject);
    var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
    window.location.href = 'mailto:kumarrajakpawan93@gmail.com?subject=' + subj + '&body=' + body;
  });