SurgeNode.prototype = new Node();
SurgeNode.prototype.constructor = SurgeNode;
SurgeNode.prototype.parent = Node.prototype;

/*
 * the name that displays in the authoring tool when the author creates a new step
 */
SurgeNode.authoringToolName = "Surge"; 

/*
 * will be seen by the author when they add a new step to their project to help
 * them understand what kind of step this is
 */
SurgeNode.authoringToolDescription = "This is a generic step only used by developers";

/*
 * The tag map functions that are available for this step type
 */
SurgeNode.tagMapFunctions = [
	{functionName:'importWork', functionArgs:[]},
	{functionName:'showPreviousWork', functionArgs:[]},
	{functionName:'checkScore', functionArgs:['Min Score']},
	{functionName:'getAccumulatedScore', functionArgs:[]}
];

/*
 * The statuses that this step can return
 */
SurgeNode.statuses = [
	'bronze',
	'silver',
	'gold'
];

/**
 * This is the constructor for the Node
 * @constructor
 * @extends Node
 * @param nodeType
 * @param view
 */
function SurgeNode(nodeType, view) {
	this.view = view;
	this.type = nodeType;
	this.prevWorkNodeIds = [];
	
	this.tagMapFunctions = this.tagMapFunctions.concat(SurgeNode.tagMapFunctions);
}

/**
 * This function is called when the vle loads the step and parses
 * the previous student answers, if any, so that it can reload
 * the student's previous answers into the step.
 * 
 * @param stateJSONObj
 * @return a new state object
 */
SurgeNode.prototype.parseDataJSONObj = function(stateJSONObj) {
	return SurgeState.prototype.parseDataJSONObj(stateJSONObj);
};

/**
 * This function is called if there needs to be any special translation
 * of the student work from the way the student work is stored to a
 * human readable form. For example if the student work is stored
 * as an array that contains 3 elements, for example
 * ["apple", "banana", "orange"]
 *  
 * and you wanted to display the student work like this
 * 
 * Answer 1: apple
 * Answer 2: banana
 * Answer 3: orange
 * 
 * you would perform that translation in this function.
 * 
 * Note: In most cases you will not have to change the code in this function
 * 
 * @param studentWork
 * @return translated student work
 */
SurgeNode.prototype.translateStudentWork = function(studentWork) {
	return studentWork;
};

/**
 * We do not need to do anything onExit for SURGE since 
 * we are saving state intermediately.
 */
SurgeNode.prototype.onExit = function() {
	//check if the content panel has been set
	/*
	if(this.contentPanel) {
		if(this.contentPanel.save) {
			//tell the content panel to save
			this.contentPanel.save();
		}
	}
	*/
};

/**
 * Renders the student work into the div. The grading tool will pass in a
 * div id to this function and this function will insert the student data
 * into the div.
 * 
 * @param displayStudentWorkDiv the div we will render the student work into
 * @param nodeVisit the student work
 * @param childDivIdPrefix (optional) a string that will be prepended to all the 
 * div ids use this to prevent DOM conflicts such as when the show all work div
 * uses the same ids as the show flagged work div
 * @param workgroupId the id of the workgroup this work belongs to
 * 
 * Note: you may need to add code to this function if the student
 * data for your step is complex or requires additional processing.
 * look at SensorNode.renderGradingView() as an example of a step that
 * requires additional processing
 */
SurgeNode.prototype.renderGradingView = function(displayStudentWorkDiv, nodeVisit, childDivIdPrefix, workgroupId) {
	var gradingText = "";
	// Get all the trials (ie states) for this nodevisit
	var nodeStates = nodeVisit.nodeStates;
	
	if (nodeStates.length > 0) {
		
		// get the best score
		gradingText += "<span style='font-weight:bold;'>Best medal earned for this level: "+nodeStates[nodeStates.length-1].getStudentWork().response.topScoreText+"</span><br/><br/>";
		
		// get the number of trials during this node visit.
		gradingText += "This visit has " + nodeStates.length + " trial(s).<br/><br/>";
		
		/*
		 * loop through the trials from newest to oldest so that
		 * the newest displays at the top
		 */
		for (var i=nodeStates.length - 1; i>=0; i--) {
			gradingText += "<b>Trial #"+(i+1)+"</b><br/>"
			gradingText += JSON.stringify(nodeStates[i].getStudentWork().response) + "<br/><br/>";
		}

		//put the student work into the div
		displayStudentWorkDiv.html(gradingText);
	}
};

/**
 * Get the html file associated with this step that we will use to
 * display to the student.
 * 
 * @return a content object containing the content of the associated
 * html for this step type
 */
SurgeNode.prototype.getHTMLContentTemplate = function() {
	return createContent('node/surge/surge.html');
};

/**
 * Process the student work to see if we need to display a colored
 * star next to the step in the nav menu
 * @param studentWork the student's surge state
 */
SurgeNode.prototype.processStudentWork = function(studentWork) {
	if(studentWork != null) {
		if(studentWork.response != null && studentWork.response != "") {
			//var className = "";
			var imgPath = '';
			var tooltip = '';
			
			//get the top score
			var topScore = studentWork.response.topScore;
			var scoreAbsolute = studentWork.response.scoreAbsolute;
			
			var best;
			
			if(topScore > scoreAbsolute || topScore == scoreAbsolute){
				best = topScore;
			} else {
				best = scoreAbsolute;
			}
			
			if(best == 10) {
				//className = "bronzeStar";
				imgPath = '/vlewrapper/vle/node/surge/images/bronzeStar.gif';
				tooltip = "You have earned a bronze medal";
			} else if(best == 20) {
				//className = "silverStar";
				imgPath = '/vlewrapper/vle/node/surge/images/silverStar.png';
				tooltip = "You have earned a silver medal";
			} else if(best == 30) {
				//className = "goldStar";
				imgPath = '/vlewrapper/vle/node/surge/images/goldStar.png';
				tooltip = "You have earned a gold medal";
			}
			
			//display the star next to the step in the nav menu
			eventManager.fire('updateStepStatusIcon', [this.id, imgPath, tooltip]);			
		}
	}
};

/**
 * Get the status given the latest node state
 * @param nodeState the latest student work
 * @return the status for the node state
 */
SurgeNode.prototype.getStatus = function(nodeState) {
	var status = '';
	
	if(nodeState != null) {
		//get the best score
		var topScore = nodeState.response.topScore;
		var scoreAbsolute = nodeState.response.scoreAbsolute;
		
		var best;
		
		if(topScore >= scoreAbsolute) {
			best = topScore;
		} else {
			best = scoreAbsolute;
		}
		
		//get the status given the score
		if(best == 10) {
			status = 'bronze';
		} else if(best == 20) {
			status = 'silver';
		} else if(best == 30) {
			status = 'gold';
		}
	}
	
	return status;
};

/**
 * Get the step icon for the status
 * @param status the status to retrieve the step icon for
 * @return the step icon path for the status
 */
SurgeNode.prototype.getStepIconForStatus = function(status) {
	var iconPath = '';
	
	/*
	 * try to retrieve the step icon path from the step content
	 * if it is available
	 */
	iconPath = this.getStepIconPathForStatusFromContent(status);
	
	if(iconPath == null) {
		/*
		 * the step icon path was not authored in the step so
		 * we will use the default step icons
		 */
		if(status == 'bronze') {
			iconPath = '/vlewrapper/vle/node/surge/images/bronzeStar.gif';
		} else if(status == 'silver') {
			iconPath = '/vlewrapper/vle/node/surge/images/silverStar.png';
		} else if(status == 'gold') {
			iconPath = '/vlewrapper/vle/node/surge/images/goldStar.png';
		}		
	}
	
	return iconPath;
};

/**
 * Get all the statuses that this step can return
 */
SurgeNode.prototype.getStatuses = function() {
	var statuses = [];
	
	/*
	 * get the statuses from the parent and combine it 
	 * with the statuses from this step
	 */
	statuses = Node.statuses.concat(SurgeNode.statuses);
	
	return statuses;
};

//Add this node to the node factory so the vle knows it exists.
NodeFactory.addNode('SurgeNode', SurgeNode);

//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	eventManager.fire('scriptLoaded', 'vle/node/surge/SurgeNode.js');
};