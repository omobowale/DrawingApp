$(function(){
	var canvas = document.getElementById("drawingCanvasDiv");
	var contxt = canvas.getContext('2d');
	var mouse = {x:0, y:0};
	var paint_erase = "paint";
	
	//on page load, do the following
	if(localStorage.getItem("canvasImg") != null){
		var img = new Image();
		img.onload = function(){
			contxt.drawImage(img, 0, 0);
			}
		img.src = localStorage.getItem("canvasImg");
		}
	else
	{
		alert("no image found");
		}
	
	
	$("#thicknessCircle").css('background-color', $("#colorInput").val())
		
	$(".slider").slider({
		min : 3,
		max: 30,
		slide: function(event, ui){
			$("#thicknessCircle").css({
				'height' : ui.value,
				'width' :ui.value
				})
			}
		});
		
		
	$("#colorInput").change(function(){
//		alert($(this).val());
		$("#thicknessCircle").css('background-color', $(this).val())
		});
		
	$("#drawingCanvasDiv").mousedown(function(e){
		paint = true;
		if (paint){
		contxt.beginPath();
		contxt.lineWidth = $("#thicknessCircle").width();
		contxt.lineCap = "round";
		contxt.lineJoin = 'round';
		if (paint_erase == "paint")
			contxt.strokeStyle = $("#colorInput").val();
		else
			contxt.strokeStyle = 'white';
			
		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;

		contxt.moveTo(mouse.x,mouse.y);
		}
		
		})
		
	$("#drawingCanvasDiv").mousemove(function(e){
		if (paint){
		
		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
		
		contxt.lineTo(mouse.x,mouse.y);

		contxt.stroke();
		}
		
		});
		
		
		$("#drawingCanvasDiv").mouseup(function(e){
			paint = false;
		})
		
		$("#drawingCanvasDiv").mouseenter(function(e){
			if(paint_erase != "erase")
				$(this).css('cursor', 'crosshair');
		})
		
		$("#eraseButton").click(function(){
			$("#drawingCanvasDiv").css('cursor', 'wait');
			$(this).toggleClass('changeBgColor2');
			if (paint_erase == "paint")
				paint_erase = "erase";
				
			else
				paint_erase = "paint";
			
			});
			
		$("#saveButton").click(function(){
			if(typeof(localStorage) != null){
				localStorage.setItem("canvasImg", canvas.toDataURL());
				if(localStorage.getItem("canvasImg")!=null){
					alert("image successfully saved!");
					};
			}
			else
				alert("your browser does not support local storage");
		
			});			
			
			
		$("#resetButton").click(function(){
			contxt.clearRect(0, 0, canvas.width, canvas.height);
			paint_erase = "paint";
			$("#eraseButton").removeClass('changeBgColor2');
			});
		
	});