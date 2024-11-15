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
    const menuItemsContainer = document.getElementById('menuItemsContainer');

    
    const table = document.createElement('table');

    
    data.forEach(patient => {
      
      const row = document.createElement('tr');

      
      const imgCell = document.createElement('td');
      const img = document.createElement('img');
      img.src = patient.profile_picture;
      img.style.width = "50px";
      img.style.height = "50px";
      imgCell.appendChild(img);

      
      const textCell = document.createElement('td');
      const p = document.createElement('p');
      p.style.fontSize = "14px";
      p.style.fontWeight = "normal";
      p.style.paddingRight = "20px";
      p.style.textAlign = "left";
      p.style.marginLeft = "20px"
      p.style.verticalAlign = "bottom";
      p.innerHTML = `<b style="color:#000">${patient.name}</b> <br>  ${patient.gender} , ${patient.age} `;
      textCell.appendChild(p);

      
      const moreCell = document.createElement('td');
      const moreImg = document.createElement('img');
      moreImg.src = "img/more_horiz_FILL0_wght300_GRAD0_opsz24.svg";
      moreImg.alt = "More";
      moreCell.appendChild(moreImg);

      
      row.appendChild(imgCell);
      row.appendChild(textCell);
      row.appendChild(moreCell);

      
      table.appendChild(row);
      
    });

  
    menuItemsContainer.appendChild(table);
  });
