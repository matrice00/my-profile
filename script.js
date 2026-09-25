/*
========================================
       MY PERSONAL PROFILE
========================================

Change your information here.
*/

const profile = {
  // =========================
  // YOUR NAME
  // =========================

  name: "BAGAR Yahya",

  // =========================
  // YOUR LINKS
  // =========================

  links: [
    {
      title: "Instagram",

      url: "https://www.instagram.com/__st_7en/#",

      icon: "◎",
    },

    {
      title: "WhatsApp",

      /*
      Example Morocco number:

      https://wa.me/212612345678

      */

      url: "https://wa.me/212614618104",

      icon: "◉",
    },

    {
      title: "Email",

      url: "bagaryahya@gmail.com",

      icon: "✉",
    },
/*
    {
      title: "Portfolio",

      url: "https://example.com",

      icon: "⌁",
    },
*/
  ],
};

/*
========================================
          SHOW NAME
========================================
*/

document.getElementById("name").textContent = profile.name;

/*
========================================
          CREATE LINKS
========================================
*/

const linksContainer = document.getElementById("links");

profile.links.forEach((item) => {
  const a = document.createElement("a");

  a.className = "link-card";

  a.href = item.url;

  /*
  Open external links
  in a new tab.
  */

  a.target = item.url.startsWith("mailto:") ? "_self" : "_blank";

  a.rel = "noopener noreferrer";

  /*
  Link HTML
  */

  a.innerHTML = `

    <span class="link-icon">
      ${item.icon}
    </span>

    <span>
      ${item.title}
    </span>

    <span class="more">
      ⋮
    </span>

  `;

  linksContainer.appendChild(a);
});

/*
========================================
             SHARE BUTTON
========================================
*/

document.getElementById("shareBtn").addEventListener("click", async () => {
  const url = window.location.href;

  /*
      If phone supports
      native sharing.
      */

  if (navigator.share) {
    try {
      await navigator.share({
        title: profile.name,

        text: `Connect with ${profile.name}`,

        url: url,
      });

      return;
    } catch (_) {}
  }

  /*
      Otherwise copy URL.
      */

  try {
    await navigator.clipboard.writeText(url);

    showToast("Profile link copied");
  } catch (_) {
    showToast("Copy the page URL from your browser");
  }
});

/*
========================================
          THEME BUTTON
========================================
*/

let darkAlt = false;

document.getElementById("themeBtn").addEventListener("click", () => {
  darkAlt = !darkAlt;

  /*
      Change accent.
      */

  document.documentElement.style.setProperty(
    "--accent",

    darkAlt ? "#22d3ee" : "#8b5cf6",
  );

  /*
      Change background.
      */

  document.querySelector(".profile").style.background = darkAlt
    ? `
        radial-gradient(
          circle at 82% 30%,
          rgba(34,211,238,.16),
          transparent 20%
        ),

        linear-gradient(
          180deg,
          #090909,
          #050505
        )
        `
    : `
        radial-gradient(
          circle at 82% 30%,
          rgba(130,70,255,.18),
          transparent 20%
        ),

        linear-gradient(
          180deg,
          #090909,
          #050505
        )
        `;
});

/*
========================================
             TOAST
========================================
*/

function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(
    () => {
      toast.classList.remove("show");
    },

    1800,
  );
}
