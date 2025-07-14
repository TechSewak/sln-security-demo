// Button hover effect for all .cta-btn and .btn
document.querySelectorAll('.cta-btn, .btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => btn.style.opacity = 0.85);
  btn.addEventListener('mouseleave', () => btn.style.opacity = 1);
});

// Job Application Form Validation and LocalStorage
document.addEventListener('DOMContentLoaded', function () {
  // Form validation and localStorage for Apply page
  const form = document.getElementById('jobApplicationForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const phone = form.phone.value.trim();
      const resume = form.resume.files[0];
      const messageDiv = document.getElementById('formMessage');
      messageDiv.textContent = '';
      let valid = true;

      // Email regex
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !phone || !resume) {
        messageDiv.textContent = 'Please fill in all required fields.';
        messageDiv.style.color = 'red';
        valid = false;
      } else if (!emailPattern.test(email)) {
        messageDiv.textContent = 'Please enter a valid email address.';
        messageDiv.style.color = 'red';
        valid = false;
      }

      if (!valid) {
        e.preventDefault();
        return;
      }

      // Save to localStorage (excluding file for privacy)
      const formData = {
        name,
        email,
        phone,
        resumeName: resume ? resume.name : ''
      };
      let applications = [];
      try {
        applications = JSON.parse(localStorage.getItem('applications')) || [];
      } catch (e) {}
      applications.push(formData);
      localStorage.setItem('applications', JSON.stringify(applications));
      // Allow form to submit to Formspree
    });
  }

  // Populate applications table for Dashboard page
  const table = document.getElementById('applicationsTable');
  if (table) {
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = ''; // Clear existing rows

    let applications = [];
    try {
      applications = JSON.parse(localStorage.getItem('applications')) || [];
    } catch (e) {}

    if (applications.length === 0) {
      const row = document.createElement('tr');
      row.innerHTML = `<td colspan="3" class="text-center">No applications found.</td>`;
      tbody.appendChild(row);
      return;
    }

    applications.forEach((app, idx) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <th scope="row">${idx + 1}</th>
        <td>${app.name || ''}</td>
        <td>Pending</td>
      `;
      tbody.appendChild(row);
    });
  }
}); 