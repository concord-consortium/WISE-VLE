/*
 * This is a branching step object that developers can use to create new
 * step types.
 * 
 * TODO: Copy this file and rename it to
 * 
 * <new step type>.js
 * e.g. for example if you are creating a quiz step it would look
 * something like quiz.js
 *
 * and then put the new file into the new folder
 * you created for your new step type
 *
 * your new folder will look something like
 * vlewrapper/WebContent/vle/node/<new step type>/
 *
 * e.g. for example if you are creating a quiz step it would look something like
 * vlewrapper/WebContent/vle/node/quiz/
 * 
 * 
 * TODO: in this file, change all occurrences of the word 'Branching' to the
 * name of your new step type
 * 
 * <new step type>
 * e.g. for example if you are creating a quiz step it would look
 * something like Quiz
 */

/**
 * This is the constructor for the object that will perform the logic for
 * the step when the students work on it. An instance of this object will
 * be created in the .html for this step (look at branching.html)
 * 
 * TODO: rename Branching
 * 
 * @constructor
 */
function Branching(node) {
	this.node = node;
	this.view = node.view;
	this.content = node.getContent().getContentJSON();
	this.chosenPathId = null; // which path the student has chosen or was assigned to
	this.chosenPathName = null; //the title of the path that was chosen

	if(node.studentWork != null) {
		this.states = node.studentWork; 
	} else {
		this.states = [];  
	};
};

/**
 * Translates VLE constants like WISE_WORKGROUP_ID to actual workgroup value
 * @param operand
 */
Branching.prototype.translateOperand = function(operand) {
	if (operand == "WISE_WORKGROUP_ID") {
		if (this.view.getConfig().getConfigParam("mode") == "portalpreview") {
			return 0;
		} else {
			return this.view.getUserAndClassInfo().getWorkgroupId();
		}
	}
	return operand;
};

/**
 * 
 * @param annotationKey key in the run annotations e.g. "groups"
 */
Branching.prototype.annotationLookup = function(annotationKey) {
	var runAnnotations = this.node.view.getAnnotationsByType("run");

	// lookup the annotationKey in the runAnnotations obj. runAnnotationsObj should be set by this point.
	if (runAnnotations.getAnnotationsByType("run").length > 0) {
		return runAnnotations.getAnnotationsByType("run")[0].value[annotationKey];
	} else {
		return [];
	}

};	

/**
 * Determine which path to visit
 */
Branching.prototype.getPathToVisit = function() {
	// invoke the branching function and get the results.
	var branchingFunction = this.content.branchingFunction;
	var branchingFunctionParams = this.content.branchingFunctionParams;
	var pathToVisit = null;
	if (branchingFunction == "mod") {
		var leftOperand = this.translateOperand(branchingFunctionParams[0]);
		var rightOperand = this.translateOperand(branchingFunctionParams[1]);
		var result = leftOperand % rightOperand;
		// use the result to determine the path to visit
		for (var i=0; i<this.content.paths.length; i++) {
			var path = this.content.paths[i];
			if (path.branchingFunctionExpectedResults == result) {
				pathToVisit = path;
				break;
			}
		}
	} else if (branchingFunction == "annotationLookup") {
		if (this.view.getConfig().getConfigParam("mode") == "portalpreview") {
			// choose the first path for preview
			pathToVisit = this.content.paths[0];			
		} else {
			result = this.annotationLookup(branchingFunctionParams[0]);
			for (var i=0; i<this.content.paths.length; i++) {
				var path = this.content.paths[i];
				if (result.indexOf(path.branchingFunctionExpectedResults) != -1) {
					pathToVisit = path;
					break;
				}
			}			
		}
	} else if (branchingFunction == "criteriaMapping") {
		var result;
		var criterias = branchingFunctionParams;
		for (var i=0; i < criterias.length; i++) {
			var criteria = criterias[i];
			var criteriaNodeId = criteria.criteriaNodeId;
			var criteriaMappingArray = criteria.criteriaMappingArray;
			var criteriaNode = this.view.getProject().getNodeById(criteriaNodeId);
			var criteriaValueForNode = criteriaNode.getCriteriaValue();
			if (criteriaValueForNode != null) {
				for (var x=0; x < criteriaMappingArray.length; x++) {
					var criteriaMapping = criteriaMappingArray[x];
					var criteriaValue = criteriaMapping.criteriaValue;
					if (this.view.utils.recursiveCompare(criteriaValue, criteriaValueForNode)) {
						var criteriaPathIdentifier = criteriaMapping.pathIdentifier;
						for (var i=0; i<this.content.paths.length; i++) {
							var path = this.content.paths[i];
							if (path.identifier == criteriaPathIdentifier) {
								pathToVisit = path;
								return pathToVisit;
							}
						}			
					}
				}
			}
		}
	}	

	return pathToVisit;
};

/**
 * This function renders everything the student sees when they visit the step.
 * This includes setting up the html ui elements as well as reloading any
 * previous work the student has submitted when they previously worked on this
 * step, if any.
 * 
 * TODO: rename Branching
 * 
 * note: you do not have to use 'promptDiv' or 'studentResponseTextArea', they
 * are just provided as examples. you may create your own html ui elements in
 * the .html file for this step (look at branching.html).
 */
Branching.prototype.render = function() {
	// if showSplashPage is false, we immediately run the branchingFunction and go to the first node in the chosen path.
	if (!this.content.showSplashPage) {

		var pathToVisitJSONObj = this.getPathToVisit();
		if (!pathToVisitJSONObj) {
			this.view.notificationManager.notify("No branching path is available at this time. Please move on to the next step.",3);
			return;
		}
		// inject the nodes in the path into the Project
		this.chosenPathId = pathToVisitJSONObj.identifier;

		var chosenSequenceId = pathToVisitJSONObj.sequenceRef;
		var pathSequence = this.view.getProject().getNodeById(chosenSequenceId);  // get the sequence node

		//get the title of the path
		this.chosenPathName = pathSequence.title;

		// loop through the nodes in the sequence and add them to the current sequence after the branch node
		for (var i=0; i < pathSequence.children.length; i++) {
			var nodeInPath = pathSequence.children[i];
			// show the nodes in the navigation

			//display this sequence in the navigation panel
			this.displayInNavigationIncludingChildren(nodeInPath);

			if(nodeInPath.type != 'sequence') {
				// also preload the nodes in path
				nodeInPath.preloadContent();
			}
		}

		// check to see if we need to hide this BranchNode.
		if (!this.content.showBranchNodeAfterBranching) {
			var doDisplay = false;
			this.node.displayInNavigation(doDisplay);
		}

		// update navigation logic with changes to the sequence (e.g. skip hidden nodes, etc)
		this.view.updateNavigationLogic();

		// render the next node, which should be the first node of the branched path
		this.view.renderNextNode();
	} else {
		// show the splash page and let the user choose a branch to go down
	}
};

/**
 * Make the node visible in the navigation panel. If the node is a sequence
 * we will alsmo make the children visible.
 * @param node the node to make visible
 */
Branching.prototype.displayInNavigationIncludingChildren = function(node) {
	var doDisplay = true;

	if(node == null) {

	} else if(node.type == 'sequence') {
		//the node is a sequence

		//make the sequence visible
		node.displayInNavigation(doDisplay);

		//get the children of the sequence
		var children = node.children;

		//loop through all the children of the sequence
		for(var x=0; x<children.length; x++) {
			//get a child
			var child = children[x];

			//make the child visible
			this.displayInNavigationIncludingChildren(child);
		}
	} else {
		//the node is a step

		//make the step visible
		node.displayInNavigation(doDisplay);
	}
};

/**
 * This function retrieves the latest student work
 * 
 * TODO: rename Branching
 * 
 * @return the latest state object or null if the student has never submitted
 * work for this step
 */
Branching.prototype.getLatestState = function() {
	var latestState = null;

	//check if the states array has any elements
	if(this.states != null && this.states.length > 0) {
		//get the last state
		latestState = this.states[this.states.length - 1];
	}

	return latestState;
};

/**
 * This function retrieves the student work from the html ui, creates a state
 * object to represent the student work, and then saves the student work.
 * 
 * TODO: rename Branching
 * 
 * note: you do not have to use 'studentResponseTextArea', they are just 
 * provided as examples. you may create your own html ui elements in
 * the .html file for this step (look at branching.html).
 */
Branching.prototype.save = function() {
	//get the answer the student wrote
	var response = {
			"chosenPathId":this.chosenPathId,
			"chosenPathName":this.chosenPathName
	};

	/*
	 * create the student state that will store the new work the student
	 * just submitted
	 * 
	 * TODO: rename BranchingState
	 * 
	 * make sure you rename BranchingState to the state object type
	 * that you will use for representing student data for this
	 * type of step. copy and modify the file below
	 * 
	 * vlewrapper/WebContent/vle/node/branching/branchingState.js
	 * 
	 * and use the object defined in your new state.js file instead
	 * of BranchingState. for example if you are creating a new
	 * quiz step type you would copy the file above to
	 * 
	 * vlewrapper/WebContent/vle/node/quiz/quizState.js
	 * 
	 * and in that file you would define QuizState and therefore
	 * would change the BranchingState to QuizState below
	 */
	var branchingState = new BranchingState(response);

	/*
	 * fire the event to push this state to the global view.states object.
	 * the student work is saved to the server once they move on to the
	 * next step.
	 */
	this.view.pushStudentWork(this.node.id, branchingState);

	//push the state object into this or object's own copy of states
	this.states.push(branchingState);
};

//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	/*
	 * TODO: rename branching to your new folder name
	 * TODO: rename branching.js
	 * 
	 * e.g. if you were creating a quiz step it would look like
	 * 
	 * eventManager.fire('scriptLoaded', 'vle/node/quiz/quiz.js');
	 */
	eventManager.fire('scriptLoaded', 'vle/node/branching/branching.js');
}