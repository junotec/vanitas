var occup_pt = 0;
var hobby_pt = 0;
var dodge = 0;

// 任意面数のダイス1個
function getSingleDice(dice_size){
    var dice = Math.floor(Math.random() * dice_size);
    return dice + 1;
}

// 任意面数のダイス任意個
function getMultipleDice(dice_num, dice_size){
    var sum = 0;
    for (let i = 0; i < dice_num; i++) {
    sum += getSingleDice(dice_size);
    }
    return sum;
}

// 最低値以上最大値未満の整数を返す
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function addElement(parent, id) {
    const span = document.createElement("span");
    span.setAttribute("id", id);
    parent.appendChild(span);
}

function getName(){
    names = name.split(',');
    return names[getRandomInt(0,names.length)]
}

function getJob(){
    jobs = job.split(',');
    return jobs[getRandomInt(0,jobs.length)]
}


function chooseSkills(occup, hobby){
    var skills = [['回避',dodge],['キック',25],
                ['組み付き',25],['こぶし',50],
                ['頭突き',10],['投擲',25],
                ['マーシャルアーツ',1],['拳銃',20],
                ['サブマシンガン',15],['ショットガン',30],
                ['マシンガン',15],['ライフル',25],
                ['応急手当',30],['鍵開け',1],
                ['隠す',15],['隠れる',10],
                ['聞き耳',25],['忍び歩き',10],
                ['写真術',10],['精神分析',1],
                ['追跡',10],['登攀',40],
                ['図書館',25],['目星',25],
                ['運転',20],['機械修理',20],
                ['重機械操作',1],['乗馬',5],
                ['水泳',25],['製作',5],
                ['操縦',1],['跳躍',25],
                ['電気修理',10],['ナビゲート',10],
                ['変装',1],['言いくるめ',5],
                ['信用',15],['説得',15],
                ['値切り',5],['母国語',75],
                ['医学',5],['オカルト',5],
                ['化学',1],['芸術',5],
                ['経理',10],['考古学',1],
                ['コンピュータ',1],['心理学',5],
                ['人類学',1],['生物学',1],
                ['地質学',1],['電子工学',1],
                ['天文学',1],['博物学',10],
                ['物理学',1],['法律',5],
                ['薬学',1],['歴史',20]];
    var selected_skills = [];
    //適当にいくつか技能を選択
    for (let i = 0; i<getRandomInt(4,14); i++){
        let rand = Math.floor(Math.random() * skills.length);
        selected_skills.push(skills[rand]);
    }
    //ポイントのぶんだけ、選択した技能に値を振っていく
    for (let i = 0; i < occup+hobby; i++){
        let rand = Math.floor(Math.random() * selected_skills.length);
        selected_skills[rand][1] +=  1;
    }
    let i = 0;
    while (i < selected_skills.length){
        if (selected_skills[i][1] > 95){
            let more_skill = selected_skills[0];
            // indexOfは存在確認
            while (selected_skills.indexOf(more_skill) >= 0) {
                more_skill = skills[getRandomInt(0, skills.length)];
            }
            more_skill[1] = more_skill[1] + selected_skills[i][1] - 95;
            selected_skills[i][1] = 95;
            selected_skills.push(more_skill);
        }
        console.log("pended.");
        i += 1;
    }
    return selected_skills
}

function getDice() {
    var str = getMultipleDice(3,6);
    var con = getMultipleDice(3,6);
    var pow = getMultipleDice(3,6);
    var dex = getMultipleDice(3,6);
    var app = getMultipleDice(3,6);
    var siz = getMultipleDice(3,6) + 6;
    var intel = getMultipleDice(3,6) + 6;
    var edu = getMultipleDice(3,6) + 3;
    var money = getMultipleDice(3,6);
    var san = pow * 5;
    var luck = pow * 5;
    var idea = intel * 5;
    var know = edu * 5;
    var hp = Math.round((con + siz) / 2)
    var mp = pow
    var occup_pt = edu*20
    var hobby_pt = intel*10
    
    document.getElementById('name').innerHTML = (getName());
    document.getElementById('job').innerHTML = (getJob());
    
    document.getElementById('str').innerHTML = (str);
    document.getElementById('con').innerHTML = (con);
    document.getElementById('pow').innerHTML = (pow);
    document.getElementById('dex').innerHTML = (dex);
    document.getElementById('app').innerHTML = (app);
    document.getElementById('siz').innerHTML = (siz);
    document.getElementById('intel').innerHTML = (intel);
    document.getElementById('edu').innerHTML = (edu);
    document.getElementById('money').innerHTML = (money);
    
    document.getElementById('san').innerHTML = (san);
    document.getElementById('luck').innerHTML = (luck);
    document.getElementById('idea').innerHTML = (idea);
    document.getElementById('know').innerHTML = (know);
    document.getElementById('hp').innerHTML = (hp);
    document.getElementById('mp').innerHTML = (mp);
    
    document.getElementById('occup_pt').innerHTML = (occup_pt);
    document.getElementById('hobby_pt').innerHTML = (hobby_pt);
    
    let skills = chooseSkills(occup_pt, hobby_pt);
    const container = document.getElementById("skills_container");
    
    for (let i = 0; i < skills.length; i++){
        let id = "skill" + i
        addElement(container, id);
        document.getElementById(id).innerHTML = (skills[i][0]+":"+skills[i][1])+", ";
    }
}