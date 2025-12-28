'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Button from '@/components/ui/Button';

type PolicyType = 'privacy' | 'terms' | 'cookies';

interface FormData {
  companyName: string;
  websiteUrl: string;
  country: string;
  contactEmail: string;
  lastUpdated: string;
}

export default function GeradorPoliticas() {
  const t = useTranslations('policyGeneratorUI');
  const locale = useLocale();
  const [policyType, setPolicyType] = useState<PolicyType>('privacy');
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    websiteUrl: '',
    country: '',
    contactEmail: '',
    lastUpdated: new Date().toISOString().split('T')[0],
  });
  const [generatedPolicy, setGeneratedPolicy] = useState('');

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generatePrivacyPolicy = () => {
    if (locale === 'pt') {
      return `POLÍTICA DE PRIVACIDADE

Última atualização: ${formData.lastUpdated}

Esta Política de Privacidade descreve como ${formData.companyName} ("nós", "nosso" ou "nossa empresa") coleta, usa e compartilha suas informações pessoais quando você visita ${formData.websiteUrl} (o "Website").

1. INFORMAÇÕES QUE COLETAMOS

Coletamos informações que você nos fornece diretamente quando usa nosso Website, incluindo:
- Informações de contato (nome, email, telefone)
- Informações de uso (páginas visitadas, tempo gasto, cliques)
- Informações técnicas (endereço IP, tipo de navegador, sistema operacional)

2. COMO USAMOS SUAS INFORMAÇÕES

Usamos as informações coletadas para:
- Fornecer e melhorar nossos serviços
- Comunicar com você sobre atualizações e ofertas
- Personalizar sua experiência
- Analisar e melhorar o desempenho do Website
- Cumprir obrigações legais

3. COMPARTILHAMENTO DE INFORMAÇÕES

Não vendemos suas informações pessoais. Podemos compartilhar suas informações com:
- Prestadores de serviços que nos ajudam a operar o Website
- Autoridades legais quando exigido por lei
- Parceiros de negócios com seu consentimento

4. COOKIES E TECNOLOGIAS DE RASTREAMENTO

Usamos cookies e tecnologias similares para melhorar sua experiência. Você pode controlar o uso de cookies através das configurações do seu navegador.

5. SEUS DIREITOS

Você tem o direito de:
- Acessar suas informações pessoais
- Corrigir informações incorretas
- Solicitar a exclusão de suas informações
- Optar por não receber comunicações de marketing
- Solicitar portabilidade de dados

6. SEGURANÇA DE DADOS

Implementamos medidas de segurança apropriadas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.

7. ALTERAÇÕES NESTA POLÍTICA

Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova política nesta página e atualizando a data de "Última atualização".

8. ENTRE EM CONTATO

Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco:
Email: ${formData.contactEmail}
Website: ${formData.websiteUrl}
País: ${formData.country}

---
AVISO LEGAL: Este é um modelo e não constitui aconselhamento jurídico. Consulte um advogado qualificado para garantir conformidade com as leis aplicáveis.
`;
    } else if (locale === 'es') {
      return `POLÍTICA DE PRIVACIDAD

Última actualización: ${formData.lastUpdated}

Esta Política de Privacidad describe cómo ${formData.companyName} ("nosotros", "nuestro" o "nuestra empresa") recopila, usa y comparte su información personal cuando visita ${formData.websiteUrl} (el "Sitio Web").

1. INFORMACIÓN QUE RECOPILAMOS

Recopilamos información que usted nos proporciona directamente, incluyendo:
- Información de contacto (nombre, correo electrónico, teléfono)
- Credenciales de cuenta
- Información de pago
- Cualquier otra información que decida proporcionar

También recopilamos automáticamente cierta información sobre su dispositivo cuando usa nuestro Sitio Web, incluyendo:
- Dirección IP
- Tipo y versión del navegador
- Tipo de dispositivo
- Sistema operativo
- URLs de referencia
- Páginas vistas y tiempo dedicado a las páginas

2. CÓMO USAMOS SU INFORMACIÓN

Utilizamos la información que recopilamos para:
- Proporcionar, mantener y mejorar nuestros servicios
- Procesar transacciones y enviar información relacionada
- Enviarle avisos técnicos y mensajes de soporte
- Responder a sus comentarios y preguntas
- Monitorear y analizar tendencias y uso
- Detectar, prevenir y abordar problemas técnicos
- Cumplir con obligaciones legales

3. COMPARTIR INFORMACIÓN

Podemos compartir su información con:
- Proveedores de servicios que realizan servicios en nuestro nombre
- Asesores profesionales como abogados y contadores
- Autoridades cuando lo requiera la ley
- Otras partes con su consentimiento

4. SEGURIDAD DE DATOS

Implementamos medidas técnicas y organizativas apropiadas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción.

5. SUS DERECHOS

Dependiendo de su ubicación, puede tener ciertos derechos con respecto a su información personal, incluyendo:
- Acceso a su información personal
- Corrección de información inexacta
- Eliminación de su información
- Restricción del procesamiento
- Portabilidad de datos
- Objeción al procesamiento

6. COOKIES

Utilizamos cookies y tecnologías de seguimiento similares para rastrear la actividad en nuestro Sitio Web. Puede configurar su navegador para que rechace todas las cookies o para que indique cuándo se envía una cookie.

7. CAMBIOS A ESTA POLÍTICA DE PRIVACIDAD

Podemos actualizar esta Política de Privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página y actualizando la fecha de "Última actualización".

8. CONTÁCTENOS

Si tiene alguna pregunta sobre esta Política de Privacidad, contáctenos en:
${formData.contactEmail}

${formData.companyName}
${formData.country}

---
DESCARGO DE RESPONSABILIDAD: Esta es una plantilla y no constituye asesoramiento legal. Consulte con un abogado calificado para garantizar el cumplimiento de las leyes aplicables.
`;
    } else if (locale === 'de') {
      return `DATENSCHUTZRICHTLINIE

Letzte Aktualisierung: ${formData.lastUpdated}

Diese Datenschutzrichtlinie beschreibt, wie ${formData.companyName} („wir", „uns" oder „unser Unternehmen") Ihre persönlichen Daten erfasst, verwendet und weitergibt, wenn Sie ${formData.websiteUrl} (die „Website") besuchen.

1. INFORMATIONEN, DIE WIR ERFASSEN

Wir erfassen Informationen, die Sie uns direkt zur Verfügung stellen, einschließlich:
- Name und Kontaktinformationen (E-Mail-Adresse, Telefonnummer)
- Anmeldedaten
- Zahlungsinformationen
- Alle anderen Informationen, die Sie uns mitteilen möchten

Wir erfassen auch automatisch bestimmte Informationen über Ihr Gerät, wenn Sie unsere Website nutzen, einschließlich:
- IP-Adresse
- Browsertyp und -version
- Gerätetyp
- Betriebssystem
- Verweisende URLs
- Aufgerufene Seiten und Verweildauer auf Seiten

2. WIE WIR IHRE INFORMATIONEN VERWENDEN

Wir verwenden die erfassten Informationen, um:
- Unsere Dienste bereitzustellen, zu warten und zu verbessern
- Transaktionen zu verarbeiten und zugehörige Informationen zu senden
- Ihnen technische Hinweise und Support-Nachrichten zu senden
- Auf Ihre Kommentare und Fragen zu antworten
- Trends und Nutzung zu überwachen und zu analysieren
- Technische Probleme zu erkennen, zu verhindern und zu beheben
- Gesetzliche Verpflichtungen zu erfüllen

3. WEITERGABE VON INFORMATIONEN

Wir können Ihre Informationen weitergeben an:
- Dienstleister, die Dienste in unserem Auftrag erbringen
- Professionelle Berater wie Rechtsanwälte und Buchhalter
- Behörden, wenn gesetzlich vorgeschrieben
- Andere Parteien mit Ihrer Zustimmung

4. DATENSICHERHEIT

Wir implementieren angemessene technische und organisatorische Maßnahmen zum Schutz Ihrer persönlichen Daten vor unbefugtem Zugriff, Änderung, Offenlegung oder Zerstörung.

5. IHRE RECHTE

Abhängig von Ihrem Standort haben Sie möglicherweise bestimmte Rechte in Bezug auf Ihre persönlichen Daten, einschließlich:
- Zugriff auf Ihre persönlichen Daten
- Berichtigung ungenauer Informationen
- Löschung Ihrer Informationen
- Einschränkung der Verarbeitung
- Datenübertragbarkeit
- Widerspruch gegen die Verarbeitung

6. COOKIES

Wir verwenden Cookies und ähnliche Tracking-Technologien, um Aktivitäten auf unserer Website zu verfolgen. Sie können Ihren Browser so einstellen, dass er alle Cookies ablehnt oder anzeigt, wann ein Cookie gesendet wird.

7. ÄNDERUNGEN AN DIESER DATENSCHUTZRICHTLINIE

Wir können diese Datenschutzrichtlinie von Zeit zu Zeit aktualisieren. Wir werden Sie über Änderungen informieren, indem wir die neue Datenschutzrichtlinie auf dieser Seite veröffentlichen und das Datum „Letzte Aktualisierung" aktualisieren.

8. KONTAKTIEREN SIE UNS

Wenn Sie Fragen zu dieser Datenschutzrichtlinie haben, kontaktieren Sie uns bitte unter:
${formData.contactEmail}

${formData.companyName}
${formData.country}

---
HAFTUNGSAUSSCHLUSS: Dies ist eine Vorlage und stellt keine Rechtsberatung dar. Bitte konsultieren Sie einen qualifizierten Rechtsanwalt, um die Einhaltung geltender Gesetze sicherzustellen.
`;
    } else if (locale === 'fr') {
      return `POLITIQUE DE CONFIDENTIALITÉ

Dernière mise à jour : ${formData.lastUpdated}

Cette Politique de Confidentialité décrit comment ${formData.companyName} (« nous », « notre » ou « notre entreprise ») collecte, utilise et partage vos informations personnelles lorsque vous visitez ${formData.websiteUrl} (le « Site Web »).

1. INFORMATIONS QUE NOUS COLLECTONS

Nous collectons les informations que vous nous fournissez directement, notamment :
- Nom et coordonnées (adresse e-mail, numéro de téléphone)
- Identifiants de compte
- Informations de paiement
- Toute autre information que vous choisissez de fournir

Nous collectons également automatiquement certaines informations sur votre appareil lorsque vous utilisez notre Site Web, notamment :
- Adresse IP
- Type et version du navigateur
- Type d'appareil
- Système d'exploitation
- URLs de référence
- Pages consultées et temps passé sur les pages

2. COMMENT NOUS UTILISONS VOS INFORMATIONS

Nous utilisons les informations collectées pour :
- Fournir, maintenir et améliorer nos services
- Traiter les transactions et envoyer des informations connexes
- Vous envoyer des avis techniques et des messages de support
- Répondre à vos commentaires et questions
- Surveiller et analyser les tendances et l'utilisation
- Détecter, prévenir et résoudre les problèmes techniques
- Respecter les obligations légales

3. PARTAGE D'INFORMATIONS

Nous pouvons partager vos informations avec :
- Des prestataires de services qui effectuent des services en notre nom
- Des conseillers professionnels tels que des avocats et des comptables
- Des autorités lorsque la loi l'exige
- D'autres parties avec votre consentement

4. SÉCURITÉ DES DONNÉES

Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos informations personnelles contre l'accès non autorisé, la modification, la divulgation ou la destruction.

5. VOS DROITS

Selon votre emplacement, vous pouvez avoir certains droits concernant vos informations personnelles, notamment :
- Accès à vos informations personnelles
- Correction d'informations inexactes
- Suppression de vos informations
- Restriction du traitement
- Portabilité des données
- Opposition au traitement

6. COOKIES

Nous utilisons des cookies et des technologies de suivi similaires pour suivre l'activité sur notre Site Web. Vous pouvez configurer votre navigateur pour refuser tous les cookies ou pour indiquer quand un cookie est envoyé.

7. MODIFICATIONS DE CETTE POLITIQUE DE CONFIDENTIALITÉ

Nous pouvons mettre à jour cette Politique de Confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle Politique de Confidentialité sur cette page et en mettant à jour la date de « Dernière mise à jour ».

8. NOUS CONTACTER

Si vous avez des questions concernant cette Politique de Confidentialité, veuillez nous contacter à :
${formData.contactEmail}

${formData.companyName}
${formData.country}

---
AVERTISSEMENT : Ceci est un modèle et ne constitue pas un conseil juridique. Veuillez consulter un avocat qualifié pour garantir la conformité aux lois applicables.
`;
    } else if (locale === 'ru') {
      return `ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ

Последнее обновление: ${formData.lastUpdated}

Настоящая Политика конфиденциальности описывает, как ${formData.companyName} («мы», «наш» или «наша компания») собирает, использует и передает вашу персональную информацию при посещении ${formData.websiteUrl} («Веб-сайт»).

1. ИНФОРМАЦИЯ, КОТОРУЮ МЫ СОБИРАЕМ

Мы собираем информацию, которую вы нам предоставляете напрямую, включая:
- Имя и контактную информацию (адрес электронной почты, номер телефона)
- Учетные данные
- Платежную информацию
- Любую другую информацию, которую вы решите предоставить

Мы также автоматически собираем определенную информацию о вашем устройстве при использовании нашего Веб-сайта, включая:
- IP-адрес
- Тип и версию браузера
- Тип устройства
- Операционную систему
- Ссылающиеся URL
- Просмотренные страницы и время, проведенное на страницах

2. КАК МЫ ИСПОЛЬЗУЕМ ВАШУ ИНФОРМАЦИЮ

Мы используем собранную информацию для:
- Предоставления, поддержки и улучшения наших услуг
- Обработки транзакций и отправки связанной информации
- Отправки вам технических уведомлений и сообщений поддержки
- Ответов на ваши комментарии и вопросы
- Мониторинга и анализа тенденций и использования
- Обнаружения, предотвращения и устранения технических проблем
- Выполнения юридических обязательств

3. ПЕРЕДАЧА ИНФОРМАЦИИ

Мы можем передавать вашу информацию:
- Поставщикам услуг, которые выполняют услуги от нашего имени
- Профессиональным консультантам, таким как юристы и бухгалтеры
- Органам власти, когда этого требует закон
- Другим сторонам с вашего согласия

4. БЕЗОПАСНОСТЬ ДАННЫХ

Мы применяем соответствующие технические и организационные меры для защиты вашей персональной информации от несанкционированного доступа, изменения, раскрытия или уничтожения.

5. ВАШИ ПРАВА

В зависимости от вашего местоположения вы можете иметь определенные права в отношении вашей персональной информации, включая:
- Доступ к вашей персональной информации
- Исправление неточной информации
- Удаление вашей информации
- Ограничение обработки
- Переносимость данных
- Возражение против обработки

6. ФАЙЛЫ COOKIE

Мы используем файлы cookie и аналогичные технологии отслеживания для отслеживания активности на нашем Веб-сайте. Вы можете настроить свой браузер на отклонение всех файлов cookie или на уведомление о том, когда отправляется файл cookie.

7. ИЗМЕНЕНИЯ В НАСТОЯЩЕЙ ПОЛИТИКЕ КОНФИДЕНЦИАЛЬНОСТИ

Мы можем время от времени обновлять настоящую Политику конфиденциальности. Мы уведомим вас о любых изменениях, разместив новую Политику конфиденциальности на этой странице и обновив дату «Последнее обновление».

8. СВЯЖИТЕСЬ С НАМИ

Если у вас есть вопросы о настоящей Политике конфиденциальности, пожалуйста, свяжитесь с нами по адресу:
${formData.contactEmail}

${formData.companyName}
${formData.country}

---
ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ: Это шаблон и не является юридической консультацией. Пожалуйста, проконсультируйтесь с квалифицированным юристом для обеспечения соответствия применимым законам.
`;
    } else if (locale === 'it') {
      return `INFORMATIVA SULLA PRIVACY

Ultimo aggiornamento: ${formData.lastUpdated}

Questa Informativa sulla Privacy descrive come ${formData.companyName} ("noi", "nostro" o "nostra azienda") raccoglie, utilizza e condivide le tue informazioni personali quando visiti ${formData.websiteUrl} (il "Sito Web").

1. INFORMAZIONI CHE RACCOGLIAMO

Raccogliamo informazioni che ci fornisci direttamente, inclusi:
- Nome e informazioni di contatto (indirizzo email, numero di telefono)
- Credenziali dell'account
- Informazioni di pagamento
- Qualsiasi altra informazione che scegli di fornire

Raccogliamo anche automaticamente alcune informazioni sul tuo dispositivo quando utilizzi il nostro Sito Web, inclusi:
- Indirizzo IP
- Tipo e versione del browser
- Tipo di dispositivo
- Sistema operativo
- URL di riferimento
- Pagine visualizzate e tempo trascorso sulle pagine

2. COME UTILIZZIAMO LE TUE INFORMAZIONI

Utilizziamo le informazioni raccolte per:
- Fornire, mantenere e migliorare i nostri servizi
- Elaborare transazioni e inviare informazioni correlate
- Inviarti avvisi tecnici e messaggi di supporto
- Rispondere ai tuoi commenti e domande
- Monitorare e analizzare tendenze e utilizzo
- Rilevare, prevenire e affrontare problemi tecnici
- Rispettare gli obblighi legali

3. CONDIVISIONE DELLE INFORMAZIONI

Possiamo condividere le tue informazioni con:
- Fornitori di servizi che eseguono servizi per nostro conto
- Consulenti professionali come avvocati e commercialisti
- Autorità quando richiesto dalla legge
- Altre parti con il tuo consenso

4. SICUREZZA DEI DATI

Implementiamo misure tecniche e organizzative appropriate per proteggere le tue informazioni personali da accesso non autorizzato, alterazione, divulgazione o distruzione.

5. I TUOI DIRITTI

A seconda della tua posizione, potresti avere determinati diritti riguardo alle tue informazioni personali, inclusi:
- Accesso alle tue informazioni personali
- Correzione di informazioni inesatte
- Cancellazione delle tue informazioni
- Limitazione del trattamento
- Portabilità dei dati
- Opposizione al trattamento

6. COOKIE

Utilizziamo cookie e tecnologie di tracciamento simili per monitorare l'attività sul nostro Sito Web. Puoi impostare il tuo browser per rifiutare tutti i cookie o per indicare quando viene inviato un cookie.

7. MODIFICHE A QUESTA INFORMATIVA SULLA PRIVACY

Potremmo aggiornare questa Informativa sulla Privacy di tanto in tanto. Ti informeremo di eventuali modifiche pubblicando la nuova Informativa sulla Privacy su questa pagina e aggiornando la data di "Ultimo aggiornamento".

8. CONTATTACI

Se hai domande su questa Informativa sulla Privacy, contattaci all'indirizzo:
${formData.contactEmail}

${formData.companyName}
${formData.country}

---
DISCLAIMER: Questo è un modello e non costituisce consulenza legale. Si prega di consultare un avvocato qualificato per garantire la conformità alle leggi applicabili.
`;
    }

    return `PRIVACY POLICY

Last updated: ${formData.lastUpdated}

This Privacy Policy describes how ${formData.companyName} ("we", "us", or "our") collects, uses, and shares your personal information when you visit ${formData.websiteUrl} (the "Website").

1. INFORMATION WE COLLECT

We collect information that you provide directly to us, including:
- Name and contact information (email address, phone number)
- Account credentials
- Payment information
- Any other information you choose to provide

We also automatically collect certain information about your device when you use our Website, including:
- IP address
- Browser type and version
- Device type
- Operating system
- Referral URLs
- Pages viewed and time spent on pages

2. HOW WE USE YOUR INFORMATION

We use the information we collect to:
- Provide, maintain, and improve our services
- Process transactions and send related information
- Send you technical notices and support messages
- Respond to your comments and questions
- Monitor and analyze trends and usage
- Detect, prevent, and address technical issues
- Comply with legal obligations

3. SHARING OF INFORMATION

We may share your information with:
- Service providers who perform services on our behalf
- Professional advisors such as lawyers and accountants
- Authorities when required by law
- Other parties with your consent

4. DATA SECURITY

We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

5. YOUR RIGHTS

Depending on your location, you may have certain rights regarding your personal information, including:
- Access to your personal information
- Correction of inaccurate information
- Deletion of your information
- Restriction of processing
- Data portability
- Objection to processing

6. COOKIES

We use cookies and similar tracking technologies to track activity on our Website. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.

7. CHANGES TO THIS PRIVACY POLICY

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.

8. CONTACT US

If you have any questions about this Privacy Policy, please contact us at:
${formData.contactEmail}

${formData.companyName}
${formData.country}

---
DISCLAIMER: This is a template and does not constitute legal advice. Please consult with a qualified attorney to ensure compliance with applicable laws.
`;
  };

  const generateTermsOfService = () => {
    if (locale === 'pt') {
      return `TERMOS DE SERVIÇO

Última atualização: ${formData.lastUpdated}

Por favor, leia estes Termos de Serviço ("Termos") cuidadosamente antes de usar ${formData.websiteUrl} (o "Website") operado por ${formData.companyName} ("nós", "nosso" ou "nossa empresa").

1. ACEITAÇÃO DOS TERMOS

Ao acessar ou usar o Website, você concorda em estar vinculado a estes Termos. Se você não concorda com qualquer parte destes termos, não deve usar nosso Website.

2. USO DO WEBSITE

Você concorda em usar o Website apenas para fins legais e de maneira que não viole os direitos de terceiros ou restrinja ou iniba o uso do Website por terceiros.

3. PROPRIEDADE INTELECTUAL

O Website e seu conteúdo original, recursos e funcionalidades são e permanecerão propriedade exclusiva de ${formData.companyName}. O Website é protegido por leis de direitos autorais, marcas registradas e outras leis.

4. CONTEÚDO DO USUÁRIO

Nosso Website permite que você publique, vincule, armazene, compartilhe e disponibilize certas informações, textos, gráficos ou outros materiais ("Conteúdo").

Você é responsável pelo Conteúdo que publica no Website, incluindo sua legalidade, confiabilidade e adequação.

5. LINKS PARA OUTROS WEBSITES

Nosso Website pode conter links para websites ou serviços de terceiros que não são de propriedade ou controlados por ${formData.companyName}.

Não temos controle sobre e não assumimos responsabilidade pelo conteúdo, políticas de privacidade ou práticas de websites ou serviços de terceiros.

6. RESCISÃO

Podemos encerrar ou suspender seu acesso imediatamente, sem aviso prévio ou responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar os Termos.

7. LIMITAÇÃO DE RESPONSABILIDADE

Em nenhuma circunstância ${formData.companyName} será responsável por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo perda de lucros, dados, uso ou outros prejuízos intangíveis.

8. ISENÇÃO DE GARANTIAS

O Website é fornecido "como está" e "conforme disponível" sem garantias de qualquer tipo, expressas ou implícitas.

9. LEI APLICÁVEL

Estes Termos serão regidos e interpretados de acordo com as leis de ${formData.country}, sem considerar suas disposições sobre conflito de leis.

10. ALTERAÇÕES

Reservamos o direito de modificar ou substituir estes Termos a qualquer momento. É sua responsabilidade verificar periodicamente estes Termos para quaisquer alterações.

11. ENTRE EM CONTATO

Se você tiver dúvidas sobre estes Termos, entre em contato conosco:
Email: ${formData.contactEmail}
Website: ${formData.websiteUrl}
País: ${formData.country}

---
AVISO LEGAL: Este é um modelo e não constitui aconselhamento jurídico. Consulte um advogado qualificado para garantir conformidade com as leis aplicáveis.
`;
    } else if (locale === 'es') {
      return `TÉRMINOS DE SERVICIO

Última actualización: ${formData.lastUpdated}

Por favor, lea estos Términos de Servicio ("Términos") cuidadosamente antes de usar ${formData.websiteUrl} (el "Sitio Web") operado por ${formData.companyName} ("nosotros", "nuestro" o "nuestra empresa").

1. ACEPTACIÓN DE LOS TÉRMINOS

Al acceder y usar este Sitio Web, acepta estar obligado por estos Términos. Si no está de acuerdo con estos Términos, no utilice el Sitio Web.

2. LICENCIA DE USO

Se otorga permiso para acceder temporalmente y usar el Sitio Web para fines personales y no comerciales. Esta es la concesión de una licencia, no una transferencia de título.

Bajo esta licencia, no puede:
- Modificar o copiar los materiales
- Usar los materiales con fines comerciales
- Intentar realizar ingeniería inversa de cualquier software en el Sitio Web
- Eliminar cualquier nota de derechos de autor o propiedad
- Transferir los materiales a otra persona
- Usar el Sitio Web de manera que viole las leyes aplicables

3. CUENTAS DE USUARIO

Cuando crea una cuenta con nosotros, usted es responsable de:
- Mantener la seguridad de su cuenta
- Todas las actividades que ocurran bajo su cuenta
- Notificarnos inmediatamente sobre cualquier uso no autorizado

Nos reservamos el derecho de cancelar cuentas, eliminar o editar contenido a nuestra discreción exclusiva.

4. CONTENIDO

Nuestro Sitio Web le permite publicar, vincular, almacenar, compartir y poner a disposición cierta información, texto, gráficos u otro material ("Contenido").

Usted es responsable del Contenido que publica en o a través del Sitio Web, incluida su legalidad, confiabilidad y adecuación.

Al publicar Contenido, nos otorga el derecho y la licencia para usar, modificar, ejecutar públicamente, mostrar públicamente, reproducir y distribuir dicho Contenido.

5. PROPIEDAD INTELECTUAL

El Sitio Web y su contenido, características y funcionalidad originales son y seguirán siendo propiedad exclusiva de ${formData.companyName}. El Sitio Web está protegido por derechos de autor, marcas comerciales y otras leyes.

6. USOS PROHIBIDOS

No puede usar el Sitio Web:
- De manera que viole cualquier ley o regulación aplicable
- Para explotar, dañar o intentar explotar o dañar a menores
- Para transmitir cualquier material publicitario o promocional
- Para hacerse pasar o intentar hacerse pasar por la Compañía
- De cualquier manera que infrinja los derechos de otros
- Para participar en cualquier otra conducta que restrinja o inhiba el uso del Sitio Web por parte de cualquier persona

7. DESCARGO DE GARANTÍAS

EL SITIO WEB SE PROPORCIONA "TAL CUAL" Y "SEGÚN DISPONIBILIDAD". NO OFRECEMOS GARANTÍAS, EXPRESAS O IMPLÍCITAS, CON RESPECTO AL FUNCIONAMIENTO DEL SITIO WEB O LA INFORMACIÓN, CONTENIDO O MATERIALES INCLUIDOS.

8. LIMITACIÓN DE RESPONSABILIDAD

EN NINGÚN CASO ${formData.companyName} SERÁ RESPONSABLE DE DAÑOS INDIRECTOS, INCIDENTALES, ESPECIALES, CONSECUENTES O PUNITIVOS QUE SURJAN DE SU USO DEL SITIO WEB.

9. LEY APLICABLE

Estos Términos se regirán por las leyes de ${formData.country}, sin tener en cuenta sus disposiciones sobre conflictos de leyes.

10. CAMBIOS A LOS TÉRMINOS

Nos reservamos el derecho de modificar estos Términos en cualquier momento. Notificaremos a los usuarios sobre cualquier cambio material publicando los nuevos Términos en esta página.

11. CONTÁCTENOS

Si tiene alguna pregunta sobre estos Términos, contáctenos en:
${formData.contactEmail}

${formData.companyName}
${formData.country}

---
DESCARGO DE RESPONSABILIDAD: Esta es una plantilla y no constituye asesoramiento legal. Consulte con un abogado calificado para garantizar el cumplimiento de las leyes aplicables.
`;
    } else if (locale === 'de') {
      return `NUTZUNGSBEDINGUNGEN

Letzte Aktualisierung: ${formData.lastUpdated}

Bitte lesen Sie diese Nutzungsbedingungen („Bedingungen") sorgfältig durch, bevor Sie ${formData.websiteUrl} (die „Website") verwenden, die von ${formData.companyName} („wir", „uns" oder „unser Unternehmen") betrieben wird.

1. ANNAHME DER BEDINGUNGEN

Durch den Zugriff auf und die Nutzung dieser Website akzeptieren Sie diese Bedingungen und erklären sich damit einverstanden. Wenn Sie mit diesen Bedingungen nicht einverstanden sind, verwenden Sie die Website bitte nicht.

2. NUTZUNGSLIZENZ

Es wird die Erlaubnis erteilt, vorübergehend auf die Website zuzugreifen und sie für persönliche, nicht-kommerzielle Zwecke zu nutzen. Dies ist die Gewährung einer Lizenz, keine Eigentumsübertragung.

Unter dieser Lizenz dürfen Sie nicht:
- Die Materialien ändern oder kopieren
- Die Materialien für kommerzielle Zwecke verwenden
- Versuchen, Software auf der Website zurückzuentwickeln
- Urheberrechts- oder Eigentumshinweise entfernen
- Die Materialien an eine andere Person übertragen
- Die Website in einer Weise nutzen, die gegen geltendes Recht verstößt

3. BENUTZERKONTEN

Wenn Sie ein Konto bei uns erstellen, sind Sie verantwortlich für:
- Die Sicherheit Ihres Kontos
- Alle Aktivitäten, die unter Ihrem Konto stattfinden
- Die sofortige Benachrichtigung bei unbefugter Nutzung

Wir behalten uns das Recht vor, Konten zu kündigen, Inhalte nach eigenem Ermessen zu entfernen oder zu bearbeiten.

4. INHALT

Unsere Website ermöglicht es Ihnen, bestimmte Informationen, Texte, Grafiken oder anderes Material („Inhalt") zu veröffentlichen, zu verlinken, zu speichern, zu teilen und anderweitig verfügbar zu machen.

Sie sind für den Inhalt verantwortlich, den Sie auf oder über die Website veröffentlichen, einschließlich seiner Rechtmäßigkeit, Zuverlässigkeit und Angemessenheit.

Durch das Veröffentlichen von Inhalten gewähren Sie uns das Recht und die Lizenz, solche Inhalte zu verwenden, zu modifizieren, öffentlich aufzuführen, öffentlich anzuzeigen, zu reproduzieren und zu verteilen.

5. GEISTIGES EIGENTUM

Die Website und ihr ursprünglicher Inhalt, ihre Funktionen und Funktionalität sind und bleiben ausschließliches Eigentum von ${formData.companyName}. Die Website ist durch Urheberrechte, Markenrechte und andere Gesetze geschützt.

6. VERBOTENE NUTZUNG

Sie dürfen die Website nicht verwenden:
- In einer Weise, die gegen geltendes Recht oder Vorschriften verstößt
- Um Minderjährige auszubeuten, zu schädigen oder zu versuchen auszubeuten oder zu schädigen
- Um Werbe- oder Werbematerial zu übertragen
- Um sich als das Unternehmen auszugeben oder zu versuchen auszugeben
- Auf eine Weise, die die Rechte anderer verletzt
- Um sich an anderem Verhalten zu beteiligen, das die Nutzung der Website durch andere einschränkt oder behindert

7. HAFTUNGSAUSSCHLUSS FÜR GARANTIEN

DIE WEBSITE WIRD "WIE BESEHEN" UND "WIE VERFÜGBAR" BEREITGESTELLT. WIR GEBEN KEINE GARANTIEN, AUSDRÜCKLICH ODER STILLSCHWEIGEND, IN BEZUG AUF DEN BETRIEB DER WEBSITE ODER DIE ENTHALTENEN INFORMATIONEN, INHALTE ODER MATERIALIEN.

8. HAFTUNGSBESCHRÄNKUNG

IN KEINEM FALL HAFTET ${formData.companyName} FÜR INDIREKTE, ZUFÄLLIGE, BESONDERE, FOLGE- ODER STRAFSCHÄDEN, DIE SICH AUS IHRER NUTZUNG DER WEBSITE ERGEBEN.

9. GELTENDES RECHT

Diese Bedingungen unterliegen den Gesetzen von ${formData.country}, ohne Rücksicht auf dessen Bestimmungen über Gesetzeskonflikte.

10. ÄNDERUNGEN DER BEDINGUNGEN

Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu ändern. Wir werden Benutzer über wesentliche Änderungen informieren, indem wir die neuen Bedingungen auf dieser Seite veröffentlichen.

11. KONTAKTIEREN SIE UNS

Wenn Sie Fragen zu diesen Bedingungen haben, kontaktieren Sie uns bitte unter:
${formData.contactEmail}

${formData.companyName}
${formData.country}

---
HAFTUNGSAUSSCHLUSS: Dies ist eine Vorlage und stellt keine Rechtsberatung dar. Bitte konsultieren Sie einen qualifizierten Rechtsanwalt, um die Einhaltung geltender Gesetze sicherzustellen.
`;
    } else if (locale === 'fr') {
      return `CONDITIONS D'UTILISATION

Dernière mise à jour : ${formData.lastUpdated}

Veuillez lire attentivement ces Conditions d'Utilisation (« Conditions ») avant d'utiliser ${formData.websiteUrl} (le « Site Web ») exploité par ${formData.companyName} (« nous », « notre » ou « notre entreprise »).

1. ACCEPTATION DES CONDITIONS

En accédant et en utilisant ce Site Web, vous acceptez d'être lié par ces Conditions. Si vous n'acceptez pas ces Conditions, veuillez ne pas utiliser le Site Web.

2. LICENCE D'UTILISATION

L'autorisation est accordée d'accéder temporairement et d'utiliser le Site Web à des fins personnelles et non commerciales. Il s'agit de l'octroi d'une licence, et non d'un transfert de titre.

Sous cette licence, vous ne pouvez pas :
- Modifier ou copier les matériaux
- Utiliser les matériaux à des fins commerciales
- Tenter de désosser tout logiciel sur le Site Web
- Supprimer toute mention de droits d'auteur ou de propriété
- Transférer les matériaux à une autre personne
- Utiliser le Site Web d'une manière qui viole les lois applicables

3. COMPTES UTILISATEURS

Lorsque vous créez un compte chez nous, vous êtes responsable de :
- Maintenir la sécurité de votre compte
- Toutes les activités qui se produisent sous votre compte
- Nous informer immédiatement de toute utilisation non autorisée

Nous nous réservons le droit de résilier des comptes, de supprimer ou de modifier du contenu à notre seule discrétion.

4. CONTENU

Notre Site Web vous permet de publier, lier, stocker, partager et rendre disponible certaines informations, textes, graphiques ou autres matériaux (« Contenu »).

Vous êtes responsable du Contenu que vous publiez sur ou via le Site Web, y compris sa légalité, sa fiabilité et sa pertinence.

En publiant du Contenu, vous nous accordez le droit et la licence d'utiliser, modifier, exécuter publiquement, afficher publiquement, reproduire et distribuer ce Contenu.

5. PROPRIÉTÉ INTELLECTUELLE

Le Site Web et son contenu, ses fonctionnalités et ses fonctionnalités d'origine sont et resteront la propriété exclusive de ${formData.companyName}. Le Site Web est protégé par les droits d'auteur, les marques de commerce et d'autres lois.

6. UTILISATIONS INTERDITES

Vous ne pouvez pas utiliser le Site Web :
- D'une manière qui viole toute loi ou réglementation applicable
- Pour exploiter, nuire ou tenter d'exploiter ou de nuire aux mineurs
- Pour transmettre tout matériel publicitaire ou promotionnel
- Pour vous faire passer ou tenter de vous faire passer pour l'Entreprise
- D'une manière qui porte atteinte aux droits d'autrui
- Pour vous engager dans toute autre conduite qui restreint ou inhibe l'utilisation du Site Web par quiconque

7. EXCLUSION DE GARANTIES

LE SITE WEB EST FOURNI "TEL QUEL" ET "SELON DISPONIBILITÉ". NOUS NE DONNONS AUCUNE GARANTIE, EXPRESSE OU IMPLICITE, CONCERNANT LE FONCTIONNEMENT DU SITE WEB OU LES INFORMATIONS, CONTENUS OU MATÉRIAUX INCLUS.

8. LIMITATION DE RESPONSABILITÉ

EN AUCUN CAS ${formData.companyName} NE SERA RESPONSABLE DE DOMMAGES INDIRECTS, ACCESSOIRES, SPÉCIAUX, CONSÉCUTIFS OU PUNITIFS DÉCOULANT DE VOTRE UTILISATION DU SITE WEB.

9. LOI APPLICABLE

Ces Conditions seront régies par les lois de ${formData.country}, sans égard à ses dispositions relatives aux conflits de lois.

10. MODIFICATIONS DES CONDITIONS

Nous nous réservons le droit de modifier ces Conditions à tout moment. Nous informerons les utilisateurs de tout changement important en publiant les nouvelles Conditions sur cette page.

11. NOUS CONTACTER

Si vous avez des questions concernant ces Conditions, veuillez nous contacter à :
${formData.contactEmail}

${formData.companyName}
${formData.country}

---
AVERTISSEMENT : Ceci est un modèle et ne constitue pas un conseil juridique. Veuillez consulter un avocat qualifié pour garantir la conformité aux lois applicables.
`;
    } else if (locale === 'ru') {
      return `УСЛОВИЯ ИСПОЛЬЗОВАНИЯ

Последнее обновление: ${formData.lastUpdated}

Пожалуйста, внимательно прочитайте эти Условия использования («Условия») перед использованием ${formData.websiteUrl} («Веб-сайт»), управляемого ${formData.companyName} («мы», «наш» или «наша компания»).

1. ПРИНЯТИЕ УСЛОВИЙ

Получая доступ к этому Веб-сайту и используя его, вы соглашаетесь соблюдать эти Условия. Если вы не согласны с этими Условиями, пожалуйста, не используйте Веб-сайт.

2. ЛИЦЕНЗИЯ НА ИСПОЛЬЗОВАНИЕ

Разрешение предоставляется на временный доступ и использование Веб-сайта в личных, некоммерческих целях. Это предоставление лицензии, а не передача права собственности.

По этой лицензии вы не можете:
- Изменять или копировать материалы
- Использовать материалы в коммерческих целях
- Пытаться провести обратную разработку любого программного обеспечения на Веб-сайте
- Удалять любые уведомления об авторских правах или праве собственности
- Передавать материалы другому лицу
- Использовать Веб-сайт способом, который нарушает применимое законодательство

3. УЧЕТНЫЕ ЗАПИСИ ПОЛЬЗОВАТЕЛЕЙ

Когда вы создаете учетную запись у нас, вы несете ответственность за:
- Обеспечение безопасности вашей учетной записи
- Всю деятельность, которая происходит под вашей учетной записью
- Немедленное уведомление нас о любом несанкционированном использовании

Мы оставляем за собой право прекращать действие учетных записей, удалять или редактировать контент по нашему усмотрению.

4. КОНТЕНТ

Наш Веб-сайт позволяет вам публиковать, связывать, хранить, делиться и иным образом делать доступной определенную информацию, текст, графику или другой материал («Контент»).

Вы несете ответственность за Контент, который вы публикуете на или через Веб-сайт, включая его законность, надежность и уместность.

Публикуя Контент, вы предоставляете нам право и лицензию на использование, изменение, публичное исполнение, публичное отображение, воспроизведение и распространение такого Контента.

5. ИНТЕЛЛЕКТУАЛЬНАЯ СОБСТВЕННОСТЬ

Веб-сайт и его оригинальный контент, функции и функциональность являются и останутся исключительной собственностью ${formData.companyName}. Веб-сайт защищен авторским правом, товарными знаками и другими законами.

6. ЗАПРЕЩЕННОЕ ИСПОЛЬЗОВАНИЕ

Вы не можете использовать Веб-сайт:
- Способом, который нарушает какой-либо применимый закон или правило
- Для эксплуатации, причинения вреда или попытки эксплуатации или причинения вреда несовершеннолетним
- Для передачи любого рекламного или промо-материала
- Для того чтобы выдавать себя или пытаться выдать себя за Компанию
- Способом, который нарушает права других
- Для участия в любом другом поведении, которое ограничивает или препятствует использованию Веб-сайта кем-либо

7. ОТКАЗ ОТ ГАРАНТИЙ

ВЕБ-САЙТ ПРЕДОСТАВЛЯЕТСЯ «КАК ЕСТЬ» И «КАК ДОСТУПНО». МЫ НЕ ДАЕМ НИКАКИХ ГАРАНТИЙ, ЯВНЫХ ИЛИ ПОДРАЗУМЕВАЕМЫХ, ОТНОСИТЕЛЬНО РАБОТЫ ВЕБ-САЙТА ИЛИ ВКЛЮЧЕННОЙ ИНФОРМАЦИИ, КОНТЕНТА ИЛИ МАТЕРИАЛОВ.

8. ОГРАНИЧЕНИЕ ОТВЕТСТВЕННОСТИ

НИ ПРИ КАКИХ ОБСТОЯТЕЛЬСТВАХ ${formData.companyName} НЕ НЕСЕТ ОТВЕТСТВЕННОСТИ ЗА ЛЮБЫЕ КОСВЕННЫЕ, СЛУЧАЙНЫЕ, СПЕЦИАЛЬНЫЕ, ПОСЛЕДУЮЩИЕ ИЛИ ШТРАФНЫЕ УБЫТКИ, ВОЗНИКАЮЩИЕ В РЕЗУЛЬТАТЕ ВАШЕГО ИСПОЛЬЗОВАНИЯ ВЕБ-САЙТА.

9. ПРИМЕНИМОЕ ЗАКОНОДАТЕЛЬСТВО

Эти Условия регулируются законами ${formData.country} без учета его положений о коллизии законов.

10. ИЗМЕНЕНИЯ УСЛОВИЙ

Мы оставляем за собой право изменять эти Условия в любое время. Мы уведомим пользователей о любых существенных изменениях, разместив новые Условия на этой странице.

11. СВЯЖИТЕСЬ С НАМИ

Если у вас есть вопросы об этих Условиях, пожалуйста, свяжитесь с нами по адресу:
${formData.contactEmail}

${formData.companyName}
${formData.country}

---
ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ: Это шаблон и не является юридической консультацией. Пожалуйста, проконсультируйтесь с квалифицированным юристом для обеспечения соответствия применимым законам.
`;
    } else if (locale === 'it') {
      return `TERMINI DI SERVIZIO

Ultimo aggiornamento: ${formData.lastUpdated}

Si prega di leggere attentamente questi Termini di Servizio ("Termini") prima di utilizzare ${formData.websiteUrl} (il "Sito Web") gestito da ${formData.companyName} ("noi", "nostro" o "nostra azienda").

1. ACCETTAZIONE DEI TERMINI

Accedendo e utilizzando questo Sito Web, accetti di essere vincolato da questi Termini. Se non accetti questi Termini, ti preghiamo di non utilizzare il Sito Web.

2. LICENZA D'USO

È concesso il permesso di accedere temporaneamente e utilizzare il Sito Web per scopi personali e non commerciali. Questa è la concessione di una licenza, non un trasferimento di titolo.

Con questa licenza, non puoi:
- Modificare o copiare i materiali
- Utilizzare i materiali per scopi commerciali
- Tentare di decodificare qualsiasi software sul Sito Web
- Rimuovere qualsiasi nota di copyright o proprietà
- Trasferire i materiali a un'altra persona
- Utilizzare il Sito Web in un modo che violi le leggi applicabili

3. ACCOUNT UTENTE

Quando crei un account con noi, sei responsabile di:
- Mantenere la sicurezza del tuo account
- Tutte le attività che si verificano sotto il tuo account
- Notificarci immediatamente di qualsiasi uso non autorizzato

Ci riserviamo il diritto di terminare gli account, rimuovere o modificare i contenuti a nostra esclusiva discrezione.

4. CONTENUTO

Il nostro Sito Web ti consente di pubblicare, collegare, archiviare, condividere e rendere disponibili determinate informazioni, testo, grafica o altro materiale ("Contenuto").

Sei responsabile del Contenuto che pubblichi sul o tramite il Sito Web, inclusa la sua legalità, affidabilità e appropriatezza.

Pubblicando Contenuto, ci concedi il diritto e la licenza di utilizzare, modificare, eseguire pubblicamente, visualizzare pubblicamente, riprodurre e distribuire tale Contenuto.

5. PROPRIETÀ INTELLETTUALE

Il Sito Web e il suo contenuto, le funzionalità e le funzionalità originali sono e rimarranno di proprietà esclusiva di ${formData.companyName}. Il Sito Web è protetto da copyright, marchi registrati e altre leggi.

6. USI VIETATI

Non puoi utilizzare il Sito Web:
- In un modo che violi qualsiasi legge o regolamento applicabile
- Per sfruttare, danneggiare o tentare di sfruttare o danneggiare i minori
- Per trasmettere qualsiasi materiale pubblicitario o promozionale
- Per impersonare o tentare di impersonare l'Azienda
- In un modo che violi i diritti altrui
- Per impegnarsi in qualsiasi altra condotta che limiti o inibisca l'uso del Sito Web da parte di chiunque

7. ESCLUSIONE DI GARANZIE

IL SITO WEB È FORNITO "COSÌ COM'È" E "COME DISPONIBILE". NON FORNIAMO GARANZIE, ESPRESSE O IMPLICITE, RIGUARDO AL FUNZIONAMENTO DEL SITO WEB O ALLE INFORMAZIONI, CONTENUTI O MATERIALI INCLUSI.

8. LIMITAZIONE DI RESPONSABILITÀ

IN NESSUN CASO ${formData.companyName} SARÀ RESPONSABILE PER DANNI INDIRETTI, INCIDENTALI, SPECIALI, CONSEQUENZIALI O PUNITIVI DERIVANTI DAL TUO USO DEL SITO WEB.

9. LEGGE APPLICABILE

Questi Termini saranno regolati dalle leggi di ${formData.country}, senza riguardo alle sue disposizioni sui conflitti di leggi.

10. MODIFICHE AI TERMINI

Ci riserviamo il diritto di modificare questi Termini in qualsiasi momento. Informeremo gli utenti di eventuali modifiche sostanziali pubblicando i nuovi Termini su questa pagina.

11. CONTATTACI

Se hai domande su questi Termini, contattaci all'indirizzo:
${formData.contactEmail}

${formData.companyName}
${formData.country}

---
DISCLAIMER: Questo è un modello e non costituisce consulenza legale. Si prega di consultare un avvocato qualificato per garantire la conformità alle leggi applicabili.
`;
    }

    return `TERMS OF SERVICE

Last updated: ${formData.lastUpdated}

Please read these Terms of Service ("Terms") carefully before using ${formData.websiteUrl} (the "Website") operated by ${formData.companyName} ("us", "we", or "our").

1. ACCEPTANCE OF TERMS

By accessing and using this Website, you accept and agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Website.

2. USE LICENSE

Permission is granted to temporarily access and use the Website for personal, non-commercial purposes. This is the grant of a license, not a transfer of title.

Under this license, you may not:
- Modify or copy the materials
- Use the materials for any commercial purpose
- Attempt to reverse engineer any software on the Website
- Remove any copyright or proprietary notations
- Transfer the materials to another person
- Use the Website in any way that violates applicable laws

3. USER ACCOUNTS

When you create an account with us, you are responsible for:
- Maintaining the security of your account
- All activities that occur under your account
- Notifying us immediately of any unauthorized use

We reserve the right to terminate accounts, remove or edit content at our sole discretion.

4. CONTENT

Our Website allows you to post, link, store, share and otherwise make available certain information, text, graphics, or other material ("Content").

You are responsible for the Content that you post on or through the Website, including its legality, reliability, and appropriateness.

By posting Content, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content.

5. INTELLECTUAL PROPERTY

The Website and its original content, features, and functionality are and will remain the exclusive property of ${formData.companyName}. The Website is protected by copyright, trademark, and other laws.

6. PROHIBITED USES

You may not use the Website:
- In any way that violates any applicable law or regulation
- To exploit, harm, or attempt to exploit or harm minors
- To transmit any advertising or promotional material
- To impersonate or attempt to impersonate the Company
- In any way that infringes upon the rights of others
- To engage in any other conduct that restricts or inhibits anyone's use of the Website

7. DISCLAIMER OF WARRANTIES

THE WEBSITE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE MAKE NO WARRANTIES, EXPRESSED OR IMPLIED, REGARDING THE WEBSITE'S OPERATION OR THE INFORMATION, CONTENT, OR MATERIALS INCLUDED.

8. LIMITATION OF LIABILITY

IN NO EVENT SHALL ${formData.companyName} BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF YOUR USE OF THE WEBSITE.

9. GOVERNING LAW

These Terms shall be governed by the laws of ${formData.country}, without regard to its conflict of law provisions.

10. CHANGES TO TERMS

We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page.

11. CONTACT US

If you have any questions about these Terms, please contact us at:
${formData.contactEmail}

${formData.companyName}
${formData.country}

---
DISCLAIMER: This is a template and does not constitute legal advice. Please consult with a qualified attorney to ensure compliance with applicable laws.
`;
  };

  const generateCookiePolicy = () => {
    if (locale === 'pt') {
      return `POLÍTICA DE COOKIES

Última atualização: ${formData.lastUpdated}

Esta Política de Cookies explica como ${formData.companyName} ("nós", "nosso" ou "nossa empresa") usa cookies e tecnologias similares quando você visita ${formData.websiteUrl} (o "Website").

1. O QUE SÃO COOKIES?

Cookies são pequenos arquivos de texto armazenados no seu dispositivo (computador, tablet ou celular) quando você visita um website. Eles ajudam os websites a lembrar suas preferências e melhorar sua experiência de navegação.

2. COMO USAMOS COOKIES?

Usamos cookies para:
- Essenciais: Necessários para o funcionamento básico do Website
- Desempenho: Coletam informações sobre como você usa o Website
- Funcionalidade: Lembram suas preferências e escolhas
- Publicidade: Fornecem anúncios relevantes para você

3. TIPOS DE COOKIES QUE USAMOS

a) Cookies Estritamente Necessários
Estes cookies são essenciais para o funcionamento do Website. Sem estes cookies, alguns serviços não podem ser fornecidos.

b) Cookies de Desempenho
Estes cookies nos ajudam a entender como os visitantes interagem com o Website, coletando e relatando informações anonimamente.

c) Cookies de Funcionalidade
Estes cookies permitem que o Website lembre suas escolhas (como idioma ou região) e forneça recursos aprimorados e personalizados.

d) Cookies de Publicidade/Direcionamento
Estes cookies são usados para entregar anúncios mais relevantes para você e seus interesses. Também são usados para limitar o número de vezes que você vê um anúncio.

4. COOKIES DE TERCEIROS

Além de nossos próprios cookies, também podemos usar vários cookies de terceiros para relatar estatísticas de uso do Website e fornecer anúncios através do Website.

5. COMO CONTROLAR COOKIES?

Você pode controlar e/ou excluir cookies como desejar. Você pode deletar todos os cookies já presentes no seu computador e configurar a maioria dos navegadores para impedir que sejam colocados.

Opções de controle de cookies:
- Configurações do navegador: Todos os navegadores modernos permitem que você gerencie cookies
- Ferramentas de terceiros: Existem ferramentas online que ajudam a gerenciar cookies

6. SINAIS DE NÃO RASTREAR

Alguns navegadores incluem um recurso de "Não Rastrear" (DNT). Atualmente, nosso Website não responde a sinais DNT.

7. ATUALIZAÇÕES DESTA POLÍTICA

Podemos atualizar esta Política de Cookies periodicamente para refletir mudanças na tecnologia ou legislação. Quaisquer atualizações serão publicadas nesta página.

8. ENTRE EM CONTATO

Se você tiver dúvidas sobre nosso uso de cookies, entre em contato conosco:
Email: ${formData.contactEmail}
Website: ${formData.websiteUrl}
País: ${formData.country}

---
AVISO LEGAL: Este é um modelo e não constitui aconselhamento jurídico. Consulte um advogado qualificado para garantir conformidade com as leis aplicáveis (LGPD, GDPR, CCPA, etc.).
`;
    } else if (locale === 'es') {
      return `POLÍTICA DE COOKIES

Última actualización: ${formData.lastUpdated}

Esta Política de Cookies explica cómo ${formData.companyName} ("nosotros", "nuestro" o "nuestra empresa") utiliza cookies y tecnologías similares cuando visita ${formData.websiteUrl} (el "Sitio Web").

1. ¿QUÉ SON LAS COOKIES?

Las cookies son pequeños archivos de texto que se colocan en su dispositivo cuando visita un sitio web. Se utilizan ampliamente para hacer que los sitios web funcionen de manera más eficiente y proporcionen información a los propietarios del sitio web.

2. CÓMO USAMOS LAS COOKIES

Utilizamos cookies para los siguientes propósitos:

COOKIES ESENCIALES
Estas cookies son necesarias para que el Sitio Web funcione y no se pueden desactivar. Por lo general, se configuran en respuesta a acciones que realiza, como establecer preferencias de privacidad o iniciar sesión.

COOKIES ANALÍTICAS
Estas cookies nos ayudan a comprender cómo los visitantes interactúan con nuestro Sitio Web al recopilar y reportar información de forma anónima. Esto nos ayuda a mejorar la funcionalidad del Sitio Web.

COOKIES DE FUNCIONALIDAD
Estas cookies permiten funcionalidad mejorada y personalización, como recordar sus preferencias y configuraciones.

COOKIES PUBLICITARIAS
Estas cookies pueden ser establecidas a través de nuestro Sitio Web por nuestros socios publicitarios para crear un perfil de sus intereses y mostrarle anuncios relevantes en otros sitios web.

3. TIPOS DE COOKIES QUE UTILIZAMOS

Cookies de Primera Parte: Establecidas directamente por nosotros
Cookies de Terceros: Establecidas por servicios de terceros que utilizamos, como:
- Google Analytics (análisis)
- Plataformas de redes sociales (funcionalidad de compartir)
- Redes publicitarias (publicidad dirigida)

4. SUS OPCIONES

Tiene derecho a decidir si acepta o rechaza las cookies.

CONTROLES DEL NAVEGADOR
La mayoría de los navegadores web le permiten controlar las cookies a través de su configuración. Puede:
- Bloquear todas las cookies
- Bloquear cookies de terceros
- Eliminar cookies cuando cierra su navegador
- Navegar en modo privado/incógnito

Tenga en cuenta que bloquear las cookies puede afectar su experiencia en nuestro Sitio Web.

HERRAMIENTA DE CONSENTIMIENTO DE COOKIES
Cuando visita nuestro Sitio Web por primera vez, le pediremos su consentimiento para usar cookies. Puede cambiar sus preferencias en cualquier momento haciendo clic en el enlace de configuración de cookies.

5. INFORMACIÓN ESPECÍFICA DE COOKIES

Cookies Esenciales:
- Cookies de sesión (expiran cuando cierra su navegador)
- Cookies de autenticación (recuerdan su inicio de sesión)
- Cookies de seguridad (detectan abuso de autenticación)

Cookies Analíticas:
- Google Analytics: _ga, _gid, _gat (se utilizan para distinguir usuarios y limitar la tasa de solicitudes)
  Duración: 2 años / 24 horas / 1 minuto
  Proveedor: Google LLC
  Propósito: Análisis del sitio web

6. SEÑALES DE NO RASTREAR

Algunos navegadores incluyen una función de "No Rastrear" (DNT). Actualmente, nuestro Sitio Web no responde a señales DNT.

7. ACTUALIZACIONES DE ESTA POLÍTICA

Podemos actualizar esta Política de Cookies de vez en cuando para reflejar cambios en la tecnología o requisitos legales. Le notificaremos cualquier cambio importante publicando la política actualizada en esta página.

8. MÁS INFORMACIÓN

Para obtener más información sobre las cookies, incluido cómo ver qué cookies se han establecido y cómo administrarlas y eliminarlas, visite:
- www.aboutcookies.org
- www.allaboutcookies.org

9. CONTÁCTENOS

Si tiene alguna pregunta sobre nuestro uso de cookies, contáctenos en:
${formData.contactEmail}

${formData.companyName}
${formData.country}

---
DESCARGO DE RESPONSABILIDAD: Esta es una plantilla y no constituye asesoramiento legal. Consulte con un abogado calificado para garantizar el cumplimiento de las leyes aplicables (GDPR, CCPA, etc.).
`;
    } else if (locale === 'de') {
      return `COOKIE-RICHTLINIE

Letzte Aktualisierung: ${formData.lastUpdated}

Diese Cookie-Richtlinie erklärt, wie ${formData.companyName} („wir", „uns" oder „unser Unternehmen") Cookies und ähnliche Technologien verwendet, wenn Sie ${formData.websiteUrl} (die „Website") besuchen.

1. WAS SIND COOKIES?

Cookies sind kleine Textdateien, die auf Ihrem Gerät abgelegt werden, wenn Sie eine Website besuchen. Sie werden häufig verwendet, um Websites effizienter zu machen und Informationen an Website-Eigentümer zu liefern.

2. WIE WIR COOKIES VERWENDEN

Wir verwenden Cookies für die folgenden Zwecke:

ERFORDERLICHE COOKIES
Diese Cookies sind für das Funktionieren der Website erforderlich und können nicht deaktiviert werden. Sie werden normalerweise als Reaktion auf Ihre Aktionen festgelegt, wie z. B. das Festlegen von Datenschutzeinstellungen oder das Anmelden.

ANALYSE-COOKIES
Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, indem sie Informationen anonym sammeln und melden. Dies hilft uns, die Funktionalität der Website zu verbessern.

FUNKTIONALITÄTS-COOKIES
Diese Cookies ermöglichen erweiterte Funktionalität und Personalisierung, wie z. B. das Speichern Ihrer Präferenzen und Einstellungen.

WERBE-COOKIES
Diese Cookies können über unsere Website von unseren Werbepartnern gesetzt werden, um ein Profil Ihrer Interessen zu erstellen und Ihnen relevante Anzeigen auf anderen Websites zu zeigen.

3. ARTEN VON COOKIES, DIE WIR VERWENDEN

Eigene Cookies: Direkt von uns gesetzt
Cookies von Drittanbietern: Von Drittanbieterdiensten gesetzt, die wir verwenden, wie z. B.:
- Google Analytics (Analyse)
- Social-Media-Plattformen (Sharing-Funktionalität)
- Werbenetzwerke (gezielte Werbung)

4. IHRE WAHLMÖGLICHKEITEN

Sie haben das Recht zu entscheiden, ob Sie Cookies akzeptieren oder ablehnen.

BROWSER-STEUERUNGEN
Die meisten Webbrowser ermöglichen es Ihnen, Cookies über ihre Einstellungen zu steuern. Sie können:
- Alle Cookies blockieren
- Cookies von Drittanbietern blockieren
- Cookies löschen, wenn Sie Ihren Browser schließen
- Im privaten/Inkognito-Modus surfen

Bitte beachten Sie, dass das Blockieren von Cookies Ihre Erfahrung auf unserer Website beeinträchtigen kann.

COOKIE-EINWILLIGUNGSTOOL
Wenn Sie unsere Website zum ersten Mal besuchen, bitten wir Sie um Ihre Einwilligung zur Verwendung von Cookies. Sie können Ihre Präferenzen jederzeit ändern, indem Sie auf den Link zu den Cookie-Einstellungen klicken.

5. SPEZIFISCHE COOKIE-INFORMATIONEN

Erforderliche Cookies:
- Sitzungs-Cookies (laufen ab, wenn Sie Ihren Browser schließen)
- Authentifizierungs-Cookies (speichern Ihre Anmeldung)
- Sicherheits-Cookies (erkennen Authentifizierungsmissbrauch)

Analyse-Cookies:
- Google Analytics: _ga, _gid, _gat (werden verwendet, um Benutzer zu unterscheiden und die Anforderungsrate zu drosseln)
  Dauer: 2 Jahre / 24 Stunden / 1 Minute
  Anbieter: Google LLC
  Zweck: Website-Analyse

6. DO-NOT-TRACK-SIGNALE

Einige Browser verfügen über eine „Do Not Track" (DNT)-Funktion. Unsere Website reagiert derzeit nicht auf DNT-Signale.

7. AKTUALISIERUNGEN DIESER RICHTLINIE

Wir können diese Cookie-Richtlinie von Zeit zu Zeit aktualisieren, um Änderungen in der Technologie oder gesetzlichen Anforderungen widerzuspiegeln. Wir werden Sie über wesentliche Änderungen informieren, indem wir die aktualisierte Richtlinie auf dieser Seite veröffentlichen.

8. WEITERE INFORMATIONEN

Für weitere Informationen über Cookies, einschließlich wie Sie sehen können, welche Cookies gesetzt wurden und wie Sie diese verwalten und löschen können, besuchen Sie:
- www.aboutcookies.org
- www.allaboutcookies.org

9. KONTAKTIEREN SIE UNS

Wenn Sie Fragen zu unserer Verwendung von Cookies haben, kontaktieren Sie uns bitte unter:
${formData.contactEmail}

${formData.companyName}
${formData.country}

---
HAFTUNGSAUSSCHLUSS: Dies ist eine Vorlage und stellt keine Rechtsberatung dar. Bitte konsultieren Sie einen qualifizierten Rechtsanwalt, um die Einhaltung geltender Gesetze (DSGVO, CCPA usw.) sicherzustellen.
`;
    } else if (locale === 'fr') {
      return `POLITIQUE DE COOKIES

Dernière mise à jour : ${formData.lastUpdated}

Cette Politique de Cookies explique comment ${formData.companyName} (« nous », « notre » ou « notre entreprise ») utilise les cookies et technologies similaires lorsque vous visitez ${formData.websiteUrl} (le « Site Web »).

1. QU'EST-CE QUE LES COOKIES ?

Les cookies sont de petits fichiers texte qui sont placés sur votre appareil lorsque vous visitez un site web. Ils sont largement utilisés pour faire fonctionner les sites web de manière plus efficace et fournir des informations aux propriétaires du site.

2. COMMENT NOUS UTILISONS LES COOKIES

Nous utilisons les cookies aux fins suivantes :

COOKIES ESSENTIELS
Ces cookies sont nécessaires au fonctionnement du Site Web et ne peuvent pas être désactivés. Ils sont généralement définis en réponse à vos actions, telles que la définition des préférences de confidentialité ou la connexion.

COOKIES ANALYTIQUES
Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre Site Web en collectant et en rapportant des informations de manière anonyme. Cela nous aide à améliorer la fonctionnalité du Site Web.

COOKIES DE FONCTIONNALITÉ
Ces cookies permettent une fonctionnalité et une personnalisation améliorées, comme se souvenir de vos préférences et paramètres.

COOKIES PUBLICITAIRES
Ces cookies peuvent être définis via notre Site Web par nos partenaires publicitaires pour créer un profil de vos intérêts et vous montrer des publicités pertinentes sur d'autres sites web.

3. TYPES DE COOKIES QUE NOUS UTILISONS

Cookies de première partie : Définis directement par nous
Cookies de tiers : Définis par des services tiers que nous utilisons, tels que :
- Google Analytics (analyse)
- Plateformes de médias sociaux (fonctionnalité de partage)
- Réseaux publicitaires (publicité ciblée)

4. VOS CHOIX

Vous avez le droit de décider d'accepter ou de refuser les cookies.

CONTRÔLES DU NAVIGATEUR
La plupart des navigateurs web vous permettent de contrôler les cookies via leurs paramètres. Vous pouvez :
- Bloquer tous les cookies
- Bloquer les cookies de tiers
- Supprimer les cookies lorsque vous fermez votre navigateur
- Naviguer en mode privé/incognito

Veuillez noter que le blocage des cookies peut affecter votre expérience sur notre Site Web.

OUTIL DE CONSENTEMENT AUX COOKIES
Lorsque vous visitez notre Site Web pour la première fois, nous vous demanderons votre consentement pour utiliser des cookies. Vous pouvez modifier vos préférences à tout moment en cliquant sur le lien des paramètres de cookies.

5. INFORMATIONS SPÉCIFIQUES SUR LES COOKIES

Cookies Essentiels :
- Cookies de session (expirent lorsque vous fermez votre navigateur)
- Cookies d'authentification (mémorisent votre connexion)
- Cookies de sécurité (détectent les abus d'authentification)

Cookies Analytiques :
- Google Analytics : _ga, _gid, _gat (utilisés pour distinguer les utilisateurs et limiter le taux de demande)
  Durée : 2 ans / 24 heures / 1 minute
  Fournisseur : Google LLC
  Objectif : Analyse du site web

6. SIGNAUX DE NON-SUIVI

Certains navigateurs incluent une fonctionnalité « Ne pas suivre » (DNT). Notre Site Web ne répond actuellement pas aux signaux DNT.

7. MISES À JOUR DE CETTE POLITIQUE

Nous pouvons mettre à jour cette Politique de Cookies de temps à autre pour refléter les changements technologiques ou les exigences légales. Nous vous informerons de tout changement important en publiant la politique mise à jour sur cette page.

8. PLUS D'INFORMATIONS

Pour plus d'informations sur les cookies, y compris comment voir quels cookies ont été définis et comment les gérer et les supprimer, visitez :
- www.aboutcookies.org
- www.allaboutcookies.org

9. NOUS CONTACTER

Si vous avez des questions sur notre utilisation des cookies, veuillez nous contacter à :
${formData.contactEmail}

${formData.companyName}
${formData.country}

---
AVERTISSEMENT : Ceci est un modèle et ne constitue pas un conseil juridique. Veuillez consulter un avocat qualifié pour garantir la conformité aux lois applicables (RGPD, CCPA, etc.).
`;
    } else if (locale === 'ru') {
      return `ПОЛИТИКА ИСПОЛЬЗОВАНИЯ ФАЙЛОВ COOKIE

Последнее обновление: ${formData.lastUpdated}

Настоящая Политика использования файлов cookie объясняет, как ${formData.companyName} («мы», «наш» или «наша компания») использует файлы cookie и аналогичные технологии при посещении ${formData.websiteUrl} («Веб-сайт»).

1. ЧТО ТАКОЕ ФАЙЛЫ COOKIE?

Файлы cookie — это небольшие текстовые файлы, которые размещаются на вашем устройстве при посещении веб-сайта. Они широко используются для того, чтобы веб-сайты работали более эффективно и предоставляли информацию владельцам сайтов.

2. КАК МЫ ИСПОЛЬЗУЕМ ФАЙЛЫ COOKIE

Мы используем файлы cookie в следующих целях:

НЕОБХОДИМЫЕ ФАЙЛЫ COOKIE
Эти файлы cookie необходимы для функционирования Веб-сайта и не могут быть отключены. Обычно они устанавливаются в ответ на ваши действия, такие как установка настроек конфиденциальности или вход в систему.

АНАЛИТИЧЕСКИЕ ФАЙЛЫ COOKIE
Эти файлы cookie помогают нам понять, как посетители взаимодействуют с нашим Веб-сайтом, собирая и сообщая информацию анонимно. Это помогает нам улучшить функциональность Веб-сайта.

ФУНКЦИОНАЛЬНЫЕ ФАЙЛЫ COOKIE
Эти файлы cookie обеспечивают расширенную функциональность и персонализацию, например запоминание ваших предпочтений и настроек.

РЕКЛАМНЫЕ ФАЙЛЫ COOKIE
Эти файлы cookie могут быть установлены через наш Веб-сайт нашими рекламными партнерами для создания профиля ваших интересов и показа вам релевантной рекламы на других веб-сайтах.

3. ТИПЫ ФАЙЛОВ COOKIE, КОТОРЫЕ МЫ ИСПОЛЬЗУЕМ

Собственные файлы cookie: Устанавливаются непосредственно нами
Сторонние файлы cookie: Устанавливаются сторонними сервисами, которые мы используем, такими как:
- Google Analytics (аналитика)
- Платформы социальных сетей (функция обмена)
- Рекламные сети (таргетированная реклама)

4. ВАШИ ВОЗМОЖНОСТИ

Вы имеете право решать, принимать или отклонять файлы cookie.

ЭЛЕМЕНТЫ УПРАВЛЕНИЯ БРАУЗЕРА
Большинство веб-браузеров позволяют вам управлять файлами cookie через их настройки. Вы можете:
- Блокировать все файлы cookie
- Блокировать сторонние файлы cookie
- Удалять файлы cookie при закрытии браузера
- Просматривать в приватном/инкогнито режиме

Обратите внимание, что блокировка файлов cookie может повлиять на ваш опыт использования нашего Веб-сайта.

ИНСТРУМЕНТ СОГЛАСИЯ НА ИСПОЛЬЗОВАНИЕ ФАЙЛОВ COOKIE
При первом посещении нашего Веб-сайта мы попросим ваше согласие на использование файлов cookie. Вы можете изменить свои предпочтения в любое время, нажав на ссылку настроек файлов cookie.

5. КОНКРЕТНАЯ ИНФОРМАЦИЯ О ФАЙЛАХ COOKIE

Необходимые файлы cookie:
- Сеансовые файлы cookie (истекают при закрытии браузера)
- Файлы cookie аутентификации (запоминают ваш вход)
- Файлы cookie безопасности (обнаруживают злоупотребление аутентификацией)

Аналитические файлы cookie:
- Google Analytics: _ga, _gid, _gat (используются для различения пользователей и ограничения скорости запросов)
  Продолжительность: 2 года / 24 часа / 1 минута
  Поставщик: Google LLC
  Цель: Аналитика веб-сайта

6. СИГНАЛЫ «НЕ ОТСЛЕЖИВАТЬ»

Некоторые браузеры включают функцию «Не отслеживать» (DNT). В настоящее время наш Веб-сайт не реагирует на сигналы DNT.

7. ОБНОВЛЕНИЯ ЭТОЙ ПОЛИТИКИ

Мы можем время от времени обновлять эту Политику использования файлов cookie, чтобы отразить изменения в технологии или юридических требованиях. Мы уведомим вас о любых существенных изменениях, разместив обновленную политику на этой странице.

8. ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ

Для получения дополнительной информации о файлах cookie, включая то, как увидеть, какие файлы cookie были установлены и как управлять ими и удалять их, посетите:
- www.aboutcookies.org
- www.allaboutcookies.org

9. СВЯЖИТЕСЬ С НАМИ

Если у вас есть вопросы о нашем использовании файлов cookie, пожалуйста, свяжитесь с нами по адресу:
${formData.contactEmail}

${formData.companyName}
${formData.country}

---
ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ: Это шаблон и не является юридической консультацией. Пожалуйста, проконсультируйтесь с квалифицированным юристом для обеспечения соответствия применимым законам (GDPR, CCPA и т.д.).
`;
    } else if (locale === 'it') {
      return `INFORMATIVA SUI COOKIE

Ultimo aggiornamento: ${formData.lastUpdated}

Questa Informativa sui Cookie spiega come ${formData.companyName} ("noi", "nostro" o "nostra azienda") utilizza i cookie e tecnologie simili quando visiti ${formData.websiteUrl} (il "Sito Web").

1. COSA SONO I COOKIE?

I cookie sono piccoli file di testo che vengono inseriti sul tuo dispositivo quando visiti un sito web. Sono ampiamente utilizzati per far funzionare i siti web in modo più efficiente e fornire informazioni ai proprietari del sito.

2. COME UTILIZZIAMO I COOKIE

Utilizziamo i cookie per i seguenti scopi:

COOKIE ESSENZIALI
Questi cookie sono necessari per il funzionamento del Sito Web e non possono essere disattivati. Di solito vengono impostati in risposta alle tue azioni, come l'impostazione delle preferenze sulla privacy o l'accesso.

COOKIE ANALITICI
Questi cookie ci aiutano a capire come i visitatori interagiscono con il nostro Sito Web raccogliendo e segnalando informazioni in modo anonimo. Questo ci aiuta a migliorare la funzionalità del Sito Web.

COOKIE DI FUNZIONALITÀ
Questi cookie consentono funzionalità migliorate e personalizzazione, come ricordare le tue preferenze e impostazioni.

COOKIE PUBBLICITARI
Questi cookie possono essere impostati tramite il nostro Sito Web dai nostri partner pubblicitari per creare un profilo dei tuoi interessi e mostrarti annunci pertinenti su altri siti web.

3. TIPI DI COOKIE CHE UTILIZZIAMO

Cookie di prima parte: Impostati direttamente da noi
Cookie di terze parti: Impostati da servizi di terze parti che utilizziamo, come:
- Google Analytics (analisi)
- Piattaforme di social media (funzionalità di condivisione)
- Reti pubblicitarie (pubblicità mirata)

4. LE TUE SCELTE

Hai il diritto di decidere se accettare o rifiutare i cookie.

CONTROLLI DEL BROWSER
La maggior parte dei browser web ti consente di controllare i cookie tramite le loro impostazioni. Puoi:
- Bloccare tutti i cookie
- Bloccare i cookie di terze parti
- Eliminare i cookie quando chiudi il browser
- Navigare in modalità privata/incognito

Si prega di notare che il blocco dei cookie potrebbe influire sulla tua esperienza sul nostro Sito Web.

STRUMENTO DI CONSENSO AI COOKIE
Quando visiti il nostro Sito Web per la prima volta, ti chiederemo il consenso per utilizzare i cookie. Puoi modificare le tue preferenze in qualsiasi momento facendo clic sul link delle impostazioni dei cookie.

5. INFORMAZIONI SPECIFICHE SUI COOKIE

Cookie Essenziali:
- Cookie di sessione (scadono quando chiudi il browser)
- Cookie di autenticazione (ricordano il tuo accesso)
- Cookie di sicurezza (rilevano abusi di autenticazione)

Cookie Analitici:
- Google Analytics: _ga, _gid, _gat (utilizzati per distinguere gli utenti e limitare la frequenza delle richieste)
  Durata: 2 anni / 24 ore / 1 minuto
  Fornitore: Google LLC
  Scopo: Analisi del sito web

6. SEGNALI DI NON TRACCIAMENTO

Alcuni browser includono una funzione "Do Not Track" (DNT). Il nostro Sito Web attualmente non risponde ai segnali DNT.

7. AGGIORNAMENTI DI QUESTA INFORMATIVA

Potremmo aggiornare questa Informativa sui Cookie di tanto in tanto per riflettere cambiamenti nella tecnologia o requisiti legali. Ti informeremo di eventuali modifiche sostanziali pubblicando l'informativa aggiornata su questa pagina.

8. MAGGIORI INFORMAZIONI

Per ulteriori informazioni sui cookie, incluso come vedere quali cookie sono stati impostati e come gestirli ed eliminarli, visita:
- www.aboutcookies.org
- www.allaboutcookies.org

9. CONTATTACI

Se hai domande sul nostro uso dei cookie, contattaci all'indirizzo:
${formData.contactEmail}

${formData.companyName}
${formData.country}

---
DISCLAIMER: Questo è un modello e non costituisce consulenza legale. Si prega di consultare un avvocato qualificato per garantire la conformità alle leggi applicabili (GDPR, CCPA, ecc.).
`;
    }

    return `COOKIE POLICY

Last updated: ${formData.lastUpdated}

This Cookie Policy explains how ${formData.companyName} ("we", "us", or "our") uses cookies and similar technologies when you visit ${formData.websiteUrl} (the "Website").

1. WHAT ARE COOKIES?

Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.

2. HOW WE USE COOKIES

We use cookies for the following purposes:

ESSENTIAL COOKIES
These cookies are necessary for the Website to function and cannot be switched off. They are usually set in response to actions you take, such as setting privacy preferences or logging in.

ANALYTICS COOKIES
These cookies help us understand how visitors interact with our Website by collecting and reporting information anonymously. This helps us improve the Website's functionality.

FUNCTIONALITY COOKIES
These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.

ADVERTISING COOKIES
These cookies may be set through our Website by our advertising partners to build a profile of your interests and show you relevant ads on other websites.

3. TYPES OF COOKIES WE USE

First-Party Cookies: Set by us directly
Third-Party Cookies: Set by third-party services we use, such as:
- Google Analytics (analytics)
- Social media platforms (sharing functionality)
- Advertising networks (targeted advertising)

4. YOUR CHOICES

You have the right to decide whether to accept or reject cookies.

BROWSER CONTROLS
Most web browsers allow you to control cookies through their settings. You can:
- Block all cookies
- Block third-party cookies
- Delete cookies when you close your browser
- Browse in private/incognito mode

Please note that blocking cookies may impact your experience on our Website.

COOKIE CONSENT TOOL
When you first visit our Website, we will ask for your consent to use cookies. You can change your preferences at any time by clicking the cookie settings link.

5. SPECIFIC COOKIE INFORMATION

Essential Cookies:
- Session cookies (expire when you close your browser)
- Authentication cookies (remember your login)
- Security cookies (detect authentication abuse)

Analytics Cookies:
- Google Analytics: _ga, _gid, _gat (used to distinguish users and throttle request rate)
  Duration: 2 years / 24 hours / 1 minute
  Provider: Google LLC
  Purpose: Website analytics

6. DO NOT TRACK SIGNALS

Some browsers include a "Do Not Track" (DNT) feature. Our Website currently does not respond to DNT signals.

7. UPDATES TO THIS POLICY

We may update this Cookie Policy from time to time to reflect changes in technology or legal requirements. We will notify you of any material changes by posting the updated policy on this page.

8. MORE INFORMATION

For more information about cookies, including how to see what cookies have been set and how to manage and delete them, visit:
- www.aboutcookies.org
- www.allaboutcookies.org

9. CONTACT US

If you have any questions about our use of cookies, please contact us at:
${formData.contactEmail}

${formData.companyName}
${formData.country}

---
DISCLAIMER: This is a template and does not constitute legal advice. Please consult with a qualified attorney to ensure compliance with applicable laws (GDPR, CCPA, etc.).
`;
  };

  const generate = () => {
    if (!formData.companyName || !formData.websiteUrl || !formData.contactEmail) {
      alert(t('alertFillRequired'));
      return;
    }

    let policy = '';
    switch (policyType) {
      case 'privacy':
        policy = generatePrivacyPolicy();
        break;
      case 'terms':
        policy = generateTermsOfService();
        break;
      case 'cookies':
        policy = generateCookiePolicy();
        break;
    }

    setGeneratedPolicy(policy);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPolicy);
    alert(t('alertPolicyCopied'));
  };

  const downloadPolicy = () => {
    const filename = `${policyType}-policy-${formData.companyName.toLowerCase().replace(/\s+/g, '-')}.txt`;
    const blob = new Blob([generatedPolicy], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Disclaimer */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded">
        <p className="font-semibold text-yellow-800 dark:text-yellow-400 mb-2">
          ⚠️ {t('legalDisclaimer')}
        </p>
        <p className="text-sm text-yellow-700 dark:text-yellow-300">
          {t('disclaimerText')}
        </p>
      </div>

      {/* Policy Type Selection */}
      <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">{t('template')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setPolicyType('privacy')}
            className={`p-4 rounded-lg border-2 transition ${
              policyType === 'privacy'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-300 dark:border-dark-700'
            }`}
          >
            <div className="text-3xl mb-2">🔒</div>
            <p className="font-semibold">{t('privacyPolicy')}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('privacyPolicyDesc')}
            </p>
          </button>

          <button
            onClick={() => setPolicyType('terms')}
            className={`p-4 rounded-lg border-2 transition ${
              policyType === 'terms'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-300 dark:border-dark-700'
            }`}
          >
            <div className="text-3xl mb-2">📜</div>
            <p className="font-semibold">{t('termsOfService')}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('termsOfServiceDesc')}
            </p>
          </button>

          <button
            onClick={() => setPolicyType('cookies')}
            className={`p-4 rounded-lg border-2 transition ${
              policyType === 'cookies'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-300 dark:border-dark-700'
            }`}
          >
            <div className="text-3xl mb-2">🍪</div>
            <p className="font-semibold">{t('cookiePolicy')}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('cookiePolicyDesc')}
            </p>
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">{t('companyInfo')}</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('companyName')}
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => updateField('companyName', e.target.value)}
              placeholder={t('companyNamePlaceholder')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t('website')}
            </label>
            <input
              type="url"
              value={formData.websiteUrl}
              onChange={(e) => updateField('websiteUrl', e.target.value)}
              placeholder={t('websitePlaceholder')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t('country')}
            </label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => updateField('country', e.target.value)}
              placeholder={t('countryPlaceholder')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t('email')}
            </label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => updateField('contactEmail', e.target.value)}
              placeholder={t('emailPlaceholder')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t('lastUpdated')}
            </label>
            <input
              type="date"
              value={formData.lastUpdated}
              onChange={(e) => updateField('lastUpdated', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <Button
            variant="primary"
            onClick={generate}
            className="w-full"
          >
            {t('generate')}
          </Button>
        </div>
      </div>

      {/* Generated Policy */}
      {generatedPolicy && (
        <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{t('generatedDocument')}</h2>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={copyToClipboard}
                size="sm"
              >
                {t('copy')}
              </Button>
              <Button
                variant="secondary"
                onClick={downloadPolicy}
                size="sm"
              >
                {t('download')}
              </Button>
            </div>
          </div>

          <textarea
            value={generatedPolicy}
            onChange={(e) => setGeneratedPolicy(e.target.value)}
            className="w-full h-96 px-4 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none font-mono text-sm"
          />

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {t('edit')}
          </p>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
        <p className="font-semibold mb-2">ℹ️ {t('whatToDoNext')}</p>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-decimal list-inside">
          <li>{t('nextStep1')}</li>
          <li>{t('nextStep2')}</li>
          <li>{t('nextStep3')}</li>
          <li>{t('nextStep4')}</li>
          <li>{t('nextStep5')}</li>
        </ul>
      </div>
    </div>
  );
}
