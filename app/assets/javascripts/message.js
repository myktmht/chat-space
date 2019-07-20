$(document).on('turbolinks:load', function() {

  function buildHTML(message) {
    var insertImage = '';
    if (message.image.url) {
      insertImage = `<img src="${message.image.url}">`;
    }
    var html = `
      <div class="chat" data-message-id="${message.id}">
        <p class"chat__user">${message.name}</p>
        <p class"chat__date">${message.date}</p>
        <p class"chat__content">${message.content}</p>
        ${insertImage}
      </div>`;
    return html  
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var message = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var chat = buildHTML(data);
      $('chat-wrapper').prepend(chat);
      $('.js-form__text-field').val('');
    })
    .fail(function(data) {
      alert('メッセージを入力してください');
    })
    .always(function(data) {
      alert('テストです');
    })
  })
});