// Run this function in the browser on the landing page after hydration.
export default async function verifyMotion() {
  const results = {};
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const wait = (ms = 900) => new Promise(resolve => setTimeout(resolve, ms));
  const query = selector => {
    const element = document.querySelector(selector);
    assert(element, `Missing element: ${selector}`);
    return element;
  };
  const go = async position => {
    window.scrollTo({ top: position, behavior: "instant" });
    await wait();
  };
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const smooth = !reduced && matchMedia("(min-width: 761px) and (hover: hover) and (pointer: fine)").matches;
  assert(document.documentElement.classList.contains("lenis") === smooth, "Smoothing must match input and motion preferences");
  await go(0);
  const initialTransform = getComputedStyle(query(".hero-photo")).transform;
  if (smooth) {
    const wheel = new WheelEvent("wheel", { deltaY: 500, bubbles: true, cancelable: true });
    document.body.dispatchEvent(wheel);
    assert(wheel.defaultPrevented, "Desktop wheel should be smoothed");
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    assert(scrollY > 0 && scrollY < 500, "Wheel must move gradually");
    await wait();
    assert(Math.abs(scrollY - 500) < 5, "Wheel should settle at its destination without a duplicate driver");
    results.smoothWheel = true;
  } else {
    const wheel = new WheelEvent("wheel", { deltaY: 100, bubbles: true, cancelable: true });
    document.body.dispatchEvent(wheel);
    assert(!wheel.defaultPrevented, "Native scrolling must not be intercepted");
  }
  await go(500);
  const forwardTransform = getComputedStyle(query(".hero-photo")).transform;
  assert(reduced ? forwardTransform === initialTransform : forwardTransform !== initialTransform, "Parallax must respect reduced motion");
  await go(0);
  assert(getComputedStyle(query(".hero-photo")).transform === initialTransform, "Hero must reverse with scroll");
  results.reversibleParallax = true;

  const priorHash = location.hash;
  query('.hero-copy a[href="#como-fazer"]').click();
  await wait(1200);
  const targetTop = query("#como-fazer").getBoundingClientRect().top;
  const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);
  assert(location.hash === "#como-fazer" && Math.abs(targetTop - padding) < 3, "Native anchor must update history and respect header offset");
  history.back();
  await wait();
  assert(location.hash === priorHash, "Back must restore previous anchor history");
  results.anchorsAndHistory = true;

  const guideButtons = document.querySelectorAll(".segmented button");
  guideButtons[1].click();
  await wait(50);
  assert(guideButtons[1].getAttribute("aria-pressed") === "true", "Method selection must survive motion");
  const materialButtons = [...document.querySelectorAll(".material-options button")];
  const citrus = materialButtons[3];
  citrus.click();
  await wait(50);
  assert(citrus.getAttribute("aria-pressed") === "true", "Material selection must survive motion");
  assert(query(".material-result .status").textContent.includes("Depende"), "Material guidance should update immediately");
  const details = query(".faq-list details");
  query(".faq-list summary").click();
  assert(details.open, "FAQ must remain interactive");
  query(".checklist input").click();
  await wait(50);
  assert(query(".checklist input").checked, "Checklist must remain interactive");
  results.controls = true;

  query("footer").scrollIntoView({ behavior: "instant" });
  await wait(4000);
  const sticker = query(".ssf-st-btn");
  const home = sticker.parentElement.style.left;
  sticker.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
  await wait(50);
  assert(sticker.parentElement.style.left !== home, "Sticker must move with the keyboard");
  sticker.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
  await wait(50);
  assert(sticker.parentElement.style.left === home, "Escape must restore sticker position");
  query(".ssf-wm-btn").click();
  results.footerControls = true;
  assert(document.documentElement.scrollWidth <= document.documentElement.clientWidth, "Motion must not create horizontal overflow");
  results.viewport = document.documentElement.clientWidth;
  results.reducedMotion = reduced;
  await go(0);
  return results;
}
