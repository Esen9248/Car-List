// Need vars
var marked;
var modeled;
var yeared;
var colored;
var edsel;
// Load My Info From Server
$(document).ready(function(){
	$.ajax({
		url: 'https://scalr.api.appbase.io/Cars/machines/_search?q=name:Esen',
		headers: {
        'Authorization':'Basic dlN1MDd5R3NwOjlmOGI4Y2E4LTkxM2UtNGQzMy1iZjFkLTZhMWE0OGM5MGQyYg==',
        'Content-Type':'application/json'
    },
		method: 'GET',
		dataType: 'json',
	}).done(function(data){
		$.each(data.hits.hits, function(){
			$('.tb').append('<tr>' + 
		'<td>' + this._source.mark + '</td>' 
		+ '<td>' + this._source.model + '</td>' + 
		'<td>' + this._source.year + '</td>' + 
		'<td>' + this._source.color + '</td>' + 
		'<td>' + $('.sel').val() + '</td>' + 
		'<td>' + `<button data-id=${this._id} class=" btn btn-danger minus glyphicon glyphicon-trash"></button>` + '</td>' +
	 	'<td><button type="button"  class="btn btn-primary edit glyphicon glyphicon-edit" data-toggle="modal" data-target="#myModal"></button></td>' + 
	 	'<td><button type button class="btn btn-primary show" data-toggle="modal" data-target="#myModal2">Смотреть</button></td>' + '</tr>');
		})
	}).fail(function( jqXHR, textStatus, error){
  	alert('Error: ' + jqXHR);
  	alert(error);
  })
});
// Add Info To Server
$('#plus').click(function(){
	$('.LoadText').css('display','block');
	$.ajax({
    url: 'https://scalr.api.appbase.io/Cars/machines',
    headers: {
        'Authorization':'Basic dlN1MDd5R3NwOjlmOGI4Y2E4LTkxM2UtNGQzMy1iZjFkLTZhMWE0OGM5MGQyYg==',
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: "json",
    data: JSON.stringify({
    name: "Esen",
    mark: $('.marks').val(),
    model: $('.model').val(),
    year: $('.year').val(),
    color: $('.color').val(),
}),
}).done(function(data){
  	$('.LoadText').css('display','none');
  	$('.tb').append('<tr>' + 
		'<td>' + $('.marks').val() + '</td>' 
		+ '<td>' + $('.model').val() + '</td>' + 
		'<td>' + $('.year').val() + '</td>' + 
		'<td>' + $('.color').val() + '</td>' + 
		'<td>' + $('.sel').val() + '</td>' + 
		'<td>' + `<button data-id=${data._id} class=" btn btn-danger minus glyphicon glyphicon-trash"></button>` + '</td>' +
	 	'<td><button type="button" class="btn btn-primary edit glyphicon glyphicon-edit" data-toggle="modal" data-target="#myModal"></button></td>' + 
	 	'<td><button type button class="btn btn-primary show" data-toggle="modal" data-target="#myModal2">Смотреть</button></td>' + '</tr>');
  }).fail(function( jqXHR, textStatus){
  	alert('Error: ' + jqXHR);
  })
})
// Delete Info From Server
$('.tb').on('click', '.minus', (function(){
	$('.LoadText').css('display','block');
	$.ajax({
		url: `https://scalr.api.appbase.io/Cars/machines/${$(this).attr('data-id')}`,
		headers: {
        'Authorization':'Basic dlN1MDd5R3NwOjlmOGI4Y2E4LTkxM2UtNGQzMy1iZjFkLTZhMWE0OGM5MGQyYg==',
        'Content-Type':'application/json',
    },
		type: 'DELETE',
		dataType: 'json',
	}).done(function(response){
		location.reload();
	}).fail(function( jqXHR, textStatus, error){
		alert(error)
	})
})
)
// Change Info In Local File
$('.tb').on('click', '.edit', function(){
	marked = $(this).parent().parent().find('td').first();
	modeled = $(marked).next();
	yeared = $(modeled).next();
	colored = $(yeared).next();
	edsel = $(colored).next();
	$('.markedited').val(marked.html());
	$('.modeledited').val(modeled.html());
	$('.yearedited').val(yeared.html());
	$('.coloredited').val(colored.html());
	$('.seledited').val(edsel.html());
	$('#myModal').on('click', '.savebtn', (function(){
	marked.html($('.markedited').val());
	modeled.html($('.modeledited').val());
	yeared.html($('.yearedited').val());
	colored.html($('.coloredited').val());
	edsel.html($('.seledited').val());
})
)
});
// Show Info In Local File
$('.tb').on('click', '.show', function(){
	var VariableShowMark =  $(this).parent().parent().find('td').first();
	var VariableShowModel = $(VariableShowMark).next();
	var VariableShowYear = $(VariableShowModel).next();
	var VariableShowColor = $(VariableShowYear).next();
	var VariableShowTranmission = $(VariableShowColor).next();
	$('.showul').append('<li>' + VariableShowMark.html() + '</li>' + 
	'<li>' + VariableShowModel.html() + '</li>' +
	'<li>' + VariableShowYear.html() + '</li>' +
	'<li>' + VariableShowColor.html() + '</li>' +
	'<li>' + VariableShowTranmission.html() + '</li>');

})
	$('#myModal2').on('click', '.showclose', (function(){
		$('.showul').html('');
	})
	)