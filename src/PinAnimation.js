import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);

export default class PinAnimation {
  constructor() {
    this.initDOM();
    this.master = gsap.timeline();
    this.init();
  }

  initDOM() {
    this.DOM = {
      container: document.querySelector(".mosaique"),
      stickySection: document.querySelector(".mosaique__sticky"),
      rowsContainer: document.querySelector(".mosaique__rows"),
      mosaiqueItems: document.querySelectorAll(".mosaique__item"),
      videos: document.querySelectorAll(".mosaique__item video"),
      titlesContainer: document.querySelectorAll(".mosaique__titles"),
      titles: document.querySelectorAll("[data-title]"),
    };
  }

  init() {
    const sectionTl = this.animateSection();
    const titleTl = this.animateTitles();

    this.master.add(sectionTl);
    this.master.add(titleTl);
  }

  animateSection() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.DOM.container,
        start: "top top",
        end: `${window.innerHeight * 3}px`,
        // markers: true,
        scrub: true,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => this.handlePhaseUpdate(self),
      },
    });

    gsap.set(this.DOM.rowsContainer, {
      scale: 1,
      yPercent: 0,
    });

    gsap.set(this.DOM.mosaiqueItems, {
      clipPath: "inset(0 round 0)",
    });

    return tl;
  }

  animateTitles() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.DOM.container,
        start: "top top",
        end: `${window.innerHeight * 3}px`,
        scrub: true,
        // markers: true,
        onUpdate: (self) => this.handlePhaseUpdate(self),
      },
    });

    this.DOM.titles.forEach((title, index) => {
      const split = new SplitText(title, { type: "lines,chars" });

      const titleTl = gsap.timeline();

      titleTl.from(split.chars, {
        opacity: 0,
        stagger: 0.05,
        ease: "none",
        duration: 2,
      });

      titleTl.to(
        split.chars,
        {
          opacity: 0,
          stagger: 0.05,
          ease: "none",
          duration: 2,
        },
        "+=0.5"
      );

      tl.add(titleTl);
    });

    return tl;
  }

  handlePhaseUpdate(scrollTrigger) {
    const scrollProgress = scrollTrigger.progress;
    const easeFunc = gsap.parseEase("circ.in");

    if (scrollProgress <= 0.5) {
      // Phase 1
      const p1 = scrollProgress / 0.5; // normalisé 0..1

      gsap.set(this.DOM.rowsContainer, {
        scale: gsap.utils.interpolate(1, 0.7, p1),
        yPercent: 0,
      });

      gsap.set(this.DOM.mosaiqueItems, {
        clipPath: `inset(${gsap.utils.interpolate(
          0,
          10,
          p1
        )}px round ${gsap.utils.interpolate(0, 10, p1)}px )`,
      });

      gsap.set(this.DOM.titlesContainer, {
        yPercent: 0,
        xPercent: 0,
      });
    } else {
      // Phase 2
      const p2 = (scrollProgress - 0.5) / 0.5; // normalisé 0..1

      gsap.set(this.DOM.rowsContainer, {
        scale: gsap.utils.interpolate(0.7, 0.5, p2),
        yPercent: gsap.utils.interpolate(0, -25, easeFunc(p2)),
      });

      gsap.set(this.DOM.titlesContainer, {
        yPercent: gsap.utils.interpolate(0, -25, easeFunc(p2)),
        xPercent: 0,
      });
    }
  }
}
