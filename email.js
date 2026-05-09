// EmailJS configuration
(function () {
    emailjs.init("pTP6zWYYpK4UjRN7G");
})();

// Form submission handler
document.querySelector('.contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form data
    const name = document.querySelector('input[name="from_name"]').value;
    const email = document.querySelector('input[name="from_email"]').value;
    const subject = document.querySelector('select[name="subject"]').value;
    const message = document.querySelector('textarea[name="message"]').value;
    console.log(name, email);

    // Prepare template parameters
    const templateParams = {
        name,
        email,
        subject: subject,
        message: message,
        time: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
    };

    // Send email using EmailJS
    emailjs.send("service_l1tqrun", "template_ewdqy1c", templateParams)
        .then(function () {
            alert('Mensagem enviada com sucesso!');
        }, function (error) {
            console.error('Erro ao enviar mensagem:', error);
            alert('Erro ao enviar mensagem. Tente novamente.');
        });
});