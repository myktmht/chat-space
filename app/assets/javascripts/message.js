$(document).on('turbolinks:load', function(){
  function bulidHTML(message) {
    //var insertImage = '';
    //if (message.image) {
      //insertImage = `<img src="${message.image}">`;
    //}
    var html =
      `<div class="chat" data-id="${message.id}">
        <p class="chat__user">${message.user_name}</p>
        <p class="chat__date">${message.date}</p>
        <p class="chat__content">${message.content}</p>
      </div>`
    return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var message = new FormData($(this).get(0));
    var url = window.location.pathname;
    $.ajax({
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      console.log(data)
      var html = bulidHTML(data);
      $('.chat-wrapper').append(html);
      $('.js-form__text-field').val('');
    })
  })
});