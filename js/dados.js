// Conteúdo do site.
// estudos: g = grupo, id (sem espaços/acentos), t = título, r = referência exibida,
// p = [livro, capítulo, versículo inicial, versículo final] (numeração do blivre.json), x = explicação, q = perguntas.
// O texto do versículo é lido automaticamente do blivre.json.
const estudos=[
{g:"Fundamentos",id:"comeco",t:"No princípio",r:"Gênesis 1:1-3",p:[1,1,1,3],x:"A Bíblia começa afirmando que tudo tem um Criador e uma origem. Antes de qualquer lei, história ou promessa, existe Deus. Todo o resto da Escritura nasce dessa primeira frase.",q:["O que significa para você ser criação de Deus e não um acaso?","Que parte da criação mais o leva a adorar?"]},
{g:"Fundamentos",id:"amor",t:"O amor de Deus",r:"João 3:16",p:[43,3,16,16],x:"Este é um dos versículos mais conhecidos da Bíblia. Ele mostra que o amor de Deus não é só um sentimento: é uma ação. Deus deu o que tinha de mais precioso, e o convite é para todos que creem.",q:["O que muda quando você entende que o amor de Deus começa nele, e não em você?","Como você pode demonstrar esse amor a alguém esta semana?"]},
{g:"Fundamentos",id:"cuidado",t:"O cuidado do Pastor",r:"Salmos 23",p:[19,23,1,6],x:"Davi foi pastor de ovelhas antes de ser rei. Ele sabia que uma ovelha depende totalmente de quem a guia. O salmo é uma declaração de confiança no cuidado diário de Deus, inclusive nos vales difíceis.",q:["Em que área da vida você tem dificuldade de deixar Deus guiar?","Que “pasto” e que “águas tranquilas” Deus já lhe deu?"]},
{g:"Fundamentos",id:"confianca",t:"Confiar sem entender tudo",r:"Provérbios 3:5-6",p:[20,3,5,6],x:"Confiar em Deus não significa desligar a razão. Significa reconhecer que nosso entendimento é limitado e que Deus conhece o caminho inteiro.",q:["Que decisão aberta na sua vida precisa ser entregue a Deus?","O que é confiar “de todo o coração”, na prática?"]},
{g:"Fundamentos",id:"prioridade",t:"O que vem primeiro",r:"Mateus 6:33",p:[40,6,33,33],x:"Jesus disse isso depois de falar sobre a ansiedade com comida, roupa e futuro. A ordem importa: quando Deus ocupa o primeiro lugar, as outras coisas encontram o seu lugar certo.",q:["O que costuma ocupar o primeiro lugar nos seus dias?","Qual pequeno hábito colocaria Deus em primeiro na sua rotina?"]},
{g:"Fundamentos",id:"proposito",t:"Propósito em tudo",r:"Romanos 8:28",p:[45,8,28,28],x:"Paulo não diz que tudo é bom, mas que Deus trabalha em todas as coisas para o bem de quem o ama. Isso dá esperança mesmo em fases de dor, perda ou espera.",q:["Olhando para trás, onde você viu Deus transformar uma situação difícil?","Como esse versículo conforta alguém que você conhece?"]},

{g:"Parábolas de Jesus",id:"semeador",t:"O semeador",r:"Mateus 13:1-9",p:[40,13,1,9],x:"Jesus conta de um semeador cuja semente cai em quatro tipos de terra. A parábola fala de como cada pessoa recebe a palavra de Deus e de por que algumas vidas dão fruto e outras não.",q:["Que tipo de terra descreve melhor o seu coração hoje?","O que pode ser removido para a palavra crescer mais em você?"]},
{g:"Parábolas de Jesus",id:"samaritano",t:"O bom samaritano",r:"Lucas 10:25-37",p:[42,10,25,37],x:"Um mestre da lei pergunta quem é o seu próximo. Jesus responde com uma história em que a compaixão vem de quem menos se esperava. O próximo é quem precisa de ajuda, não quem se parece conosco.",q:["Quem está ao seu alcance e precisa de cuidado agora?","O que costuma impedir você de parar e ajudar?"]},
{g:"Parábolas de Jesus",id:"prodigo",t:"O filho pródigo",r:"Lucas 15:11-32",p:[42,15,11,32],x:"Um filho pede a herança, desperdiça tudo e volta arrependido. O pai o recebe correndo. A parábola mostra a alegria de Deus por quem volta e também confronta quem se acha justo, na figura do filho mais velho.",q:["Você se identifica mais com o filho que voltou ou com o que ficou?","Como é saber que Deus vem ao nosso encontro?"]},
{g:"Parábolas de Jesus",id:"talentos",t:"Os talentos",r:"Mateus 25:14-30",p:[40,25,14,30],x:"Um senhor confia seus bens a três servos antes de viajar, e cada um é cobrado pelo que fez com o que recebeu. Deus nos confia dons e oportunidades para serem usados, não guardados por medo.",q:["Que dons ou oportunidades Deus lhe confiou?","O medo tem impedido você de usá-los?"]},

{g:"Sermão do Monte",id:"bemav",t:"As bem-aventuranças",r:"Mateus 5:3-12",p:[40,5,3,12],x:"Jesus abre o sermão dizendo quem é abençoado no reino de Deus: os humildes, os que choram, os misericordiosos, os pacificadores. Os valores do reino são o oposto do que o mundo costuma admirar.",q:["Qual bem-aventurança mais desafia você?","Onde você pode ser pacificador esta semana?"]},
{g:"Sermão do Monte",id:"salluz",t:"Sal e luz",r:"Mateus 5:13-16",p:[40,5,13,16],x:"Jesus diz que seus seguidores são o sal da terra e a luz do mundo. Sal dá sabor e preserva; luz aparece e orienta. A fé não é para ficar escondida, mas para se mostrar em boas obras.",q:["Que boas obras sua vida mostra aos outros?","Onde você tem escondido a sua luz?"]},
{g:"Sermão do Monte",id:"oracao",t:"A oração do Pai Nosso",r:"Mateus 6:9-13",p:[40,6,9,13],x:"Jesus ensina seus discípulos a orar. A oração começa honrando a Deus e depois pede o pão de cada dia, perdão e proteção. É um modelo de conversa com Deus: simples e confiante.",q:["Qual parte dessa oração é mais difícil de orar de verdade?","Quem você precisa perdoar?"]},
{g:"Sermão do Monte",id:"ansiedade",t:"Sem ansiedade",r:"Mateus 6:25-34",p:[40,6,25,34],x:"Jesus aponta para as aves e os lírios para mostrar que Deus cuida do que criou. Ele não diz para não planejar, mas para não viver dominado pela preocupação com o amanhã.",q:["Qual preocupação você precisa entregar a Deus hoje?","O que as aves e os lírios ensinam a você?"]},
{g:"Sermão do Monte",id:"casas",t:"As duas casas",r:"Mateus 7:24-27",p:[40,7,24,27],x:"Para encerrar o sermão, Jesus compara quem ouve e pratica suas palavras a quem constrói sobre a rocha. A tempestade chega para todos, mas só a casa firme permanece.",q:["Que ensino de Jesus você já ouviu e ainda não colocou em prática?","O que sustenta sua vida quando vêm as tempestades?"]},

{g:"Salmos",id:"sl1",t:"O caminho do justo",r:"Salmos 1",p:[19,1,1,6],x:"O salmo compara quem se deleita na lei de Deus a uma árvore plantada junto a ribeiros de águas. Raízes fundas dão estabilidade e fruto no tempo certo.",q:["Que influências alimentam as suas raízes?","O que você pode meditar na Palavra durante o dia?"]},
{g:"Salmos",id:"sl51",t:"Um coração limpo",r:"Salmos 51:1-12",p:[19,51,1,12],x:"Davi escreveu este salmo depois de reconhecer um grande erro. É uma oração de arrependimento sincero, que pede perdão e renovação e confia na misericórdia de Deus.",q:["O que você precisa confessar a Deus sem desculpas?","Como é receber perdão e recomeçar?"]},
{g:"Salmos",id:"sl91",t:"Refúgio em Deus",r:"Salmos 91",p:[19,91,1,16],x:"O salmo fala de quem encontra em Deus abrigo e proteção. É um texto de confiança para tempos de medo e insegurança.",q:["Onde você busca segurança quando sente medo?","O que significa “habitar” com Deus no dia a dia?"]},
{g:"Salmos",id:"sl121",t:"De onde vem o socorro",r:"Salmos 121",p:[19,121,1,8],x:"O salmista olha para os montes e pergunta de onde virá o seu socorro. A resposta é que o socorro vem do Senhor, que guarda quem confia nele, na ida e na volta.",q:["Em quem você costuma buscar socorro primeiro?","O que muda quando você lembra que Deus cuida de você o tempo todo?"]},
{g:"Salmos",id:"sl139",t:"Deus me conhece",r:"Salmos 139:1-12",p:[19,139,1,12],x:"Davi reconhece que Deus o conhece por inteiro: pensamentos, caminhos e o lugar onde estiver. Não há como se esconder, e isso é motivo de conforto, não de medo.",q:["O que muda em você ao saber que Deus o conhece por completo?","Há algo que você ainda tenta esconder dele?"]}
];

// plano: 8 semanas, 7 leituras cada. Item = [nome exibido, nº do livro, capítulo]
const plano=[
{t:"Conhecendo Jesus (João 1–7)",d:[1,2,3,4,5,6,7].map(c=>["João",43,c])},
{t:"Jesus e seus sinais (João 8–14)",d:[8,9,10,11,12,13,14].map(c=>["João",43,c])},
{t:"Amor e cruz (João 15–21)",d:[15,16,17,18,19,20,21].map(c=>["João",43,c])},
{t:"Orando com os Salmos",d:[1,8,19,23,34,51,121].map(c=>["Salmos",19,c])},
{t:"Jesus ensina",d:[["Mateus",40,5],["Mateus",40,6],["Mateus",40,7],["Mateus",40,13],["Lucas",42,10],["Lucas",42,15],["Mateus",40,25]]},
{t:"Sabedoria nos Provérbios",d:[1,3,4,10,15,16,31].map(c=>["Provérbios",20,c])},
{t:"A Igreja começa (Atos)",d:[1,2,3,4,9,10,16].map(c=>["Atos",44,c])},
{t:"Fé e vida cristã",d:[["Romanos",45,3],["Romanos",45,5],["Romanos",45,8],["Romanos",45,12],["1 Coríntios",46,13],["Gálatas",48,5],["Filipenses",50,4]]}
];

const linha=[
["Criação e queda","Gênesis 1–3","Deus cria tudo, e o ser humano se afasta dele."],
["O dilúvio e Noé","Gênesis 6–9","Deus preserva Noé e sua família e firma uma aliança."],
["O chamado de Abraão","Gênesis 12","Deus promete abençoar todas as famílias da terra por meio dele."],
["O êxodo do Egito","Êxodo 12–20","Moisés conduz Israel à liberdade, e Deus entrega a Lei."],
["O reino de Davi","1 e 2 Samuel","Israel ganha um rei segundo o coração de Deus."],
["O exílio na Babilônia","2 Reis 25; Jeremias","O povo é levado cativo, e os profetas anunciam esperança."],
["Nasce Jesus","Mateus 1; Lucas 2","Deus se faz homem. Jesus ensina, morre na cruz e ressuscita."],
["A Igreja começa","Atos 2","O Espírito Santo vem, e o evangelho se espalha pelo mundo."]];
