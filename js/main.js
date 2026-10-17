
const welcomeScreen = document.getElementById("welcome-screen");
const giftMenu = document.getElementById("gift-menu");
const giftDetail = document.getElementById("gift-detail");

const openGiftBtn = document.getElementById("open-gift-btn");
const backHomeBtn = document.getElementById("back-home-btn");

// Chuyển từ trang chào mừng đến menu quà tặng
openGiftBtn.addEventListener("click", () => {
    welcomeScreen.classList.add("hidden");
    giftMenu.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Quay lại trang chào mừng
backHomeBtn.addEventListener("click", () => {
    giftMenu.classList.add("hidden");
    welcomeScreen.classList.remove("hidden");

    giftDetail.classList.add("hidden");
    giftDetail.innerHTML = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Nội dung thư
const loveLetter = `
    <p class="letter-greeting">
        Gửi Thanh Duyên, cô gái đặc biệt nhất của anh 
    </p>

    <p class="letter-subtitle">
        Chúc mừng ngày 20/10, em yêu của anh!
    </p>

    <p>
        Anh không biết phải bắt đầu từ đâu để nói hết những điều anh muốn
        dành cho em. Anh chỉ biết rằng, từ khi có em, những ngày bình thường
        của anh cũng trở nên đặc biệt hơn một chút. Một tin nhắn của em,
        một nụ cười của em hay đơn giản là những lúc được nghe em kể chuyện
        cũng đủ khiến một ngày của anh trở nên vui vẻ.
    </p>

    <p>
        Anh biết mình không phải lúc nào cũng hoàn hảo, cũng chẳng phải
        người giỏi nói những lời hoa mỹ. Nhưng anh thật lòng mong rằng mình
        có thể trở thành người khiến em cảm thấy được yêu thương, được lắng
        nghe và được là chính mình. Anh muốn cùng em chia sẻ những niềm vui
        nhỏ nhặt, những ngày thật đẹp và cả những lúc em cảm thấy mệt mỏi.
    </p>

    <p>
        Nhân ngày 20/10, anh chúc cô gái của anh luôn xinh đẹp, vui vẻ,
        bình an và lúc nào cũng giữ được nụ cười mà anh yêu thích. Mong em
        sẽ luôn tự tin theo đuổi những điều mình yêu, luôn được làm những
        việc khiến trái tim em hạnh phúc và luôn gặp được những điều dịu
        dàng nhất trên hành trình của mình.
    </p>

    <p>
        Cảm ơn em vì đã xuất hiện trong cuộc sống của anh, vì đã cho anh
        cơ hội được thương em và cùng em viết nên những câu chuyện của
        riêng chúng ta.
    </p>

    <p class="letter-highlight">
        Chúc em một ngày 20/10 thật rực rỡ, như đóa hướng dương luôn hướng
        về phía mặt trời.
    </p>

    <p>
        Và nếu có thể, anh mong mình sẽ luôn là một phần nhỏ bé trong
        những điều khiến em mỉm cười.
    </p>

    <p class="letter-love">
        Anh thương em nhiều lắm. ❤️
    </p>

    <div class="letter-signature">
        <p>Mãi bên cạnh bà chụt của anh,</p>
        <p><strong>Thiện nguyễn đẹp traii s1. 🌻</strong></p>
    </div>
`;

// Hiển thị phong bì
function showEnvelope() {
    giftDetail.innerHTML = `
        <div class="envelope-page">
            <p class="detail-eyebrow">A LITTLE LETTER FOR YOU</p>

            <h2 class="detail-title">Một chút yêu thương 💌</h2>

            <p class="envelope-instruction">
                Có một điều anh muốn nói với em...
            </p>

            <button
                type="button"
                class="envelope-button"
                id="envelope-button"
                aria-label="Bấm để mở lá thư"
            >
                <span class="envelope-back"></span>
                <span class="envelope-paper">
                    <span class="paper-heart">♥</span>
                    <span class="paper-text">Gửi em</span>
                </span>
                <span class="envelope-flap"></span>
                <span class="envelope-front"></span>
                <span class="envelope-seal">♥</span>
            </button>

            <p class="envelope-hint">
                💗 Bấm vào phong bì để mở thư nhé 💗
            </p>

            <button
                type="button"
                class="detail-back-btn"
                id="detail-back-btn"
            >
                ← Quay lại menu quà tặng
            </button>
        </div>
    `;

    giftDetail.classList.remove("hidden");
    giftDetail.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    document
        .getElementById("envelope-button")
        .addEventListener("click", openLetter);

    document
        .getElementById("detail-back-btn")
        .addEventListener("click", closeGiftDetail);
}

// Hiệu ứng mở phong bì và hiện nội dung thư
function openLetter() {
    const envelope = document.getElementById("envelope-button");

    if (!envelope || envelope.classList.contains("opened")) {
        return;
    }

    envelope.classList.add("opened");

    window.setTimeout(() => {
        giftDetail.innerHTML = `
            <article class="letter-paper">
                <div class="letter-decoration">🌻</div>

                <div class="letter-content">
                    ${loveLetter}
                </div>

                <div class="letter-bottom-decoration">
                    Làm bằng tình yêu của anh ❤️
                </div>
            </article>

            <button
                type="button"
                class="detail-back-btn letter-back-btn"
                id="letter-back-btn"
            >
                ← Gấp thư lại
            </button>
        `;

        document
            .getElementById("letter-back-btn")
            .addEventListener("click", showEnvelope);
    }, 800);
}

// Đóng phần quà đang xem
function closeGiftDetail() {
    giftDetail.classList.add("hidden");
    giftDetail.innerHTML = "";
}

// Xử lý bốn món quà
document.querySelectorAll(".gift-card").forEach((card) => {
    card.addEventListener("click", () => {
        const giftType = card.dataset.gift;

        if (giftType === "letter") {
            showEnvelope();
            return;
        }

        if (giftType === "music") {
            showMusicPlayer();
            return;
        }

        if (giftType === "photos") {
            showPhotoAlbum();
            return;
        }

        if (giftType === "flower") {
            showSunflower3D();
        }
    });
});

// Màn hình tạm cho các món quà chưa hoàn thiện
function showPlaceholder(title, description) {
    giftDetail.innerHTML = `
        <div class="placeholder-gift">
            <div class="placeholder-flower">🌻</div>
            <h2 class="detail-title">${title}</h2>
            <p>${description}</p>

            <button
                type="button"
                class="detail-back-btn"
                id="detail-back-btn"
            >
                ← Quay lại menu quà tặng
            </button>
        </div>
    `;

    giftDetail.classList.remove("hidden");
    giftDetail.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    document
        .getElementById("detail-back-btn")
        .addEventListener("click", closeGiftDetail);
}

const couplePhotos = [
    "images/1792228693666_52303255065711783_909800211921420734_339ca8a730ee9e20667020469a212049.jpg",
    "images/1792228693693_52303255065711783_909800211921420734_59d250b9f8116b8b713abc3f040d129e.jpg",
    "images/1792228693705_52303255065711783_909800211921420734_d87985bec14321fc62c2936514565619.jpg",
    "images/1792228693737_52303255065711783_909800211921420734_b204426fe8eef05ecaedb96baf70bc78.jpg",
    "images/IMG_2228.JPG",
    "images/IMG_2490.PNG",
    "images/IMG_3862.JPG",
    "images/IMG_4834.jpg",
    "images/IMG_5010.JPG"
];

function showPhotoAlbum() {
    giftDetail.innerHTML = `
        <section class="photo-album">
            <p class="detail-eyebrow">OUR LITTLE MEMORIES</p>
            <h2 class="detail-title">Những khoảnh khắc của chúng mình 📸</h2>
            <p class="album-description">
                Mỗi bức ảnh là một kỷ niệm mà anh muốn giữ thật lâu. ❤️
            </p>

            <div class="photo-grid">
                ${couplePhotos.map((src, index) => `
                    <button
                        class="photo-item"
                        type="button"
                        data-photo-index="${index}"
                        aria-label="Xem ảnh kỷ niệm ${index + 1}"
                    >
                        <img
                            src="${src}"
                            alt="Kỷ niệm của chúng mình ${index + 1}"
                            loading="lazy"
                        >
                        <span class="photo-heart">♥</span>
                    </button>
                `).join("")}
            </div>

            <button type="button" class="detail-back-btn" id="album-back-btn">
                ← Quay lại menu quà tặng
            </button>
        </section>

        <div class="photo-lightbox hidden" id="photo-lightbox">
            <button class="lightbox-close" id="lightbox-close"
                    type="button" aria-label="Đóng ảnh">×</button>

            <button class="lightbox-arrow prev-photo" id="prev-photo"
                    type="button" aria-label="Ảnh trước">‹</button>

            <div class="lightbox-content">
                <img id="lightbox-image" src="" alt="Ảnh kỷ niệm">
                <button id="send-heart-btn" class="send-heart-btn" type="button">
                    ❤️ Gửi yêu thương
                </button>
            </div>

            <button class="lightbox-arrow next-photo" id="next-photo"
                    type="button" aria-label="Ảnh tiếp theo">›</button>
            <div id="floating-hearts" aria-hidden="true"></div>
        </div>
    `;

    giftDetail.classList.remove("hidden");

    let currentPhotoIndex = 0;

    const lightbox = document.getElementById("photo-lightbox");
    const lightboxImage = document.getElementById("lightbox-image");

    function openPhoto(index) {
        currentPhotoIndex = index;
        lightboxImage.src = couplePhotos[currentPhotoIndex];
        lightbox.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    }

    function closePhoto() {
        lightbox.classList.add("hidden");
        document.body.style.overflow = "";
        document.getElementById("floating-hearts").innerHTML = "";
    }

    function changePhoto(direction) {
        currentPhotoIndex =
            (currentPhotoIndex + direction + couplePhotos.length)
            % couplePhotos.length;

        lightboxImage.src = couplePhotos[currentPhotoIndex];
    }

    giftDetail.querySelectorAll(".photo-item").forEach((item) => {
        item.addEventListener("click", () => {
            openPhoto(Number(item.dataset.photoIndex));
        });
    });

    document.getElementById("lightbox-close")
        .addEventListener("click", closePhoto);

    document.getElementById("prev-photo")
        .addEventListener("click", () => changePhoto(-1));

    document.getElementById("next-photo")
        .addEventListener("click", () => changePhoto(1));

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) closePhoto();
    });


        document.getElementById("send-heart-btn").addEventListener("click", function () {
            const container = document.getElementById("floating-hearts");

            if (!container) return;

            const decorations = ["🌻", "💛", "❤️", "🌼", "💕", "🌸", "🌷"];

            // Rung màn hình
            document.body.classList.remove("screen-shake");
            void document.body.offsetWidth;
            document.body.classList.add("screen-shake");

            setTimeout(() => {
                document.body.classList.remove("screen-shake");
            }, 650);

            // Tạo hoa và trái tim rơi khắp màn hình
            for (let i = 0; i < 100; i++) {
                const flower = document.createElement("span");

                flower.className = "flying-flower";
                flower.textContent =
                    decorations[Math.floor(Math.random() * decorations.length)];

                const startX = Math.random() * window.innerWidth;
                const drift = Math.random() * 240 - 120;
                const rotation = Math.random() * 1080 - 540;
                const duration = 3000 + Math.random() * 3000;
                const delay = Math.random() * 1200;

                flower.style.left = startX + "px";
                flower.style.fontSize = (16 + Math.random() * 24) + "px";

                container.appendChild(flower);

                flower.animate(
                    [
                        {
                            transform: "translate(0, -60px) rotate(0deg)",
                            opacity: 0
                        },
                        {
                            transform: "translate(0, 0) rotate(0deg)",
                            opacity: 1,
                            offset: 0.1
                        },
                        {
                            transform: `translate(${drift}px, ${window.innerHeight + 100}px) rotate(${rotation}deg)`,
                            opacity: 0
                        }
                    ],
                    {
                        duration: duration,
                        delay: delay,
                        easing: "linear",
                        fill: "forwards"
                    }
                );

                setTimeout(() => flower.remove(), duration + delay + 200);
            }
        });

    document.getElementById("album-back-btn")
        .addEventListener("click", closeGiftDetail);

    giftDetail.scrollIntoView({ behavior: "smooth", block: "start" });
}
