/**
 * @param {string} selector
 * @returns {HTMLElement}
 */
const $ = (selector) => { return document.querySelector(selector) } ;

if (new URLSearchParams(window.location.search).get("skipani") === "true") {
    $("#hero-btm-text").style.opacity = 1;
    $("#hero-top-text").style.opacity = 1;
    $("#github-button-wrapper").style.opacity = 1;
    $("#twitter-button-wrapper").style.opacity = 1;

    $("#hero-top-text").style.transform = "translateY(0)";
    $("#hero-btm-text").style.transform = "translateY(0)";
    $("#github-button-wrapper").style.transform = "translateY(0)";
    $("#twitter-button-wrapper").style.transform = "translateY(0)";
    $(".account-icon-wrapper").style.opacity = 1;
}

$("#github-button").addEventListener("click", () => {
    window.open("https://github.com/CominAtYou", "_blank", "noreferrer");
});

$("#twitter-button").addEventListener("click", () => {
    window.open("https://twitter.com/iiCominAtYou", "_blank", "noreferrer");
});


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
        delay: anime.stagger(475, { start: 250 }),
        duration: 750,
        begin: () => {
            $("#github-button").style.pointerEvents = "auto";
            setTimeout(() => {
                $("#twitter-button").style.pointerEvents = "auto";
            }, 750);
        },
    }).finished;

    const res = await fetch("https://api.cominatyou.com/users/me", { credentials: "include" });

    if (res.status === 200) {
        const data = await res.json();
        $("#account-menu-global-name-text").innerText = `Hi ${data.global_name.replace(/!$/, "")}!`;
        $("#account-menu-username-text").innerText = `@${data.username}`;

        $("#account-menu-wrapper").classList.replace("hidden", "flex");

        anime({
            targets: "#account-menu-wrapper",
            opacity: 1,
            duration: 500,
            easing: "linear"
        });
    }
});

async function hideAccountMenu() {
    await anime({
        targets: "#account-menu",
        opacity: 0,
        duration: 100,
        endDelay: 150,
        easing: "linear"
    }).finished;

    $("#account-menu").classList.replace("flex", "hidden");
}

$("#account-button").addEventListener("click", async () => {
    const element = $("#account-menu");
    if (element.classList.contains("hidden")) {
        element.classList.replace("hidden", "flex");

        anime({
            targets: "#account-menu",
            opacity: 1,
            duration: 100,
            easing: "linear"
        });
    }
    else {
        await hideAccountMenu();
    }
});

$("#interface").addEventListener("click", async () => {
    if ($("#account-menu").classList.contains("flex")) {
        await hideAccountMenu();
    }
});

$("#manage-account-button").addEventListener("click", () => {
    window.location.href = "https://auth.cominatyou.com";
});

$("#sign-out-button").addEventListener("click", () => {
    window.location.href = "https://auth.cominatyou.com/logout?nsr=false";
});
