import { catsData } from '/data.js'

const animatedBtn = document.getElementById('animated-btn')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('modal-bg')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')
const moodBtns = document.querySelectorAll('.mood-btn')

let isGif = false

memeModal.addEventListener('click', closeModal)

animatedBtn.addEventListener('click', function(e){
  if (isGif){
    isGif = false
    this.firstElementChild.textContent = ''
    console.log(this);
  } else {
    isGif = true
    this.firstElementChild.textContent = '✓'
    console.log(this);
  }
})

for (let btn of moodBtns) {
  btn.addEventListener('click', function () {
    const selectedMood = this.textContent.trim()
    // Get matching objects
    const matchingCatsArray = getMatchingCatsArray(selectedMood)
    // Pick on randomly
    const randomIndex = Math.floor(Math.random() * matchingCatsArray.length)
    // Render
    renderCat(matchingCatsArray[randomIndex])
  })
}


function closeModal() {
  memeModal.style.display = 'none'
}

function renderCat(catObject) {
  memeModalInner.innerHTML = `
        <img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >
        `
  memeModal.style.display = 'flex'
}

function getMatchingCatsArray(mood) {
  const matchingCatsArray = catsData.filter(function (cat) {
    if (isGif) {
      return cat.emotionTags.includes(mood) && cat.isGif
    }
    else {
      return cat.emotionTags.includes(mood)
    }
  })
  return matchingCatsArray
}  