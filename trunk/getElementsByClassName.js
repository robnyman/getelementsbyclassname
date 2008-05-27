/*
	Developed by Robert Nyman
	Code/licensing: http://code.google.com/p/domassistant/
*/	
function getElementsByClassName(className, tag, elm){
	tag = tag || "*";
	elm = (this !== window)? this : elm || document;
	var classes = className.split(" "),
		classesToCheck = "",
		returnElements = [],
		elements,
		current;
	if (elm.getElementsByClassName) {
		var nodeName = new RegExp("\\b" + ((tag !== "*")? tag : "[a-z]+") + "\\b", "i");
		elements = elm.getElementsByClassName(className);
		for(var i=0, il=elements.length; i<il; i+=1){
			current = elements[i];
			if(nodeName.test(current.nodeName)) {
				returnElements.push(current);
			}
		}
	}
	else if (document.evaluate) {
		var xhtmlNamespace = "http://www.w3.org/1999/xhtml",
			namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
			node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
		try	{
			elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
		}
		catch (e) {
			elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
		}
		while ((node = elements.iterateNext())) {
			returnElements.push(node);
		}
	}
	else {
		classesToCheck = [];
		elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
		var match;
		for(var k=0, kl=classes.length; k<kl; k+=1){
			classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
		}
		for(var l=0, ll=elements.length; l<ll; l+=1){
			current = elements[l];
			match = false;
			for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
				match = classesToCheck[m].test(current.className);
				if (!match) {
					break;
				}
			}
			if (match) {
				returnElements.push(current);
			}
		}
	}	
	return returnElements;
}