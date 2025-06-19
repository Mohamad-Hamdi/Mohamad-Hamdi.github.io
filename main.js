
  document.addEventListener("DOMContentLoaded", () => {
    // استهداف كل العناصر الكتابية
    const textElements = document.querySelectorAll("h1, h2,  h4");

    textElements.forEach(el => {
      el.classList.add("text-reveal");
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target); // عشان يحصل مرة واحدة بس
        }
      });
    }, { threshold: 0.6 });

    textElements.forEach(el => {
      observer.observe(el);
    });
  });



let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}


let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

const texts = ["مطور مواقع ويب", "مؤسس منصة \"لِتعلَم\"", "طالب في كلية الهندسة", "مسلم معتز بدينه"];
let i = 0;
const el = document.getElementById("text-switcher");

function switchText() {
  // Erase current text
  el.classList.remove("type");
  el.classList.add("erase");

  setTimeout(() => {
    // Set new text after erase
    i = (i + 1) % texts.length;
    el.textContent = texts[i];

    // Animate typing in
    el.classList.remove("erase");
    el.classList.add("type");
  }, 700); // match erase animation duration
}

// Initial typing effect
el.classList.add("type");

setInterval(switchText, 3000);

