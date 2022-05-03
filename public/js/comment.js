
async function commentFormHandler(event) {
  event.preventDefault();

  const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
  const post_id = window.location.href.split('/')[window.location.href.split('/').length - 1]


  if (comment_text) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
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
  }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
