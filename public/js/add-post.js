async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const post_comment = document.querySelector('textarea[name="post-comment"]').value;

  if (title === "" || post_comment === "") {
    document.getElementById('createPostError').innerText = 'Please add title and/or comment.';
    return;
  }

  try {
    grecaptcha.ready( async function() {
      grecaptcha.execute('6LfGds4fAAAAAMkLeNvizoDylbBPZbYGLuBgOOS7', {action: 'submit'})
      .then( async function(token) {
        event.preventDefault();
        const response = await fetch(`/api/posts`, {
          method: 'POST',
          body: JSON.stringify({
            token,
            title,
            post_comment
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          response.json()
          .then(data => {
            document.getElementById('createPostError').innerText = data.message;
          })
        }

      });
    });


  } catch (error) {
    console.log(error)
    document.getElementById('createPostError').innerText = 'Please add title and/or comment.';
  }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
