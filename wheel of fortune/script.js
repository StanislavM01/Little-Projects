(function () {
  const wheel = document.querySelector('.wheel');
  const startButton = document.querySelector('.button');
  const display = document.querySelector('.display');
  let audio = new Audio('./assets/wheelAudio.wav');

  let deg = 0;
  let zoneSize = 30;
  let isFreeSpins = false
  let freeSpinsNumbers = []


  const symbolSegments1 = {
    1: 10,
    2: 45,
    3: '3 Free Spins',
    4: 30,
    5: 25,
    6: 40,
    7: 95,
    8: 80,
    9: 50,
    10: 15,
    11: 20,
    12: 5
  }

  let allNumbersDrawn = []

  let [firstKey, secondKey] = randomKeyGenerator()
  let firstDigit = symbolSegments1[firstKey]
  let secondDigit = symbolSegments1[secondKey]
  console.log(firstDigit, secondDigit ,'special digits')

  let positionsFirstDigit = firstDigitPositionsGen()
  let positionsSecondDigit = secondDigitPositionsGen(positionsFirstDigit)
  console.log(positionsFirstDigit, positionsSecondDigit,'positions of the special digits')

  function randomKeyGenerator() {
    let arr = []
    while (arr.length < 2) {
      let key = Math.ceil(Math.random() * 12)
      if (key != 3 && !arr.includes(key)) {
        arr.push(key)
      }
    }

    return arr
  }

  function firstDigitPositionsGen() {
    let arr = []
    while (arr.length < 3) {
      let position = Math.floor(Math.random() * 10)
      let isRepeat = arr.some(a => a == position)
      let isValid = arr.every(a => position >= a + 2 || position <= a - 2)
      if (!isRepeat && isValid) {
        arr.push(position)
      }
    }
    return arr.sort((a, b) => a - b)

  }

  function secondDigitPositionsGen(firstKeyArray) {
    let arr = []
    while (arr.length < 2) {
      let position = Math.floor(Math.random() * 10)
      let isRepeat = arr.some(a => a == position)
      let isValid = arr.every(a => position >= a + 2 || position <= a - 2)

      if (!isRepeat && isValid && !firstKeyArray.includes(position)) {
        arr.push(position)
      }
    }
    return arr.sort((a, b) => a - b)

  }

  function resetPositions() {
    positionsFirstDigit = firstDigitPositionsGen()
    positionsSecondDigit = secondDigitPositionsGen(positionsFirstDigit)
    allNumbersDrawn = []
    console.log(positionsFirstDigit,positionsSecondDigit,'new positions of the special digits')
  }

  function degreeGenerator() {
    let nextIndexInArr = allNumbersDrawn.length
    let isMatchedFirstArr = positionsFirstDigit.some(a => a == nextIndexInArr)
    let isMatchedSecondArr = positionsSecondDigit.some(a => a == nextIndexInArr)

    let degree 
    if (isFreeSpins) {
      let winningSymbol 
      while (!winningSymbol  || winningSymbol == '3 Free Spins') {
        degree = Math.floor(1000 + Math.random() * 1000);
        let keyObject = Math.ceil((degree % 360) / zoneSize)
        winningSymbol = symbolSegments1[keyObject]
      }

    } else if (isMatchedFirstArr) {
      let positionInWheel = Object.keys(symbolSegments1).find(key => symbolSegments1[key] == firstDigit)
      degree = positionInWheel * zoneSize + 1440 - 15

    } else if (isMatchedSecondArr) {
      let positionInWheel = Object.keys(symbolSegments1).find(key => symbolSegments1[key] == secondDigit)
      degree = positionInWheel * zoneSize + 1440 - 15
      // -15 degrees cause to center the arrow in middle of field
      //1440 degrees is 4 spins of the whole wheel

    } else {
      let winningSymbol 
      while (!winningSymbol  || [firstDigit, secondDigit].includes(winningSymbol)) {
        degree = Math.floor(1000 + Math.random() * 1000);
        let keyObject = Math.ceil((degree % 360) / zoneSize)
        winningSymbol = symbolSegments1[keyObject]
      }

    }


    return degree
  }







  function startFreeSpins() {
    setTimeout(function () {
      deg = degreeGenerator()
      wheel.style.transition = 'all 5s ease-out';
      wheel.style.transform = `rotate(${deg}deg)`;
      audio.play()
      wheel.classList.add('blur');
    }, 500)


  }


  startButton.addEventListener('click', () => {
    if (allNumbersDrawn.length == 10) {
      resetPositions()
    }

    display.textContent = "-";
    startButton.style.pointerEvents = 'none';
    deg = degreeGenerator()
    //deg = 1530
    wheel.style.transition = 'all 5s ease-out';
    wheel.style.transform = `rotate(${deg}deg)`;
    audio.play()
    wheel.classList.add('blur');

  });




  wheel.addEventListener('transitionend', () => {
    wheel.classList.remove('blur');
    startButton.style.pointerEvents = 'auto';
    wheel.style.transition = 'none';
    let actualDeg = deg % 360;
    wheel.style.transform = `rotate(${actualDeg}deg)`;
    //handleWin(actualDeg);

    if (isFreeSpins) {
      let winningSymbolNr = Math.ceil(actualDeg / zoneSize);
      freeSpinsNumbers.push(symbolSegments1[winningSymbolNr])
      console.log(freeSpinsNumbers, 'free spins')

      if (freeSpinsNumbers.length < 3) {
        startFreeSpins()

      } else {
        display.textContent = `Total: ${freeSpinsNumbers.reduce((a, b) => a + b)}`
        isFreeSpins = false
        freeSpinsNumbers = []
      }

    } else {
      let winningSymbolNr = Math.ceil(actualDeg / zoneSize);
      display.textContent = symbolSegments1[winningSymbolNr];
      allNumbersDrawn.push(symbolSegments1[winningSymbolNr])
      console.log(allNumbersDrawn,'all number drawn')

      if (symbolSegments1[winningSymbolNr] == '3 Free Spins') {
        startFreeSpins()
        isFreeSpins = true
      }
    }

    // 


  });
})();
