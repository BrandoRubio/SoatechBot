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

const flowAdios = addKeyword(['adios', 'chao', 'see you', 'sayonara', 'bye']).addAnswer('¡Nos vemos! Vuelve pronto.👋🏽').addAnswer('',
        {
            delay: 5000,
            buttons: [{ body: 'Adios!👋🏽' }],
        },null,[]
)

const flowGracias = addKeyword(['gracias', 'thank', 'Danke', 'mercie', 'grazie'])
    .addAnswer('¡Por nada!😁\nEstamos para ayudarte.🤖🦾')
    .addAnswer('¿Hay algo más en qué te podemos ayudar?👀',
        {
            delay: 15000,
            buttons: [/*{ body: 'Salúdame 🤖' },*/{ body: 'No, adios!👋🏽' }],
        },
        null,
        [flowAdios]
    )
const flowContactanos = addKeyword(['5', 'contactar', 'Contacto 📞', 'agente', 'número', 'correo']).addAnswer(
    [
        'A continuación te mostramos el contacto de un asesor *Soatech*:',
        'Fernando Calleja: \n📞+525525595609 \n📧fernando.calleja@i-condor.com.mx',
        'Toma en cuenta que puede demorar la respuesta del asesor.'
    ],
    {
        buttons: [{ body: 'Gracias' }],
    },
    null,
    [flowGracias]
)
const flowSecundario = addKeyword(['ok']).addAnswer('Esperamos haberte ayudado a resolver tus dudas.')

const flowTenebrios = addKeyword(['1', 'tenebrios', 'insectos', 'cafe']).addAnswer(
    [
        'Te mostramos los planes para *Sector de Insectos/Tenebrios* 🦗🪱',
        //'Selecciona una opción:',
        '*Plan 1* plan soatech 2 sensores de humedad y temperatura 💲0,000',
        '*Plan 2* plan soatech 3 sensores de humedad y temperatura 💲0,000',
        '*Plan 3* plan soatech 4 sensores de humedad y temperatura 💲0,000',
    ],
    null,
    null,
    [flowSecundario]
)
const flowAcuicola = addKeyword(['2', 'acuicola', 'peces', 'pez', 'agua']).addAnswer(
    [
        'Te mostramos los planes para *Sector Acuícola*🐠🐟',
        //'Selecciona una opción:',
        '*Plan 1* plan soatech 2 sensores de humedad y temperatura 💲0,000',
        '*Plan 2* plan soatech 3 sensores de humedad y temperatura 💲0,000',
        '*Plan 3* plan soatech 4 sensores de humedad y temperatura 💲0,000',
    ],
    null,
    null,
    [flowSecundario]
)
const flowAgricola = addKeyword(['3', 'plantas', 'arboles', 'vegetales']).addAnswer(
    [
        'Te mostramos los planes para *Sector Agrícola*🪴🌱',
        //'Selecciona una opción:',
        '*Plan 1* plan soatech 2 sensores de humedad y temperatura 💲0,000',
        '*Plan 2* plan soatech 3 sensores de humedad y temperatura 💲0,000',
        '*Plan 3* plan soatech 4 sensores de humedad y temperatura 💲0,000',
    ],
    null,
    null,
    [flowSecundario]
)
const flowGanadero = addKeyword(['4', 'acuicola', 'peces', 'pez', 'agua']).addAnswer(
    [
        'Te mostramos los planes para *Sector Ganadero* 🐄🐴:',
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
        'Te mostramos los planes para *Sector Ganadero* 🦁🦒:',
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
    [flowTenebrios, flowAcuicola, flowAgricola, flowGanadero, flowZoo]
)

const flowProblemas = addKeyword(['2', 'Problemas', 'SoatechApp SoatechBox', 'conexión']).addAnswer(
    ['*Paso 1️⃣*: Verifica que *SoatechBox* esté conectado a la corriente electrica.'])
    .addAnswer('*Paso 2️⃣*: Verifica que *SoatechBox* esté conectado a una red WiFi, en la parte inferior derecha de la pantalla debe estar un ícono como este 📶.')
    .addAnswer('*Paso 3️⃣*: Si en lugar de este ícono 📶 está una ❌ significa que no está conectado auna red.')
    .addAnswer('*Paso 4️⃣*: En *SoatechApp* ve a ```Dispositivos```.')
    .addAnswer('*Paso 5️⃣*: Pulsa en el botón ```ESCANEAR DISPOSITIVOS``` para realizar la búsqueda.',
        {
            buttons: [{ body: 'OK' }],
        },
        null,
        [flowSecundario]
)

const flowDescargas = addKeyword(['descargas', '4', 'android', 'ios', 'celular', 'playstore', 'appstore']).addAnswer(
    [
        '🔽 PlayStore / Android https://play.google.com/store/apps/details?id=com.condor.soatechapp',
        '🔽 AppStore / iOS https://play.google.com/store/apps/details?id=com.condor.soatechapp (aún no la aprueban)',
        '📱 Manual de uso de la aplicación https://drive.google.com/file/d/1JYvmcoh2i8IZFB_A99Xyn-Aj6YGdvxh0/view?usp=sharing',
        '📜 Manual de SoatechBox https://www.example.com/ (en proceso)',
    ],
    null,
    null,
    [flowGracias, flowSecundario]
)
const flowFallaSensor = addKeyword(['falla sensor', '1', 'sensor fallido']).addAnswer(
    [
        '¿Cómo saber si un sensor tiene fallas?',
        '1.- En la pantalla de *SoatechBox* muestra 0',
        '2.- En la pantalla de *SoatechBox* valores exagerados',
        '3.- En las gráficas de *SoatechApp* no se muestran los datos.',
        '4.- Intenta reiniciar el dispositivo.',
        '🟢 Si el problema persiste, contáctanos.👨🏻‍💻',
    ],
    {
        buttons: [{ body: 'Ok, gracias. 🆗' }, { body: 'Contacto 📞'}]
    },
    null,
    [flowGracias, flowContactanos]
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
        buttons: [{ body: 'Ok, gracias. 🆗' }, { body: 'Contacto 📞'}]
    },
    null,
    [flowGracias, flowContactanos]
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
        buttons: [{ body: 'Ok, gracias. 🆗' }, { body: 'Contacto 📞'}]
    },
    null,
    [flowGracias, flowContactanos]
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
        buttons: [{ body: 'Ok, gracias. 🆗' }, { body: 'Contacto 📞'}]
    },
    null,
    [flowGracias, flowContactanos]
)
const flowStranges = addKeyword(['Caracteres', '5', 'extraños', 'china', 'chino', 'pantalla']).addAnswer(
    [
        '¿La pantalla muestra caracteres extraños?',
        'Si este problema ocurre es debido a un problema de corriente.🔌',
        'Intenta reiniciar el dispositivo, si sigue ocurriendo, revisa tu conexión eléctrica.🧑‍🔧',
        '🟢 Si el problema persiste, contáctanos.👨🏻‍💻',
    ],
    {
        buttons: [{ body: 'Ok, gracias. 🆗' }, { body: 'Contacto 📞'}]
    },
    null,
    [flowGracias, flowContactanos]
)
const flowDudas = addKeyword(['3', 'dudas', 'SoatechBox', 'SoatechApp']).addAnswer(
    [
        '¿Qué dudas tienes con *SoatechBox*',
        '1️⃣ ¿Qué hacer si un sensor falla?',
        '2️⃣ ¿Qué ocurre si no tengo conexión a internet?',
        '3️⃣ ¿Qué hacer en caso de fallas en mi instalación eléctrica?',
        '4️⃣ ¿No se está accionando tu maquinaria cuando el elemento sale del rango establecido?',
        '5️⃣ ¿La pantalla muestra caracteres extraños?',
        '¿Otra duda? Contacta al soporte de *Soatech* ```Estamos para ayudarte``` 👨🏻‍💻',
    ],
    null,
    null,
    [flowFallaSensor, flowDesconexion, flowFallasElectricas, flowFallasMaquinaria, flowStranges]
)
const flowOtro = addKeyword(['6', 'otra', 'pregunta']).addAnswer(
    [
        '¿Cómo puedo ayudarte?'
    ],
    {
        buttons: [{ body: 'Ok, gracias. 🆗' }, { body: 'Contacto 📞'}]
    },
    null,
    [flowSector, flowProblemas, flowDudas, flowDescargas, flowContactanos, flowSector, flowAcuicola, flowAgricola, flowDescargas, flowDudas, flowGanadero, flowGracias, flowAdios, flowProblemas, flowSector, flowTenebrios, flowZoo]
)

const flowPrincipal = addKeyword(['disculpa', 'oiga', 'oye', 'saluda', 'hola', 'buenas', 'buen día', 'ole', 'alo', 'que tal', 'hi', 'hello', 'hey', 'holi'])
    .addAnswer(['Hola! 🙌', 'Yo soy *SoatechBot* 🤖'])
    .addAnswer(['El asistente virtual de *Soatech* y estoy apara ayudarte.'])
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
        [flowSector, flowProblemas, flowDudas, flowDescargas, flowContactanos, flowOtro]
    )
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
