const mosaiqueItems = document.querySelectorAll(".mosaique__item");

function updateAspectRatio() {
  const ratio = window.innerWidth / window.innerHeight;
  mosaiqueItems.forEach((item) => {
    item.style.aspectRatio = ratio;
  });
}

window.addEventListener("resize", updateAspectRatio);
export default updateAspectRatio;
