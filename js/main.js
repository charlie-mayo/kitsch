// Kitsch EPK: photo carousel arrows and click to load YouTube videos.

(function () {
  // ---------- Photo carousel ----------
  const track = document.querySelector(".carousel");
  const arrows = document.querySelectorAll(".arrow");

  if (track) {
    const step = () => {
      const item = track.querySelector(".carousel__item");
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return item ? item.getBoundingClientRect().width + gap : track.clientWidth;
    };

    const update = () => {
      const max = track.scrollWidth - track.clientWidth - 2;
      arrows.forEach((btn) => {
        const dir = Number(btn.dataset.dir);
        btn.disabled = dir < 0 ? track.scrollLeft <= 2 : track.scrollLeft >= max;
      });
    };

    arrows.forEach((btn) => {
      btn.addEventListener("click", () => {
        track.scrollBy({ left: Number(btn.dataset.dir) * step(), behavior: "smooth" });
      });
    });

    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        track.scrollBy({ left: (e.key === "ArrowRight" ? 1 : -1) * step(), behavior: "smooth" });
      }
    });

    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  // ---------- Videos: show a thumbnail, load the player only on click ----------
  const playIcon = '<span class="video__play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 4l14 8-14 8z"/></svg></span>';

  document.querySelectorAll(".video").forEach((el) => {
    const id = (el.dataset.youtubeId || "").trim();
    const title = el.dataset.title || "Video";

    if (!id) {
      el.classList.add("video--soon");
      el.disabled = true;
      el.innerHTML = playIcon + '<span class="video__label">' + title + ": coming soon</span>";
      return;
    }

    el.style.backgroundImage = "url(https://i.ytimg.com/vi/" + encodeURIComponent(id) + "/hqdefault.jpg)";
    el.setAttribute("aria-label", "Play video: " + title);
    el.innerHTML = playIcon + '<span class="video__label">' + title + "</span>";

    el.addEventListener("click", () => {
      const iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?autoplay=1&rel=0";
      iframe.title = title;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      const frame = document.createElement("div");
      frame.className = "video ring";
      frame.appendChild(iframe);
      el.replaceWith(frame);
    }, { once: true });
  });

  // ---------- Footer year ----------
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
