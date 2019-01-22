<script>
	$(document).ready(function() {

		$('#post').bind('keyup', function() {

			let post = $(this).val();

			let wordsCounter = post.length === 0 ? [] : post.split(' ').length;

			let numOfWords = wordsCounter.length === 0 ? 0 : wordsCounter;

			console.log(post.length);

			
				if(post.length == 0){
				$("#publish").attr("disabled", "disabled");
				}
			
			$('#counter').html(numOfWords);
			if (wordsCounter > 100) {
				$("#publish").attr("disabled", "disabled");

				$("#post").parent().addClass('has-error');

				$('#counter').addClass('text-danger').css('font-weight', 'bolder');



			} else {
				$("button[type=submit]").removeAttr("disabled", "disabled");

				$("#post").parent().removeClass('has-error');

				$('#counter').removeClass('text-danger');

			}

		});
	});

</script>
