var load = function(element, path, prepData, data) {
	var dfd = $.Deferred();
	d3.xml(path, "image/svg+xml", function(error, xml) {
		if (error) {
			return dfd.reject();
		}
		var importedNode = document.importNode(xml.documentElement, true);
		d3.select(element).node().appendChild(importedNode);
		// Callback after load
		if (prepData && data) {
			prepData(element, data);
		}
		dfd.resolve();
	});
	return dfd.promise();
}

var prepAnnotations = function(element, data) {
	// Set data
	d3.select(element).selectAll(data.selector).data(data.annotations, function(d, i) {
		if (d === undefined) {
			return d3.select(this).attr(data.identifier);
		} else {
			return d.name;
		}
	}).attr("class", function(d) {
		return d3.select(this).attr("class") + " has-tip tip-top";
	}).attr("data-tooltip", "").attr("title", function(d) {
		return d.content + "<div><small>[Click to show annotations]</small></div>";
	}).attr("id", function(d) {
		return element.substr(1) + "-" + d.name;
	}).on("click", function(d) {
		$(data.annotationsSelector + " .workflow-annotation").hide();
		$(d.onClickShow).fadeIn().css("display", "inline-block");
	})

	// Set size
	d3.select(element).select("svg").attr("width", function() {
		return $(this).parent().width();
	}).attr("preserveAspectRatio", "xMinYMin meet");

	// Remove titles to avoid duplicate tooltips
	d3.select(element).selectAll('title').remove();
};

var prepOntology = function(element, data) {
	d3.select(element).select("svg").attr("height", function() {
		return $(this).height() * $(this).parent().width() / $(this).width();
	}).attr("width", function(d) {
		return $(this).parent().width();
	}).attr("height", function() {
		return $(this).parent().height();
	}).attr("preserveAspectRatio", "xMinYMin meet");
}

var highlightOntology = function(event) {
	$('.ontology-button').removeClass('highlighted');
	$(this).addClass('highlighted');

	d3.selectAll(".ontology-element")
		.transition()
		.style("opacity", 0.3);

	d3.selectAll(event.data.hightlightElements)
		.transition()
		.style("opacity", 1);

	return false;
}

$(document).ready(function() {

	var migProfile = {
		selector: "g, polygon",
		identifier: "id",
		annotationsSelector: "#workflow-mig-profile-annotations",
		annotations: [{
			name: "node4",
			content: "Source object",
			onClickShow: "#workflow-mig-profile-in-source"
		}, {
			name: "node3",
			content: "Parameter",
			onClickShow: "#workflow-mig-profile-in-parameter"
		}, {
			name: "node7",
			content: "Status",
			onClickShow: "#workflow-mig-profile-out-status"
		}, {
			name: "node8",
			content: "Target object",
			onClickShow: "#workflow-mig-profile-out-target"
		}, {
			name: "node9",
			content: "External tool",
			onClickShow: "#workflow-mig-profile-tool"
		},{
			name: null,
			content: "Workflow",
			onClickShow: "#workflow-mig-profile-workflow"
		}]
	};

	var mig1 = {
		selector: "g, polygon",
		identifier: "id",
		annotationsSelector: "#workflow-mig1-annotations",
		annotations: [{
			name: "node4",
			content: "Source object",
			onClickShow: "#workflow-mig1-in-source"
		}, {
			name: "node3",
			content: "Parameter",
			onClickShow: "#workflow-mig1-in-parameter"
		}, {
			name: "node7",
			content: "Status",
			onClickShow: "#workflow-mig1-out-status"
		}, {
			name: "node8",
			content: "Target object",
			onClickShow: "#workflow-mig1-out-target"
		}, {
			name: "node9",
			content: "Imagemagick",
			onClickShow: "#workflow-mig1-tool"
		},{
			name: null,
			content: "Workflow",
			onClickShow: "#workflow-mig1-workflow"
		}]
	};

	var ccProfile = {
		selector: "g, polygon",
		identifier: "id",
		annotationsSelector: "#workflow-cc-profile-annotations",
		annotations: [{	
			name: "node3",
			content: "Source object",
			onClickShow: "#workflow-cc-profile-in-source"
		}, {
			name: "node8",
			content: "Image resolution",
			onClickShow: "#workflow-cc-profile-out-54"
		}, {
			name: "node7",
			content: "Image width",
			onClickShow: "#workflow-cc-profile-out-50"
		}, {
			name: "node6",
			content: "Image height",
			onClickShow: "#workflow-cc-profile-out-52"
		}, {
			name: "node9",
			content: "External tool",
			onClickShow: "#workflow-cc-profile-tool"
		},{
			name: null,
			content: "Workflow",
			onClickShow: "#workflow-cc-profile-workflow"
		}]
	};

	var cc1 = {
		selector: "g, polygon",
		identifier: "id",
		annotationsSelector: "#workflow-cc1-annotations",
		annotations: [{	
			name: "node3",
			content: "Source object",
			onClickShow: "#workflow-cc1-in-source"
		}, {
			name: "node8",
			content: "Image resolution",
			onClickShow: "#workflow-cc1-out-54"
		}, {
			name: "node7",
			content: "Image width",
			onClickShow: "#workflow-cc1-out-50"
		}, {
			name: "node6",
			content: "Image height",
			onClickShow: "#workflow-cc1-out-52"
		}, {
			name: "node9",
			content: "Imagemagick",
			onClickShow: "#workflow-cc1-tool"
		},{
			name: null,
			content: "Workflow",
			onClickShow: "#workflow-cc1-workflow"
		}]
	};
	
	var qaoProfile = {
		selector: "g, polygon",
		identifier: "id",
		annotationsSelector: "#workflow-qao-profile-annotations",
		annotations: [{	
			name: "node4",
			content: "Left object",
			onClickShow: "#workflow-qao-profile-in-left"
		}, {
			name: "node3",
			content: "Right object",
			onClickShow: "#workflow-qao-profile-in-right"
		}, {
			name: "node7",
			content: "Measure port",
			onClickShow: "#workflow-qao-profile-out-6"
		}, {
			name: "node10",
			content: "External tool",
			onClickShow: "#workflow-qao-profile-tool"
		},{
			name: null,
			content: "Workflow",
			onClickShow: "#workflow-qao-profile-workflow"
		}]
	};

	var qao1 = {
		selector: "g, polygon",
		identifier: "id",
		annotationsSelector: "#workflow-qao1-annotations",
		annotations: [{	
			name: "node4",
			content: "Left object",
			onClickShow: "#workflow-qao1-in-left"
		}, {
			name: "node3",
			content: "Right object",
			onClickShow: "#workflow-qao1-in-right"
		}, {
			name: "node7",
			content: "MSE",
			onClickShow: "#workflow-qao1-out-6"
		}, {
			name: "node10",
			content: "Imagemagick",
			onClickShow: "#workflow-qao1-tool"
		},{
			name: null,
			content: "Workflow",
			onClickShow: "#workflow-qao1-workflow"
		}]
	};

	// Deferred for loading
	$.when(
		load("#workflows-migration-profile", "images/workflows-migration.svg", prepAnnotations, migProfile),
		load("#workflows-migration-imagemagick_convert-tiff2tiff-compression", "images/workflows-migration-imagemagick_convert-tiff2tiff-compression.svg", prepAnnotations, mig1),
		load("#workflows-cc-profile", "images/workflows-characterisation.svg", prepAnnotations, ccProfile),
		load("#workflows-cc-imagemagick-image_size", "images/workflows-cc-imagemagick-image_size.svg", prepAnnotations, cc1),
		load("#workflows-qaobject-profile", "images/workflows-qaobject.svg", prepAnnotations, qaoProfile),
		load("#workflows-qaobject-imagemagick_compare-tiff2tiff-mse", "images/workflows-qaobject-imagemagick_compare-tiff2tiff-mse.svg", prepAnnotations, qao1),
		load("#workflows-pap-imagemagick_convert-tiff2tiff-mse-height-width", "images/workflows-pap-imagemagick_convert-tiff2tiff-mse-height-width.svg"),


		load("#annotations-workflow", "images/annotations-workflow.svg", prepOntology, {}),
		load("#annotations-ports", "images/annotations-ports.svg", prepOntology, {})
	).then(function() {
		$(document).foundation();
	});

	// Highlight.js
	hljs.initHighlightingOnLoad();

	$('#annotations-migration').click({hightlightElements: '.ontology-migration'}, highlightOntology);
	$('#annotations-characterisation').click({hightlightElements: '.ontology-characterisation'}, highlightOntology);
	$('#annotations-qao').click({hightlightElements: '.ontology-qao'}, highlightOntology);
	$('#annotations-executable-plan').click({hightlightElements: '.ontology-executable-plan'}, highlightOntology);
});


