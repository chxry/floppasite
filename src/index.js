const themeToggle = document.getElementById("themeToggle");
const themes = ["system", "light", "dark"];
let theme = themes.indexOf(localStorage.getItem("theme"));
if (theme < 0) {
  theme = 2;
}

const toggleTheme = () => {
  const old = theme;
  theme = (theme + 1) % themes.length;
  document.body.classList.replace(themes[old], themes[theme]);
  themeToggle.innerText = themes[theme];
  localStorage.setItem("theme", themes[theme]);
};

document.body.classList.replace("system", themes[theme]);
themeToggle.innerText = themes[theme];
themeToggle.onclick = toggleTheme;

const catToggle = document.getElementById("catToggle");

const enableCat = () => {
  localStorage.setItem("oneko", true);
  const el = document.createElement("script");
  el.setAttribute("src", "/oneko/oneko.js");
  el.setAttribute("data-cat", "/oneko/oneko.gif");
  el.setAttribute("id", "oneko-script");
  document.body.appendChild(el);
  catToggle.innerText = "disable cat";
  catToggle.onclick = disableCat;
};

const disableCat = () => {
  localStorage.setItem("oneko", false);
  document.getElementById("oneko-script").remove();
  document.getElementById("oneko").remove();
  catToggle.innerText = "enable cat";
  catToggle.onclick = enableCat;
};

if (localStorage.getItem("oneko") != "false") {
  enableCat();
} else {
  catToggle.onclick = enableCat;
}

const swapContent = async (url) => {
  const content = document.getElementById("content");
  const timeout = setTimeout(() => (content.innerText = "loading..."), 100);
  const html = await (await fetch(url)).text();
  const doc = new DOMParser().parseFromString(html, "text/html");
  clearTimeout(timeout);

  content.replaceWith(doc.getElementById("content"));
  document.head.replaceWith(doc.head);
};

const prefetch = (event) => {
  if (event.target.tagName === "A" && !event.target.dataset.hasOwnProperty("noprefetch")) {
    const url = new URL(event.target.href);
    if (url.origin === window.location.origin) {
      fetch(url, { priority: "low" });
    }
  }
};

document.body.addEventListener("mouseover", (event) => prefetch(event));

document.body.addEventListener("touchstart", (event) => prefetch(event));

document.body.addEventListener("click", async (event) => {
  if (event.target.tagName === "A" && !event.target.dataset.hasOwnProperty("noprefetch")) {
    const url = new URL(event.target.href);
    if (url.origin === window.location.origin) {
      event.preventDefault();
      swapContent(url);
      window.history.pushState({}, "", url);
    }
  }
});

window.addEventListener("popstate", () => {
  const url = new URL(window.location.href);
  if (url.origin === window.location.origin) {
    swapContent(url);
  }
});
