// Importa bibliotecas do Google Cloud necessárias para a função

const functions = require('@google-cloud/functions-framework');
const { Storage } = require('@google-cloud/storage');
const { VertexAI } = require('@google-cloud/vertexai');

// Configurações iniciais do projeto
const project = 'noble-anvil-439219-a9';
const location = 'us-central1';
const modelName = 'gemini-1.5-flash-002';

// Inicializa o cliente do Cloud Storage
const storage = new Storage();
const vertexAI = new VertexAI({ project, location });

// Configura o modelo generativo
const generativeModel = vertexAI.preview.getGenerativeModel({
  model: modelName,
  generationConfig: {
    maxOutputTokens: 8192,
    temperature: 1,
    topP: 0.95,
  },

  // Configurações de segurança para o modelo, desativando filtros de conteúdo
  safetySettings: [
    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'OFF' },
    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'OFF' },
    { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'OFF' },
    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'OFF' },
  ],
});

// Registra a função CloudEvent
functions.cloudEvent('helloGCS', async (cloudEvent) => {
  const file = cloudEvent.data;

  // Loga informações sobre o evento recebido
  console.log(`Event ID: ${cloudEvent.id}`);
  console.log(`Event Type: ${cloudEvent.type}`);
  console.log(`Bucket: ${file.bucket}`);
  console.log(`File: ${file.name}`);
  console.log(`Metageneration: ${file.metageneration}`);
  console.log(`Created: ${file.timeCreated}`);
  console.log(`Updated: ${file.updated}`);

  try {
    // Baixa a imagem do bucket de armazenamento do Google Cloud
    const [imageBuffer] = await storage.bucket(file.bucket).file(file.name).download();
    console.log(`Imagem baixada com sucesso: ${file.name}`);

     // Cria a requisição para o modelo, contendo um prompt de texto e a imagem
    const imageInlineData = {
      inlineData: {
        mimeType: 'image/jpeg', // Ajuste conforme o tipo de imagem
        data: imageBuffer.toString('base64'), // Converte o buffer para base64
      },
    };

    const request = {
      contents: [
        { role: 'user', parts: [{ text: 'Describe this image in portuguese' }, imageInlineData] },
      ],
    };

    // Envia a requisição ao modelo generativo Gemini e processa a resposta em tempo real
    const streamingResp = await generativeModel.generateContentStream(request);

    console.log('Resposta do Gemini:');
    for await (const item of streamingResp.stream) {
      console.log('Chunk recebido: ', JSON.stringify(item));
    }
    // Consolida todos os chunks recebidos em uma resposta final agregada
    const aggregatedResponse = await streamingResp.response;
    console.log('Resposta agregada:', JSON.stringify(aggregatedResponse, null, 2));
    
  } catch (error) {
    console.error('Erro durante o processamento:', error);
  }
});