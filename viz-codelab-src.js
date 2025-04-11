function drawViz(data) {
    // Remove previous accordion if it exists
    const existingAccordion = document.getElementById('accordion');
    if (existingAccordion) {
        existingAccordion.remove();
    }

    // Container setup.
    let container = document.getElementById('container');
    if (container) {
        container.textContent = '';
    } else {
        container = document.createElement('div');
        container.id = 'container';
        document.body.appendChild(container);
    }

    let dataReceived = [];

    data.tables.DEFAULT.rows.forEach(function (row) {
        dataReceived.push({
            "programa_governo": row[0],
            "empreendimento": row[1],
            "modalidade": row[2],
            "programa": row[3],
            "qtd_uh_entregue": row[4],
            "qtd_uh_concluido": row[5],
            "qtd_uh_licitacao": row[6],
            "qtd_uh_producao": row[7],
            "qtd_uh_planejamento": row[8],
            "data_previsao_entrega": row[9]
        });
    });

    let dataFinal = manipulateData(dataReceived);
    createAccordion(dataFinal);
}


function manipulateData(baseData) {

    const entregue = [];
    const concluido = [];
    const licitacao = [];
    const producao = [];
    const planejamento = [];
    
    // Organiza os dados extraídos em arrays separados
    baseData.forEach(obj => {
        if (obj.qtd_uh_entregue > 0) entregue.push(obj);
        if (obj.qtd_uh_concluido > 0) concluido.push(obj);
        if (obj.qtd_uh_licitacao > 0) licitacao.push(obj);
        if (obj.qtd_uh_producao > 0) producao.push(obj);
        if (obj.qtd_uh_planejamento > 0) planejamento.push(obj);
    });

    // Cria um array com os dados organizados
    const scrapedContent = [];
    scrapedContent.push(
        { name: "entregue", data: entregue },
        { name: "concluido", data: concluido },
        { name: "licitacao", data: licitacao },
        { name: "producao", data: producao },
        { name: "planejamento", data: planejamento }
    );

    return scrapedContent;
}

function createAccordion(data) {
    

    // Cria o elemento accordion
    const accordionGroup = document.createElement('section');
    accordionGroup.className = 'accordion-group';
    accordionGroup.id = 'accordion';
    accordionGroup.dataset.hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Cria os detalhes do accordion de acordo aos dados de cada grupo
    data.forEach((content, index) => {
        if(content.data.length === 0) return;
        const details = document.createElement('details');
        details.className = 'accordion-item';

        // Cria o cabeçalho do accordion
        const summary = document.createElement('summary');
        summary.className = `accordion-summary ${content.name}`;
        summary.innerHTML = `
            <span>${content.name.charAt(0).toUpperCase() + content.name.slice(1)}</span>
            <svg class="accordion-icon" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" />
            </svg>
        `;

        // Cria o conteúdo do accordion
        const entryContent = content.data.map((item) => {
            return `
            <p>
            <strong>Programa:</strong> ${item.programa}<br>
            <strong>Empreendimento:</strong> ${item.empreendimento}<br>
            <strong>Modalidade:</strong> ${item.modalidade}<br>
            <strong>Tipo de Atendimento:</strong> ${item.programa_governo}<br>
            <strong>UHS:</strong> ${item['qtd_uh_' + content.name]}<br>
            <strong>Data Previsão de Entrega:</strong> ${item.data_previsao_entrega}<br>
            </p>
            `;

        }).join('');

        const contentDiv = document.createElement('div');
        contentDiv.className = 'accordion-content';
        const entryDiv = document.createElement('div');
        entryDiv.className = 'accordion-entry';
        entryDiv.innerHTML = entryContent;
        contentDiv.appendChild(entryDiv);

        details.appendChild(summary);
        details.appendChild(contentDiv);
        accordionGroup.appendChild(details);
    });

    container.appendChild(accordionGroup);

    // Adiciona funcionalidade de toggle para o accordion
    container.querySelectorAll('#accordion details').forEach((detail) => {
        detail.addEventListener('toggle', function () {
            if (this.open) {
                container.querySelectorAll('#accordion details').forEach((el) => {
                    if (el !== this) el.removeAttribute('open');
                });
            }
        });
    });
}

// Subscribe to data and style changes. Use the table format for data.
dscc.subscribeToData(drawViz, { transform: dscc.tableTransform });