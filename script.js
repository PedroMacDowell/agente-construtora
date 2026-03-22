// =============================================
// CONFIGURAÇÃO — URL DO BACKEND
// Em produção, troque pelo domínio do seu servidor
// Ex: "https://api.meusite.com.br"
// =============================================
const BACKEND_URL = "http://localhost:3001";


const PROMPTS = [

  {
    id: 0,
    label: "Etapa Concluída",
    icon: "✅",
    desc: "Disparado quando o engenheiro marca uma etapa como 'Concluída' no Trello.",
    fields: [
      { id: "nomeCliente",       label: "Nome do Cliente",             placeholder: "João Silva" },
      { id: "nomeObra",          label: "Nome da Obra",                placeholder: "Residência João Silva" },
      { id: "enderecoObra",      label: "Endereço da Obra",            placeholder: "Rua das Flores, 123" },
      { id: "nomeEtapa",         label: "Etapa Concluída",             placeholder: "Alvenaria e Cobertura" },
      { id: "dataConclusao",     label: "Data de Conclusão",           placeholder: "28 de fevereiro de 2025" },
      { id: "proximaEtapa",      label: "Próxima Etapa",               placeholder: "Instalações Elétricas e Hidráulicas" },
      { id: "dataProximaEtapa",  label: "Previsão da Próxima Etapa",   placeholder: "30 de abril de 2025" },
      { id: "percentualObra",    label: "Percentual de Conclusão (%)", placeholder: "62" },
    ],
    system: (construtora) => `Você é o assistente oficial de comunicação da construtora ${construtora}. Seu papel é informar o cliente sobre o andamento de sua obra de forma clara, profissional e objetiva.

REGRAS OBRIGATÓRIAS:
- Nunca revele custos internos, margens, nomes de fornecedores ou dados de outras obras
- Não confirme informações que não estejam explicitamente nos dados fornecidos
- Use sempre tom formal e profissional
- Assine sempre como "Equipe ${construtora}"
- Nunca prometa prazos além dos cadastrados no sistema`,

    user: (f) => `Uma etapa da obra foi concluída. Gere uma mensagem de WhatsApp para o cliente com as seguintes informações:

DADOS DA OBRA:
- Cliente: ${f.nomeCliente}
- Nome da obra: ${f.nomeObra}
- Endereço: ${f.enderecoObra}
- Etapa concluída: ${f.nomeEtapa}
- Data de conclusão: ${f.dataConclusao}
- Próxima etapa prevista: ${f.proximaEtapa}
- Previsão da próxima etapa: ${f.dataProximaEtapa}
- Percentual geral de conclusão da obra: ${f.percentualObra}%

INSTRUÇÕES DE FORMATO:
- Cumprimente o cliente pelo nome
- Informe a etapa concluída com entusiasmo controlado e profissionalismo
- Mencione o percentual atual da obra
- Apresente a próxima etapa e sua previsão
- Convide o cliente a acessar o portal para ver fotos
- Finalize com assinatura da construtora
- Máximo de 5 parágrafos curtos
- Não use asteriscos nem formatação markdown`,
  },

  
  {
    id: 1,
    label: "Boleto Vencendo",
    icon: "🔔",
    desc: "Disparado automaticamente X dias antes do vencimento de uma parcela.",
    fields: [
      { id: "nomeCliente",      label: "Nome do Cliente",           placeholder: "João Silva" },
      { id: "nomeObra",         label: "Nome da Obra",              placeholder: "Residência João Silva" },
      { id: "numeroParcela",    label: "Número da Parcela",         placeholder: "3" },
      { id: "totalParcelas",    label: "Total de Parcelas",         placeholder: "12" },
      { id: "descricaoParcela", label: "Descrição da Parcela",      placeholder: "Instalações Elétricas e Hidráulicas" },
      { id: "valorParcela",     label: "Valor (R$)",                placeholder: "30.000,00" },
      { id: "dataVencimento",   label: "Data de Vencimento",        placeholder: "05 de abril de 2025" },
      { id: "diasVencimento",   label: "Dias até o Vencimento",     placeholder: "5" },
      { id: "linkBoleto",       label: "Link ou Código do Boleto",  placeholder: "https://..." },
    ],
    system: (construtora) => `Você é o assistente oficial de comunicação da construtora ${construtora}. Seu papel é comunicar informações financeiras ao cliente de forma cordial, clara e profissional.

REGRAS OBRIGATÓRIAS:
- Nunca revele o saldo total da obra, custos internos ou margens
- Informe apenas os dados da parcela específica fornecida
- Mantenha tom respeitoso — nunca use linguagem de cobrança agressiva
- Não faça ameaças ou mencione consequências jurídicas
- Assine sempre como "Equipe ${construtora}"`,

    user: (f) => `Um boleto está próximo do vencimento. Gere uma mensagem de WhatsApp de lembrete cordial com as seguintes informações:

DADOS DO BOLETO:
- Cliente: ${f.nomeCliente}
- Nome da obra: ${f.nomeObra}
- Número da parcela: ${f.numeroParcela} de ${f.totalParcelas}
- Descrição da parcela: ${f.descricaoParcela}
- Valor: R$ ${f.valorParcela}
- Data de vencimento: ${f.dataVencimento}
- Dias até o vencimento: ${f.diasVencimento}
- Link ou código do boleto: ${f.linkBoleto}

INSTRUÇÕES DE FORMATO:
- Tom cordial e respeitoso, nunca de cobrança agressiva
- Cumprimente o cliente pelo nome
- Mencione o contexto da obra para personalizar
- Informe valor e data de vencimento claramente
- Disponibilize o link ou código do boleto
- Máximo de 4 parágrafos curtos
- Não use asteriscos nem formatação markdown`,
  },

  
  {
    id: 2,
    label: "Dúvidas do Cliente",
    icon: "💬",
    desc: "Responde dúvidas do cliente em tempo real via WhatsApp ou portal.",
    fields: [
      { id: "nomeCliente",         label: "Nome do Cliente",                placeholder: "João Silva" },
      { id: "listaEtapas",         label: "Etapas da Obra (com status)",     placeholder: "Fundação: Concluída, Alvenaria: Concluída, Elétrica: Em andamento...", type: "textarea" },
      { id: "percentualObra",      label: "Percentual de Conclusão (%)",     placeholder: "66" },
      { id: "dataEntrega",         label: "Prazo Previsto de Entrega",       placeholder: "agosto de 2025" },
      { id: "parcelasPagas",       label: "Parcelas Pagas",                  placeholder: "3 de 12" },
      { id: "proximaParcela",      label: "Próxima Parcela",                 placeholder: "Parcela 4 — R$ 30.000,00" },
      { id: "dataProximaParcela",  label: "Vencimento da Próxima Parcela",   placeholder: "05 de maio de 2025" },
      { id: "percentualPago",      label: "Percentual Financeiro Pago (%)",  placeholder: "30" },
      { id: "mensagemCliente",     label: "Mensagem do Cliente",             placeholder: "Quando começa o acabamento da minha obra?", type: "textarea" },
    ],
    system: (construtora, f) => `Você é o assistente oficial de atendimento ao cliente da construtora ${construtora}.

DADOS DISPONÍVEIS PARA CONSULTA:
- Etapas da obra: ${f.listaEtapas}
- Percentual de conclusão: ${f.percentualObra}%
- Prazo previsto de entrega: ${f.dataEntrega}
- Parcelas pagas: ${f.parcelasPagas}
- Próxima parcela: ${f.proximaParcela} — Vencimento: ${f.dataProximaParcela}
- Percentual financeiro pago: ${f.percentualPago}%

REGRAS ABSOLUTAS — NUNCA VIOLE:
1. NUNCA revele: custos internos, margens, fornecedores, valores a terceiros, dados de outras obras
2. NUNCA confirme informações que não estejam nos dados acima
3. Se não souber, diga: "Vou verificar com a equipe técnica e retornaremos em breve"
4. NUNCA prometa prazos ou valores além dos dados cadastrados
5. Se o cliente estiver insatisfeito, demonstre empatia e ofereça escalar para o responsável
6. Mantenha sempre tom formal e profissional
7. Respostas curtas e objetivas — máximo 3 parágrafos

QUANDO ESCALAR PARA HUMANO:
- Reclamações graves sobre a obra
- Pedidos de alteração de contrato
- Ameaças ou situações jurídicas
- Qualquer dúvida que não possa responder com os dados disponíveis`,

    user: (f) => `O cliente ${f.nomeCliente} enviou a seguinte mensagem:

"${f.mensagemCliente}"

Responda de forma profissional, cordial e objetiva com base apenas nos dados disponíveis. Não use asteriscos nem formatação markdown.`,
  },

  
  {
    id: 3,
    label: "Atraso de Etapa",
    icon: "⚠️",
    desc: "Disparado quando uma etapa ultrapassa a data prevista sem ser concluída.",
    fields: [
      { id: "nomeCliente",        label: "Nome do Cliente",                   placeholder: "João Silva" },
      { id: "nomeObra",           label: "Nome da Obra",                      placeholder: "Residência João Silva" },
      { id: "enderecoObra",       label: "Endereço da Obra",                  placeholder: "Rua das Flores, 123" },
      { id: "nomeEtapa",          label: "Etapa Atrasada",                    placeholder: "Instalações Elétricas e Hidráulicas" },
      { id: "dataOriginal",       label: "Data Original Prevista",            placeholder: "30 de abril de 2025" },
      { id: "novaData",           label: "Nova Data Prevista",                placeholder: "15 de maio de 2025" },
      { id: "diasAtraso",         label: "Dias de Atraso",                    placeholder: "15" },
      { id: "motivoAtraso",       label: "Motivo Aprovado para Comunicação",  placeholder: "Chuvas intensas das últimas semanas" },
      { id: "impactoPrazoFinal",  label: "Impacto no Prazo Final",            placeholder: "Atraso de 15 dias; entrega prevista atualizada para setembro de 2025" },
    ],
    system: (construtora) => `Você é o assistente oficial de comunicação da construtora ${construtora}. Seu papel é comunicar situações de atraso ao cliente com transparência, empatia e profissionalismo.

REGRAS OBRIGATÓRIAS:
- Nunca revele motivos internos sensíveis (problemas com fornecedor, erros de planejamento, questões financeiras internas)
- Use apenas o motivo aprovado fornecido nos dados
- Mantenha tom empático mas confiante — nunca dramático
- Reforce o compromisso da construtora com a qualidade e a entrega
- Assine sempre como "Equipe ${construtora}"`,

    user: (f) => `Uma etapa da obra está atrasada. Gere uma mensagem de comunicação proativa ao cliente:

DADOS DO ATRASO:
- Cliente: ${f.nomeCliente}
- Nome da obra: ${f.nomeObra}
- Endereço: ${f.enderecoObra}
- Etapa atrasada: ${f.nomeEtapa}
- Data original prevista: ${f.dataOriginal}
- Nova data prevista: ${f.novaData}
- Dias de atraso: ${f.diasAtraso}
- Motivo aprovado para comunicação: ${f.motivoAtraso}
- Impacto no prazo final de entrega: ${f.impactoPrazoFinal}

INSTRUÇÕES DE FORMATO:
- Seja proativo — comunique antes que o cliente perceba
- Demonstre empatia sem ser excessivamente apologético
- Explique o motivo de forma simples e honesta
- Informe a nova data com clareza
- Reforce o compromisso com a qualidade
- Máximo de 5 parágrafos curtos
- Não use asteriscos nem formatação markdown`,
  },


  {
    id: 4,
    label: "Entrega Final",
    icon: "🎉",
    desc: "Disparado quando todas as etapas são marcadas como concluídas no Trello.",
    fields: [
      { id: "nomeCliente",          label: "Nome do Cliente",              placeholder: "João Silva" },
      { id: "nomeObra",             label: "Nome da Obra",                 placeholder: "Residência João Silva" },
      { id: "enderecoObra",         label: "Endereço da Obra",             placeholder: "Rua das Flores, 123" },
      { id: "dataConclusao",        label: "Data de Conclusão",            placeholder: "10 de agosto de 2025" },
      { id: "dataVistoria",         label: "Data Agendada para Vistoria",  placeholder: "15 de agosto de 2025" },
      { id: "horarioVistoria",      label: "Horário da Vistoria",          placeholder: "10h00" },
      { id: "responsavelVistoria",  label: "Responsável pela Vistoria",    placeholder: "Eng. Carlos Oliveira" },
      { id: "linkPassaporte",       label: "Link do Passaporte Digital",   placeholder: "https://..." },
      { id: "proximosPassos",       label: "Próximos Passos Formais",      placeholder: "Assinatura do Termo de Entrega e entrega das chaves" },
    ],
    system: (construtora) => `Você é o assistente oficial de comunicação da construtora ${construtora}. Seu papel é comunicar a conclusão da obra com celebração profissional e preparar o cliente para a vistoria.

REGRAS OBRIGATÓRIAS:
- Tom celebrativo, mas mantendo o profissionalismo
- Inclua todas as informações de entrega e vistoria fornecidas
- Prepare o cliente para os próximos passos formais
- Assine sempre como "Equipe ${construtora}"`,

    user: (f) => `A obra foi concluída. Gere a mensagem de entrega final com as seguintes informações:

DADOS DA ENTREGA:
- Cliente: ${f.nomeCliente}
- Nome da obra: ${f.nomeObra}
- Endereço: ${f.enderecoObra}
- Data de conclusão: ${f.dataConclusao}
- Data agendada para vistoria: ${f.dataVistoria}
- Horário da vistoria: ${f.horarioVistoria}
- Responsável pela vistoria: ${f.responsavelVistoria}
- Link do passaporte digital da obra: ${f.linkPassaporte}
- Próximos passos formais: ${f.proximosPassos}

INSTRUÇÕES DE FORMATO:
- Abra com celebração contida e profissional
- Confirme data e horário da vistoria
- Apresente o passaporte digital da obra
- Oriente sobre os próximos passos
- Convide para pesquisa de satisfação
- Máximo de 6 parágrafos curtos
- Não use asteriscos nem formatação markdown`,
  },

  
  {
    id: 5,
    label: "Resumo Semanal",
    icon: "📊",
    desc: "Disparado automaticamente toda sexta-feira para cada obra ativa.",
    fields: [
      { id: "nomeCliente",              label: "Nome do Cliente",                 placeholder: "João Silva" },
      { id: "nomeObra",                 label: "Nome da Obra",                    placeholder: "Residência João Silva" },
      { id: "enderecoObra",             label: "Endereço da Obra",                placeholder: "Rua das Flores, 123" },
      { id: "dataInicioSemana",         label: "Início da Semana",                placeholder: "17 de março de 2025" },
      { id: "dataFimSemana",            label: "Fim da Semana",                   placeholder: "21 de março de 2025" },
      { id: "etapasConcluidasSemana",   label: "Etapas Concluídas na Semana",     placeholder: "Instalação da rede hidráulica do térreo" },
      { id: "etapaAtual",               label: "Etapa em Andamento Atual",        placeholder: "Cabeamento elétrico" },
      { id: "percentualObra",           label: "Percentual Atual (%)",            placeholder: "66" },
      { id: "percentualSemanaAnterior", label: "Percentual Semana Anterior (%)",  placeholder: "62" },
      { id: "evolucaoPercentual",       label: "Evolução da Semana (%)",          placeholder: "4" },
      { id: "proximosMarcos",           label: "Próximos Marcos Importantes",     placeholder: "Conclusão do cabeamento e início das instalações do 1º pavimento" },
      { id: "statusPrazo",              label: "Status do Prazo",                 placeholder: "Dentro do cronograma" },
      { id: "observacaoSemana",         label: "Observação da Semana",            placeholder: "Sem intercorrências" },
    ],
    system: (construtora) => `Você é o assistente oficial de comunicação da construtora ${construtora}. Gere resumos semanais claros, objetivos e encorajadores.

REGRAS OBRIGATÓRIAS:
- Nunca revele custos internos, margens ou dados de outras obras
- Informe apenas o que consta nos dados fornecidos
- Tom positivo mas honesto — não omita atrasos, comunique-os com transparência
- Se não houve evolução na semana, informe respeitosamente com justificativa
- Assine sempre como "Equipe ${construtora}"`,

    user: (f) => `Gere o resumo semanal da obra com as seguintes informações:

DADOS DA SEMANA:
- Cliente: ${f.nomeCliente}
- Nome da obra: ${f.nomeObra}
- Endereço: ${f.enderecoObra}
- Semana de referência: ${f.dataInicioSemana} a ${f.dataFimSemana}
- Etapas concluídas na semana: ${f.etapasConcluidasSemana}
- Etapa em andamento atual: ${f.etapaAtual}
- Percentual de conclusão atual: ${f.percentualObra}%
- Percentual na semana anterior: ${f.percentualSemanaAnterior}%
- Evolução da semana: ${f.evolucaoPercentual}%
- Próximos marcos importantes: ${f.proximosMarcos}
- Status do prazo: ${f.statusPrazo}
- Observação da semana: ${f.observacaoSemana}

INSTRUÇÕES DE FORMATO:
- Abra com saudação e referência à semana
- Resuma o que aconteceu de forma objetiva
- Mostre a evolução em percentual
- Apresente o que vem na próxima semana
- Informe o status do prazo
- Máximo de 5 parágrafos curtos
- Finalize convidando para acessar o portal
- Não use asteriscos nem formatação markdown`,
  },
];


let currentPromptIndex = 0;
let lastMessage = '';


function selectPrompt(index) {
  currentPromptIndex = index;
  document.querySelectorAll('.prompt-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });
  renderForm();
  clearOutput();
}


function renderForm() {
  const prompt = PROMPTS[currentPromptIndex];
  const panel  = document.getElementById('formPanel');

  let html = `
    <div>
      <div class="panel-title">${prompt.icon} ${prompt.label}</div>
      <div class="panel-desc">${prompt.desc}</div>
    </div>
    <div class="divider"></div>
    <div class="section-header">Dados da Mensagem</div>
  `;

  prompt.fields.forEach(field => {
    if (field.type === 'textarea') {
      html += `
        <div class="field-group">
          <label>${field.label}</label>
          <textarea id="field_${field.id}" placeholder="${field.placeholder}"></textarea>
        </div>`;
    } else {
      html += `
        <div class="field-group">
          <label>${field.label}</label>
          <input type="text" id="field_${field.id}" placeholder="${field.placeholder}">
        </div>`;
    }
  });

  html += `
    <button class="generate-btn" id="generateBtn" onclick="generate()">
      <span>✨</span> Gerar Mensagem
    </button>`;

  panel.innerHTML = html;
}


function getFieldValues() {
  const prompt = PROMPTS[currentPromptIndex];
  const values = {};
  prompt.fields.forEach(field => {
    const el = document.getElementById('field_' + field.id);
    values[field.id] = el ? el.value.trim() : '';
  });
  return values;
}


function clearOutput() {
  lastMessage = '';
  document.getElementById('copyBtn').style.display = 'none';
  document.getElementById('outputBody').innerHTML = `
    <div class="empty-state">
      <div class="big-icon">✉️</div>
      <p>Preencha os dados e clique em Gerar Mensagem</p>
    </div>`;
}



async function generate() {
  const construtora = document.getElementById('nomeConstrutora').value.trim() || 'sua construtora';
  const fields      = getFieldValues();
  const prompt      = PROMPTS[currentPromptIndex];
  const btn         = document.getElementById('generateBtn');

  
  btn.disabled = true;
  document.getElementById('copyBtn').style.display = 'none';
  document.getElementById('outputBody').innerHTML = `
    <div class="loading-dots">
      <span></span><span></span><span></span>
    </div>`;

  const systemPrompt = typeof prompt.system === 'function'
    ? prompt.system(construtora, fields)
    : prompt.system;

  const userPrompt = typeof prompt.user === 'function'
    ? prompt.user(fields, construtora)
    : prompt.user;

  try {
    
    const response = await fetch(`${BACKEND_URL}/api/gerar-mensagem`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ systemPrompt, userPrompt }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erro desconhecido no servidor.");
    }

    lastMessage = data.message;

    document.getElementById('outputBody').innerHTML = `
      <div class="message-card">
        <div class="message-type-badge">${prompt.icon} ${prompt.label}</div>
        <div class="message-text">${escapeHtml(data.message)}</div>
      </div>`;

    document.getElementById('copyBtn').style.display = 'flex';

  } catch (error) {
    console.error("Erro:", error);
    document.getElementById('outputBody').innerHTML = `
      <div class="empty-state">
        <div class="big-icon">❌</div>
        <p>${escapeHtml(error.message || "Erro ao conectar com o servidor.")}</p>
      </div>`;
  }

  btn.disabled = false;
}


async function copyMessage() {
  if (!lastMessage) return;
  await navigator.clipboard.writeText(lastMessage);

  const btn = document.getElementById('copyBtn');
  btn.textContent = '✅ Copiado!';
  btn.classList.add('copied');

  setTimeout(() => {
    btn.innerHTML = '📋 Copiar';
    btn.classList.remove('copied');
  }, 2000);
}


function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}


renderForm();