Experigen.initialize = function () {

    var items  = this.resource("items").shuffle();
    var pictures = this.resource("pictures").shuffle();

    var sampleItem = pictures.subset("item","pen").pairWith("view","stimulus.ejs").choose(1);

    //Randomly choose which subset of stimuli is paired with a suffix or a prefix
    var heads = (Math.floor(Math.random() * 4));
		heads = 0;
		console.log('heads: ' + heads);

//This is for expeirment of type 3 (syll and animacy conflated in training):
   if(heads == 0){
    var blockTrain = [].concat(
						 items.subset("syllNum","1").subset("fric","yes").choose(3)
			       .pairWith("frame",pictures.subset("animate","yes").choose(3))
			       .pairWith("view","stimulusTest2.ejs"),

            // getTenItems({
       		// 	  numberOfSyllables: 1
       		// 	  ,endsInFricative: true
       		// 	  ,isAnimate: true
       		// 	  ,stimulusTestNumber: 2
       		 //  }),

            items.chooseRandom(1).pairWith("view", "threeTrialsAgoTest.ejs"),

            getTenItems({
       			  numberOfSyllables: 1
       			  ,endsInFricative: false
       			  ,isAnimate: true
       			  ,stimulusTestNumber: 2
              ,continuesFromLast: true
       		  }),

            getTenItems({
       			  numberOfSyllables: 2
       			  ,endsInFricative: true
       			  ,isAnimate: false
       			  ,stimulusTestNumber: 1
       		  }),

            getTenItems({
       			  numberOfSyllables: 2
       			  ,endsInFricative: false
       			  ,isAnimate: false
       			  ,stimulusTestNumber: 1
              ,continuesFromLast: true
       		  })
			  ).shuffle();
   }
    else if(heads == 1) {
	var blockTrain = [].concat(
           getTenItems({
             numberOfSyllables: 1
             ,endsInFricative: true
             ,isAnimate: true
             ,stimulusTestNumber: 1
           }),

          getTenItems({
            numberOfSyllables: 1
            ,endsInFricative: false
            ,isAnimate: true
            ,stimulusTestNumber: 1
            ,continuesFromLast: true
          }),

          getTenItems({
            numberOfSyllables: 2
            ,endsInFricative: true
            ,isAnimate: false
            ,stimulusTestNumber: 2
          }),

          getTenItems({
            numberOfSyllables: 2
            ,endsInFricative: false
            ,isAnimate: false
            ,stimulusTestNumber: 2
            ,continuesFromLast: true
          })

				  ).shuffle();
    }
    else if (heads == 2) {
	var blockTrain = [].concat(
          getTenItems({
            numberOfSyllables: 1
            ,endsInFricative: true
            ,isAnimate: false
            ,stimulusTestNumber: 2
          }),

          getTenItems({
            numberOfSyllables: 1
            ,endsInFricative: false
            ,isAnimate: false
            ,stimulusTestNumber: 2
            ,continuesFromLast: true
          }),

          getTenItems({
            numberOfSyllables: 2
            ,endsInFricative: true
            ,isAnimate: true
            ,stimulusTestNumber: 1
          }),

          getTenItems({
            numberOfSyllables: 2
            ,endsInFricative: false
            ,isAnimate: true
            ,stimulusTestNumber: 1
            ,continuesFromLast: true
          })

				  ).shuffle();
    }
    else{
	var blockTrain = [].concat(

          getTenItems({
            numberOfSyllables: 1
            ,endsInFricative: true
            ,isAnimate: false
            ,stimulusTestNumber: 1
          }),

          getTenItems({
            numberOfSyllables: 1
            ,endsInFricative: false
            ,isAnimate: false
            ,stimulusTestNumber: 1
            ,continuesFromLast: true
          }),

          getTenItems({
            numberOfSyllables: 2
            ,endsInFricative: true
            ,isAnimate: true
            ,stimulusTestNumber: 2
          }),

           getTenItems({
             numberOfSyllables: 2
             ,endsInFricative: false
             ,isAnimate: true
             ,stimulusTestNumber: 2
             ,continuesFromLast: true
           })

				  ).shuffle();
    };


    var blockTest = [].concat(
            items.subset("syllNum","1").subset("fric","yes").chooseNext(10,13).pairWith("frame",pictures.subset("animate","yes").chooseNext(20,23)),

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

    function getTenItems(subset) {
      var numberOfSyllables = subset.numberOfSyllables.toString();
      if (subset.endsInFricative === true) {
        var endsInFricative = "yes";
      } else {
        var endsInFricative = "no";
      }
      if (subset.isAnimate === true) {
        var isAnimate = "yes";
      } else {
        var isAnimate = "no";
      }
      if (subset.stimulusTestNumber === 1) {
        var stimulusTestNumber = "stimulusTest.ejs";
      } else {
        var stimulusTestNumber = "stimulusTest2.ejs";
      }
      if (subset.continuesFromLast) {
        return items.subset("syllNum", numberOfSyllables)
                    .subset("fric", endsInFricative)
                    .choose(10)
                    .pairWith("frame", pictures.subset("animate", isAnimate)
                    .chooseNext(10, 20))
                    .pairWith("view", stimulusTestNumber);
      } else {
        return items.subset("syllNum", numberOfSyllables)
                    .subset("fric", endsInFricative)
                    .choose(10)
                    .pairWith("frame", pictures.subset("animate", isAnimate)
                    .choose(10))
                    .pairWith("view", stimulusTestNumber);
      }
    }
}
