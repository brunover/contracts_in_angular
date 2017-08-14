
/* Controllers */
mainCtrl.$inject = ['$scope', '$route', '$http'];
contractsApp.controller('mainCtrl', 'localeOrderBy');

/* Functions for controllers */
function mainCtrl($scope, $route, $http) { 

    // Retrieves JSON data in "content.json"
    $http({
        method: 'POST', 
        url: 'content/content.json' 
    }).
    success(function(data, status, headers, config) {
        // ---------------------------------
        // SCOPES
        $scope.contracts = data.contracts;
        $scope.indexContract = 0;

        $scope.classData = false;
        $scope.classNatureza = false;
        $scope.classComprador = false;
        $scope.classVendedor = true;
        $scope.classEnergiaRef = true;
        $scope.classEnergiaEntre = true;
        $scope.classStatus = true;
        $scope.classModelo = true;
        $scope.classPreco = true;
        $scope.classSubmercado = true;
        $scope.classInicioForne = true;
        $scope.classFimForne = true;
        $scope.classInicioVige = true;
        $scope.classFimVige = true; 

        $scope.contract = {
            codigo: '',
            data: '',
            natureza: '',
            comprador: '',
            vendedor: '',
            energiaref: '',
            energiaentre: '',
            status: '',
            modelo: '',
            preco: '',
            submercado: '',
            inicioforne: '',
            fimforne: '',
            iniciovige: '',
            fimvige: '' 
        };

        // ---------------------------------
        // ORDER BY
        $scope.fieldName = null;
        $scope.reverseSort = false;

        $scope.sortBy = function(fieldName) {
            $scope.reverseSort = !$scope.reverseSort;
            $scope.fieldName = fieldName;
        };

        // ---------------------------------
        // EDIT CONTRACT MODULE
        $scope.moduleEditContract = function(idContract) {
            $scope.indexContract = idContract;

            $scope.contract = {
                codigo: $scope.contracts[idContract]['Código'],
                data: $scope.contracts[idContract]['Data acordo comercial'],
                natureza: $scope.contracts[idContract]['Natureza'],
                comprador: $scope.contracts[idContract]['Comprador'],
                vendedor: $scope.contracts[idContract]['Vendedor'],
                energiaref: $scope.contracts[idContract]['Energia referência'],
                energiaentre: $scope.contracts[idContract]['Energia entregue'],
                status: $scope.contracts[idContract]['Status aprovação'],
                modelo: $scope.contracts[idContract]['Modelo'],
                preco: $scope.contracts[idContract]['Preço base contratado'],
                submercado: $scope.contracts[idContract]['Submercado'],
                inicioforne: $scope.contracts[idContract]['Início fornecimento'],
                fimforne: $scope.contracts[idContract]['Fim fornecimento'],
                iniciovige: $scope.contracts[idContract]['Início vigência'],
                fimvige: $scope.contracts[idContract]['Fim vigência']
            };
        }

        $scope.submitEditContractForm = function() {
            var idContract = $scope.indexContract;

            $scope.contracts[idContract]['Natureza'] = $scope.contract.natureza;
            $scope.contracts[idContract]['Comprador'] = $scope.contract.comprador;
            $scope.contracts[idContract]['Vendedor'] = $scope.contract.vendedor;
            $scope.contracts[idContract]['Energia referência'] = $scope.contract.energiaref;
            $scope.contracts[idContract]['Energia entregue'] = $scope.contract.energiaentre;
            $scope.contracts[idContract]['Status aprovação'] = $scope.contract.status;
            $scope.contracts[idContract]['Modelo'] = $scope.contract.modelo;
            $scope.contracts[idContract]['Submercado'] = $scope.contract.submercado;

            $scope.contracts[idContract]['Data acordo comercial'] = $("#dataID").val();
            $scope.contracts[idContract]['Início fornecimento'] = $("#inicioforneID").val();
            $scope.contracts[idContract]['Fim fornecimento'] = $("#fimforneID").val();
            $scope.contracts[idContract]['Início vigência'] = $("#iniciovigeID").val();
            $scope.contracts[idContract]['Fim vigência'] = $("#fimvigeID").val();

            $scope.contracts[idContract]['Preço base contratado'] = $("#precoID").val();

            $('#editContractID').modal('hide');
        }

        // ---------------------------------
        // EVENTS
        $(document).on("click", ".classEditBtn", function() {
            // DATEPICKER
            $.fn.datepicker.defaults.language = 'pt-BR';

            // Tipo 1: dia/mês/ano
            $('.datepicker1').datepicker({
                //startDate: '-3d',
                autoclose: true,
                format: "dd-mm-yyyy"
            })

            // Tipo 2: mês/ano
            $('.datepicker2').datepicker({
                //startDate: '-3d',
                autoclose: true,
                startView: "months", 
                minViewMode: "months",
                format: "M/yyyy",  
            });

            $('.classPreco').maskMoney({
                thousands: '.',
                decimal: ','
            });
        });
    }).
    error(function(data, status, headers, config) {
        console.log(data.contracts);
    });

}


