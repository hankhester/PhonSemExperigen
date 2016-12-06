console.log('Semantics - Blocked');
Experigen.initialize = function () {
  var items  = this.resource("items").shuffle();
  var pictures = this.resource("pictures").shuffle();

  var numberOfTrainingItems = 10;

  var oneSyllWords = items.subset("syllNum", "1").chooseRandom(17).map(function(word) {return word.item;}).shuffle();
  var twoSyllWords = items.subset("syllNum", "2").chooseRandom(17).map(function(word) {return word.item;}).shuffle();

  var animals = ['bird', 'cat', 'chicken', 'crab', 'deer', 'dog', 'duck', 'elephant', 'giraffe', 'hippo', 'horse', 'lion', 'penguin', 'pig', 'rabbit', 'tiger', 'turtle', 'zebra'].shuffle();
  var objects = ['baloon', 'basket', 'basketball', 'book', 'bed', 'chair', 'clock', 'cup', 'flashlight', 'frisbee', 'guitar', 'kettle', 'pillow', 'pen', 'lighthouse', 'lampshade', 'toothbrush', 'umbrella'].shuffle();

  var trainAnimals = animals.slice(0, numberOfTrainingItems);
  var testAnimals = animals.slice(numberOfTrainingItems, animals.length);

  var trainObjects = objects.slice(0, numberOfTrainingItems);
  var testObjects = objects.slice(numberOfTrainingItems, objects.length);

// for both animate and inanimate: 11 training, 5 testing, 1 additional item that is both trained and tested
  var animateTrainWords = [], animateTestWords = [], inanimateTrainWords = [], inanimateTestWords = [],
      animateOverlapWord, inanimateOverlapWord;

  if (Math.random() < 0.5) {
    var animPref = 'ek';
    var inanimPref = 'ja';
  } else {
    var animPref = 'ja';
    var inanimPref = 'ek';
  }

  var blockAnimateTrain = [];
  var animateTrainWords = [].concat(
    oneSyllWords.slice(0, numberOfTrainingItems / 2),
    twoSyllWords.slice(0, numberOfTrainingItems / 2)
  ).shuffle();
  oneSyllWords = oneSyllWords.slice(numberOfTrainingItems / 2);
  twoSyllWords = twoSyllWords.slice(numberOfTrainingItems / 2);
  for (var i = 0; i < trainAnimals.length; i++) {
    blockAnimateTrain = blockAnimateTrain.concat(generateTrainScreen(animateTrainWords[i], trainAnimals[i]));
  }

  var blockInanimateTrain = [];
  var inanimateTrainWords = [].concat(
    oneSyllWords.slice(0, numberOfTrainingItems / 2),
    twoSyllWords.slice(0, numberOfTrainingItems / 2)
  ).shuffle();
  oneSyllWords = oneSyllWords.slice(numberOfTrainingItems / 2);
  twoSyllWords = twoSyllWords.slice(numberOfTrainingItems / 2);
  for (var i = 0; i < trainObjects.length; i++) {
    blockInanimateTrain = blockInanimateTrain.concat(generateTrainScreen(inanimateTrainWords[i], trainObjects[i]));
  }

  console.log(testWords);

  var blockTest = [];
  var testThings = testAnimals.concat(testObjects).shuffle();
  var testWords = [].concat(
    oneSyllWords.slice(0, 6),
    twoSyllWords.slice(0, 6)
  ).shuffle();
  oneSyllWords = oneSyllWords.slice(6);
  twoSyllWords = twoSyllWords.slice(6);
  for (var i = 0; i < testThings.length; i++) {
    blockTest = blockTest.concat(generateTestScreen(testWords[i], testThings[i]));
  }

  // Actual Design:

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

  // Functions:

  function generateGeneralizationTest(animacy) {
    var generalizationTestWord = items.chooseRandom(1)[0].item;
    var genTestView = 'Test.ejs';
    while (oneSyllWords.includes(generalizationTestWord) || twoSyllWords.includes(generalizationTestWord)) {
      generalizationTestWord = items.chooseRandom(1)[0].item;
    }
    if (animacy === 'animate') {
      genTestView = 'video' + genTestView;
      var generalizationTestThing = 'moose';
    } else if (animacy === 'inanimate') {
      genTestView = 'picture' + genTestView;
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
}
