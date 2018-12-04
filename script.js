$(function(){	
	$("#form .form-group #password").on("blur", function(event){
		let password = $(this).val();
		if(password == "" || !!(+password) || !password.match(/[0-9]/g)){
			$(this).addClass("bg-warning");
		}else{
			$(this).removeClass("bg-warning");
		}
	})

	$("#form .form-group #email").on("blur", function(event){
		let email = $(this).val();
		var regexp = new RegExp("[0-9a-z]+@[0-9a-z]+[.][0-9a-z]{1,10}", "g","i");
		if(regexp.test(email)){
			$(this).removeClass("bg-warning");
		}else{
			$(this).addClass("bg-warning");
		}
	});

	$("#form .form-group .custom-checkbox #customCheck").change(function(){
		if(this.checked) {
			$(this).next().removeClass("bg-warning");
	    }else{
	    	$(this).next().addClass("bg-warning");
	    }
	});

	$("#form").on("submit", function(event) {
		event.preventDefault();	
		let $mandatoryInputs = $(".form-group .mandatory", this);
		for (let key in $mandatoryInputs) {
			if($mandatoryInputs[key].value == ""){
				$($mandatoryInputs[key]).addClass("bg-warning");
			}else{
				$($mandatoryInputs[key]).removeClass("bg-warning");
			}
		}
		if(!document.querySelector("#customCheck").checked){
			$(".form-group .custom-checkbox .custom-control-label", this).addClass("bg-warning");
		}
	});

	$("#form").on("reset", function(event) {
		let $mandatoryInputs = $("form .form-group .mandatory");
		$mandatoryInputs.removeClass("bg-warning");
	});
//adding new fields to #form
	$("#add-field").on("submit", function(event) {
		event.preventDefault();
		let label = $(".form-group:first-child #fieldName", this).val();
		let count = $("#form .form-group").length;
		let $formGroup = $("#form .form-group input");
		let formGroupId = [];
		for(let key in $formGroup){
			formGroupId.push($formGroup[key].id);
		}	

		if(label == "" || formGroupId.includes(label)){
			label = "input"+(count + 2);
		}		
			
		$("#form input[type='submit']").prev().append(`<div class="form-group form-row form-${label}"></div>`);		
		let addSelector = `.form-${label} `;
		if($(".form-group:last-child #isMandatory", this).prop('checked')){
			$(addSelector).append(`<label for="${label}">${label}<span class="text-danger">*</span></label>`);
			$(addSelector).append(`<input type="text" id="${label}" class="form-control col-lg-12 mandatory">`);
		}else{
			$(addSelector).append(`<label for="${label}" class="col-lg-12">${label}</label>`);
			$(addSelector).append(`<input type="text" id="${label}" class="form-control col-lg-12">`);
		}
	});	
});