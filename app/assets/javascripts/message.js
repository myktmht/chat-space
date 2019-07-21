$(document).on('turbolinks:load', function(){
  function bulidHTML(message) {
    var insertImage = '';
    if (message.image) {
      insertImage = `<img src="${message.image}">`;
    }
    var html =
      `<div class="chat" data-id="${message.id}">
        <p class="chat__user">${message.user_name}</p>
        <p class="chat__date">${message.date}</p>
        <p class="chat__content">${message.content}</p>
        ${insertImage}
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
    .done(function(chat) {
      var html = bulidHTML(chat);
      $('.chat-wrapper').append(html);
      $('.form.js-message')[0].reset();
    })
    .fail(function(chat) {
      alert('エラーが発生したためメッセージは送信できませんでした')
    })
    .always(function(chat) {
      $('.submit__btn').prop('disabled', false);
    })
    $(function scrollBottom() {
      var target = $('.chat').last();
      var position = target.offset().top + $('.chat-wrapper').scrollTop();
      $('.chat-wrapper').animate({
        scrollTop: position
      }, 300, 'swing');
    });
  })
});