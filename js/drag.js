// drag.js - 드래그와 중력 애니메이션을 통합 관리

/* window.addEventListener("DOMContentLoaded", () => {
  const WALL_THICKNESS = 80;
  const MATTER_CONTAINER = document.querySelector("#skill_all");
  const MATTER_HELPER = document.querySelector("#helper");
  const domBodies = document.querySelectorAll("#skill_all .tag");

  let Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      World = Matter.World,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

  let engine = Engine.create();
  let render, runner;
  let matterBodies = {};
  let leftWall, rightWall, ground;
  let animationFrameId = null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        initMatter();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(MATTER_CONTAINER);

  function initMatter() {
    if (runner) Runner.stop(runner);
    if (render) Render.stop(render);

    createBounds();

    render = Render.create({
      element: MATTER_HELPER,
      engine: engine,
      background: "transparent",
      options: {
        width: MATTER_CONTAINER.offsetWidth,
        height: MATTER_CONTAINER.offsetHeight,
        wireframes: false
      }
    });

    Render.run(render);
    runner = Runner.create();
    Runner.run(runner, engine);

    createMatterBodies();
    World.add(engine.world, Object.values(matterBodies));
    Composite.add(engine.world, [leftWall, rightWall, ground]);

    const mouse = Mouse.create(render.canvas);
    console.log('Mouse created:', mouse); // ✅ 확인용
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } }
    });
    World.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    render.canvas.addEventListener("mousedown", () => {
      render.canvas.classList.add("grabbing");
    });
    render.canvas.addEventListener("mouseup", () => {
      render.canvas.classList.remove("grabbing");
    });

    window.requestAnimationFrame(updateElementPositions);
    window.addEventListener("resize", handleResize);
  }

  function createBounds() {
    const width = MATTER_CONTAINER.offsetWidth;
    const height = MATTER_CONTAINER.offsetHeight;

    ground = Bodies.rectangle(width / 2, height + WALL_THICKNESS / 2, 6000, WALL_THICKNESS, { isStatic: true });
    leftWall = Bodies.rectangle(-WALL_THICKNESS / 2, height / 2, WALL_THICKNESS, height * 5, { isStatic: true });
    rightWall = Bodies.rectangle(width + WALL_THICKNESS / 2, height / 2, WALL_THICKNESS, height * 5, { isStatic: true });
  }

  function createMatterBodies() {
    domBodies.forEach(domBody => {
      let body = Bodies.rectangle(
        MATTER_CONTAINER.offsetWidth / 2,
        -MATTER_CONTAINER.offsetHeight,
        domBody.offsetWidth,
        domBody.offsetHeight,
        {
          chamfer: { radius: domBody.offsetHeight / 2 },
          restitution: 0.9,
          density: Math.random() * 10,
          friction: 0.05,
          frictionAir: 0.01
        }
      );
      domBody.id = body.id;
      matterBodies[body.id] = body;
    });
  }

  function updateElementPositions() {
    domBodies.forEach(domBody => {
      const body = matterBodies[domBody.id];
      if (body) {
        domBody.style.transform = `translate(${body.position.x - domBody.offsetWidth / 2}px, ${body.position.y - domBody.offsetHeight / 2}px) rotate(${body.angle}rad)`;
      }
    });
    animationFrameId = window.requestAnimationFrame(updateElementPositions);
  }

  function handleResize() {
    render.canvas.width = MATTER_CONTAINER.offsetWidth;
    render.canvas.height = MATTER_CONTAINER.offsetHeight;
  }
}); */
// drag.js - 최적화된 중력 + 드래그 애니메이션 통합 버전

window.addEventListener("DOMContentLoaded", () => {
  const WALL_THICKNESS = 80;
  const MATTER_CONTAINER = document.querySelector("#skill_all");
  const MATTER_HELPER = document.querySelector("#helper");
  const domBodies = document.querySelectorAll("#skill_all .tag");

  let Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      World = Matter.World,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

  let engine = Engine.create();
  let render, runner;
  let matterBodies = {};
  let leftWall, rightWall, ground;
  let animationFrameId = null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        initMatter();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(MATTER_CONTAINER);

  function initMatter() {
    stopMatter();
    createBounds();

    render = Render.create({
      element: MATTER_HELPER,
      engine: engine,
      background: "transparent",
      options: {
        width: MATTER_CONTAINER.offsetWidth,
        height: MATTER_CONTAINER.offsetHeight,
        wireframes: false
      }
    });

    Render.run(render);
    runner = Runner.create();
    Runner.run(runner, engine);

    createMatterBodies();
    World.add(engine.world, Object.values(matterBodies));
    Composite.add(engine.world, [leftWall, rightWall, ground]);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } }
    });
    World.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    mouseConstraint.mouse.element.addEventListener("mousedown", () => {
      render.canvas.classList.add("grabbing");
    });
    mouseConstraint.mouse.element.addEventListener("mouseup", () => {
      render.canvas.classList.remove("grabbing");
    });

    window.requestAnimationFrame(updateElementPositions);
    window.addEventListener("resize", handleResize);
  }

  function stopMatter() {
    if (runner) Runner.stop(runner);
    if (render) {
      Render.stop(render);
      if (render.canvas.parentNode) {
        render.canvas.parentNode.removeChild(render.canvas);
      }
    }
    Matter.World.clear(engine.world);
    Matter.Engine.clear(engine);
    runner = null;
    render = null;
    animationFrameId = null;
    matterBodies = {};
  }

  function createBounds() {
    const width = MATTER_CONTAINER.offsetWidth;
    const height = MATTER_CONTAINER.offsetHeight;

    ground = Bodies.rectangle(width / 2, height + WALL_THICKNESS / 2, 6000, WALL_THICKNESS, { isStatic: true });
    leftWall = Bodies.rectangle(-WALL_THICKNESS / 2, height / 2, WALL_THICKNESS, height * 5, { isStatic: true });
    rightWall = Bodies.rectangle(width + WALL_THICKNESS / 2, height / 2, WALL_THICKNESS, height * 5, { isStatic: true });
  }

  function createMatterBodies() {
    domBodies.forEach(domBody => {
      const body = Bodies.rectangle(
        MATTER_CONTAINER.offsetWidth / 2,
        -MATTER_CONTAINER.offsetHeight,
        domBody.offsetWidth,
        domBody.offsetHeight,
        {
          chamfer: { radius: domBody.offsetHeight / 2 },
          restitution: 0.9,
          density: 10,
          friction: 0.05,
          frictionAir: 0.01
        }
      );
      domBody.id = body.id;
      matterBodies[body.id] = body;
    });
  }

  function updateElementPositions() {
    domBodies.forEach(domBody => {
      const body = matterBodies[domBody.id];
      if (body) {
        domBody.style.transform = `translate(${body.position.x - domBody.offsetWidth / 2}px, ${body.position.y - domBody.offsetHeight / 2}px) rotate(${body.angle}rad)`;
      }
    });
    animationFrameId = window.requestAnimationFrame(updateElementPositions);
  }

  function handleResize() {
    if (render) {
      render.canvas.width = MATTER_CONTAINER.offsetWidth;
      render.canvas.height = MATTER_CONTAINER.offsetHeight;
    }
  }
});
