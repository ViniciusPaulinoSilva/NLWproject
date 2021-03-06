

function populateUFs() {
    const ufSelect =  document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res =>  res.json() )
    .then( states => {

        for( state of states ){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</"option>`
        }
    })
}

populateUFs()


function getCities(event){
    const citySelect =  document.querySelector("[name=city]")
    const stateInput =  document.querySelector("[name=state]")


    const ufValue = event.target.value

    const indexOfSelectedStated = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedStated].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/microrregioes`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res =>  res.json() )
    .then( cities => {

        for( const city of cities ){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</"option>`
        }

        citySelect.disabled = false
    })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


const collectedItem = document.querySelector("input[name=items]")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

//itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")

let selectedItems = []

function handleSelectedItem(event) {
     
    const itemLi = event.target 

    //add ou remove uma classe com javascript

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //verificar se existem items selecionados, se sim
    // pegar os itens selecionados 
    
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    }) 

    //se ja estiver selecionado remover da lista

    if(alreadySelected >=0) {
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }else{
         //se não estiver selecionado adicionar a lista
         selectedItems.push(itemId)
    }

    //atualizar o campo escondido com os items selecionados
    collectedItem.value = selectedItems

}