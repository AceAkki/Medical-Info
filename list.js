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
    const diagnosisTableBody = document.querySelector(".table tbody");

    
    if (Array.isArray(data) && data.length > 3) {
      const patientData = data[3];

      
      if (patientData.diagnostic_list && Array.isArray(patientData.diagnostic_list)) {
        patientData.diagnostic_list.forEach((diagnosis) => {
          const row = diagnosisTableBody.insertRow();

          const problemCell = row.insertCell(0); 
          const descriptionCell = row.insertCell(1); 
          const statusCell = row.insertCell(2); 

          problemCell.textContent = diagnosis.name;
          descriptionCell.textContent = diagnosis.description;
          statusCell.textContent = diagnosis.status;
        });
      } else {
        console.error('Diagnostic list not found in patient data or not an array.');
      }
    } else {
      console.error('Patient data not found in data array or does not have enough elements.');
    }
  })
  .catch(error => console.error('Error fetching data:', error));
