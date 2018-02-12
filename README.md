# Memory Game

## A js Memory Game
This is going to be a huge challenge for an old duck like me. So here goes. 
![game example]
(https://github.com/cypherjones/Recall/blob/master/img/example001.png)

### Challenges
I had a ton of challenges for a first time Frontend guy. I'll try to go through them here in relative detail.

#### Shuffle, really?
I literally had no idea how to shuffle anything programatically starting out. And to be honest, I'm not entirely sure how this code works. But I did my research and found something that most people seemed to use when trying shuffle any sort of array. So thanks to [Stackoverflow](https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array).

```javascript
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
```