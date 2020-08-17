// Jobs

var jobs = [{
		id: 1,
		text: 'students',
		deadline: 8,
		profit: 3
	},
	{
		id: 2,
		text: 'politicians',
		deadline: 6,
		profit: 8
	},
	{
		id: 3,
		text: 'celebrities',
		deadline: 2,
		profit: 4
	},
	{
		id: 4,
		text: 'engineers',
		deadline: 4,
		profit: 7
	},
	{
		id: 5,
		text: 'scientists',
		deadline: 5,
		profit: 1
	},
	{
		id: 6,
		text: 'terrorists',
		deadline: 2,
		profit: 2
	},
	{
		id: 7,
		text: 'doctors',
		deadline: 8,
		profit: 5
	},
	{
		id: 8,
		text: 'labourers',
		deadline: 1,
		profit: 2
	}
];

var n = 8;

// var jobs = [];

// for (var i = 0; i < n; i++) {
// 	jobs.push({
// 		id: i + 1,
// 		text: String('job' + (i + 1)),
// 		profit: anime.random(1, n),
// 		deadline: anime.random(1, n)
// 	});
// }

// Lane Component

Vue.component('lane', {
	props: ['job', 'profit', 'deadline'],
	template: '<div class="job zombie-land-job"><h3 class="job-title">{{job}}      p : {{profit}} d: {{deadline}}</h3><div class="job-content"><div class="line"><div class="square el m m-square"></div><div class="square el z z-square"></div></div></div></div>'
});

// Current Component

Vue.component('current', {
	props: ['job'],
	template: '<div class="job river-job "><div class="job-content"><div class="line"><div class="circle el b b-square"></div></div></div></div>'
});

// Current Component

Vue.component('stand', {
	props: ['job'],
	template: '<div class="job pure-land-job "><div class="job-content"><div class="line"><div class="square el s s-square"></div></div></div></div>'
});

// Loading the componets

var zombieLand = new Vue({
	el: '#zombie-land',
	data: {
		jobs: jobs
	}
});

var river = new Vue({
	el: '#river',
	data: {
		jobs: jobs
	}
});

var pureLand = new Vue({
	el: '#pure-land',
	data: {
		jobs: jobs
	}
});

// Sizing

$('.job').css('min-height', String('calc(100% /' + n + ' )'));

if (n >= 15) {
	$('.square').css('height', '12px').css('width', '12px');
	$('.circle').css('height', '12px').css('width', '12px');
}

if (n >= 20) {
	$('.square').css('height', '8px').css('width', '8px');
	$('.circle').css('height', '8px').css('width', '8px');
}

if (n >= 40) {
	$('.square').css('height', '6px').css('width', '6px');
	$('.circle').css('height', '6px').css('width', '6px');
}

if (n > 50) {
	$('.square').css('height', '3px').css('width', '3px');
	$('.circle').css('height', '3px').css('width', '3px');
}

if (n >= 20) {
	$('.job-title').css('font-size', '8px');
}

if (n >= 40) {
	$('.job-title').css('font-size', '6px');
}

// Start Up Animations

var laneLength = document.getElementsByClassName('zombie-land-job')[0].offsetWidth;

var riverLength = document.getElementsByClassName('river-job')[0].offsetWidth;

var squareLength = document.getElementsByClassName('square')[0].offsetWidth;

var startUpTimeLine = anime.timeline();

startUpTimeLine
	.add({
		targets: '.m',
		translateX: {
			value: laneLength - squareLength - 15,
			duration: 500,
			elasticity: 1
		},
		delay: function (el, i, l) {
			return i * 100;
		}
	})
	.add({
		targets: '.z',
		opacity: {
			value: 1,
			duration: 1000,
			elasticity: 1
		},
		delay: function (el, i, l) {
			return i * 100;
		},
		offset: '-=500'
	})
	.finished.then(() => {
		activatePlayback = 0;
		anime({
			targets: '.m',
			translateX: {
				value: laneLength - squareLength - 15,
				duration: 0
			},
			scale: [{
					value: 1.2
				},
				{
					value: 1
				}
			],
			loop: true
		});
	});

// Algorithm

var globalProfit = 0;

function jobSeq(sortedJobs) {
	var n = sortedJobs.length;

	sortedJobs.sort(function (a, b) {
		return b.profit - a.profit;
	});

	var result = [];
	var slot = [];

	for (var i = 0; i < n; i++) {
		slot[i] = false;
	}

	for (var i = 0; i < n; i++) {
		for (var j = Math.min(n, sortedJobs[i].deadline) - 1; j >= 0; j--) {
			if (slot[j] == false) {
				result[j] = i;
				slot[j] = true;
				break;
			}
		}
	}

	var solution = [];
	var nonsol = [];
	for (var i = 0; i < n; i++) {
		if (slot[i]) {
			solution.push(sortedJobs[result[i]]);
			globalProfit = globalProfit + sortedJobs[result[i]].profit;
			console.log(sortedJobs[result[i]]);
		}
	}

	nonsol = sortedJobs.diff(solution);

	return [solution, nonsol];
}

// Main storyBoard

function showAlgo(arr) {
	var solution = arr[0];
	var nonsol = arr[1];
	anime({
		targets: '.z',
		translateX: {
			value: laneLength - squareLength - 15,
			duration: function (el, i, l) {
				return jobs[i].deadline * 1000;
			},
			easing: 'linear'
		}
	});
	for (var i = 0; i < nonsol.length; i++) {
		animateDead(i, nonsol[i].text, nonsol[i].deadline);
	}
	for (var i = 0; i < solution.length; i++) {
		animatePeople(i, solution[i].text, solution[i].deadline);
	}
}

function animatePeople(i, id, t) {
	setTimeout(() => {
		var elm = String('#' + id + ' .m');
		var elb = String('#' + id + ' .b');
		var els = String('#' + id + ' .s');
		document.querySelector(elm).style.opacity = 0;
		document.querySelector(elb).style.opacity = 1;
		var tl = anime.timeline();
		anime({
				targets: elb,
				translateX: {
					value: riverLength - squareLength - 2 * 15,
					duration: 500,
					easing: 'linear'
				}
			}).finished
			.then(() => {
				document.querySelector(els).style.opacity = 1;
				anime({
					targets: els,
					scale: [{
							value: 1.2
						},
						{
							value: 1
						}
					],
					loop: true
				});
				anime({
					targets: elb,
					translateX: {
						value: 0,
						duration: 500,
						easing: 'linear'
					}
				}).finished.then(() => {
					document.querySelector(elb).style.opacity = 0;
				});
			})
			.then(() => {
				document.getElementById('type').innerHTML = String('Profit : ' + globalProfit);
			});
	}, (i + 0.8) * 1000);
}

function animateDead(i, id, t) {
	setTimeout(() => {
		deadMan(id);
	}, t * 1000);
}

function deadMan(id) {
	var elm = String('#' + id + ' .m');
	document.querySelector(elm).style.backgroundColor = 'red';
	document.querySelector(elm).style.zIndex = 2;
}

// Playback Controls

var activatePlayback = 1;

var buttonState = 0;

var play = function () {};

var pause = function () {};

document.querySelector('html').onkeyup = function (e) {
	e.preventDefault;
	if (e.keyCode == 32 && activatePlayback == 0) {
		var solution = jobSeq(jobs.slice());
		showAlgo(solution);
		if (buttonState == 0) {
			play();
			buttonState = 1;
		} else {
			pause();
			buttonState = 0;
		}
	}
};

// Helpers

Array.prototype.diff = function (a) {
	return this.filter(function (i) {
		return a.indexOf(i) < 0;
	});
};