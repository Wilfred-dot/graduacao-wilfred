# Convite de Graduação · Wilfred Deloviar Junior

Site estático (HTML/CSS/JS). Sem build. Pronto para a Vercel.

## Como funciona
1. **Capa** (página inicial) com o botão "Abrir convite".
2. Ao tocar: **portas** que fecham e abrem com luz, e a música começa.
3. **Convite** completo (convidado, contagem, festa, programa, jornada, gratidão, presente, confirmação, dúvidas).

## Publicar na Vercel
Arrasta a pasta para a Vercel (ou `vercel --prod`) com o nome do projecto `graduacao-wilfred`.

## Links personalizados
Abre `/gerador` (palavra-passe: `wilfred2026`), escreve o nome do convidado e copia o link.
- Um convidado: `?nome=Fatima`
- Casal/grupo (com `&`): `?nome=Celia %26 Esposo` → o texto passa para o plural.

## O que editar (só `config.js`)
- Hora da festa (`dataFesta`) — contagem, programa e calendário seguem sozinhos.
- Local: `localRota` (ordem actual: Bairro do Aeroporto → Entrada de Machute → Casa da Célia). Confirma a grafia "Machute".
- `mapaLink`: ainda é uma pesquisa genérica (Aeroporto da Beira). Cola o link exacto do Google Maps da casa.
- Contactos: direcção da casa (Célia e Ita, lado a lado) e dúvidas (Wilfred: Vodacom e Movitel).
- Presente: M-Pesa e e-Mola.
- Textos, programa e jornada.

## Imagens e música (`assets/`)
- `foto-formal.jpg`: retrato com zoom no rosto.
- `logo-ucm-feg.png`: selo da UCM.
- `musica.mp3`: Mozart (domínio público).
- `og.png`: imagem de pré-visualização ao partilhar o link (o título/descrição estão no `index.html`).

## Notas
- O botão "Guardar no calendário" (ficheiro .ics com lembretes de 1 dia, 3 h e 1 h) só descarrega no site publicado, não em pré-visualizações.
- A galeria de fotos foi removida.
