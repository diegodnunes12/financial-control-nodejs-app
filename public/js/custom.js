// Apresenta o formulário
$('#newOrder').click( () => $('#div-form').removeClass( "d-none" ) )

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