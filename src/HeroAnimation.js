import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);

export default class HeroAnimation {
  constructor() {
    this.initDOM();
    this.master = gsap.timeline();
    this.init();
  }

  initDOM() {
    this.DOM = {
      hero: document.querySelector(".hero"),
      title: document.querySelector(".hero__title"),
    };
  }

  init() {
    const titleTl = this.animateTitle();

    this.master.add(titleTl);
  }

  animateTitle() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.DOM.hero,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        // markers: true,
      },
    });

    const splitTitle = new SplitText(this.DOM.title, { type: "words,chars" });
    const chars = splitTitle.chars;

    // Animer le conteneur parent pour le déplacement vertical
    tl.to(
      this.DOM.title,
      {
        yPercent: -100,
        ease: "none",
      },
      0
    );

    tl.to(
      chars,
      {
        opacity: 0,
        ease: "power2.out",
        stagger: 0.05,
      },
      0
    );

    return tl;
  }
}
