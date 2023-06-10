const boxA = document.getElementById('boxA');
const boxB = document.getElementById('boxB');
const boxC = document.getElementById('boxC');
const content = document.getElementById('content');
const btn = document.getElementById('btn');
const btnA = document.getElementById('btnA');

const arr = [
  { img: 1, content: "A turquoise colored sea" },
  { img: 2, content: "Frozen Mount" },
  { img: 3, content: "Earthly Clay" },
  { img: 4, content: "Mountain with pines" },
  { img: 5, content: "Man Captured" },
  { img: 6, content: "Beautiful Sunset" },
  { img: 7, content: "Mountains" },
];

boxA.addEventListener('mouseover', () => boxA.style.transform = "scale(1.2)");
boxA.addEventListener('mouseout', () => boxA.style.transform = "scale(1)");

boxB.addEventListener('mouseover', () => {
  const random = Math.trunc(Math.random() * 1000000);
  boxB.style.backgroundColor = `#${random}`;
});

boxC.addEventListener('mouseover', () => {
  const random = Math.trunc(Math.random() * arr.length);
  boxC.style.background = `url(./media/img_${arr[random].img}.jpg)`;
  content.textContent = arr[random].content;
  boxC.style.backgroundSize = "cover";
});

btn.addEventListener('click', () => {
  btn.style.display = "none";
  const stop = setInterval(ani, 1000);
  btnA.addEventListener('click', () => {
    btn.style.display = "block";
    clearInterval(stop);
  });
});

function ani() {
  setgrow();
  setcolor();
  imagechange();
}
const setgrow = () => {
    if (boxA.style.transform === "scale(1)") {
      boxA.style.transform = "scale(1.2)";
    } else {
      boxA.style.transform = "scale(1)";
    }
  };
  const setcolor = () => {
    const random = Math.trunc(Math.random() * 1000000);
    boxB.style.backgroundColor = `#${random}`;
  };
  const imagechange = () => {
    const random = Math.trunc(Math.random() * arr.length);
    boxC.style.background = `url(./media/img_${arr[random].img}.jpg)`;
    content.textContent = arr[random].content;
    boxC.style.backgroundSize = "cover";
  };