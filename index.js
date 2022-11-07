const pptr = require("puppeteer");
const cheerio = require("cheerio");


const typeRacerGame = async (link, delay, speed) => {
  // let changedSpeed = (speed * 100) / 120 + 1; 
  let changedSpeed = (27 * 102) / 120;
  
  const browser = await pptr.launch({
    headless: false,
    args: [`--window-size=${1280},${1024}`],
    devtools: true,
  });
  const page = await browser.newPage();
  await page.goto(link);
  await page.setViewport({ width: 1920, height: 1080 });
  await page.waitForSelector(".raceAgainLink");
  await page.click(".raceAgainLink");
  await page.waitForTimeout(4000);
  await page.waitForSelector("body");
  let html = await page.$eval("body", (element) => {
    return element.innerHTML;
  });
  const $ = await cheerio.load(html);
  console.log(await $('.inputPanel tr:first').text().length);
  let inputText = await $(".inputPanel tr:first").text();
  let wordCount = 0;
  for(let i = 0; i < inputText.length; i++){
    if(inputText[i] == " "){ wordCount++; }
  }
  console.log("word Count :",wordCount);


  await page.waitForSelector(".txtInput");
  setTimeout(async () =>{
    await page.keyboard.type(inputText, {delay: changedSpeed});
  },delay)
  

  // await page.keyboard.press("Space");
};

typeRacerGame("https://play.typeracer.com?rt=1jqwoc08pd", 9000, 102);




















// let typeRacer =() =>
// {
//     var inputText = "";
//     var fullText = true;
//     var index = 0;
//     $('body').on('keypress','.txtInput',((e) =>
//     {
//       console.log(index);
//         if(fullText)
//         {
//             inputText = $('.inputPanel tr:first').text();
//             // inputText = $(".gameView span").text();
//             // console.log(inputText);
//             // inputText = inputText.substr(5, inputText.length);
//             console.log(inputText);
//             flag = false;
//         }
//         if(inputText[index] == " ")
//         {
//             if((e.which || e.keyCode)==32)
//                 index++;
//             else
//                 e.preventDefault();
//         }
//         else
//         {
//             e.preventDefault();
//             console.log($( '.txtInput:text' ).val($( '.txtInput:text' ).val()+inputText[index]).text());

//             index++;
//         }
//     }));
// }
