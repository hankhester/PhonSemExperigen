# where your experiment is hosted
# removing initial "http://" and tildes
# and substituting slashes, etc. with periods
# no hyphens/dashes, alas (known bug)
index.path = "www.unc.edu.linguistics.concept.phonSem.index"

# We have to get each version's data separately in a data frame.
# Accumulate data frames in lists:
xp.list <- list ()
meta.list <- list ()

wanted.columns <- c("IP", "X_", "experimentName",
                    "frame", "item", "fricative", "animate", "syllNum", "long", "response1",
                    "time", "trialnumber", "userCode",  "userFileName",
                    "view")

for (i in 1:6) {
  	i.str <- paste (i, sep = "")
  	if (i == 1) {
    i.str = ""
  }

# the following information comes from your settings.js file:

	if (i==1){experigen.experimentName = "PhonSemSyllAnim"}
	else if (i==2){experigen.experimentName = "PhonSyllAnim"}
	else if (i==3){experigen.experimentName = "SemSyllAnim"}
	else if (i==4){experigen.experimentName = "SemSyllShape"}
	else if (i==5){experigen.experimentName = "PhonSyllShape"}
	else {experigen.experimentName = "PhonSemSyllShape"}

	experigen.database = "http://db.phonologist.org/"

# first, send some info to the server with the current 
# sourceURL and experimentName by submitting at least one screen
# to the server.
# otherwise, the server will return an error message

	experigen.sourceURL <- paste (index.path, i.str, ".html", sep = "")

# check for usage of the experiment (number of page views per participant)
	experigen.users  =  paste(experigen.database, "users.cgi?experimentName=", experigen.experimentName, "&sourceurl=", experigen.sourceURL, sep="")
	read.csv(experigen.users, sep="\t")

# read the experimental results from the server
	experigen.url  =  paste(experigen.database, "makecsv.cgi?experimentName=", experigen.experimentName, "&sourceurl=", experigen.sourceURL, sep="")
	xp  = read.csv(experigen.url, sep="\t")
	xp$time = as.POSIXct(strptime(as.character(xp$time), "%a %b %d %H:%M:%S %Y"))
	meta = read.csv(paste(experigen.url, "&file=demographics.csv", sep=""), sep="\t")
	meta$time = as.POSIXct(strptime(as.character(meta$time), "%a %b %d %H:%M:%S %Y"))

	xp.list[[i]] <- xp[wanted.columns]
	meta.list[[i]] <- meta
	print(i)
	}


#concatenate the results of different versions
xp.all <- xp.list[[1]]
meta.all <- meta.list[[1]]
for (i in 2:length(xp.list)){
	xp.all <- rbind(xp.all, xp.list[[i]])
	meta.all <- rbind(meta.all, meta.list[[i]])

}


# assuming all went well, write to disk
# so that the results are saved even after the database server is gone
# it would be unwise not to keep a local copy of your results
#xp.csv.name <- paste (experigen.experimentName, ".xp.csv", sep = "")
#meta.csv.name <- paste (experigen.experimentName, ".meta.csv", sep = "")
write.csv(xp.all, "~/Dropbox/Personal Work in Progress/PhonSem/ExperimentalResults/xpJuly15.csv")
write.csv(meta.all, "~/Dropbox/Personal Work in Progress/PhonSem/ExperimentalResults/metaJuly15.csv")

# optional cleanup: remove all variables that begin with "experigen."
rm(list=ls(pattern="^experigen."))


