var mongoose=require("mongoose");

var propertySchema=new mongoose.Schema({
	video:String,
	desc:String,
	address:String,
	img1:String,
	img2:String,
	img3:String,
	propTitle:String,
	propType:String,
	propStatus:String,
	propRooms:Number,
	propPrice:Number,
	propArea:Number,
	garages:String,
	bathrooms:String,
	city:String,
	state:String,
	latitude:Number,
	longitude:Number,
	airCon:Boolean,
	swimming:Boolean,
	heating:Boolean,
	laundtyRoom:Boolean,
	gym:Boolean,
	windowCovering:Boolean,
	refigrator:Boolean,
	tvwif:Boolean,
	microwave:Boolean,
	reportreason: {type:String,default:"none"},
	createdOn:{type:Date,default:Date.now},
	Reported: {type: Boolean, default: false},
	
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username:String,
		email:String,
	},
	reports:[
	{
		type: mongoose.Schema.Types.ObjectId,
		ref:"Report"
	}
	]

});

module.exports=mongoose.model("Property",propertySchema);