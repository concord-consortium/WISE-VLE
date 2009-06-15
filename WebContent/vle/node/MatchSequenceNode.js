/*
 * MatchSequenceNode
 */

MatchSequenceNode.prototype = new Node();
MatchSequenceNode.prototype.constructor = MatchSequenceNode;
MatchSequenceNode.prototype.parent = Node.prototype;
function MatchSequenceNode(nodeType, connectionManager) {
	this.connectionManager = connectionManager;
	this.type = nodeType;
}

MatchSequenceNode.prototype.render = function(contentpanel) {
	if(this.filename!=null && vle.project.lazyLoading){ //load element from file
		this.retrieveFile();
	};
	
	window.frames["ifrm"].location = "node/matchsequence/matchsequence.html";
} 


MatchSequenceNode.prototype.load = function() {
	//match sequence step content is hardcoded at the moment
	//window.frames["ifrm"].loadXMLString("<OTMatchSequence id='1475a592-aac0-11dd-8fe2-a728984a84db' title='Sample &quot;Self-Check&quot;' authorNotes='' hoverString='Pas Step' isInjectPrompt='false' lockStudentAnswers='true' randomChoiceOrder='false'><introductionHtml>&lt;!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'&gt;&lt;html xmlns='http://www.w3.org/1999/xhtml'&gt;&lt;head&gt;&lt;meta name='generator' content='HTML Tidy for Java (vers. 26 Sep 2004), see www.w3.org' /&gt;&lt;link href='http://tels-group.soe.berkeley.edu/uccp/Assets/css/UCCP.css' media='screen' rel='stylesheet' type='text/css' /&gt;&lt;title&gt;&lt;/title&gt;&lt;/head&gt;&lt;body id='selfCheckIntro'&gt;&lt;p class='Intro1'&gt;Sometimes, we'll present you with a series of questions that you can use to check your own work. By taking time to carefully think about the answers, you'll help yourself betterunderstand the concepts at hand.&lt;/p&gt;&lt;p class='Intro2'&gt;After you answer the questions below, check your work and see how you did. You can try again as many times as you want.&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</introductionHtml><jaxbXML><assessmentItem xmlns='http://www.imsglobal.org/xsd/imsqti_v2p0' xmlns:ns3='http://www.w3.org/1998/Math/MathML' xmlns:ns2='http://www.w3.org/1999/xlink' timeDependent='false' adaptive='false'><responseDeclaration identifier='CHOICE_SELF_CHECK_ID'><correctResponse interpretation='choice 3'><value isDefault='false' isCorrect='false'>choice 3</value></correctResponse></responseDeclaration><responseDeclaration identifier='MATCH_ASSMT_1'><correctResponse><value isDefault='false' isCorrect='true' choiceIdentifier='newfan' fieldIdentifier='yes'>&lt;html&gt;&lt;body  class='feedback'&gt;Most digital fans contain a computer to remember the settings that a person has given it and control the motor to reflect those settings.&lt;/body&gt;&lt;/html&gt;</value><value isDefault='false' isCorrect='true' choiceIdentifier='ps3' fieldIdentifier='yes'>&lt;html&gt;&lt;body  class='feedback'&gt;Yes, video game consoles are most definitely computers.  In fact, the manufacturers of the latest generation of the consoles are hoping that their consoles to take over most, if not all, of the duties of a family's home computer.&lt;/body&gt;&lt;/html&gt;</value><value isDefault='false' isCorrect='false' choiceIdentifier='oldfan' fieldIdentifier='yes'>&lt;html&gt;&lt;body  class='feedback'&gt;While an older fan uses electricity, it contains only simple switches and components change what is getting fed to the motor. There isn't anything that people would call a computer.&lt;/body&gt;&lt;/html&gt;</value><value isDefault='false' isCorrect='true' choiceIdentifier='soldier' fieldIdentifier='yes'>&lt;html&gt;&lt;body  class='feedback'&gt;Modern soldiers carry many computers to help them with the myriad of tasks they need to do.&lt;/body&gt;&lt;/html&gt;</value><value isDefault='false' isCorrect='false' choiceIdentifier='pencil' fieldIdentifier='yes'>&lt;html&gt;&lt;body  class='feedback'&gt;A pencil is a piece of wood, some graphite, and maybe an eraser! There isn't a computer in there!&lt;/body&gt;&lt;/html&gt;</value><value isDefault='false' isCorrect='true' choiceIdentifier='car' fieldIdentifier='yes'>&lt;html&gt;&lt;body  class='feedback'&gt;Right, a modern car contains several computers: the CD player, for instance!&lt;/body&gt;&lt;/html&gt;</value><value isDefault='false' isCorrect='true' choiceIdentifier='cell' fieldIdentifier='yes'>&lt;html&gt;&lt;body  class='feedback'&gt;Right, a cell phone definitely contains computers.&lt;/body&gt;&lt;/html&gt;</value><value isDefault='true' isCorrect='false' fieldIdentifier='yes'>&lt;html&gt;&lt;body  class='feedback'&gt;this is the defualt&lt;/body&gt;&lt;/html&gt;</value><value isDefault='false' isCorrect='false' choiceIdentifier='ps3' fieldIdentifier='no'>&lt;html&gt;&lt;body  class='feedback'&gt;Yes, video game consoles are most definitely computers.  In fact, the manufacturers of the latest generation of the consoles are hoping that their consoles to take over most, if not all, of the duties of a family's home computer.&lt;/body&gt;&lt;/html&gt;</value><value isDefault='false' isCorrect='false' choiceIdentifier='newfan' fieldIdentifier='no'>&lt;html&gt;&lt;body  class='feedback'&gt;Digital fans need to remember the settings that a person has given it, and control the motor to reflect those settings, make beeps when an error occurs, and so forth.  This is a clear indication of computing power.&lt;/body&gt;&lt;/html&gt;</value><value isDefault='false' isCorrect='true' choiceIdentifier='oldfan' fieldIdentifier='no'>&lt;html&gt;&lt;body  class='feedback'&gt;Right, an older fan only contains simple electrical components. There isn't anything that people would call a computer.&lt;/body&gt;&lt;/html&gt;</value><value isDefault='false' isCorrect='false' choiceIdentifier='soldier' fieldIdentifier='no'>&lt;html&gt;&lt;body  class='feedback'&gt;Modern soldiers carry many computers to help them with the myriad of tasks they need to do. In fact, they often have a 'ruggedized' laptop computer that operates a lot like a business person's laptop.&lt;/body&gt;&lt;/html&gt;</value><value isDefault='false' isCorrect='true' choiceIdentifier='pencil' fieldIdentifier='no'>&lt;html&gt;&lt;body  class='feedback'&gt;Right. No computer in there.&lt;/body&gt;&lt;/html&gt;</value><value isDefault='false' isCorrect='false' choiceIdentifier='car' fieldIdentifier='no'>&lt;html&gt;&lt;body  class='feedback'&gt;A modern car contains several computers: e.g., to sense and control the engine, to operate the radio and CD player, and so forth.&lt;/body&gt;&lt;/html&gt;</value><value isDefault='false' isCorrect='false' choiceIdentifier='cell' fieldIdentifier='no'>&lt;html&gt;&lt;body  class='feedback'&gt;A modern cell phone definitely contains computers: they need to send digital information to the towers that link them to the greater network, they often run games, most often have a calculator tool, and so forth.&lt;/body&gt;&lt;/html&gt;</value><value isDefault='true' isCorrect='false' fieldIdentifier='no'>&lt;html&gt;&lt;body  class='feedback'&gt;this is the defualt&lt;/body&gt;&lt;/html&gt;</value></correctResponse><mapping defaultValue='0.0'><mapEntry mappedValue='1.0' mapKey='gapTextType' /></mapping></responseDeclaration><responseDeclaration identifier='CHOICE_ASSMT_1'><correctResponse><value isDefault='false' isCorrect='false'>SIMPLE_CHOICE_ID1</value></correctResponse></responseDeclaration><itemBody><choiceInteraction hasInlineFeedback='true' responseIdentifier='CHOICE_SELF_CHECK_ID' maxChoices='1' shuffle='false'><prompt>&lt;!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'&gt;&lt;html xmlns='http://www.w3.org/1999/xhtml'&gt;&lt;head&gt;&lt;meta name='generator' content='HTML Tidy for Java (vers. 26 Sep 2004), see www.w3.org' /&gt;&lt;link href='http://tels-group.soe.berkeley.edu/uccp/Assets/css/UCCP.css' media='screen' rel='stylesheet' type='text/css' /&gt;&lt;title&gt;&lt;/title&gt;&lt;/head&gt;&lt;body&gt;&lt;p class='selfCheckQuestion'&gt;How long does it take a typical home computer to add two big numbers together?&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</prompt><simpleChoice fixed='true' identifier='choice 1'><feedbackInline identifier='choice 1' showHide='show'>Computers are much, much faster than this!  Almost everything a computer does involves adding numbers together. Even drawing a simple shape on the screen can force the computer to add hundreds, if not thousands, of numbers together</feedbackInline>It can add them about once a second.</simpleChoice><simpleChoice fixed='true' identifier='choice 2'><feedbackInline identifier='choice 2' showHide='show'>Computers are faster than this!  The UNIVAC, first made in 1951, could add 100,000 ten-digit numbers together each second.</feedbackInline>It can add them about 1,000 times a second.</simpleChoice><simpleChoice fixed='true' identifier='choice 3'><feedbackInline identifier='choice 3' showHide='show'>This answer is closest to correct.  Different computers can be quite different from each other, so any answer you might is an approximation.</feedbackInline>It can add them about 100,000,000 times a second.</simpleChoice><simpleChoice fixed='true' identifier='choice 4'><feedbackInline identifier='choice 4' showHide='show'>The processing limits of computers steadily shrink, but will never reach zero. There are still plenty of problems that, while easy to state, would take a modern computer decades to solve.</feedbackInline>It can add them so fast there is no limit in a second.</simpleChoice></choiceInteraction><gapMatchInteraction hasInlineFeedback='true' responseIdentifier='MATCH_ASSMT_1' shuffle='true'><prompt>&lt;html&gt;&lt;body  class='matchprompt' style='font-size:14px; font-family:Verdana, Arial,Helvetica; width:550px; margin:20px 0 10px 0 ; color:#0000FF; line-height:120%;'&gt;Which of the following items contain a computer?  Drag the Answers over to the correct box, then click 'Submit Answers' to check your choices. check you answers.&lt;/body&gt;&lt;/html&gt;</prompt><gapText identifier='ps3' matchMax='1'>&lt;html&gt;&lt;body class='choice'&gt;Playstation 3&lt;/body&gt;&lt;/html&gt;</gapText><gapText identifier='newfan' matchMax='1'>&lt;html&gt;&lt;body class='choice'&gt;Digital fan&lt;/body&gt;&lt;/html&gt;</gapText><gapText identifier='oldfan' matchMax='1'>&lt;html&gt;&lt;body class='choice'&gt;Old-school fan&lt;/body&gt;&lt;/html&gt;</gapText><gapText identifier='soldier' matchMax='1'>&lt;html&gt;&lt;body class='choice'&gt;U.S. Marine stationed in Iraq&lt;/body&gt;&lt;/html&gt;</gapText><gapText identifier='pencil' matchMax='1'>&lt;html&gt;&lt;body class='choice'&gt;Pencil&lt;/body&gt;&lt;/html&gt;</gapText><gapText identifier='car' matchMax='1'>&lt;html&gt;&lt;body class='choice'&gt;Modern car&lt;/body&gt;&lt;/html&gt;</gapText><gapText identifier='cell' matchMax='1'>&lt;html&gt;&lt;body class='choice'&gt;Cell phone&lt;/body&gt;&lt;/html&gt;</gapText><gapMultiple identifier='yes' ordinal='false' numberOfEntries='0'>&lt;html&gt;&lt;body class='slot'&gt;Items that contain one or more computers:)&lt;/body&gt;&lt;/html&gt;</gapMultiple><gapMultiple identifier='no' ordinal='false' numberOfEntries='0'>&lt;html&gt;&lt;body class='slot'&gt;Items that do not contain a computer:&lt;/body&gt;&lt;/html&gt;</gapMultiple></gapMatchInteraction></itemBody></assessmentItem><customCheck>alert('hello world ' + state); return 'all right!';</customCheck></jaxbXML></OTMatchSequence>");
	//var xmlNode = this.element.getElementsByTagName("jaxbXML")[0].firstChild.nodeValue;
	var xmlCustomCheck = this.element.getElementsByTagName("customCheck");
	if(xmlCustomCheck[0]!=null){
		xmlCustomCheck = xmlCustomCheck[0].firstChild.nodeValue;
	} else {
		xmlCustomCheck = null;
	};
	
	window.frames["ifrm"].loadFromXMLString(this.getXMLString(), xmlCustomCheck);
	document.getElementById('topStepTitle').innerHTML = this.title;
}

MatchSequenceNode.prototype.getDataXML = function(nodeStates) {
	return MatchSequenceNode.prototype.parent.getDataXML(nodeStates);
}

/**
 * 
 * @param nodeStatesXML xml nodeStates object that contains xml state objects
 * @return an array populated with state object instances
 */
MatchSequenceNode.prototype.parseDataXML = function(nodeStatesXML) {
	var statesXML = nodeStatesXML.getElementsByTagName("state");
	var statesArrayObject = new Array();
	for(var x=0; x<statesXML.length; x++) {
		var stateXML = statesXML[x];
		
		/*
		 * parse an individual stateXML object to create an actual instance
		 * of an MSSTATE object and put it into the array that we will return
		 */
		var stateObject = MSSTATE.prototype.parseDataXML(stateXML);
		
		if(stateObject != null) {
			statesArrayObject.push(stateObject);
		}
	}
	
	return statesArrayObject;
}


//used to notify scriptloader that this script has finished loading
scriptloader.scriptAvailable(scriptloader.baseUrl + "vle/node/MatchSequenceNode.js");