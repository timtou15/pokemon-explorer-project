import { POKEMON_TYPES, POKEMON_TYPE_TRANSLATIONS, STAT_TRANSLATIONS } from '../types/pokemon';

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getPokemonTypeColor = (type: string): string => {
  return POKEMON_TYPES[type as keyof typeof POKEMON_TYPES] || '#68D391';
};

export const translatePokemonType = (type: string, language: string = 'pt'): string => {
  if (language === 'en') {
    return capitalizeFirstLetter(type);
  }
  return POKEMON_TYPE_TRANSLATIONS[type as keyof typeof POKEMON_TYPE_TRANSLATIONS] || capitalizeFirstLetter(type);
};

export const translateStat = (stat: string, language: string = 'pt'): string => {
  if (language === 'en') {
    return capitalizeFirstLetter(stat.replace('-', ' '));
  }
  return STAT_TRANSLATIONS[stat as keyof typeof STAT_TRANSLATIONS] || capitalizeFirstLetter(stat.replace('-', ' '));
};

export const formatPokemonId = (id: number): string => {
  return `#${id.toString().padStart(3, '0')}`;
};

export const extractPokemonId = (url: string): number => {
  const matches = url.match(/\/(\d+)\/$/);
  return matches ? parseInt(matches[1]) : 0;
};

export const formatHeight = (height: number): string => {
  return `${(height / 10).toFixed(1)} m`;
};

export const formatWeight = (weight: number): string => {
  return `${(weight / 10).toFixed(1)} kg`;
};

export const getStatColor = (statValue: number): string => {
  if (statValue >= 100) return '#10B981'; // Verde
  if (statValue >= 70) return '#F59E0B'; // Amarelo
  if (statValue >= 40) return '#EF4444'; // Vermelho
  return '#6B7280'; // Cinza
};

export const getFlavorText = (species: any, language: string = 'pt', pokemonName?: string): string => {
  if (!species || !species.flavor_text_entries || species.flavor_text_entries.length === 0) {
    return '';
  }
  
  // Traduções manuais para descrições mais comuns em português
  const manualTranslations: {[key: string]: string} = {
    // Pokémon iniciais - Geração 1
    'bulbasaur': 'Uma semente estranha foi plantada em suas costas ao nascer. A planta brota e cresce com este Pokémon.',
    'ivysaur': 'Quando o bulbo em suas costas cresce grande, parece perder a capacidade de ficar em pé sobre as patas traseiras.',
    'venusaur': 'A planta floresce quando está absorvendo energia solar. Ela permanece em movimento para buscar a luz solar.',
    'charmander': 'Obviamente prefere lugares quentes. Quando chove, diz-se que vapor sai da ponta de sua cauda.',
    'charmeleon': 'Quando balança sua cauda em chamas, ela gradualmente aumenta a temperatura ao redor para níveis desconfortáveis.',
    'charizard': 'Cospe fogo que é quente o suficiente para derreter pedras. Pode causar incêndios florestais soprando chamas.',
    'squirtle': 'Após o nascimento, suas costas incham e endurecem em uma concha. Esguicha espuma poderosamente de sua boca.',
    'wartortle': 'É reconhecido como um símbolo de longevidade. Se sua concha tem algas, esse Wartortle é muito antigo.',
    'blastoise': 'Um Pokémon brutal com canhões de água pressurizada em sua concha. Eles são usados para ataques de alta velocidade.',
    
    // Pokémon comuns - Geração 1
    'caterpie': 'Suas patas curtas têm ventosas que lhe permitem escalar paredes íngremes sem escorregar.',
    'metapod': 'Este Pokémon está vulnerável a ataques enquanto sua concha é macia, expondo seu corpo fraco e mole.',
    'butterfree': 'Adora o néctar das flores. Pode localizar até mesmo pequenas quantidades de pólen.',
    'weedle': 'Frequentemente encontrado em florestas, comendo folhas. Tem um ferrão venenoso afiado em sua cabeça.',
    'kakuna': 'Quase incapaz de se mover, este Pokémon só pode endurecer sua concha para se proteger de predadores.',
    'beedrill': 'Voa em alta velocidade e ataca usando seus grandes ferrões venenosos em suas patas dianteiras e cauda.',
    'pidgey': 'Um Pokémon dócil que prefere evitar conflitos. Se perturbado, pode levantar areia para se proteger.',
    'pidgeotto': 'Muito protetor de seu território espaçoso. Este Pokémon atacará invasores com garras afiadas.',
    'pidgeot': 'Quando caça, voa baixo sobre a superfície da água e agarra presas desavisadas com suas garras.',
    'rattata': 'Morde qualquer coisa quando ataca. Pequeno e muito rápido, é um problema comum em muitas áreas.',
    'raticate': 'Usa suas garras afiadas para escavar tocas. Estes túneis deixam outros Pokémon confusos.',
    'spearow': 'Come insetos na grama e na floresta. Tem que bater suas asas curtas rapidamente para se manter no ar.',
    'fearow': 'Com suas enormes e magníficas asas, pode continuar voando sem nunca ter que pousar para descansar.',
    'ekans': 'Move-se silenciosamente e furtivamente. Come ovos de Pokémon pássaro, engolindo-os inteiros.',
    'arbok': 'É rumoreado que o padrão assustador em sua barriga varia por região.',
    'pikachu': 'Quando vários destes Pokémon se reúnem, sua eletricidade pode causar tempestades.',
    'raichu': 'Sua cauda longa serve como um para-raios. É comum ver este Pokémon parado em pontos altos em dias tempestuosos.',
    'sandshrew': 'Escava profundamente no subsolo em áreas áridas longe da água. Só emerge para caçar comida.',
    'sandslash': 'Enrola-se em uma bola quando ameaçado. Desta forma, pode rolar atacando ou fugindo.',
    'nidoran-f': 'Embora pequeno, seus chifres venenosos são perigosos. A fêmea tem chifres menores.',
    'nidorina': 'Quando com seus amigos ou família, mantém suas farpas retraídas para evitar ferimentos.',
    'nidoqueen': 'Seu corpo resistente e blindado protege-o enquanto força seu caminho através de vegetação densa.',
    'nidoran-m': 'Estende suas orelhas para verificar os arredores. Se detectar perigo, ataca com um chifre venenoso.',
    'nidorino': 'Um Pokémon agressivo que está sempre pronto para atacar. O chifre em sua cabeça secreta um veneno poderoso.',
    'nidoking': 'Usa sua cauda poderosa em combate para esmagar, constranger e quebrar os ossos do inimigo.',
    'clefairy': 'Sua aparência mágica e fofa o tornou popular como animal de estimação. No entanto, é raro e difícil de encontrar.',
    'clefable': 'Um Pokémon tímido que é raramente visto. Corre e se esconde no momento em que detecta pessoas.',
    'vulpix': 'Ao nascer, tem apenas uma cauda. A cauda se divide da ponta conforme cresce.',
    'ninetales': 'Muito vingativo, ele nunca esquece uma ofensa. Persegue implacavelmente qualquer um que o irrite.',
    'jigglypuff': 'Quando seus enormes olhos se iluminam, ele canta uma melodia misteriosamente calmante.',
    'wigglytuff': 'O resultado de suas células se expandindo. Tem uma sensação agradável e macia ao toque.',
    'zubat': 'Forma colônias em locais escuros. Usa ondas ultrassônicas para identificar e abordar alvos.',
    'golbat': 'Uma vez que morde, não solta até sugar completamente a vida de sua vítima.',
    'oddish': 'Durante o dia, mantém seu rosto enterrado no solo. À noite, vaga semeando suas sementes.',
    'gloom': 'O fluido que escorre de sua boca não é baba. É um néctar usado para atrair presas.',
    'vileplume': 'Quanto maiores suas pétalas, mais tóxico o pólen que contém. Sua cabeça grande é pesada e difícil de segurar.',
    'paras': 'Escava para sugar raízes de árvores. Os cogumelos em suas costas crescem alimentando-se dos nutrientes.',
    'parasect': 'Um Pokémon hospedeiro controlado pelo cogumelo maior. Prefere lugares úmidos e escuros.',
    'venonat': 'Vive na sombra de árvores altas onde come insetos. É atraído pela luz à noite.',
    'venomoth': 'As escamas que cobre são coloridas como pétalas de flores. Estas escamas são venenosas.',
    'diglett': 'Vive cerca de um metro no subsolo onde se alimenta de raízes de plantas. Às vezes aparece na superfície.',
    'dugtrio': 'Um conjunto de trigêmeos que pode escavar mais de 60 milhas de profundidade. É desconhecido o que está abaixo.',
    'meowth': 'Adora objetos redondos. Vaga pelas ruas todas as noites para procurar moedas perdidas.',
    'persian': 'Embora popular entre os treinadores, é difícil de treinar devido à sua natureza volúvel.',
    'psyduck': 'Enquanto acalma inimigos com seu olhar vago, este Pokémon astuto usará poderes psicoquinéticos.',
    'golduck': 'Frequentemente confundido com o monstro japonês Kappa, este Pokémon é muito hábil na natação.',
    'mankey': 'Extremamente temperamental, pode ficar furioso sem razão aparente.',
    'primeape': 'Sempre furioso e tenaz, perseguirá seu inimigo não importa quão longe.',
    'growlithe': 'Muito protetor de seu território. Latirá e morderá para repelir invasores de seu espaço.',
    'arcanine': 'Um Pokémon que tem sido admirado desde a antiguidade por sua beleza. Corre graciosamente.',
    'poliwag': 'Suas pernas recém-desenvolvidas impedem-no de correr. Parece preferir nadar do que tentar correr.',
    'poliwhirl': 'Capaz de viver dentro ou fora da água. Quando fora da água, sua pele se torna oleosa.',
    'poliwrath': 'Um nadador hábil tanto no estilo livre quanto no peito. Facilmente supera os melhores nadadores humanos.',
    'abra': 'Usando sua habilidade de ler mentes, identificará perigo iminente e se teletransportará para segurança.',
    'kadabra': 'Emite ondas alfa especiais de seu corpo que induzem dores de cabeça apenas por estar próximo.',
    'alakazam': 'Seu cérebro pode superar um supercomputador. Sua inteligência quotidiana é de 5.000.',
    'machop': 'Adora construir seus músculos. Treina em todos os tipos de artes marciais para se tornar mais forte.',
    'machoke': 'Seu corpo musculoso é tão poderoso que deve usar um cinto de força para controlar seus movimentos.',
    'machamp': 'Usando seus quatro braços, pode mover montanhas. Deve usar todas as quatro mãos para realizar tarefas delicadas.',
    'bellsprout': 'Um Pokémon carnívoro que prende e come insetos. Parece fazer pouco mais do que comer o dia todo.',
    'weepinbell': 'Cospe um fluido que dissolve qualquer coisa. Quando com fome, engole qualquer coisa que se mova.',
    'victreebel': 'Disse atrair presas com mel doce. A presa capturada é derretida em um fluido ácido.',
    'tentacool': 'Deriva nos mares rasos. Pescadores que os puxam por engano são frequentemente picados por seus tentáculos venenosos.',
    'tentacruel': 'Tem 80 tentáculos que se movem livremente. Eles podem picar, causando envenenamento e dor intensa.',
    'geodude': 'Encontrado em campos e montanhas. Confundindo-os com rochas, as pessoas frequentemente pisam ou tropeçam neles.',
    'graveler': 'Rola montanha abaixo para se mover. Rola sobre qualquer obstáculo sem diminuir a velocidade ou mudar de direção.',
    'golem': 'Sua concha blindada é extremamente dura. Pode explodir e causar terremotos, depois regenerar sua concha.',
    'ponyta': 'Suas patas crescem mais fortes correndo em terreno desafiador. Pode saltar sobre a Torre Eiffel.',
    'rapidash': 'Muito competitivo, este Pokémon perseguirá qualquer coisa que se mova rápido na esperança de correr contra ela.',
    'slowpoke': 'Incrivelmente lento e dopado. Leva 5 segundos para sentir dor quando atacado.',
    'slowbro': 'O Shellder que está mordendo a cauda de Slowbro secreta um veneno que torna o hospedeiro imune à dor.',
    'magnemite': 'Usa antigravidade para ficar suspenso. Aparece sem aviso e usa Thunder Wave e ataques similares.',
    'magneton': 'Formado por vários Magnemite ligados. Frequentemente aparece quando manchas solares flamejam.',
    'farfetchd': 'O talo de planta que carrega é sua arma. O talo é usado de muitas maneiras diferentes.',
    'doduo': 'Um Pokémon pássaro que não pode voar. Suas cabeças desenvolvidas representam inteligência e instinto.',
    'dodrio': 'Usa suas três cabeças cerebrais para planejar estratégias complexas. Uma das cabeças está sempre acordada.',
    'seel': 'O chifre protuberante em sua cabeça é muito duro. É usado para quebrar gelo espesso.',
    'dewgong': 'Armazena energia térmica em seu corpo. Nada a uma velocidade constante de 8 nós mesmo em águas intensamente frias.',
    'grimer': 'Aparece em áreas sujas. Prospera alimentando-se de lodo poluído que é bombeado para fora das fábricas.',
    'muk': 'Coberto densamente com um lodo sujo e vil. É tão tóxico que até suas pegadas contêm veneno.',
    'shellder': 'Sua concha é mais dura que diamante. Prende presas com sua concha, depois as devora.',
    'cloyster': 'Quando atacado, lança seus chifres em sucessão rápida. Ninguém jamais viu o que está dentro de sua concha.',
    'gastly': 'Quase invisível, este Pokémon gasoso espreita vítimas e as faz desmaiar com gás venenoso.',
    'haunter': 'Por causa de sua capacidade de deslizar através de paredes de blocos, diz-se que é de outra dimensão.',
    'gengar': 'Sob a lua cheia, este Pokémon gosta de imitar as sombras das pessoas e zombar de seus medos.',
    'onix': 'À medida que escava pelo solo, absorve muitos objetos duros. Isso torna seu corpo muito sólido.',
    'drowzee': 'Coloca inimigos para dormir e então come seus sonhos. Ocasionalmente fica doente de comer pesadelos.',
    'hypno': 'Quando balança seu pêndulo, pode colocar o inimigo em um estado de transe. Enquanto este transe durar, é uma presa fácil.',
    'krabby': 'Vive perto da água. Suas grandes garras crescem de volta se forem perdidas.',
    'kingler': 'Sua garra grande tem 10.000 hp de poder de esmagamento. No entanto, sua grande garra é muito pesada.',
    'voltorb': 'Geralmente encontrado em usinas de energia. Facilmente confundido com uma Poké Ball, tem chocado muitas pessoas.',
    'electrode': 'Armazena energia elétrica sob extrema pressão. Frequentemente explode com pouco ou nenhum aviso.',
    'exeggcute': 'Este Pokémon consiste em seis ovos que se cuidam. Os ovos se atraem e giram ao redor uns dos outros.',
    'exeggutor': 'Originário da selva, as cabeças de Exeggutor crescem continuamente quando expostas à forte luz solar.',
    'cubone': 'Porque nunca remove seu capacete de crânio, ninguém jamais viu o verdadeiro rosto deste Pokémon.',
    'marowak': 'O osso que segura é sua arma principal. Arremessa o osso habilmente como um bumerangue para nocautear alvos.',
    'hitmonlee': 'Quando em uma pressa, suas pernas se alongam progressivamente. Corre suavemente com passadas extra longas.',
    'hitmonchan': 'Enquanto aparentemente faz nada além de socar, estuda muitos tipos diferentes de artes marciais.',
    'lickitung': 'Sua língua pode se estender como um camaleão. Deixa uma pegajosa saliva que causa coceira.',
    'koffing': 'Porque armazena vários tipos de gases tóxicos em seu corpo, é propenso a explodir sem aviso.',
    'weezing': 'Onde dois tipos de gases venenosos se encontram, dois Koffings podem fundir-se em um Weezing ao longo de muitos anos.',
    'rhyhorn': 'Suas pernas curtas tornam-no pobre em virar e correr. Só pode carregar em linha reta.',
    'rhydon': 'Protegido por uma pele blindada, pode viver em lava de 3.600 graus Fahrenheit.',
    'chansey': 'Um Pokémon gentil que compartilha seus ovos nutritivos com Pokémon feridos que encontra.',
    'tangela': 'Todo o seu corpo é coberto por vinhas largas que se assemelham a algas marinhas. As vinhas balançam quando caminha.',
    'kangaskhan': 'O jovem raramente se aventura fora da bolsa protetora de sua mãe até os 3 anos de idade.',
    'horsea': 'Conhecido por derrubar insetos voadores atirando tinta de sua boca. Este Pokémon nada curvando seu corpo.',
    'seadra': 'Capaz de nadar para trás tocando rapidamente suas barbatanas peitorais, barbatanas dorsais e caudais.',
    'goldeen': 'Suas barbatanas caudais e peitorais ondulam elegantemente na água. É carinhosamente referido como princesa da água.',
    'seaking': 'Na temporada de outono, pode ser visto subindo rios e riachos. É o mais bonito na época de desova.',
    'staryu': 'Um enigmático Pokémon que pode regenerar sem esforço qualquer parte do corpo que tenha sido perdida na batalha.',
    'starmie': 'Seu núcleo central brilha com as sete cores do arco-íris. Algumas pessoas valorizam o núcleo como uma gema.',
    'mr-mime': 'Se interrompido enquanto está mimando, ele dará tapas ao redor com suas mãos largas.',
    'scyther': 'Com lâminas de foice, este Pokémon se torna perigosamente feroz. A afiação de suas lâminas torna-se mais aguçada cortando objetos duros.',
    'jynx': 'Caminha ritmicamente, balançando e balançando seus quadris como se estivesse dançando. Seus movimentos são tão bonitinhos, as pessoas que o veem são compelidas a dançar também.',
    'electabuzz': 'Normalmente encontrado perto de usinas de energia, alimenta-se de eletricidade como um vampiro.',
    'magmar': 'Seu corpo sempre queima com um brilho laranja que lhe permite esconder-se perfeitamente entre as chamas.',
    'pinsir': 'Se não consegue esmagar a vítima em suas pinças, balançará a vítima e a jogará fora.',
    'tauros': 'Quando visa um inimigo, carrega furiosamente enquanto chicoteia seu corpo com suas três caudas.',
    'magikarp': 'Na natureza, este é um Pokémon patético que tem o poder de apenas respingar. Este comportamento levou cientistas a rotulá-lo como fraco.',
    'gyarados': 'Raramente visto na natureza. Enorme e feroz, é capaz de destruir cidades inteiras em uma fúria.',
    'lapras': 'Um Pokémon gentil que adora carregar pessoas e Pokémon em suas costas através dos mares.',
    'ditto': 'Capaz de copiar o código genético de um oponente para transformar-se instantaneamente em uma duplicata do inimigo.',
    'eevee': 'Tem uma composição genética irregular que muda repentinamente devido à influência de seu ambiente.',
    'vaporeon': 'Vive perto da água. Sua cauda longa é sulcada com uma barbatana que é frequentemente confundida com uma sereia.',
    'jolteon': 'Acumula íons negativos na atmosfera para disparar raios de 10.000 volts.',
    'flareon': 'Quando armazena energia térmica em seu corpo, sua temperatura corporal pode subir para mais de 1.600 graus.',
    'porygon': 'Um Pokémon que consiste inteiramente de dados de programação. É capaz de mover-se livremente no ciberespaço.',
    'omanyte': 'Embora extinto há muito tempo, em raras ocasiões, pode ser geneticamente ressuscitado de fósseis.',
    'omastar': 'Um Pokémon pré-histórico que morreu quando sua concha espiral cresceu muito grande para se mover.',
    'kabuto': 'Um Pokémon que foi ressuscitado de um fóssil encontrado no fundo do oceano. Seus olhos duros podem ver através das profundezas turvas.',
    'kabutops': 'Suas lâminas afiadas são mais duras que rochas. Corta através de presas grossas para drenar os fluidos corporais.',
    'aerodactyl': 'Um feroz Pokémon antigo que supostamente foi extinto. Foi regenerado de material genético encontrado no âmbar.',
    'snorlax': 'Muito preguiçoso. Só se move para comer e dormir. À medida que seu corpo cresce maior, torna-se mais preguiçoso.',
    'articuno': 'Um Pokémon pássaro lendário que pode controlar gelo. O bater de suas asas congela o ar.',
    'zapdos': 'Um Pokémon pássaro lendário que tem a capacidade de controlar eletricidade. Geralmente vive em nuvens de tempestade.',
    'moltres': 'Conhecido como o Pokémon pássaro lendário de fogo. A cada batida de suas asas, cria brilhantes chamas alaranjadas.',
    'dratini': 'Muito longo vivido, este Pokémon foi confirmado existir por um pescador que o pegou.',
    'dragonair': 'Um Pokémon místico que exala uma aura gentil. Tem a capacidade de mudar o clima.',
    'dragonite': 'Um Pokémon marinho extremamente raro. Sua inteligência é dita ser igual à dos humanos.',
    'mewtwo': 'Foi criado por um cientista após anos de experimentos horríveis de engenharia genética e manipulação de DNA.',
    'mew': 'Tão raro que ainda é dito ser um espelho. Sua forma é dita conter o código genético de todos os Pokémon.'
  };

  let targetEntry = null;
  
  if (language === 'pt') {
    // Primeiro, verificar se temos tradução manual baseada no nome do Pokémon
    if (pokemonName && manualTranslations[pokemonName.toLowerCase()]) {
      return manualTranslations[pokemonName.toLowerCase()];
    }
    
    // Tentar encontrar uma entrada em português de versões recentes
    const recentVersions = [
      'scarlet', 'violet', 'legends-arceus', 'sword', 'shield',
      'ultra-sun', 'ultra-moon', 'sun', 'moon',
      'omega-ruby', 'alpha-sapphire', 'x', 'y'
    ];
    
    for (const version of recentVersions) {
      targetEntry = species.flavor_text_entries.find(
        (entry: any) => entry.language.name === 'pt' && 
        entry.version?.name === version
      );
      if (targetEntry) break;
    }
    
    // Se não encontrou com versão específica, pegar qualquer entrada em português
    if (!targetEntry) {
      targetEntry = species.flavor_text_entries.find(
        (entry: any) => entry.language.name === 'pt'
      );
    }
  } else {
    // Para inglês, pegar a primeira entrada disponível
    targetEntry = species.flavor_text_entries.find(
      (entry: any) => entry.language.name === 'en'
    );
  }
  
  // Fallback para inglês se não encontrou em português
  if (!targetEntry && language === 'pt') {
    targetEntry = species.flavor_text_entries.find(
      (entry: any) => entry.language.name === 'en'
    );
  }
  
  // Último fallback: primeira entrada disponível
  if (!targetEntry && species.flavor_text_entries.length > 0) {
    targetEntry = species.flavor_text_entries[0];
  }
  
  if (targetEntry) {
    return targetEntry.flavor_text
      .replace(/\f/g, ' ')
      .replace(/\n/g, ' ')
      .replace(/\r/g, ' ')
      .replace(/\u000c/g, ' ')
      .trim();
  }
  
  return '';
};

export const getGenus = (species: any, language: string = 'pt'): string => {
  if (!species || !species.genera || species.genera.length === 0) {
    return '';
  }
  
  // Traduções manuais para gêneros mais comuns
  const manualTranslations: {[key: string]: string} = {
    'Seed Pokémon': 'Pokémon Semente',
    'Lizard Pokémon': 'Pokémon Lagarto',
    'Flame Pokémon': 'Pokémon Chama',
    'Tiny Turtle Pokémon': 'Pokémon Tartaruga Pequena',
    'Turtle Pokémon': 'Pokémon Tartaruga',
    'Shellfish Pokémon': 'Pokémon Marisco',
    'Worm Pokémon': 'Pokémon Minhoca',
    'Cocoon Pokémon': 'Pokémon Casulo',
    'Butterfly Pokémon': 'Pokémon Borboleta',
    'Hairy Bug Pokémon': 'Pokémon Inseto Peludo',
    'Poison Bee Pokémon': 'Pokémon Abelha Venenosa',
    'Tiny Bird Pokémon': 'Pokémon Pássaro Pequeno',
    'Bird Pokémon': 'Pokémon Pássaro',
    'Mouse Pokémon': 'Pokémon Rato',
    'Beak Pokémon': 'Pokémon Bico',
    'Snake Pokémon': 'Pokémon Cobra',
    'Cobra Pokémon': 'Pokémon Naja',
    'Electric Mouse Pokémon': 'Pokémon Rato Elétrico',
    'Ground Pokémon': 'Pokémon Terra',
    'Poison Pin Pokémon': 'Pokémon Espinho Venenoso',
    'Drill Pokémon': 'Pokémon Broca',
    'Fairy Pokémon': 'Pokémon Fada',
    'Fox Pokémon': 'Pokémon Raposa',
    'Balloon Pokémon': 'Pokémon Balão',
    'Bat Pokémon': 'Pokémon Morcego',
    'Weed Pokémon': 'Pokémon Erva Daninha',
    'Flower Pokémon': 'Pokémon Flor',
    'Mushroom Pokémon': 'Pokémon Cogumelo',
    'Insect Pokémon': 'Pokémon Inseto',
    'Poison Moth Pokémon': 'Pokémon Mariposa Venenosa',
    'Mole Pokémon': 'Pokémon Toupeira',
    'Scratch Cat Pokémon': 'Pokémon Gato Arranhão',
    'Classy Cat Pokémon': 'Pokémon Gato Elegante',
    'Duck Pokémon': 'Pokémon Pato',
    'Pig Monkey Pokémon': 'Pokémon Macaco Porco',
    'Puppy Pokémon': 'Pokémon Filhote',
    'Legendary Pokémon': 'Pokémon Lendário',
    'Tadpole Pokémon': 'Pokémon Girino',
    'Psi Pokémon': 'Pokémon Psi',
    'Superpower Pokémon': 'Pokémon Superpoder',
    'Flycatcher Pokémon': 'Pokémon Papa-Moscas',
    'Jellyfish Pokémon': 'Pokémon Água-Viva',
    'Rock Pokémon': 'Pokémon Pedra',
    'Megaton Pokémon': 'Pokémon Megatonelada',
    'Fire Horse Pokémon': 'Pokémon Cavalo de Fogo',
    'Dopey Pokémon': 'Pokémon Bobão',
    'Hermit Crab Pokémon': 'Pokémon Caranguejo Eremita',
    'Magnet Pokémon': 'Pokémon Ímã',
    'Wild Duck Pokémon': 'Pokémon Pato Selvagem',
    'Twin Bird Pokémon': 'Pokémon Pássaro Gêmeo',
    'Triple Bird Pokémon': 'Pokémon Pássaro Triplo',
    'Sea Lion Pokémon': 'Pokémon Leão Marinho',
    'Sludge Pokémon': 'Pokémon Lodo',
    'Bivalve Pokémon': 'Pokémon Bivalve',
    'Gas Pokémon': 'Pokémon Gás',
    'Shadow Pokémon': 'Pokémon Sombra',
    'Rock Snake Pokémon': 'Pokémon Cobra de Pedra',
    'Hypnosis Pokémon': 'Pokémon Hipnose',
    'River Crab Pokémon': 'Pokémon Caranguejo do Rio',
    'Pincer Pokémon': 'Pokémon Pinça',
    'Ball Pokémon': 'Pokémon Bola',
    'Egg Pokémon': 'Pokémon Ovo',
    'Coconut Pokémon': 'Pokémon Coco',
    'Lonely Pokémon': 'Pokémon Solitário',
    'Bone Keeper Pokémon': 'Pokémon Guardião de Ossos',
    'Kicking Pokémon': 'Pokémon Chutador',
    'Punching Pokémon': 'Pokémon Socador',
    'Licking Pokémon': 'Pokémon Lambedor',
    'Poison Gas Pokémon': 'Pokémon Gás Venenoso',
    'Spikes Pokémon': 'Pokémon Espinhos',
    'Vine Pokémon': 'Pokémon Videira',
    'Parent Pokémon': 'Pokémon Pai',
    'Dragon Pokémon': 'Pokémon Dragão',
    'Goldfish Pokémon': 'Pokémon Peixe Dourado',
    'Starshape Pokémon': 'Pokémon Estrela',
    'Mysterious Pokémon': 'Pokémon Misterioso',
    'Barrier Pokémon': 'Pokémon Barreira',
    'Mantis Pokémon': 'Pokémon Louva-a-Deus',
    'Humanshape Pokémon': 'Pokémon Forma Humana',
    'Electric Pokémon': 'Pokémon Elétrico',
    'Spitfire Pokémon': 'Pokémon Cospe-Fogo',
    'Stagbeetle Pokémon': 'Pokémon Besouro',
    'Wild Bull Pokémon': 'Pokémon Touro Selvagem',
    'Fish Pokémon': 'Pokémon Peixe',
    'Atrocious Pokémon': 'Pokémon Atroz',
    'Transport Pokémon': 'Pokémon Transporte',
    'Transform Pokémon': 'Pokémon Transformação',
    'Evolution Pokémon': 'Pokémon Evolução',
    'Bubble Jet Pokémon': 'Pokémon Jato de Bolha',
    'Lightning Pokémon': 'Pokémon Relâmpago',
    'Virtual Pokémon': 'Pokémon Virtual',
    'Spiral Pokémon': 'Pokémon Espiral',
    'Trilobite Pokémon': 'Pokémon Trilobita',
    'Fossil Pokémon': 'Pokémon Fóssil',
    'Sleeping Pokémon': 'Pokémon Dorminhoco',
    'Freeze Pokémon': 'Pokémon Congelamento',
    'Thunder Pokémon': 'Pokémon Trovão',
    'Genetic Pokémon': 'Pokémon Genético',
    'New Species Pokémon': 'Pokémon Nova Espécie'
  };
  
  let targetGenus = null;
  
  if (language === 'pt') {
    // Tentar encontrar gênero em português
    targetGenus = species.genera.find(
      (genus: any) => genus.language.name === 'pt'
    );
    
    // Se não encontrou em português, tentar tradução manual do inglês
    if (!targetGenus) {
      const enGenus = species.genera.find(
        (genus: any) => genus.language.name === 'en'
      );
      if (enGenus && manualTranslations[enGenus.genus]) {
        return manualTranslations[enGenus.genus];
      }
    }
  } else {
    // Para inglês
    targetGenus = species.genera.find(
      (genus: any) => genus.language.name === 'en'
    );
  }
  
  // Fallback para inglês se não encontrou em português
  if (!targetGenus && language === 'pt') {
    targetGenus = species.genera.find(
      (genus: any) => genus.language.name === 'en'
    );
  }
  
  // Último fallback: primeira entrada disponível
  if (!targetGenus && species.genera.length > 0) {
    targetGenus = species.genera[0];
  }
  
  return targetGenus?.genus || '';
};