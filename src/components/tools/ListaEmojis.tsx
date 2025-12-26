'use client';

import { useState } from 'react';

const emojiCategories = {
  rostos: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐'],
  emocoes: ['😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖'],
  gestos: ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦵', '🦶', '👂', '🦻', '👃', '🧠', '🦷', '🦴', '👀', '👁️', '👅', '👄'],
  pessoas: ['👶', '🧒', '👦', '👧', '🧑', '👱', '👨', '🧔', '👩', '🧓', '👴', '👵', '🙍', '🙎', '🙅', '🙆', '💁', '🙋', '🧏', '🙇', '🤦', '🤷', '👮', '🕵️', '💂', '👷', '🤴', '👸', '👳', '👲', '🧕', '🤵', '👰', '🤰', '🤱', '👼', '🎅', '🤶', '🦸', '🦹', '🧙', '🧚', '🧛', '🧜', '🧝', '🧞', '🧟', '💆', '💇', '🚶', '🧍', '🧎', '🏃', '💃', '🕺'],
  animais: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷️', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐈', '🐓', '🦃', '🦚', '🦜', '🦢', '🦩', '🕊️', '🐇', '🦝', '🦨', '🦡', '🦦', '🦥', '🐁', '🐀', '🐿️', '🦔'],
  comida: ['🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🥭', '🍎', '🍏', '🍐', '🍑', '🍒', '🍓', '🥝', '🍅', '🥥', '🥑', '🍆', '🥔', '🥕', '🌽', '🌶️', '🥒', '🥬', '🥦', '🧄', '🧅', '🍄', '🥜', '🌰', '🍞', '🥐', '🥖', '🥨', '🥯', '🥞', '🧇', '🧀', '🍖', '🍗', '🥩', '🥓', '🍔', '🍟', '🍕', '🌭', '🥪', '🌮', '🌯', '🥙', '🧆', '🥚', '🍳', '🥘', '🍲', '🥣', '🥗', '🍿', '🧈', '🧂', '🥫', '🍱', '🍘', '🍙', '🍚', '🍛', '🍜', '🍝', '🍠', '🍢', '🍣', '🍤', '🍥', '🥮', '🍡', '🥟', '🥠', '🥡', '🦀', '🦞', '🦐', '🦑', '🦪', '🍦', '🍧', '🍨', '🍩', '🍪', '🎂', '🍰', '🧁', '🥧', '🍫', '🍬', '🍭', '🍮', '🍯'],
  bebidas: ['🍼', '🥛', '☕', '🍵', '🍶', '🍾', '🍷', '🍸', '🍹', '🍺', '🍻', '🥂', '🥃', '🥤', '🧃', '🧉', '🧊'],
  esportes: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛼', '🛷', '⛸️', '🥌', '🎿', '⛷️', '🏂', '🪂', '🏋️', '🤼', '🤸', '🤺', '⛹️', '🤾', '🏌️', '🏇', '🧘', '🏊', '🤽', '🚣', '🧗', '🚵', '🚴', '🏆', '🥇', '🥈', '🥉', '🏅', '🎖️'],
  viagem: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🚚', '🚛', '🚜', '🦯', '🦽', '🦼', '🛴', '🚲', '🛵', '🏍️', '🛺', '🚨', '🚔', '🚍', '🚘', '🚖', '🚡', '🚠', '🚟', '🚃', '🚋', '🚞', '🚝', '🚄', '🚅', '🚈', '🚂', '🚆', '🚇', '🚊', '🚉', '✈️', '🛫', '🛬', '🛩️', '💺', '🛰️', '🚀', '🛸', '🚁', '🛶', '⛵', '🚤', '🛥️', '🛳️', '⛴️', '🚢', '⚓', '🪝', '⛽', '🚧', '🚦', '🚥', '🗺️', '🗿', '🗽', '🗼', '🏰', '🏯', '🏟️', '🎡', '🎢', '🎠', '⛲', '⛱️', '🏖️', '🏝️', '🏜️', '🌋', '⛰️', '🏔️', '🗻', '🏕️', '⛺', '🏠', '🏡', '🏘️', '🏚️', '🏗️', '🏭', '🏢', '🏬', '🏣', '🏤', '🏥', '🏦', '🏨', '🏪', '🏫', '🏩', '💒', '🏛️', '⛪', '🕌', '🕍', '🛕'],
  objetos: ['⌚', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️', '🗜️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽️', '🎞️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '🧭', '⏱️', '⏲️', '⏰', '🕰️', '⌛', '⏳', '📡', '🔋', '🔌', '💡', '🔦', '🕯️', '🪔', '🧯', '🛢️', '💸', '💵', '💴', '💶', '💷', '💰', '💳', '💎', '⚖️', '🧰', '🔧', '🔨', '⚒️', '🛠️', '⛏️', '🔩', '⚙️', '🧱', '⛓️', '🧲', '🔫', '💣', '🧨', '🪓', '🔪', '🗡️', '⚔️', '🛡️', '🚬', '⚰️', '⚱️', '🏺', '🔮', '📿', '🧿', '💈', '⚗️', '🔭', '🔬', '🕳️', '🩹', '🩺', '💊', '💉', '🩸', '🧬', '🦠', '🧫', '🧪', '🌡️', '🧹', '🧺', '🧻', '🚽', '🚰', '🚿', '🛁', '🛀', '🧼', '🪒', '🧽', '🧴', '🛎️', '🔑', '🗝️', '🚪', '🪑', '🛋️', '🛏️', '🛌', '🧸', '🖼️', '🛍️', '🛒', '🎁', '🎈', '🎏', '🎀', '🎊', '🎉', '🎎', '🏮', '🎐', '🧧', '✉️', '📩', '📨', '📧', '💌', '📥', '📤', '📦', '🏷️', '📪', '📬', '📭', '📮', '📯', '📜', '📃', '📄', '📑', '🧾', '📊', '📈', '📉', '🗒️', '🗓️', '📆', '📅', '🗑️', '📇', '🗃️', '🗳️', '🗄️', '📋', '📁', '📂', '🗂️', '🗞️', '📰', '📓', '📔', '📒', '📕', '📗', '📘', '📙', '📚', '📖', '🔖', '🧷', '🔗', '📎', '🖇️', '📐', '📏', '🧮', '📌', '📍', '✂️', '🖊️', '🖋️', '✒️', '🖌️', '🖍️', '📝', '✏️', '🔍', '🔎', '🔏', '🔐', '🔒', '🔓'],
  simbolos: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '🆔', '⚛️', '🉑', '☢️', '☣️', '📴', '📳', '🈶', '🈚', '🈸', '🈺', '🈷️', '✴️', '🆚', '💮', '🉐', '㊙️', '㊗️', '🈴', '🈵', '🈹', '🈲', '🅰️', '🅱️', '🆎', '🆑', '🅾️', '🆘', '❌', '⭕', '🛑', '⛔', '📛', '🚫', '💯', '💢', '♨️', '🚷', '🚯', '🚳', '🚱', '🔞', '📵', '🚭', '❗', '❕', '❓', '❔', '‼️', '⁉️', '🔅', '🔆', '〽️', '⚠️', '🚸', '🔱', '⚜️', '🔰', '♻️', '✅', '🈯', '💹', '❇️', '✳️', '❎', '🌐', '💠', 'Ⓜ️', '🌀', '💤', '🏧', '🚾', '♿', '🅿️', '🈳', '🈂️', '🛂', '🛃', '🛄', '🛅', '🚹', '🚺', '🚼', '🚻', '🚮', '🎦', '📶', '🈁', '🔣', 'ℹ️', '🔤', '🔡', '🔠', '🆖', '🆗', '🆙', '🆒', '🆕', '🆓', '0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '🔢', '#️⃣', '*️⃣', '⏏️', '▶️', '⏸️', '⏯️', '⏹️', '⏺️', '⏭️', '⏮️', '⏩', '⏪', '⏫', '⏬', '◀️', '🔼', '🔽', '➡️', '⬅️', '⬆️', '⬇️', '↗️', '↘️', '↙️', '↖️', '↕️', '↔️', '↪️', '↩️', '⤴️', '⤵️', '🔀', '🔁', '🔂', '🔄', '🔃', '🎵', '🎶', '➕', '➖', '➗', '✖️', '♾️', '💲', '💱', '™️', '©️', '®️', '〰️', '➰', '➿', '🔚', '🔙', '🔛', '🔝', '🔜', '✔️', '☑️', '🔘', '🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '⚫', '⚪', '🟤', '🔺', '🔻', '🔸', '🔹', '🔶', '🔷', '🔳', '🔲', '▪️', '▫️', '◾', '◽', '◼️', '◻️', '🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '⬛', '⬜', '🟫', '🔈', '🔇', '🔉', '🔊', '🔔', '🔕', '📣', '📢', '👁️‍🗨️', '💬', '💭', '🗯️', '♠️', '♣️', '♥️', '♦️', '🃏', '🎴', '🀄', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛', '🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '🕧'],
  bandeiras: ['🏳️', '🏴', '🏴‍☠️', '🏁', '🚩', '🏳️‍🌈', '🏳️‍⚧️', '🇧🇷', '🇺🇸', '🇬🇧', '🇪🇸', '🇫🇷', '🇩🇪', '🇮🇹', '🇵🇹', '🇨🇳', '🇯🇵', '🇰🇷', '🇷🇺', '🇮🇳', '🇨🇦', '🇦🇺', '🇲🇽', '🇦🇷', '🇨🇱', '🇨🇴', '🇵🇪', '🇻🇪', '🇪🇨', '🇧🇴', '🇺🇾', '🇵🇾'],
};

// Mapeamento de emojis para palavras-chave de busca
const emojiSearchMap: Record<string, string> = {
  // Rostos
  '😀': 'sorrindo feliz alegre smile happy grin',
  '😃': 'sorriso grande feliz alegre',
  '😄': 'sorriso olhos feliz alegre',
  '😁': 'sorrindo dentes feliz',
  '😆': 'rindo feliz gargalhada',
  '😅': 'suando nervoso aliviado',
  '🤣': 'rindo rolando chão gargalhada',
  '😂': 'chorando riso lágrimas alegria',
  '🙂': 'sorriso leve feliz',
  '😉': 'piscada flerte brincadeira',
  '😊': 'sorriso tímido feliz corado',
  '😇': 'anjo inocente santo',
  '🥰': 'apaixonado amor corações',
  '😍': 'apaixonado olhos coração amor',
  '🤩': 'estrelas olhos admiração',
  '😘': 'beijo mandando amor',
  '😋': 'delicioso gostoso língua',
  '😛': 'língua brincadeira',
  '😜': 'piscando língua brincadeira',
  '🤪': 'louco maluco doido',
  '🤔': 'pensando refletindo dúvida',
  '🤐': 'silêncio calado segredo',
  '😐': 'neutro sem expressão',
  '😑': 'entediado sem graça',
  '😶': 'sem boca silêncio',
  '😏': 'malicioso safado',
  '🙄': 'revirando olhos irritado',
  '😬': 'constrangido embaraçoso',
  '😌': 'aliviado paz tranquilo',
  '😔': 'triste pensativo',
  '😪': 'sonolento cansado dormindo',
  '😴': 'dormindo sono',
  '😷': 'máscara doente resfriado',
  '🤒': 'doente febre termômetro',
  '🤕': 'machucado ferido',
  '🤢': 'enjoado náusea',
  '🤮': 'vomitando passando mal',
  '🥵': 'quente calor suando',
  '🥶': 'frio congelando',
  '😵': 'zonzo tonto desmaiado',
  '🤯': 'mente explodindo chocado',
  '🤠': 'cowboy chapéu',
  '🥳': 'festa celebração aniversário',
  '😎': 'óculos legal descolado',
  '🤓': 'nerd estudioso inteligente',
  // Emoções
  '😕': 'confuso preocupado',
  '😟': 'preocupado triste',
  '🙁': 'triste desapontado',
  '😮': 'surpreso espantado boca aberta',
  '😯': 'chocado surpreso',
  '😲': 'impressionado assustado',
  '😳': 'corado envergonhado',
  '🥺': 'implorando pedindo carente',
  '😢': 'chorando triste lágrima',
  '😭': 'chorando muito devastado',
  '😱': 'gritando assustado medo',
  '😖': 'frustrado confuso',
  '😞': 'desapontado triste',
  '😩': 'cansado exausto',
  '😫': 'cansado irritado',
  '😤': 'irritado bravo',
  '😡': 'bravo furioso raiva',
  '😠': 'raiva zangado',
  '🤬': 'xingando palavrão',
  '😈': 'diabinho mal travesso',
  '👿': 'diabo mal raiva',
  '💀': 'caveira morte osso',
  '☠️': 'caveira ossos perigo',
  '💩': 'cocô fezes merda',
  '🤡': 'palhaço bobo',
  '👻': 'fantasma assustador',
  '👽': 'alien et extraterrestre',
  '🤖': 'robô inteligência artificial',
  // Gestos
  '👋': 'acenando tchau oi olá',
  '👌': 'ok perfeito beleza',
  '✌️': 'vitória paz',
  '🤞': 'dedos cruzados sorte',
  '🤟': 'amor rock',
  '🤘': 'rock metal',
  '🤙': 'ligar telefone call',
  '👈': 'apontando esquerda',
  '👉': 'apontando direita',
  '👆': 'apontando cima',
  '👇': 'apontando baixo',
  '👍': 'positivo legal bom like',
  '👎': 'negativo ruim deslike',
  '✊': 'punho força poder',
  '👊': 'soco força',
  '👏': 'palmas aplauso parabéns',
  '🙌': 'celebração aleluia',
  '🤲': 'mãos abertas oferecendo',
  '🤝': 'aperto mãos acordo',
  '🙏': 'rezando obrigado gratidão',
  '💪': 'força músculo forte',
  '👀': 'olhos vendo observando',
  // Animais
  '🐶': 'cachorro dog cão',
  '🐱': 'gato cat felino',
  '🐭': 'rato mouse',
  '🐹': 'hamster roedor',
  '🐰': 'coelho bunny',
  '🦊': 'raposa fox',
  '🐻': 'urso bear',
  '🐼': 'panda urso',
  '🐨': 'coala',
  '🐯': 'tigre',
  '🦁': 'leão',
  '🐮': 'vaca boi',
  '🐷': 'porco',
  '🐸': 'sapo rã',
  '🐵': 'macaco',
  '🐔': 'galinha frango',
  '🐧': 'pinguim',
  '🐦': 'pássaro ave',
  '🦆': 'pato',
  '🦅': 'águia',
  '🦉': 'coruja',
  '🐴': 'cavalo',
  '🦄': 'unicórnio',
  '🐝': 'abelha',
  '🦋': 'borboleta',
  '🐌': 'caracol lesma',
  '🐞': 'joaninha',
  '🐢': 'tartaruga',
  '🐍': 'cobra serpente',
  '🐙': 'polvo',
  '🐠': 'peixe',
  '🐬': 'golfinho',
  '🦈': 'tubarão',
  '🐘': 'elefante',
  // Comida
  '🍇': 'uva frutas',
  '🍉': 'melancia fruta',
  '🍊': 'laranja fruta',
  '🍋': 'limão fruta',
  '🍌': 'banana fruta',
  '🍍': 'abacaxi fruta',
  '🍎': 'maçã fruta',
  '🍐': 'pera fruta',
  '🍑': 'pêssego fruta',
  '🍒': 'cereja fruta',
  '🍓': 'morango fruta',
  '🥝': 'kiwi fruta',
  '🍅': 'tomate vegetal',
  '🥑': 'abacate',
  '🥕': 'cenoura vegetal',
  '🌽': 'milho',
  '🥔': 'batata',
  '🍞': 'pão',
  '🧀': 'queijo',
  '🍖': 'carne osso',
  '🍗': 'frango coxa',
  '🍔': 'hambúrguer burger',
  '🍟': 'batata frita',
  '🍕': 'pizza',
  '🌭': 'hot dog cachorro quente',
  '🥪': 'sanduíche',
  '🌮': 'taco mexicano',
  '🌯': 'burrito mexicano',
  '🍳': 'ovo frito',
  '🍦': 'sorvete gelado',
  '🍩': 'rosquinha donut',
  '🍪': 'biscoito cookie',
  '🎂': 'bolo aniversário',
  '🍰': 'bolo fatia',
  '🍫': 'chocolate',
  '🍬': 'bala doce',
  '🍭': 'pirulito doce',
  // Bebidas
  '☕': 'café',
  '🍵': 'chá',
  '🍺': 'cerveja chopp',
  '🍻': 'brinde cerveja',
  '🍷': 'vinho',
  '🥂': 'brinde champanhe',
  '🥤': 'refrigerante suco',
  // Objetos
  '📱': 'celular telefone smartphone',
  '💻': 'computador notebook laptop',
  '⌨️': 'teclado',
  '🖥️': 'computador desktop',
  '🖨️': 'impressora',
  '🖱️': 'mouse',
  '📷': 'câmera foto',
  '📺': 'televisão tv',
  '⏰': 'despertador relógio',
  '💡': 'lâmpada ideia luz',
  '🔋': 'bateria energia',
  '💰': 'dinheiro grana',
  '💳': 'cartão crédito',
  '💎': 'diamante joia',
  '🔑': 'chave',
  '🔒': 'cadeado trancado',
  '🔓': 'destrancado aberto',
  '📧': 'email mensagem',
  '📨': 'carta envelope',
  '📚': 'livros estudo',
  '📖': 'livro aberto leitura',
  '✏️': 'lápis escrever',
  '📝': 'anotação nota',
  // Símbolos
  '❤️': 'coração amor vermelho',
  '🧡': 'coração laranja amor',
  '💛': 'coração amarelo amor',
  '💚': 'coração verde amor',
  '💙': 'coração azul amor',
  '💜': 'coração roxo amor',
  '🖤': 'coração preto amor',
  '🤍': 'coração branco amor',
  '💔': 'coração partido quebrado triste',
  '💕': 'corações amor',
  '💯': 'cem por cento perfeito',
  '✅': 'correto certo check',
  '❌': 'errado x cancelar',
  '⭐': 'estrela favorito',
  '🌟': 'estrela brilhante',
  '💫': 'estrelas tontura',
  '🔥': 'fogo quente',
  '💧': 'gota água',
  '⚡': 'raio elétrico energia',
  '🎵': 'música nota',
  '🎶': 'música notas',
  '🏆': 'troféu vitória campeão',
  '🥇': 'medalha ouro primeiro',
  '🥈': 'medalha prata segundo',
  '🥉': 'medalha bronze terceiro',
  // Viagem e transportes
  '🚗': 'carro automóvel',
  '🚕': 'táxi',
  '🚙': 'carro suv',
  '🚌': 'ônibus',
  '🚎': 'ônibus elétrico',
  '🚓': 'polícia viatura',
  '🚑': 'ambulância',
  '🚒': 'bombeiros',
  '🚚': 'caminhão',
  '🚲': 'bicicleta bike',
  '🏍️': 'moto motocicleta',
  '✈️': 'avião',
  '🚀': 'foguete espaço',
  '🚁': 'helicóptero',
  '🛳️': 'navio cruzeiro',
  '⛵': 'barco vela',
  '🏠': 'casa moradia',
  '🏢': 'prédio escritório',
  '🏥': 'hospital',
  '🏦': 'banco',
  '🏪': 'loja mercado',
  '🏫': 'escola',
  '⛪': 'igreja',
  '🗼': 'torre',
  '🌍': 'mundo terra planeta',
  '🌎': 'mundo terra américa',
  '🌏': 'mundo terra ásia',
  // Bandeiras
  '🇧🇷': 'brasil bandeira brazilian',
  '🇺🇸': 'estados unidos usa eua bandeira',
  '🇬🇧': 'reino unido inglaterra bandeira',
  '🇪🇸': 'espanha bandeira',
  '🇫🇷': 'frança bandeira',
  '🇩🇪': 'alemanha bandeira',
  '🇮🇹': 'itália bandeira',
  '🇵🇹': 'portugal bandeira',
};

export default function ListaEmojis() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('rostos');
  const [copiedEmoji, setCopiedEmoji] = useState<string>('');

  const copyEmoji = (emoji: string) => {
    navigator.clipboard.writeText(emoji);
    setCopiedEmoji(emoji);
    setTimeout(() => setCopiedEmoji(''), 1000);
  };

  const filteredEmojis = searchTerm
    ? Object.values(emojiCategories)
        .flat()
        .filter((emoji) => {
          const searchWords = emojiSearchMap[emoji] || '';
          return searchWords.toLowerCase().includes(searchTerm.toLowerCase());
        })
    : emojiCategories[selectedCategory as keyof typeof emojiCategories] || [];

  const categoryNames: Record<string, string> = {
    rostos: '😀 Rostos',
    emocoes: '😱 Emoções',
    gestos: '👋 Gestos',
    pessoas: '👨 Pessoas',
    animais: '🐶 Animais',
    comida: '🍕 Comida',
    bebidas: '☕ Bebidas',
    esportes: '⚽ Esportes',
    viagem: '✈️ Viagem',
    objetos: '💡 Objetos',
    simbolos: '❤️ Símbolos',
    bandeiras: '🏁 Bandeiras',
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Buscar emoji..."
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
        />
      </div>

      {!searchTerm && (
        <div className="mb-6 flex flex-wrap gap-2">
          {Object.keys(categoryNames).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {categoryNames[category]}
            </button>
          ))}
        </div>
      )}

      {copiedEmoji && (
        <div className="mb-4 bg-green-50 border-l-4 border-green-400 p-4 rounded">
          <p className="text-green-700 font-medium text-center">
            ✅ Emoji <span className="text-2xl">{copiedEmoji}</span> copiado!
          </p>
        </div>
      )}

      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 mb-6">
        {filteredEmojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => copyEmoji(emoji)}
            className="text-4xl p-3 hover:bg-gray-100 rounded-lg transition transform hover:scale-110 active:scale-95"
            title="Clique para copiar"
          >
            {emoji}
          </button>
        ))}
      </div>

      {filteredEmojis.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-xl">😢 Nenhum emoji encontrado</p>
          <p className="text-sm mt-2">Tente outra busca ou categoria</p>
        </div>
      )}

      <div className="text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="font-semibold mb-2">💡 Como usar:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Clique em qualquer emoji para copiar automaticamente</li>
          <li>Use a busca para encontrar emojis específicos</li>
          <li>Navegue pelas categorias para explorar</li>
          <li>Cole em qualquer app: WhatsApp, Instagram, Twitter, etc.</li>
          <li>Total: {Object.values(emojiCategories).flat().length}+ emojis disponíveis!</li>
        </ul>
      </div>
    </div>
  );
}
