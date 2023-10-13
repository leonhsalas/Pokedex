document.addEventListener("DOMContentLoaded",function(){
    const fetchPokemons = async(endpoint)=>{
        let data;
        try {
            const response = await fetch(endpoint,{
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                },
            });
            data=await response.json();
    
        } catch(error){
            console.log(error);
        }
        return data.pokemon_species; 
    };
    function orderNumber(str){
        var mySubstring = str.substring(
            str.lastIndexOf("s/")+2,str.lastIndexOf("/")

            
        )
        return mySubstring;
    }
    async function getPokemons(numero){
        let endpoint = `https://pokeapi.co/api/v2/generation/${numero}/`
        var container = document.getElementById('container')
        container.innerHTML=""
        let pokemons=[]
        pokemons = await fetchPokemons(endpoint)
        for(let j = 0;j<pokemons.length;j++){
            pokemons[j].nr=orderNumber(pokemons[j].url);
        }
        pokemons.sort((a,b)=>a.nr-b.nr)
        pokemons.forEach((pokemon)=> {
            let divitem = document.createElement("li")
            divitem.classList.add("item");
            var img = new Image()
            const toggleurl = toggle?"https://assets.pokemon.com/assets/cms2/img/pokedex/full/":""

            
            divitem.innerHTML=`<div> ${orderNumber(item.url)}-${item.name}</div>`
            container.appendChild(divitem)
        })

        console.log(pokemons)
    }
    getPokemons(1)
    var geners = [
        "generation-1",
        "generation-2",
        "generation-3",
        "generation-4",
        "generation-5",
        "generation-6",
        "generation-7"
    ];
    var filters = document.getElementById("filters");
    var gen=""
    for(let i=0;i<geners.length;i++){
        gen+=`    <input  class="radio-gens" type="radio" id=${geners[i]} value=${i+1} name="genertion" checked>
        <label for="${geners[i]}" class="label-gens">${geners[i]}</label>`
    }
    filters.innerHTML=gen


});