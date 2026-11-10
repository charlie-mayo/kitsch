// Kitsch EPK: looping, self sliding photo carousel and click to load YouTube videos.

(function () {
  // ---------- Photo carousel: endless loop + automatic sliding ----------
  //
  // Looping: a copy of the full photo set is placed before and after the real
  // photos. Whenever scrolling settles inside a copy, the track jumps (instantly,
  // to an identical looking position) back into the real set, so there is no end.
  //
  // Autoplay: advances one photo every AUTOPLAY_MS. It pauses while the visitor
  // hovers, touches, or focuses the carousel, while it is off screen or the tab
  // is hidden, and is off entirely for visitors who prefer reduced motion.
  const AUTOPLAY_MS = 4000;
  const RESUME_AFTER_MS = 6000; // wait after a manual interaction before resuming

  const track = document.querySelector(".carousel");
  const arrows = document.querySelectorAll(".arrow");

  if (track) {
    const real = [...track.children];
    const count = real.length;

    const makeClone = (li) => {
      const c = li.cloneNode(true);
      c.setAttribute("aria-hidden", "true");
      c.classList.add("is-clone");
      return c;
    };
    real.forEach((li) => track.appendChild(makeClone(li)));
    real.slice().reverse().forEach((li) => track.prepend(makeClone(li)));

    const items = () => track.children;
    const pad = () => parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
    const posOf = (i) => items()[i].offsetLeft - pad();      // snap position of item i
    const setWidth = () => items()[count * 2].offsetLeft - items()[count].offsetLeft;
    const step = () => items()[count + 1].offsetLeft - items()[count].offsetLeft;

    // Nearest item index to the current scroll position.
    const currentIndex = () => {
      let best = 0, bestDist = Infinity;
      for (let i = 0; i < items().length; i++) {
        const d = Math.abs(posOf(i) - track.scrollLeft);
        if (d < bestDist) { best = i; bestDist = d; }
      }
      return best;
    };

    // Jump without animation (the carousel itself has no CSS smooth scrolling).
    const jumpTo = (left) => { track.scrollLeft = left; };

    // If we've drifted into a copy, hop back to the same photo in the real set.
    const normalize = () => {
      const i = currentIndex();
      if (i < count) jumpTo(track.scrollLeft + setWidth());
      else if (i >= count * 2) jumpTo(track.scrollLeft - setWidth());
    };

    let settleTimer;
    track.addEventListener("scroll", () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(normalize, 140);
    }, { passive: true });

    const go = (dir) => {
      normalize();
      track.scrollBy({ left: dir * step(), behavior: "smooth" });
    };

    // Start on the first real photo, and stay on the same photo across resizes.
    jumpTo(posOf(count));
    let resizeIndex = count;
    window.addEventListener("resize", () => {
      clearTimeout(settleTimer);
      jumpTo(posOf(resizeIndex));
    });
    track.addEventListener("scroll", () => { resizeIndex = currentIndex(); }, { passive: true });

    // ----- Autoplay -----
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer = null;
    let hovering = false;
    let focused = false;
    let onScreen = true;
    let pausedUntil = 0;

    const canPlay = () =>
      !reduceMotion.matches && !hovering && !focused && onScreen && !document.hidden;

    const tick = () => {
      if (canPlay() && Date.now() >= pausedUntil) go(1);
    };
    const start = () => { if (!timer) timer = setInterval(tick, AUTOPLAY_MS); };
    const stop = () => { clearInterval(timer); timer = null; };
    const restart = () => { stop(); start(); };

    // Any manual interaction resets the clock and holds off autoplay briefly.
    const userActed = () => { pausedUntil = Date.now() + RESUME_AFTER_MS; restart(); };

    arrows.forEach((btn) => {
      btn.disabled = false;
      btn.addEventListener("click", () => { go(Number(btn.dataset.dir)); userActed(); });
    });

    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        go(e.key === "ArrowRight" ? 1 : -1);
        userActed();
      }
    });

    track.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") hovering = true; });
    track.addEventListener("pointerleave", () => { hovering = false; });
    track.addEventListener("pointerdown", userActed);
    track.addEventListener("touchstart", userActed, { passive: true });
    track.addEventListener("wheel", userActed, { passive: true });
    track.addEventListener("focusin", () => { focused = true; });
    track.addEventListener("focusout", () => { focused = false; });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; }, { threshold: 0.3 })
        .observe(track);
    }

    start();
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
