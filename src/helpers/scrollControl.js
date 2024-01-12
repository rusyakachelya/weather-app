export function preventBodyScroll(isActive) {
    const body = document.querySelector("body");
    if (isActive) {
        body.style.overflow = "hidden";
    } else {
        body.style.overflow = "auto";
    }
}