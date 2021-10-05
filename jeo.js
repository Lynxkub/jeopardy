const height=6;
const width=6

let categories = [];
let board = [];
function startButton(){
    const startBtn=document.createElement("button");
    $(startBtn).text("Start Game").addClass("btn btn-primary")
    startBtn.setAttribute("type", "button");
    $("body").append(startBtn);
    $(startBtn).on("click", createTable);
     
}
function createTable(){
    const mainDiv=document.querySelector("div");
    $(mainDiv).empty();
    const table=document.createElement("table");
    const div=document.createElement("div");
    div.textContent=''
    div.classList.add(".table-responsive");
    
    $("body").append(div);
    $("div").append(table);
    for(let head=0; head<6; head++){
    const tHead=document.createElement("th");
    tHead.style.border="1px solid black";
    tHead.classList.add(head);
    
    $(tHead).text("Start Game").css({"vertical-align" :"middle", "color": "white", "text-align": "center"})
    table.append(tHead);
    addCategoriesAndQuestions();
    
    }
    table.style.tableLayout="fixed";
    table.style.width= "100%";
   
    table.style.height= "85vh"
    table.style.border="1px solid black";
    for (let i =0; i<5; i++){
        let tr=document.createElement("tr");
        table.append(tr);
        for(let j=0; j<6; j++){
            let td=document.createElement("td");
            tr.appendChild(td);
            td.style.border="1px solid black";
           
            td.classList.add(`col-${j}`)
            $("td").text("?").css({"text-align" :"center" ,"vertical-align":"middle", "font-size": "1em", "backgroundColor": "#060ce9", "color": "white"});
        }
    }
}
async function getClueId(){
    const clues=await axios.get("http://jservice.io/api/categories", {params:{count:100}});
    const clueList=clues.data
    let gameNums=randNumbers(100, 6);
    const clueId=[];
        for (let j of gameNums){
            let id=clueList[j].id;
            clueId.push(id);
        }
        return(clueId); 
    }
    async function getClues(){
        const questionList=[];
        const idList= await getClueId();
        const th=document.querySelectorAll("th");
        const catNames=[];
        for( let i =0; i<idList.length; i++){
        const clues=await axios.get("http://jservice.io/api/clues", {params:{category: idList[i]}});
        const clueInfo = clues.data
        if (clueInfo.length>5){
           let questionNumber =randNumbers(clueInfo.length, 5);
           const questionGroup=[];
           for(let j of questionNumber){
               let question = clueInfo[j];
                questionGroup.push(question);
                }
           questionList.push(questionGroup);
        }else{
            questionList.push(clueInfo);
        }
        }
        for(let i= 0; i<idList.length; i++){
            const cat= await axios.get("http://jservice.io/api/category",{params:{
            id: idList[i]}});
            catNames.push(cat.data.title);
        }
            for(let i = 0; i<th.length; i++){
                th[i].innerText=catNames[i]
            }
        return(questionList);
    }
function addCategoriesAndQuestions(){
    
    placeQuestionsAndAnswers();
}
startButton();
function randNumbers(num,length){
    let nums=[];
    for(let i =0; i<length; i++){
        let randNum=Math.floor(Math.random()*num);
        if(!nums.includes(randNum)){
        nums.push(randNum);
        }else{
            if(nums.length<length){
                randNumbers(num,length);
            }
        }
    }
    return(nums);
}
async function getQuestionsAndAnswers(){
    const questions = await getClues();
    const questionList=[];
    const answersList=[]
   for(let i = 0; i<questions.length; i++){
       for (let j of questions[i]){
           questionList.push(j.question);
       }
   }
   for(let i = 0; i<questions.length; i++){
    for (let j of questions[i]){
        answersList.push(j.answer);
}
   }
   const a=[questionList.slice(0,5)];
   const b=[questionList.slice(5,10)];
   const c=[questionList.slice(10,15)];
   const d=[questionList.slice(15,20)];
   const e=[questionList.slice(20,25)];
   const f=[questionList.slice(25,30)];
   const g=[answersList.slice(0,5)];
   const h=[answersList.slice(5,10)];
   const i=[answersList.slice(10,15)];
   const j=[answersList.slice(15,20)];
   const k=[answersList.slice(20,25)];
   const l=[answersList.slice(25,30)];
   const questionArr=[a,b,c,d,e,,f]
   const answerArr=[g,h,i,j,k,l]
   return [questionArr,answerArr];

}
async function placeQuestionsAndAnswers(){
    const allQuestions =await getQuestionsAndAnswers()
    const allTd=document.querySelectorAll("td");
    const colZero = document.querySelectorAll(".col-0");
    for(let i = 0; i<colZero.length; i++){
        for (let j of allQuestions[0][0]){
            colZero[i].title=(j[i]);
        }   
        for(let n of allQuestions[1][0]){
            colZero[i].id=(n[i])
    }
    const colOne = document.querySelectorAll(".col-1");
    for(let i = 0; i<colOne.length; i++){
        for (let j of allQuestions[0][1]){
            colOne[i].title=(j[i]);
        }   
        for(let n of allQuestions[1][1]){
            colOne[i].id=(n[i])
        }
    }
    const colTwo = document.querySelectorAll(".col-2");
    for(let i = 0; i<colTwo.length; i++){
        for (let j of allQuestions[0][2]){
            colTwo[i].title=(j[i]);
        }   
        for(let n of allQuestions[1][2]){
            colTwo[i].id=(n[i])
    }
    const colThree = document.querySelectorAll(".col-3");
    for(let i = 0; i<colThree.length; i++){
        for (let j of allQuestions[0][3]){
            colThree[i].title=(j[i]);
        }   
        for(let n of allQuestions[1][3]){
            colThree[i].id=(n[i])
    }
    const colFour = document.querySelectorAll(".col-4");
    for(let i = 0; i<colFour.length; i++){
        for (let j of allQuestions[0][4]){
            colFour[i].title=(j[i]);
        }   
        for(let n of allQuestions[1][4]){
            colFour[i].id=(n[i])
    }
    const colFive = document.querySelectorAll(".col-5");
    for(let i = 0; i<colFive.length; i++){
        for (let j of allQuestions[0][6]){
            colFive[i].title=(j[i]);
        }   
        for(let n of allQuestions[1][5]){
            colFive[i].id=(n[i])
    }   
}
    }
    }
    }
    }   

$(allTd).on("click", function(e){
   e.target.innerText=e.target.title;
   e.target.classList.add("question")
})

$(allTd).on("dblclick", function(e){
    e.target.classList.add("answer")
    e.target.innerText=e.target.id;
}) 
$(allTd).on("click", function(e){
    if( e.target.classList.contains("answer")){
        e.target.innerText=e.target.id;
    }
})
    }