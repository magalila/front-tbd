document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('.button.is-primary'); 
    const loginForm = document.createElement('div'); 
    loginForm.innerHTML = `
        <div id="loginForm" class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-content box">
                <button class="delete is-pulled-right" id="closeButton"></button>
                <form>
                    <div class="field">
                        <label class="label">User</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="User">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input class="input" type="password" placeholder="Password">
                        </div>
                    </div>
                    <div class="field">
                        <div class="control has-text-centered">
                            <button class="button is-primary">Sign in</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;
    loginButton.addEventListener('click', function() {
        document.body.appendChild(loginForm); 
        const closeButton = document.getElementById('closeButton');
        closeButton.addEventListener('click', function() {
            document.body.removeChild(loginForm); 
        });
    });
});
