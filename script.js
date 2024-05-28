var myHeaders = new Headers();
myHeaders.append("Authorization", "Basic Y29hbGl0aW9uOnNraWxscy10ZXN0");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://fedskillstest.coalitiontechnologies.workers.dev", requestOptions)
  .then(response => response.json())
  .then(data => {
    const profilePicture = document.getElementById('profile-picture');
    const name = document.getElementById('name');
    const dob = document.getElementById('dob');
    const gender = document.getElementById('gender');
    const contact = document.getElementById('contact');
    const emergency = document.getElementById('emergency');
    const insurance = document.getElementById('insurance');
    const lab = document.getElementById('lab');
    const diagnosticListElement = document.getElementById('diagnostic_list');

    if (Array.isArray(data) && data.length > 3) {
        const patientData = data[3];
        
        profilePicture.src = patientData.profile_picture;
        name.textContent = patientData.name;
        dob.textContent = patientData.date_of_birth;
        gender.textContent = patientData.gender;
        contact.textContent = patientData.phone_number;
        emergency.textContent = patientData.emergency_contact;
        insurance.textContent = patientData.insurance_type;
        
        
        diagnosticListElement.innerHTML = '';
        
        patientData.diagnostic_list.forEach(diagnostic => {
            const row = document.createElement('tr');
            
            const nameCell = document.createElement('td');
            nameCell.textContent = diagnostic.name;
            row.appendChild(nameCell);
            
            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = diagnostic.description;
            row.appendChild(descriptionCell);
            
            const statusCell = document.createElement('td');
            statusCell.textContent = diagnostic.status;
            row.appendChild(statusCell);
            
            diagnosticListElement.appendChild(row);
        });


        
        lab.innerHTML = '';

        
        patientData.lab_results.forEach(result => {
            const row = document.createElement('tr');
        
            const dataCell = document.createElement('td');
            dataCell.style.width="80%";
            dataCell.textContent = result;
        
            const iconCell = document.createElement('td');
            const iconImg = document.createElement('img');
            iconImg.src = 'img/download_FILL0_wght300_GRAD0_opsz24.svg';
            iconCell.appendChild(iconImg);
        
            row.appendChild(dataCell);
            row.appendChild(iconCell);
        
            lab.appendChild(row);
        });
        

        
    } else {
      console.error('No data received.');
    }
  })
  .catch(error => console.error('error', error));
