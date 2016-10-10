Experigen.initialize = function () {
  console.log("Experiment type: semantics\nSemantic salience: shape");

    var items  = this.resource("items").shuffle();
    var pictures = this.resource("pictures").shuffle();

    var sampleItems = items.chooseRandom(3)
			       .pairWith("frame",pictures.chooseRandom(3))
			       .pairWith("view","stimulus.ejs");

  //  var sampleItem = [].concat(items.subset("syllNum","1").pairWith("view","stimulusTest.ejs").chooseRandom(2), items.subset("syllNum","2").pairWith("view","stimulusTest.ejs").chooseRandom(2)).shuffle();

    //Randomly choose which subset of stimuli is paired with a suffix or a prefix
    var heads = (Math.floor(Math.random() * 4));

    //Semantics experiment, relevant feature - syllable count
   if(heads == 0){
    var blockTrain = [].concat(items.subset("syllNum","1").subset("fric","yes").choose(5)
			       .pairWith("frame",pictures.subset("long","yes").choose(5))
			       .pairWith("view","stimulusTest2.ejs"),

			        items.subset("syllNum","1").subset("fric","no").choose(5)
			       .pairWith("frame",pictures.subset("long","yes").chooseNext(5,10))
			       .pairWith("view","stimulusTest2.ejs"),

			       items.subset("syllNum","1").subset("fric","yes").chooseNext(5,10)
			       .pairWith("frame",pictures.subset("long","no").choose(5))
			       .pairWith("view","stimulusTest.ejs"),

			       items.subset("syllNum","1").subset("fric","no").chooseNext(5,10)
			       .pairWith("frame",pictures.subset("long","no").chooseNext(5,10))
			       .pairWith("view","stimulusTest.ejs"),

			       items.subset("syllNum","2").subset("fric","yes").choose(5)
			       .pairWith("frame",pictures.subset("long","no").chooseNext(10,15))
	                       .pairWith("view","stimulusTest.ejs"),

			       items.subset("syllNum","2").subset("fric","no").choose(5)
			       .pairWith("frame",pictures.subset("long","no").chooseNext(15,20))
			       .pairWith("view","stimulusTest.ejs"),

			       items.subset("syllNum","2").subset("fric","yes").chooseNext(5,10)
			       .pairWith("frame",pictures.subset("long","yes").chooseNext(10,15))
	                       .pairWith("view","stimulusTest2.ejs"),

			       items.subset("syllNum","2").subset("fric","no").chooseNext(5,10)
			       .pairWith("frame",pictures.subset("long","yes").chooseNext(15,20))
			       .pairWith("view","stimulusTest2.ejs")
			  ).shuffle();
   }
    else if(heads == 1) {
	var blockTrain = [].concat(items.subset("syllNum","1").subset("fric","yes").choose(5)
			       .pairWith("frame",pictures.subset("long","yes").choose(5))
			       .pairWith("view","stimulusTest.ejs"),

			        items.subset("syllNum","1").subset("fric","no").choose(5)
			       .pairWith("frame",pictures.subset("long","yes").chooseNext(5,10))
			       .pairWith("view","stimulusTest.ejs"),

			       items.subset("syllNum","1").subset("fric","yes").chooseNext(5,10)
			       .pairWith("frame",pictures.subset("long","no").choose(5))
			       .pairWith("view","stimulusTest2.ejs"),

			       items.subset("syllNum","1").subset("fric","no").chooseNext(5,10)
			       .pairWith("frame",pictures.subset("long","no").chooseNext(5,10))
			       .pairWith("view","stimulusTest2.ejs"),

			       items.subset("syllNum","2").subset("fric","yes").choose(5)
			       .pairWith("frame",pictures.subset("long","no").chooseNext(10,15))
	                       .pairWith("view","stimulusTest2.ejs"),

			       items.subset("syllNum","2").subset("fric","no").choose(5)
			       .pairWith("frame",pictures.subset("animate","no").chooseNext(15,20))
			       .pairWith("view","stimulusTest2.ejs"),

			       items.subset("syllNum","2").subset("fric","yes").chooseNext(5,10)
			       .pairWith("frame",pictures.subset("long","yes").chooseNext(10,15))
	                       .pairWith("view","stimulusTest.ejs"),

			       items.subset("syllNum","2").subset("fric","no").chooseNext(5,10)
			       .pairWith("frame",pictures.subset("long","yes").chooseNext(15,20))
			       .pairWith("view","stimulusTest.ejs")
			  ).shuffle();
    }
    else if (heads == 2) {
	var blockTrain = [].concat(items.subset("syllNum","1").subset("fric","yes").choose(5)
			       .pairWith("frame",pictures.subset("long","no").choose(5))
			       .pairWith("view","stimulusTest.ejs"),

			        items.subset("syllNum","1").subset("fric","no").choose(5)
			       .pairWith("frame",pictures.subset("long","no").chooseNext(5,10))
			       .pairWith("view","stimulusTest.ejs"),

			       items.subset("syllNum","1").subset("fric","yes").chooseNext(5,10)
			       .pairWith("frame",pictures.subset("long","yes").choose(5))
			       .pairWith("view","stimulusTest2.ejs"),

			       items.subset("syllNum","1").subset("fric","no").chooseNext(5,10)
			       .pairWith("frame",pictures.subset("long","yes").chooseNext(5,10))
			       .pairWith("view","stimulusTest2.ejs"),

			       items.subset("syllNum","2").subset("fric","yes").choose(5)
			       .pairWith("frame",pictures.subset("long","yes").chooseNext(10,15))
	                       .pairWith("view","stimulusTest2.ejs"),

			       items.subset("syllNum","2").subset("fric","no").choose(5)
			       .pairWith("frame",pictures.subset("long","yes").chooseNext(15,20))
			       .pairWith("view","stimulusTest2.ejs"),

			       items.subset("syllNum","2").subset("fric","yes").chooseNext(5,10)
			       .pairWith("frame",pictures.subset("long","no").chooseNext(10,15))
	                       .pairWith("view","stimulusTest.ejs"),

			       items.subset("syllNum","2").subset("fric","no").chooseNext(5,10)
			       .pairWith("frame",pictures.subset("long","no").chooseNext(15,20))
			       .pairWith("view","stimulusTest.ejs")
			  ).shuffle();
    }
    else{
	var blockTrain = [].concat(items.subset("syllNum","1").subset("fric","yes").choose(5)
			       .pairWith("frame",pictures.subset("long","no").choose(5))
			       .pairWith("view","stimulusTest2.ejs"),

			        items.subset("syllNum","1").subset("fric","no").choose(5)
			       .pairWith("frame",pictures.subset("long","no").chooseNext(5,10))
			       .pairWith("view","stimulusTest2.ejs"),

			       items.subset("syllNum","1").subset("fric","yes").chooseNext(5,10)
			       .pairWith("frame",pictures.subset("long","yes").choose(5))
			       .pairWith("view","stimulusTest.ejs"),

			       items.subset("syllNum","1").subset("fric","no").chooseNext(5,10)
			       .pairWith("frame",pictures.subset("long","yes").chooseNext(5,10))
			       .pairWith("view","stimulusTest.ejs"),

			       items.subset("syllNum","2").subset("fric","yes").choose(5)
			       .pairWith("frame",pictures.subset("long","yes").chooseNext(10,15))
	                       .pairWith("view","stimulusTest.ejs"),

			       items.subset("syllNum","2").subset("fric","no").choose(5)
			       .pairWith("frame",pictures.subset("long","yes").chooseNext(15,20))
			       .pairWith("view","stimulusTest.ejs"),

			       items.subset("syllNum","2").subset("fric","yes").chooseNext(5,10)
			       .pairWith("frame",pictures.subset("long","no").chooseNext(10,15))
	                       .pairWith("view","stimulusTest2.ejs"),

			       items.subset("syllNum","2").subset("fric","no").chooseNext(5,10)
			       .pairWith("frame",pictures.subset("long","no").chooseNext(15,20))
			       .pairWith("view","stimulusTest2.ejs")
				  ).shuffle();
    };

    var third = Math.floor(blockTrain.length / 3);
    for (var i = third; i < blockTrain.length; i += third) {
      var test = items.chooseRandom(1).pairWith("view", "threeTrialsAgoTest.ejs")[0];
      blockTrain.splice(i, 0, test);
    }

    var blockTest = [].concat(items.subset("syllNum","1").subset("fric","yes").chooseNext(10,13).pairWith("frame",pictures.subset("long","yes").chooseNext(20,23)),

			      items.subset("syllNum","1").subset("fric","no").chooseNext(10,13).pairWith("frame",pictures.subset("long","yes").chooseNext(23,26)),

			      items.subset("syllNum","1").subset("fric","no").chooseNext(13,16).pairWith("frame",pictures.subset("long","no").chooseNext(20,23)),

			      items.subset("syllNum","1").subset("fric","yes").chooseNext(13,16).pairWith("frame",pictures.subset("long","no").chooseNext(23,26)),

			      items.subset("syllNum","2").subset("fric","yes").chooseNext(10,13).pairWith("frame",pictures.subset("long","yes").chooseNext(26,29)),

			      items.subset("syllNum","2").subset("fric","no").chooseNext(10,13).pairWith("frame",pictures.subset("long","yes").chooseNext(29,32)),

			      items.subset("syllNum","2").subset("fric","no").chooseNext(13,16).pairWith("frame",pictures.subset("long","no").chooseNext(26,29)),

			      items.subset("syllNum","2").subset("fric","yes").chooseNext(13,16).pairWith("frame",pictures.subset("long","no").chooseNext(29,32)))
	.pairWith("view","mytest.ejs").shuffle();

    // this.addStaticScreen("getgoing.ejs");
    // this.addStaticScreen("intro.ejs");
    // this.addStaticScreen("instructionsTrain.ejs");

    this.addBlock(sampleItems);
    this.addBlock(blockTrain);
    this.addStaticScreen("instructionsTest.ejs");
    this.addBlock(blockTest);
    this.addStaticScreen("demographic.ejs");
    this.addStaticScreen("finalthanks.ejs");

}
