$( document ).ready( () => {
    console.log('jqery')
    const password = $('input[name="password"]').val()
    const passwordComp = $('input[name="confirmPassword"]').val()
    const signupButton = $('#signup')
    const equalPasswords = () => {
        if(password === passwordComp) { 
            signupButton.prop( "disabled", false);
        } else { 
            signupButton.prop( "disabled", true);
            $('body').append(`<p>Passwords Don't match, try again</p>`)
        }
    }
    $('body').on('click', equalPasswords)
});
