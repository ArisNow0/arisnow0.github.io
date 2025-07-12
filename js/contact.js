const canvas = document.getElementById('life');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

const cellSize = 5;
const cols = Math.floor(w / cellSize);
const rows = Math.floor(h / cellSize);
let grid = Array.from({
        length: rows
    }, () =>
    Array.from({
        length: cols
    }, () => Math.random() < 0.2 ? 1 : 0)
);
let opacityGrid = Array.from({
        length: rows
    }, () =>
    Array.from({
        length: cols
    }, () => 0)
);

let speed = 2;
let frameCount = 0;

function nextGen(grid) {
    return grid.map((row, y) =>
        row.map((cell, x) => {
            let count = 0;
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    if (dx === 0 && dy === 0) continue;
                    let ny = y + dy;
                    let nx = x + dx;
                    if (ny >= 0 && ny < rows && nx >= 0 && nx < cols) {
                        count += grid[ny][nx];
                    }
                }
            }
            return (cell && (count === 2 || count === 3)) || (!cell && count === 3) ? 1 : 0;
        })
    );
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);

    frameCount++;
    if (frameCount % speed === 0) {
        grid = nextGen(grid);
    }

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (grid[y][x] === 1) {
                opacityGrid[y][x] = Math.min(1, opacityGrid[y][x] + 0.5);
            } else {
                opacityGrid[y][x] = Math.max(0, opacityGrid[y][x] - 0.3);
            }
        }
    }

   
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (opacityGrid[y][x] > 0) {
                ctx.fillStyle = `rgba(255, 255, 255, ${opacityGrid[y][x]})`;
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }

    requestAnimationFrame(draw);
}
draw();

window.addEventListener("resize", () => location.reload());