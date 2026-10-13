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

  name: "Yahya Bagar",

  // =========================
  // YOUR LINKS
  // =========================

  links: [
    {
      title: "Instagram",
      url: "https://www.instagram.com/__st_7en/",
      icon: "◎",
    },

    {
      title: "WhatsApp",
      url: "https://wa.me/212614618104",
      icon: "◉",
    },

    {
      title: "Email",
      url: "https://mail.google.com/mail/?view=cm&fs=1&to=bagaryahya@gmail.com",
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

function toHref(url) {
  const raw = String(url || "").trim();

  // Email addresses written without a protocol
  if (
    raw.includes("@") &&
    !raw.includes("://") &&
    !raw.toLowerCase().startsWith("mailto:")
  ) {
    return `mailto:${raw}`;
  }

  return raw;
}

// Clear existing links before rendering
linksContainer.replaceChildren();

profile.links.forEach((item) => {
  const a = document.createElement("a");
  const href = toHref(item.url);

  a.className = "link-card";
  a.href = href;

  // Open external links in a new tab
  a.target = href.startsWith("mailto:") ? "_self" : "_blank";
  a.rel = "noopener noreferrer";

  // Build link content safely
  const icon = document.createElement("span");
  icon.className = "link-icon";
  icon.textContent = item.icon;

  const title = document.createElement("span");
  title.textContent = item.title;

  const more = document.createElement("span");
  more.className = "more";
  more.textContent = "⋮";

  a.append(icon, title, more);
  linksContainer.appendChild(a);
});

/*
========================================
             SHARE BUTTON
========================================
*/

document.getElementById("shareBtn").addEventListener("click", async () => {
  const url = window.location.href;

  // Use native sharing when available
  if (navigator.share) {
    try {
      await navigator.share({
        title: profile.name,
        text: `Connect with ${profile.name}`,
        url: url,
      });

      return;
    } catch (error) {
      // Continue to clipboard if sharing was cancelled or failed
    }
  }

  // Otherwise, copy the profile URL
  try {
    await navigator.clipboard.writeText(url);
    showToast("Profile link copied!");
  } catch (error) {
    showToast("Copy the page URL from your browser.");
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

  // Change accent color
  document.documentElement.style.setProperty(
    "--accent",
    darkAlt ? "#22d3ee" : "#8b5cf6",
  );

  // Change profile background
  document.querySelector(".profile").style.background = darkAlt
    ? `
      radial-gradient(
        circle at 82% 30%,
        rgba(34, 211, 238, 0.16),
        transparent 20%
      ),
      linear-gradient(180deg, #090909, #050505)
    `
    : `
      radial-gradient(
        circle at 82% 30%,
        rgba(130, 70, 255, 0.18),
        transparent 20%
      ),
      linear-gradient(180deg, #090909, #050505)
    `;
});

/*
========================================
                TOAST
========================================
*/

let toastTimer;

function showToast(message) {
  const toast = document.getElementById("toast");

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}
