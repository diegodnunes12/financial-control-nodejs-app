// Apresenta o formulário
$('#newOrder').click( () => {

    let qtdOptions = $('#category_id option')
    console.log('click')
    console.log(qtdOptions)
    if(qtdOptions.length <= 2){
        console.log(qtdOptions.length)
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
                console.log(categories)
                categories.forEach(category => {                
                    let option = document.createElement("option")
                    option.text = category.name
                    option.value = category._id
                    select.add(option)
                    console.log(category)
                })
            }
        )
        .catch(error => console.log('error', error))
    }

    $("#addOrder").modal()
})

function editOrder(id, name){
    $('input#name').val(name)
    $('#editId').val(id)
    $("#editOrder").modal()
}

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