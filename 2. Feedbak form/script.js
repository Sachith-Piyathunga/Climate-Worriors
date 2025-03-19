// JavaScript code for form validation, preview, and confirmation

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-feedback', (req, res) => {
  const { name, email, visit, satisfaction, recommend, updates, message } = req.body;

  // Create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sachintha.20221948@iit.ac.lk', 
      pass: '#' 
    }
  });

  // Setup email data
  const mailOptions = {
    from: 'sachintha.20221948@iit.ac.lk',
    to: 'sachipiya845@gmail.com',
    subject: 'New Feedback Submission',
    text: `Name: ${name}\nEmail: ${email}\nVisit: ${visit}\nSatisfaction: ${satisfaction}\nRecommend: ${recommend}\nUpdates: ${updates}\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending feedback');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Feedback submitted successfully');
    }
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));


// client side part
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            submitForm();
        }
    });

    function validateForm() {
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const visit = form.querySelector('#visit').value;
        const satisfaction = form.querySelector('#satisfaction').value;
        const recommend = form.querySelector('#recommend').value;
        const updates = form.querySelector('#updates').value;
        const message = form.querySelector('#message').value.trim();

        if (name === '') {
            alert('Please enter your name.');
            return false;
        }

        if (email === '') {
            alert('Please enter your email.');
            return false;
        } else if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        if (visit === '') {
            alert('Please select whether this was your first time visiting.');
            return false;
        }

        if (satisfaction === '') {
            alert('Please rate your satisfaction (1-10).');
            return false;
        }

        if (recommend === '') {
            alert('Please select whether you would recommend our service.');
            return false;
        }

        if (updates === '') {
            alert('Please select whether you would like to receive updates and offers.');
            return false;
        }

        if (message === '') {
            alert('Please leave your message.');
            return false;
        }

        return true;
    }

    function submitForm() {
        const formData = new FormData(form);
        fetch('/submit-feedback', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            alert(data); // Show the response message to the user
            form.reset(); // Reset the form after submission
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
    }

    function isValidEmail(email) {
        // Regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
