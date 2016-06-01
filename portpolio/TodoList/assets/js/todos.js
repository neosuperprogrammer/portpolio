/**
 * Created by neox on 4/4/16.
 */

$("ul").on("click", "li", function() {
  $(this).toggleClass("completed");
});

$("ul").on("click", "span", function(event) {
  event.stopPropagation();
  $(this).parent().fadeOut(function() {
    $(this).remove();
  });
});

$("input").keypress(function(event) {
  if (event.which === 13) {
    $("ul").append("<li><span><i class='fa fa-trash'></i></span>" + $(this).val() + "</li>");
    $(this).val("");
  }
});

$(".fa-plus").click(function() {
  $("input[type='text']").fadeToggle();
});