
async function commentFormHandler(event) {
  event.preventDefault();

  const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
  const post_id = window.location.href.split('/')[window.location.href.split('/').length - 1]


  if (comment_text) {

    
  grecaptcha.ready( async function() {
    grecaptcha.execute('6LfGds4fAAAAAMkLeNvizoDylbBPZbYGLuBgOOS7', {action: 'submit'})
    .then( async function(token) {
      event.preventDefault();
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          token,
          post_id,
          comment_text
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        document.location.reload();
      } else {
        document.getElementById('commentError').innerText = 'Unable to send, please sign in and ensure comment is not empty.';
      }


    });
  });

  }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
