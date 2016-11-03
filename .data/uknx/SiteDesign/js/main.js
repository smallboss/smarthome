/**
 * Created by ergin on 30.09.2016.
 */
'use strict';

(function ($, window, document) {

	// ==========================================================================
	//   SMOOTH ZOOM
	// ==========================================================================	
    $(document).ready(function(){
        $('#planPicture').smoothZoom({
            width: '100%',
            height: '100%',
            pan_BUTTONS_SHOW: "NO",
            pan_LIMIT_BOUNDARY: "YES",
            button_SIZE: 24,
            button_ALIGN: "top right",
            zoom_MAX: 400,
            border_TRANSPARENCY: 0,
            container: 'zoom_container',
            background_COLOR: '#151515',
            responsive: false,
            responsive_maintain_ratio: true,
            max_WIDTH: '',
            max_HEIGHT: ''
        });
		
		function makeLandmarksDraggable() {
			$( ".item" ).each(function() {
			  if ( ! $( this ).hasClass( "ui-draggable" ) ) {
				$( this ).draggable({ 
					containment: '#zoom_container', 
					cursor: 'pointer',
					stop: onDragStop
				});
				console.log("Object draggable now: " + $( this ).attr("id"));
			  } // if
			});			
		}

		var onDragStop = function( e, ui ) {
			var $this = $(this);
			if ($this.hasClass('ui-draggable-dragging')) {
				var zoomData = $('#planPicture').smoothZoom('getZoomData');
				var X = parseInt(($this.position().left / zoomData.ratio) + parseInt(zoomData.normX));
				var Y = parseInt(($this.position().top / zoomData.ratio) + parseInt(zoomData.normY));
				console.log("id: " + $this.attr('id') + " pos: " + X + "," + Y);
				if (X<0) X = 0;
				if (Y<0) Y = 0;
				var txt = $this.find( ".text" ).text();
				var img = $this.find( ".img-circle" ).attr('src');
				$('#planPicture').smoothZoom('removeLandmark', [ $this.attr('id') ]);
				$('#planPicture').smoothZoom('addLandmark', [ getLandmarkHTML( 
					$this.attr('id'), 
					X + "," + Y, 
					txt, 
					img,
					$this.find( ".img-circle" ).css('background-color')
				) ]);	
				makeLandmarksDraggable();
			}
		} 		

		function makeid() {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			for( var i=0; i < 16; i++ )
				text += possible.charAt(Math.floor(Math.random() * possible.length));

			return text;
		}		
		
		function getLandmarkHTML(id, pos, txt, img, color) { // pass database id here
			return '<div id="'+id+'" class="item mark" data-show-at-zoom="0" data-position="'+pos+'">\
					<div class="uiComponent">\
						<div class="text">'+txt+'</div>\
					<img class="img-circle" style="background-color: '+ color +'" src="'+img+'"/>\
					</div>\
					</div>'
		}
		
		function Demo_Add() {
			$('#planPicture').smoothZoom('addLandmark', 
				[ 
					getLandmarkHTML(makeid(), 
					"500,500", 
					"Saloon Chandelier Right Lamp", 
					"img/icons/pin.png",
					"#CCCCCC") 
				]
			);
			makeLandmarksDraggable();
		}
		
		// ==========================================================================
		//   BOOTSTRAP TOGGLE SWITCH INITIALIZE
		// ==========================================================================	
        $("input[type=\"checkbox\"], input[type=\"radio\"]").not("[data-switch-no-init]").bootstrapSwitch();

		
		// ==========================================================================
		//   HIDE/SHOW RELATED FIELDS
		// ==========================================================================			
        $("[name='addNewCBStep2_ToggleEn']").on("switchChange.bootstrapSwitch", function(event, state) {
            if (state) {
                $("#addNewCBStep2_ValPassiveField").addClass("fadeIn");
            } else {
                $("#addNewCBStep2_ValPassiveField").addClass("fadeOut");
                $("#addNewCBStep2_ValPassiveField").val("");
            }
        });

        $("#addNewCBStep2_ValPassiveField").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
            if ($(this).hasClass("fadeIn")) {
                $(this).removeClass("fadeIn").css("opacity", 1);
            }
           if ($(this).hasClass("fadeOut")) {
                $(this).removeClass("fadeOut").css("opacity", 0);
            }
        });

        $("[name='addNewCBStep3_KnxFbEn']").on("switchChange.bootstrapSwitch", function(event, state) {
            if (state) {
                $("#addNewCBStep3_KnxFbAddressField").addClass("fadeIn");
            } else {
                $("#addNewCBStep3_KnxFbAddressField").addClass("fadeOut");
                $("#addNewCBStep3_KnxFbAddressField").val("");
            }
        });

        $("#addNewCBStep3_KnxFbAddressField").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
            if ($(this).hasClass("fadeIn")) {
                $(this).removeClass("fadeIn").css("opacity", 1);
            }
           if ($(this).hasClass("fadeOut")) {
                $(this).removeClass("fadeOut").css("opacity", 0);
            }
        });

        $("[name='addNewCBStep4_RangeEn']").on("switchChange.bootstrapSwitch", function(event, state) {
            if (state) {
                $(".CBRangeField").addClass("fadeIn"); // add CSS animation class and remove after animation  
				
				//$('#addNewCBWizard').bootstrapWizard('display', 4);
				//$('#addNewCBWizard').bootstrapWizard('display', 5);
                
            } else {
                $(".CBRangeField").addClass("fadeOut"); // add CSS animation class and remove after animation
				
				//$('#addNewCBWizard').bootstrapWizard('hide', 4);
				//$('#addNewCBWizard').bootstrapWizard('hide', 5);
                
                $(".CBRangeField").val("");
            }
        });

        $(".CBRangeField").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
            if ($(this).hasClass("fadeIn")) {
                $(this).removeClass("fadeIn").css("opacity", 1);
            }
           if ($(this).hasClass("fadeOut")) {
                $(this).removeClass("fadeOut").css("opacity", 0);
            }
        });

        $("[name='addNewCBStep6_RangeFbEn']").on("switchChange.bootstrapSwitch", function(event, state) {
            if (state) {
                $(".CBRangeFbField").show().addClass("fadeIn"); // add CSS animation class and remove after animation  
            } else {
                $(".CBRangeFbField").addClass("fadeOut"); // add CSS animation class and remove after animation

                $(".CBRangeFbField").val("");
            }
        });

        $(".CBRangeFbField").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
            if ($(this).hasClass("fadeIn")) {
                $(this).removeClass("fadeIn").css("opacity", 1);
            }
           if ($(this).hasClass("fadeOut")) {
                $(this).hide().removeClass("fadeOut").css("opacity", 0);
            }
        });

        $("[name='addNewCBStep6_SecRangeFbEn']").on("switchChange.bootstrapSwitch", function(event, state) {
            if (state) {
                $(".CBRangeSecFbField").addClass("fadeIn"); // add CSS animation class and remove after animation  
            } else {
                $(".CBRangeSecFbField").addClass("fadeOut"); // add CSS animation class and remove after animation
                
                $(".CBRangeSecFbField").val("");
            }
        });

        $(".CBRangeSecFbField").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
            if ($(this).hasClass("fadeIn")) {
                $(this).removeClass("fadeIn").css("opacity", 1);
            }
           if ($(this).hasClass("fadeOut")) {
                $(this).removeClass("fadeOut").css("opacity", 0);
            }
        });

        $("[name='addNewCBStep4_FuncModel']").change(function () {
            switch ($(this).val()) {
                case 'Absolute':
                case 'Differential':
                    $(".CBRangeSliderField").show();
                    $(".CBRangeComboField").hide();
                break;

                case 'Combo':
                    $(".CBRangeSliderField").hide();
                    $(".CBRangeComboField").show();
                break;
            }
        });
				
        $("[name='pageFuncModel']").change(function () {
            switch ($(this).val()) {
                case 'zoomable':
                    $("#zoomable-image-fields").show();
                    $("#fixed-image-fields").hide();
								break;
                case 'fixed':
                    $("#zoomable-image-fields").hide();
                    $("#fixed-image-fields").show();
                break;

                case 'list':
                    $("#zoomable-image-fields").hide();
                    $("#fixed-image-fields").hide();
                break;
            }
        });

				$("#fixed-image-fields").hide();

		// ==========================================================================
		//   COLOR PICKER INITIALIZE
		// ==========================================================================	
		$('#addNewCBStep1_CP').colorpicker({
			color: '#ff9800'
		});  
		
		$('#addNewCBStep1_CP').colorpicker().on('changeColor', function() {
			$("#addNewCBStep1_SlyList li.active").find(".img-circle").css("background-color", $("[name='addNewCBStep1_CP']").val());
			$(".fileinput-preview").find(".img-circle").css("background-color", $("[name='addNewCBStep1_CP']").val());
		});
		
		// ==========================================================================
		//   FORM WIZARD INITIALIZE
		// ==========================================================================	
		$('#addNewCBWizard').bootstrapWizard({
			'nextSelector': '.wizard-controls button.next', 
			'previousSelector': '.wizard-controls button.previous', 
			'finishSelector': '.wizard-controls button.finish'
		});
		
		$('#addNewCBWizard .finish').click(function() {
			
			$('#planPicture').smoothZoom('addLandmark', 
				[ getLandmarkHTML(
				makeid(),
				"300,300", 
				$("[name='addNewCBStep1_name']").val(), 
				$("#addNewCBStep1_SlyList li.active").find(".img-circle").attr('src'),
				$("[name='addNewCBStep1_CP']").val()) ]
			);
			makeLandmarksDraggable();
			window.location = "#";
			
		});
		
		// ==========================================================================
		//   JASNY FILE INPUT
		// ==========================================================================			
		$('#addNewCBStep1_FileInput').on('change.bs.fileinput', function(event) {
			$("#addNewCBStep1_SlyList li.active").find(".img-circle").css("background-color", "#cccccc");
			$(".fileinput-preview").find(".img-circle").css("background-color", $("[name='addNewCBStep1_CP']").val());
			
		});
		 
		// ==========================================================================
		//   SLY HORIZONTAL IMAGE LISTING INITIALIZE
		// ==========================================================================	
		var SlyImageSelection = $('#addNewCBStep1_Sly');
		var $frame = SlyImageSelection.find('.frame'); 
		window.frr = $frame;
		if ($frame.length > 0) {
			var CommandButtonSly = new Sly($frame, {
				horizontal: 1,
				itemNav: 'forceCentered',
				activateMiddle: 1,
				smart: 1,
				activateOn: 'click',
				mouseDragging: 1,
				touchDragging: 1,
				releaseSwing: 1,
				startAt: 5, // This will force the sly to start from first item.
				scrollBar: SlyImageSelection.find('.scrollbar'),
				scrollBy: 1,
				activatePageOn: 'click',
				speed: 200,
				moveBy: 600,
				elasticBounds: 1,
				dragHandle: 1,
				dynamicHandle: 1,
				clickBar: 1,

				// Buttons
				forward: SlyImageSelection.find('.forward'),
				backward: SlyImageSelection.find('.backward')
			}).init();

			$("#addNewCBStep1_SlyList li.active").find(".img-circle").css("background-color", $("[name='addNewCBStep1_CP']").val());
			
			$frame.sly('on', 'active',  function () {
				$("#addNewCBStep1_SlyList li.active").find(".img-circle").css("background-color", $("[name='addNewCBStep1_CP']").val());
				$("#addNewCBStep1_SlyList li").not(".active").find(".img-circle").css("background-color", "#cccccc");
				$('#addNewCBStep1_FileInput').fileinput('clear');
			});			
		}
		
		
		// ==========================================================================
		//   SLIDER CONTROL ON NEW PAGE ADD
		// ==========================================================================	
		$( "#sl1" ).slider({
			value: 80,
			min: 0,
			max: 300,
			step: 10,
			slide: function( event, ui ) {
				$( "#sl1val" ).html( "% " + parseInt(ui.value) );
			}
		});

		$( "#sl1val" ).html( "% " + parseInt($( "#sl1" ).slider( "value" )) );

		$( "#sl2" ).slider({
			value: parseInt(100),
			min: 100,
			max: 300,
			step: 10,
			slide: function( event, ui ) {
				$( "#sl2val" ).html( "% " + parseInt(ui.value) );
			}
		});
		
		$( "#sl2val" ).html( "% " + parseInt($( "#sl2" ).slider( "value" )) );

		$( "#sl3" ).slider({
			value: parseInt(100),
			min: 100,
			max: 300,
			step: 10,
			slide: function( event, ui ) {
				$( "#sl3val" ).html( "% " + parseInt(ui.value) );
			}
		});
		
		$( "#sl3val" ).html( "% " + parseInt($( "#sl3" ).slider( "value" )) );	

		
		// ==========================================================================
		//   RESIZING
		// ==========================================================================	
		$(window).resize(function(e) {
			
			console.log('Window Resized');
			
			if ($frame.length > 0) $frame.sly('reload');
			
			$('#planPicture').parent().css({ // Page konteynırının yüksekliğini düzelt
				'height': '100%',
				'width': '100%'
			});
            $('#planPicture').smoothZoom('Reset');
            
		});

    });

})(jQuery, window, document);

