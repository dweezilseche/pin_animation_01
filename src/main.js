import "./style.scss";
import gsap from "gsap";
import Lenis from "lenis";
import updateAspectRatio from "./AspectRatio.js";
import PinAnimation from "./PinAnimation.js";
import HeroAnimation from "./HeroAnimation.js";

// Initialize HeroAnimation
new HeroAnimation();

// Initialize PinAnimation
new PinAnimation();

// Set initial aspect ratios
updateAspectRatio();

// Lenis: smooth scrolling
const lenis = new Lenis({
  smoothWheel: true,
  smoothTouch: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
