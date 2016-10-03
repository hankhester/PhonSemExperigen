Experigen.initialize = function () {

    var items  = this.resource("items").shuffle();
    var pictures = this.resource("pictures").shuffle();

    var sampleItem = pictures.subset("item","pen").pairWith("view","stimulus.ejs").choose(1);

    //Randomly choose which subset of stimuli is paired with a suffix or a prefix
    var heads = (Math.floor(Math.random() * 4));

//This is for expeirment of type 3 (syll and animacy conflated in training):
   if(heads == 0){
    var blockTrain = [].concat(items.subset("syllNum","1").subset("fric","yes").choose(1)
			       .pairWith("frame",pictures.subset("animate","yes").choose(1))
			       .pairWith("view","stimulusTest2.ejs"),

			       items.subset("syllNum","1").subset("fric","no").choose(1)
			       .pairWith("frame",pictures.subset("animate","yes").chooseNext(1,2))
			       .pairWith("view","stimulusTest2.ejs"),

			       items.subset("syllNum","2").subset("fric","yes").choose(1)
			       .pairWith("frame",pictures.subset("animate","no").choose(1))
	                       .pairWith("view","stimulusTest.ejs"),

			       items.subset("syllNum","2").subset("fric","no").choose(1)
			       .pairWith("frame",pictures.subset("animate","no").chooseNext(1,2))
			       .pairWith("view","stimulusTest.ejs")
			  ).shuffle();
   }
    else if(heads == 1) {
	var blockTrain = [].concat(items.subset("syllNum","1").subset("fric","yes").choose(1)
				   .pairWith("frame",pictures.subset("animate","yes").choose(1))
				   .pairWith("view","stimulusTest.ejs"),

				   items.subset("syllNum","1").subset("fric","no").choose(1)
				   .pairWith("frame",pictures.subset("animate","yes").chooseNext(1,2))
				   .pairWith("view","stimulusTest.ejs"),

				   items.subset("syllNum","2").subset("fric","yes").choose(1)
				   .pairWith("frame",pictures.subset("animate","no").choose(1))
				   .pairWith("view","stimulusTest2.ejs"),

				   items.subset("syllNum","2").subset("fric","no").choose(1)
				   .pairWith("frame",pictures.subset("animate","no").chooseNext(1,2))
				   .pairWith("view","stimulusTest2.ejs")
				  ).shuffle();
    }
    else if (heads == 2) {
	var blockTrain = [].concat(items.subset("syllNum","1").subset("fric","yes").choose(1)
				   .pairWith("frame",pictures.subset("animate","no").choose(1))
				   .pairWith("view","stimulusTest2.ejs"),

				   items.subset("syllNum","1").subset("fric","no").choose(1)
				   .pairWith("frame",pictures.subset("animate","no").chooseNext(1,2))
				   .pairWith("view","stimulusTest2.ejs"),

				   items.subset("syllNum","2").subset("fric","yes").choose(1)
				   .pairWith("frame",pictures.subset("animate","yes").choose(1))
				   .pairWith("view","stimulusTest.ejs"),

				   items.subset("syllNum","2").subset("fric","no").choose(1)
				   .pairWith("frame",pictures.subset("animate","yes").chooseNext(1,2))
				   .pairWith("view","stimulusTest.ejs")
				  ).shuffle();
    }
    else{
	var blockTrain = [].concat(items.subset("syllNum","1").subset("fric","yes").choose(1)
				   .pairWith("frame",pictures.subset("animate","no").choose(1))
				   .pairWith("view","stimulusTest.ejs"),

				   items.subset("syllNum","1").subset("fric","no").choose(1)
				   .pairWith("frame",pictures.subset("animate","no").chooseNext(1,2))
				   .pairWith("view","stimulusTest.ejs"),

				   items.subset("syllNum","2").subset("fric","yes").choose(1)
				   .pairWith("frame",pictures.subset("animate","yes").choose(1))
				   .pairWith("view","stimulusTest2.ejs"),

				   items.subset("syllNum","2").subset("fric","no").choose(1)
				   .pairWith("frame",pictures.subset("animate","yes").chooseNext(1,2))
				   .pairWith("view","stimulusTest2.ejs")
				  ).shuffle();
    };


    var blockTest = [].concat(items.subset("syllNum","1").subset("fric","yes").chooseNext(1,2).pairWith("frame",pictures.subset("animate","yes").chooseNext(2,3)),

			      items.subset("syllNum","1").subset("fric","no").chooseNext(1,2).pairWith("frame",pictures.subset("animate","yes").chooseNext(3,4)),

			      items.subset("syllNum","1").subset("fric","no").chooseNext(13,16).pairWith("frame",pictures.subset("animate","no").chooseNext(2,3)),

			      items.subset("syllNum","1").subset("fric","yes").chooseNext(13,16).pairWith("frame",pictures.subset("animate","no").chooseNext(3,4)),

			      items.subset("syllNum","2").subset("fric","yes").chooseNext(10,13).pairWith("frame",pictures.subset("animate","yes").chooseNext(4,5)),

			      items.subset("syllNum","2").subset("fric","no").chooseNext(10,13).pairWith("frame",pictures.subset("animate","yes").chooseNext(5,6)),

			      items.subset("syllNum","2").subset("fric","no").chooseNext(13,16).pairWith("frame",pictures.subset("animate","no").chooseNext(4,5)),

			      items.subset("syllNum","2").subset("fric","yes").chooseNext(13,16).pairWith("frame",pictures.subset("animate","no").chooseNext(5,6)))
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
