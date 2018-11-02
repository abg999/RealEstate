var express			=require("express"),
	app				=express(),
	bodyParser 		=require("body-parser"),
	mongoose		=require("mongoose"),
	flash			=require("connect-flash"),
	methodOverride=require("method-override"),
	// seedDB 			=require("./newSeeds"),
	Property 		=require("./models/propDetails"),
	User            =require("./models/user");//(v3)
	Report          =require("./models/reports");
	passport        =require("passport");//v3
	LocalStrategy	=require("passport-local");//v3	


var count12=0;
var currentPage=parseInt(0),
	state="",
	city="",
	type="";


mongoose.connect("mongodb://ashish:ashish123@ds249623.mlab.com:49623/realestate");
app.set("view engine","ejs");

app.use(methodOverride("_method"));//Tells node to look for pattern _method in url for eg "_method=PUT" 
app.use(flash());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));


// seedDB();


//=======================================
//PASSPORT CONFIGURTION(V3)
//=======================================

app.use(require("express-session")({
	secret: "hello darkness my old friend",
	resave: false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){//this is a middleware whatever function we provide to it will be called on every route defined so here we are passing req.user which contains username and id of logged in user 
	res.locals.currentUser=req.user;//whatever we put inside res.input is availaible inside template
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});

//==========================
//middle ware
function isLoggedIn (req,res,next){   //this function simply just checks if user is logged in or not if yes then next() thing mostly a callback function is executed if not the user will be redirected to login page
	if(req.isAuthenticated()){	
		return next();
	}
	req.flash("error","You need to be logged in to do that")
	res.redirect("/login");
}

function isAdmin(req,res,next){   //this function simply just checks if user is logged in or not if yes then next() thing mostly a callback function is executed if not the user will be redirected to login page
		if(req.isAuthenticated()){
		if(req.user.username==='admin'){	
		return next();
	}
}else{
	req.flash("error","Please Login first")
	res.redirect("/")

}
	req.flash("error","You need to be logged in as admin to do that")
	res.redirect("/");
}
	
//===============================




var CounterSchema = mongoose.Schema({
    seq: { type: Number, default: 2 }
});

var Counter = mongoose.model('counter', CounterSchema);




app.get("/",function(req,res){
	Property.aggregate([{$group: {_id: "$propStatus"}}],function(err,alltypes){
		if(err){
		}
		else{
			var query=Property.find({propStatus: "2"}).limit(4).sort({'_id': -1})
			query.exec(function(err,sale){
				if(err){
					console.log(err)
				}
				else{
					var query=Property.find({propStatus: "1"}).limit(4).sort({'_id': -1})
					query.exec(function(err,rent){
						if(err){
							console.log(err)
						}
						else{
							res.render("landing-page1",{type: alltypes,rent: rent,sale: sale});
						}
					})
						
				}
			})
		}
	})
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

	//==========================	
	//search logic begins
	//==========================
	if(req.query.propDetails){
		Property.find( { $and:[ {state:req.query.propDetails.state},{ city:req.query.propDetails.city},{ propStatus:req.query.propDetails.propStatus} ]},function(err,prop){
		if(err){
			console.log(err);
		}else{
			currentPage=1;
			console.log("search success");
			console.log("currentPage = "+currentPage);
			Property.count({},function(err1,co){
				console.log("count is " + co);
				count12=co;
				console.log("count glogal is "+count12);
				res.render("properties/property-list",{prop:prop,co:co,cp:currentPage});
			});
		}
	});

	}else if(req.query.propFilter){
		const { propRooms, bathrooms,garages } = req.query.propFilter;
		let query = {};
		if(propRooms) {
   		query.propRooms = propRooms;
		}
		if(bathrooms) {
   		query.bathrooms = bathrooms;
		}
		if(garages){
			query.garages = garages;
		}
		Property.find(query,function(err,prop){
			if(err){
				console.log(err);
			}else{
				co=1;
				cp=1;
				console.log(prop)
				console.log(query)
				res.render("properties/property-list",{prop:prop,co:co,cp:currentPage});
			}
		})
	}
else{
	Property.find({} ,{}, { sort: { '_id' : -1 } },function(err,prop){
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
	}).limit(5);

	}
});

//===================
//	new pages
//===================

app.get("/list/:cp",function(req,res){
	currentPage=req.params.cp;
	var skipValue=5 * currentPage; 
	console.log("updated currentPage is "+currentPage);
	console.log("updated skip is "+skipValue);
	Property.find()
	.skip(skipValue)
	.limit(5)
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


app.put("/properties/:id",function(req,res){
	Property.findById(req.params.id,function(err,property){
		if(err){
			console.log(err)
			res.redirect("/")
		}else{
			Report.create(req.body.report,function(err,report){
				if(err){
					console.log(err);
				}else{
					console.log(property)
					console.log(property.id)
					report.reported=true;
					report.property.id=property.id;
					report.property.propTitle=property.propTitle,
					report.property.author.id=property.author.id,
					report.property.author.username=property.author.username;
					report.property.author.email=property.author.email;
					report.reportedby.id=req.user.id,
					report.reportedby.username=req.user.username,
					report.reportedby.email=req.user.email
					report.save();
					property.reports.unshift(report);
					property.save()
					req.flash("success","Your report is submitted action will be taken very soon!")
					res.redirect("/list/properties/"+req.params.id);
				}
			})
		}
	});
});

// app.put("/properties/:id",function(req,res){
// 	//var query = {'_id': req.params.id};
// 	Property.findById(req.params.id,function(err,property){
// 		if(err){
// 			console.log(err)
// 			res.redirect("/")
// 		}else{
// 			Report.create(req.body.report,function(err,report){
// 				if(err){
// 					console.log(err);
// 				}else{

// 					report.reported===true;
// 					report.Property.id=property._id;
// 					property.reports.push(report);

// 				}
// 			})
// 		}
// 	});
// });









//==================================================================================================
//						PROPERTIES SUBMIT
//=========================================================================================================

app.get("/submit",isLoggedIn,function(req,res){
	res.render("submit/submit-property");
	console.log(count12)
});

app.post("/submit",isLoggedIn,function(req,res){
	var details1=req.body.propDetails;
	// var seller1={
	// 	id: req.user._id,
	// 	username:req.user.username
	// };
	// var newProperty={propDetails:details1,seller:seller1}
	Property.create(details1,function(err,createdProp){
		if(err){
			console.log(err);
		}else{
			createdProp.author.id=req.user._id;
			createdProp.author.username=req.user.username;
			createdProp.author.email=req.user.email;
			console.log("prop created redirected");
			console.log("the user entered is "+req.user.username);
			createdProp.save();
			Counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter){});
			req.flash("success","Succesfully Added your Property")
			res.redirect("/list");
		}
	});

});



//====================================
//AUTH ROUTES
//====================================


//====================================
//Register page
//====================================

app.get("/register",function(req,res){
	res.render("register/register");
})


//====================================
//Register post
//====================================

app.post("/register" ,function(req,res){
	var newUser = new User({username: req.body.username,email: req.body.email})
	if(req.body.password===req.body.confirmpassword){
		User.register(newUser, req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message)
			return res.render("register/register");
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","Congratulations! you just successfully registered as "  +user.username)
			res.redirect("/");
		});
	});
	}
	else{
		console.log("password dont match");
		req.flash("error","password and confirm password don't match Please try again")

		return res.render("register/register");
		req.flash("error","password and confirm password don't match Please try again")

	
	}
	
});


//====================================
//Login page
//====================================
app.get("/login",function(req,res){
	res.render("register/login");
})


//====================================
//Login post
//====================================
//handling login logic
app.post("/login",function (req, res, next) {
	passport.authenticate("local",
	{	
		successRedirect:"/",
		failureRedirect:"/login",
		failureFlash: true,
		successFlash: "Welcome back to Find Houses, " + req.body.username + "!"
	})(req,res);
});


//====================================
//LOGOUT
//====================================
app.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Logged you out!")
	res.redirect("/")
})

//=====================================
//Admin page route
//=====================================
app.get("/admin",isAdmin,function(req,res){
	Property.find({} ,{}, { sort: { '_id' : -1 } }).populate("reports").exec(function(err,prop){
		if(err){
			console.log(err);
		}else{
			User.find({},function(req,user){
				if(err){
					console.log(err)
				}
				else{
					res.render("admin/admin",{prop:prop,user_count:user.length});

				}
			})
			

		}
	});
});

app.get("/admin/:id/reportDetails",isAdmin,function(req,res){
	Property.findById(req.params.id).populate("reports").sort({'rep': -1}).exec(function(err,prop){
		if(err){
			console.log(err);
		}else{
			res.render("admin/reportDetails",{prop:prop});
		}
	});
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
app.get("/admin/:id/deleteprop",isAdmin,function(req,res){
	Property.findByIdAndRemove(req.params.id,function(err,foundProp){
		if(err){
			console.log(err);
		}else{
			console.log("Prop deleted")
			req.flash("success", foundProp.propTitle  +" Property deleted successfully ")
			res.redirect("/");
		}
	});
})



app.listen(4004,function(){
	console.log("server started at port 4004")
});
