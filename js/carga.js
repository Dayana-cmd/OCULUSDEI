const $pancarga = document.getElementById("pancarga");
const $logo = document.getElementById("logoa");

$pancarga.addEventListener("animationout", () => {});
$logo.addEventListener("animationend", () => {
  $pancarga.classList.add("out");
});