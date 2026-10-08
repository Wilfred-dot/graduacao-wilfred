/* =====================================================================
   CONFIGURAÇÃO DO CONVITE — edita só este ficheiro
   (hora, local, contactos, textos, programa, jornada)
   ===================================================================== */
window.CONFIG = {

  /* ---- DATA E HORA (hora de Moçambique, +02:00) ----
     Para mudar a hora da festa, altera só esta linha.
     Exemplo: 14h30 -> "2026-10-17T14:30:00+02:00"
     A contagem, o programa, o calendário e os lembretes seguem esta hora. */
  dataFesta: "2026-10-17T13:00:00+02:00",
  prazoRsvp: "2026-10-12T23:59:00+02:00",   // prazo para confirmar presença

  /* ---- QUEM ---- */
  nome: "Wilfred Deloviar Junior",
  nomeCurto: "Wilfred",
  curso: "Licenciatura em Tecnologia de Informação (TI)",
  universidade: "Universidade Católica de Moçambique",
  faculdade: "Faculdade de Economia & Gestão",
  tituloLinha1: "Convite de Graduação",
  tituloLinha2: "da Licenciatura de",
  anos: "2022 – 2026",

  /* ---- LOCAL (por ordem: do mais geral ao destino) ---- */
  localRota: [
    { titulo: "Bairro do Aeroporto" },
    { titulo: "Entrada de Machute" },
    { titulo: "Casa da Célia", detalhe: "Residência Vilanculos" }
  ],
  /* ---- MAPA ----
     O botão abre a app de mapas do telemóvel (Android: Google Maps ou a
     app escolhida; iPhone: Mapas). Não pede login nem descarrega nada.
     Quando tiveres a localização exacta, preenche lat e lng (ex.: -19.8436 e 34.8389).
     Para ver as coordenadas: no Google Maps, carrega e segura no local e copia os números. */
  mapa: {
    nome: "Casa da Célia",
    consulta: "Bairro do Aeroporto, Beira, Moçambique",
    linkApple: "https://maps.apple/p/PQ0Y7JXAma9qGS",   // local exacto (iPhone)
    lat: null,
    lng: null
  },
  
  /* ---- CONTACTOS (só números, sem +258) ---- */
  whatsappRsvp: "258850351131",            // recebe as confirmações
  contactosDirecao: [                      // para chegar à casa (lado a lado, por esta ordem)
    { nome: "Célia", numero: "860466777" },
    { nome: "Ita",   numero: "875112320" }
  ],
  contactosDuvidas: [                      // para dúvidas
    { nome: "Wilfred", etiqueta: "Vodacom", numero: "850351131" },
    { nome: "Wilfred", etiqueta: "Movitel", numero: "868991785" }
  ],

  /* ---- PRESENTE ---- */
  presente: {
    titular: "Wilfred Deloviar Junior",
    mpesa: "850351131",
    emola: "868991785"
  },

  /* ---- TEXTOS ----
     Mudam sozinhos conforme o convidado:
       {convidar}  -> "vos convidar" (com &)  |  "convidá-lo(a)" (um convidado)
       {Confirma}  -> "Confirmem"    (com &)  |  "Confirme"
       {tua}       -> "vossa"        (com &)  |  "sua"
       {voce}      -> "vocês"        (com &)  |  "você"                    */
  abertura: "Após quatro anos de dedicação e um ano de monografia e defesa, concluí a minha licenciatura. Com gratidão a Deus e à minha família, tenho a honra de {convidar} para partilhar comigo a alegria desta conquista.",
  agradecimento: "Agradeço a Deus, à minha família, aos docentes e aos amigos que caminharam comigo até aqui.",
  presenteTexto: "Os presentes são bem-vindos e serão recebidos com muito carinho.",
  presenteFisicoTitulo: "Presente físico",
  presenteFisicoTexto: "Entregue em mão no dia da festa.",
  presenteDigitalTitulo: "Transferência móvel",
  presenteDigitalTexto: "Envie pelo M-Pesa ou pelo e-Mola.",
  presenteDigitalBotao: "Ver números",
  rsvpTexto: "{Confirma} a {tua} presença até",
  fraseFinal: "A {tua} presença tornará este dia ainda mais especial.",
  despedida: "Com carinho, espero por {voce}",

  /* ---- ASSINATURA (uma linha por item) ---- */
  rodape: ["Wilfred Deloviar Junior", "Licenciado em TI – 2026"],

  /* ---- PROGRAMA ----
     "minutos" = minutos depois da hora de início da festa.
     Os horários aparecem calculados a partir de dataFesta.            */
  programa: [
    { minutos: 0,   texto: "Recepção dos convidados" },
    { minutos: 60,  texto: "Boas-vindas e agradecimentos" },
    { minutos: 120, texto: "Corte do bolo e fotografias" },
    { minutos: 180, texto: "Refeição" },
    { minutos: 240, texto: "Convívio e música" }
  ],

  /* ---- A MINHA JORNADA (substitui pelo teu texto) ---- */
  estatisticas: [
    { valor: 4, rotulo: "anos de curso" },
    { valor: 1, rotulo: "ano de monografia e defesa" },
    { valor: 5, rotulo: "anos de jornada" }
  ],
  jornada: [
    { ano: "2022", titulo: "O início",
      texto: "Primeiro ano na UCM-FEG. Lógica de programação, matemática e as primeiras linhas de código." },
    { ano: "2023", titulo: "Construir as bases",
      texto: "Estruturas de dados, bases de dados e os primeiros trabalhos em grupo." },
    { ano: "2024", titulo: "Ligar o mundo",
      texto: "Redes, sistemas operativos e desenvolvimento web." },
    { ano: "2025", titulo: "Pôr em prática",
      texto: "Engenharia de software, projectos reais e a preparação do tema da monografia." },
    { ano: "2026", titulo: "A meta final",
      texto: "Monografia, defesa pública e a conquista da licenciatura." }
  ],

  /* ---- IMAGENS E MÚSICA ---- */
  fotoFormal: "assets/foto-formal.jpg",
  logo: "assets/logo-ucm-feg.png",
  musica: "assets/musica.mp3",
  volumeMusica: 0.5,

  /* ---- ESTILO ----
     true  = toques de TI (</>, rede de pontos, código a escrever)
     false = só o clássico de graduação                                  */
  toquesTI: true
};
