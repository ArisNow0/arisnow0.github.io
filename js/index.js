// Пока я писал этот сайт я слушал Trap Royalty

function initBlackHole() {
    const canvas = document.getElementById('spaceCanvas');
    const gl = canvas.getContext('webgl');
    if (!gl) {
        alert("WebGL not supported");
        return;
    }

    const vsSource = `
          attribute vec2 a_position;
          void main() {
            gl_Position = vec4(a_position, 0.0, 1.0);
          }
        `;

    const fsSource = `
precision mediump float;
uniform float t;
uniform vec2 r;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

vec2 myTanh(vec2 x) {
  vec2 ex = exp(x);
  vec2 emx = exp(-x);
  return (ex - emx) / (ex + emx);
}

void main() {
  vec4 o_bg = vec4(0.0);
  vec4 o_anim = vec4(0.0);
  vec4 o_stars = vec4(0.0);

  vec2 uv = gl_FragCoord.xy / r;
  vec2 p_img = (gl_FragCoord.xy * 2.0 - r) / r.y * mat2(1.0, -1.0, 1.0, 1.0);


vec2 center = r * 0.5;
vec2 toUV = gl_FragCoord.xy - center;

float angle = -0.05 * t;
mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
vec2 rotated = rotation * toUV + center;

vec2 starCell = floor(rotated / 20.0);
vec2 local = mod(rotated, 20.0) - 10.0;

float starSeed = hash(starCell);
if (starSeed > 0.996) {
  float d = length(local) / 3.0;
  float intensity = smoothstep(1.0, 0.0, d); 
  o_stars = vec4(vec3(intensity), 1.0);
}


  vec2 l_val = myTanh(p_img * 5.0 + 2.0);
  l_val = min(l_val, l_val * 3.0);
  vec2 clamped = clamp(l_val, -2.0, 0.0);
  float diff_y = clamped.y - l_val.y;
  float safe_px = abs(p_img.x) < 0.001 ? 0.001 : p_img.x;
  float term = (0.1 - max(0.01 - dot(p_img, p_img) / 200.0, 0.0) * (diff_y / safe_px))
               / abs(length(p_img) - 0.7);
  o_bg += vec4(term);
  o_bg *= max(o_bg, vec4(0.0));

  vec2 p_anim = (gl_FragCoord.xy * 2.0 - r) / r.y / 0.7;
  vec2 d = vec2(-1.0, 1.0);
  float denom = 0.1 + 5.0 / dot(5.0 * p_anim - d, 5.0 * p_anim - d);
  vec2 c = p_anim * mat2(1.0, 1.0, d.x / denom, d.y / denom);
  vec2 v = c;
  v *= mat2(cos(log(length(v)) + t * 0.2 + vec4(0.0, 33.0, 11.0, 0.0))) * 5.0;
  vec4 animAccum = vec4(0.0);
  for (int i = 1; i <= 9; i++) {
    float fi = float(i);
    animAccum += sin(vec4(v.x, v.y, v.y, v.x)) + vec4(1.0);
    v += 0.7 * sin(vec2(v.y, v.x) * fi + t) / fi + 0.5;
  }
  vec4 animTerm = 1.0 - exp(-exp(c.x * vec4(0.6, -0.4, -1.0, 0.0))
                    / animAccum
                    / (0.1 + 0.1 * pow(length(sin(v / 0.3) * 0.2 + c * vec2(1.0, 2.0)) - 1.0, 2.0))
                    / (1.0 + 7.0 * exp(0.3 * c.y - dot(c, c)))
                    / (0.03 + abs(length(p_anim) - 0.7)) * 0.2);
  o_anim += animTerm;

  vec4 finalColor = clamp(o_stars + mix(o_bg, o_anim, 0.5) * 1.5, 0.0, 1.0);
  gl_FragColor = finalColor;
}`;

    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compile failed with: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    function createProgram(gl, vsSource, fsSource) {
        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program failed to link: ' + gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return null;
        }
        return program;
    }

    const program = createProgram(gl, vsSource, fsSource);
    gl.useProgram(program);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const timeLocation = gl.getUniformLocation(program, 't');
    const resolutionLocation = gl.getUniformLocation(program, 'r');

    const vertices = new Float32Array([
        -1, -1,
        1, -1,
        -1, 1,
        -1, 1,
        1, -1,
        1, 1,
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
    window.addEventListener('resize', resize);
    resize();

    let startTime = performance.now();

    function render() {
        let currentTime = performance.now();
        let delta = (currentTime - startTime) / 1000;
        gl.uniform1f(timeLocation, delta);
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}
function initSpaceBackground() {
    const canvas = document.getElementById('spaceCanvass');
    const ctx = canvas.getContext('2d');

    let stars = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        generateStars();
    }

    function generateStars() {
        stars = [];
        const numStars = Math.floor(canvas.width * canvas.height / 8000);
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                speed: Math.random() * 0.3 + 0.1
            });
        }
    }

    function drawStars() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'white';
        for (let star of stars) {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
            ctx.fill();

            star.y += star.speed;
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        }
    }

    function animate() {
        drawStars();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    animate();
}
function initGlass() {
  const panel = document.querySelector('.glass-panel');
  const W = panel.clientWidth;
  const H = panel.clientHeight;

  // Удаляем старые треугольники
  panel.querySelectorAll('.glass-triangle').forEach(el => el.remove());

  const pointsCount = 12; // оптимизация
  const points = [
    [0, 0],
    [W, 0],
    [0, H],
    [W, H],
    ...Array.from({ length: pointsCount }, () => [
      Math.random() * W,
      Math.random() * H
    ])
  ];

  const delaunay = d3.Delaunay.from(points);
  const triangles = delaunay.triangles;
  const center = points[Math.floor(Math.random() * points.length)];
  const fragments = [];

  function setPolygonClip(element, points) {
    const polygon = points.map(p => `${p[0]}px ${p[1]}px`).join(', ');
    element.style.clipPath = `polygon(${polygon})`;
    element.style.webkitClipPath = `polygon(${polygon})`;
  }

  for (let i = 0; i < triangles.length; i += 3) {
    const [p0, p1, p2] = [points[triangles[i]], points[triangles[i+1]], points[triangles[i+2]]];

    const xs = [p0[0], p1[0], p2[0]];
    const ys = [p0[1], p1[1], p2[1]];
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);

    const width = maxX - minX;
    const height = maxY - minY;

    const div = document.createElement('div');
    div.className = 'glass-triangle';
    div.style.left = minX + 'px';
    div.style.top = minY + 'px';
    div.style.width = width + 'px';
    div.style.height = height + 'px';

    const relativePoints = [
      [p0[0] - minX, p0[1] - minY],
      [p1[0] - minX, p1[1] - minY],
      [p2[0] - minX, p2[1] - minY]
    ];
    setPolygonClip(div, relativePoints);

    panel.appendChild(div);

    const triCenterX = (p0[0] + p1[0] + p2[0]) / 3;
    const triCenterY = (p0[1] + p1[1] + p2[1]) / 3;

    let dirX = triCenterX - center[0];
    let dirY = triCenterY - center[1];
    const length = Math.sqrt(dirX * dirX + dirY * dirY);
    if (length !== 0) {
      dirX /= length;
      dirY /= length;
    }

    const distance = 80 + Math.random() * 120;

    fragments.push({
      element: div,
      translateX: dirX * distance,
      translateY: dirY * distance,
      rotation: (Math.random() - 0.5) * 45
    });
  }

  function updateFragments(progress) {
    fragments.forEach(frag => {
      const tx = frag.translateX * (1 - progress);
      const ty = frag.translateY * (1 - progress);
      const r = frag.rotation * (1 - progress);
      frag.element.style.transform = `translate(${tx}px, ${ty}px) rotate(${r}deg)`;
    });
  }

  // Плавная анимация
  let lastProgress = 0;
  let animating = false;

  function animateFragments() {
    updateFragments(lastProgress);
    if (animating) requestAnimationFrame(animateFragments);
  }

  function triggerAnimation(progress) {
    lastProgress = progress;
    if (!animating) {
      animating = true;
      requestAnimationFrame(animateFragments);
      setTimeout(() => animating = false, 000);
    }
  }

  // Элементы
  const card1 = document.getElementById('card1');
  const card2 = document.getElementById('card2');
  const card3 = document.getElementById('card3');
  const card4 = document.getElementById('card4');
  const logo = document.getElementById('logo');
  const name = document.getElementById('name');
  const des = document.getElementById('des');

  function applyCardState(el, show) {
    if (!el) return;
    el.style.transform = show ? 'translateY(-20px)' : 'translateY(500px)';
  }
  function applyLogoState(el, show) {
    if (!el) return;
    el.style.transform = show ? 'translateX(0px)' : 'translateX(-300px)';
  }
  function applyNameState(el, show) {
    if (!el) return;
    el.style.transform = show ? 'translateY(0px)' : 'translateY(-300px)';
  }
  function applyDesState(el, show) {
    if (!el) return;
    el.style.transform = show ? 'translateX(0px)' : 'translateX(2000px)';
  }

  function showElements(step) {
    applyCardState(card1, step >= 6);
    applyCardState(card2, step >= 6);
    applyLogoState(logo,  step >= 6);
    applyNameState(name,  step >= 6);
    applyCardState(card3, step >= 7);
    applyCardState(card4, step >= 7);
    applyDesState(des,    step >= 7);
  }

  updateFragments(0);
  showElements(0);

  let scrollSteps = 0;
  const maxSteps = 7;
  let lastScrollTime = 0;

  window.addEventListener('wheel', e => {
    const now = Date.now();
    if (now - lastScrollTime < 150) return;
    lastScrollTime = now;

    if (e.deltaY > 0) {
      scrollSteps = Math.min(scrollSteps + 1, maxSteps);
    } else if (e.deltaY < 0) {
      scrollSteps = Math.max(scrollSteps - 1, 0);
    }

    if (scrollSteps >= 0 && scrollSteps <= 5) {
      const progress = scrollSteps / 5;
      triggerAnimation(progress);
    }

    showElements(scrollSteps);
  });
}
document.addEventListener('DOMContentLoaded', () => {
    initBlackHole();
    initSpaceBackground();
    initGlass();

});