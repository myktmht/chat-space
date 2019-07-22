$(document).on('turbolinks:load', function() {
  $('#chatments').on('keyup', function() {
    ajaxsearch();
  });

  $('.chat-group-form__field--right').on('click','.chat-group-user__add', function() {
    var user = $(this).parent();
    addIdName(user);
  });

  $('.chat-group-form__field--right').on('click','.chat-group-user__remove', function() {
    var user = $(this).parent();
    user.remove();
  });
});


function buildHTML(user) {
  var html = `<li class="addinglist" data-id"${ user.id }" data-name"${ user.name }">${ user.name }
             <div class="chat-group-user__add">追加</div></li>`;
  return html;           
}

  function ajaxsearch() {
    var word = $("#chatments").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { search: word },
      dataType: 'json'
    })
    .done(function(data) {
      $(".addinglist").remove();
      if (word.length !== 0) {
        $.each(data.users, function(i, user) {
          var list = buildHTML(user);
          $("#searchresult").append(list);
        });
      }
    })
    .fail(function() {
      alert('一致するユーザーがいません');
    });
    return false;
  }