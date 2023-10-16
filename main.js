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




    async function getPokemons(numero,toggle){
        let endpoint = `https://pokeapi.co/api/v2/generation/${numero}/`
        var container = document.getElementById('container')
        container.innerHTML=""
        let pokemons=[]
        pokemons = await fetchPokemons(endpoint)
        for(let j = 0;j<pokemons.length;j++){
            pokemons[j].nr=orderNumber(pokemons[j].url);
        }
        pokemons.sort((a,b)=>a.nr-b.nr)
        pokemons.forEach((item)=> {
            let dumero3decimales = orderNumber(item.url)
            if (dumero3decimales < 10){
                dumero3decimales="0"+dumero3decimales;
            }
            if (dumero3decimales < 100) {
                dumero3decimales = "0" + dumero3decimales;
            }

            let divitem = document.createElement("li");
            divitem.classList.add("item");  
            var img = new Image();
            const toggleurl = toggle?"https://assets.pokemon.com/assets/cms2/img/pokedex/full/":"https://www.serebii.net/pokemongo/pokemon/";img.src="https://i.gifer.com/origin/28/2860d2d8c3a1e402e0fc8913cd92cd7a_w200.gif";const urlImage = `${toggleurl}${dumero3decimales}.png`;
            img.setAttribute("data-image", urlImage);
            img.setAttribute("class", "pokeimage");
            img.setAttribute("alt", item.name);

            divitem.innerHTML=`<div> ${orderNumber(item.url)}-${item.name}</div>`;
            divitem.appendChild(img)

            container.appendChild(divitem); 
        });

        console.log(pokemons);
    }
    var numero = 1;
    getPokemons(1)
    var toggle = false;
    btnicono.addEventListener("click",function(){
        toggle = !toggle;
        getPokemons(numero,toggle)
    })
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
    var gen="";
    for(let i=0;i<geners.length;i++){
        gen+=`    <input  class="radio-gens" type="radio" id=${geners[i]} value=${
            i + 1
        } name="genertion" checked>
        <label for="${geners[i]}" class="label-gens">${geners[i]}</label>`
    }
    filters.innerHTML=gen;
    filters.addEventListener("click",function(e){
        let targ = e.target.type
        if(targ == "radio"){
            getPokemons(e.target.value,toggle)
            title.innerHTML="Pokemon" + e.target.id;
        }
    })


});
