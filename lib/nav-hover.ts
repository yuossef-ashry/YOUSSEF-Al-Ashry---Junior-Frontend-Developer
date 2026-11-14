export function createNavHover(root: HTMLElement | null) {
  const indicator = root?.querySelector<HTMLElement>(".nav-hover-pill");
  if (!root || !indicator) return null;

  const links = Array.from(root.querySelectorAll<HTMLAnchorElement>("a"));
  let hovered: HTMLAnchorElement | null = null;
  let disposed = false;

  function sync() {
    if (!root || !indicator) return;
    if (!root.offsetWidth) hovered = null;
    const active = document.activeElement;
    const focused = active instanceof HTMLAnchorElement && root.contains(active) && active.matches(":focus-visible") ? active : null;
    const target = root.offsetWidth ? focused ?? hovered : null;
    indicator.classList.toggle("is-visible", Boolean(target));
    if (!target) return;
    indicator.style.width = `${target.offsetWidth + 4}px`;
    indicator.style.transform = `translateX(${target.offsetLeft - 2}px)`;
    indicator.classList.toggle("is-on-active", target.classList.contains("is-active"));
  }

  const enter = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    hovered = event.currentTarget as HTMLAnchorElement;
    sync();
  };
  const leave = () => {
    hovered = null;
    sync();
  };
  const blur = () => queueMicrotask(() => { if (!disposed) sync(); });

  links.forEach((link) => link.addEventListener("pointerenter", enter));
  root.addEventListener("pointerleave", leave);
  root.addEventListener("focusin", sync);
  root.addEventListener("focusout", blur);
  sync();

  return {
    sync,
    dispose() {
      disposed = true;
      links.forEach((link) => link.removeEventListener("pointerenter", enter));
      root.removeEventListener("pointerleave", leave);
      root.removeEventListener("focusin", sync);
      root.removeEventListener("focusout", blur);
      indicator.classList.remove("is-visible", "is-on-active");
    },
  };
}
