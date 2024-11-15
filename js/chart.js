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
    if (Array.isArray(data) && data.length > 3) {
      const diagnosisHistory = data[3].diagnosis_history;

      
      const labels = diagnosisHistory.map(entry => `${entry.month} ${entry.year}`);
      const systolicData = diagnosisHistory.map(entry => entry.blood_pressure.systolic.value);
      const diastolicData = diagnosisHistory.map(entry => entry.blood_pressure.diastolic.value);
      const heartRateData = diagnosisHistory.map(entry => entry.heart_rate.value);
      const respiratoryRateData = diagnosisHistory.map(entry => entry.respiratory_rate.value);
      const temperatureData = diagnosisHistory.map(entry => entry.temperature.value);

      const ctx = document.getElementById('diagnosisChart').getContext('2d');

      
      const diagnosisChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Systolic Blood Pressure',
              data: systolicData,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: false
            },
            {
              label: 'Diastolic Blood Pressure',
              data: diastolicData,
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              fill: false
            },
            {
              label: 'Heart Rate',
              data: heartRateData,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: false
            },
            {
              label: 'Respiratory Rate',
              data: respiratoryRateData,
              borderColor: 'rgba(153, 102, 255, 1)',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              fill: false
            },
            {
              label: 'Temperature',
              data: temperatureData,
              borderColor: 'rgba(255, 206, 86, 1)',
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Month'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Value'
              }
            }
          }
        }
      });
    } else {
      console.error('No data received.');
    }
  })
  .catch(error => console.error('error', error));
