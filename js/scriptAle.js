//PER RIEMPIRE I CUORI A PAG.2//
const hearts = document.querySelectorAll(".heart-icon")

function likeStay(){
  for(const heart of hearts){
    heart.addEventListener("click", function(){
      heart.classList.toggle("bi-heart-fill")
      heart.classList.toggle("bi-heart")
    })
    

  }
}
likeStay()