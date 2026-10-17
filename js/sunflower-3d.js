function showSunflower3D() {
    const container = document.createElement("div");
    container.id = "sunflower-3d-screen";

    container.innerHTML = `
        <button id="sunflower-back" aria-label="Quay lại">✕</button>
        <div class="sunflower-message">
            <h2>🌻 You are my sunshine 🌻</h2>
            <p>Chạm và xoay bông hoa nhé, em yêu.</p>
        </div>
        <div id="sunflower-canvas"></div>
        <div class="sunflower-hint">KÉO ĐỂ XOAY · CUỘN ĐỂ PHÓNG TO</div>
    `;

    document.body.appendChild(container);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030306);

    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById("sunflower-canvas").appendChild(renderer.domElement);

    const flower = new THREE.Group();
    scene.add(flower);

    // Tạo các hạt sáng thành hình bông hoa
    function createParticles(points, color, size) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(points.flat());

        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
        );

        const material = new THREE.PointsMaterial({
            color,
            size,
            transparent: true,
            opacity: 0.95,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const particles = new THREE.Points(geometry, material);
        flower.add(particles);
        return particles;
    }

    // CÁNH HOA: nhiều cánh xếp vòng quanh nhụy
    const petalPoints = [];
    const petalCount = 22;
    const pointsPerPetal = 420;

    for (let p = 0; p < petalCount; p++) {
        const angle = (p / petalCount) * Math.PI * 2;

        for (let i = 0; i < pointsPerPetal; i++) {
            const t = Math.random();
            const width = (Math.random() - 0.5) * 0.8 *
                Math.sin(Math.PI * t);

            const radius = 0.8 + t * 2.6;
            const x = Math.cos(angle) * radius -
                Math.sin(angle) * width;
            const y = Math.sin(angle) * radius +
                Math.cos(angle) * width;
            const z = (Math.random() - 0.5) * 0.22 +
                Math.sin(t * Math.PI) * 0.12;

            petalPoints.push([x, y, z]);
        }
    }

    createParticles(petalPoints, 0xffca28, 0.035);


    // THÂN HOA: các hạt xanh tạo thành thân hơi cong
    const stemPoints = [];

    for (let i = 0; i < 2400; i++) {
        const t = Math.random();
        const y = -2.0 - t * 4.0;
        const centerX = 0.18 * Math.sin(t * Math.PI * 1.3);
        const x = centerX + (Math.random() - 0.5) * 0.13;
        const z = (Math.random() - 0.5) * 0.13;

        stemPoints.push([x, y, z]);
    }

    createParticles(stemPoints, 0x45d66b, 0.028);

    // HÀM TẠO LÁ BẰNG CÁC HẠT 3D
    function createLeaf(side, startY, length) {
        const leafPoints = [];
        const veinPoints = [];

        for (let i = 0; i < 1800; i++) {
            const t = Math.random();
            const across = (Math.random() - 0.5) *
                Math.sin(Math.PI * t) * 0.95;

            // Lá thuôn nhọn ở đầu và phình ở giữa
            const x = side * (0.12 + t * length) -
                side * across * 0.55;

            const y = startY + t * length * 0.65 +
                across * side * 0.7;

            const z = 0.08 + Math.sin(t * Math.PI) * 0.15 +
                (Math.random() - 0.5) * 0.12;

            leafPoints.push([x, y, z]);
        }

        // Gân chính của lá
        for (let i = 0; i <= 100; i++) {
            const t = i / 100;
            const x = side * (0.12 + t * length);
            const y = startY + t * length * 0.65;
            const z = 0.22 + Math.sin(t * Math.PI) * 0.15;

            veinPoints.push([x, y, z]);
        }

        createParticles(leafPoints, 0x32e875, 0.027);
        createParticles(veinPoints, 0xa0ff9e, 0.022);
    }

    // Hai chiếc lá mọc hai bên thân
    createLeaf(-1, -3.1, 1.65);
    createLeaf(1, -4.2, 1.8);

    // Dịch toàn bộ cây lên một chút để cân đối màn hình
    flower.position.y = 1.5;

    // Điều chỉnh góc nhìn để thấy cả hoa, thân và lá
    camera.position.set(0, 0, 12.5);

    // NHỤY HOA: chấm vàng nâu xoắn ốc
    const centerPoints = [];
    const seedCount = 6500;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < seedCount; i++) {
        const radius = 0.95 * Math.sqrt(i / seedCount);
        const angle = i * goldenAngle;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = 0.16 + (Math.random() - 0.5) * 0.16;

        centerPoints.push([x, y, z]);
    }

    createParticles(centerPoints, 0xffe082, 0.022);

    // Thêm các hạt sáng lấp lánh xung quanh
    const sparklePoints = [];

    for (let i = 0; i < 500; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 4 + Math.random() * 3;

        sparklePoints.push([
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            (Math.random() - 0.5) * 3
        ]);
    }

    const sparkles = createParticles(
        sparklePoints,
        0xffe7a3,
        0.018
    );

    // Tương tác kéo chuột hoặc vuốt tay
    let dragging = false;
    let previousX = 0;
    let previousY = 0;
    let velocityX = 0;
    let velocityY = 0;

    renderer.domElement.addEventListener("pointerdown", (event) => {
        dragging = true;
        previousX = event.clientX;
        previousY = event.clientY;
        renderer.domElement.setPointerCapture(event.pointerId);
    });

    renderer.domElement.addEventListener("pointermove", (event) => {
        if (!dragging) return;

        const dx = event.clientX - previousX;
        const dy = event.clientY - previousY;

        velocityY = dx * 0.006;
        velocityX = dy * 0.006;

        flower.rotation.y += velocityY;
        flower.rotation.x += velocityX;

        previousX = event.clientX;
        previousY = event.clientY;
    });

    function stopDragging() {
        dragging = false;
    }

    renderer.domElement.addEventListener("pointerup", stopDragging);
    renderer.domElement.addEventListener("pointercancel", stopDragging);
    renderer.domElement.addEventListener("lostpointercapture", stopDragging);

    // Cuộn chuột để phóng to / thu nhỏ
    renderer.domElement.addEventListener("wheel", (event) => {
        event.preventDefault();
        camera.position.z = Math.max(
            6,
            Math.min(16, camera.position.z + event.deltaY * 0.008)
        );
    }, { passive: false });

    // Animation
    let animationId;

    function animate() {
        animationId = requestAnimationFrame(animate);

        if (!dragging) {
            flower.rotation.y += 0.0025;
            flower.rotation.x *= 0.995;
            flower.rotation.y += velocityY * 0.15;
            velocityY *= 0.96;
            velocityX *= 0.96;
        }

        sparkles.rotation.z -= 0.0003;

        renderer.render(scene, camera);
    }

    animate();

    // Tự co giãn theo kích thước màn hình
    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", onResize);

    // Quay lại trang quà và dọn tài nguyên
    document.getElementById("sunflower-back").addEventListener("click", () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", onResize);
        flower.traverse((object) => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) object.material.dispose();
        });
        renderer.dispose();
        container.remove();
    });
}