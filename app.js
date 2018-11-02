var express			=require("express"),
	app				=express(),
	bodyParser 		=require("body-parser"),
	mongoose		=require("mongoose"),
	seedDB			=require("./seeds"),
	Property 		=require("./models/propDetails");


var count12=0;
var currentPage=parseInt(0);


mongoose.connect("mongodb://ashish:ashish123@ds249623.mlab.com:49623/realestate");
app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));

var CounterSchema = mongoose.Schema({
    seq: { type: Number, default: 2 }
});

var Counter = mongoose.model('counter', CounterSchema);

//var data=[
//		{
//			video:"https://www.youtube.com/watch?v=hsJ2c3k_XeE",
//			desc:"Vivamus condimentum eros id maximus congue. In euismod ante varius eros interdum fringilla. Fusce consequat elit eget convallis eleifend. Nulla tempor felis in tellus mollis, a tristique purus finibus. Donec lacus dolor, ullamcorper scelerisque leo quis, viverra vestibulum ipsum. Nunc pretium orci et massa interdum, a sodales mi aliquam. Nam imperdiet nulla quis diam luctus, vel fringilla tellus blandit. Mauris non nulla massa. Fusce ut aliquet lorem, ut scelerisque ante. Cras a blandit quam. Etiam ac purus tincidunt, dapibus quam sed, pulvinar velit. Aenean nulla leo, eleifend eu viverr",
//			address:"ula ante, convallis non leo eu, elementum iaculis tortor. Mauris egestas tempus nulla sit amet sollicitudin. Maecenas volutpat augue nec lobortis egestas",
//			img1:"https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//			img2:"https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//			img3:"https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
//		},
//		{
//			video:"https://www.youtube.com/watch?v=hsJ2c3k_XeE",
//			desc:"Vivamus condimentum eros id maximus congue. In euismod ante varius eros interdum fringilla. Fusce consequat elit eget convallis eleifend. Nulla tempor felis in tellus mollis, a tristique purus finibus. Donec lacus dolor, ullamcorper scelerisque leo quis, viverra vestibulum ipsum. Nunc pretium orci et massa interdum, a sodales mi aliquam. Nam imperdiet nulla quis diam luctus, vel fringilla tellus blandit. Mauris non nulla massa. Fusce ut aliquet lorem, ut scelerisque ante. Cras a blandit quam. Etiam ac purus tincidunt, dapibus quam sed, pulvinar velit. Aenean nulla leo, eleifend eu viverr",
//			address:"ula ante, convallis non leo eu, elementum iaculis tortor. Mauris egestas tempus nulla sit amet sollicitudin. Maecenas volutpat augue nec lobortis egestas",
//			img1:"https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//			img2:"https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//			img3:"https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
//		},
//		{
//			video:"https://www.youtube.com/watch?v=hsJ2c3k_XeE",
//			desc:"Vivamus condimentum eros id maximus congue. In euismod ante varius eros interdum fringilla. Fusce consequat elit eget convallis eleifend. Nulla tempor felis in tellus mollis, a tristique purus finibus. Donec lacus dolor, ullamcorper scelerisque leo quis, viverra vestibulum ipsum. Nunc pretium orci et massa interdum, a sodales mi aliquam. Nam imperdiet nulla quis diam luctus, vel fringilla tellus blandit. Mauris non nulla massa. Fusce ut aliquet lorem, ut scelerisque ante. Cras a blandit quam. Etiam ac purus tincidunt, dapibus quam sed, pulvinar velit. Aenean nulla leo, eleifend eu viverr",
//			address:"ula ante, convallis non leo eu, elementum iaculis tortor. Mauris egestas tempus nulla sit amet sollicitudin. Maecenas volutpat augue nec lobortis egestas",
//			img1:"https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//			img2:"https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//			img3:"https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
//		}
//
//]
//
//function seedDB12(){
//	//remove all records
//	Property.remove({},function(err){
//		if(err){
//			console.log(err);
//		}else{
//			console.log("everything is remove");
//			data.forEach(function(seed){
//				Property.create(seed,function(err,property){
//					if(err){
//						console.log(err);
//					}else{
//						console.log("added property");
//					}
//				});
//			});
//		}
//	});
//}
//

//Property.remove({},function(err){
//	if(err){
//		console.log(err);
//	}else{
//		console.log("all removed");
//	}
//});

//seedDB12();
app.get("/",function(req,res){
	res.render("landing-page");
});

//==================================================================================================
//						PROPERTIES LIST
//=========================================================================================================
app.get("/list",function(req,res){

	//var countProperties=Counter.find({}).select('_id');
	//console.log(countProperties);
	//var count12=0;
	//Property.count({},function(err,co){
	//	console.log("count is " + co);
	//	count12=co;
	//});
	//console.log(count12);
	Property.find({},function(err,prop){
		if(err){
			console.log(err);
		}else{
			currentPage=1;
			console.log("currentPage = "+currentPage);
			Property.count({},function(err1,co){
				console.log("count is " + co);
				count12=co;
				console.log("count glogal is "+count12);
				res.render("properties/property-list",{prop:prop,co:co,cp:currentPage});
			});
		}
	}).limit(1);

});

app.get("/list/:cp",function(req,res){
	currentPage=req.params.cp;
	var skipValue=1 * currentPage; 
	console.log("updated currentPage is "+currentPage);
	console.log("updated skip is "+skipValue);
	Property.find()
	.skip(skipValue)
	.limit(1)
	.exec({},function(err,prop){
		if(err){
			console.log(err);
		}else{
			Property.count({},function(err1,co){
				//console.log("count is " + co);
				//count12=co;
				//console.log("count glogal is "+count12);
				res.render("properties/property-list",{prop:prop,co:co,cp:currentPage});
			});
		}
	});
	
});


//==================================================================================================
//						PROPERTIES DESCRIPTION
//=========================================================================================================

app.get("/list/properties/:id",function(req,res){
	Property.findById(req.params.id,function(err,foundProp){
		if(err){
			console.log(err);
		}else{
			res.render("properties/propertiesPage",{prop:foundProp});
		}
	});

});

//==================================================================================================
//						PROPERTIES SUBMIT
//=========================================================================================================

app.get("/submit",function(req,res){
	res.render("submit/submit-property");
	console.log(count12)
});

app.post("/submit",function(req,res){
	Property.create(req.body.propDetails,function(err,createdProp){
		if(err){
			console.log(err);
		}else{
			console.log("prop created redirected");
			Counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter){});
			res.redirect("/list");
		}
	});

});



//==================================================================================================
//						REGISTER
//=========================================================================================================

app.get("/register",function(req,res){
	res.render("register/register");
});


//==================================================================================================
//						LOGIN
//=========================================================================================================
app.get("/test",function(req,res){
	res.render("resTest");
});







app.listen(4004,function(){
	console.log("server started at port 4000")
});
