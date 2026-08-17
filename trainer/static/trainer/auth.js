document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const bottom_msg = document.querySelector('.bottom-msg');
  const bottom_p = bottom_msg.querySelector('p');
  const bottom_a = bottom_msg.querySelector('a');
  const submit_btn = form.querySelector('.btn')

  submit_btn.onclick = (event) => {
    const confirm_input = document.querySelector('#password_confirm');
    const password = document.querySelector('#password;');
    if ((confirm_input) && (password !== confirm_input)) {
      // TODO: Throw some error
      event.preventDefault()
    }
  }

  bottom_a.onclick = (event) => {
    event.preventDefault();

    if (!document.querySelector('#password-confirm')) {
      const confirm = document.querySelector('#password').cloneNode(true)
      const confirm_input = confirm.querySelector('input');
      confirm_input.name = 'password-confirm';
      confirm_input.placeholder = 'Confirmar senha';
      confirm.id = 'password-confirm';
      bottom_p.innerHTML = 'Já tem uma conta?';
      bottom_a.innerHTML = 'Login';
      submit_btn.value = 'Registrar';
      confirm.classList.add('appear');
      submit_btn.before(confirm);

    } else {
      console.log("EXISTE")
      const confirm = document.querySelector('#password-confirm');
      confirm.classList.remove('appear');
      confirm.classList.add('hide');

      confirm.onanimationend = () => {
        confirm.remove();
      }
      bottom_p.innerHTML = 'Sem conta?';
      bottom_a.innerHTML = 'Registre-se';
      submit_btn.value = 'Login';
    };
  };
});
