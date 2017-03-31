$(function(){

    var $msgInput      = $('#messageInput');
    var $errorMsg      = $('#errorMsg');
    var $nextButton    = $('#nextButton');
    var $name          = $('#name');
    var $email         = $('#email');
    var $message       = $('#message');
    var mailFromInput;
    var nameFromInput;
    var messageFromInput;

    $nextButton.on('click', function(e) {
        e.preventDefault();
        var $this = $(this);

        function sendEmail() {

            var newDataToSend = {
                name:    nameFromInput,
                email:   mailFromInput,
                message: messageFromInput,
            };

            $.ajax({
                url:  'mailer.php',                                //Configuration in mailer.php file
                type: 'POST',
                data: JSON.stringify( newDataToSend )

            }).done(function ( response ) {
                console.log('Message sent');
                console.log(response);

            }).fail(function ( error ) {
                console.log('Sorry, please try again');
                console.log( error );
            });
        }

        //Second step, check mail and assign to variable: mailFromInput
        if ( $this.data('clicked') == 1 ) {
            mailFromInput = $msgInput.val();                       //Save data from input to mailFromInput
            $msgInput.val('');                                     //Clear input
            $email.text('e-mail: ' + mailFromInput);               //Printe e-mail
            $msgInput.attr('placeholder', 'Whats your message?');  //Change placeholder
            $this.data('clicked', 2);                              //Set up data 'clicked' = 2
        }

        //Last step, retrieve the message and assign to the variable: messageFromInput and send email
        else if ( $this.data('clicked') == 2 ){
            messageFromInput = $msgInput.val();
            $msgInput.hide();
            $nextButton.hide();
            $message.text('Message: ' + messageFromInput);
            $errorMsg.text('WebsiteName, Thank you ' + nameFromInput + ' for your message.');
            sendEmail();
        }

        // First step, name verification and assign to the variable: nameFromInput
        else {
            if ( $msgInput.val().length >= 3 ) {
                nameFromInput = $msgInput.val();
                $errorMsg.text('');
                $msgInput.val('');
                $name.text('Name: ' + nameFromInput);
                $msgInput.attr('placeholder', 'Whats your email?');
                $this.data('clicked', 1);

            }else{
                $errorMsg.text('Please enter the correct name');
            }
        }
    });
});