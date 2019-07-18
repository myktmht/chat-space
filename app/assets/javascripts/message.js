$(document).on('turbolinks:load', function() {
  $('#new_form').on('submit', function(e) {
    e.preventDefault();
    var message = new FormData(this);
    $.ajax({
        type: 'POST',
        url: '/messages',
        data: FormData,
        processData: false,
        contenttype: false,
        dataType: 'json'
    })
  })
});