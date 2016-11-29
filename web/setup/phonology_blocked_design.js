console.log('Phonology - Blocked');
Experigen.initialize = function () {
  var items  = this.resource("items").shuffle();
  var pictures = this.resource("pictures").shuffle();
  var videos = this.resource("videos").shuffle();
  var numberOfTrainingItems = 11;

  var animals = ['bird', 'cat', 'chicken', 'crab', 'deer', 'dog', 'duck', 'elephant', 'giraffe', 'hippo', 'horse', 'lion', 'penguin', 'pig', 'rabbit', 'tiger', 'turtle', 'zebra'].shuffle();
  var objects = ['baloon', 'basket', 'basketball', 'book', 'bed', 'chair', 'clock', 'cup', 'flashlight', 'frisbee', 'guitar', 'kettle', 'pillow', 'pen', 'lighthouse', 'lampshade', 'toothbrush', 'umbrella', 'bowl'].shuffle(); // one more here to account for the generalization test

  // we need 17 unique words for each block(not including the generalization test)
  var oneSyllableWords = items.subset("syllNum", "1").chooseRandom(17).map(function(obj) { return obj.item; });
  var twoSyllableWords = items.subset("syllNum", "2").chooseRandom(17).map(function(obj) { return obj.item; });
  var visuals = getAnimalsArray().concat(getObjectsArray()).shuffle();

  var oneSyllableTrain = oneSyllableWords.slice(0, numberOfTrainingItems);
  var oneSyllableTest = oneSyllableWords.slice(numberOfTrainingItems, oneSyllableWords.length - 1);
  var twoSyllableTrain = twoSyllableWords.slice(0, numberOfTrainingItems);
  var twoSyllableTest = twoSyllableWords.slice(numberOfTrainingItems, twoSyllableWords.length - 1);

  var oneSyllableOverlapWord = oneSyllableWords[oneSyllableWords.length - 1];
  var twoSyllableOverlapWord = twoSyllableWords[twoSyllableWords.length - 1];

  oneSyllableTrain.push(oneSyllableOverlapWord);
  oneSyllableTest.push(oneSyllableOverlapWord);
  twoSyllableTrain.push(twoSyllableOverlapWord);
  twoSyllableTest.push(twoSyllableOverlapWord);

  var testWords = oneSyllableTest.concat(twoSyllableTest).shuffle();

  if (Math.random() < 0.5) {
    var onePref = 'ek';
    var twoPref = 'ja';
  } else {
    var onePref = 'ja';
    var twoPref = 'ek';
  }

  var visualCounter = 0;

  var blockOneSyllTrain = [];
  oneSyllableTrain.map(function(word) {
    blockOneSyllTrain = blockOneSyllTrain.concat(generateTrainScreen(word, visuals[visualCounter].item));
    visualCounter++;
  });

  var blockTwoSyllTrain = [];
  twoSyllableTrain.map(function(word) {
    blockTwoSyllTrain = blockTwoSyllTrain.concat(generateTrainScreen(word, visuals[visualCounter].item));
    visualCounter++;
  });

  var blockTest = [];
  testWords.map(function(word) {
    blockTest = blockTest.concat(generateTestScreen(word, visuals[visualCounter].item));
    visualCounter++;
  });
  blockTest.shuffle();
  
  this.addStaticScreen("introQuestions.ejs");
  if (Math.random() < 0.5) {
    this.addBlock(blockOneSyllTrain);
    this.addBlock(generateGeneralizationTest(1));
    this.addBlock(blockTwoSyllTrain);
    this.addBlock(generateGeneralizationTest(2));
  } else {
    this.addBlock(blockTwoSyllTrain);
    this.addBlock(generateGeneralizationTest(2));
    this.addBlock(blockOneSyllTrain);
    this.addBlock(generateGeneralizationTest(1));
  }
  this.addStaticScreen("instructionsTest.ejs");
  this.addBlock(blockTest);
  this.addStaticScreen("finalthanks.ejs");

  function generateGeneralizationTest(numberOfSyllables) {
    if (numberOfSyllables === 1) {
      var possibleWords = items.subset("syllNum", "1");
    } else if (numberOfSyllables == 2) {
      var possibleWords = items.subset("syllNum", "2");
    } else {
      throw "error: numberOfSyllables is not 1 or 2 in generateGeneralizationTest";
    }
    // randomly pick a word for the generalization test. If we've already used it,
    // pick another random word until we find one we haven't used.
    var allWords = [].concat(oneSyllableTrain, twoSyllableTrain, testWords);
    var generalizationTestWord = possibleWords.chooseRandom(1)[0].item;
    while (allWords.includes(generalizationTestWord)) {
      generalizationTestWord = possibleWords.chooseRandom(1)[0].item;
    }
    var visual = visuals[visualCounter];
    visualCounter++;
    console.log(generalizationTestWord);

    if (visual.animate == "none" || visual.animate == "no") { // it's messy, sorry
      genTestView = "pictureTest.ejs";
    } else if (visual.animate == undefined || visual.animate == "yes") {
      genTestView = "videoTest.ejs";
    } else {
      throw "animate was something other than no, none or undefined in generateGeneralizationTest, it was: " + visual.animate;
    }
    return items.subset("item", generalizationTestWord).pairWith("frame", pictures.subset("item", visual.item))
                .pairWith("view", genTestView);
  }

  function generateTrainScreen(word, item) {
    if (oneSyllableWords.includes(word)) {
        var view = onePref;
    } else {
        var view = twoPref;
    }
    if (animals.includes(item)) {
      view +='VideoView.ejs';
    } else {
      view +='PictureView.ejs';
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

  function getAnimalsArray() {
    return animals.map(function(word) {
      return pictures.subset("item", word)[0];
    });
  }

  function getObjectsArray() {
    return objects.map(function(word) {
      return pictures.subset("item", word)[0];
    });
  }
}
