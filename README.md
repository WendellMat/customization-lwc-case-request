# 🧪 Testando Funcionalidades – Perfil Dev | TechCareSupport

Este guia foi elaborado para facilitar o teste das implementações desenvolvidas na trilha **Dev** do Desafio TechCare. Abaixo, você encontrará as instruções detalhadas para verificar o correto funcionamento dos recursos implementados via Apex, Lightning Web Components (LWC) e APIs.

---

## ⚙️ 1. Testando o Apex Trigger + Handler

### Objetivo:
Criar um histórico automático sempre que o status de um Case Request for alterado para **Closed**, verificando se o SLA foi cumprido.

### Passos:

1. Crie um novo registro `Case_Request__c`.
2. Garanta que o campo `SLA_Deadline__c` esteja preenchido com uma data futura ou passada, conforme o teste desejado.
3. Altere o campo `Status__c` para **Closed**.
4. Verifique:
   - Se o campo `SLA_Match__c` (ou SLA_Met__c) foi marcado corretamente (true ou false).
   - Se um novo registro foi criado no objeto **Case_History__c**, relacionado ao `Case_Request__c`.
   - O campo `Time_Closed__c` deve estar preenchido com a data/hora de fechamento.
   - O campo `SLA_Met__c` deve refletir corretamente o cumprimento do SLA.

> 💡 Feche e reabra o mesmo caso para validar a criação de múltiplos registros em **Case_History__c**.

---

## ✅ 2. Executando a Classe de Teste

### Objetivo:
Garantir cobertura de código superior a 90% para a Trigger e Handler.

### Passos:

1. Acesse o menu **Apex Test Execution**.
2. Execute a classe `TestSLACaseRequest`.
3. Verifique:
   - Se a cobertura das classes `SLACaseRequest` e `SLACaseRequestHandler` está em 100%.
   - Os cenários de SLA cumprido e não cumprido foram devidamente validados.
4. Em caso de falha:
   - Certifique-se de que o campo `Is Test` esteja presente e corretamente usado para evitar a execução do Flow real.

---

## 🖥️ 3. Testando o Componente LWC – SLA Countdown + Reabrir Caso

### countdownDeadlineComponent

1. Acesse a página de um **Case_Request__c** com `SLA_Deadline__c` preenchido.
2. Verifique se o componente exibe a contagem regressiva corretamente.
3. Quando o tempo expirar, a mensagem **“The SLA Deadline Lapsed”** deve ser exibida.

### CreateReOpenButton + Método Apex

1. Acesse um **Case Request** com `Status__c = Closed`.
2. Clique no botão **“Reabrir Caso”** (visível apenas para perfis Support Premium).
3. Verifique se o `Status__c` foi alterado para **In Progress**.
4. A alteração é feita via chamada ao método Apex `ReopenCaseRequest`.

> ℹ️ O botão foi inserido via Dynamic Forms e respeita regras de visibilidade baseadas em perfil.

---

## 🌐 4. Testando o Endpoint REST (Avançado)

### Objetivo:
Consultar, via API, o `Status__c` e `SLA_Met__c` de um Case Request.

### Passos:

1. Obtenha o ID de um `Case_Request__c` existente.
2. Realize uma requisição GET para: /services/apexrest/CasesRequests/{Id}

### 🔧 Teste usando Workbench:

1. Acesse: `Utilities > REST Explorer`
2. No campo **Endpoint**, insira: /services/apexrest/CasesRequests/{Id}
3. Selecione o método: `GET`
4. Clique em **Execute**
5. Valide o retorno no painel de resposta
