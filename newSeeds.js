var mongoose	=require("mongoose"),
	propList	=require("./models/sampleProp"),
	Property	=require("./models/propDetails");



function seedDB(){
	//remove all
	Property.remove({},function(err){
		if(err){
			console.log(err);
		}else{
			console.log("removed all");
			//add new
			propList.forEach(function(seed){
				Property.create(seed,function(err,property){
					if(err){
						console.log(err);
					}else{
						console.log("prop created");
					}
				});
			});
		}
	});
}

module.exports=seedDB;