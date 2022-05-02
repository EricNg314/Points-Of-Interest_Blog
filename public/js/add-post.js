async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const post_comment = document.querySelector('textarea[name="post-comment"]').value;

  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      post_comment
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    document.getElementById('createPostError').innerText = 'Please add title and/or comment.';
  }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
