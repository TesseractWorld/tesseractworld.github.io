// https://raw.githubusercontent.com/malchata/yall.js/main/dist/yall.js
function e(e, o) {
  for (const t in o) {
    const n = o[t];
    e.addEventListener(t, n.listener || n, n.options || void 0);
  }
}
const o =
    "IntersectionObserver" in window &&
    "IntersectionObserverEntry" in window &&
    "intersectionRatio" in window.IntersectionObserverEntry.prototype,
  t = /baidu|(?:google|bing|yandex|duckduck)bot/i.test(navigator.userAgent),
  n = ["src", "poster"];
function r(e, o) {
  for (const t of n)
    t in e.dataset &&
      (e.setAttribute(t, e.dataset[t]),
      e.classList.contains(o) && e.classList.remove(o));
}
function s(e, o, t, n) {
  if ("VIDEO" == e.nodeName) {
    const t = Array.from(e.querySelectorAll("source"));
    for (const e of t) r(e, o);
    e.load();
  }
  r(e, o);
  const s = e.classList;
  s.contains(t) && (s.remove(t), s.add(n));
}
function i(n) {
  const r = n?.lazyClass || "lazy",
    i = n?.lazyBackgroundClass || "lazy-bg",
    c = n?.lazyBackgroundLoaded || "lazy-bg-loaded",
    a = n?.threshold || 200,
    l = n?.events || {},
    d = n?.observeChanges || !1,
    f = n?.observeRootSelector || "body",
    u = n?.mutationObserverOptions || { childList: !0, subtree: !0 },
    b = `video.${r},.${i}`;
  let v = Array.from(document.querySelectorAll(b));
  for (const o of v) e(o, l);
  if (!0 === o && !1 === t) {
    var y = new IntersectionObserver(
      (e) => {
        for (const o of e)
          if (o.isIntersecting || o.intersectionRatio) {
            const { target: e } = o;
            s(e, r, i, c),
              y.unobserve(e),
              (v = v.filter((o) => o != e)),
              0 === v.length && !1 === d && y.disconnect();
          }
      },
      { rootMargin: `${a}px 0%` },
    );
    for (const e of v) y.observe(e);
    d &&
      new MutationObserver(() => {
        const n = document.querySelectorAll(b);
        for (const r of n)
          !1 === v.includes(r) &&
            (v.push(r), e(r, l), !0 === o && !1 === t && y.observe(r));
      }).observe(document.querySelector(f), u);
  } else if (t) for (const e of v) s(e, r, i, c);
}
window.yall = i;
//# sourceMappingURL=yall.js.map
