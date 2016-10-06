Experigen.initialize = function () {

    var items  = this.resource("items").shuffle();
    var pictures = this.resource("pictures").shuffle();

    var sampleItem = pictures.subset("item","pen").pairWith("view","stimulus.ejs").choose(1);
    // This is for expeirment of type 3 (syll and animacy conflated in training):
    if (heads == 1) {
     var blockTrain = [].concat(
						 items.subset("syllNum","1").subset("fric","yes").choose(10)
			       .pairWith("frame",pictures.subset("animate","yes").choose(10))
			       .pairWith("view","stimulusTest2.ejs"),
			       items.subset("syllNum","1").subset("fric","no").choose(10)
			       .pairWith("frame",pictures.subset("animate","yes").chooseNext(10,20))
			       .pairWith("view","stimulusTest2.ejs"),

			       items.subset("syllNum","2").subset("fric","yes").choose(10)
			       .pairWith("frame",pictures.subset("animate","no").choose(10))
             .pairWith("view","stimulusTest.ejs"),

			       items.subset("syllNum","2").subset("fric","no").choose(10)
			       .pairWith("frame",pictures.subset("animate","no").chooseNext(10,20))
			       .pairWith("view","stimulusTest.ejs")).shuffle();

   } else if (heads == 2) {
	    var blockTrain = [].concat(items.subset("syllNum","1").subset("fric","yes").choose(10)
				   .pairWith("frame",pictures.subset("animate","yes").choose(10))
				   .pairWith("view","stimulusTest.ejs"),

				   items.subset("syllNum","1").subset("fric","no").choose(10)
				   .pairWith("frame",pictures.subset("animate","yes").chooseNext(10,20))
				   .pairWith("view","stimulusTest.ejs"),

				   items.subset("syllNum","2").subset("fric","yes").choose(10)
				   .pairWith("frame",pictures.subset("animate","no").choose(10))
				   .pairWith("view","stimulusTest2.ejs"),

				   items.subset("syllNum","2").subset("fric","no").choose(10)
				   .pairWith("frame",pictures.subset("animate","no").chooseNext(10,20))
				   .pairWith("view","stimulusTest2.ejs")
				  ).shuffle();

    } else if (heads == 3) {
	     var blockTrain = [].concat(items.subset("syllNum","1").subset("fric","yes").choose(10)
				   .pairWith("frame",pictures.subset("animate","no").choose(10))
				   .pairWith("view","stimulusTest2.ejs"),

				   items.subset("syllNum","1").subset("fric","no").choose(10)
				   .pairWith("frame",pictures.subset("animate","no").chooseNext(10,20))
				   .pairWith("view","stimulusTest2.ejs"),

				   items.subset("syllNum","2").subset("fric","yes").choose(10)
				   .pairWith("frame",pictures.subset("animate","yes").choose(10))
				   .pairWith("view","stimulusTest.ejs"),

				   items.subset("syllNum","2").subset("fric","no").choose(10)
				   .pairWith("frame",pictures.subset("animate","yes").chooseNext(10,20))
				   .pairWith("view","stimulusTest.ejs")
				  ).shuffle();
    } else if (heads == 4) {
	     var blockTrain = [].concat(items.subset("syllNum","1").subset("fric","yes").choose(10)
				   .pairWith("frame",pictures.subset("animate","no").choose(10))
				   .pairWith("view","stimulusTest.ejs"),

				   items.subset("syllNum","1").subset("fric","no").choose(10)
				   .pairWith("frame",pictures.subset("animate","no").chooseNext(10,20))
				   .pairWith("view","stimulusTest.ejs"),

				   items.subset("syllNum","2").subset("fric","yes").choose(10)
				   .pairWith("frame",pictures.subset("animate","yes").choose(10))
				   .pairWith("view","stimulusTest2.ejs"),

				   items.subset("syllNum","2").subset("fric","no").choose(10)
				   .pairWith("frame",pictures.subset("animate","yes").chooseNext(10,20))
				   .pairWith("view","stimulusTest2.ejs")
				  ).shuffle();
    };

    var blockTest = [].concat(items.subset("syllNum","1").subset("fric","yes").chooseNext(10,13).pairWith("frame",pictures.subset("animate","yes").chooseNext(20,23)),

			      items.subset("syllNum","1").subset("fric","no").chooseNext(10,13).pairWith("frame",pictures.subset("animate","yes").chooseNext(23,26)),

			      items.subset("syllNum","1").subset("fric","no").chooseNext(13,16).pairWith("frame",pictures.subset("animate","no").chooseNext(20,23)),

			      items.subset("syllNum","1").subset("fric","yes").chooseNext(13,16).pairWith("frame",pictures.subset("animate","no").chooseNext(23,26)),

			      items.subset("syllNum","2").subset("fric","yes").chooseNext(10,13).pairWith("frame",pictures.subset("animate","yes").chooseNext(26,29)),

			      items.subset("syllNum","2").subset("fric","no").chooseNext(10,13).pairWith("frame",pictures.subset("animate","yes").chooseNext(29,32)),

			      items.subset("syllNum","2").subset("fric","no").chooseNext(13,16).pairWith("frame",pictures.subset("animate","no").chooseNext(26,29)),

			      items.subset("syllNum","2").subset("fric","yes").chooseNext(13,16).pairWith("frame",pictures.subset("animate","no").chooseNext(29,32)))
	.pairWith("view","mytest.ejs").shuffle();

    this.addStaticScreen("getgoing.ejs");
    this.addStaticScreen("intro.ejs");
    this.addStaticScreen("instructionsTrain.ejs");
    this.addBlock(sampleItem);
    this.addBlock(blockTrain);
    this.addStaticScreen("instructionsTest.ejs");
    this.addBlock(blockTest);
    this.addStaticScreen("demographic.ejs");
    this.addStaticScreen("finalthanks.ejs");
}
