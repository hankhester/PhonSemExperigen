console.log('November 18th Design');
Experigen.initialize = function () {
  var items  = this.resource("items").shuffle();
  var pictures = this.resource("pictures").shuffle();

  var numberOfTrainingItems = 10;

//  var words = items.chooseRandom(34).map(function(obj) { return obj.item; });

//  var animateWords = words.slice(0, words.length / 2);
//  var inanimateWords = words.slice(words.length / 2, words.length);
  var animals = ['bird', 'cat', 'chicken', 'crab', 'deer', 'dog', 'duck', 'elephant', 'giraffe', 'hippo', 'horse', 'lion', 'penguin', 'pig', 'rabbit', 'tiger', 'turtle', 'zebra'];
  var objects = ['baloon', 'basket', 'basketball', 'book', 'bed', 'chair', 'clock', 'cup', 'flashlight', 'frisbee', 'guitar', 'kettle', 'pillow', 'pen', 'lighthouse', 'lampshade', 'toothbrush', 'umbrella'];
  shuffle(animals);
  shuffle(objects);

  var trainAnimals = animals.slice(0, numberOfTrainingItems);
  var testAnimals = animals.slice(numberOfTrainingItems, animals.length);

  var trainObjects = objects.slice(0, numberOfTrainingItems);
  var testObjects = objects.slice(numberOfTrainingItems, objects.length);

// for both animate and inanimate: 11 training, 5 testing, 1 additional item that is both trained and tested
/*  var animateTrainWords = [], animateTestWords = [], inanimateTrainWords = [], inanimateTestWords = [],
      animateOverlapWord, inanimateOverlapWord;

  if (animals.length != objects.length) {
    throw "Error: the number of animals does not equal the number of objects";
  } else {
    for (var i = 0; i < words.length; i++) {
      if (i < numberOfTrainingItems - 1) {
        animateTrainWords.push(words[i]);
      } else if (i < 16) {
        animateTestWords.push(words[i]);
      } else if (i < 17) {
        animateOverlapWord = words[i];
      } else if (i < 18) {
        inanimateOverlapWord = words[i];
      } else if (i < 29) {
        inanimateTrainWords.push(words[i]);
      } else if (i < 34) {
        inanimateTestWords.push(words[i]);
      } else {
        // throw "Error: the length of animals and objects is too long " + i;
        console.log(i);
      }
    }
    animateTrainWords.push(animateOverlapWord);
    animateTestWords.push(animateOverlapWord);
    inanimateTrainWords.push(inanimateOverlapWord);
    inanimateTestWords.push(inanimateOverlapWord);
  }

  console.log('animateTrainWords: ' + animateTrainWords + " " + animateTrainWords.length);
  console.log('animateTestWords: ' + animateTestWords + " " + animateTestWords.length);
  console.log('inanimateTrainWords: ' + inanimateTrainWords);
  console.log('inanimateTestWords: ' + inanimateTestWords);
  console.log('animateOverlapWord: ' + animateOverlapWord);
  console.log('inanimateOverlapWord: ' + inanimateOverlapWord);
*/

  if (Math.random() < 0.5) {
    var animPref = 'ek';
    var inanimPref = 'ja';
  } else {
    var animPref = 'ja';
    var inanimPref = 'ek';
  }

var blockAnimateTrain = [];
    var animWords = [].concat(items.subset("syllNum","1").choose(numberOfTrainingItems/2),
			      items.subset("syllNum","2").choose(numberOfTrainingItems/2)).map(function(obj) { return obj.item; }).shuffle()
    for (var i = 0; i < trainAnimals.length; i++) {
	blockAnimateTrain = blockAnimateTrain.concat(generateTrainScreen(animWords[i], trainAnimals[i]));
//    blockAnimateTrain = blockAnimateTrain.concat(generateTrainScreen(animateTrainWords[i], trainAnimals[i]));
  }

var blockInanimateTrain = [];
    var inanimWords = [].concat(items.subset("syllNum","1").chooseNext((numberOfTrainingItems/2)+1,numberOfTrainingItems+1),
				items.subset("syllNum","2").chooseNext((numberOfTrainingItems/2)+1,numberOfTrainingItems+1)).map(function(obj) { return obj.item; }).shuffle()
  for (var i = 0; i < trainObjects.length; i++) {
      blockInanimateTrain = blockInanimateTrain.concat(generateTrainScreen(inanimWords[i], trainObjects[i]));
//      blockInanimateTrain = blockInanimateTrain.concat(generateTrainScreen(inanimateTrainWords[i], trainObjects[i]));
  }

  var blockTest = []; 
    var animateTestWords = [].concat(items.subset("syllNum","1").chooseNext(numberOfTrainingItems+1,numberOfTrainingItems+4),
				     items.subset("syllNum","2").chooseNext(numberOfTrainingItems+1,numberOfTrainingItems+4)).map(function(obj) { return obj.item; }).shuffle()
    var inanimateTestWords = [].concat(items.subset("syllNum","1").chooseNext(numberOfTrainingItems+5,numberOfTrainingItems+8),
				     items.subset("syllNum","2").chooseNext(numberOfTrainingItems+6,numberOfTrainingItems+8)).map(function(obj) { return obj.item; }).shuffle()
  for (var i = 0; i < testAnimals.length; i++) {
    blockTest = blockTest.concat(generateTestScreen(animateTestWords[i], testAnimals[i]));
  }
  for (var i = 0; i < testObjects.length; i++) {
    blockTest = blockTest.concat(generateTestScreen(inanimateTestWords[i], testObjects[i]));
  }
  shuffle(blockTest);

  function generateGeneralizationTest(animacy) {
      //   var generalizationTestWord = items.chooseRandom(1)[0].item;     
    var genTestView = 'Test.ejs';
    if (animacy === 'animate') {
      genTestView = 'video' + genTestView;
      var generalizationTestThing = 'moose';
      var generalizationTestWord = animWords[numberOfTrainingItems-1];  
    } else if (animacy === 'inanimate') {
      genTestView = 'picture' + genTestView;
      var generalizationTestWord = inanimWords[numberOfTrainingItems-1];  
      var generalizationTestThing = pictures.subset("animate", "no").chooseRandom(1)[0].item
      while (objects.includes(generalizationTestThing)) {
        generalizationTestThing = pictures.subset("animate", "no").chooseRandom(1)[0].item
      }
    } else {
      throw "Error: illegal argument to generateGeneralizationTest";
    }
    return items.subset("item", generalizationTestWord).pairWith("frame", pictures.subset("item", generalizationTestThing))
                .pairWith("view", genTestView);
  }

  function generateTrainScreen(word, item) {
    if (animals.includes(item)) {
      var view = animPref + 'VideoView.ejs';
    } else {
      var view = inanimPref + 'PictureView.ejs';
    }
    return items.subset("item", word).pairWith("frame", pictures.subset("item", item))
                .pairWith("view", view);
  }

  function generateTestScreen(word, item) {
    if (animals.includes(item)) {
      var view = 'videoTest.ejs';
    } else {
      var view = 'pictureTest.ejs';
    }
    return items.subset("item", word).pairWith("frame", pictures.subset("item", item))
                .pairWith("view", view);
  }

  function shuffle(array) {
    var i = 0
      , j = 0
      , temp = null
    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }

    this.addStaticScreen("introQuestions.ejs");
    if (Math.random() < 0.5) {
    this.addBlock(blockAnimateTrain);
    this.addBlock(generateGeneralizationTest('animate'));
    this.addBlock(blockInanimateTrain);
    this.addBlock(generateGeneralizationTest('inanimate'));  
  } else {
    this.addBlock(blockInanimateTrain);
    this.addBlock(generateGeneralizationTest('inanimate'));
    this.addBlock(blockAnimateTrain);
    this.addBlock(generateGeneralizationTest('animate'));
  }
  this.addStaticScreen("instructionsTest.ejs");
  this.addBlock(blockTest);
  this.addStaticScreen("finalthanks.ejs");
}
