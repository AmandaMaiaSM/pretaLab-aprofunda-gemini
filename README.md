# pretaLab Aprofunda Gemini 

# Função `helloGCS` no Google Cloud

## Descrição
A Cloud Function no Google Cloud que processa eventos disparados pela adição de arquivos em um bucket do Google Cloud Storage. A função utiliza o modelo generativo **Gemini** do Vertex AI para descrever imagens.

---

## Pré-requisitos

Antes de implantar a função, certifique-se de:

1. **Configurar um projeto no Google Cloud**:
   - Crie um projeto ou use um existente.
   - Configure o `project ID` no código.

2. **Habilitar APIs necessárias**:
   - Acesse o Console do Google Cloud e habilite:
     - **Cloud Functions**
     - **Cloud Storage**
     - **Vertex AI**

3. **Criar um Bucket no Cloud Storage**:
   - Crie um bucket para armazenar os arquivos que disparam a função.

4. **Instalar as bibliotecas necessárias**:
   - Execute o comando abaixo para instalar as dependências:


---

## Estrutura do Código

- **Bibliotecas Importadas**:
  - `@google-cloud/functions-framework` para registrar a função.
  - `@google-cloud/storage` para interagir com o Google Cloud Storage.
  - `@google-cloud/vertexai` para interagir com o Vertex AI.

- **Configurações do Projeto**:
  - `project`: ID do projeto no Google Cloud.
  - `location`: Região onde a função e o modelo estão configurados.
  - `modelName`: Nome do modelo generativo.

- **Funcionamento**:
  - A função é acionada quando um arquivo é adicionado ao bucket.
  - Faz o download do arquivo e utiliza o modelo Gemini para gerar uma descrição da imagem.
  - Logs detalhados ajudam a monitorar o fluxo.

---


## Funcionamento da Função

1. A função é acionada automaticamente quando um arquivo é adicionado ao bucket especificado.
2. A função realiza as seguintes operações:
   - Faz o download do arquivo do bucket.
   - Prepara a requisição para o modelo generativo **Gemini**.
   - Gera uma descrição da imagem utilizando o modelo.
   - Agrega e exibe a resposta no log.

---
---

## Erros Comuns e Soluções

1. **Permissões Insuficientes**:
   - Certifique-se de que o serviço da Cloud Function tem permissões para acessar o bucket e o Vertex AI.

2. **Erro no Download do Arquivo**:
   - Verifique se o arquivo existe no bucket e se o nome está correto.

3. **Erro no Modelo Generativo**:
   - Confirme que o modelo especificado está disponível no Vertex AI.
     
4. **Observações**:
   - Certifique-se que você tem as permissões ideais em sua conta de serviço para cloud run, storage e vertexai.

---

## descrição de fato 
### foto teste
![Captura-de-tela-2025-01-01-150847](https://github.com/user-attachments/assets/2213eae4-3280-4b17-a226-f7a0119fc246)

### Rodando 
![01](https://github.com/user-attachments/assets/e5e74f6b-e83d-4eba-ab9d-0c3898f643f0)

### Analise da foto 
![02](https://github.com/user-attachments/assets/804d90da-1da1-49eb-9ecc-b208395771dc)


