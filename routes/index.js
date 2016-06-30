'use strict';
var express = require('express');
var router = express.Router();
var path = require ('path');
var fs = require('fs');
var blobStream  = require ('blob-stream');
var PDFDocument = require ('pdfkit');


router.route('/convenio')
.get(function ( req, res )
{
  var nombre        = 'Juan Carlitos';
  var apaterno      = 'Amatore';
  var amaterno      = 'Cuesta';
  var direccion     = 'Lago Wetter';
  var servicio      = 'SERVICIO AGUA Y DRENAJE';
  var giro          = 'CLUBES DEPORTIVOS/UNIDAD DEPORTIVAS/GIMNASIOS';
  var id_contrato   = 1001;
  var anio          = '2016';
  var dia           = '15';
  var mes          = 'Junio';

  var font_name_regular = path.join( __dirname, 'fonts' ,'Raleway-Regular.ttf');
  var font_name_bold    = path.join( __dirname, 'fonts' ,'Raleway-Bold.ttf');
  var texto_contrato_inicio = 'CONTRATO que celebra por una parte EL SISTEMA OPERADOR INTERMUNICIPAL DE AGUA POTABLE Y SANEAMIENTO DE TEQUESQUITENGO, MOR. representada por __ que. en lo sucesivo se denominará EL SISTEMA y por la otra ' + nombre + ' ' + apaterno + ' ' +  amaterno + ' a quien en lo sucesivo de este CONTRATO se denominará EL USUARIO y cuyo objeto será el suministro de agua potable, drenaje y saneamiento segun sea el caso, con arreglo a las siguientes:' ;
  var texto_contrato_cuerpo = 'PRIMERA.- El servicio será conectado en: ' + direccion;

  var doc = new PDFDocument({
              size: 'legal',
              margin: 40
            });
  var color_negro       = '#000';
  var color_gris_claro  = '#d9d4d4';
  var color_gris_oscuro = '#f1f1f1';
  var stream = doc.pipe(blobStream());

  doc.rect(20, 15, 577, 60).fill(color_gris_claro);
  doc.rect(18, 15, 577, 58).fill(color_gris_oscuro);

  doc.image( path.join( __dirname, 'CEAgua_.png' ), 23, 23, {width: 110} );
  doc.image( path.join( __dirname, 'CEAgua_.png' ), 482, 23, {width: 110} );

  doc.fontSize(11);
  doc.font( font_name_bold, 'Raleway Bold' ).fill(color_negro)
  .text('COMISION ESTATAL DEL AGUA DEL ESTADO DE MORELOS', 120, 35 , {width: 375, align: 'center'});

  doc.fontSize(7);
  doc.font( font_name_regular, 'Raleway Regular' )
     .text('SISTEMA OPERADOR INTERMUNICIPAL DE AGUA POTABLE Y SANEAMIENTO DE TEQUESQUITENGO', 110, 60 , {width: 395, align: 'center'});

  doc.rect(20, 85, 577, 38).fill(color_gris_claro);
  doc.rect(18, 85, 577, 36).fill(color_gris_oscuro);

  doc.lineCap('butt')
  .moveTo(210, 90)
  .lineTo(210, 115)
  .strokeColor(color_gris_oscuro);

  doc.fontSize(9).fill(color_negro);
  doc.font( font_name_bold, 'Raleway Bold' ).text('SERVICIO:',25,95);
  doc.font( font_name_regular, 'Raleway Regular' ).text(servicio ,75,95,{width: 200});
  doc.font( font_name_bold, 'Raleway Bold' ).text('GIRO:',215,95);
  doc.font( font_name_regular, 'Raleway Regular' ).text(giro,250,95, {width: 220});
  doc.font( font_name_bold, 'Raleway Bold' ).text('CONTRATO:',500,95);
  doc.font( font_name_regular, 'Raleway Regular' ).text(id_contrato,500,105, {width:55, align: 'center'});

  doc.fontSize(9);

  doc.text( texto_contrato_inicio , 20, 140 , { width: 575, align: 'justify'});

  doc.fontSize(10);
  doc.font( font_name_bold, 'Raleway Bold' )
     .text( 'CLAUSULAS:' , 20, 190 , {width: 575, align: 'center'});
  doc.moveDown(1.5);

  doc.fontSize(9);
  doc.font( font_name_regular, 'Raleway Regular' )
     .text(texto_contrato_cuerpo, {width: 575, align: 'justify'});
  doc.moveDown(.5);
  doc.text('SEGUNDA.- EL USUARIO se obliga a permitir que el personal autorizado de EL SISTEMA puede efectuar las lecturas correspondientes y las reparaciones del medidor que fueren necesarias.', {width: 575,align: 'justify'});
  doc.moveDown(.5);
  doc.text('SEGUNDA.- EL USUARIO se obliga a permitir que el personal autorizado de EL SISTEMA puede efectuar las lecturas correspondientes y las reparaciones del medidor que fueren necesarias.', {width: 575,align: 'justify'});
  doc.moveDown(.5);
  doc.text('TERCERA.- La lectura de los medidores se hará por periodos bimestrales, en caso de que no pueda tomarla por razones no imputables a su trabajo, el Lecturista lo indicará en la boleta, por lo que EL USUARIO se obliga a remitir a nuestras oficinas su lectura en los cinco días posteriores de la notificación.', {width: 575,align: 'justify'});
  doc.moveDown(.5);
  doc.text('CUARTA.- El lecturista entregará en el predio del usuario, giro o establecimiento, el recibo de consumo a efecto de que a partir de ese momento cubra el importe del mismo; usuario no lo recibiera en su oportunidad deberá presentarse en las oficinas del SISTEMA para solicitar un duplicado y pueda efectuar el pago.', {width: 575,align: 'justify'});
  doc.moveDown(.5);
  doc.text('QUINTA.- EL USUARIO pagará bimestralmente su recibo de consumo en base a las tarifas que se encuentran aprobadas o las que en el futuro se establezcan. EL USUARIO cubrirá el pago correspondiente en las oficinas de EL SISTEMA, en moneda nacional de curso legal dentro del plazo señalado en su recibo de consumo correspondiente al bimestre inmediato anterior o de la fecha que se comunique al adeudo correspondiente, y en caso de no hacer los pagos, en tiempo y forma, los adeudos pasaran hacer créditos fiscales, que serán cobrados en términos de la Ley Estatal del Agua Potable, Código Fiscal del Estado de Morelos y demás leyes aplicables.', {width: 575,align: 'justify'});
  doc.moveDown(.5);
  doc.text('SEXTA.- EL SISTEMA cobrará al USUARIO la tarifa mínima vigente cuando existan desperfectos en el medidor no imputables a él.', {width: 575,align: 'justify'});
  doc.moveDown(.5);
  doc.text('SÉPTIMA.- La falta de pago puntual del recibo del consumo motivará al cobro de recargos, así como en los casos que EL SISTEMA lo estime conveniente, la limitación o cancelación del servicio, de acuerdo a lo dispuesto en la ley de Agua Potable del Estado de Morelos.', {width: 575,align: 'justify'});
  doc.moveDown(.5);
  doc.text('OCTAVA.- En caso de que el USUARIO deje de pagar el recibo de consumo durante dos bimestres consecutivos, se hará efectivo su cobro mediante el procedimiento económico-coactivo aplicado conforme a las disposiciones legales en vigor a través de la Oficina Ejecutora correspondiente del Estado. La facultad económica-coactiva se encausará, en contra del predio que se consigna en el presente contrato sin que sea obstáculo el que sustituya a EL USUARIO en los derechos de propiedad a posesión.', {width: 575,align: 'justify'});
  doc.moveDown(.5);
  doc.text('NOVENA.- En caso de que al USUARIO se le conecte el servicio y no se le instale medidor, mientras e_sto no se pueda instalar, pagará la cuota correspondiente prevista en la Ley Tarifaria vigente.', {width: 575,align: 'justify'});
  doc.moveDown(.5);
  doc.text('DÉCIMA.- En caso de que la lectura no se pueda tomar y los consumos a determinar por desperfectos en el medidor causados por el USUARIO o por terceras personas, el pago del consumo será el que resulte de calcular las horas del servicio proporcionadas por el diámetro de la toma y de acuerdo a la tarifa vigente, independiente de que EL SISTEMA imponga las sanciones que procedan en cada caso, entre ellas, el pago del importe de la reparación y reposición del medidor.', {width: 575,align: 'justify'});
  doc.moveDown(.5);
  doc.text('DECIMA PRIMERA.- EL USUARIO es el propietario del medidor que se instala en su toma para verificación de lecturas, por lo tanto se compromete a construir un nicho al frente de su predio en la parte exterior, con el objeto de que el medidor sea protegido contra robo, manipulaciones y cualquier clase de deterioro.', {width: 575,align: 'justify'});
  doc.moveDown(.5);
  doc.text('DECIMA SEGUNDA.- EL USUARIO se compromete a no retirar, ni modificarla instalación del medidor y únicamente permitirá que el mismo sea revisado, reparado, retirado o reubicado por el personal de EL SISTEMA.', {width: 575,align: 'justify'});
  doc.moveDown(.5);
  doc.text('DECIMA TERCERA.- Cuando el medidor Instalado sufra algún daño o escape de agua EL USUARIO deberá reportarlo a EL SISTEMA para que este proceda a su reparación, en la inteligencia de que dicho costo ser cubierto por EL USUARIO.', {width: 575,align: 'justify'});
  doc.moveDown(.5);
  doc.text('DECIMA CUARTA.- EL USUARIO se da por enterado y acepta que no podrá permitir o conceder derivaciones de las instalaciones del servicio de agua que reciba a otro u otros edificios, predios, giros o establecimientos, en caso de incurrir en algún acto de los anteriormente citados está conforme en aceptar y cumplir con las sanciones que le imponga EL SISTEMA por dichos motivos, así como evitar la repetición de los mismos actos.', {width: 575,align: 'justify'});
  doc.moveDown(.5);
  doc.text('DECIMA QUINTA.- La responsabilidad de EL SISTEMA cesa precisamente en el punto de entrega del agua potable al consumidor, precisamente antes del medidor; en consecuencia cualquier reclamación que surja de este punto en adelante, por ser la parte de la instalación perteneciente al USUARIO, será de la exclusiva responsabilidad del mismo.', {width: 575,align: 'justify'});
  doc.moveDown(.5);
  doc.text('DECIMA SEXTA.- EL USUARIO se obliga a tener un lugar de almacenamiento para agua potable, en el lugar donde se abastezca por parte del SISTEMA, en razón a prever un desabasto por cualquier contingencia que no pueda ser reparada de manera inmediata por el SISTEMA, eximiendo de responsabilidad al SISTEMA el USUARIO por la falta de servicio temporal que pueda darse y no tener previsto el almacenamiento.', {width: 575,align: 'justify'});
  doc.moveDown(.5);
  doc.text('DECIMA SEPTIMA.- EL SISTEMA, tendrá derecho sin restricción alguna por parte de EL USUARIO para instalar, extender, componer, cambiar o quitar la línea, equipo de medición, útiles de limitación o estrangulación y demás materiales necesarios para el servicio objeto de este Contrato.', {width: 575,align: 'justify'});
  doc.moveDown(.5);
  doc.text('DECIMA OCTAVA.- EL USUARIO se obliga utilizar las instalaciones en forma adecuada y a no desperdiciar el agua y que de no hacerlo así, acepta las sanciones técnicas económicas que determine el SISTEMA. DECIMA NOVENA.- En caso de enajenació', {width: 575,align: 'justify'});
  doc.moveDown(.5);
  doc.text('DECIMA NOVENA.- En caso de enajenación del inmueble donde se encuentren conectados los servicios a que este Contrato se refiere, EL USUARIO deberá de dar al aviso por escrito de este hecho a EL SISTEMA.', {width: 575,align: 'justify'});
  doc.moveDown(.5);
  doc.text('VIGÉSIMA.- Si llegara a ser interrumpidos los servicios que ampara este CONTRATO, por casos fortuitos o de fuerza mayor o por causa que no le sean imputables, así como por la descompostura de la maquinaria y aparatos instalados, el presente Contrato que dará en suspenso sin responsabilidad para ninguna de las partes. Los sellos que se colocan en los medidores, a la llave de limitación o de estrangulación a las cajas de protección o cualquier otro artículo, no podrán ser removidos más que por el personal que al efecto designe EL SISTEMA o por las autoridades competentes.', {width: 575,align: 'justify'});
  doc.moveDown(.5);
  doc.text('VIGÉSIMA PRIMERA.- EL SISTEMA tendrá derecho en todo tiempo y lugar, a suspender el servicio temporalmente para hacer reparaciones o para cualquier otro objeto indispensable al servicio en general, procurando que dichas suspensiones sean lo más cortas posibles. Si la suspensión es larga se prevendrá a los usuarios con avisos oportunos a través de los medios masivos de comunicación.', {width: 575,align: 'justify'});
  doc.moveDown(.5);
  doc.text('VIGÉSIMA SEGUNDA.- EL SISTEMA se reserva la facultad de cuantificar el gasto individual de agua potable en las tomas de los USUARIOS, en función de la capacidad de sus instalaciones y de la cuantía integral de la demanda, constituyéndose en arbitro exclusivo de la regulación de los caudales de acuerdo con las fluctuaciones de la relación PRODUCCIÓN-DEMANDA, facultad que el USUARIO desde ahora reconoce y acepta respetar las disposiciones que para el cumplimiento de esta Cláusula dicte EL SISTEMA.', {width: 575,align: 'justify'});
  doc.moveDown(.5);
  doc.text('VIGÉSIMA TERCERA.- En caso de querer prescindir del servicio de agua, EL USUARIO tendrá que dar parte al SISTEMA por medio de un escrito en forma induvitable.', {width: 575,align: 'justify'});
  doc.moveDown(.5);
  doc.text('VIGÉSIMA CUARTA.- Para la interpretación y cumplimiento el presente Contrato así como para todo aquello que no esté expresamente estipulado en el', {width: 575,align: 'justify'});
  doc.moveDown(6);
  doc.text('Tequesquitengo, Mor., a ' + dia + ' de ' + mes + ' del ' + anio,  {width: 575,align: 'right'});

  doc.text('EL USUARIO', 160, 340);
  doc.text('DIRECTOR GENERAL S.A.P.A.S.T.', 375, 340, {width: 120, align: 'center'});

  doc.lineWidth(1);
  doc.lineCap('butt')
     .moveTo(105, 480)
     .lineTo(275, 480)
     .stroke();

  doc.lineCap('butt')
     .moveTo(345, 480)
     .lineTo(515, 480)
     .stroke();

  doc.pipe(res) ;
  doc.end();


});


module.exports = router;
