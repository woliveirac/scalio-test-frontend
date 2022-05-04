$(document).ready(function () {
  $("#send").on("click", function () {
    let field = $("#post_id");
    let postId = field.val();

    if (!postId) {
      $(".feedback").html("Please fill the field.");
      return false;
    }

    $(this).attr("disabled", "disabled");

    $.ajax("https://scalio-willian-correa-test.herokuapp.com" + "/posts/" + postId, { method: "GET" })
      .done(function (data) {
        if (!data.title || !data.body) {
          $(".feedback").html("Post lacking either a title or body.");
          $("#send").removeAttr("disabled");
          return false;
        }

        $(".home").hide();
        $(".details").show();

        $(".title").html(data.title);
        $(".body").html(data.body);
      })
      .fail(function (data) {
        $(".feedback").html("Post not found.");
        $("#send").removeAttr("disabled");
      });
  });

  $("#back").on("click", function () {
    $(".details").hide();
    $(".title").html("");
    $(".body").html("");
    $(".feedback").html("");
    $("#send").removeAttr("disabled");
    $(".home").show();
  });
});
