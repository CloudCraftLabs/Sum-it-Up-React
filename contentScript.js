function feature({ type, icon, text }) {
  var featureContainer = document.createElement("div");
  featureContainer.addEventListener("mouseenter", () => {
    featureContainer.style.scale = "1.16";
  });
  featureContainer.addEventListener("mouseleave", () => {
    featureContainer.style.scale = "1";
  });
  featureContainer.style.cssText = `
  width:4vh;
  height:4vh;
  background-color:#fff;
  border-radius:50%;
  margin-top:2vh;
  display:none;
  align-items:center;
  justify-content:center;
  cursor:pointer;
 
  `;
  if (type === "copy") {
    var copyToClipboard = document.createElement("img");
    copyToClipboard.src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAlklEQVR4nO2TsQkEIRBFDe3JxEBke7EAw0ntyUBEzAxswMA6DOYY4aJhhdtN78M3UF8w8hT4IoKWlBJe14XGmGN77xy21qJSCr33x44xOKy1RgDYG3NOjDHetpSCay0OEyilRCHEsc45DtPsdHgKAOz7fxgePlhrbQvwCP6m1rrhEMJtSVMyksFkDglw8pv+QM6Zw7/mA8iIvW5KkXTJAAAAAElFTkSuQmCC";
    featureContainer.style.cursor = "pointer";
    featureContainer.addEventListener("click", () => {
      navigator.clipboard.writeText(text);
      copyToClipboard.src =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAVklEQVR4nGP4TyRgoIrCn3++/D/8YBp+hSBFyy+l/b/2ajtuhT/+fEZRBFd48/We/9df7URRdP3VLkw3wiQvPl8PVQTRhNUz6G7C6+t////i8hvx4QgAR8+CWvgozIgAAAAASUVORK5CYII=";
      setTimeout(() => {
        copyToClipboard.src =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAlklEQVR4nO2TsQkEIRBFDe3JxEBke7EAw0ntyUBEzAxswMA6DOYY4aJhhdtN78M3UF8w8hT4IoKWlBJe14XGmGN77xy21qJSCr33x44xOKy1RgDYG3NOjDHetpSCay0OEyilRCHEsc45DtPsdHgKAOz7fxgePlhrbQvwCP6m1rrhEMJtSVMyksFkDglw8pv+QM6Zw7/mA8iIvW5KkXTJAAAAAElFTkSuQmCC";
      }, 1000);
    });

    featureContainer.appendChild(copyToClipboard);
  } else if (type === "share") {
    var share = document.createElement("img");
    share.src = icon;
    featureContainer.appendChild(share);
  } else if (type === "download") {
    var download = document.createElement("img");
    download.src = icon;
    featureContainer.appendChild(download);
    download.addEventListener("click", () => {
      console.log("hello");
    });
  }
  return featureContainer;
}
function toolbar({ first }) {
  var feature1 = feature({ type: "copy", icon: "", text: first[1] });
  var feature2 = feature({
    type: "share",
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5ElEQVR4nLWSvQmEQBCFF839wSIMTTRRe9ACjCxCLEFB0MwytAS1BLEIA00MFEF4h4LLcYK3d8c9GNhgPua92SH4QYSlaVkWBEEAx3FQ1/VncBRFIIQcJUkS1nVlg8dxhG3bFOZ5HtM03cPbtiHPcyiKAlVVYRjGMTXLsqvteZ5RFAXatkVVVdA0DYIgIEkSavNVFDZN87DFcdxRvu+j7/sLcIGHYaCZ9vI8Dywi58OyrO8mn5nLskTXdZ9nfrdtXdchiiLSNKU9//nnZ8VxTGFZltkvbNd+22EYwnVdNE3DbvtOD+wS+klOEOAfAAAAAElFTkSuQmCC",
    text: first[2],
  });
  var feature3 = feature({
    type: "download",
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAw0lEQVR4nM2SMQ6EIBBFCYXhWBZGw028gZ221Faeg8KGxERr7mBrZWnJ38wUmtV11WyzPxl+Bv4DQhD4QeJsYZomJEnC/hie5xlFUbA/hpdlgXOO/TE8jiOEEOx/DocQkOc52rZ9g6mn+RDC95OrqkIURajrmuGmaaCU4pe/de2yLCGlZJic+k8SNFhr4b0/bEDwHvTec36F4zjm6+7Vdd1hjnKUX+E0TfkrGmMui3JZlm1w3/fQWvPCVVFuGIbzB7urFw/kDHN3hODIAAAAAElFTkSuQmCC",
    text: first[1],
  });
  var toolbarContainer = document.createElement("div");
  toolbarContainer.style.cssText = `
  background-color:transparent;
  width:6vh;
  height:36%;
position:absolute;
top:8.5vh;
right:0;
display:flex;
align-items:center;
flex-direction:column;
z-index:999999;

  `;
  console.log(first[1]);
  toolbarContainer.appendChild(feature1);
  toolbarContainer.appendChild(feature2);
  toolbarContainer.appendChild(feature3);
  toolbarContainer.addEventListener("mouseenter", function () {
    feature1.style.display = "flex";
    feature2.style.display = "flex";
    feature3.style.display = "flex";

    toolbarContainer.style.backgroundColor = "rgba(83, 79, 79, 0.918)";
    console.log("hello");
  });
  toolbarContainer.addEventListener("mouseleave", function () {
    toolbarContainer.style.backgroundColor = "transparent";
    feature1.style.display = "none";
    feature2.style.display = "none";
    feature3.style.display = "none";
  });
  return toolbarContainer;
}

function label(div) {
  var labelFigure = document.createElement("div");
  window.addEventListener("mousedown", (e) => {});
  labelFigure.style.cssText = `
  width: 30px;
  height: 30px;
  background-color:blue;
  border-radius:50%;
  cursor: pointer;

  `;
  labelFigure.addEventListener("click", () => {
    div.style.position = "fixed";
    div.style.top = "0";
    div.style.right = "0";
    div.style.backgroundColor = "#303030";
    div.style.color = "#fff";
    div.style.zIndex = "9999";
    div.style.width = "400px";
    div.style.height = 100 + "vh";
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.flexDirection = "column";
    div.appendChild(headerScript1(div));
    div.appendChild(page(div));
    labelFigure.style.display = "none";
  });

  return labelFigure;
}
function page1Content() {
  var selectSummarizationType = document.createElement("select");
  selectSummarizationType.style.cssText = `
  border:none;
  padding:2px 3px;
  border-radius:1vh;
  font-size:15px;
  outline:none;
  cursor:pointer;
  `;
  var option1 = document.createElement("option");
  option1.innerHTML = "OPTION1";
  option1.style.cssText = `
    border:none;

  `;
  option1.value = "OPTION1";
  var option2 = document.createElement("option");
  option2.innerHTML = "OPTION2";
  option2.value = "OPTION2";
  var option3 = document.createElement("option");
  option3.innerHTML = "OPTION3";
  option3.value = "OPTION3";
  selectSummarizationType.appendChild(option1);
  selectSummarizationType.appendChild(option2);
  selectSummarizationType.appendChild(option3);

  var page1Head = document.createElement("div");
  page1Head.style.cssText = `
  width: 100%;
  height: 5vh;
 margin-top:1vh;
  display: flex;
  background-color:transparent;
  
  padding-right:5vh;
 
  justify-content: end;
  `;
  page1Head.appendChild(selectSummarizationType);

  var contentParagraph = document.createElement("p");
  contentParagraph.innerHTML = `Are you looking to bring your website's text to life with captivating animations? Look no further! We are thrilled to present our latest update, featuring a comprehensive collection of free HTML and CSS text animation code examples. This compilation showcases a wide range of text animations, including scrolling effects, fading effects, bouncing effects, and much more.

    With our November 2022 update, we have scoured reputable sources such as CodePen, GitHub, and other reliable platforms to bring you 28 new and exciting text animation items. These code snippets have been carefully selected to provide you with a diverse array of options to enhance your website's typography and create engaging user experiences.
    
    Text animations can add a dynamic and interactive element to your website, capturing your visitors' attention and making your content more memorable. Whether you're designing a landing page, a portfolio, or an online magazine, incorporating these animations can help you create a visually stunning and immersive user interface.
    
    In addition to traditional text animations, our compilation also features more complex and interactive examples. You'll discover code snippets that combine text animations with other effects, transitions, and interactive elements, enabling you to create truly unique and engaging designs. Experiment with different animations, timings, and styles to create a design that stands out and captivates your audience`;

  contentParagraph.style.cssText = `
   width: 90%;
   height: 80%;
   overflow-y:scroll;
   padding :1.5vw 0.5vw;
   font-size: 14px;
   line-height: 20px;
   background-color:transparent;
   font-weight:300;
   border: 0.2px solid #fff;
   border-radius: 8px;
   letter-spacing: 1px;
   scrollbar-color: transparent transparent;
  scrollbar-width: thin;
  z-index:9999;

  
   
   `;

  var contentBox = document.createElement("div");
  var textBox = document.createElement("div");
  textBox.style.cssText = `
      width:100%;
       height:100%;
       background-color:transparent;
       overflow:hidden;
       display:flex;
       align-items:center;
       justify-content:start;
       gap:1vh;
       flex-direction:column;

      
    `;

  textBox.appendChild(page1Head);
  textBox.appendChild(contentParagraph);
  textBox.appendChild(toolbar({ first: [true, contentParagraph.textContent] }));
  // textBox.appendChild(contentFooter)
  // textBox.appendChild(flower);
  contentBox.style.cssText = `
    display:flex;
    flex-direction:column;
   align-items:center;

   background-color: red;
    justify-content:start;
    width:100%;
    height:calc(100% - 30px);
    background-color:transparent;
    
    `;

  contentBox.appendChild(textBox);
  return contentBox;
}
function footerNavigation(page1, page2, page3, currentPage) {
  var likeDiv = document.createElement("div");
  likeDiv.style.cssText = `
  display:flex;
  justify-content:center;
  align-items:center;
 width:30px;
 height:30px;
  background-color:#fff;
  border-radius:50%;
  top : 1.8vh;
left : 5%;
position:absolute;
z-index:999999;
  `;
  var isLiked = false;
  var like = document.createElement("img");
  like.style.cursor = "pointer";

  likeDiv.addEventListener("click", () => {
    isLiked = !isLiked;
    if (isLiked) {
      like.src =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAABMUlEQVR4nLWUT4rCMBTGvYXaoh7C0+gBdKMrly50rSsRwYXgDTyBoE1WrpUiw/gHxwG7GBURQVvzSTKD2um0No4NfBDy3vvxwku+EF68QoEDD9MpPtttLJtNfHW7YKfTNcb3/IzHeM5hNvMAns+YlErQolFo4fBVg2QSG0qxIUTs72NEUTApl0WtAzivVGzJ96KxmJBbfF6t2oHmdgsaj7sWPBJNJGDtdjfgutd7Gqb9aN3vBwg8rlaOYciIKAqOhmEfyjCVeho4TKedU96PRiCqKt+dqmKv638/7EWtJg1c1OseP4UxvBUKvmHjfF7UuAM507KgZzIPYXo2K3J9mQNP9Op0nMuBmaak2zAmvtRv2Hux6LimlH0tW63vNxqJ4KPReI0fGp2OkJ8VvMH+F3gB8VjVm7XhaKEAAAAASUVORK5CYII=";

      // setTimeout(()=>{
      //   flower.style.display = "none";

      // },1500)
    } else {
      like.src =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAABvUlEQVR4nLWUu64BcRDGl5WgIvEAWkSLxgu4lIJGxb4AhY5OxK2QaOiVOgWhJVGJlppCIQpx3+9kplj2IMfmMMkkk5lvfvu/7Qj4sAlfB87nczQaDdRqNXS7XRyPR6VGMeWoRprFYvEaeL1ekU6nodfrIQiC4na7HcPhEIPBgOP7miiKyGQy3PsAzOVyLPJ6veh0OhiNRiiVSrBarTAajewWiwXlcplrpPF4PNyTz+fVwM1mA5PJBLfbjcPhoNrCbDaDzWZjp/je9vs9XC4XzGYzttvtDdjr9fhL1Wr16UFPJhP2Z1apVLi33+8/AlutFrRas9l8BC6XS76MaDSqGRiJRPhyVqvVDUgWCAS4MB6P34bR5YiiiGAwqOQU4HQ6hcFggNPpxG63+xNGGofDwT33l6V62IVCgc8jFArhdDq9hFGNVkXaYrGoqqmAsiwjmUyyMBaLPYVSjs6aNKlUinteAskulwvDqCEcDqu2TzGtnmrxeJy1bw0HEkqSxI0+nw/r9Zofv9/v51wikcD5fNY2bWRZRjabZQD9QeQUU+73NjWNr3q9zm9Up9Pxv/2Redhut9nfse8P2P8CfwCq1Vax1taYPgAAAABJRU5ErkJggg==";
    }
  });
  like.src =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAABvUlEQVR4nLWUu64BcRDGl5WgIvEAWkSLxgu4lIJGxb4AhY5OxK2QaOiVOgWhJVGJlppCIQpx3+9kplj2IMfmMMkkk5lvfvu/7Qj4sAlfB87nczQaDdRqNXS7XRyPR6VGMeWoRprFYvEaeL1ekU6nodfrIQiC4na7HcPhEIPBgOP7miiKyGQy3PsAzOVyLPJ6veh0OhiNRiiVSrBarTAajewWiwXlcplrpPF4PNyTz+fVwM1mA5PJBLfbjcPhoNrCbDaDzWZjp/je9vs9XC4XzGYzttvtDdjr9fhL1Wr16UFPJhP2Z1apVLi33+8/AlutFrRas9l8BC6XS76MaDSqGRiJRPhyVqvVDUgWCAS4MB6P34bR5YiiiGAwqOQU4HQ6hcFggNPpxG63+xNGGofDwT33l6V62IVCgc8jFArhdDq9hFGNVkXaYrGoqqmAsiwjmUyyMBaLPYVSjs6aNKlUinteAskulwvDqCEcDqu2TzGtnmrxeJy1bw0HEkqSxI0+nw/r9Zofv9/v51wikcD5fNY2bWRZRjabZQD9QeQUU+73NjWNr3q9zm9Up9Pxv/2Redhut9nfse8P2P8CfwCq1Vax1taYPgAAAABJRU5ErkJggg==";
  likeDiv.appendChild(like);

  var miniCircle1 = document.createElement("div");
  miniCircle1.style.cssText = `
    width:10px;
    height:10px;
    border-radius:50%;
    border:1px solid #fff;
    cursor:pointer;
    `;
  var miniCircle2 = document.createElement("div");
  miniCircle2.style.cssText = `
    width:10px;
    height:10px;
    border-radius:50%;
    border:1px solid #fff;
    cursor:pointer;
    `;
  var miniCircle3 = document.createElement("div");
  miniCircle3.style.cssText = `
    width:10px;
    height:10px;
    border-radius:50%;
    border:1px solid #fff;
    cursor:pointer;
    `;
  var circleContainer = document.createElement("div");
  circleContainer.style.cssText = `
    display:flex;
    align-items:center;
    justify-content:center;
    gap:3vh;
    height:6vh;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    `;
  if (currentPage === "1") {
    miniCircle1.style.backgroundColor = "#fff";
  }
  if (currentPage === "2") {
    miniCircle2.style.backgroundColor = "#fff";
  }
  if (currentPage === "3") {
    miniCircle3.style.backgroundColor = "#fff";
  }
  miniCircle1.addEventListener("click", () => {
    page1.style.display = "flex";
    page2.style.display = "none";
    page3.style.display = "none";
  });
  miniCircle2.addEventListener("click", () => {
    page2.style.display = "flex";
    page1.style.display = "none";
    page3.style.display = "none";
  });
  miniCircle3.addEventListener("click", () => {
    page3.style.display = "flex";
    page2.style.display = "none";
    page1.style.display = "none";
  });
  circleContainer.appendChild(miniCircle1);
  circleContainer.appendChild(miniCircle2);
  circleContainer.appendChild(miniCircle3);

  var footerNavigation = document.createElement("div");
  footerNavigation.style.cssText = `
    position:absolute;
    bottom:0;
    background-color:transparent;
    height:6vh;
    width:100%;
    `;
  footerNavigation.appendChild(circleContainer);
  footerNavigation.appendChild(likeDiv);
  return footerNavigation;
}

const headerScript1 = (ele) => {
  var div = document.createElement("div");
  var img = document.createElement("img");
  var imgDiv = document.createElement("div");
  img.src =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAjUlEQVR4nK1SbQrAIAh9v6sr1IU7Uxl1MIeDjdZkjS0hTJ8vvwL/ECwhExF773etiYbjuAgAgK21twfEFj8ADiHcya01ds7tAcYYTimp/pyz3nOfQXSM8WKXUvSetQqO01cynbZk7Mlia4JlmWnSMw1bOMm11lfTTl0F6p7HqU73LAECjMQnfM3f/kLeAI/5zdZJoQgbAAAAAElFTkSuQmCC";

  imgDiv.style.cssText = `
     width:4vh;
     height:4vh;
     background-color:white;
     border-radius:50%;
     display:flex;
     align-items:center;
     justify-content:center;
     `;
  imgDiv.style.cursor = "pointer";
  imgDiv.appendChild(img);
  imgDiv.addEventListener("mouseenter", () => {
    imgDiv.style.opacity = "0.7";
  });
  imgDiv.addEventListener("mouseleave", () => {
    imgDiv.style.opacity = "1";
  });
  imgDiv.addEventListener("click", () => {
    ele.innerHTML = "";

    ele.style.width = "5vh";
    ele.style.backgroundColor = "transparent";
    ele.appendChild(label(ele));
  });

  div.style.width = "100%";
  div.style.height = 30 + "px";
  div.style.backgroundColor = "transparent";
  div.style.display = "flex";
  div.style.justifyContent = "end";
  div.style.alignItems = "center";
  div.style.paddingRight = "1vh";

  div.appendChild(imgDiv);

  return div;
};
function Circle(className, data) {
  var circle = document.createElement("div");
  circle.addEventListener("mouseenter", function () {
    circle.style.opacity = "0.5";
  });
  circle.addEventListener("mouseleave", function () {
    circle.style.opacity = "1";
  });
  circle.style.width = "30px";
  circle.style.height = "30px";
  circle.style.borderRadius = "50%";
  circle.style.backgroundColor = "#fff";
  circle.appendChild(data);
  circle.style.justifyContent = "center";
  circle.style.alignItems = "center";
  circle.className = className;
  circle.style.display = "none";
  circle.style.cursor = "pointer";

  return circle;
}
function Left(className, circle) {
  var left = document.createElement("div");
  left.style.position = "absolute";
  left.style.top = "0";
  left.className = className;
  left.style.left = "0";
  left.style.width = "40px";
  left.style.height = "100%";
  left.style.backgroundColor = "transparent";
  left.style.display = "flex";
  left.style.justifyContent = "center";
  left.style.alignItems = "center";
  left.style.zIndex = "99999";
  left.appendChild(circle);
  return left;
}
function Right(className, circle) {
  var right = document.createElement("div");
  right.style.position = "absolute";
  right.className = className;
  right.style.top = "0";
  right.style.right = "0";
  right.style.width = "40px";
  right.style.height = "100%";
  right.style.backgroundColor = "tranparent";
  right.style.display = "flex";
  right.style.justifyContent = "center";
  right.style.alignItems = "center";
  right.style.zIndex = "99999";

  right.appendChild(circle);
  return right;
}
const page = (ele) => {
  var page1 = document.createElement("div");
  var page2 = document.createElement("div");
  var page3 = document.createElement("div");
  var footerNavigation1 = footerNavigation(page1, page2, page3, "1");
  var footerNavigation2 = footerNavigation(page1, page2, page3, "2");
  var footerNavigation3 = footerNavigation(page1, page2, page3, "3");

  var img1 = document.createElement("img");
  var leftArrow = document.createElement("h1");

  leftArrow.innerHTML = "<";
  leftArrow.style.color = "black";
  leftArrow.style.fontSize = "16px";
  leftArrow.style.fontWeight = "900";

  var leftArrow2 = document.createElement("h1");
  leftArrow2.innerHTML = "<";
  leftArrow2.style.color = "black";
  leftArrow2.style.fontSize = "16px";
  leftArrow2.style.fontWeight = "900";

  var rightArrow = document.createElement("h1");
  rightArrow.innerHTML = ">";
  rightArrow.style.color = "black";
  rightArrow.style.fontSize = "16px";
  rightArrow.style.fontWeight = "900";

  var rightArrow2 = document.createElement("h1");
  rightArrow2.innerHTML = ">";
  rightArrow2.style.color = "black";
  rightArrow2.style.fontSize = "16px";
  rightArrow2.style.fontWeight = "900";

  var circle2 = Circle("circle2", rightArrow);
  var circle3 = Circle("circle3", leftArrow);
  var circle4 = Circle("circle4", rightArrow2);
  var circle5 = Circle("circle5", leftArrow2);

  var right1 = Right("right1", circle2);

  var left2 = Left("left2", circle3);
  var right2 = Right("right2", circle4);
  var left3 = Left("left3", circle5);

  right1.addEventListener("mouseenter", () => {
    circle2.style.display = "flex";
  });
  right1.addEventListener("mouseleave", () => {
    circle2.style.display = "none";
  });
  left2.addEventListener("mouseenter", () => {
    circle3.style.display = "flex";
  });
  left2.addEventListener("mouseleave", () => {
    circle3.style.display = "none";
  });
  right2.addEventListener("mouseenter", () => {
    circle4.style.display = "flex";
  });
  right2.addEventListener("mouseleave", () => {
    circle4.style.display = "none";
  });
  left3.addEventListener("mouseenter", () => {
    circle5.style.display = "flex";
  });
  left3.addEventListener("mouseleave", () => {
    circle5.style.display = "none";
  });

  page1.style.height = "100%";
  page1.style.width = "100%";
  page1.style.backgroundColor = "transparent";

  page1.style.position = "relative";
  page1.style.justifyContent = "center";
  page1.style.alignItems = "center";

  page1.appendChild(right1);
  page1.appendChild(footerNavigation1);
  page1.appendChild(page1Content());

  page2.style.height = "100%";
  page2.style.width = "100%";
  page2.style.justifyContent = "center";
  page2.style.alignItems = "center";
  page2.appendChild(footerNavigation2);
  // page2.style.backgroundColor = "blue";
  page2.style.position = "relative";
  page2.appendChild(left2);
  page2.appendChild(right2);
  page2.style.display = "none";

  page3.style.height = "100%";
  page3.style.width = "100%";
  // page3.style.backgroundColor = "green";
  page3.style.justifyContent = "center";
  page3.style.alignItems = "center";
  page3.appendChild(left3);
  page3.style.display = "none";
  page3.style.position = "relative";
  page3.appendChild(footerNavigation3);

  var div = document.createElement("div");
  div.style.width = "100%";
  div.style.height = "calc(100% - 50px)";
  div.style.backgroundColor = "#303030";
  div.appendChild(page1);
  div.appendChild(page2);
  div.appendChild(page3);

  circle2.addEventListener("click", () => {
    page1.style.display = "none";
    page2.style.display = "block";
    page3.style.display = "none";
  });
  circle3.addEventListener("click", () => {
    page1.style.display = "block";
    page2.style.display = "none";
    page3.style.display = "none";
  });
  circle4.addEventListener("click", () => {
    page1.style.display = "none";
    page2.style.display = "none";
    page3.style.display = "block";
  });
  circle5.addEventListener("click", () => {
    page1.style.display = "none";
    page2.style.display = "flex";
    page3.style.display = "none";
  });

  return div;
};

const parent = () => {
  var div = document.createElement("div");

  document.body.style.position = "relative";
  div.style.position = "fixed";
  div.style.top = "0";
  div.style.right = "0";
  div.style.backgroundColor = "#303030";
  div.style.color = "#fff";
  div.style.zIndex = "99999999";
  div.style.width = "400px";
  div.style.height = 100 + "vh";
  div.style.display = "flex";
  div.style.justifyContent = "center";
  div.style.alignItems = "center";
  div.style.flexDirection = "column";
  div.appendChild(headerScript1(div));
  div.appendChild(page(div));

  document.body.appendChild(div);
};
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.message === 'triggerContentScript') {
//       parent();

//     }
//   });

// chrome.runtime.sendMessage({greetings:"hello"},function(response){
//   console.log(response.farewell)
// })
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request.message);
  if (request.message === "start") {
    parent();
  }
});
