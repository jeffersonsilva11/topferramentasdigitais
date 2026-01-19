// Rich content for tools to improve SEO and AdSense approval
// Each tool can have: longDescription, howToUse, faq, useCases

export interface ToolContent {
  longDescription: string;
  howToUse: string[];
  faq: Array<{ question: string; answer: string }>;
  useCases: string[];
}

export const toolsContent: Record<string, Record<string, ToolContent>> = {
  // Portuguese content
  pt: {
    'meu-ip': {
      longDescription:
        'O endereço IP (Internet Protocol) é um identificador único atribuído a cada dispositivo conectado à internet. Esta ferramenta permite descobrir instantaneamente seu endereço IP público, que é o endereço visível para sites e serviços online. Conhecer seu IP é útil para configurar redes, resolver problemas de conexão, verificar VPNs e muito mais. Nossa ferramenta detecta automaticamente seu IP sem necessidade de cadastro ou instalação.',
      howToUse: [
        'Acesse esta página e seu IP será detectado automaticamente',
        'Veja seu endereço IP público exibido na tela',
        'Copie o IP clicando no botão de copiar',
        'Veja informações adicionais como localização aproximada',
      ],
      faq: [
        {
          question: 'O que é um endereço IP?',
          answer:
            'Um endereço IP é um número único que identifica seu dispositivo na internet, funcionando como um "endereço" para que dados possam ser enviados e recebidos corretamente.',
        },
        {
          question: 'Qual a diferença entre IP público e privado?',
          answer:
            'O IP público é visível na internet e atribuído pelo seu provedor. O IP privado é usado apenas na sua rede local (como 192.168.x.x) e não é visível externamente.',
        },
        {
          question: 'Por que meu IP muda?',
          answer:
            'A maioria dos provedores de internet usa IPs dinâmicos, que mudam periodicamente. Para ter um IP fixo, você precisa contratar um IP estático com seu provedor.',
        },
      ],
      useCases: [
        'Configurar acesso remoto a dispositivos',
        'Verificar se sua VPN está funcionando',
        'Resolver problemas de conexão',
        'Configurar servidores e jogos online',
      ],
    },
    'gerador-qr-code': {
      longDescription:
        'O QR Code (Quick Response Code) é um código de barras bidimensional que pode armazenar diversos tipos de informação, como URLs, textos, números de telefone e muito mais. Nossa ferramenta permite criar QR Codes personalizados de forma gratuita e instantânea, diretamente no seu navegador. Os códigos gerados podem ser baixados em alta resolução e usados em materiais impressos, sites, redes sociais e muito mais.',
      howToUse: [
        'Digite o texto ou URL que deseja transformar em QR Code',
        'Personalize as cores e tamanho se desejar',
        'Clique em gerar para criar o código',
        'Baixe a imagem do QR Code em PNG ou SVG',
      ],
      faq: [
        {
          question: 'O QR Code expira?',
          answer:
            'Não, os QR Codes gerados nunca expiram. Eles são apenas uma representação visual de dados, então funcionarão enquanto o conteúdo (como a URL) existir.',
        },
        {
          question: 'Qual o tamanho ideal do QR Code?',
          answer:
            'O tamanho mínimo recomendado é 2x2 cm para impressão. Para distâncias maiores de leitura, aumente o tamanho proporcionalmente.',
        },
        {
          question: 'Posso usar cores no QR Code?',
          answer:
            'Sim, você pode personalizar as cores, mas mantenha um bom contraste entre o código e o fundo para garantir a leitura.',
        },
      ],
      useCases: [
        'Cartões de visita digitais',
        'Links para redes sociais',
        'Cardápios de restaurantes',
        'Materiais de marketing',
      ],
    },
    'gerador-senha': {
      longDescription:
        'Senhas fortes são essenciais para proteger suas contas online contra hackers e ataques de força bruta. Nossa ferramenta gera senhas completamente aleatórias e seguras, utilizando combinações de letras maiúsculas, minúsculas, números e símbolos especiais. Todas as senhas são geradas localmente no seu navegador, garantindo que ninguém mais tenha acesso a elas - nem mesmo nós.',
      howToUse: [
        'Escolha o comprimento da senha (recomendado: 16+ caracteres)',
        'Selecione os tipos de caracteres desejados',
        'Clique em gerar para criar uma nova senha',
        'Copie a senha e guarde em um gerenciador de senhas',
      ],
      faq: [
        {
          question: 'Qual o tamanho ideal de uma senha?',
          answer:
            'Recomenda-se no mínimo 12 caracteres, mas 16 ou mais é ideal. Quanto maior a senha, mais difícil de ser quebrada por ataques de força bruta.',
        },
        {
          question: 'Por que usar símbolos especiais?',
          answer:
            'Símbolos aumentam exponencialmente o número de combinações possíveis, tornando a senha muito mais segura contra ataques.',
        },
        {
          question: 'A senha gerada é salva em algum lugar?',
          answer:
            'Não, todas as senhas são geradas localmente no seu navegador e não são enviadas para nenhum servidor. Sua segurança é garantida.',
        },
      ],
      useCases: [
        'Criar senhas para contas bancárias',
        'Gerar senhas para redes sociais',
        'Criar senhas para Wi-Fi',
        'Proteger documentos importantes',
      ],
    },
    'calculadora-porcentagem': {
      longDescription:
        'A calculadora de porcentagem é uma ferramenta essencial para realizar cálculos matemáticos do dia a dia. Permite calcular porcentagens de valores, descobrir quanto um número representa em relação a outro, calcular aumentos e descontos percentuais, e muito mais. Ideal para compras, cálculos financeiros, análises de dados e situações do cotidiano onde porcentagens são necessárias.',
      howToUse: [
        'Selecione o tipo de cálculo que deseja fazer',
        'Digite os valores necessários nos campos',
        'O resultado será calculado automaticamente',
        'Use os botões para limpar ou copiar o resultado',
      ],
      faq: [
        {
          question: 'Como calcular desconto em porcentagem?',
          answer:
            'Para calcular um desconto, multiplique o valor original pela porcentagem do desconto e divida por 100. Depois subtraia do valor original.',
        },
        {
          question: 'Como calcular aumento percentual?',
          answer:
            'Para calcular um aumento, multiplique o valor pela porcentagem e divida por 100. Depois some ao valor original.',
        },
        {
          question: 'O que significa porcentagem?',
          answer:
            'Porcentagem significa "por cento" ou "a cada 100". Por exemplo, 25% significa 25 a cada 100, ou 1/4 do total.',
        },
      ],
      useCases: [
        'Calcular descontos em compras',
        'Calcular juros de empréstimos',
        'Analisar crescimento de vendas',
        'Calcular gorjetas em restaurantes',
      ],
    },
    'contador-texto': {
      longDescription:
        'O contador de texto é uma ferramenta indispensável para escritores, estudantes, profissionais de marketing e qualquer pessoa que trabalhe com textos. Ele conta automaticamente caracteres (com e sem espaços), palavras, frases, parágrafos e até estima o tempo de leitura do texto. Perfeito para verificar limites de caracteres em redes sociais, cumprir requisitos de trabalhos acadêmicos ou otimizar textos para SEO.',
      howToUse: [
        'Cole ou digite seu texto na área de texto',
        'As estatísticas são atualizadas em tempo real',
        'Veja contagem de caracteres, palavras, frases e parágrafos',
        'Use o tempo de leitura estimado para referência',
      ],
      faq: [
        {
          question: 'Qual o limite de caracteres do Twitter/X?',
          answer: 'O Twitter/X permite até 280 caracteres por tweet para contas normais e 25.000 para assinantes premium.',
        },
        {
          question: 'Quantas palavras tem uma página A4?',
          answer:
            'Uma página A4 com fonte 12 e espaçamento simples tem aproximadamente 500 palavras. Com espaçamento duplo, cerca de 250 palavras.',
        },
        {
          question: 'Como é calculado o tempo de leitura?',
          answer:
            'O tempo de leitura é calculado considerando uma média de 200-250 palavras por minuto, que é a velocidade média de leitura de um adulto.',
        },
      ],
      useCases: [
        'Verificar limite de caracteres para redes sociais',
        'Cumprir requisitos de trabalhos acadêmicos',
        'Otimizar meta descriptions para SEO',
        'Preparar textos para anúncios',
      ],
    },
    'comprimir-imagem': {
      longDescription:
        'A compressão de imagens é essencial para otimizar sites, economizar espaço de armazenamento e acelerar o carregamento de páginas. Nossa ferramenta comprime imagens JPG, PNG e WebP diretamente no seu navegador, sem enviar seus arquivos para nenhum servidor. Você pode ajustar o nível de compressão para encontrar o equilíbrio perfeito entre qualidade e tamanho do arquivo.',
      howToUse: [
        'Arraste ou selecione as imagens que deseja comprimir',
        'Ajuste o nível de compressão desejado',
        'Visualize a comparação antes/depois',
        'Baixe as imagens comprimidas',
      ],
      faq: [
        {
          question: 'A compressão afeta a qualidade da imagem?',
          answer:
            'Depende do nível de compressão. Com níveis baixos a médios, a perda de qualidade é praticamente imperceptível. Níveis muito altos podem causar artefatos visíveis.',
        },
        {
          question: 'Qual formato é melhor para web?',
          answer:
            'WebP oferece a melhor relação qualidade/tamanho. JPG é ótimo para fotos. PNG é ideal para imagens com transparência ou gráficos com cores sólidas.',
        },
        {
          question: 'As imagens são enviadas para algum servidor?',
          answer:
            'Não, toda a compressão acontece localmente no seu navegador. Suas imagens nunca saem do seu computador.',
        },
      ],
      useCases: [
        'Otimizar imagens para sites e blogs',
        'Reduzir tamanho de anexos de email',
        'Preparar imagens para redes sociais',
        'Economizar espaço no celular ou computador',
      ],
    },
    'converter-pdf-jpg': {
      longDescription:
        'A conversão de PDF para JPG é útil quando você precisa extrair imagens de documentos PDF, compartilhar páginas específicas como imagens, ou usar conteúdo de PDFs em apresentações e redes sociais. Nossa ferramenta converte cada página do PDF em uma imagem JPG de alta qualidade, processando tudo localmente no seu navegador para garantir privacidade.',
      howToUse: [
        'Selecione ou arraste o arquivo PDF',
        'Escolha a qualidade/resolução desejada',
        'Aguarde a conversão das páginas',
        'Baixe as imagens individualmente ou em ZIP',
      ],
      faq: [
        {
          question: 'Posso converter PDFs protegidos?',
          answer:
            'PDFs com proteção contra cópia podem não ser convertidos. PDFs apenas com senha de abertura funcionam normalmente.',
        },
        {
          question: 'Qual a resolução das imagens geradas?',
          answer:
            'Você pode escolher entre diferentes resoluções. Para impressão, recomenda-se 300 DPI. Para web, 150 DPI é suficiente.',
        },
        {
          question: 'Há limite de páginas?',
          answer:
            'Não há limite técnico, mas PDFs muito grandes podem demorar mais para processar devido às limitações do navegador.',
        },
      ],
      useCases: [
        'Extrair páginas específicas de documentos',
        'Compartilhar conteúdo de PDF em redes sociais',
        'Criar miniaturas de documentos',
        'Converter apresentações para imagens',
      ],
    },
    'json-formatter': {
      longDescription:
        'O JSON Formatter é uma ferramenta essencial para desenvolvedores que trabalham com APIs e dados estruturados. Ele permite formatar, validar e visualizar código JSON de forma clara e organizada. Com syntax highlighting, detecção de erros e múltiplos níveis de indentação, facilita a leitura e depuração de dados JSON complexos.',
      howToUse: [
        'Cole ou digite seu código JSON na área de texto',
        'O JSON será formatado automaticamente',
        'Erros de sintaxe serão destacados',
        'Copie o JSON formatado ou minificado',
      ],
      faq: [
        {
          question: 'O que é JSON?',
          answer:
            'JSON (JavaScript Object Notation) é um formato leve de troca de dados, fácil de ler e escrever para humanos e máquinas. É amplamente usado em APIs web.',
        },
        {
          question: 'Por que formatar JSON?',
          answer:
            'JSON formatado é mais fácil de ler, debugar e entender. A indentação clara mostra a estrutura hierárquica dos dados.',
        },
        {
          question: 'O que é minificar JSON?',
          answer:
            'Minificar remove espaços e quebras de linha desnecessárias, reduzindo o tamanho do arquivo. Útil para transmissão de dados em APIs.',
        },
      ],
      useCases: [
        'Debugar respostas de APIs',
        'Validar arquivos de configuração',
        'Preparar dados para requisições',
        'Documentar estruturas de dados',
      ],
    },
  },

  // English content
  en: {
    'meu-ip': {
      longDescription:
        'An IP (Internet Protocol) address is a unique identifier assigned to every device connected to the internet. This tool instantly shows your public IP address, which is visible to websites and online services. Knowing your IP is useful for network configuration, troubleshooting connection issues, verifying VPNs, and more. Our tool automatically detects your IP without requiring registration or installation.',
      howToUse: [
        'Access this page and your IP will be detected automatically',
        'See your public IP address displayed on screen',
        'Copy the IP by clicking the copy button',
        'View additional information like approximate location',
      ],
      faq: [
        {
          question: 'What is an IP address?',
          answer:
            'An IP address is a unique number that identifies your device on the internet, working as an "address" so data can be sent and received correctly.',
        },
        {
          question: "What's the difference between public and private IP?",
          answer:
            'Public IP is visible on the internet and assigned by your ISP. Private IP is used only on your local network (like 192.168.x.x) and is not visible externally.',
        },
        {
          question: 'Why does my IP change?',
          answer:
            'Most ISPs use dynamic IPs that change periodically. To have a fixed IP, you need to contract a static IP with your provider.',
        },
      ],
      useCases: [
        'Configure remote access to devices',
        'Verify if your VPN is working',
        'Troubleshoot connection problems',
        'Set up servers and online games',
      ],
    },
    'gerador-qr-code': {
      longDescription:
        'A QR Code (Quick Response Code) is a two-dimensional barcode that can store various types of information such as URLs, texts, phone numbers, and more. Our tool allows you to create personalized QR Codes for free and instantly, directly in your browser. Generated codes can be downloaded in high resolution and used in printed materials, websites, social media, and more.',
      howToUse: [
        'Enter the text or URL you want to convert to QR Code',
        'Customize colors and size if desired',
        'Click generate to create the code',
        'Download the QR Code image in PNG or SVG',
      ],
      faq: [
        {
          question: 'Does the QR Code expire?',
          answer:
            'No, generated QR Codes never expire. They are just a visual representation of data, so they will work as long as the content (like the URL) exists.',
        },
        {
          question: 'What is the ideal QR Code size?',
          answer:
            'The recommended minimum size is 2x2 cm for printing. For longer reading distances, increase the size proportionally.',
        },
        {
          question: 'Can I use colors in the QR Code?',
          answer:
            'Yes, you can customize colors, but maintain good contrast between the code and background to ensure readability.',
        },
      ],
      useCases: [
        'Digital business cards',
        'Social media links',
        'Restaurant menus',
        'Marketing materials',
      ],
    },
    'gerador-senha': {
      longDescription:
        'Strong passwords are essential to protect your online accounts against hackers and brute force attacks. Our tool generates completely random and secure passwords using combinations of uppercase letters, lowercase letters, numbers, and special symbols. All passwords are generated locally in your browser, ensuring no one else has access to them - not even us.',
      howToUse: [
        'Choose password length (recommended: 16+ characters)',
        'Select desired character types',
        'Click generate to create a new password',
        'Copy the password and store in a password manager',
      ],
      faq: [
        {
          question: 'What is the ideal password length?',
          answer:
            'A minimum of 12 characters is recommended, but 16 or more is ideal. The longer the password, the harder it is to crack with brute force attacks.',
        },
        {
          question: 'Why use special symbols?',
          answer:
            'Symbols exponentially increase the number of possible combinations, making the password much more secure against attacks.',
        },
        {
          question: 'Is the generated password saved anywhere?',
          answer:
            'No, all passwords are generated locally in your browser and are not sent to any server. Your security is guaranteed.',
        },
      ],
      useCases: [
        'Create passwords for bank accounts',
        'Generate passwords for social media',
        'Create Wi-Fi passwords',
        'Protect important documents',
      ],
    },
  },

  // Spanish content
  es: {
    'meu-ip': {
      longDescription:
        'Una dirección IP (Protocolo de Internet) es un identificador único asignado a cada dispositivo conectado a internet. Esta herramienta permite descubrir instantáneamente tu dirección IP pública, que es visible para sitios web y servicios en línea. Conocer tu IP es útil para configurar redes, resolver problemas de conexión, verificar VPNs y más. Nuestra herramienta detecta automáticamente tu IP sin necesidad de registro o instalación.',
      howToUse: [
        'Accede a esta página y tu IP será detectada automáticamente',
        'Ve tu dirección IP pública mostrada en pantalla',
        'Copia el IP haciendo clic en el botón de copiar',
        'Ve información adicional como ubicación aproximada',
      ],
      faq: [
        {
          question: '¿Qué es una dirección IP?',
          answer:
            'Una dirección IP es un número único que identifica tu dispositivo en internet, funcionando como una "dirección" para que los datos puedan enviarse y recibirse correctamente.',
        },
        {
          question: '¿Cuál es la diferencia entre IP pública y privada?',
          answer:
            'La IP pública es visible en internet y asignada por tu proveedor. La IP privada se usa solo en tu red local (como 192.168.x.x) y no es visible externamente.',
        },
        {
          question: '¿Por qué cambia mi IP?',
          answer:
            'La mayoría de los proveedores de internet usan IPs dinámicas que cambian periódicamente. Para tener una IP fija, necesitas contratar una IP estática con tu proveedor.',
        },
      ],
      useCases: [
        'Configurar acceso remoto a dispositivos',
        'Verificar si tu VPN está funcionando',
        'Resolver problemas de conexión',
        'Configurar servidores y juegos en línea',
      ],
    },
    'gerador-qr-code': {
      longDescription:
        'El Código QR (Quick Response Code) es un código de barras bidimensional que puede almacenar diversos tipos de información como URLs, textos, números de teléfono y más. Nuestra herramienta permite crear Códigos QR personalizados de forma gratuita e instantánea, directamente en tu navegador. Los códigos generados pueden descargarse en alta resolución y usarse en materiales impresos, sitios web, redes sociales y más.',
      howToUse: [
        'Ingresa el texto o URL que deseas convertir en Código QR',
        'Personaliza los colores y tamaño si lo deseas',
        'Haz clic en generar para crear el código',
        'Descarga la imagen del Código QR en PNG o SVG',
      ],
      faq: [
        {
          question: '¿El Código QR expira?',
          answer:
            'No, los Códigos QR generados nunca expiran. Son solo una representación visual de datos, por lo que funcionarán mientras el contenido (como la URL) exista.',
        },
        {
          question: '¿Cuál es el tamaño ideal del Código QR?',
          answer:
            'El tamaño mínimo recomendado es 2x2 cm para impresión. Para distancias de lectura más largas, aumenta el tamaño proporcionalmente.',
        },
        {
          question: '¿Puedo usar colores en el Código QR?',
          answer:
            'Sí, puedes personalizar los colores, pero mantén un buen contraste entre el código y el fondo para garantizar la lectura.',
        },
      ],
      useCases: [
        'Tarjetas de presentación digitales',
        'Enlaces a redes sociales',
        'Menús de restaurantes',
        'Materiales de marketing',
      ],
    },
  },
};

// Helper function to get content for a tool
export function getToolContent(locale: string, toolSlug: string): ToolContent | null {
  const localeContent = toolsContent[locale] || toolsContent['pt'];
  return localeContent?.[toolSlug] || toolsContent['pt']?.[toolSlug] || null;
}

// Default content for tools without specific content
export function getDefaultContent(locale: string): ToolContent {
  const defaults: Record<string, ToolContent> = {
    pt: {
      longDescription:
        'Esta ferramenta foi desenvolvida para facilitar seu trabalho diário. Funciona diretamente no navegador, sem necessidade de instalação ou cadastro. Seus dados são processados localmente, garantindo privacidade e segurança.',
      howToUse: [
        'Acesse a ferramenta nesta página',
        'Siga as instruções na interface',
        'Os resultados são exibidos instantaneamente',
        'Copie ou baixe o resultado conforme necessário',
      ],
      faq: [
        {
          question: 'A ferramenta é gratuita?',
          answer: 'Sim, todas as nossas ferramentas são 100% gratuitas, sem limites de uso ou cadastro obrigatório.',
        },
        {
          question: 'Meus dados são seguros?',
          answer:
            'Sim, todo o processamento acontece localmente no seu navegador. Seus dados não são enviados para nenhum servidor.',
        },
        {
          question: 'Funciona no celular?',
          answer: 'Sim, a ferramenta é totalmente responsiva e funciona em qualquer dispositivo com navegador moderno.',
        },
      ],
      useCases: [
        'Uso pessoal do dia a dia',
        'Trabalho profissional',
        'Projetos acadêmicos',
        'Criação de conteúdo',
      ],
    },
    en: {
      longDescription:
        'This tool was designed to make your daily work easier. It works directly in the browser, without installation or registration. Your data is processed locally, ensuring privacy and security.',
      howToUse: [
        'Access the tool on this page',
        'Follow the instructions in the interface',
        'Results are displayed instantly',
        'Copy or download the result as needed',
      ],
      faq: [
        {
          question: 'Is the tool free?',
          answer: 'Yes, all our tools are 100% free, with no usage limits or mandatory registration.',
        },
        {
          question: 'Is my data secure?',
          answer: 'Yes, all processing happens locally in your browser. Your data is not sent to any server.',
        },
        {
          question: 'Does it work on mobile?',
          answer: 'Yes, the tool is fully responsive and works on any device with a modern browser.',
        },
      ],
      useCases: [
        'Personal daily use',
        'Professional work',
        'Academic projects',
        'Content creation',
      ],
    },
    es: {
      longDescription:
        'Esta herramienta fue diseñada para facilitar tu trabajo diario. Funciona directamente en el navegador, sin necesidad de instalación o registro. Tus datos se procesan localmente, garantizando privacidad y seguridad.',
      howToUse: [
        'Accede a la herramienta en esta página',
        'Sigue las instrucciones en la interfaz',
        'Los resultados se muestran instantáneamente',
        'Copia o descarga el resultado según sea necesario',
      ],
      faq: [
        {
          question: '¿La herramienta es gratuita?',
          answer: 'Sí, todas nuestras herramientas son 100% gratuitas, sin límites de uso ni registro obligatorio.',
        },
        {
          question: '¿Mis datos están seguros?',
          answer:
            'Sí, todo el procesamiento ocurre localmente en tu navegador. Tus datos no se envían a ningún servidor.',
        },
        {
          question: '¿Funciona en el móvil?',
          answer:
            'Sí, la herramienta es totalmente responsiva y funciona en cualquier dispositivo con navegador moderno.',
        },
      ],
      useCases: [
        'Uso personal diario',
        'Trabajo profesional',
        'Proyectos académicos',
        'Creación de contenido',
      ],
    },
  };

  return defaults[locale] || defaults['pt'];
}
