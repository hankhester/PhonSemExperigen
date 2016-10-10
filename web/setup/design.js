Experigen.initialize = function () {

    var items  = this.resource("items").shuffle();
    var pictures = this.resource("pictures").shuffle();

    var warmupItems = [
      {item: "gop"}
      ,{item: "dak"}
      ,{item: "fitash"}
      ,{item: "rezik"}
    ];
    var sampleItems = warmupItems.pairWith("view","warmup.ejs");
    var englishWarmup = pictures.subset("item", "dog").pairWith("view", "stimulus.ejs");

    //Randomly choose which subset of stimuli is paired with a suffix or a prefix
    var heads = (Math.floor(Math.random() * 4));

//This is for expeirment of type 3 (syll and animacy conflated in training):
   if(heads == 0){
    var blockTrain = [].concat(items.subset("syllNum","1").subset("fric","yes").choose(6)
			       .pairWith("frame",pictures.subset("animate","yes").choose(6))
			       .pairWith("view","stimulusTest2.ejs"),

			       items.subset("syllNum","1").subset("fric","no").choose(6)
			       .pairWith("frame",pictures.subset("animate","yes").chooseNext(6,12))
			       .pairWith("view","stimulusTest2.ejs"),

			       items.subset("syllNum","2").subset("fric","yes").choose(6)
			       .pairWith("frame",pictures.subset("animate","no").choose(6))
	                       .pairWith("view","stimulusTest.ejs"),

			       items.subset("syllNum","2").subset("fric","no").choose(6)
			       .pairWith("frame",pictures.subset("animate","no").chooseNext(6,12))
			       .pairWith("view","stimulusTest.ejs")
			  ).shuffle();
   }
    else if(heads == 1) {
	var blockTrain = [].concat(items.subset("syllNum","1").subset("fric","yes").choose(6)
				   .pairWith("frame",pictures.subset("animate","yes").choose(6))
				   .pairWith("view","stimulusTest.ejs"),

				   items.subset("syllNum","1").subset("fric","no").choose(6)
				   .pairWith("frame",pictures.subset("animate","yes").chooseNext(6,12))
				   .pairWith("view","stimulusTest.ejs"),

				   items.subset("syllNum","2").subset("fric","yes").choose(6)
				   .pairWith("frame",pictures.subset("animate","no").choose(6))
				   .pairWith("view","stimulusTest2.ejs"),

				   items.subset("syllNum","2").subset("fric","no").choose(6)
				   .pairWith("frame",pictures.subset("animate","no").chooseNext(6,12))
				   .pairWith("view","stimulusTest2.ejs")
				  ).shuffle();
    }
    else if (heads == 2) {
	var blockTrain = [].concat(items.subset("syllNum","1").subset("fric","yes").choose(6)
				   .pairWith("frame",pictures.subset("animate","no").choose(6))
				   .pairWith("view","stimulusTest2.ejs"),

				   items.subset("syllNum","1").subset("fric","no").choose(6)
				   .pairWith("frame",pictures.subset("animate","no").chooseNext(6,12))
				   .pairWith("view","stimulusTest2.ejs"),

				   items.subset("syllNum","2").subset("fric","yes").choose(6)
				   .pairWith("frame",pictures.subset("animate","yes").choose(6))
				   .pairWith("view","stimulusTest.ejs"),

				   items.subset("syllNum","2").subset("fric","no").choose(6)
				   .pairWith("frame",pictures.subset("animate","yes").chooseNext(6,12))
				   .pairWith("view","stimulusTest.ejs")
				  ).shuffle();
    }
    else{
	var blockTrain = [].concat(items.subset("syllNum","1").subset("fric","yes").choose(6)
				   .pairWith("frame",pictures.subset("animate","no").choose(6))
				   .pairWith("view","stimulusTest.ejs"),

				   items.subset("syllNum","1").subset("fric","no").choose(6)
				   .pairWith("frame",pictures.subset("animate","no").chooseNext(6,12))
				   .pairWith("view","stimulusTest.ejs"),

				   items.subset("syllNum","2").subset("fric","yes").choose(6)
				   .pairWith("frame",pictures.subset("animate","yes").choose(6))
				   .pairWith("view","stimulusTest2.ejs"),

				   items.subset("syllNum","2").subset("fric","no").choose(6)
				   .pairWith("frame",pictures.subset("animate","yes").chooseNext(6,12))
				   .pairWith("view","stimulusTest2.ejs")
				  ).shuffle();
    };

    var third = Math.floor(blockTrain.length / 3);
    for (var i = third; i < blockTrain.length; i += third) {
      var test = items.chooseRandom(1).pairWith("view", "threeTrialsAgoTest.ejs")[0];
      blockTrain.splice(i, 0, test);
    }

    var blockTest = [].concat(items.subset("syllNum","1").subset("fric","yes").chooseNext(6,8).pairWith("frame",pictures.subset("animate","yes").chooseNext(12,14)),

			      items.subset("syllNum","1").subset("fric","no").chooseNext(6,8).pairWith("frame",pictures.subset("animate","yes").chooseNext(14,16)),

			      items.subset("syllNum","1").subset("fric","no").chooseNext(8,10).pairWith("frame",pictures.subset("animate","no").chooseNext(12,14)),

			      items.subset("syllNum","1").subset("fric","yes").chooseNext(8,10).pairWith("frame",pictures.subset("animate","no").chooseNext(14,16)),

			      items.subset("syllNum","2").subset("fric","yes").chooseNext(6,8).pairWith("frame",pictures.subset("animate","yes").chooseNext(16,18)),

			      items.subset("syllNum","2").subset("fric","no").chooseNext(6,8).pairWith("frame",pictures.subset("animate","yes").chooseNext(18,20)),

			      items.subset("syllNum","2").subset("fric","no").chooseNext(8,10).pairWith("frame",pictures.subset("animate","no").chooseNext(16,18)),

			      items.subset("syllNum","2").subset("fric","yes").chooseNext(8,10).pairWith("frame",pictures.subset("animate","no").chooseNext(18,20)))
	.pairWith("view","mytest.ejs").shuffle();


    // this.addStaticScreen("getgoing.ejs");
    // this.addStaticScreen("intro.ejs");
    // this.addStaticScreen("instructionsTrain.ejs");

    // this.addBlock(sampleItems);
    // this.addBlock(englishWarmup);
    // this.addStaticScreen("instructionsKids.ejs");
    // this.addBlock(blockTrain);
    this.addBlock(blockTest);
    this.addStaticScreen("demographic.ejs");
    this.addStaticScreen("finalthanks.ejs");


}
