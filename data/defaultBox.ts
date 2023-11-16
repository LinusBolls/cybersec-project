export const defaultBoxCode = {
    html: `<body>
    <h1 js-data="sache" class="heading">Hello world</h1>
</body>`,
    css: `.heading {
        color: red;
    }`,
    js: `
    const heading = document.querySelector('[js-data="sache"]');
    
    fetch('/api/health');
    fetch('https://google.com');
    
    heading.innerHTML = "Script loaded successfully 🎉";`,
}
export const defaultBoxCode1 = {
    html: `<div class="card">
    <div class="imgBx">
      <img src="https://img.playbook.com/bkKKFIEb5v3qzdBH3txZ_K-4Nc8ZUExeIeMdQL6RQQU/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljL2EyNGY4M2Jk/LWQ5YzEtNGRkMS05/M2Y1LWIyNTRjYTE3/M2UzMQ" alt="Check your internet connection">
    </div>
    <div class="content">
      <div class="details">
        <h2>ghost_cars.official<br> <span>Creator</span></h2>
        <div class="data">
          <h3>11k <br> <span>Posts</span></h3>
          <h3>120M <br> <span>Followers</span></h3>
          <h3>1<br> <span>Following</span></h3>
        </div>
        <div class="actionBtn">
          <a href="https://www.instagram.com/ghost_cars.official/" target="_blank"><button>Follow </button></a>
          <button>Message</button>
        </div>
      </div>
    </div>
  </div>`,
    css: `@import url("https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900");
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Poppins", sans-serif;
    }
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(45deg, #fbda61, #ff5acd);
    }
    .card {
      position: relative;
      width: 350px;
      height: 190px;
      background: #fff;
      border-radius: 20px;
      box-shadow: 0 35px 80px rgba(0, 0, 0, 0.15);
      transition: 0.5s;
    }
    .card:hover {
      height: 450px;
    }
    .imgBx {
      position: absolute;
      left: 50%;
      top: -50px;
      transform: translateX(-50%);
      width: 150px;
      height: 150px;
      background: #000;
      border-radius: 20px;
      box-shadow: 0 15px 50px rgba(0, 0, 0, 0.35);
      overflow: hidden;
      transition: 0.5s;
    }
    .card:hover .imgBx {
      width: 250px;
      height: 250px;
    }
    .imgBx img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .card .content {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      overflow: hidden;
    }
    .card .content .details {
      padding: 40px;
      text-align: center;
      width: 100%;
      transition: 0.5s;
      transform: translateY(150px);
    }
    .card:hover .content .details {
      transform: translateY(0px);
    }
    .card .content .details h2 {
      font-size: 1.25em;
      font-weight: 600;
      color: #555;
      line-height: 1.2em;
    }
    .card .content .details h2 span {
      font-size: 1.75em;
      font-weight: 500;
      opacity: 0.5;
    }
    .card .content .details .data {
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
    }
    .card .content .details .data h3 {
      font-size: 1em;
      color: #555;
      line-height: 1.2em;
      font-weight: 600;
    }
    .card .content .details .data h3 span {
      font-size: 0.85em;
      font-weight: 400;
      opacity: 0.5;
    }
    .card .content .details .actionBtn {
      display: flex;
      justify-content: space-between;
      /* gap: 20px; */
    }
    .card .content .details .actionBtn button {
      padding: 10px 30px;
      border-radius: 5px;
      border: none;
      outline: none;
      font-size: 1em;
      font-weight: 500;
      background: #ff5acd;
      color: #fff;
      cursor: pointer;
    }
    .card .content .details .actionBtn button:nth-child(2) {
      border: 1px solid #999;
      color: #999;
      background: #fff;
    }
    `,
    js: ``,
}