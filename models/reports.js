var mongoose=require("mongoose");

var reportingSchema=new mongoose.Schema({
	reported: {type: Boolean, default: false},
	reportreason: {type:String,default:"none"},
	reportedOn:{type:Date,default:Date.now},
	property:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Property"
		},
		propTitle:String,
		author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username:String,
		email:String,
	}
	},
	reportedby:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username:String,
		email:String,
	}
})

module.exports=mongoose.model("Report",reportingSchema);