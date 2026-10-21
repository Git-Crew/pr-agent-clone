"use client";

import { useEffect } from "react";

const BAYER = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54,
  22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29,
  53, 21,
];

const INK: Array<[number, number, number]> = [
  [246, 228, 148],
  [236, 208, 104],
  [252, 242, 196],
  [228, 196, 86],
];

type DitherOptions = {
  width?: number;
  height?: number;
  tuck?: number;
  shift?: number;
};

function clips(el: Element) {
  const cs = getComputedStyle(el);
  return [cs.overflow, cs.overflowX, cs.overflowY].some(
    (value) => value === "hidden" || value === "auto" || value === "scroll" || value === "clip",
  );
}

function paint(canvas: HTMLCanvasElement, cssW: number, cssH: number) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const cell = Math.max(3, Math.round(3 * dpr));
  const w = Math.max(1, Math.round(cssW * dpr));
  const h = Math.max(1, Math.round(cssH * dpr));
  if (canvas.width !== w) canvas.width = w;
  if (canvas.height !== h) canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, w, h);

  for (let y = 0; y < h; y += cell) {
    for (let x = 0; x < w; x += cell) {
      const nx = (x + cell * 0.5) / w;
      const ny = (y + cell * 0.5) / h;
      const dx = (nx - 0.5) / 0.42;
      const dy = (ny - 0.18) / 0.62;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const density = Math.max(0, 1 - dist) ** 0.85 * 0.92;
      const bx = (x / cell) & 7;
      const by = (y / cell) & 7;
      const threshold = (BAYER[by * 8 + bx] + 0.5) / 64;
      if (density <= threshold) continue;
      const rgb = INK[(bx + by * 3) & 3];
      const alpha = 0.55 + density * 0.4;
      ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
      const gap = dpr > 1 ? 1 : 0;
      ctx.fillRect(x, y, cell - gap, cell - gap);
    }
  }
}

function mount(el: Element | null, opts: DitherOptions) {
  if (!(el instanceof HTMLElement) || el.dataset.pxDither) return;
  let host: HTMLElement | null = el.parentElement;
  while (host && host !== document.body && clips(host)) host = host.parentElement;
  if (!host) return;
  el.dataset.pxDither = "1";
  if (getComputedStyle(host).position === "static") host.style.position = "relative";
  host.style.isolation = "isolate";
  if (getComputedStyle(el).position === "static") el.style.position = "relative";
  if (getComputedStyle(el).zIndex === "auto") el.style.zIndex = "2";

  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.className = "px-dither";
  canvas.style.position = "absolute";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "1";
  host.appendChild(canvas);

  let frame = 0;
  const layout = () => {
    const hr = host.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    if (er.width < 24 || er.height < 24) {
      canvas.style.display = "none";
      return;
    }
    canvas.style.display = "block";
    const widthRatio = opts.width ?? 0.7;
    const cssW = Math.max(140, er.width * widthRatio);
    const cssH = opts.height ?? 48;
    const left = er.left - hr.left + (er.width - cssW) / 2 + (opts.shift ?? 0);
    const top = er.bottom - hr.top - cssH * (opts.tuck ?? 0.08);
    canvas.style.left = `${Math.round(left)}px`;
    canvas.style.top = `${Math.round(top)}px`;
    canvas.style.width = `${Math.round(cssW)}px`;
    canvas.style.height = `${Math.round(cssH)}px`;
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      paint(canvas, cssW, cssH);
    });
  };

  layout();
  window.addEventListener("resize", layout);
  const observer = new ResizeObserver(layout);
  observer.observe(el);
  observer.observe(host);
}

type PlateKind = "field" | "grain" | "scatter" | "band" | "wash" | "frame" | "drift";

const YELLOW: Array<[number, number, number]> = [
  [255, 214, 64],
  [242, 190, 42],
  [255, 236, 168],
  [214, 160, 28],
];

type Box = { l: number; t: number; r: number; b: number };

function localBox(node: HTMLElement, host: HTMLElement): Box {
  let left = 0;
  let top = 0;
  let current: HTMLElement | null = node;
  for (let guard = 0; current && current !== host && guard < 12; guard += 1) {
    left += current.offsetLeft;
    top += current.offsetTop;
    const next: Element | null = current.offsetParent;
    if (!(next instanceof HTMLElement) || (next !== host && !host.contains(next))) {
      const hostRect = host.getBoundingClientRect();
      const nodeRect = node.getBoundingClientRect();
      return {
        l: nodeRect.left - hostRect.left,
        t: nodeRect.top - hostRect.top,
        r: nodeRect.right - hostRect.left,
        b: nodeRect.bottom - hostRect.top,
      };
    }
    current = next;
  }
  return { l: left, t: top, r: left + node.offsetWidth, b: top + node.offsetHeight };
}

function measureBox(host: HTMLElement, cssW: number, cssH: number): Box {
  const hostArea = cssW * cssH;
  let best: Box | null = null;
  let bestArea = 0;
  for (const node of host.querySelectorAll<HTMLElement>("*")) {
    if (node.tagName === "CANVAS") continue;
    const bg = getComputedStyle(node).backgroundColor;
    if (!bg || bg === "transparent" || bg === "rgba(0, 0, 0, 0)") continue;
    const box = localBox(node, host);
    const area = Math.max(0, box.r - box.l) * Math.max(0, box.b - box.t);
    if (area < hostArea * 0.18 || area > hostArea * 0.97) continue;
    if (area > bestArea) {
      best = box;
      bestArea = area;
    }
  }
  if (best) return best;

  const title = host.querySelector("h2, h3");
  if (title instanceof HTMLElement) {
    const bits = [title, ...host.querySelectorAll("a")].filter(
      (node): node is HTMLElement => node instanceof HTMLElement,
    );
    let left = Number.POSITIVE_INFINITY;
    let top = Number.POSITIVE_INFINITY;
    let right = 0;
    let bottom = 0;
    for (const bit of bits) {
      const box = localBox(bit, host);
      left = Math.min(left, box.l);
      top = Math.min(top, box.t);
      right = Math.max(right, box.r);
      bottom = Math.max(bottom, box.b);
    }
    if (right > left && bottom > top) {
      return { l: left - 28, t: top - 28, r: right + 28, b: bottom + 28 };
    }
  }

  const bw = cssW * 0.36;
  const bh = cssH * 0.36;
  return { l: (cssW - bw) / 2, t: (cssH - bh) / 2, r: (cssW + bw) / 2, b: (cssH + bh) / 2 };
}

function outsideDistance(x: number, y: number, box: Box) {
  const dx = Math.max(box.l - x, 0, x - box.r);
  const dy = Math.max(box.t - y, 0, y - box.b);
  return Math.hypot(dx, dy);
}

function paintPlate(canvas: HTMLCanvasElement, cssW: number, cssH: number, kind: PlateKind, box: Box) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const cell = kind === "grain" || kind === "drift" ? 2 : kind === "scatter" ? 5 : kind === "frame" ? 4 : 3;
  const step = Math.max(2, Math.round(cell * dpr));
  const w = Math.max(1, Math.round(cssW * dpr));
  const h = Math.max(1, Math.round(cssH * dpr));
  if (canvas.width !== w) canvas.width = w;
  if (canvas.height !== h) canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.fillStyle = "#070708";
  ctx.fillRect(0, 0, w, h);

  const scaled: Box = { l: box.l * dpr, t: box.t * dpr, r: box.r * dpr, b: box.b * dpr };
  const reach = 64 * dpr;
  const peak = kind === "scatter" ? 0.95 : 0.92;
  const rimReach = 120 * dpr;

  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const hash = ((Math.imul(x, 374761393) + Math.imul(y, 668265263)) >>> 0) % 1000;
      const wobble = 0.62 + (hash / 1000) * 0.7;
      let density = 0;
      if (kind === "frame") {
        const px = x + step * 0.5;
        const py = y + step * 0.5;
        const inset = Math.min(px, py, w - px, h - py);
        const ax = Math.min(px, w - px);
        const ay = Math.min(py, h - py);
        const rim = Math.max(0, 1 - inset / rimReach);
        const corner = Math.max(0, 1 - Math.hypot(ax, ay) / (rimReach * 1.15));
        density = (rim * 0.42 + corner * 0.5) * wobble;
      } else if (kind === "drift") {
        const nx = (x + step * 0.5) / w;
        const ny = (y + step * 0.5) / h;
        const wave = 0.55 + 0.45 * Math.sin(nx * Math.PI * 2.4 + 0.6);
        density = ny ** 1.65 * (0.16 + wave * 0.5) * wobble;
      } else {
        const dist = outsideDistance(x + step * 0.5, y + step * 0.5, scaled);
        const closeness = Math.max(0, 1 - dist / reach);
        density = closeness ** 1.15 * peak * wobble;
      }
      const bx = (x / step) & 7;
      const by = (y / step) & 7;
      const threshold = (BAYER[by * 8 + bx] + 0.5) / 64;
      if (density <= threshold) continue;
      const rgb = YELLOW[(bx + by) & 3];
      ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
      ctx.fillRect(x, y, step - (dpr >= 1.5 ? 1 : 0), step - (dpr >= 1.5 ? 1 : 0));
    }
  }
}

function toneCta(host: HTMLElement) {
  const title = host.querySelector("h2 span");
  if (title instanceof HTMLElement) title.style.setProperty("color", "#f6f1e4", "important");
  for (const link of host.querySelectorAll("a")) {
    if (!(link instanceof HTMLElement)) continue;
    if (link.classList.contains("v2-btn--primary")) {
      link.style.setProperty("background-color", "#f0d45c", "important");
      link.style.setProperty("color", "#14120c", "important");
      link.style.setProperty("border-color", "#f0d45c", "important");
    } else {
      link.style.setProperty("color", "#f6f1e4", "important");
    }
  }
}

function plate(host: HTMLElement, kind: PlateKind) {
  if (host.dataset.pxPlate) return;
  if (host.getAttribute("style")?.includes("--v2-cta-bg-image")) toneCta(host);
  host.dataset.pxPlate = kind;
  host.style.background = "none";
  host.style.backgroundImage = "none";
  host.style.backgroundColor = "#070708";
  host.style.opacity = "1";
  if (getComputedStyle(host).position === "static") host.style.position = "relative";

  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.position = "absolute";
  canvas.style.inset = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "0";
  host.insertBefore(canvas, host.firstChild);
  for (const child of host.children) {
    if (child === canvas || !(child instanceof HTMLElement)) continue;
    if (getComputedStyle(child).position === "static") child.style.position = "relative";
    if (getComputedStyle(child).zIndex === "auto") child.style.zIndex = "1";
  }

  let frame = 0;
  const layout = () => {
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (width < 8 || height < 8) return;
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => paintPlate(canvas, width, height, kind, measureBox(host, width, height)));
  };
  layout();
  window.addEventListener("resize", layout);
  const observer = new ResizeObserver(layout);
  observer.observe(host);
}

function plateWhere(needle: string, kind: PlateKind) {
  for (const el of document.querySelectorAll<HTMLElement>("[style]")) {
    const style = el.getAttribute("style") ?? "";
    if (!style.includes("background-image") || !style.includes(needle)) continue;
    plate(el, kind);
  }
}

function heading(text: string) {
  return [...document.querySelectorAll("h2, h3")].find((el) => el.textContent?.includes(text));
}

function climb(el: Element | null | undefined, minH: number) {
  let node = el instanceof HTMLElement ? el : null;
  while (node && node.getBoundingClientRect().height < minH) node = node.parentElement;
  return node;
}

function ready() {
  mount(document.querySelector(".collage"), {
    width: 0.92,
    height: 92,
    tuck: 0.12,
    shift: -6,
  });

  mount(document.querySelector(".agent-lineup"), {
    width: 0.84,
    height: 70,
    tuck: 0.2,
  });

  const different = heading("Different agents");
  const differentFrame = different?.closest(".relative");
  if (differentFrame instanceof HTMLElement) {
    mount(differentFrame, { width: 0.7, height: 40, tuck: 0.14 });
  }

  const six = [...document.querySelectorAll("h2")].find((el) =>
    el.textContent?.replace(/\s+/g, " ").trim().startsWith("Multiple agents"),
  );
  const sixRow = six?.closest(".v2-section-header-row");
  if (sixRow instanceof HTMLElement) {
    mount(sixRow, { width: 0.42, height: 34, tuck: 0.16, shift: -40 });
  }

  plateWhere("--v2-product-secrets-gradient", "grain");
  plateWhere("--v2-product-cert-gradient", "field");
  plateWhere("--v2-product-pam-gradient", "scatter");
  plateWhere("--v2-cta-bg-image", "frame");
  for (const el of document.querySelectorAll<HTMLElement>("[style]")) {
    const style = el.getAttribute("style") ?? "";
    if (!style.includes("background-image") || !style.includes("--v2-spacer-bg-image")) continue;
    el.style.backgroundImage = "none";
    el.style.opacity = "0";
    const clip = el.parentElement instanceof HTMLElement ? el.parentElement : el;
    plate(clip, "drift");
  }
  const integrations = document.querySelector(".integrations-stage");
  if (integrations instanceof HTMLElement) {
    const photo = integrations.querySelector(".v2-reliability-bg");
    if (photo instanceof HTMLElement) photo.style.display = "none";
    plate(integrations, "grain");
  }

  mount(document.querySelector(".v2-broker-grid"), {
    width: 0.76,
    height: 64,
    tuck: 0.1,
  });

  const aws = [...document.querySelectorAll("a")].find(
    (anchor) => anchor.getAttribute("aria-label")?.trim() === "GitHub",
  );
  if (aws) {
    let logoGrid: HTMLElement | null = aws.parentElement;
    while (
      logoGrid &&
      !(
        logoGrid.classList.contains("relative") &&
        logoGrid.classList.contains("w-full") &&
        logoGrid.getBoundingClientRect().height > 180
      )
    ) {
      logoGrid = logoGrid.parentElement;
    }
    mount(logoGrid, { width: 0.7, height: 52, tuck: 0.06 });
  }

  mount(document.querySelector(".customer-stories-strip"), {
    width: 0.72,
    height: 26,
    tuck: 0.04,
  });

  const post = [...document.querySelectorAll("a")].find((anchor) =>
    anchor.getAttribute("aria-label")?.startsWith("View post"),
  );
  if (post) mount(climb(post, 480), { width: 0.7, height: 52, tuck: 0.08 });
}

export function LandingDither() {
  useEffect(() => {
    ready();
  }, []);

  return null;
}
