const livros = document.querySelector("#livros");

livros.addEventListener("click",event=>{
    let elementoClicado = event.target;

    if(elementoClicado.dataset.type == "remocao"){
        let id = elementoClicado.dataset.ref;
        fetch(`http://localhost:3000/livros/${id}`, {method:"DELETE"} )
            .then((response)=>{
                let tr = document.querySelector(`#livro_${id}`);
                tr.remove()
            })
    }
})