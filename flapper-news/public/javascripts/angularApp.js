var app= angular.module('flapperNews',['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider,$urlRouterProvider){

		$stateProvider
		.state('home',{
			url: '/home',
			templateUrl: '/home.html',
			controller:'MainCtrl'
		});

		$stateProvider
		.state('posts',{
			url: '/posts/{id:int}',
			templateUrl : '/posts.html',
			controller:'PostsCtrl'

		});

		$urlRouterProvider.otherwise('home');
	}]);


app.factory('posts',[function(){
	var o = {
		posts : []
	};
	
	return o;

}]);


app.controller('MainCtrl',[
'$scope','posts',function($scope,posts){
	$scope.test = 'Hello World!';
	$scope.posts = posts.posts;
	var nextPostIndex = 0;
	console.log("nextindex:",nextPostIndex);
	
	$scope.addPost = function()
	{
		console.log("Inside add Post to ",posts.posts);
		if(!$scope.title || $scope.title=='')
		{
			console.log("title empty");
			return;
		}
		
		$scope.posts.push({
			id : nextPostIndex++,
			title: $scope.title, 
			link: $scope.link,
			upvotes : 0,
			comments: [
				{author:'Joe', body:'Cool Post!', upvotes:0},
				{author:'Meghan', body: 'Sure! But could use more research!', upvotes: 0}
			]

		});

		console.log("Added Post to ",posts.posts);

		$scope.title = "";
		$scope.link = "";

	};

	$scope.incrementUpvotes= function(post){
		 post.upvotes += 1;
	};

}]);


app.controller('PostsCtrl',[
	'$scope','$stateParams','posts',function($scope,$stateParams,posts){
		console.log($stateParams.id,"no posts",posts.posts,"end");
		$scope.post = posts.posts[$stateParams.id];

		$scope.addComment = function(){

			if($scope.body === '' )
				{return;}
			
			$scope.posts.comments.push({
				body: $scope.body,
				author: 'user',
				upvotes: 0
			});

			$scope.body ='';


		};



	}]);