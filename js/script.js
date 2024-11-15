var myHeaders = new Headers();
myHeaders.append("Authorization", "Basic Y29hbGl0aW9uOnNraWxscy10ZXN0");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch("https://fedskillstest.coalitiontechnologies.workers.dev", requestOptions)
  .then((response) => response.json())
  .then((data) => {
    // Patients List
    const menuItemsContainer = document.getElementById("menuItemsContainer");

    const table = document.createElement("table");

    data.forEach((patient) => {
      const row = document.createElement("tr");

      const imgCell = document.createElement("td");
      const img = document.createElement("img");
      img.src = patient.profile_picture;
      img.style.width = "50px";
      img.style.height = "50px";
      imgCell.appendChild(img);

      const textCell = document.createElement("td");
      const p = document.createElement("p");
      p.style.fontSize = "14px";
      p.style.fontWeight = "normal";
      p.style.paddingRight = "20px";
      p.style.textAlign = "left";
      p.style.marginLeft = "20px";
      p.style.verticalAlign = "bottom";
      p.innerHTML = `<b style="color:#000">${patient.name}</b> <br>  ${patient.gender} , ${patient.age} `;
      textCell.appendChild(p);

      const moreCell = document.createElement("td");
      const moreImg = document.createElement("img");
      moreImg.src = "img/more_horiz_FILL0_wght300_GRAD0_opsz24.svg";
      moreImg.alt = "More";
      moreCell.appendChild(moreImg);

      row.appendChild(imgCell);
      row.appendChild(textCell);
      row.appendChild(moreCell);

      table.appendChild(row);
    });

    menuItemsContainer.appendChild(table);


    console.log(data.length);
    console.log(data);

    const patientTable = menuItemsContainer.children; 
    console.log(patientTable);

    for (let i = 0; i < patientTable.length; i++) {
      var patientTableTwo = patientTable[i];
      console.log(patientTableTwo.children); 
    }

    const patients = patientTableTwo.children;
    const array = Array.from(patients);
    console.log(array);

    function dummyDataIndex(index) {
      if (index >= 0 && index < data.length) {
        return data[index]; 
      } else {
        console.log("Index out of bounds");
        return null; 
      }
    }

    let selectPatient;
    let patientData = data[0];

    array.forEach((element, index) => {
      element.addEventListener('click', function () { 
        selectPatient = dummyDataIndex(index);
        patientData = selectPatient;
        console.log(selectPatient);
        profileData();
     //   diagnosisTable();
       // diagnosisHistory();
       // diagnosisChart();
      })
    });

    const showAll = document.getElementById('showAll');
    //console.log(showAll);
    showAll.addEventListener('click', function () {
      diagnosisTable();
      diagnosisHistory();
      diagnosisChart();
    })

  

    // Patients List End

    // Profile Data
    const profilePicture = document.getElementById("profile-picture");
    const name = document.getElementById("name");
    const dob = document.getElementById("dob");
    const gender = document.getElementById("gender");
    const contact = document.getElementById("contact");
    const emergency = document.getElementById("emergency");
    const insurance = document.getElementById("insurance");

    const lab = document.getElementById("lab");
    const diagnosticListElement = document.getElementById("diagnostic_list");

    if (Array.isArray(data)) {
      console.log(patientData);

      function profileData () {
      profilePicture.src = patientData.profile_picture;
      name.textContent = patientData.name;
      dob.textContent = patientData.date_of_birth;
      gender.textContent = patientData.gender;
      contact.textContent = patientData.phone_number;
      emergency.textContent = patientData.emergency_contact;
      insurance.textContent = patientData.insurance_type;

      }


      function diagnosticList () {
      diagnosticListElement.innerHTML = "";

      patientData.diagnostic_list.forEach((diagnostic) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = diagnostic.name;
        row.appendChild(nameCell);

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = diagnostic.description;
        row.appendChild(descriptionCell);

        const statusCell = document.createElement("td");
        statusCell.textContent = diagnostic.status;
        row.appendChild(statusCell);

        diagnosticListElement.appendChild(row);
      });
    }


      function labResults () {
      lab.innerHTML = "";

      patientData.lab_results.forEach((result) => {
        const row = document.createElement("tr");

        const dataCell = document.createElement("td");
        dataCell.style.width = "80%";
        dataCell.textContent = result;

        const iconCell = document.createElement("td");
        const iconImg = document.createElement("img");
        iconImg.src = "img/download_FILL0_wght300_GRAD0_opsz24.svg";
        iconCell.appendChild(iconImg);

        row.appendChild(dataCell);
        row.appendChild(iconCell);

        lab.appendChild(row);
      });
      }

    
      // Profile Data Ends

      // Diagnosis Table

      function diagnosisTable () {
      const diagnosisTableBody = document.querySelector(".table tbody");

      if (Array.isArray(data)) {
        

        if (
          patientData.diagnostic_list &&
          Array.isArray(patientData.diagnostic_list)
        ) {
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
          console.error(
            "Diagnostic list not found in patient data or not an array."
          );
        }
      } else {
        console.error(
          "Patient data not found in data array or does not have enough elements."
        );
      }
      }

      // Diagnosis Table End

      // Diagnosis Chart

      let chartInstance;

      function diagnosisChart () {
      if (Array.isArray(data)) {
        const diagnosisHistory = patientData.diagnosis_history;

        const labels = diagnosisHistory.map(
          (entry) => `${entry.month} ${entry.year}`
        );
        const systolicData = diagnosisHistory.map(
          (entry) => entry.blood_pressure.systolic.value
        );
        const diastolicData = diagnosisHistory.map(
          (entry) => entry.blood_pressure.diastolic.value
        );
        const heartRateData = diagnosisHistory.map(
          (entry) => entry.heart_rate.value
        );
        const respiratoryRateData = diagnosisHistory.map(
          (entry) => entry.respiratory_rate.value
        );
        const temperatureData = diagnosisHistory.map(
          (entry) => entry.temperature.value
        );

        const ctx = document.getElementById("diagnosisChart").getContext("2d");

        if (chartInstance) {
          chartInstance.destroy();
        }
        chartInstance = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Systolic Blood Pressure",
                data: systolicData,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                fill: false,
              },
              {
                label: "Diastolic Blood Pressure",
                data: diastolicData,
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                fill: false,
              },
              {
                label: "Heart Rate",
                data: heartRateData,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: false,
              },
              {
                label: "Respiratory Rate",
                data: respiratoryRateData,
                borderColor: "rgba(153, 102, 255, 1)",
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                fill: false,
              },
              {
                label: "Temperature",
                data: temperatureData,
                borderColor: "rgba(255, 206, 86, 1)",
                backgroundColor: "rgba(255, 206, 86, 0.2)",
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: "Month",
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: "Value",
                },
              },
            },
          },
        });
        
      } else {
        console.error("No data received.");
      }
      }

      // Diagnosis Chart End

      // Diagnosis History Levels
      function diagnosisHistory () {
      if (Array.isArray(data)) {
        const diagnosisHistory = patientData.diagnosis_history;

        const lastMonthHeartRate =
          diagnosisHistory[diagnosisHistory.length - 1].heart_rate.value;
        const lastMonthHeartLevels =
          diagnosisHistory[diagnosisHistory.length - 1].heart_rate.levels;
        const lastMonthRespiratoryRate =
          diagnosisHistory[diagnosisHistory.length - 1].respiratory_rate.value;
        const lastMonthRespiratoryLevels =
          diagnosisHistory[diagnosisHistory.length - 1].respiratory_rate.levels;
        const lastMonthTemptRate =
          diagnosisHistory[diagnosisHistory.length - 1].temperature.value;
        const lastMonthTemptLevels =
          diagnosisHistory[diagnosisHistory.length - 1].temperature.levels;

        const heartRate = document.getElementById("HeartRate");
        const heartLevels = document.getElementById("HeartLevels");
        const respiratoryRate = document.getElementById("RespiratoryRate");
        const respiratoryLevels = document.getElementById("RespiratoryLevels");
        const temptRate = document.getElementById("TemptRate");
        const temptLevels = document.getElementById("TemptLevels");

        heartRate.textContent = lastMonthHeartRate;
        heartLevels.textContent = lastMonthHeartLevels;
        respiratoryRate.textContent = lastMonthRespiratoryRate;
        respiratoryLevels.textContent = lastMonthRespiratoryLevels;
        temptRate.textContent = lastMonthTemptRate;
        temptLevels.textContent = lastMonthTemptLevels;
      } else {
        console.error("No data received.");
      }
      }


    } else {
      console.error("No data received.");
    }

    // Diagnosis History Levels
  })
  .catch((error) => console.error("error", error));
