// Apresenta o formulário
$('#newOrder').click( () => {

    let qtdOptions = $('#category_id option')

    if(qtdOptions.length <= 1){

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        fetch("http://localhost:3000/categories", requestOptions)
        .then(response => response.text())
        .then(
            (result) => {

                let select = document.getElementById('category_id')

                let categories = JSON.parse(result)
                categories.forEach(category => {                
                    let option = document.createElement("option")
                    option.text = category.name
                    option.value = category._id
                    select.add(option)
                })
            }
        )
        .catch(error => console.log('error', error))
    }

    $("#addOrder").modal()
})

// Alterando a borda do formulário de lançamentos
$( "#revenue" ).change( () => {
    if($('#revenue').find(":selected").val() == "true"){
        $('#form-order').addClass( "revenue" )
        $('#form-order').removeClass( "expense" )
    }
    else{
        $('#form-order').removeClass( "revenue" )
        $('#form-order').addClass( "expense" )
    }
})

function removeCategory(id, name){
    $('#categoryName').text(name)
    $('#removeId').val(id)
    $("#removeCategory").modal()
}

function editCategory(id, name){
    $('input#name').val(name)
    $('#editId').val(id)
    $("#editCategory").modal()
}

function removeOrder(id, name){
    $('#orderName').text(name)
    $('#removeId').val(id)
    $("#removeOrder").modal()
}