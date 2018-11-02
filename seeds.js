var mongoose=require("mongoose"),
	Property=require("./models/propDetails");

var data=[
		{
			video:"https://www.youtube.com/watch?v=hsJ2c3k_XeE",
			desc:"Vivamus condimentum eros id maximus congue. In euismod ante varius eros interdum fringilla. Fusce consequat elit eget convallis eleifend. Nulla tempor felis in tellus mollis, a tristique purus finibus. Donec lacus dolor, ullamcorper scelerisque leo quis, viverra vestibulum ipsum. Nunc pretium orci et massa interdum, a sodales mi aliquam. Nam imperdiet nulla quis diam luctus, vel fringilla tellus blandit. Mauris non nulla massa. Fusce ut aliquet lorem, ut scelerisque ante. Cras a blandit quam. Etiam ac purus tincidunt, dapibus quam sed, pulvinar velit. Aenean nulla leo, eleifend eu viverr",
			address:"ula ante, convallis non leo eu, elementum iaculis tortor. Mauris egestas tempus nulla sit amet sollicitudin. Maecenas volutpat augue nec lobortis egestas",
			img1:"https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			img2:"https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			img3:"https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
		},
		{
			video:"https://www.youtube.com/watch?v=hsJ2c3k_XeE",
			desc:"Vivamus condimentum eros id maximus congue. In euismod ante varius eros interdum fringilla. Fusce consequat elit eget convallis eleifend. Nulla tempor felis in tellus mollis, a tristique purus finibus. Donec lacus dolor, ullamcorper scelerisque leo quis, viverra vestibulum ipsum. Nunc pretium orci et massa interdum, a sodales mi aliquam. Nam imperdiet nulla quis diam luctus, vel fringilla tellus blandit. Mauris non nulla massa. Fusce ut aliquet lorem, ut scelerisque ante. Cras a blandit quam. Etiam ac purus tincidunt, dapibus quam sed, pulvinar velit. Aenean nulla leo, eleifend eu viverr",
			address:"ula ante, convallis non leo eu, elementum iaculis tortor. Mauris egestas tempus nulla sit amet sollicitudin. Maecenas volutpat augue nec lobortis egestas",
			img1:"https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			img2:"https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			img3:"https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
		},
		{
			video:"https://www.youtube.com/watch?v=hsJ2c3k_XeE",
			desc:"Vivamus condimentum eros id maximus congue. In euismod ante varius eros interdum fringilla. Fusce consequat elit eget convallis eleifend. Nulla tempor felis in tellus mollis, a tristique purus finibus. Donec lacus dolor, ullamcorper scelerisque leo quis, viverra vestibulum ipsum. Nunc pretium orci et massa interdum, a sodales mi aliquam. Nam imperdiet nulla quis diam luctus, vel fringilla tellus blandit. Mauris non nulla massa. Fusce ut aliquet lorem, ut scelerisque ante. Cras a blandit quam. Etiam ac purus tincidunt, dapibus quam sed, pulvinar velit. Aenean nulla leo, eleifend eu viverr",
			address:"ula ante, convallis non leo eu, elementum iaculis tortor. Mauris egestas tempus nulla sit amet sollicitudin. Maecenas volutpat augue nec lobortis egestas",
			img1:"https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			img2:"https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			img3:"https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
		}

]

function seedDB12(){
	//remove all records
	Property.remove({},function(err){
		if(err){
			console.log(err);
		}else{
			console.log("everything is remove");
			data.forEach(function(seed){
				Property.create(seed,function(err,property){
					if(err){
						console.log(err);
					}else{
						console.log("added property");
					}
				});
			});
		}
	});
}