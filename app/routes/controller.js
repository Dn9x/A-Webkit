global._$ = jQuery;

var Users = require('./model/users');
var Class = require('./model/class');
var Score = require('./model/score');
var gui = require('nw.gui');
var async = require('async');

var app = angular.module('wapp', ['ngRoute']);

//配置路由
app.config(['$routeProvider', function($routeProvider){
	//定义路由
	$routeProvider
		.when('/', { templateUrl: '../view/stu.html', controller: 'StuCtrl' })
		.when('/stu', { templateUrl: '../view/stu.html', controller: 'StuCtrl' })
		.when('/sco', { templateUrl: '../view/sco.html', controller: 'ScoCtrl' })
		.when('/rep', { templateUrl: '../view/rep.html', controller: 'RepCtrl' })
		.otherwise({ redirectTo: '/' });

}]);

//添加学生控制器
app.controller('StuCtrl', ['$scope', function($scope){
	
	show();

	$scope.submit = function(){
		var name = $scope.name;

		if(name != null && name.length != 0){
			Users.addStu(name, function(err, info){
				$scope.name = "";
				show();
			});
		}
	};

	function show(){
		Users.getStuList(function(err, stus){
			$scope.stus = stus;

			//这句代码很重要，你可以尝试不添加这句看看效果
			$scope.$apply();
		});
	};

}]);

//添加分数控制器
app.controller('ScoCtrl', ['$scope', function($scope){
	//读取学生
	Users.getStuList(function(err, stus){
		$scope.stus = stus;

		$scope.$apply();
	});

	//读取科目
	Class.getClass(function(err, classes){
		$scope.clas = classes;
	});

	//选择学生
	$scope.shows = function(name){
		$scope.stuname = name;
	};

	//选择科目
	$scope.showc = function(name){
		$scope.claname = name;
	};
	
	var scores = [];
	//暂存数据
	$scope.addlist = function(){
		if($scope.stuname != null && $scope.claname != null && $scope.score != null){

			scores[scores.length] = {
				stuname: $scope.stuname,
				claname: $scope.claname,
				score: $scope.score
			};

			$scope.scores = scores;
		}
	};

	//添加数据库到数据库
	$scope.submit = function(){
		if(scores.length > 0){
			Score.addScore(scores, function(err, info){
				//清空数组
				scores.length = 0;
				$scope.stuname = "";
				$scope.claname = "";
				$scope.score = "";
				$scope.$apply();
			});
		}
	};

}]);

//图表控制器
app.controller('RepCtrl', ['$scope', function($scope){

	var users = [];
	var scores = [{name: '语文', data:[]}, {name: '数学', data:[]}, {name: '英语', data:[]}];

	Score.getUsers(function(err, info){
		for(var i=0;i<info.length;i++){
			users[users.length] = info[i].name;
		}

		Score.getScore(function(err, info){
			//循环有成绩的学生
        	for(var j=0;j<users.length;j++){
				
				//获取有成绩学生的成绩
				for(var i=0;i<info.length;i++){
					
					//每次只获取外围循环学生的成绩
					if(info[i].name == users[j]){
						switch(info[i].clas){
							case '语文':
								scores[0].data[scores[0].data.length] = info[i].score;
								break;
							case '数学':
								scores[1].data[scores[1].data.length] = info[i].score;
								break;
							default:
								scores[2].data[scores[2].data.length] = info[i].score;
								break;
						};

					}
				}

				//判断某个学生那个科目没有分数
				if(scores[0].data.length > scores[1].data.length){
					scores[1].data[scores[1].data.length] = 0;
				}else if(scores[0].data.length < scores[1].data.length){
					scores[0].data[scores[0].data.length] = 0;
				}

				//判断过0和1之后，如果1还有问题就说明0和1都有问题
				if(scores[1].data.length > scores[2].data.length){
					scores[2].data[scores[2].data.length] = 0;
				}else if(scores[1].data.length < scores[2].data.length){
					scores[1].data[scores[1].data.length] = 0;
					scores[0].data[scores[0].data.length] = 0;
				}
			}

			$('#container').highcharts({                   //图表展示容器，与div的id保持一致
		        chart: {
		            type: 'column'                         //指定图表的类型，默认是折线图（line）
		        },
		        title: {
		            text: '学生成绩单'      //指定图表标题
		        },
		        xAxis: {
		            categories: users  //指定x轴分组
		        },
		        yAxis: {
		            title: {
		                text: '分数'                  //指定y轴的标题
		            }
		        },
	            tooltip: {
	            	formatter: function() {  
	                    return '<b>'+ this.series.name +'</b><br/>'+  
	                    this.x +': '+ this.y +'￥';  
	                }
	            },
	            plotOptions: {
	                column: {
	                    dataLabels: {
	                        enabled: true
	                    },
	                    enableMouseTracking: true
	                }
	            },
		        series: scores
		    });

			$scope.$apply();
		});
	});
	
}]);