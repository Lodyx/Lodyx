
//Wax RPC check
const wax = new waxjs.WaxJS({
    rpcEndpoint: 'https://wax.greymass.com'
});

//automatically check for credentials
window.onload = function() {
    autoLogin();
}

//checks if autologin is available 
async function autoLogin() {
    let isAutoLoginAvailable = await wax.isAutoLoginAvailable();
    if (isAutoLoginAvailable) {
        let userAccount = wax.userAccount;
        let pubKeys = wax.pubKeys;
        let str = 'AutoLogin enabled for account: ' + userAccount + '<br/>Active: ' + pubKeys[0] + '<br/>Owner: ' + pubKeys[1]
        document.getElementById('autologin').insertAdjacentHTML('beforeend', str);
    }
    else {
        document.getElementById('autologin').insertAdjacentHTML('beforeend', 'Not auto-logged in');
        if(window.location.href.indexOf("login") > -1)
        {
            
        }
        else{
            location.assign('login.html');
        }
    }
}

//normal login. Triggers a popup for non-whitelisted dapps
async function login() {
    try {
        //if autologged in, this simply returns the userAccount w/no popup
        let userAccount = await wax.login();
        let pubKeys = wax.pubKeys;
        let str = 'Account: ' + userAccount + '<br/>Active: ' + pubKeys[0] + '<br/>Owner: ' + pubKeys[1]
        document.getElementById('loginresponse').insertAdjacentHTML('beforeend', str);
    } catch (e) {
        document.getElementById('loginresponse').append(e.message);
    }
}

//delayed checker of login
var interval = 400;
var timer = window.setInterval(function(){
    //let userAccount = await wax.userAccount;
    if(!wax.api){
        //document.getElementById('autologin').insertAdjacentHTML('beforeend', 'Not auto-logged in');
    }
    else{
        //var p = window.location.pathname;
        //document.getElementById('autologin').insertAdjacentHTML('beforeend', p);
        if(window.location.href.indexOf("login") > -1)
        {
            location.assign('index.html');
        }
    }
    if(Coderun === true)
    {
        window.clearInterval(timer);
    }    
}, interval)


async function sign() {
if(!wax.api) {
    return document.getElementById('response').append('* Login first *');
}

try {
    const result = await wax.api.transact({
    actions: [{
        account: 'eosio',
        name: 'delegatebw',
        authorization: [{
        actor: wax.userAccount,
        permission: 'active',
        }],
        data: {
        from: wax.userAccount,
        receiver: wax.userAccount,
        stake_net_quantity: '0.00000001 WAX',
        stake_cpu_quantity: '0.00000000 WAX',
        transfer: false,
        memo: 'This is a WaxJS/Cloud Wallet Demo.'
        },
    }]
    }, {
    blocksBehind: 3,
    expireSeconds: 30
    });
    document.getElementById('response').append(JSON.stringify(result, null, 2))
} catch(e) {
    document.getElementById('response').append(e.message);
}
}

// Function for Tab Change
function changeTab(buttonClass, buttonId, contentClass, contentId) {
    const contentClassVar = document.getElementsByClassName(contentClass);
    const buttonClassId = document.getElementsByClassName(buttonClass);
    document.getElementById(buttonId).addEventListener("click", () => {
        for (i = 0; i < contentClassVar.length; i++) {
            contentClassVar[i].classList.remove("show");
            buttonClassId[i].classList.remove("active");
        }
        document.getElementById(contentId).classList.toggle("show")
        document.getElementById(buttonId).classList.toggle("active")
    })
}

function setDefaultTab(buttonId, contentId) {
    document.getElementById(contentId).classList.toggle("show")
    document.getElementById(buttonId).classList.toggle("active")
}

// End

// Navigation Tab Setting for the Header Nav Tab
setDefaultTab("header-btn-mine", "page-content-mine")
changeTab("header-btn", "header-btn-mine", "page-content", "page-content-mine")
changeTab("header-btn", "header-btn-craft", "page-content", "page-content-craft")
changeTab("header-btn", "header-btn-transmute", "page-content", "page-content-transmute")
changeTab("header-btn", "header-btn-workshop", "page-content", "page-content-workshop")


// for Material Generation
let materialCount = 6
const materialList = document.getElementsByClassName("material-list")[0]
function generateMaterials() {
    for (var i = 0; i < materialCount; i++) {
        materialList.innerHTML += `
            <li>Material ${i + 1}</li>
        `
    }
}
generateMaterials()

// for ToolBox Asset Generation
let toolCount = 16
const toolBox = document.getElementsByClassName("tool-box")[0]

// Generate the Tools for the Game
// function generatePlayerTools() {
//     let toolArray = []
//     for (i = 0; i < toolCount; i++) {
//         let toolAsset = `<input type="checkbox" class="tool-checkbox" value="wax-asset-id-${i}" id="asset-id-${i}">
//             <label for="asset-id-${i}" class="tool-asset-class">tool ${i}</label>`;
//         toolBox.innerHTML += toolAsset;

//         var _button = document.createElement("button")
//         _button.setAttribute("type", "checkbox")
//         _button.setAttribute("class", "tool-checkbox")
//         _button.setAttribute("id", "asset-id-" + i)
//     }
// }
// generatePlayerTools()

//  END of Checking Input:Checkbox in MINE PAGE



// Get Values (asset id) of selected tools
let toolValues = []
document.getElementById("claim-btn").addEventListener("click", () => {
    const checkboxValue = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxValue.forEach((navButtonId) => {
        toolValues.push(navButtonId.value);
    })
    alert(toolValues)
})
// End


// CRAFTING
// SCROLLABLE TOOL CRAFTING LIST

// Navigate from Craft Basic to Upgrade
// Change TAB of CRAFT (BASE to UPGRADE)
setDefaultTab("tool-scroller-nav-btn-base", "tool-scroller-content-base")
changeTab("tool-scroller-nav-btn", "tool-scroller-nav-btn-base", "tool-scroller-content", "tool-scroller-content-base");
changeTab("tool-scroller-nav-btn", "tool-scroller-nav-btn-upgrade", "tool-scroller-content", "tool-scroller-content-upgrade")


// Generate Tool List for #tool-scroller
const craftList1 = document.getElementById("tool-scroller-content-base")
const craftList2 = document.getElementById("tool-scroller-content-upgrade")

function generateTemplateTools() {
    for (let i = 0; i < toolCount; i++) {

        toolCraft = document.createElement("input");
        toolCraft.setAttribute("type", "radio");
        toolCraft.setAttribute("class", "craft-radio-btn");
        toolCraft.setAttribute("id", "toolId-" + i)
        toolCraft.setAttribute("name", "base-tool")

        // This is what appears in the tool craft.
        toolCraftLabel = document.createElement("label");
        toolCraftLabel.appendChild(document.createTextNode("TOOL " + i));
        toolCraftLabel.setAttribute("for", "toolId-" + i);
        toolCraftLabel.setAttribute("class", "craft-radio-btn-label");

        toolCraftContainer = document.createElement("div");
        toolCraftContainer.setAttribute("class", "tool-craft-container");
        toolCraftContainer.setAttribute("id", "tool-craft-container-id-" + i);
        toolCraftContainer.appendChild(document.createTextNode("TOOL " + i))

        craftList2.appendChild(toolCraft)
        craftList2.appendChild(toolCraftLabel)

        craftList1.appendChild(toolCraft)
        craftList1.appendChild(toolCraftLabel)



        // craftCard = document.createElement("div");
        // craftCard.setAttribute("class", "craft-card");
        // craftCard.setAttribute("id", "craft-card-id-" + i);
        // craftCard.appendChild(toolIdText)

        document.getElementById("tool-craft-container").appendChild(toolCraftContainer);

    }
}

generateTemplateTools()

function changeCraftCard() {
    const craftRadioBtn = document.getElementsByClassName("craft-radio-btn");
    const craftContent = document.getElementsByClassName("tool-craft-container");

    for (i = 0; i < craftRadioBtn.length; i++) {
        document.getElementById(craftRadioBtn[i].id).addEventListener("click", () => {

            for (n = 0; n < craftContent.length; n++) {
                document.getElementById(craftContent[n].id).classList.remove("show")
            }
        })
        document.getElementById("tool-craft-container-id-" + i).classList.toggle("show")
    }
}

changeCraftCard()





// End

// For the GACHA Page
// Button for the Navigation of the Gacha Page

setDefaultTab("basic-gacha-btn", "gacha-tab-content-basic")
changeTab("gacha-nav-tab", "basic-gacha-btn", "gacha-tab-content", "gacha-tab-content-basic")
changeTab("gacha-nav-tab", "advanced-gacha-btn", "gacha-tab-content", "gacha-tab-content-advanced")
changeTab("gacha-nav-tab", "master-gacha-btn", "gacha-tab-content", "gacha-tab-content-master")

// WORKSHOP
// WORKSHOP - INVENTORY GENERATE

const workshopInventoryList = document.getElementById("equips-inventory-list")

// Generate Tool List for #tool-scroller
function generateWorkshopInventoryList() {
    for (let i = 0; i < toolCount; i++) {
        workshopInventoryList.innerHTML +=
            `<input type="radio" class="workshop-inventory-radio-btn" name="workshop-inventory-list" id="workshop-inventory-${i}" value="workshop-inventory-${i}"><label class="workshop-inventory-list-item" for="workshop-inventory-${i}">NFT-${i}</label>`
    }
}
generateWorkshopInventoryList()

