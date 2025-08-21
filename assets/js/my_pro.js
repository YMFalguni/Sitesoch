
            document.addEventListener('DOMContentLoaded', function () {
                var profileTabs = new bootstrap.Tab(document.querySelector('#profileTabs a[data-bs-toggle="pill"].active'));

                // Handle tab clicks to show/hide content
                document.querySelectorAll('#profileTabs a[data-bs-toggle="pill"]').forEach(function (tab) {
                    tab.addEventListener('click', function (event) {
                        event.preventDefault(); // Prevent default link behavior

                        // Hide all tab panes
                        document.querySelectorAll('.tab-pane').forEach(function (pane) {
                            pane.classList.remove('show', 'active');
                        });

                        // Show the target tab pane
                        var targetId = tab.getAttribute('href');
                        document.querySelector(targetId).classList.add('show', 'active');

                        // Update active state of nav-link (Bootstrap 5 already handles this if data-bs-toggle="pill" is used correctly)
                        // This manual step is usually not needed with Bootstrap's built-in tab functionality
                        // document.querySelectorAll('#profileTabs .nav-link').forEach(function(navLink) {
                        //     navLink.classList.remove('active');
                        // });
                        // tab.classList.add('active');
                    });
                });

                // Initialize date pickers
                $('.date-picker').datepicker({
                    format: 'yyyy-mm-dd',
                    autoclose: true,
                    todayHighlight: true
                });

                // Function to add a new row (example for Work Experience, can be adapted for others)
                document.querySelectorAll('.add-row-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const tableBody = this.closest('tbody');
                        const newRow = tableBody.querySelector('.input-row').cloneNode(true);

                        // Clear input values in the new row
                        newRow.querySelectorAll('input, textarea').forEach(input => {
                            input.value = '';
                        });

                        // Change the button to delete button
                        const actionCell = newRow.querySelector('td:last-child');
                        actionCell.innerHTML = `
                            <button class="btn btn-icon btn-outline-secondary me-2 edit-row-btn">
                                <i class="bx bx-edit"></i>
                            </button>
                            <button class="btn btn-icon btn-outline-danger delete-row-btn">
                                <i class="bx bx-trash"></i>
                            </button>
                        `;

                        // Add event listener for the new delete button
                        actionCell.querySelector('.delete-row-btn').addEventListener('click', function() {
                            this.closest('tr').remove();
                        });

                        // Add event listener for the new edit button (if functionality is needed)
                        actionCell.querySelector('.edit-row-btn').addEventListener('click', function() {
                             alert('Edit functionality can be implemented here.');
                        });

                        // Insert the new row before the first data row (after the input row)
                        // Find the first non-input row to insert before it, or append if none
                        let firstDataRow = tableBody.querySelector('tr:not(.input-row):not(:first-child)');
                        if (firstDataRow) {
                            tableBody.insertBefore(newRow, firstDataRow);
                        } else {
                            // If only the input row exists, insert after it
                            tableBody.appendChild(newRow);
                        }

                         // Re-initialize datepicker for new row's date inputs
                         $(newRow).find('.date-picker').datepicker({
                            format: 'yyyy-mm-dd',
                            autoclose: true,
                            todayHighlight: true
                        });
                    });
                });

                // Add event listeners for existing delete buttons
                document.querySelectorAll('.delete-row-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        this.closest('tr').remove();
                    });
                });
            });
        