const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

/**
 * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - Submenu sector
 *             - 1️⃣ Sector tenebrios 🦗🐛',
 *               - Plan 1
 *               - Plan 2
 *               - Plan 3
 *             - 2️⃣ Sector Acuícola 🐠🐟',
 *               - Plan 1
 *               - Plan 2
 *               - Plan 3
 *             - 3️⃣ Sector Agrícola 🪴🌱',
 *               - Plan 1
 *               - Plan 2
 *               - Plan 3
 *             - 4️⃣ Sector ganadero 🐄🐴',
 *               - Plan 1
 *               - Plan 2
 *               - Plan 3
 *             - 5️⃣ Sector Zoo, PIMVS, UMA 🦁🦒',
 *               - Plan 1
 *               - Plan 2
 *               - Plan 3
 *           - Submenu dudas
 *             - Pregunta 1 
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */

const flowSecundario = addKeyword([]).addAnswer('No he comprendido tu pregunta, dime ¿En qué te puedo ayudar? 🤖')

const flowAdios = addKeyword(['adios', 'chao', 'see you', 'sayonara', 'bye', 'hasta la vista', 'nos vemos', 'hasta luego', 'chao', 'hasta pronto', 'hasta mañana']).addAnswer('¡Adiós! Vuelve pronto.👋🏽').addAnswer('',
    {
        buttons: [{ body: 'Adios!👋🏽' }],
    }, null, []
)

const flowGracias = addKeyword(['gracias', 'thank', 'Danke', 'mercie', 'grazie'])
    .addAnswer('¡Por nada!😁\nEstoy para ayudarte.🤖🦾')
    .addAnswer('o, ¿Hay algo más en qué te pueda ayudar?👀',
        {
            buttons: [{ body: 'Si, tengo una pregunta 🤔❓' }, { body: 'No, adiós!👋🏽' }],
        },
        null,
        []
    )
const flowContactanos = addKeyword(['5', 'contactar', 'contacto', 'agente', 'número', 'correo']).addAnswer(
    [
        'A continuación te muestro el contacto de un asesor *Soatech*:',
        'Fernando Calleja: \n📞+525525595609 \n📧fernando.calleja@i-condor.com.mx',
        'Toma en cuenta que puede demorar la respuesta del asesor.'
    ],
    {
        buttons: [{ body: 'Gracias' }],
    },
    null,
    [flowGracias, flowSecundario]
)
const flowTenebrios = addKeyword(['1', 'tenebrios', 'insectos', 'cafe', 'grillo', 'chapulin', 'entomo'])
    .addAnswer(['Te muestro los planes para *Granjas de entomocultura* 🦗🪱'])
    .addAnswer(['*Plan a pequeña escala*:',
        'Acceso a 4 elementos de monitoreo:',
        'Humedad y temperatura relativa, humedad y temperatura del sustrato e iluminación.',
        '2 entradas para control parámetros',
        'Para: 400 m2',
    ])
    .addAnswer(['*Plan a mediana escala*:',
        'Acceso a 6 elementos de monitoreo:',
        'Humedad y temperatura relativa, humedad y temperatura del sustrato, iluminación, viento y cO2',
        '8 entradas para control parámetro',
        'Para: 50 m2',
    ])
    .addAnswer(['*Plan a gran escala*:',
        'Acceso a 6 elementos de monitoreo:',
        'Humedad y temperatura relativa, humedad y temperatura del sustrato, iluminación, viento y cO2',
        'Control de parámetros  por medio de automatización',
        'Soporte de 3 horas semanal',
        'Para: 500-1200 m2',
    ])
    .addAnswer(['*Plan personalizado* de acuerdo a tus necesidades',
        'Si es así, contesta este formulario: https://forms.gle/594C8zVTxVSbXjZ87',
        'Al finalizar un asesor te contactará.',
        'O bien, para cualquier claración, contacta un asesor.'],
        {
            buttons: [{ body: 'Gracias 🆗' }, { body: 'Contacto 📞' }]
        },
        null,
        [flowGracias, flowContactanos, flowSecundario]
    )
const flowAcuicola = addKeyword(['2', 'acuicola', 'peces', 'pez', 'agua', 'acuicultura', 'acua'])
    .addAnswer(['Te muestro los planes para *Granjas de Acuaponia*🐠🐟'])
    .addAnswer(['*Plan a pequeña escala*',
        'Acceso a 4 elementos de monitoreo',
        'Oxígeno, conductividad, temperatura  y pH',
        '2 entradas para control parámetros',
        '*Para*: 200 m2'
    ])
    .addAnswer(['*Plan a mediana escala*',
        'Acceso a 6 elementos de monitoreo',
        'Oxígeno , conductividad , temperatura,ORP, iluminación y pH.',
        '8 entradas para control parámetros',
        'Soporte de 3 horas semanalmente',
        '*Para*: 400 m2'
    ])
    .addAnswer(['*Plan a pequeña escala*',
        'Acceso a 6 elementos de monitoreo',
        'Oxígeno, conductividad, temperatura, ORP, iluminación, pH, viento y CO2',
        'Control de parámetros  por medio de automatización o integración',
        'Soporte de 3 horas semanalmente',
        '*Para*: 200 m2'
    ])
const flowAgricola = addKeyword(['3', 'plantas', 'arboles', 'vegetales']).addAnswer(
    [
        'Te muestro los planes para *Sector Agrícola*🪴🌱',
        //'Selecciona una opción:',
        '*Plan 1* plan soatech 2 sensores de humedad y temperatura 💲0,000',
        '*Plan 2* plan soatech 3 sensores de humedad y temperatura 💲0,000',
        '*Plan 3* plan soatech 4 sensores de humedad y temperatura 💲0,000',
    ],
    null,
    null,
    [flowSecundario]
)
const flowGanadero = addKeyword(['4', 'vacas', 'gana', 'toros', 'agua']).addAnswer(
    [
        'Te muestro los planes para *Sector Ganadero* 🐄🐴:',
        //'Selecciona una opción:',
        '*Plan 1* plan soatech 2 sensores de humedad y temperatura 💲0,000',
        '*Plan 2* plan soatech 3 sensores de humedad y temperatura 💲0,000',
        '*Plan 3* plan soatech 4 sensores de humedad y temperatura 💲0,000',
    ],
    null,
    null,
    [flowSecundario]
)
const flowZoo = addKeyword(['5', 'Zoo', 'animales', 'UMA', 'PIVMS']).addAnswer(
    [
        'Te muestro los planes para *Sector Ganadero* 🦁🦒:',
        //'Selecciona una opción:',
        '*Plan 1* plan soatech 2 sensores de humedad y temperatura 💲0,000',
        '*Plan 2* plan soatech 3 sensores de humedad y temperatura 💲0,000',
        '*Plan 3* plan soatech 4 sensores de humedad y temperatura 💲0,000',
    ],
    null,
    null,
    [flowSecundario]
)
const flowSector = addKeyword(['1', 'plan', 'costos', 'contrato', 'sector']).addAnswer(
    [
        '¿A qué sector perteneces?',
        'Selecciona una opción:',
        '1️⃣ Sector de Tenebrios 🦗🪱',
        '2️⃣ Sector Acuícola 🐠🐟',
        '3️⃣ Sector Agrícola 🪴🌱',
        '4️⃣ Sector Ganadero 🐄🐴',
        '5️⃣ Sector Zoo, PIMVS, UMA 🦁🦒',
    ],
    null,
    null,
    [flowTenebrios, flowAcuicola, flowAgricola, flowGanadero, flowZoo, flowSecundario]
)

const flowProblemas = addKeyword(['2', 'Problemas', 'SoatechApp SoatechBox', 'conexión']).addAnswer(
    ['*Paso 1️⃣*: Verifica que *SoatechBox* esté conectado a la corriente electrica.'])
    .addAnswer('*Paso 2️⃣*: Verifica que *SoatechBox* esté conectado a una red WiFi, en la parte inferior derecha de la pantalla debe estar un ícono como este 📶.')
    .addAnswer('*Paso 3️⃣*: Si en lugar de este ícono 📶 está una ❌ significa que no está conectado auna red.')
    .addAnswer('*Paso 4️⃣*: En *SoatechApp* ve a ```Dispositivos```.')
    .addAnswer('*Paso 5️⃣*: Pulsa en el botón ```ESCANEAR DISPOSITIVOS``` para realizar la búsqueda.',
        {
            buttons: [{ body: 'Gracias 🆗' }],
        },
        null,
        [flowGracias, flowSecundario]
    )

const flowDescargas = addKeyword(['descargas', '4', 'android', 'ios', 'celular', 'playstore', 'appstore']).addAnswer(
    [
        '🔽 PlayStore / Android https://play.google.com/store/apps/details?id=com.condor.soatechapp',
        '🔽 AppStore / iOS https://play.google.com/store/apps/details?id=com.condor.soatechapp (aún no la aprueban)',
        '📱 Manual de uso de la aplicación https://drive.google.com/file/d/1JYvmcoh2i8IZFB_A99Xyn-Aj6YGdvxh0/view?usp=sharing',
        '📜 Manual de SoatechBox https://www.example.com/ (en proceso)',
    ],
    {
        buttons: [{ body: 'Gracias 🆗' }]
    },
    null,
    [flowGracias, flowSecundario]
)
const flowFallaSensor = addKeyword(['falla sensor', '1', 'sensor fallido', 'error en sensor']).addAnswer(
    [
        '¿Cómo saber si un sensor presenta fallas?',
        '1.- En la pantalla de *SoatechBox* muestra 0',
        '2.- En la pantalla de *SoatechBox* valores exagerados',
        '3.- En las gráficas de *SoatechApp* no se muestran los datos.',
        '4.- Intenta reiniciar el dispositivo.',
        '🟢 Si el problema persiste, contáctanos.👨🏻‍💻',
    ],
    {
        buttons: [{ body: 'Gracias 🆗' }, { body: 'Contacto 📞' }]
    },
    null,
    [flowGracias, flowContactanos, flowSecundario]
)
const flowDesconexion = addKeyword(['falla en red', '2', 'desconexion', 'falla de red', 'no hay wifi', 'internet']).addAnswer(
    [
        '¿Qué ocurre si no tengo conexión a internet?',
        'Esto principalmente afecta a *soatechBox*.',
        'Ya que sin conexión a Internet, no podemos realizar el monitoreo en tiempo real desde cualquier lugar.',
        'Solo de manera local mediante una red WiFi y *SoatechApp* pero, ¿Esto es malo?',
        'Para nada, el accionamiento y guardado de datos localmente sigue funcionando sin problema.',
        '🟢 Si estás seguro que tienes Internet, intenta reiniciar *SoatechBox*, o tu mismo modem.',
        '🟢 Si el problema persiste, contáctanos.👨🏻‍💻',
    ],
    {
        buttons: [{ body: 'Gracias 🆗' }, { body: 'Contacto 📞' }]
    },
    null,
    [flowGracias, flowContactanos, flowSecundario]
)
const flowFallasElectricas = addKeyword(['falla en red', '3', 'desconexion', 'falla de red', 'no hay wifi', 'internet']).addAnswer(
    [
        '¿Qué hacer en caso de fallas en mi instalación eléctrica?',
        'Esto principalmente afecta a *SoatechBox*.',
        'Ya que si la electriciad está variando puede dañar a *SoatechBox*.',
        'Si el problema sigue occuriendo, es mejor desconectar *SoatechBox*',
        'Para prolongar la vida del dispositivo es necesario que se proteja de cualquier incidente como este.',
        '🟢 Si el problema persiste, contáctanos.👨🏻‍💻',
    ],
    {
        buttons: [{ body: 'Gracias 🆗' }, { body: 'Contacto 📞' }]
    },
    null,
    [flowGracias, flowContactanos, flowSecundario]
)
const flowFallasMaquinaria = addKeyword(['falla en maquinaria', '4', 'control', 'acciona']).addAnswer(
    [
        '¿Qué hacer si tu maquinaria no se está accionando?',
        'Princpialmente tienes que tener conetctado tu maquinaria de control.',
        'Si no tienes maquinaria de control, vuelve al menú principal.',
        'Intenta reiniciar el dispositivo, revisa la instalación electrica que todo esté correcto.',
        'Revisa los parámetros indicados desde *SoatechApp* para este dispositivo, toma en cuenta que de los rango definidos depende el accioamiento.',
        '🟢 Si el problema persiste, contáctanos.👨🏻‍💻',
    ],
    {
        buttons: [{ body: 'Gracias 🆗' }, { body: 'Contacto 📞' }]
    },
    null,
    [flowGracias, flowContactanos, flowSecundario]
)
const flowStranges = addKeyword(['Caracteres', '5', 'extraños', 'china', 'chino', 'pantalla', 'strange']).addAnswer(
    [
        '¿La pantalla muestra caracteres extraños?',
        'Si este problema ocurre es debido a un problema de corriente.🔌',
        'Intenta reiniciar el dispositivo, si sigue ocurriendo, revisa tu conexión eléctrica.🧑‍🔧',
        '🟢 Si el problema persiste, contáctanos.👨🏻‍💻',
    ],
    {
        buttons: [{ body: 'Gracias 🆗' }, { body: 'Contacto 📞' }]
    },
    null,
    [flowGracias, flowContactanos, flowSecundario]
)
const flowDudas = addKeyword(['3', 'dudas', 'SoatechBox', 'SoatechApp', 'preguntas', 'a cerca', 'acerca']).addAnswer(
    [
        '¿Qué dudas tienes con *SoatechBox*',
        '1️⃣ ¿Qué hacer si un sensor falla?',
        '2️⃣ ¿Qué ocurre si no tengo conexión a internet?',
        '3️⃣ ¿Qué hacer en caso de fallas en mi instalación eléctrica?',
        '4️⃣ ¿No se está accionando tu maquinaria cuando el elemento sale del rango establecido?',
        '5️⃣ ¿La pantalla muestra caracteres extraños?',
        '¿Otra duda? Contacta al soporte de *Soatech*',
    ],
    {
        buttons: [{ body: 'Gracias 🆗' }, { body: 'Contacto 📞' }]
    },
    null,
    [flowFallaSensor, flowDesconexion, flowFallasElectricas, flowFallasMaquinaria, flowStranges, flowGracias, flowContactanos, flowContactanos, flowSecundario,]
)
const flowOtro = addKeyword(['6', 'otra', 'otro', 'pregunta', 'algo diferente']).addAnswer(
    [
        'Dime, ¿Cómo puedo ayudarte?'
    ],
    {
        buttons: [{ body: 'Contacto 📞' }]
    },
    null,
    [flowSector, flowProblemas, flowDudas, flowDescargas, flowContactanos, flowSector, flowAcuicola, flowAgricola, flowDescargas, flowDudas, flowGanadero, flowGracias, flowAdios, flowProblemas, flowSector, flowTenebrios, flowZoo, flowSecundario]
)

const flowPrincipal = addKeyword(['disculpa', 'oiga', 'oye', 'saluda', 'hola', 'buenas', 'buen día', 'ole', 'alo', 'que tal', 'hi', 'hello', 'hey', 'holi', 'bonjuor', 'aloha', 'como estás'])
    .addAnswer(['Hola! 🙌', 'Yo soy *SoatechBot* 🤖',
        'El asistente virtual de *Soatech* y estoy apara ayudarte.'])
    .addAnswer(
        [
            '¿Qué deseas consultar?',
            '1️⃣ Conocer los planes💲',
            '2️⃣ Problemas de conexión *SoatechApp/SoatechBox*❌',
            '3️⃣ Dudas con *SoatechBox*📦',
            '4️⃣ Descarga de app y manuales 📥',
            '5️⃣ Contacto directo con un agente *Soatech*👨🏻‍💻',
            '6️⃣ Otro',
        ],
        null,
        null,
        [flowSector, flowProblemas, flowDudas, flowContactanos, flowOtro, flowAdios, flowDescargas, flowSector, flowAcuicola, flowAgricola, flowGanadero, flowGracias, flowTenebrios, flowZoo, flowSecundario]
    )
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowSector, flowAdios, flowOtro, flowProblemas, flowDudas, flowContactanos, flowAcuicola, flowAgricola, flowDescargas, flowGanadero, flowGracias, flowTenebrios, flowZoo, flowSecundario])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
