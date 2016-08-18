$(document).ready(function () {
  getAnimals();

  $('#animal-submit').on('click', postAnimal);

});

function getAnimals() {
  $.ajax({
    type: 'GET',
    url: '/animals',
    success: function (animals) {
      console.log('GET /animals returns:', animals);
      appendAnimals(animals);
    },

    error: function (response) {
      console.log('GET /animals fail.');
    },
  });
}

function appendAnimals (animals) {
  animals.forEach(function (animal) {
    var $el = $('<div></div>');
    var animalProperties = ['type_animal', 'num_animal'];
    animalProperties.forEach(function (property){
      var inputType = 'text';
      var $input = $('<input type="text" id="' + property + '"name="' + property + '" />');
      $input.val(animal[property]);
      $el.append($input);
    })

    // $el.data('animalId', animal.id)
    // $el.append('<button class="update">Update</button>');
    // $el.append('<button class="delete">Delete</button>');

    $('#animal-list').append($el);
  });
}
function postAnimal() {
  event.preventDefault();

  var animal = {};

  $.each($('#animal-form').serializeArray(), function (i, field) {
    animal[field.name] = field.value;
  });
  console.log(animal);
  $.ajax({
    type: 'POST',
    url: '/animals',
    data: animal,
    success: function () {
      console.log('POST /animals works!');
      $('#animal-list').empty();
      getAnimals();
    },

    error: function (response) {
      console.log('POST /animals does not work...');
    },
  });
}
