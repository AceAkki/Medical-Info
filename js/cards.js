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

      const lastMonthHeartRate = diagnosisHistory[diagnosisHistory.length - 1].heart_rate.value;
      const lastMonthHeartLevels = diagnosisHistory[diagnosisHistory.length - 1].heart_rate.levels;
      const lastMonthRespiratoryRate = diagnosisHistory[diagnosisHistory.length - 1].respiratory_rate.value;
      const lastMonthRespiratoryLevels = diagnosisHistory[diagnosisHistory.length - 1].respiratory_rate.levels;
      const lastMonthTemptRate = diagnosisHistory[diagnosisHistory.length - 1].temperature.value;
      const lastMonthTemptLevels = diagnosisHistory[diagnosisHistory.length - 1].temperature.levels;


      
      const heartRate = document.getElementById('HeartRate');
      const heartLevels = document.getElementById('HeartLevels');
      const respiratoryRate = document.getElementById('RespiratoryRate');
      const respiratoryLevels = document.getElementById('RespiratoryLevels');
      const temptRate = document.getElementById('TemptRate');
      const temptLevels = document.getElementById('TemptLevels');
  
      
      heartRate.textContent = lastMonthHeartRate;      
      heartLevels.textContent = lastMonthHeartLevels;
      respiratoryRate.textContent = lastMonthRespiratoryRate;      
      respiratoryLevels.textContent = lastMonthRespiratoryLevels;
      temptRate.textContent = lastMonthTemptRate;      
      temptLevels.textContent = lastMonthTemptLevels;
     


} else {
      console.error('No data received.');
    }
  })
  .catch(error => console.error('error', error));
