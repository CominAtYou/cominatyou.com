if (new URLSearchParams(window.location.search).get("skipani") === "true") {
    document.getElementById("hero-top-text").style.opacity = 1;
    document.getElementById("hero-btm-text").style.opacity = 1;
    document.getElementById("hero-top-text").style.transform = "translateY(0)";
    document.getElementById("hero-btm-text").style.transform = "translateY(0)";
}

/** @param {string} selector */
const $ = (selector) => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", async () => {
    await anime({
        targets: '#hero-top-text, #hero-btm-text',
        translateY: 0,
        opacity: 1,
        delay: anime.stagger(1100, { start: 500 }),
        duration: 750,
        easing: 'easeOutQuart',

    }).finished;

    await anime({
        targets: '#github-button-wrapper, #twitter-button-wrapper',
        translateY: 0,
        opacity: 1,
        delay: anime.stagger(750, { start: 500 }),
        duration: 750,
        begin: () => {
            $("#github-button").style.pointerEvents = "auto";
            setTimeout(() => {
                $("#twitter-button").style.pointerEvents = "auto";
            }, 750);
        },
    }).finished;

    // await anime({
    //     targets: "#hero-text",
    //     translateY: -48,
    //     opacity: 0,
    //     delay: 750,
    //     duration: 1000,
    //     easing: 'easeOutQuart'
    // }).finished;
});

$("#github-button").addEventListener("click", () => {
    window.open("https://github.com/CominAtYou/", "_blank", "noreferrer");
});

$("#twitter-button").addEventListener("click", () => {
    window.open("https://twitter.com/iiCominAtYou", "_blank", "noreferrer");
});
