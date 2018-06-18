if ('undefined' !== typeof module) {

    var IdReturn = 10000;


    module.exports = function initDataTable(_indat, _service, selected) {

        $('#datatableInclusions').DataTable({
            "data": _indat,

            "pagingType": "full_numbers",
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
            responsive: true,
            language: {
                search: "_INPUT_",
                searchPlaceholder: "BUSCAR"
            }

        });

        var table = $('#datatableInclusions').DataTable();

        // Edit record
        table.on('click', '.edit', function () {
            $tr = $(this).closest('tr');
            var data = table.row($tr).data();
            
            ggzi();
            _service.getByID(data[3]);
            selected = data[3];
       
        });

        // Delete a record
        table.on('click', '.remove', function (e) {
            $tr = $(this).closest('tr');
            var data = table.row($tr).data();
            table.row($tr).remove().draw();

            _service.deleteByID(data[3]);

            e.preventDefault();
        });

        //  Activate the tooltips
        $('[rel="tooltip"]').tooltip();

    }
}
