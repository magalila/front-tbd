document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('.button.is-primary'); 
    const loginForm = document.createElement('div'); 
    loginForm.innerHTML = `
        <div id="loginForm" class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-content box">
                <button class="delete is-pulled-right" id="closeButton"></button>
                <form>
                    <div class="field">
                        <label class="label">User</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="User">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input class="input" type="password" placeholder="Password">
                        </div>
                    </div>
                    <div class="field">
                        <div class="control has-text-centered">
                            <button class="button is-primary">Sign in</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;
    loginButton.addEventListener('click', function() {
        document.body.appendChild(loginForm); 
        const closeButton = document.getElementById('closeButton');
        closeButton.addEventListener('click', function() {
            document.body.removeChild(loginForm); 
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const certificadosLink = document.getElementById('certificados-link');
    const contentDiv = document.getElementById('content');

    certificadosLink.addEventListener('click', function() {
        contentDiv.innerHTML = `
            <div class="box">
            <button class="delete is-pulled-right" id="closeButtonCertificado"></button>
                <h2 class="title is-4">Selecciona el mes y año</h2>
                <div class="field">
                    <label class="label">Mes</label>
                    <div class="control">
                        <div class="select">
                            <select id="month-select">
                                <option value="01">Enero</option>
                                <option value="02">Febrero</option>
                                <option value="03">Marzo</option>
                                <option value="04">Abril</option>
                                <option value="05">Mayo</option>
                                <option value="06">Junio</option>
                                <option value="07">Julio</option>
                                <option value="08">Agosto</option>
                                <option value="09">Septiembre</option>
                                <option value="10">Octubre</option>
                                <option value="11">Noviembre</option>
                                <option value="12">Diciembre</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Año</label>
                    <div class="control">
                        <input class="input" type="number" id="year-input" placeholder="Año">
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button class="button is-primary" id="fetch-data-button">Buscar</button>
                    </div>
                </div>
                <div id="result-container" class="mt-5"></div>
            </div>
        `;

        document.getElementById('fetch-data-button').addEventListener('click', function() {
            const month = document.getElementById('month-select').value;
            const year = document.getElementById('year-input').value;
            fetchDataForMonthYear(month, year);
        });
        const closeButtonCertificado = document.getElementById('closeButtonCertificado');
        closeButtonCertificado.addEventListener('click', function() {
            contentDiv.innerHTML = '';
        });
    });

    function fetchDataForMonthYear(month, year) {
        const exampleData = [
            {
                trabajo: "Reparación de tuberías",
                usuario: "Juan Pérez",
                numeroConexion: "12345",
                duracion: "2 dias",
                costoTotal: "$100",
                detalles: {
                    manoObra: "$50",
                    materiales: [
                        { material: "Tubería", cantidad: 2, precio: "$20", subtotal: "$40" },
                        { material: "Cemento", cantidad: 1, precio: "$10", subtotal: "$10" }
                    ]
                }
                
            },
            {
                trabajo: "mamposteria",
                usuario: "Rodrigo",
                numeroConexion: "1dsfgs45",
                duracion: "3 dias",
                costoTotal: "$100",
                detalles: {
                    manoObra: "$50",
                    materiales: [
                        { material: "Tubería", cantidad: 2, precio: "$20", subtotal: "$40" },
                        { material: "Cemento", cantidad: 1, precio: "$10", subtotal: "$10" }
                    ]
                }
                
            }
        ];
      
        displayData(exampleData);
    }

    function displayData(data) {
        const resultContainer = document.getElementById('result-container');
        resultContainer.innerHTML = '<h1 class="m-2 is-4"> <strong>TRABAJOS REALIZADOS</strong></h1>';

        data.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('box', 'mb-3');
            itemDiv.innerHTML = `
                
                <h3 class="title is-5">${item.trabajo}</h3>
                <p><strong>Usuario:</strong> ${item.usuario}</p>
                <p><strong>Número de Conexión:</strong> ${item.numeroConexion}</p>
                <p><strong>Duración:</strong> ${item.duracion}</p>
                <p><strong>Costo Total:</strong> ${item.costoTotal}</p>
                <button class="button is-link m-2" id="details-button-${index}">Ver detalles</button>
                <button class="button is-link m-2" id="tareas-button-${index}">Tareas realizadas</button>
                <div id="details-${index}" class="mt-3" style="display: none;">
                    <h1 class="mt-2 mb-2"><strong>PRESUPUESTO:</strong></h1>
                    <p><strong>Costo de la Mano de Obra:</strong> ${item.detalles.manoObra}</p>
                    <p class="mt-2 md-2"><strong>Materiales utilizados:</strong> </p>
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>Material</th>
                                <th>Cantidad</th>
                                <th>Precio por Unidad</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${item.detalles.materiales.map(mat => `
                                <tr>
                                    <td>${mat.material}</td>
                                    <td>${mat.cantidad}</td>
                                    <td>${mat.precio}</td>
                                    <td>${mat.subtotal}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="3">Total</th>
                                <th>${item.detalles.materiales.reduce((acc, mat) => acc + parseFloat(mat.subtotal.slice(1)), 0)}</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            `;
            resultContainer.appendChild(itemDiv);

            document.getElementById(`details-button-${index}`).addEventListener('click', function() {
                const detailsDiv = document.getElementById(`details-${index}`);
                detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';
            });
        });
    }
});
