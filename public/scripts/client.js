
$(function(){
  // console.log('JQ here');



  getPets();
  getOwner();
  getStatus();
  $('#ownerReg').on('submit', regOwner);


  $('#addPet').on('submit',regPet);
  $('#petTable').on('click', '.update', updatePet);
  $('#petTable').on('click', '.delete', deletePet);
  $('#petTable').on('click', '.checkIn', changeStatus);
});

function regOwner(event){
  event.preventDefault();
  var newOwner = $(this).serialize();
  console.log('new Owner:', newOwner);
  $.ajax({
    url:'/router/owners',
    type:'POST',
    data: newOwner,
    success: getOwner
  })
}

function getOwner(){
  $.ajax({
    url: '/router/owners',
    type: 'GET',
    success: showOwner


  })
}

function showOwner(owners){
  console.log(owners);
  $('#select').empty();
  owners.forEach(function(owner){
    var $owner = $('<option>' + owner.first_name + " " + owner.last_name + '</option>');
    $owner.data("id", owner.id);
    $('#select').append($owner);
  });
}
function regPet(event){
  event.preventDefault();
  var newPet = $(this).serialize();
  var ownerId = $("select option:selected").data('id');
  newPet += '&id=' + ownerId;
  // console.log(newPet);
  $.ajax({
    url: '/router/pet',
    type: 'POST',
    data: newPet,
    success: getPets
  });

}

function getPets(pets){
  // console.log('pets');
  $.ajax({
    url: '/router/pet',
    type: 'GET',
    success: showPets
  });
}
function showPets(pets){
  // console.log('asdfpets');
  $('#petTable').empty();
  pets.forEach(function(pet){
    // console.log(pet.name+' '+pet.id);
    var $pet = $('<form class="coolform"></form>');
    var $petOwner = $('<td>' + pet.first_name + " " + pet.last_name +'</td>');
    var $petName = $('<td><input type = "text" name = petName value = "' + pet.name + '"/></td>');
    var $petBreed = $('<td><input type = "text" name = petBreed value = "' + pet.breed + '"/></td>');
    var $petColor = $('<td><input type = "text" name = petColor value = "' + pet.color + '"</td>');
    var $petUpdate = $('<td>' +'<button id="'+pet.id+'" class="btn btn-default update">Update</button>' + '</td>');
    var $petDelete = $('<td>' + '<button id="'+pet.id+'"  class="btn btn-default delete">Delete</button>'+ '</td>');
    var $petCheckIn_CheckOut = $('<td>' + '<button data-id='+pet.id+' id="update'+pet.id+'" class="btn btn-default checkIn">Check In</button>'+ '</td>');
    $pet.append($petOwner);
    $pet.append($petName);
    $pet.append($petBreed);
    $pet.append($petColor);
    $pet.append($petUpdate);
    $pet.append($petDelete);
    $pet.append($petCheckIn_CheckOut);


    $('#petTable').append($pet);
  });
}

function updatePet(event){
  event.preventDefault();
  var $updateButton = $(this);

  var $form = $updateButton.closest('form');
  var data = $form.serialize();
  // console.log(data);
  $.ajax({
    url: 'router/pet/'+$updateButton.attr('id'),
    type: 'PUT',
    data: data,
    success: getPets
  });
}

function deletePet(event) {
  event.preventDefault();


  $.ajax({
    url: 'router/pet/' + $(this).attr('id'),
    type: 'DELETE',
    success: getPets
  });

}

function getStatus(){
  $.ajax({
    url: '/router/visits',
    type: 'GET',
    success: showStatus
  });
}

function showStatus(stata) {
  stata.forEach(function(statusObj){
    var text = "";
    var status = {};
    if(statusObj.check_in_date == null){
      text = "Check In";
      status.state = "in";
    } else if (statusObj.check_out_date == null) {
      text = "Check Out";
      status.state = "out";
    } else {
      text = "Check Out";
      status.state = "out";
    }

    $("#update"+statusObj.pets_id).data('status', status);

    $("#update"+statusObj.pets_id).html(text);
    console.log(text);
    console.log(statusObj.pets_id);
    console.log(statusObj.check_out_date);
    console.log(statusObj.check_in_date);
  });
}

function changeStatus(event) {
  event.preventDefault();

  $.ajax({
    url: 'router/visits/' + $(this).attr('id'),
    type: 'PUT',
    data: $(this).data('status');
    success: getStatus
  });
}
