export default function isTouchDevice() {
    return window.ontouchstart !== undefined;
}