let myLeads = []

const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const resetBtn = document.getElementById('reset-btn')
const tabBtn = document.getElementById('tab-btn')
const listEl = document.getElementById('list-el')

const leedsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
// console.log(leedsFromLocalStorage)

if (leedsFromLocalStorage) {
    myLeads = leedsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener('click', function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem('myLeeds', JSON.stringify(myLeads) )
    render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `<li>
                        <a target='_blank' href= '${leads[i]}'>
                            ${leads[i]}
                        </a>
                      </li>`
    }
    
    listEl.innerHTML = listItems
    
    }

inputBtn.addEventListener('click', function() {
    myLeads.push(inputEl.value);
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads));

    render(myLeads)

    // console.log( localStorage.getItem("myLeads") );
})

resetBtn.addEventListener("click", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})