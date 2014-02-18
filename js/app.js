var load = function(element, path, annotations) {
	d3.xml(path, "image/svg+xml", function(error, xml) {
		if (error) {
			return;
		}
		var importedNode = document.importNode(xml.documentElement, true);
		d3.select(element).node().appendChild(importedNode);
		if (annotations) {
			setAnnotations(element, annotations);
		}
	});
}

var setAnnotations = function(element, data) {
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
	}).on("click", function(d) {
		$(data.annotationsSelector + " .workflow-annotation").hide();
		$(d.onClickShow).fadeIn().css("display", "inline-block");
	});

	d3.select(element).select("svg").attr("viewBox", function(d) {
		return "0 0 " + d3.select(this).attr("width") + " " + d3.select(this).attr("height");
	}).attr("width", "200px").attr("preserveAspectRatio", "xMinYMin meet");
};

$(document).ready(function() {
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
			content: "External tool",
			onClickShow: "#workflow-mig1-tool"
		},{
			name: null,
			content: "Workflow",
			onClickShow: "#workflow-mig1-workflow"
		}]
	};
	load("#workflows-migration-imagemagick_convert-tiff2tiff-compression", "images/workflows-migration-imagemagick_convert-tiff2tiff-compression.svg", mig1);

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
			content: "External tool",
			onClickShow: "#workflow-cc1-tool"
		},{
			name: null,
			content: "Workflow",
			onClickShow: "#workflow-cc1-workflow"
		}]
	};
	load("#workflows-cc-imagemagick-image_size", "images/workflows-cc-imagemagick-image_size.svg", cc1);
	

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
			content: "Mean Square Error",
			onClickShow: "#workflow-qao1-out-6"
		}, {
			name: "node10",
			content: "External tool",
			onClickShow: "#workflow-qao1-tool"
		},{
			name: null,
			content: "Workflow",
			onClickShow: "#workflow-qao1-workflow"
		}]
	};
	load("#workflows-qaobject-imagemagick_compare-tiff2tiff-mse", "images/workflows-qaobject-imagemagick_compare-tiff2tiff-mse.svg", qao1);
	load("#workflows-pap-imagemagick_convert-tiff2tiff-mse-height-width", "images/workflows-pap-imagemagick_convert-tiff2tiff-mse-height-width.svg");

	$(document).foundation();
});


