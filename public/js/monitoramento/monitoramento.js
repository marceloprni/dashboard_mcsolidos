
import { 
    graphlBarra
} from "./graphInformation.js";
import { updateClock } from '../timeTratado/timer.js'


const clockElement = document.getElementById('time');

var canvas1 = document.getElementById("value-1");
var canvas2 = document.getElementById("value-1a");
var canvas3 = document.getElementById("value-2");
var canvas4 = document.getElementById("value-2a");
var canvas5 = document.getElementById("value-3");
var canvas6 = document.getElementById("value-3a");
var canvas7 = document.getElementById("value-4");
var canvas8 = document.getElementById("value-4a");
var canvas9 = document.getElementById("value-5");
var canvas10 = document.getElementById("value-5a");
var canvas11 = document.getElementById("value-6");
var canvas12 = document.getElementById("value-6a");

var ctx1 = document.getElementById("grafico-1").getContext('2d');
var ctx2 = document.getElementById("grafico-2").getContext('2d');
var ctx3 = document.getElementById("grafico-3").getContext('2d');
var ctx4 = document.getElementById("grafico-4").getContext('2d');
var ctx5= document.getElementById("grafico-5").getContext('2d');
var ctx6 = document.getElementById("grafico-6").getContext('2d');

const maquinas = [
  { linha: 1 },
  { linha: 2 },
  { linha: 3 },
  { linha: 4 },
  { linha: 5 },
  { linha: 6 }
];

var letDescricaoReceita1 = [];
var somaQuantidadeTeoricaArray1 = [];
var somaQuantidadeRealArray1 = [];
var somaQuantidadeTeoricaArray1a = [];
var somaQuantidadeRealArray1a = [];
var valueMax1;

var letDescricaoReceita2 = [];
var somaQuantidadeTeoricaArray2 = [];
var somaQuantidadeRealArray2= [];
var somaQuantidadeTeoricaArray2a = [];
var somaQuantidadeRealArray2a= [];
var valueMax2;

var letDescricaoReceita3 = [];
var somaQuantidadeTeoricaArray3 = [];
var somaQuantidadeRealArray3 = [];
var somaQuantidadeTeoricaArray3a = [];
var somaQuantidadeRealArray3a = [];
var valueMax3;

var letDescricaoReceita4 = [];
var somaQuantidadeTeoricaArray4 = [];
var somaQuantidadeRealArray4 = [];
var somaQuantidadeTeoricaArray4a = [];
var somaQuantidadeRealArray4a = [];
var valueMax4;

var letDescricaoReceita5 = [];
var somaQuantidadeTeoricaArray5 = [];
var somaQuantidadeRealArray5 = [];
var somaQuantidadeTeoricaArray5a = [];
var somaQuantidadeRealArray5a = [];
var valueMax5;

var letDescricaoReceita6 = [];
var somaQuantidadeTeoricaArray6 = [];
var somaQuantidadeRealArray6 = [];
var somaQuantidadeTeoricaArray6a = [];
var somaQuantidadeRealArray6a = [];
var valueMax6;

//graphLine(ctx1)
//graphLine(ctx2)

function getDadoGraph() {
        axios.get(`/monitoramento/dados`).then(response => {
        const dados = response.data;

            // ARRAY PARA GRAFICOS 1
            letDescricaoReceita1 = [];
            somaQuantidadeTeoricaArray1 = [];
            somaQuantidadeRealArray1 = [];
            somaQuantidadeTeoricaArray1a = [];
            somaQuantidadeRealArray1a = [];
            valueMax1 = 0;

            // ARRAY PARA GRAFICOS 2
            letDescricaoReceita2 = [];
            somaQuantidadeTeoricaArray2 = [];
            somaQuantidadeRealArray2 = [];
            somaQuantidadeTeoricaArray2a = [];
            somaQuantidadeRealArray2a= [];
            valueMax2 = 0;

            // ARRAY PARA GRAFICOS 3
            letDescricaoReceita3 = [];
            somaQuantidadeTeoricaArray3 = [];
            somaQuantidadeRealArray3 = [];
            somaQuantidadeTeoricaArray3a = [];
            somaQuantidadeRealArray3a = [];
            valueMax3 = 0;
            
            // ARRAY PARA GRAFICOS 4
            letDescricaoReceita4 = [];
            somaQuantidadeTeoricaArray4 = [];
            somaQuantidadeRealArray4 = [];
            somaQuantidadeTeoricaArray4a = [];
            somaQuantidadeRealArray4a = [];
            valueMax4 = 0;

            // ARRAY PARA GRAFICOS 5
            letDescricaoReceita5 = [];
            somaQuantidadeTeoricaArray5 = [];
            somaQuantidadeRealArray5 = [];
            somaQuantidadeTeoricaArray5a = [];
            somaQuantidadeRealArray5a = [];
            valueMax5 = 0;

            // ARRAY PARA GRAFICOS 6
            letDescricaoReceita6 = [];
            somaQuantidadeTeoricaArray6 = [];
            somaQuantidadeRealArray6 = [];
            somaQuantidadeTeoricaArray6a = [];
            somaQuantidadeRealArray6a = [];
            valueMax6 = 0;
        
            console.log(dados)

          /*#################################### SETA AS MAQUINAS ON #################################*/

            maquinas.forEach(maquina => {
                $(`#linha${maquina.linha}Operation`).css('background-color', '#e6626f');
                $(`#linha${maquina.linha}Operation`).css('background-color', '#e6626f');
                $(document.getElementById(`value-${maquina.linha}`)).css('border-color', '#e6626f').text('0 Kg');
                $(document.getElementById(`value-${maquina.linha}a`)).css('border-color', '#e6626f').text('0 Kg');
                //drawRing(document.getElementById(`value-${maquina.linha}`), "#e6626f", '');
                //drawRing(document.getElementById(`value-${maquina.linha}a`), "#e6626f", '');
            });

            
            dados.operationOn.forEach(item => {
                const maquinaOperando = maquinas.find(m => m.linha === item.Linha);
                    console.log(maquinaOperando);
                    if (maquinaOperando) {
                        $(`#linha${maquinaOperando.linha}Operation`).css('background-color', '#66af91');
                        $(document.getElementById(`value-${maquinaOperando.linha}`)).css('border-color', '#66af91').text('');
                        $(document.getElementById(`value-${maquinaOperando.linha}a`)).css('border-color', '#66af91').text('');
                        //drawRing(document.getElementById(`value-${maquinaOperando.linha}`), '#66af91', '');
                        //drawRing(document.getElementById(`value-${maquinaOperando.linha}a`), '#66af91','');
                    } 
            });


            /*#################################### LINHA 1 #################################*/
            const linha1 = dados.dados.filter(item => item.Linha === 1);

            console.log('linha 1')
            console.log(linha1)

            // Agrupa os itens por OrdemProducao
            const agrupadoPorProducao1 = linha1.reduce((acc, item) => {
                    if (!acc[item.OrdemProducao]) {
                            acc[item.OrdemProducao] = [];
                        }
                            acc[item.OrdemProducao].push(item);
                            return acc;
            }, {});

            for (const key in agrupadoPorProducao1) {
                  const grupo1 = agrupadoPorProducao1[key];

                  // Soma de Soma_QuantidadeTeorica
                  const somaTeorica1 = grupo1.reduce(
                    (acc, item) => acc + item.Soma_QuantidadeTeorica,
                    0
                  );
                  // Soma de Soma_QuantidadeReal
                  const somaReal1 = grupo1.reduce((acc, item) => acc + item.Soma_QuantidadeReal, 0);

                  // Adiciona aos arrays
                  somaQuantidadeTeoricaArray1.push(Number(somaTeorica1.toFixed(1)));
                  somaQuantidadeRealArray1.push(Number(somaReal1.toFixed(1)));
                  somaQuantidadeTeoricaArray1a.push(Number(somaTeorica1.toFixed(0)))
                  somaQuantidadeRealArray1a.push(Number(somaReal1.toFixed(0)));
            }


            for (let value of dados.receitaOn) {
                    if(value.Linha === 1) {
                        letDescricaoReceita1.push(value.Descricao.substring(0,15));
                    }
            }
            
            console.log(letDescricaoReceita1)
            const somatotalTeorica1 = somaQuantidadeTeoricaArray1.reduce((acc, val) => acc + parseFloat(val), 0);
            const somatotalReal1 = somaQuantidadeRealArray1.reduce((acc, val) => acc + parseFloat(val), 0);
            
            const dadosoperation1 =dados.operationOn.find(item => item.Linha === 1);
            valueMax1 = Math.max(...[...somaQuantidadeTeoricaArray1a, ...somaQuantidadeRealArray1a])

            console.log(valueMax1)
            console.log(somaQuantidadeTeoricaArray1a)
            console.log(somaQuantidadeRealArray1a)

            if (linha1.length > 0 && dadosoperation1) {
              graphlBarra(
                ctx1,
                letDescricaoReceita1,
                somaQuantidadeTeoricaArray1a,
                somaQuantidadeRealArray1a,
                valueMax1,
                'grafico1' 

              );

              $(canvas1).css('border-color', '#66af91').text(`${somatotalTeorica1.toFixed(1)} Kg`);
              $(canvas2).css('border-color', '#66af91').text(`${somatotalReal1.toFixed(1)} Kg`);
              
              //drawRing(canvas1, "#66af91", `${somatotalTeorica1} Kg`);
              //drawRing(canvas2, "#66af91", `${somatotalReal1} Kg`);
            } else {
                graphlBarra(
                ctx1,
                letDescricaoReceita1,
                somaQuantidadeTeoricaArray1a,
                somaQuantidadeRealArray1a,
                valueMax1,
                'grafico1' 
              );

              $(canvas1).css('border-color', '#e6626f').text(`${somatotalTeorica1.toFixed(1)} Kg`);
              $(canvas2).css('border-color', '#e6626f').text(`${somatotalReal1.toFixed(1)} Kg`);

              //drawRing(canvas1, "#e6626f", `${somatotalTeorica1} Kg`);
              //drawRing(canvas2, "#e6626f", `${somatotalReal1} Kg`);
            }

            /*#################################### LINHA 2 #################################*/
            const linha2 = dados.dados.filter(item => item.Linha === 2);

            console.log('linha 2')
            console.log(linha2)
            const agrupadoPorProducao2 = linha2.reduce((acc, item) => {
                    if (!acc[item.OrdemProducao]) {
                            acc[item.OrdemProducao] = [];
                        }
                            acc[item.OrdemProducao].push(item);
                            return acc;
            }, {});

            for (const key in agrupadoPorProducao2) {
                  const grupo2 = agrupadoPorProducao2[key];

                  // Soma de Soma_QuantidadeTeorica
                  const somaTeorica2 = grupo2.reduce(
                    (acc, item) => acc + item.Soma_QuantidadeTeorica,
                    0
                  );
                  // Soma de Soma_QuantidadeReal
                  const somaReal2 = grupo2.reduce((acc, item) => acc + item.Soma_QuantidadeReal, 0);

                  // Adiciona aos arrays
                  somaQuantidadeTeoricaArray2.push(somaTeorica2.toFixed(1));
                  somaQuantidadeRealArray2.push(somaReal2.toFixed(1));
                  somaQuantidadeTeoricaArray2a.push(Number(somaTeorica2.toFixed(0)))
                  somaQuantidadeRealArray2a.push(Number(somaReal2.toFixed(0)));
            }


            for (let value of dados.receitaOn) {
                    if(value.Linha === 2) {
                        letDescricaoReceita2.push(value.Descricao.substring(0,15));
                    }
            }

            const somatotalTeorica2 = somaQuantidadeTeoricaArray2.reduce((acc, val) => acc + parseFloat(val), 0);
            const somatotalReal2 = somaQuantidadeRealArray2.reduce((acc, val) => acc + parseFloat(val), 0);
            
            const dadosoperation2 =dados.operationOn.find(item => item.Linha === 2);

            valueMax2 = Math.max(...[...somaQuantidadeTeoricaArray2a, ...somaQuantidadeRealArray2a])

            if (linha2.length > 0 && dadosoperation2) {
              graphlBarra(
                ctx2,
                letDescricaoReceita2,
                somaQuantidadeTeoricaArray2a,
                somaQuantidadeRealArray2a,
                valueMax2,
                'grafico2' 
              );

              $(canvas3).css('border-color', '#66af91').text(`${somatotalTeorica2.toFixed(1)} Kg`);
              $(canvas4).css('border-color', '#66af91').text(`${somatotalReal2.toFixed(1)} Kg`);
              
              //drawRing(canvas3, "#66af91", `${somatotalTeorica2} Kg`);
              //drawRing(canvas4, "#66af91", `${somatotalReal2} Kg`);
            } else {
                graphlBarra(
                ctx2,
                letDescricaoReceita2,
                somaQuantidadeTeoricaArray2a,
                somaQuantidadeRealArray2a,
                valueMax2,
                'grafico2' 
              );

              $(canvas3).css('border-color', '#e6626f').text(`${somatotalTeorica2.toFixed(1)} Kg`);
              $(canvas4).css('border-color', '#e6626f').text(`${somatotalReal2.toFixed(1)} Kg`);

              //drawRing(canvas3, "#e6626f", `${somatotalTeorica2} Kg`);
              //drawRing(canvas4, "#e6626f", `${somatotalReal2} Kg`);
            }

            
            /*#################################### LINHA 3 #################################*/
            const linha3 = dados.dados.filter(item => item.Linha === 3);

            const agrupadoPorProducao3 = linha3.reduce((acc, item) => {
                    if (!acc[item.OrdemProducao]) {
                            acc[item.OrdemProducao] = [];
                        }
                            acc[item.OrdemProducao].push(item);
                            return acc;
                }, {});

            console.log(agrupadoPorProducao3);

            for (const key in agrupadoPorProducao3) {
                  const grupo3 = agrupadoPorProducao3[key];

                  // Soma de Soma_QuantidadeTeorica
                  const somaTeorica3 = grupo3.reduce(
                    (acc, item) => acc + item.Soma_QuantidadeTeorica,
                    0
                  );
                  // Soma de Soma_QuantidadeReal
                  const somaReal3 = grupo3.reduce((acc, item) => acc + item.Soma_QuantidadeReal, 0);

                  // Adiciona aos arrays
                  somaQuantidadeTeoricaArray3.push(somaTeorica3.toFixed(1));
                  somaQuantidadeRealArray3.push(somaReal3.toFixed(1));
                  somaQuantidadeTeoricaArray3a.push(Number(somaTeorica3.toFixed(0)))
                  somaQuantidadeRealArray3a.push(Number(somaReal3.toFixed(0)));
            }

            for (let value of dados.receitaOn) {
                    if(value.Linha === 3) {
                        letDescricaoReceita3.push(value.Descricao.substring(0,15));
                    }
            }

            const somatotalTeorica3 = somaQuantidadeTeoricaArray3.reduce((acc, val) => acc + parseFloat(val), 0);
            const somatotalReal3 = somaQuantidadeRealArray3.reduce((acc, val) => acc + parseFloat(val), 0);
            
            const dadosoperation3 = dados.operationOn.find(item => item.Linha === 3);

            valueMax3 = Math.max(...[...somaQuantidadeTeoricaArray3a, ...somaQuantidadeRealArray3a])

            console.log(letDescricaoReceita3);
            console.log(somaQuantidadeTeoricaArray3);
            console.log(somaQuantidadeRealArray3);

            if (linha3.length > 0 && dadosoperation3) {
              graphlBarra(
                ctx3,
                letDescricaoReceita3,
                somaQuantidadeTeoricaArray3a,
                somaQuantidadeRealArray3a,
                valueMax3,
                'grafico3' 
              );

              $(canvas5).css('border-color', '#66af91').text(`${somatotalTeorica3.toFixed(1)} Kg`);
              $(canvas6).css('border-color', '#66af91').text(`${somatotalReal3.toFixed(1)} Kg`);


              //drawRing(canvas5, "#66af91", `${somatotalTeorica3} Kg`);
              //drawRing(canvas6, "#66af91", `${somatotalReal3} Kg`);
            } else {
                graphlBarra(
                ctx3,
                letDescricaoReceita3,
                somaQuantidadeTeoricaArray3a,
                somaQuantidadeRealArray3a,
                valueMax3,
                'grafico3' 
              );

              $(canvas5).css('border-color', '#e6626f').text(`${somatotalTeorica3.toFixed(1)} Kg`);
              $(canvas6).css('border-color', '#e6626f').text(`${somatotalReal3.toFixed(1)} Kg`);

              //drawRing(canvas5, "#e6626f", `${somatotalTeorica3} Kg`);
              //drawRing(canvas6, "#e6626f", `${somatotalReal3} Kg`);
            }
            
            /*#################################### LINHA 4 #################################*/
            const linha4 = dados.dados.filter(item => item.Linha === 4);

            const agrupadoPorProducao4 = linha4.reduce((acc, item) => {
                    if (!acc[item.OrdemProducao]) {
                            acc[item.OrdemProducao] = [];
                        }
                            acc[item.OrdemProducao].push(item);
                            return acc;
            }, {});

            console.log(agrupadoPorProducao4);  

            for (const key in agrupadoPorProducao4) {
                  const grupo4 = agrupadoPorProducao4[key];

                  // Soma de Soma_QuantidadeTeorica
                  const somaTeorica4 = grupo4.reduce(
                    (acc, item) => acc + item.Soma_QuantidadeTeorica,
                    0
                  );
                  // Soma de Soma_QuantidadeReal
                  const somaReal4 = grupo4.reduce((acc, item) => acc + item.Soma_QuantidadeReal, 0);

                  // Adiciona aos arrays
                  somaQuantidadeTeoricaArray4.push(somaTeorica4.toFixed(1));
                  somaQuantidadeRealArray4.push(somaReal4.toFixed(1));
                  somaQuantidadeTeoricaArray4a.push(Number(somaTeorica4.toFixed(0)))
                  somaQuantidadeRealArray4a.push(Number(somaReal4.toFixed(0)));
            }


            for (let value of dados.receitaOn) {
                    if(value.Linha === 4) {
                        letDescricaoReceita4.push(value.Descricao.substring(0,15));
                    }
            }

            const somatotalTeorica4 = somaQuantidadeTeoricaArray4.reduce((acc, val) => acc + parseFloat(val), 0);
            const somatotalReal4 = somaQuantidadeRealArray4.reduce((acc, val) => acc + parseFloat(val), 0);
            
            const dadosoperation4 =dados.operationOn.find(item => item.Linha === 4);

            valueMax4 = Math.max(...[...somaQuantidadeTeoricaArray4a, ...somaQuantidadeRealArray4a])

            if (linha4.length > 0 && dadosoperation4) {
              graphlBarra(
                ctx4,
                letDescricaoReceita4,
                somaQuantidadeTeoricaArray4a,
                somaQuantidadeRealArray4a,
                valueMax4,
                'grafico4' 

              );

              $(canvas7).css('border-color', '#66af91').text(`${somatotalTeorica4.toFixed(1)} Kg`);
              $(canvas8).css('border-color', '#66af91').text(`${somatotalReal4.toFixed(1)} Kg`);

              //drawRing(canvas7, "#66af91", `${somatotalTeorica4} Kg`);
              //drawRing(canvas8, "#66af91", `${somatotalReal4} Kg`);
            } else {
                graphlBarra(
                ctx4,
                letDescricaoReceita4,
                somaQuantidadeTeoricaArray4a,
                somaQuantidadeRealArray4a,
                valueMax4,
                'grafico4' 
              );

              $(canvas7).css('border-color', '#e6626f').text(`${somatotalTeorica4.toFixed(1)} Kg`);
              $(canvas8).css('border-color', '#e6626f').text(`${somatotalReal4.toFixed(1)} Kg`);

              //drawRing(canvas7, "#e6626f", `${somatotalTeorica4} Kg`);
              //drawRing(canvas8, "#e6626f", `${somatotalReal4} Kg`);
            }

            /*#################################### LINHA 5 #################################*/
            const linha5 = dados.dados.filter(item => item.Linha === 5);

            console.log(linha5);

            const agrupadoPorProducao5 = linha5.reduce((acc, item) => {
                    if (!acc[item.OrdemProducao]) {
                            acc[item.OrdemProducao] = [];
                        }
                            acc[item.OrdemProducao].push(item);
                            return acc;
            }, {});

            console.log(agrupadoPorProducao5);  

            for (const key in agrupadoPorProducao5) {
                  const grupo5 = agrupadoPorProducao5[key];

                  // Soma de Soma_QuantidadeTeorica
                  const somaTeorica5 = grupo5.reduce(
                    (acc, item) => acc + item.Soma_QuantidadeTeorica,
                    0
                  );
                  // Soma de Soma_QuantidadeReal
                  const somaReal5 = grupo5.reduce((acc, item) => acc + item.Soma_QuantidadeReal, 0);

                  // Adiciona aos arrays
                  somaQuantidadeTeoricaArray5.push(somaTeorica5.toFixed(1));
                  somaQuantidadeRealArray5.push(somaReal5.toFixed(1));
                  somaQuantidadeTeoricaArray5a.push(Number(somaTeorica5.toFixed(0)))
                  somaQuantidadeRealArray5a.push(Number(somaReal5.toFixed(0)));
            }


            for (let value of dados.receitaOn) {
                    if(value.Linha === 5) {
                        letDescricaoReceita5.push(value.Descricao.substring(0,15));
                    }
            }

            const somatotalTeorica5 = somaQuantidadeTeoricaArray5.reduce((acc, val) => acc + parseFloat(val), 0);
            const somatotalReal5 = somaQuantidadeRealArray5.reduce((acc, val) => acc + parseFloat(val), 0);
            
            const dadosoperation5 =dados.operationOn.find(item => item.Linha === 5);

            valueMax5 = Math.max(...[...somaQuantidadeTeoricaArray5a, ...somaQuantidadeRealArray5a])

            if (linha5.length > 0 && dadosoperation5) {
              graphlBarra(
                ctx5,
                letDescricaoReceita5,
                somaQuantidadeTeoricaArray5a,
                somaQuantidadeRealArray5a,
                valueMax5,
                'grafico5' 

              );

              $(canvas9).css('border-color', '#66af91').text(`${somatotalTeorica5.toFixed(1)} Kg`);
              $(canvas10).css('border-color', '#66af91').text(`${somatotalReal5.toFixed(1)} Kg`);

              //drawRing(canvas7, "#66af91", `${somatotalTeorica5} Kg`);
              //drawRing(canvas8, "#66af91", `${somatotalReal5} Kg`);
            } else {
                graphlBarra(
                ctx5,
                letDescricaoReceita5,
                somaQuantidadeTeoricaArray5a,
                somaQuantidadeRealArray5a,
                valueMax5,
                'grafico5' 
              );

              $(canvas9).css('border-color', '#e6626f').text(`${somatotalTeorica5.toFixed(1)} Kg`);
              $(canvas10).css('border-color', '#e6626f').text(`${somatotalReal5.toFixed(1)} Kg`);

              //drawRing(canvas7, "#e6626f", `${somatotalTeorica4} Kg`);
              //drawRing(canvas8, "#e6626f", `${somatotalReal4} Kg`);
            }

            /*#################################### LINHA 6 #################################*/
            const linha6 = dados.dados.filter(item => item.Linha === 6);

            console.log(linha6);

            const agrupadoPorProducao6 = linha6.reduce((acc, item) => {
                    if (!acc[item.OrdemProducao]) {
                            acc[item.OrdemProducao] = [];
                        }
                            acc[item.OrdemProducao].push(item);
                            return acc;
            }, {});

            console.log(agrupadoPorProducao6);  

            for (const key in agrupadoPorProducao6) {
                  const grupo6 = agrupadoPorProducao6[key];

                  // Soma de Soma_QuantidadeTeorica
                  const somaTeorica6 = grupo6.reduce(
                    (acc, item) => acc + item.Soma_QuantidadeTeorica,
                    0
                  );
                  // Soma de Soma_QuantidadeReal
                  const somaReal6 = grupo6.reduce((acc, item) => acc + item.Soma_QuantidadeReal, 0);

                  // Adiciona aos arrays
                  somaQuantidadeTeoricaArray6.push(somaTeorica6.toFixed(1));
                  somaQuantidadeRealArray6.push(somaReal6.toFixed(1));
                  somaQuantidadeTeoricaArray6a.push(Number(somaTeorica6.toFixed(0)))
                  somaQuantidadeRealArray6a.push(Number(somaReal6.toFixed(0)));
            }


            for (let value of dados.receitaOn) {
                    if(value.Linha === 6) {
                        letDescricaoReceita6.push(value.Descricao.substring(0,15));
                    }
            }

            const somatotalTeorica6 = somaQuantidadeTeoricaArray6.reduce((acc, val) => acc + parseFloat(val), 0);
            const somatotalReal6 = somaQuantidadeRealArray6.reduce((acc, val) => acc + parseFloat(val), 0);
            
            const dadosoperation6 =dados.operationOn.find(item => item.Linha === 6);

            valueMax6 = Math.max(...[...somaQuantidadeTeoricaArray6a, ...somaQuantidadeRealArray6a])

            if (linha6.length > 0 && dadosoperation6) {
              graphlBarra(
                ctx6,
                letDescricaoReceita6,
                somaQuantidadeTeoricaArray6a,
                somaQuantidadeRealArray6a,
                valueMax6,
                'grafico6' 

              );

              $(canvas11).css('border-color', '#66af91').text(`${somatotalTeorica6.toFixed(1)} Kg`);
              $(canvas12).css('border-color', '#66af91').text(`${somatotalReal6.toFixed(1)} Kg`);

              //drawRing(canvas7, "#66af91", `${somatotalTeorica6} Kg`);
              //drawRing(canvas8, "#66af91", `${somatotalReal6} Kg`);
            } else {
                graphlBarra(
                ctx6,
                letDescricaoReceita6,
                somaQuantidadeTeoricaArray6a,
                somaQuantidadeRealArray6a,
                valueMax6,
                'grafico6' 
              );

              $(canvas11).css('border-color', '#e6626f').text(`${somatotalTeorica6.toFixed(1)} Kg`);
              $(canvas12).css('border-color', '#e6626f').text(`${somatotalReal6.toFixed(1)} Kg`);

              //drawRing(canvas7, "#e6626f", `${somatotalTeorica4} Kg`);
              //drawRing(canvas8, "#e6626f", `${somatotalReal4} Kg`);
            }
    })
}


setInterval( () => {
  getDadoGraph();
}, 300000)


setInterval(() => {
    clockElement.textContent = `DATA: ${updateClock()}`;
}, 1000);

// CHAMA O PRIMEIRO GET PARA ALIMENTAR OS GRAFICOS
getDadoGraph();