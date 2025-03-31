document.addEventListener('DOMContentLoaded', function() { 
    const form = document.getElementById('contact-form');
    const subjectSelect = document.getElementById('subject');
    const additionalFieldsContainer = document.getElementById('additional-fields');
    const additionalEmailsContainer = document.getElementById('additional-emails');
    const confirmationMessage = document.getElementById('confirmation-message');
    const addEmailButton = document.getElementById('add-email-button');

    let emailCount = 1; 

    addEmailButton.addEventListener('click', function() {
        emailCount++;
        const newEmailField = document.createElement('div');
        newEmailField.innerHTML = `
            <label for="email${emailCount}">Email ${emailCount}:</label>
            <input type="email" id="email${emailCount}" name="email${emailCount}" required>
        `;
        additionalEmailsContainer.appendChild(newEmailField);
    });

    subjectSelect.addEventListener('change', function() {
        const selectedSubject = subjectSelect.value;
        additionalFieldsContainer.innerHTML = ''; 

        if (selectedSubject === 'wsparcie') {
            additionalFieldsContainer.innerHTML = `
                <label for="issue-description">NIP</label>
                <textarea id="issue-description" name="issue-description" required></textarea>
            `;
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        let valid = true;
        let errorMessage = '';

        if (!name) {
            valid = false;
            errorMessage += 'Proszę podać imię.\n';
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email || !emailPattern.test(email)) {
            valid = false;
            errorMessage += 'Proszę podać poprawny adres email.\n';
        }

        for (let i = 2; i <= emailCount; i++) {
            const additionalEmail = document.getElementById(`email${i}`).value;
            if (additionalEmail && !emailPattern.test(additionalEmail)) {
                valid = false;
                errorMessage += `Proszę podać poprawny adres email ${i}.\n`;
            }
        }

        if (!subject) {
            valid = false;
            errorMessage += 'Proszę wybrać czy firma.\n';
        }

        if (subject === 'wsparcie') {
            const issueDescription = document.getElementById('issue-description').value;
            if (!issueDescription) {
                valid = false;
                errorMessage += 'Proszę podać NIP.\n';
            }
        }

        if (valid) {
          
            console.log('Dane formularza:');
            console.log('Imię:', name);
            console.log('Email:', email);
            

            for (let i = 2; i <= emailCount; i++) {
                const additionalEmail = document.getElementById(`email${i}`).value;
                if (additionalEmail) {
                    console.log(`Email ${i}:`, additionalEmail);
                }
            }

            if (subject === 'wsparcie') {
                const issueDescription = document.getElementById('issue-description').value;
                console.log('(NIP):', issueDescription);
            }

            confirmationMessage.style.display = 'block';
        } else {
            alert(errorMessage);
        }
    });
});
