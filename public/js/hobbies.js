$( document ).ready( () => {
    console.log('jqery')
    const hobbie = $('')
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
