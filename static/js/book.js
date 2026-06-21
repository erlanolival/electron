const audio =
    document.getElementById("bgMusic");

let currentChapter = 0;
let currentPage = 0;

function startChapter(index) {

    currentChapter = index;
    currentPage = 0;

    loadChapter(index);

    renderPage();
}

function loadChapter(index) {

    currentChapter = index;

    const newTrack =
        "/static/music/" +
        chapters[index].music;

    if (!audio.src) {

        audio.src = newTrack;
        audio.volume = 1;

        audio.play();

        return;
    }

    fadeMusic(newTrack);
}

function renderPage() {

    const page =
        document.getElementById(
            "bookPage"
        );

        document.getElementById(
            "currentPage"
        ).innerText =
            currentPage + 1;

        document.getElementById(
            "totalPages"
        ).innerText =
            chapters[currentChapter]
                .pages.length;
    
    page.classList.add("turning");

    setTimeout(() => {

        page.innerHTML =
            chapters[currentChapter]
            .pages[currentPage];

        page.classList.remove(
            "turning"
        );

        updateProgress();

    }, 400);
}

function nextPage() {

    const chapter =
        chapters[currentChapter];

    if (
        currentPage <
        chapter.pages.length - 1
    ) {

        currentPage++;

        playPageFlip();

        renderPage();

        return;
    }

    if (
        currentChapter <
        chapters.length - 1
    ) {

        currentChapter++;

        showChapterIntro(
            currentChapter
        );
    }
}

function previousPage() {

    if (currentPage > 0) {

        currentPage--;

        playPageFlip();

        renderPage();
    }
}

function showChapterIntro(index) {

    const chapter =
        chapters[index];

    document.getElementById(
        "chapterTitle"
    ).innerText =
        chapter.title;

    document.getElementById(
        "chapterImage"
    ).src =
        "/static/images/" +
        chapter.image;

    document.getElementById(
        "introScreen"
    ).style.display =
        "block";
}

function fadeMusic(newTrack) {

    let fadeOut = setInterval(() => {

        if (audio.volume > 0.05) {

            audio.volume -= 0.05;

        } else {

            clearInterval(fadeOut);

            audio.pause();

            audio.src = newTrack;

            audio.load();

            audio.play();

            audio.volume = 0;

            let fadeIn = setInterval(() => {

                if (audio.volume < 0.95) {

                    audio.volume += 0.05;

                } else {

                    audio.volume = 1;

                    clearInterval(fadeIn);
                }

            }, 100);
        }

    }, 100);
}

function updateProgress() {

    const totalPages =
        chapters[currentChapter]
        .pages.length;

    const percent =
        ((currentPage + 1)
        / totalPages) * 100;

    document.getElementById(
        "progressBar"
    ).style.width =
        percent + "%";
}

function startBook() {

    document.getElementById(
        "coverScreen"
    ).style.display = "none";

    showChapterIntro(0);
}

function beginChapter() {

    document.getElementById(
        "introScreen"
    ).style.display = "none";

    document.getElementById(
        "readingScreen"
    ).style.display = "block";

    startChapter(currentChapter);
}

function playPageFlip() {

    const sound =
        document.getElementById(
            "pageFlip"
        );

    if (!sound)
        return;

    sound.currentTime = 0;

    sound.play();
}