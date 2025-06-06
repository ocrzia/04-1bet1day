let myOdds = []
let myBets = document.querySelector('.bets')
let cumulatedOdds = 1
let totalOdds = 0
const maMise = document.querySelector('.stake input')
const coteTot = document.querySelector('.total_odd span')
const gainPot = document.querySelector('.potential_win span')
const compteurBets = document.querySelector('header span')
const betBox = document.querySelector('.bet-box')
const coupon = document.querySelector('.coupon')
const paris = document.querySelector('.bets')
const aside = document.querySelector('.aside')
const darkMode = document.querySelector('.dark-mode')
localStorage.setItem('colorTheme', "light")
let myThemeColor

// START ||| Dark Theme

darkMode.addEventListener('click',(e) => {
  if(e.target.classList.contains('fa-solid')) {
    let allIcons = darkMode.querySelectorAll('i')
    allIcons.forEach(singleIcon => {
      singleIcon.classList.toggle('active')
    })
    document.querySelector('body').classList.toggle('darkmode')
  }
})

// START ||| Random BG
function randomBG() {
  const nombreAleatoire = Math.floor(Math.random() * 3) + 1
  document.querySelector('.content').style.backgroundImage = `url("../images/bg${nombreAleatoire}.png")`
}

randomBG()
// START ||| Injection des datas en .json

function afficherMatchs() {
  fetch(`../scripts/datas.json`)
    .then(response => response.json())
    .then(data => {
      // console.log(data.matchs);
      data.matchs.forEach(function(singleMatch){
        paris.innerHTML += `
        <div class="bet" data-matchid="${singleMatch.match_id}">
          <div class="match">
            <div class="home">${singleMatch.hometeam}</div> - <div class="away">${singleMatch.awayteam}</div>
          </div>
          <div class="odds">
            <div class="odd" data-choice="home">${singleMatch.home_odd}</div>
            <div class="odd" data-choice="draw">${singleMatch.draw_odd}</div>
            <div class="odd" data-choice="away">${singleMatch.away_odd}</div>
          </div>
        </div>
        `
      })
    })
    .catch(error => {console.log("Erreur lors de la récup des données :", error);
  })
}

afficherMatchs()

// END ||| Injection des datas en .json



function ajouterCote(homeTeam, awayTeam, maCote, monChoix, numMatch) {
  // console.log(coupon.querySelector(`[data-single-matchid="${numMatch}"]`))
  // if(coupon.querySelector(`[data-single-matchid="${numMatch}"]`) == null) {
    let intCote = {
      Home : homeTeam,
      Away : awayTeam,
      Cote : parseFloat(maCote),
      Choice : monChoix,
      NumeroMatch : numMatch
    }
    myOdds.push(intCote)
    console.log(myOdds)
    cumulatedOdds = cumulatedOdds * intCote.Cote
    totalOdds++
    document.querySelector('.total_odd span').innerHTML = cumulatedOdds.toFixed(2)
    compteurBets.innerHTML = myOdds.length
    let choixTeam
    if(intCote.Choice == "home") {
      choixTeam = intCote.Home
    } else if (intCote.Choice == "away") {
      choixTeam = intCote.Away
    } else {
      choixTeam = "Match Nul"
    }
    coupon.innerHTML += `
    <div class="choice" data-index="${myOdds.length-1}" data-single-matchid="${intCote.NumeroMatch}">
      <div class="mychoice">${choixTeam} <span>${intCote.Home} - ${intCote.Away}</span></div>
      <div class="myodd">${intCote.Cote}</div>
      <div class="trash" title="supprimer">🗑️</div>
    </div>
    ` 
  // } else {
    // console.log("y en a déjà un");

  // }
}

function enleverCote(indexToRemove, numeroMatch, coteToRemove){
  totalOdds--
  compteurBets.innerHTML = totalOdds
  cumulatedOdds = cumulatedOdds / coteToRemove
  document.querySelector('.total_odd span').innerHTML = cumulatedOdds.toFixed(2)
  myOdds.splice(indexToRemove, 1)
  console.log(myOdds)
  coupon.innerHTML = ""
  for(i=0; i < myOdds.length; i++) {
    let choixTeam
    if(myOdds[i].Choice == "home") {
      choixTeam = myOdds[i].Home
    } else if (myOdds[i].Choice == "away") {
      choixTeam = myOdds[i].Away
    } else {
      choixTeam = "Match Nul"
    }
    coupon.innerHTML += `
    <div class="choice" data-index="${i}" data-single-matchid="${myOdds[i].NumeroMatch}">
      <div class="mychoice">${choixTeam} <span>${myOdds[i].Home} - ${myOdds[i].Away}</span></div>
      <div class="myodd">${myOdds[i].Cote}</div>
      <div class="trash" title="supprimer">🗑️</div>
    </div>
    ` 
  }

  if (document.querySelector('[data-matchid="'+numeroMatch+'"] .active')) {
    document.querySelector('[data-matchid="'+numeroMatch+'"] .active').classList.remove('active')
  }
  if(totalOdds == 0) {
    betBox.classList.remove('montray_menu')
  }
}
function potentialGain(mise, cote) {
  if(maMise.value != "" && coteTot.innerHTML != "0") {
    gainPot.innerHTML =(parseFloat(mise) * parseFloat(cote)).toFixed(2) + "€"
  }
}

myBets.addEventListener('click', function(e){
  let localBets = e.target.parentElement.querySelectorAll('.odd')
  
  if(e.target.classList.contains('odd')) {
    // START ||| Routine pour le changement de classe au click
      // S'il y a déjà une classe active sur l'élément cliqué
    if(e.target.classList.contains('active')) {
      e.target.classList.toggle('active')
      // S'il n'y a pas encore de classe active sur l'élément cliqué
    } else {
      if (e.target.closest('.odds').querySelector('.active')) {
        e.target.closest('.odds').querySelector('.active').classList.remove('active')
      }
      e.target.classList.add('active')
    }
    // END ||| Routine pour le changement de classe au click
    

    // START ||| Routine pour l'ajout de cote dans le tableau
    ajouterCote(e.target.closest('.odds').parentElement.querySelector('.home').innerText, e.target.closest('.odds').parentElement.querySelector('.away').innerText, e.target.innerHTML, e.target.getAttribute("data-choice"), e.target.closest('.bet').getAttribute('data-matchid'))
    potentialGain(maMise.value, coteTot.innerHTML)
  }
  if(myOdds.length > 0) {
    betBox.classList.add('montray_menu')
  } else {
    betBox.classList.remove('montray_menu')
  }
})

maMise.addEventListener('change', function() {
  potentialGain(maMise.value, coteTot.innerHTML)
})
maMise.addEventListener('keyup', function() {
  potentialGain(maMise.value, coteTot.innerHTML)
})

betBox.addEventListener('click', function(e){
  if(e.target.classList.contains('trash')) {
    enleverCote(
      e.target.parentElement.getAttribute("data-index"),
      parseInt(e.target.closest('.choice').getAttribute('data-single-matchid')),
      parseFloat(e.target.closest('.choice').querySelector('.myodd').innerHTML)
      )
    e.target.closest('.choice').remove()
  }
})
