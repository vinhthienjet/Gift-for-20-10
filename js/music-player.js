
let currentSongIndex = 0;
let musicAudio = new Audio();
let isMusicPlaying = false;

// Hiển thị giao diện trình phát nhạc
function showMusicPlayer() {
    const giftDetail = document.getElementById("gift-detail");

    if (!giftDetail) {
        console.error("Không tìm thấy gift-detail");
        return;
    }

    giftDetail.innerHTML = `
        <section class="music-player">
            <p class="detail-eyebrow">OUR LOVE PLAYLIST 🎵</p>
            <h2 class="detail-title">Một chút giai điệu dành cho em</h2>

            <div class="music-cover">🌻</div>

            <h3 id="music-title"></h3>
            <p id="music-artist"></p>

            <audio id="music-audio" preload="metadata"></audio>

            <div class="music-controls">
                <button type="button" id="music-prev" aria-label="Bài trước">⏮</button>
                <button type="button" id="music-toggle" aria-label="Phát nhạc">▶</button>
                <button type="button" id="music-next" aria-label="Bài tiếp theo">⏭</button>
            </div>

            <div class="music-progress">
                <span id="music-current-time">0:00</span>
                <input id="music-seek" type="range" min="0" max="100" value="0">
                <span id="music-duration">0:00</span>
            </div>

            <label class="music-volume">
                Âm lượng
                <input id="music-volume" type="range"
                       min="0" max="1" step="0.01" value="0.7">
            </label>

            <button type="button" class="detail-back-btn" id="music-back">
                ← Quay lại menu quà tặng
            </button>
        </section>
    `;

    const audio = document.getElementById("music-audio");
    const title = document.getElementById("music-title");
    const artist = document.getElementById("music-artist");
    const toggleBtn = document.getElementById("music-toggle");
    const seek = document.getElementById("music-seek");
    const currentTime = document.getElementById("music-current-time");
    const durationText = document.getElementById("music-duration");
    const volume = document.getElementById("music-volume");

    function formatTime(seconds) {
        if (!Number.isFinite(seconds)) return "0:00";

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
    }

    function loadSong(index) {
        currentSongIndex =
            (index + musicPlaylist.length) % musicPlaylist.length;

        const song = musicPlaylist[currentSongIndex];

        title.textContent = song.title;
        artist.textContent = song.artist;
        audio.src = song.src;
        audio.load();

        seek.value = 0;
        currentTime.textContent = "0:00";
        durationText.textContent = "0:00";
    }

    async function toggleMusic() {
        if (audio.paused) {
            try {
                await audio.play();
                isMusicPlaying = true;
                toggleBtn.textContent = "⏸";
                toggleBtn.setAttribute("aria-label", "Tạm dừng nhạc");
            } catch (error) {
                console.error("Không phát được nhạc:", error);
                alert("Không phát được bài hát. Hãy kiểm tra tên và đường dẫn file MP3 nhé!");
            }
        } else {
            audio.pause();
            isMusicPlaying = false;
            toggleBtn.textContent = "▶";
            toggleBtn.setAttribute("aria-label", "Phát nhạc");
        }
    }

    document.getElementById("music-toggle")
        .addEventListener("click", toggleMusic);

    document.getElementById("music-prev")
        .addEventListener("click", () => {
            const shouldPlay = !audio.paused;
            loadSong(currentSongIndex - 1);

            if (shouldPlay) toggleMusic();
        });

    document.getElementById("music-next")
        .addEventListener("click", () => {
            const shouldPlay = !audio.paused;
            loadSong(currentSongIndex + 1);

            if (shouldPlay) toggleMusic();
        });

    audio.addEventListener("ended", () => {
        loadSong(currentSongIndex + 1);
        toggleMusic();
    });

    audio.addEventListener("loadedmetadata", () => {
        durationText.textContent = formatTime(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
        currentTime.textContent = formatTime(audio.currentTime);

        if (Number.isFinite(audio.duration) && audio.duration > 0) {
            seek.value = (audio.currentTime / audio.duration) * 100;
        }
    });

    seek.addEventListener("input", () => {
        if (Number.isFinite(audio.duration) && audio.duration > 0) {
            audio.currentTime = (Number(seek.value) / 100) * audio.duration;
        }
    });

    volume.addEventListener("input", () => {
        audio.volume = Number(volume.value);
    });

    audio.volume = 0.7;

    document.getElementById("music-back")
        .addEventListener("click", () => {
            audio.pause();
            audio.removeAttribute("src");
            audio.load();
            isMusicPlaying = false;

            document.getElementById("gift-menu")
                ?.classList.remove("hidden");

            giftDetail.classList.add("hidden");
            giftDetail.innerHTML = "";
        });

    loadSong(currentSongIndex);

    giftDetail.classList.remove("hidden");
    giftDetail.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


const musicPlaylist = [
    {
        title: "Không Thời Gian",
        artist: "Dương Domic",
        src: "musics/khong-thoi-gian.mp3"
    },
    {
        title: "Ngàn Năm Ánh Sáng",
        artist: "Đặng Vĩnh Thịnh",
        src: "musics/ngan-nam-anh-sang.mp3"
    },
    {
        title: "RIO - Vạn Vật Như Muốn Ta Bên Nhau",
        artist: "RIO",
        src: "musics/rio.mp3"
    },
    {
        title: "Tràn bộ nhớ",
        artist: "My love :)))",
        src: "musics/tranbonho.MP3"
    }
];
