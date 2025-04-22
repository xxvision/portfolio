
// SCROLL TO EXPLORE 클릭시 ABOUT ME 페이지 시작점으로 스크롤 이동
document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.querySelector(".scroll_btn");
  const aboutSection = document.querySelector(".about1");

  scrollBtn.addEventListener("click", function (e) {
    e.preventDefault(); // a 태그 기본 동작 방지
    aboutSection.scrollIntoView({ behavior: "smooth" }); // 부드러운 스크롤
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.querySelector(".navMenu .aboutme");
  const aboutSection = document.querySelector(".about1");

  scrollBtn.addEventListener("click", function (e) {
    e.preventDefault(); // a 태그 기본 동작 방지
    aboutSection.scrollIntoView({ behavior: "smooth" }); // 부드러운 스크롤
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.querySelector(".navMenu .myworks");
  const aboutSection = document.querySelector(".my_works");

  scrollBtn.addEventListener("click", function (e) {
    e.preventDefault(); // a 태그 기본 동작 방지
    aboutSection.scrollIntoView({ behavior: "smooth" }); // 부드러운 스크롤
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.querySelector(".navMenu .contact");
  const aboutSection = document.querySelector("footer");

  scrollBtn.addEventListener("click", function (e) {
    e.preventDefault(); // a 태그 기본 동작 방지
    aboutSection.scrollIntoView({ behavior: "smooth" }); // 부드러운 스크롤
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.querySelector(".navMenu .myskills");
  const aboutSection = document.querySelector(".skills");

  scrollBtn.addEventListener("click", function (e) {
    e.preventDefault(); // a 태그 기본 동작 방지
    aboutSection.scrollIntoView({ behavior: "smooth" }); // 부드러운 스크롤
  });
});

// -----------------------------끝-----------------------------




$(function(){

  //스크롤 시작과 동시에 header에 class shrink줘서 옆으로 사라지게
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 0) {
      $("nav").addClass("shrink");
    } else {
      $("nav").removeClass("shrink");
    }
  });

  /* get in touch 호버시 이미지 움직임 */
  const git = document.querySelector('.git_footer');
  const footer = document.querySelector('footer');

  footer.addEventListener('mousemove', (e) => {
    const rect = footer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const moveX = (x / rect.width - 0.5) * 20; // -10 ~ +10
    const moveY = (y / rect.height - 0.5) * 20;

    git.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  footer.addEventListener('mouseleave', () => {
    git.style.transform = 'translate(0, 0)';
  });


  
  const typography = document.querySelector('.typography');
  const mainPage = document.querySelector('.main_page');

  mainPage.addEventListener('mousemove', (e) => {
    const rect = mainPage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const moveX = (x / rect.width - 0.5) * 20; // -10 ~ +10
    const moveY = (y / rect.height - 0.5) * 20;

    typography.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  mainPage.addEventListener('mouseleave', () => {
    typography.style.transform = 'translate(0, 0)';
  });
  

/*   $(window).on("scroll", function () {
    const footerTop = $("footer").offset().top;
    const scrollBottom = $(window).scrollTop() + $(window).height();
  
    if (scrollBottom >= footerTop) {
      $("header h1").css("color", "#333"); // 바꾸고 싶은 색으로!
    } else {
      $("header h1").css("color", "#fff"); // 기본 색
    }
  }); */


    //simply scroll about me
    $('.txtAniBox .txtAni').simplyScroll({
        speed : 4,
        pauseOnHover : true,
        pauseOnTouch : false,
        direction : 'forwards',
    });
    $('.logo').click(function(){
        $('nav').toggleClass("shrink");
    });





    AOS.init();

    const articles = document.querySelectorAll('article');

/* article hover 시 thum 마우스 커서 따라오게 */
articles.forEach(article => {
  const thum = article.querySelector('.thum1',);

  article.addEventListener('mousemove', (e) => {
    const rect = article.getBoundingClientRect();
    const x = e.clientX - rect.left + 190;
    const y = e.clientY - rect.top + 170;

    thum.style.left = `${x}px`;
    thum.style.top = `${y}px`;
  });
});




gsap.utils.toArray(".work-item").forEach((item, i, items) => {
  if (i === items.length - 1) return;

  gsap.to(item, {
    scale: 0.8, // ✅ 작아지는 효과
    ease: "none",
    scrollTrigger: {
      trigger: items[i + 1], // 다음 섹션이 올라오면 현재 섹션 줄어듦
      start: "top center",
      end: "top top",
      scrub: true
    }
  });
});

/* gsap.to(item, {
  scale: 0.8,
  opacity: 0.6, // 선택사항: 살짝 흐릿하게도 가능
  ease: "power1.out",
  scrollTrigger: {
    trigger: items[i + 1],
    start: "top center",
    end: "top top",
    scrub: true
  }
}); */






/* ------이미지 떨어지는 애니메이션---- */



const WALL_THICKNESS = 80;
 const MATTER_CONTAINER = document.querySelector("#skill_all");
 const MATTER_HELPER = document.querySelector("#helper");
 let Engine = Matter.Engine,
     Render = Matter.Render,
     Runner = Matter.Runner,
     Bodies = Matter.Bodies,
     World = Matter.World,
     Composite = Matter.Composite;

 let engine = Engine.create();
 let render = Render.create({
     element: MATTER_HELPER,
     engine: engine,
     background: "black",
     options: {
         width: MATTER_CONTAINER.offsetWidth,
         height: MATTER_CONTAINER.offsetHeight,
     },
 });

 let domBodies = document.querySelectorAll("#skill_all .tag");
 let matterBodies = {};
 let runner;
 let leftWall, rightWall, ground;

 // 해당 섹션 도달 시 모션 초기화 여부를 확인하는 플래그 변수
 let isInitialized = false;
 let animationFrameId = null; // 애니메이션 프레임 ID 저장

 // Intersection Observer로 특정 섹션 감지
 const observer = new IntersectionObserver(
     (entries) => {
         entries.forEach((entry) => {
             if (entry.isIntersecting && !isInitialized) {
                 // isInitialized = true;
                 resetMatterWorld(); // 기존 요소 초기화 및 삭제
                 init(); // 뷰포트에 노출된 상태 확인 및 애니메이션 실행
             }
         });
     },
     { threshold: 0.5 } // 섹션이 뷰포트에 얼마나 보여야 실행할지 설정
 );

 // #skill_all 섹션 감시 시작
 observer.observe(MATTER_CONTAINER);

 function resetMatterWorld() {
     stopAnimation(); // 기존 애니메이션 중지

     // DOM 요소 초기화
     domBodies.forEach((domBody) => {
         domBody.style.transform = ""; // transform 초기화
     });

     // Matter.js 월드 및 객체 초기화
     Matter.World.clear(engine.world, true); // 월드 클리어
     Matter.Engine.clear(engine); // 엔진 클리어
     matterBodies = {}; // 객체 맵 초기화

     if (runner) {
         Runner.stop(runner); // 기존 Runner 중지
         runner = null; // Runner 참조 초기화
     }

     if (render) {
         Render.stop(render); // 기존 Render 중지
         render.canvas.remove(); // 렌더링 캔버스 삭제
         render = null; // Render 참조 초기화
     }
 }

 function init() {
     if (runner) Runner.stop(runner); // 기존 Runner 중지
     if (render) Render.stop(render); // 기존 Render 중지

     createBounds(); // 경계 생성

     render = Render.create({
         element: MATTER_HELPER,
         engine: engine,
         background: "black",
         options: {
             width: MATTER_CONTAINER.offsetWidth,
             height: MATTER_CONTAINER.offsetHeight,
         },
     });

     Composite.add(engine.world, [leftWall, rightWall, ground]);

     Render.run(render); // 새 Render 실행

     runner = Runner.create(); // 새 Runner 생성
     Runner.run(runner, engine);

     createMatterBodies(); // Matter 객체 생성
     World.add(engine.world, Object.values(matterBodies));

     window.requestAnimationFrame(updateElementPositions); // 애니메이션 프레임 요청
     window.addEventListener("resize", () => handleResize());
 }


 function createBounds() {
     ground = Bodies.rectangle(
         MATTER_CONTAINER.offsetWidth / 2,
         MATTER_CONTAINER.offsetHeight + WALL_THICKNESS / 2,
         6000,
         WALL_THICKNESS,
         { isStatic: true }
     );

     leftWall = Bodies.rectangle(
         0 - WALL_THICKNESS / 2,
         MATTER_CONTAINER.offsetHeight / 2,
         WALL_THICKNESS,
         MATTER_CONTAINER.offsetHeight * 5,
         { isStatic: true }
     );

     rightWall = Bodies.rectangle(
         MATTER_CONTAINER.offsetWidth + WALL_THICKNESS / 2,
         MATTER_CONTAINER.offsetHeight / 2,
         WALL_THICKNESS,
         MATTER_CONTAINER.offsetHeight * 5,
         { isStatic: true }
     );
 }

 function createMatterBodies() {
     domBodies.forEach(function (domBody) {
         let matterBody = Bodies.rectangle(
             MATTER_CONTAINER.offsetWidth / 2,
             -MATTER_CONTAINER.offsetHeight,
             domBody.offsetWidth,
             domBody.offsetHeight,
             {
                 chamfer: {
                     radius: domBody.offsetHeight / 2,
                 },

                 restitution: 0.925,  // 탄성 설정
                 angle: Math.random() * 10,
                 density: Math.random() * 15, // 밀도 설정
                 friction: Math.random() * 50,// 표면 마찰 설정
                 frictionAir: Math.random() / 150,// 공기 저항 설정
             }
         );

         // 위치와 속도를 초기화
         Matter.Body.setPosition(matterBody, {
             x: MATTER_CONTAINER.offsetWidth / 2,
             y: -MATTER_CONTAINER.offsetHeight,
         });

         Matter.Body.setVelocity(matterBody, { x: 0, y: 0 }); // 속도 초기화
         Matter.Body.setAngularVelocity(matterBody, 0); // 회전 속도 초기화

         domBody.id = matterBody.id;
         matterBodies[matterBody.id] = matterBody;
     });
 }


 function updateElementPositions() {
     domBodies.forEach((domBody) => {
         let matterBody = matterBodies[domBody.id];

         if (matterBody) {
             domBody.style.transform =
                 `translate(${matterBody.position.x - domBody.offsetWidth / 2}px, ` +
                 `${matterBody.position.y - domBody.offsetHeight / 2}px) ` +
                 `rotate(${matterBody.angle}rad)`;
         }
     });
     // 다음 애니메이션 프레임 요청
     animationFrameId = window.requestAnimationFrame(updateElementPositions);
 }
 // 애니메이션 종료 함수
 function stopAnimation() {
     if (animationFrameId) {
         window.cancelAnimationFrame(animationFrameId); // 중복 호출 중지
         animationFrameId = null;
     }
 }
 function handleResize() {
     render.canvas.width = MATTER_CONTAINER.offsetWidth;
     render.canvas.height = MATTER_CONTAINER.offsetHeight;

     Matter.Render.setPixelRatio(render, window.devicePixelRatio);

     Matter.Body.setPosition(
         ground,
         Matter.Vector.create(
             MATTER_CONTAINER.offsetWidth / 2,
             MATTER_CONTAINER.offsetHeight + WALL_THICKNESS / 2
         )
     );

     Matter.Body.setPosition(
         leftWall,
         Matter.Vector.create(0 - WALL_THICKNESS / 2, MATTER_CONTAINER.offsetHeight / 2)
     );

     Matter.Body.setPosition(
         rightWall,
         Matter.Vector.create(
             MATTER_CONTAINER.offsetWidth + WALL_THICKNESS / 2,
             MATTER_CONTAINER.offsetHeight / 2
         )
     );
 }

 let Mouse = Matter.Mouse,
 MouseConstraint = Matter.MouseConstraint;
 let mouse = Mouse.create(render.canvas);
 let mouseConstraint = MouseConstraint.create(engine, {
     mouse: mouse,
     constraint: {
         stiffness: 0.2,
         render: {
             visible: false,
         },
     },
 });
 
 World.add(engine.world, mouseConstraint);
 render.mouse = mouse;

 function init() {
  if (runner) Runner.stop(runner);
  if (render) Render.stop(render);

  createBounds();

  render = Render.create({
      element: MATTER_HELPER,
      engine: engine,
      background: "transparent", // 배경 투명하게 변경 가능
      options: {
          width: MATTER_CONTAINER.offsetWidth,
          height: MATTER_CONTAINER.offsetHeight,
          wireframes: false, // 객체 디버깅용 선 비활성화
      },
  });

  Composite.add(engine.world, [leftWall, rightWall, ground]);

  Render.run(render);
  runner = Runner.create();
  Runner.run(runner, engine);

  createMatterBodies();
  World.add(engine.world, Object.values(matterBodies));

  // 💡 마우스 드래그 기능 추가
  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: { visible: false }
    }
  });

  World.add(engine.world, mouseConstraint);
  render.mouse = mouse;

  // 🎯 마우스 스타일 변경 (선택사항)
  mouseConstraint.mouse.element.addEventListener("mousedown", () => {
      render.canvas.classList.add("grabbing");
  });
  mouseConstraint.mouse.element.addEventListener("mouseup", () => {
      render.canvas.classList.remove("grabbing");
  });

  window.requestAnimationFrame(updateElementPositions);
  window.addEventListener("resize", () => handleResize());
}





console.log(Matter.Events);


domBodies.forEach((domBody) => {
  let matterBody = matterBodies[domBody.id];
  if (matterBody) {
    domBody.style.transform = `translate(${matterBody.position.x - domBody.offsetWidth / 2}px, ${matterBody.position.y - domBody.offsetHeight / 2}px) rotate(${matterBody.angle}rad)`;
  }
});

const draggableElements = document.querySelectorAll(".tag, .badge, .bubble");



  const cursor = document.querySelector('.custom-cursor');
  const workItems = document.querySelectorAll('.work-item');
  
  // 마우스 움직일 때 위치 업데이트
  document.addEventListener('mousemove', (e) => {
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
  });
  
  // work-item 위에서만 커서 보이기
  workItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      cursor.style.opacity = 1;
    });
  
    item.addEventListener('mouseleave', () => {
      cursor.style.opacity = 0;
    });
  });



});

