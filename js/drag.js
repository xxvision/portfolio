// ✅ 드래그 애니메이션이 잘 작동하도록 수정된 main.js (Skills 영역)

window.addEventListener("DOMContentLoaded", () => {
    const WALL_THICKNESS = 80;
    const MATTER_CONTAINER = document.querySelector("#skill_all");
    const MATTER_HELPER = document.querySelector("#helper");
    const tags = document.querySelectorAll("#skill_all .tag");
  
    const {
        Engine, Render, Runner, World, Bodies,
        Composite, Mouse, MouseConstraint, Events // ← 이거 추가!
      } = Matter;
  
    let engine = Engine.create();
    let world = engine.world;
  
    let render = Render.create({
      element: MATTER_HELPER,
      engine: engine,
      options: {
        width: MATTER_CONTAINER.offsetWidth,
        height: MATTER_CONTAINER.offsetHeight,
        wireframes: false,
        background: "transparent",
      },
    });
  
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);
  
    // 벽
    const ground = Bodies.rectangle(
      MATTER_CONTAINER.offsetWidth / 2,
      MATTER_CONTAINER.offsetHeight + WALL_THICKNESS / 2,
      6000,
      WALL_THICKNESS,
      { isStatic: true }
    );
  
    const leftWall = Bodies.rectangle(
      -WALL_THICKNESS / 2,
      MATTER_CONTAINER.offsetHeight / 2,
      WALL_THICKNESS,
      MATTER_CONTAINER.offsetHeight * 5,
      { isStatic: true }
    );
  
    const rightWall = Bodies.rectangle(
      MATTER_CONTAINER.offsetWidth + WALL_THICKNESS / 2,
      MATTER_CONTAINER.offsetHeight / 2,
      WALL_THICKNESS,
      MATTER_CONTAINER.offsetHeight * 5,
      { isStatic: true }
    );
  
    Composite.add(world, [ground, leftWall, rightWall]);
  
    const bodies = [];
    tags.forEach((tag, i) => {
      const rect = tag.getBoundingClientRect();
      const x = Math.random() * (MATTER_CONTAINER.offsetWidth - rect.width) + rect.width / 2;
      const y = -Math.random() * 300;
  
      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        restitution: 0.9,
        friction: 0.3,
        render: { visible: false },
      });
  
      tag.style.position = 'absolute';
      tag.dataset.bodyIndex = i;
      bodies.push(body);
      World.add(world, body);
  
      // ✅ 드래그 시 스타일 추가
      tag.addEventListener("mousedown", () => {
        tag.classList.add("dragging");
      });
      document.addEventListener("mouseup", () => {
        tag.classList.remove("dragging");
      });
    });
  
    // 위치 반영
    Events.on(engine, 'afterUpdate', () => {
      tags.forEach((tag, i) => {
        const body = bodies[i];
        tag.style.transform = `translate(${body.position.x - tag.offsetWidth / 2}px, ${body.position.y - tag.offsetHeight / 2}px) rotate(${body.angle}rad)`;
      });
    });
  
    // 마우스
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: true }
      }
    });
  
    World.add(world, mouseConstraint);
    render.mouse = mouse;

    Events.on(mouseConstraint, "startdrag", (event) => {
        console.log("드래그 시작!", event.body);
        const body = event.body;
        const index = bodies.indexOf(body);
        if (index !== -1) {
          tags[index].classList.add("dragging");
        }
      });
      Events.on(mouseConstraint, "enddrag", (event) => {
        const body = event.body;
        const index = bodies.indexOf(body);
        if (index !== -1) {
          tags[index].classList.remove("dragging");
        }
      });
  
    // 리사이즈 대응
    window.addEventListener("resize", () => {
      render.canvas.width = MATTER_CONTAINER.offsetWidth;
      render.canvas.height = MATTER_CONTAINER.offsetHeight;
      Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: MATTER_CONTAINER.offsetWidth, y: MATTER_CONTAINER.offsetHeight },
      });
    });
  });
  
/* --------------------------------------------------------- */


  