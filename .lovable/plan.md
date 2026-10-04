# Hero mais nítido e em movimento contínuo

## Resultado
- No computador, a visita à casa avança sozinha e suavemente, sem depender da rolagem; no celular, começa quando o Hero entra na tela e reproduz uma vez.
- A imagem fica mais visível: reduzir o escurecimento excessivo do vídeo e ajustar o contraste apenas onde o texto precisa, mantendo título e botões legíveis.
- Preservar o poster imediato, os eventos existentes, o vídeo local importado diretamente e a versão estática para quem prefere movimento reduzido.

## Implementação técnica
- Simplificar o hook do Hero para iniciar/pausar a reprodução por visibilidade, tratar mudança de largura e falhas de autoplay, e limpar observadores/listeners. Remover seeks de `currentTime` por scroll; manter inclinação discreta do mouse apenas se não comprometer a fluidez.
- Ajustar a camada de vídeo, enquadramento e sobreposição do Hero para recuperar detalhe sem sacrificar legibilidade; usar o arquivo original sem recompressão ou proxy.
- Conferir no navegador, em computador e celular, que o vídeo toca, não congela, mantém a imagem nítida dentro dos limites do arquivo e respeita movimento reduzido.

## Limite da qualidade original
O arquivo disponível é vertical, 720 × 1280, 24 fps e 10 segundos. Em um Hero horizontal de computador ele precisa ser ampliado e recortado, portanto não é possível transformá-lo em vídeo 3D realmente nítido em tela cheia apenas com código. Estas mudanças melhoram movimento e legibilidade; para qualidade alta real no desktop, será necessário um arquivo original horizontal em pelo menos 1920 × 1080, preferencialmente renderizado em resolução maior.
