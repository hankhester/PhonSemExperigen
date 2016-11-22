Experigen.initialize = function () {

    var items  = this.resource("items").shuffle();
    var pictures = this.resource("pictures").shuffle();

//This is for expeirment of type 3 (syll and animacy conflated in training):
    // var blockTrain = [].concat(items.subset("syllNum","1").subset("fric","yes").choose(6)
		// 	       .pairWith("frame",pictures.subset("animate","yes").choose(6))
		// 	       .pairWith("view","stimulusTest2.ejs"),
    //
		// 	       items.subset("syllNum","1").subset("fric","no").choose(6)
		// 	       .pairWith("frame",pictures.subset("animate","yes").chooseNext(6,12))
		// 	       .pairWith("view","stimulusTest2.ejs"),
    //
		// 	       items.subset("syllNum","2").subset("fric","yes").choose(6)
		// 	       .pairWith("frame",pictures.subset("animate","no").choose(6))
	  //                      .pairWith("view","stimulusTest.ejs"),
    //
		// 	       items.subset("syllNum","2").subset("fric","no").choose(6)
		// 	       .pairWith("frame",pictures.subset("animate","no").chooseNext(6,12))
		// 	       .pairWith("view","stimulusTest.ejs")
		// 	  ).shuffle();
    var blockTrain = [].concat(
      items.subset("item", "fut").pairWith("frame", pictures.subset("item", "hammer"))
      .pairWith("view", "ekPictureView.ejs"),
      items.subset("item", "pof").pairWith("frame", pictures.subset("item", "basket"))
      .pairWith("view", "ekPictureView.ejs"),
      items.subset("item", "bok").pairWith("frame", pictures.subset("item", "car"))
      .pairWith("view", "ekPictureView.ejs"),
      items.subset("item", "fep").pairWith("frame", pictures.subset("item", "dog"))
      .pairWith("view", "ekVideoView.ejs"),
      items.subset("item", "kozab").pairWith("frame", pictures.subset("item", "train"))
      .pairWith("view", "jaPictureView.ejs"),
      items.subset("item", "vebut").pairWith("frame", pictures.subset("item", "lion"))
      .pairWith("view", "jaVideoView.ejs"),
      items.subset("item", "pisok").pairWith("frame", pictures.subset("item", "block"))
      .pairWith("view", "jaPictureView.ejs"),
      items.subset("item", "shobit").pairWith("frame", pictures.subset("item", "hippo"))
      .pairWith("view", "jaVideoView.ejs"),
      items.subset("item", "kiv").pairWith("frame", pictures.subset("item", "horse"))
      .pairWith("view", "videoTest.ejs"),
      items.subset("item", "disab").pairWith("frame", pictures.subset("item", "hat"))
      .pairWith("view", "pictureTest.ejs"),
      items.subset("item", "tesuf").pairWith("frame", pictures.subset("item", "fence"))
      .pairWith("view", "pictureTest.ejs"),
      items.subset("item", "dez").pairWith("frame", pictures.subset("item", "tiger"))
      .pairWith("view", "videoTest.ejs"),
      items.subset("item", "guz").pairWith("frame", pictures.subset("item", "girl"))
      .pairWith("view", "pictureTest.ejs")
    );
    console.log(blockTrain);
    var firstTest = items.chooseRandom(1).pairWith("view", "threeTrialsAgoTest.ejs")[0];
    blockTrain.splice(3, 0, firstTest);

    // var third = Math.floor(blockTrain.length / 3);
    // for (var i = third + 3; i < blockTrain.length - 3; i += third) {
    //   var test = items.chooseRandom(1).pairWith("view", "threeTrialsAgoTest.ejs")[0];
    //   blockTrain.splice(i, 0, test);
    // }

    var blockTest = [].concat(items.subset("syllNum","1").subset("fric","yes").chooseNext(6,8).pairWith("frame",pictures.subset("animate","yes").chooseNext(12,14)),

			      items.subset("syllNum","1").subset("fric","no").chooseNext(6,8).pairWith("frame",pictures.subset("animate","yes").chooseNext(14,16)),

			      items.subset("syllNum","1").subset("fric","no").chooseNext(8,10).pairWith("frame",pictures.subset("animate","no").chooseNext(12,14)),

			      items.subset("syllNum","1").subset("fric","yes").chooseNext(8,10).pairWith("frame",pictures.subset("animate","no").chooseNext(14,16)),

			      items.subset("syllNum","2").subset("fric","yes").chooseNext(6,8).pairWith("frame",pictures.subset("animate","yes").chooseNext(16,18)),

			      items.subset("syllNum","2").subset("fric","no").chooseNext(6,8).pairWith("frame",pictures.subset("animate","yes").chooseNext(18,20)),

			      items.subset("syllNum","2").subset("fric","no").chooseNext(8,10).pairWith("frame",pictures.subset("animate","no").chooseNext(16,18)),

			      items.subset("syllNum","2").subset("fric","yes").chooseNext(8,10).pairWith("frame",pictures.subset("animate","no").chooseNext(18,20)))
	.pairWith("view","mytest.ejs").shuffle();

    // this.addStaticScreen("introQuestions.ejs");
    // this.addBlock(sampleItems);
    // this.addBlock(englishWarmup);
    // this.addBlock(englishWarmup2);
    this.addBlock(blockTrain);
    this.addStaticScreen("instructionsTest.ejs");
    this.addBlock(blockTest);
    this.addStaticScreen("finalthanks.ejs");
}
