// 检测用户所在CDN节点
$(document).ready(function() {
  $.ajax({
    url: "/cdn-cgi/trace",
    success: function(data, status) {
      let areas = [
        '{"s":"TNR","l":"Antananarivo, Madagascar"}',
        '{"s":"CPT","l":"Cape Town, South Africa"}',
        '{"s":"CMN","l":"Casablanca, Morocco"}',
        '{"s":"DAR","l":"Dar Es Salaam, Tanzania"}',
        '{"s":"JIB","l":"Djibouti City, Djibouti"}',
        '{"s":"DUR","l":"Durban, South Africa"}',
        '{"s":"JNB","l":"Johannesburg, South Africa"}',
        '{"s":"KGL","l":"Kigali, Rwanda"}',
        '{"s":"LOS","l":"Lagos, Nigeria"}',
        '{"s":"LAD","l":"Luanda, Angola"}',
        '{"s":"MPM","l":"Maputo, MZ"}',
        '{"s":"MBA","l":"Mombasa, Kenya"}',
        '{"s":"MRU","l":"Port Louis, Mauritius"}',
        '{"s":"RUN","l":"Réunion, France"}',
        '{"s":"BLR","l":"Bangalore, India"}',
        '{"s":"BKK","l":"Bangkok, Thailand"}',
        '{"s":"BWN","l":"Bandar Seri Begawan, Brunei"}',
        '{"s":"CEB","l":"Cebu, Philippines"}',
        '{"s":"CTU","l":"成都, 🇨🇳 中国大陆"}',
        '{"s":"MAA","l":"Chennai, India"}',
        '{"s":"CGP","l":"Chittagong, Bangladesh"}',
        '{"s":"CKG","l":"重庆, 🇨🇳 中国大陆"}',
        '{"s":"CMB","l":"Colombo, Sri Lanka"}',
        '{"s":"DAC","l":"Dhaka, Bangladesh"}',
        '{"s":"SZX","l":"东莞, 🇨🇳 中国大陆"}',
        '{"s":"FUO","l":"佛山, 🇨🇳 中国大陆"}',
        '{"s":"FOC","l":"福州, 🇨🇳 中国大陆"}',
        '{"s":"CAN","l":"广州, 🇨🇳 中国大陆"}',
        '{"s":"HGH","l":"杭州, 🇨🇳 中国大陆"}',
        '{"s":"HAN","l":"Hanoi, Vietnam"}',
        '{"s":"HNY","l":"衡阳, 🇨🇳 中国大陆"}',
        '{"s":"SGN","l":"Ho Chi Minh City, Vietnam"}',
        '{"s":"HKG","l":"🇭🇰 香港"}',
        '{"s":"HYD","l":"Hyderabad, India"}',
        '{"s":"ISB","l":"Islamabad, Pakistan"}',
        '{"s":"CGK","l":"Jakarta, Indonesia"}',
        '{"s":"TNA","l":"济南, 🇨🇳 中国大陆"}',
        '{"s":"KHI","l":"Karachi, Pakistan"}',
        '{"s":"KTM","l":"Kathmandu, Nepal"}',
        '{"s":"CCU","l":"Kolkata, India"}',
        '{"s":"KUL","l":"Kuala Lumpur, Malaysia"}',
        '{"s":"LHE","l":"Lahore, Pakistan"}',
        '{"s":"NAY","l":"廊坊, 🇨🇳 中国大陆"}',
        '{"s":"LYA","l":"洛阳, 🇨🇳 中国大陆"}',
        '{"s":"MFM","l":"🇲🇴 澳门"}',
        '{"s":"MLE","l":"Malé, Maldives"}',
        '{"s":"MNL","l":"Manila, Philippines"}',
        '{"s":"BOM","l":"Mumbai, India"}',
        '{"s":"NAG","l":"Nagpur, India"}',
        '{"s":"NNG","l":"南宁, 🇨🇳 中国大陆"}',
        '{"s":"DEL","l":"New Delhi, India"}',
        '{"s":"KIX","l":"Osaka, Japan"}',
        '{"s":"PNH","l":"Phnom Penh, Cambodia"}',
        '{"s":"TAO","l":"青岛, 🇨🇳 中国大陆"}',
        '{"s":"ICN","l":"Seoul, South Korea"}',
        '{"s":"SHA","l":"上海, 🇨🇳 中国大陆"}',
        '{"s":"SHE","l":"沈阳, 🇨🇳 中国大陆"}',
        '{"s":"SJW","l":"石家庄, 🇨🇳 中国大陆"}',
        '{"s":"SIN","l":"Singapore, Singapore"}',
        '{"s":"SZV","l":"苏州, 🇨🇳 中国大陆"}',
        '{"s":"TPE","l":"台北, 🇨🇳 台湾"}',
        '{"s":"PBH","l":"Thimphu, Bhutan"}',
        '{"s":"TSN","l":"天津, 🇨🇳 中国大陆"}',
        '{"s":"NRT","l":"Tokyo, Japan"}',
        '{"s":"ULN","l":"Ulaanbaatar, Mongolia"}',
        '{"s":"VTE","l":"Vientiane, Laos"}',
        '{"s":"WUH","l":"武汉, 🇨🇳 中国大陆"}',
        '{"s":"WUX","l":"无锡, 🇨🇳 中国大陆"}',
        '{"s":"XIY","l":"西安, 🇨🇳 中国大陆"}',
        '{"s":"EVN","l":"Yerevan, Armenia"}',
        '{"s":"CGO","l":"郑州, 🇨🇳 中国大陆"}',
        '{"s":"CSX","l":"株洲, 🇨🇳 中国大陆"}',
        '{"s":"AMS","l":"Amsterdam, Netherlands"}',
        '{"s":"ATH","l":"Athens, Greece"}',
        '{"s":"BCN","l":"Barcelona, Spain"}',
        '{"s":"BEG","l":"Belgrade, Serbia"}',
        '{"s":"TXL","l":"Berlin, Germany"}',
        '{"s":"BRU","l":"Brussels, Belgium"}',
        '{"s":"OTP","l":"Bucharest, Romania"}',
        '{"s":"BUD","l":"Budapest, Hungary"}',
        '{"s":"KIV","l":"Chișinău, Moldova"}',
        '{"s":"CPH","l":"Copenhagen, Denmark"}',
        '{"s":"ORK","l":"Cork, Ireland"}',
        '{"s":"DUB","l":"Dublin, Ireland"}',
        '{"s":"DUS","l":"Düsseldorf, Germany"}',
        '{"s":"EDI","l":"Edinburgh, United Kingdom"}',
        '{"s":"FRA","l":"Frankfurt, Germany"}',
        '{"s":"GVA","l":"Geneva, Switzerland"}',
        '{"s":"GOT","l":"Gothenburg, Sweden"}',
        '{"s":"HAM","l":"Hamburg, Germany"}',
        '{"s":"HEL","l":"Helsinki, Finland"}',
        '{"s":"IST","l":"Istanbul, Turkey"}',
        '{"s":"KBP","l":"Kyiv, Ukraine"}',
        '{"s":"LIS","l":"Lisbon, Portugal"}',
        '{"s":"LHR","l":"London, United Kingdom"}',
        '{"s":"LUX","l":"Luxembourg City, Luxembourg"}',
        '{"s":"MAD","l":"Madrid, Spain"}',
        '{"s":"MAN","l":"Manchester, United Kingdom"}',
        '{"s":"MRS","l":"Marseille, France"}',
        '{"s":"MXP","l":"Milan, Italy"}',
        '{"s":"DME","l":"Moscow, Russia"}',
        '{"s":"MUC","l":"Munich, Germany"}',
        '{"s":"LCA","l":"Nicosia, Cyprus"}',
        '{"s":"OSL","l":"Oslo, Norway"}',
        '{"s":"CDG","l":"Paris, France"}',
        '{"s":"PRG","l":"Prague, Czech Republic"}',
        '{"s":"KEF","l":"Reykjavík, Iceland"}',
        '{"s":"RIX","l":"Riga, Latvia"}',
        '{"s":"FCO","l":"Rome, Italy"}',
        '{"s":"LED","l":"Saint Petersburg, Russia"}',
        '{"s":"SOF","l":"Sofia, Bulgaria"}',
        '{"s":"ARN","l":"Stockholm, Sweden"}',
        '{"s":"TLL","l":"Tallinn, Estonia"}',
        '{"s":"SKG","l":"Thessaloniki, Greece"}',
        '{"s":"VIE","l":"Vienna, Austria"}',
        '{"s":"VNO","l":"Vilnius, Lithuania"}',
        '{"s":"WAW","l":"Warsaw, Poland"}',
        '{"s":"ZAG","l":"Zagreb, Croatia"}',
        '{"s":"ZRH","l":"Zürich, Switzerland"}',
        '{"s":"ARI","l":"Arica, Chile"}',
        '{"s":"ASU","l":"Asunción, Paraguay"}',
        '{"s":"BOG","l":"Bogotá, Colombia"}',
        '{"s":"EZE","l":"Buenos Aires, Argentina"}',
        '{"s":"CWB","l":"Curitiba, Brazil"}',
        '{"s":"FOR","l":"Fortaleza, Brazil"}',
        '{"s":"GUA","l":"Guatemala City, Guatemala"}',
        '{"s":"LIM","l":"Lima, Peru"}',
        '{"s":"MDE","l":"Medellín, Colombia"}',
        '{"s":"PTY","l":"Panama City, Panama"}',
        '{"s":"POA","l":"Porto Alegre, Brazil"}',
        '{"s":"UIO","l":"Quito, Ecuador"}',
        '{"s":"GIG","l":"Rio de Janeiro, Brazil"}',
        '{"s":"GRU","l":"São Paulo, Brazil"}',
        '{"s":"SCL","l":"Santiago, Chile"}',
        '{"s":"CUR","l":"Willemstad, Curaçao"}',
        '{"s":"GND","l":"St. George's, Grenada"}',
        '{"s":"AMM","l":"Amman, Jordan"}',
        '{"s":"BGW","l":"Baghdad, Iraq"}',
        '{"s":"GYD","l":"Baku, Azerbaijan"}',
        '{"s":"BEY","l":"Beirut, Lebanon"}',
        '{"s":"DOH","l":"Doha, Qatar"}',
        '{"s":"DXB","l":"Dubai, United Arab Emirates"}',
        '{"s":"KWI","l":"Kuwait City, Kuwait"}',
        '{"s":"BAH","l":"Manama, Bahrain"}',
        '{"s":"MCT","l":"Muscat, Oman"}',
        '{"s":"ZDM","l":"Ramallah"}',
        '{"s":"RUH","l":"Riyadh, Saudi Arabia"}',
        '{"s":"TLV","l":"Tel Aviv, Israel"}',
        '{"s":"IAD","l":"Ashburn, VA, United States"}',
        '{"s":"ATL","l":"Atlanta, GA, United States"}',
        '{"s":"BOS","l":"Boston, MA, United States"}',
        '{"s":"BUF","l":"Buffalo, NY, United States"}',
        '{"s":"YYC","l":"Calgary, AB, Canada"}',
        '{"s":"CLT","l":"Charlotte, NC, United States"}',
        '{"s":"ORD","l":"Chicago, IL, United States"}',
        '{"s":"CMH","l":"Columbus, OH, United States"}',
        '{"s":"DFW","l":"Dallas, TX, United States"}',
        '{"s":"DEN","l":"Denver, CO, United States"}',
        '{"s":"DTW","l":"Detroit, MI, United States"}',
        '{"s":"HNL","l":"Honolulu, HI, United States"}',
        '{"s":"IAH","l":"Houston, TX, United States"}',
        '{"s":"IND","l":"Indianapolis, IN, United States"}',
        '{"s":"JAX","l":"Jacksonville, FL, United States"}',
        '{"s":"MCI","l":"Kansas City, MO, United States"}',
        '{"s":"LAS","l":"Las Vegas, NV, United States"}',
        '{"s":"LAX","l":"Los Angeles, CA, United States"}',
        '{"s":"MFE","l":"McAllen, TX, United States"}',
        '{"s":"MEM","l":"Memphis, TN, United States"}',
        '{"s":"MEX","l":"Mexico City, Mexico"}',
        '{"s":"MIA","l":"Miami, FL, United States"}',
        '{"s":"MSP","l":"Minneapolis, MN, United States"}',
        '{"s":"MGM","l":"Montgomery, AL, United States"}',
        '{"s":"YUL","l":"Montréal, QC, Canada"}',
        '{"s":"BNA","l":"Nashville, TN, United States"}',
        '{"s":"EWR","l":"Newark, NJ, United States"}',
        '{"s":"ORF","l":"Norfolk, VA, United States"}',
        '{"s":"OMA","l":"Omaha, NE, United States"}',
        '{"s":"PHL","l":"Philadelphia, United States"}',
        '{"s":"PHX","l":"Phoenix, AZ, United States"}',
        '{"s":"PIT","l":"Pittsburgh, PA, United States"}',
        '{"s":"PAP","l":"Port-Au-Prince, Haiti"}',
        '{"s":"PDX","l":"Portland, OR, United States"}',
        '{"s":"QRO","l":"Queretaro, MX, Mexico"}',
        '{"s":"RIC","l":"Richmond, Virginia"}',
        '{"s":"SMF","l":"Sacramento, CA, United States"}',
        '{"s":"SLC","l":"Salt Lake City, UT, United States"}',
        '{"s":"SAN","l":"San Diego, CA, United States"}',
        '{"s":"SJC","l":"San Jose, CA, United States"}',
        '{"s":"YXE","l":"Saskatoon, SK, Canada"}',
        '{"s":"SEA","l":"Seattle, WA, United States"}',
        '{"s":"STL","l":"St. Louis, MO, United States"}',
        '{"s":"TPA","l":"Tampa, FL, United States"}',
        '{"s":"YYZ","l":"Toronto, ON, Canada"}',
        '{"s":"YVR","l":"Vancouver, BC, Canada"}',
        '{"s":"TLH","l":"Tallahassee, FL, United States"}',
        '{"s":"YWG","l":"Winnipeg, MB, Canada"}',
        '{"s":"ADL","l":"Adelaide, SA, Australia"}',
        '{"s":"AKL","l":"Auckland, New Zealand"}',
        '{"s":"BNE","l":"Brisbane, QLD, Australia"}',
        '{"s":"MEL","l":"Melbourne, VIC, Australia"}',
        '{"s":"NOU","l":"Noumea, New caledonia"}',
        '{"s":"PER","l":"Perth, WA, Australia"}',
        '{"s":"SYD","l":"Sydney, NSW, Australia"}'
      ];
      
      let area = data.split("colo=")[1].split("\n")[0];
      for (var i = 0; i < areas.length; i++) {
        const as = JSON.parse(areas[i]);
        if (as.s == area) {
          document.getElementById("cdn").innerHTML = as.l;
          break;
        }
      }
    }
  });
  
  // 获取用户地理位置
  getLocation();
});

// 获取用户地理位置信息，用于电子时钟天气功能
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  
  // 设置位置信息到localStorage，用于电子时钟插件获取
  localStorage.setItem("weather_lat", latitude);
  localStorage.setItem("weather_lon", longitude);
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
  
  // 设置默认位置（北京）
  localStorage.setItem("weather_lat", "39.9042");
  localStorage.setItem("weather_lon", "116.4074");
}

function fetchCDN() {
  const cdnSpan = document.getElementById('cdn');
  if (!cdnSpan) return;
  
  // 移除CDN检测，添加网站运行时间显示
  const startDate = new Date('2023-01-01'); // 替换为你的网站创建日期
  
  function updateRuntime() {
    const now = new Date();
    const timeDiff = now - startDate;
    
    // 计算时间差
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    // 更新显示
    cdnSpan.innerHTML = 'Blog up for ' + days + ' days ' + hours + ' hours ' + minutes + ' mins';
  }
  
  // 初始更新
  updateRuntime();
  
  // 每分钟更新一次
  setInterval(updateRuntime, 60000);
}

document.addEventListener('DOMContentLoaded', fetchCDN); 