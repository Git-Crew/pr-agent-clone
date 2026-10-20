"use client";

import { useEffect } from "react";

const SLOTS = ["slot-0", "slot-1", "slot-2", "slot-3"] as const;

function slotOf(el: Element) {
  for (const name of SLOTS) {
    if (el.classList.contains(name)) return Number(name.slice(5));
  }
  return -1;
}

function labelFor(slot: HTMLElement) {
  if (slot.dataset.showLabel) return slot.dataset.showLabel;
  const name = slot.querySelector(".card-label")?.textContent?.replace(/\s+/g, " ").trim();
  return name ? `Show ${name}` : "Show card";
}

function setFront(slot: HTMLElement, front: boolean) {
  slot.classList.toggle("is-front", front);
  slot.querySelector(".peek-card, .collage-window")?.classList.toggle("is-front", front);
  const group = slot.querySelector("[role='group']");
  if (group) group.setAttribute("aria-hidden", front ? "false" : "true");
  if (front) {
    slot.removeAttribute("role");
    slot.removeAttribute("tabindex");
    slot.removeAttribute("aria-label");
  } else {
    slot.setAttribute("role", "button");
    slot.tabIndex = 0;
    slot.setAttribute("aria-label", labelFor(slot));
  }
  for (const button of slot.querySelectorAll("button")) {
    button.tabIndex = front ? 0 : -1;
  }
}

function promote(stack: HTMLElement, slot: HTMLElement) {
  const current = slotOf(slot);
  if (current <= 0) return;
  const offset = (SLOTS.length - current) % SLOTS.length;
  for (const el of stack.querySelectorAll(":scope > .card-slot")) {
    if (!(el instanceof HTMLElement)) continue;
    const next = (slotOf(el) + offset) % SLOTS.length;
    for (const name of SLOTS) el.classList.remove(name);
    el.classList.add(`slot-${next}`);
    setFront(el, next === 0);
  }
}

function prFilter(name: string) {
  const label = name.trim().toLowerCase();
  if (label.startsWith("all")) return "";
  if (label.startsWith("active")) return "active";
  if (label.startsWith("closed")) return "closed";
  if (label.startsWith("merged")) return "merged";
  return null;
}

function rowIsPr(row: HTMLElement, state: string) {
  if (!state) return true;
  if (row.dataset.pr) return row.dataset.pr === state;
  if (state === "active") return Boolean(row.querySelector(".is-secret, .is-dynamic"));
  if (state === "closed") return Boolean(row.querySelector(".is-folder"));
  if (state === "merged") return Boolean(row.querySelector(".is-import"));
  return true;
}

function selectTab(tab: HTMLElement) {
  const list = tab.closest("[role='tablist']");
  if (!list) return;
  for (const item of list.querySelectorAll("[role='tab']")) {
    const on = item === tab;
    item.classList.toggle("is-active", on);
    item.setAttribute("aria-selected", on ? "true" : "false");
  }
  const name = tab.textContent?.trim() ?? "All PRs";
  const card = tab.closest(".peek-card, .collage-window");
  if (!(card instanceof HTMLElement)) return;
  const state = prFilter(name);
  const rows = card.classList.contains("collage-window")
    ? card.querySelectorAll(".stage-tr")
    : card.querySelectorAll(".peek-row:not(.peek-head)");
  for (const row of rows) {
    if (!(row instanceof HTMLElement)) continue;
    const show = state === null ? true : rowIsPr(row, state);
    row.style.display = show ? "" : "none";
  }
}

function toggleEnv(button: HTMLElement) {
  const list = button.parentElement;
  if (!list) return;
  const options = [...list.querySelectorAll(".env-opt")];
  const enabled = options.filter((option) => option.classList.contains("is-on"));
  if (button.classList.contains("is-on") && enabled.length <= 1) return;
  const on = !button.classList.contains("is-on");
  button.classList.toggle("is-on", on);
  button.setAttribute("aria-selected", on ? "true" : "false");
  const visible = options.map((option) => option.classList.contains("is-on"));
  const table = button.closest(".card-slot")?.querySelector(".stage-table");
  if (!(table instanceof HTMLElement)) return;
  table.style.setProperty("--envcount", String(visible.filter(Boolean).length));
  for (const row of table.querySelectorAll(".stage-row")) {
    const cells = [...row.querySelectorAll(".stage-cell-env")];
    cells.forEach((cell, index) => {
      if (cell instanceof HTMLElement) cell.style.display = visible[index] ? "" : "none";
    });
  }
}

function toggleSwitch(button: HTMLElement) {
  const on = !button.classList.contains("is-on");
  button.classList.toggle("is-on", on);
  button.setAttribute("aria-checked", on ? "true" : "false");
  const copy = button.querySelector(".peek-toggle-copy");
  if (copy) copy.textContent = on ? "Run without access" : "On allowance";
}

function ready() {
  const stack = document.querySelector(".collage-stack");
  if (!(stack instanceof HTMLElement) || stack.dataset.collageReady) return;
  stack.dataset.collageReady = "1";
  stack.classList.remove("is-locked");

  for (const el of stack.querySelectorAll(":scope > .card-slot")) {
    if (el instanceof HTMLElement) el.dataset.showLabel = labelFor(el);
  }

  const onClick = (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const slot = target.closest(".card-slot");
    if (!(slot instanceof HTMLElement) || !stack.contains(slot)) return;
    if (!slot.classList.contains("is-front")) {
      promote(stack, slot);
      return;
    }
    const button = target.closest("button");
    if (!(button instanceof HTMLElement)) return;
    if (button.classList.contains("peek-tab") || button.classList.contains("stage-tab")) selectTab(button);
    else if (button.classList.contains("env-opt")) toggleEnv(button);
    else if (button.classList.contains("peek-toggle")) toggleSwitch(button);
  };

  const onKey = (event: KeyboardEvent) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const slot = event.target instanceof Element ? event.target.closest(".card-slot") : null;
    if (!(slot instanceof HTMLElement) || slot.classList.contains("is-front") || event.target !== slot) return;
    event.preventDefault();
    promote(stack, slot);
  };

  stack.addEventListener("click", onClick);
  stack.addEventListener("keydown", onKey);
}

export function HeroCollage() {
  useEffect(() => {
    ready();
  }, []);

  return null;
}
