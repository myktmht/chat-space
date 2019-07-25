$(document).on('turbolinks:load', function(){

  function bulidHTML(message) {
    var insertImage = message.image.url? `<image class="lower-message_image" src="${message.image.url}">`:"";
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
    var last_message_id = $('.chat').last().data('id');
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

  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/api\/messages/)){
      var last_message_id = $('.chat').last().data('id');
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {last_id: last_message_id}
    })

    .done(function(messages) {
      messages.forEach(function(message) {
        var insertHTML = bulidHTML(message)
        $('#message').append(insertHTML)
      });
        
      $('chat-wrapper').animate({
        scrollTop: $('.chat-weapper')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        console.log('自動更新に失敗しました')
      });
    }
  };
  setInterval(reloadMessages, 5000)
});