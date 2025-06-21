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
  
  // Traduções manuais expandidas para descrições em português
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
    
    // Geração 5 - Unova
    'jellicent': 'O destino dos navios e tripulações que vagam pelo habitat de Jellicent: todos afundados, todos perdidos, todos desaparecidos.',
    'frillish': 'Leva pessoas e Pokémon que se afogaram para o mundo dos espíritos. Disfarça-se como uma bela jovem.',
    'alomomola': 'Flutua no oceano aberto. Quando encontra Pokémon feridos, os abraça e os leva até a costa.',
    'stunfisk': 'Sua pele é muito dura. Mesmo que seja pisoteado por um lutador de sumô de 200 kg, não se machucaria.',
    'mienfoo': 'Tem um temperamento calmo. Quando luta, usa movimentos fluidos como uma dança.',
    'mienshao': 'Usa os pelos longos de seus braços como chicotes. Seus ataques têm a velocidade de um raio.',
    'druddigon': 'Captura presas com suas asas ásperas e as esmaga com sua mandíbula poderosa.',
    'golett': 'Acredita-se que foi criado por uma civilização antiga para proteger pessoas e Pokémon.',
    'golurk': 'Diz-se que foi ordenado por seu criador para proteger pessoas e Pokémon.',
    'pawniard': 'Caça em grupos. Afiam suas lâminas umas contra as outras.',
    'bisharp': 'Lidera um grupo de Pawniard. Luta com lâminas em todo o corpo.',
    'bouffalant': 'Seus pelos emaranhados absorvem dano. Pode derrubar um trem em movimento.',
    'rufflet': 'Desafia oponentes mais fortes corajosamente. Fica mais forte a cada batalha.',
    'braviary': 'Luta incansavelmente por seus companheiros. Pode carregar um carro enquanto voa.',
    'vullaby': 'Suas asas são muito pequenas para voar. Quando evolui, será capaz de voar.',
    'mandibuzz': 'Observa o solo de grandes alturas. Quando avista presas fracas, desce em um mergulho.',
    'heatmor': 'Usa sua língua de fogo para derreter a armadura de Durant e devorar seu interior.',
    'durant': 'Trabalham juntos para proteger sua colônia de Heatmor, seu predador natural.',
    'deino': 'Não consegue ver, então tenta aprender sobre seus arredores mordendo e atacando.',
    'zweilous': 'As duas cabeças não se dão bem. Qualquer coisa que veem, tentam destruir.',
    'hydreigon': 'Acredita-se que considera tudo como seus inimigos. Destrói tudo com seus três cabeças.',
    'larvesta': 'Vive no pé de vulcões. Cospe fogo de seus cinco chifres para repelir inimigos.',
    'volcarona': 'Quando a Terra escureceu devido a cinzas vulcânicas, diz-se que as chamas de Volcarona substituíram o sol.',
    'cobalion': 'Tem um corpo e coração de aço. Pode intimidar qualquer Pokémon apenas olhando.',
    'terrakion': 'Suas investidas podem derrubar até mesmo muralhas grossas. É conhecido em lendas.',
    'virizion': 'Suas pernas são como lâminas afiadas. Pode saltar sobre edifícios altos.',
    'tornadus': 'Voa pelo céu a 300 km/h. É tão violento que pode derrubar casas.',
    'thundurus': 'Dispara raios de sua cauda. Voa pelo céu e causa tempestades.',
    'reshiram': 'Pode incinerar o mundo com suas chamas. Ajuda aqueles que buscam a verdade.',
    'zekrom': 'Pode gerar poderosos campos elétricos. Ajuda aqueles que buscam ideais.',
    'landorus': 'As terras visitadas por Landorus produzem colheitas abundantes.',
    'kyurem': 'Gera uma energia poderosa dentro de seu corpo, mas vaza na forma de ar frio.',
    
    // Geração 6 - Kalos
    'chespin': 'Quando flexiona, pode repelir até mesmo um caminhão. Protege sua cabeça com seu capuz espinhoso.',
    'quilladin': 'Depende de sua armadura espinhosa para proteção. É gentil e não gosta de lutar.',
    'chesnaught': 'Quando protege seus aliados, pode resistir a uma explosão de bomba.',
    'fennekin': 'Come galhos para reabastecer energia. Expele ar quente de suas orelhas.',
    'braixen': 'Mantém um galho na cauda. O galho libera calor de mais de 400 graus.',
    'delphox': 'Usa galhos psíquicos para prever o futuro. Pode criar chamas de mais de 3000 graus.',
    'froakie': 'Secreta espuma flexível de seu peito e costas. Protege-o de ataques.',
    'frogadier': 'Pode saltar edifícios altos. Cuida de sua higiene lavando seu corpo constantemente.',
    'greninja': 'Cria estrelas d\'água afiadas e as arremessa. Pode cortar metal grosso.',
    'bunnelby': 'Escava tocas com suas orelhas. Pode escavar a noite toda sem parar.',
    'diggersby': 'Com suas orelhas poderosas, pode reduzir rochas grandes a escombros.',
    'fletchling': 'Apesar de seu temperamento amigável, pode ser implacável em batalha.',
    'fletchinder': 'Acende galhos secos com as chamas de seu corpo para marcar território.',
    'talonflame': 'Quando excitado, derrama faíscas de suas penas e inicia incêndios.',
    'scatterbug': 'Quando ameaçado, libera um pó preto que cega predadores.',
    'spewpa': 'Vive escondido sob folhas caídas. Quando atacado, libera pó venenoso.',
    'vivillon': 'Os padrões em suas asas variam dependendo do clima de sua região natal.',
    'litleo': 'Quando jovem, vive em grupos. Deixa o grupo quando pode produzir chamas mais quentes.',
    'pyroar': 'O macho com a juba mais quente lidera o grupo. As fêmeas protegem os filhotes.',
    'flabebe': 'Quando nasce, escolhe uma flor e cuida dela por toda a vida.',
    'floette': 'Flutua no ar e cuida de jardins de flores. Desenha círculos no céu.',
    'florges': 'Pode controlar jardins inteiros de flores. Suas flores liberam energia.',
    'skiddo': 'Se você montar em suas costas e segurar seus chifres, pode controlar seus movimentos.',
    'gogoat': 'Pode dizer os sentimentos de seu cavaleiro pelos movimentos de suas pernas.',
    'pancham': 'Tenta intimidar inimigos fazendo caretas, mas acaba parecendo fofo.',
    'pangoro': 'Não tolera bullying. Se vê alguém sendo intimidado, não consegue ignorar.',
    'furfrou': 'Cortar seu pelo não apenas muda sua aparência, mas também aguça seus sentidos.',
    'espurr': 'Tem dificuldade em controlar seus poderes psíquicos, então os mantém contidos.',
    'meowstic': 'Quando levanta suas orelhas, pode exercer poderes psíquicos suficientes para esmagar um caminhão.',
    'honedge': 'Se alguém tentar empunhá-lo, Honedge envolverá um pano azul ao redor do punho e drenará a energia vital.',
    'doublade': 'Quando as duas espadas se chocam, emitem um som metálico que afasta espíritos malignos.',
    'aegislash': 'Gerações de reis foram acompanhados por estes Pokémon, que usavam sua capacidade de discernir a qualidade de um líder.',
    'spritzee': 'Emite uma fragrância que enfeitiça aqueles que a cheiram e muda suas emoções.',
    'aromatisse': 'Pode controlar as emoções de seus oponentes usando sua fragrância.',
    'swirlix': 'Adora doces. Sua saliva é doce como algodão doce.',
    'slurpuff': 'Pode distinguir os mais sutis de cheiros. Usa isso para ajudar confeiteiros.',
    'inkay': 'Pisca suas manchas para confundir predadores e depois foge.',
    'malamar': 'Hipnotiza oponentes com suas manchas piscantes e os força a obedecer.',
    'binacle': 'Dois Binacle vivem em uma rocha. Quando brigam, um deixa a rocha.',
    'barbaracle': 'Sete Binacle se unem para formar um Barbaracle. A cabeça dá ordens aos membros.',
    'skrelp': 'Parece algas podres. Esconde-se entre algas para emboscar presas.',
    'dragalge': 'Seu veneno é forte o suficiente para corroer o casco de um navio tanque.',
    'clauncher': 'Dispara água de sua garra com força suficiente para perfurar metal grosso.',
    'clawitzer': 'Sua garra gigante pode perfurar o casco de um navio tanque com um tiro.',
    'helioptile': 'Gera eletricidade usando suas barbatanas tipo orelha. Pode viver sem comida.',
    'heliolisk': 'Pode gerar eletricidade suficiente para abastecer um arranha-céu.',
    'tyrunt': 'Seus poderosos maxilares podem esmagar um carro. Viveu há 100 milhões de anos.',
    'tyrantrum': 'Nada podia resistir a seus maxilares massivos. Era o rei indiscutível.',
    'amaura': 'Viveu em uma terra fria há 100 milhões de anos. Controla o ar frio.',
    'aurorus': 'Pode congelar o ar ao redor e criar paredes de diamante de gelo.',
    'sylveon': 'Envia uma aura calmante de suas fitas para parar brigas.',
    'hawlucha': 'Embora pequeno, seus movimentos de luta aérea são uma visão de se ver.',
    'dedenne': 'Usa seus bigodes como antenas. Pode se comunicar a longas distâncias.',
    'carbink': 'Nascido das pressões e temperaturas profundas no subsolo há centenas de milhões de anos.',
    'goomy': 'Considerado o mais fraco de todos os Pokémon Dragão. Vive em lugares úmidos.',
    'sliggoo': 'Seus quatro chifres são sensores altamente sensíveis. Pode detectar sons distantes.',
    'goodra': 'Ataca com seus chifres extensíveis. Tem um temperamento gentil, mas não gosta de solidão.',
    'klefki': 'Coleta chaves e as guarda. Quando ameaçado, faz barulho com as chaves.',
    'phantump': 'Segundo lendas, são espíritos de crianças que se perderam na floresta.',
    'trevenant': 'Controla árvores com suas raízes. Ataca aqueles que prejudicam a floresta.',
    'pumpkaboo': 'Diz-se que carrega espíritos errantes para o mundo dos mortos.',
    'gourgeist': 'Canta alegremente para amaldiçoar seus inimigos. Varia de tamanho.',
    'bergmite': 'Vive em montanhas cobertas de neve. Seu corpo é feito de gelo que nunca derrete.',
    'avalugg': 'Seu corpo dorsal é feito de gelo. Pode carregar vários Bergmite.',
    'noibat': 'Voa no escuro emitindo ondas ultrassônicas de suas orelhas.',
    'noivern': 'É extremamente combativo com qualquer coisa que entre em seu território.',
    'xerneas': 'Lendas dizem que pode compartilhar vida eterna. Dormiu por 1000 anos.',
    'yveltal': 'Quando sua vida chega ao fim, absorve a força vital de todos os seres vivos.',
    'zygarde': 'Monitora o ecossistema. Quando está em perigo, aparece e revela seu verdadeiro poder.',
    
    // Geração 7 - Alola
    'rowlet': 'Ataca inimigos com chutes poderosos. Pode girar sua cabeça quase 180 graus.',
    'dartrix': 'Extremamente narcisista sobre sua aparência. Nunca deixa que suas penas fiquem sujas.',
    'decidueye': 'Pode atirar suas penas como flechas. Em menos de um décimo de segundo, pode atirar seis flechas.',
    'litten': 'Enquanto se limpa, acumula pelos em seu estômago. Queima os pelos para atacar.',
    'torracat': 'Quando excitado, as chamas ao redor de seu pescoço queimam mais intensamente.',
    'incineroar': 'Após derrotar um oponente, solta chamas de seu umbigo como se fosse um cinturão de campeão.',
    'popplio': 'Cria balões de água de seu nariz. É hábil em acrobacias aquáticas.',
    'brionne': 'Aprende a dançar imitando outros Brionne. É um dançarino muito habilidoso.',
    'primarina': 'Controla balões de água com sua voz. Suas baladas podem curar tanto o corpo quanto o coração.',
    
    // Pokémon especiais e lendários
    'arceus': 'Segundo a mitologia, este Pokémon nasceu antes do universo existir.',
    'dialga': 'Tem o poder de controlar o tempo. Aparece em lendas de Sinnoh.',
    'palkia': 'Tem a habilidade de distorcer o espaço. Vive em uma dimensão paralela.',
    'giratina': 'Foi banido para o Mundo Reverso por sua violência. Silenciosamente observa o mundo.',
    'darkrai': 'Pode fazer pessoas e Pokémon adormecerem e ter pesadelos terríveis.',
    'shaymin': 'Pode purificar qualquer poluição instantaneamente e transformar terras devastadas em campos de flores.',
    'victini': 'Diz-se que traz vitória aos treinadores. Produz energia infinita.',
    'keldeo': 'Quando está determinado, seu corpo se torna mais afiado e pode cortar qualquer coisa.',
    'meloetta': 'Suas melodias são passadas através de gerações de Meloetta. Cada uma tem sua própria melodia.',
    'genesect': 'Mais de 300 milhões de anos atrás, foi temido como o caçador supremo.',
    
    // Mega Evoluções e formas especiais
    'mega-charizard-x': 'Suas chamas queimam mais quentes que antes. Pode derreter quase qualquer coisa.',
    'mega-charizard-y': 'Suas chamas atingem temperaturas de mais de 3000 graus Celsius.',
    'mega-blastoise': 'Seus canhões de água podem perfurar metal grosso com precisão perfeita.',
    'mega-venusaur': 'A flor em suas costas libera um aroma que melhora as emoções.',
    'mega-alakazam': 'Seus poderes psíquicos são amplificados ao extremo. Pode prever todos os movimentos do oponente.',
    'mega-gengar': 'Pode se esconder em qualquer sombra. Gosta de baixar a temperatura ao redor.',
    'mega-kangaskhan': 'O filhote cresceu e agora luta junto com sua mãe.',
    'mega-pinsir': 'Pode voar usando suas asas. Suas pinças são ainda mais poderosas.',
    'mega-gyarados': 'Sua fúria o transformou em algo ainda mais terrível.',
    'mega-aerodactyl': 'Recuperou sua forma primitiva através da Mega Evolução.',
    'mega-mewtwo-x': 'Seus músculos se desenvolveram, aumentando drasticamente seu poder físico.',
    'mega-mewtwo-y': 'Sua cauda cresceu e seus poderes psíquicos foram amplificados.',
    
    // Formas Alola
    'alolan-rattata': 'Tornou-se noturno para evitar competição. Suas presas cresceram.',
    'alolan-raticate': 'Come apenas alimentos frescos e de alta qualidade. É muito exigente.',
    'alolan-raichu': 'Usa sua cauda como prancha de surfe. Pode flutuar no ar.',
    'alolan-sandshrew': 'Vive em montanhas nevadas. Seu corpo é coberto por gelo duro.',
    'alolan-sandslash': 'Suas garras de gelo nunca derretem. Escala montanhas geladas.',
    'alolan-vulpix': 'Vive em montanhas nevadas. Pode criar gelo com sua respiração.',
    'alolan-ninetales': 'Pode criar cristais de gelo e usá-los para atacar inimigos.',
    'alolan-diglett': 'Seus pelos metálicos cresceram para se proteger do ambiente vulcânico.',
    'alolan-dugtrio': 'Seus pelos dourados são considerados sagrados em Alola.',
    'alolan-meowth': 'Tornou-se orgulhoso e egoísta. Só se aproxima de pessoas ricas.',
    'alolan-persian': 'Extremamente orgulhoso de sua pelagem. Olha com desdém para outros.',
    'alolan-geodude': 'Seu corpo contém ferro magnetizado. Pode gerar campos magnéticos.',
    'alolan-graveler': 'Come ferro para manter seu corpo magnético. Pode atrair objetos metálicos.',
    'alolan-golem': 'Dispara rochas de seus canhões dorsais. É muito territorial.',
    'alolan-grimer': 'Come lixo tóxico. Quanto mais come, mais brilhantes ficam suas cores.',
    'alolan-muk': 'Suas toxinas são tão potentes que podem ser fatais com apenas um toque.',
    'alolan-exeggutor': 'O clima tropical fez seu pescoço crescer. Pode usar ataques de Dragão.',
    'alolan-marowak': 'Honra seus ancestrais com danças de fogo. Suas chamas nunca se apagam.',
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
  
  // Traduções manuais expandidas para gêneros em português
  const manualTranslations: {[key: string]: string} = {
    // Gêneros básicos
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
    'New Species Pokémon': 'Pokémon Nova Espécie',
    'Order Pokémon': 'Pokémon Ordem',
    'Equilibrium Pokémon': 'Pokémon Equilíbrio',
    
    // Gêneros de gerações mais recentes
    'Floating Pokémon': 'Pokémon Flutuante',
    'Caring Pokémon': 'Pokémon Cuidador',
    'Trap Pokémon': 'Pokémon Armadilha',
    'Martial Arts Pokémon': 'Pokémon Artes Marciais',
    'Cave Pokémon': 'Pokémon Caverna',
    'Automaton Pokémon': 'Pokémon Autômato',
    'Sharp Blade Pokémon': 'Pokémon Lâmina Afiada',
    'Sword Blade Pokémon': 'Pokémon Espada',
    'Bash Buffalo Pokémon': 'Pokémon Búfalo Investida',
    'Eaglet Pokémon': 'Pokémon Águia Jovem',
    'Valiant Pokémon': 'Pokémon Valente',
    'Diapered Pokémon': 'Pokémon Fralda',
    'Bone Vulture Pokémon': 'Pokémon Abutre Ósseo',
    'Anteater Pokémon': 'Pokémon Tamanduá',
    'Iron Ant Pokémon': 'Pokémon Formiga de Ferro',
    'Irate Pokémon': 'Pokémon Irado',
    'Hostile Pokémon': 'Pokémon Hostil',
    'Brutal Pokémon': 'Pokémon Brutal',
    'Torch Pokémon': 'Pokémon Tocha',
    'Sun Pokémon': 'Pokémon Sol',
    'Iron Will Pokémon': 'Pokémon Vontade de Ferro',
    'Cavern Pokémon': 'Pokémon Caverna',
    'Grassland Pokémon': 'Pokémon Pradaria',
    'Cyclone Pokémon': 'Pokémon Ciclone',
    'Bolt Strike Pokémon': 'Pokémon Raio',
    'Abundance Pokémon': 'Pokémon Abundância',
    'Boundary Pokémon': 'Pokémon Fronteira',
    'Deep Black Pokémon': 'Pokémon Negro Profundo',
    'Vast White Pokémon': 'Pokémon Branco Vasto',
    
    // Gêneros Kalos
    'Spiny Nut Pokémon': 'Pokémon Noz Espinhosa',
    'Spiny Armor Pokémon': 'Pokémon Armadura Espinhosa',
    'Fox Pokémon ': 'Pokémon Raposa',
    'Bubble Frog Pokémon': 'Pokémon Sapo Bolha',
    'Ninja Pokémon': 'Pokémon Ninja',
    'Digging Pokémon': 'Pokémon Escavador',
    'Tiny Robin Pokémon': 'Pokémon Robin Pequeno',
    'Ember Pokémon': 'Pokémon Brasa',
    'Scorching Pokémon': 'Pokémon Escaldante',
    'Scatterdust Pokémon': 'Pokémon Poeira Dispersa',
    'Scale Pokémon': 'Pokémon Escama',
    'Lion Cub Pokémon': 'Pokémon Filhote de Leão',
    'Royal Pokémon': 'Pokémon Real',
    'Single Bloom Pokémon': 'Pokémon Flor Única',
    'Garden Pokémon': 'Pokémon Jardim',
    'Mount Pokémon': 'Pokémon Montaria',
    'Playful Pokémon': 'Pokémon Brincalhão',
    'Daunting Pokémon': 'Pokémon Intimidador',
    'Poodle Pokémon': 'Pokémon Poodle',
    'Restraint Pokémon': 'Pokémon Contenção',
    'Meowstic Pokémon': 'Pokémon Meowstic',
    'Sword Pokémon': 'Pokémon Espada',
    'Perfume Pokémon': 'Pokémon Perfume',
    'Fragrance Pokémon': 'Pokémon Fragrância',
    'Cotton Candy Pokémon': 'Pokémon Algodão Doce',
    'Meringue Pokémon': 'Pokémon Merengue',
    'Revolving Pokémon': 'Pokémon Giratório',
    'Overturning Pokémon': 'Pokémon Reviravolta',
    'Two-Handed Pokémon': 'Pokémon Duas Mãos',
    'Collective Pokémon': 'Pokémon Coletivo',
    'Mock Kelp Pokémon': 'Pokémon Alga Falsa',
    'Poison Drag Pokémon': 'Pokémon Arrasto Venenoso',
    'Water Gun Pokémon': 'Pokémon Pistola d\'Água',
    'Howitzer Pokémon': 'Pokémon Obus',
    'Generator Pokémon': 'Pokémon Gerador',
    'Despot Pokémon': 'Pokémon Déspota',
    'Tundra Pokémon': 'Pokémon Tundra',
    'Intertwining Pokémon': 'Pokémon Entrelaçamento',
    'Wrestling Pokémon': 'Pokémon Luta Livre',
    'Antenna Pokémon': 'Pokémon Antena',
    'Jewel Pokémon': 'Pokémon Joia',
    'Soft Tissue Pokémon': 'Pokémon Tecido Mole',
    'Dragon Pokémon ': 'Pokémon Dragão',
    'Key Ring Pokémon': 'Pokémon Chaveiro',
    'Stump Pokémon': 'Pokémon Toco',
    'Elder Tree Pokémon': 'Pokémon Árvore Anciã',
    'Pumpkin Pokémon': 'Pokémon Abóbora',
    'Iceberg Pokémon': 'Pokémon Iceberg',
    'Sound Wave Pokémon': 'Pokémon Onda Sonora',
    'Life Pokémon': 'Pokémon Vida',
    'Destruction Pokémon': 'Pokémon Destruição',
    
    // Gêneros Alola
    'Grass Quill Pokémon': 'Pokémon Pena de Grama',
    'Blade Quill Pokémon': 'Pokémon Pena Lâmina',
    'Arrow Quill Pokémon': 'Pokémon Pena Flecha',
    'Fire Cat Pokémon': 'Pokémon Gato de Fogo',
    'Heel Pokémon': 'Pokémon Calcanhar',
    'Sea Lion Pokémon ': 'Pokémon Leão Marinho',
    'Pop Star Pokémon': 'Pokémon Estrela Pop',
    'Soloist Pokémon': 'Pokémon Solista',
    'Woodpecker Pokémon': 'Pokémon Pica-pau',
    'Bugle Beak Pokémon': 'Pokémon Bico Corneta',
    'Cannon Pokémon': 'Pokémon Canhão',
    'Loitering Pokémon': 'Pokémon Vagabundo',
    'Bee Fly Pokémon': 'Pokémon Mosca Abelha',
    'Wolf Pokémon': 'Pokémon Lobo',
    'Small Fry Pokémon': 'Pokémon Peixinho',
    'Brutal Star Pokémon': 'Pokémon Estrela Brutal',
    'Roly-Poly Pokémon': 'Pokémon Tatuzinho',
    'Turn Tail Pokémon': 'Pokémon Vira Cauda',
    'Strong Arm Pokémon': 'Pokémon Braço Forte',
    'Poser Pokémon': 'Pokémon Posador',
    'Teamwork Pokémon': 'Pokémon Trabalho em Equipe',
    'Turn Tail Pokémon ': 'Pokémon Vira Cauda',
    'Sage Pokémon': 'Pokémon Sábio',
    'Woolly Crab Pokémon': 'Pokémon Caranguejo Lanoso',
    'Dancing Pokémon': 'Pokémon Dançarino',
    'Bee Fly Pokémon ': 'Pokémon Mosca Abelha',
    'Fruit Pokémon': 'Pokémon Fruta',
    'Land Spirit Pokémon': 'Pokémon Espírito da Terra',
    'Sunne Pokémon': 'Pokémon Sol',
    'Moone Pokémon': 'Pokémon Lua',
    'Prism Pokémon': 'Pokémon Prisma',
    'Glowing Pokémon': 'Pokémon Brilhante',
    'Launch Pokémon': 'Pokémon Lançamento',
    'Drawn Sword Pokémon': 'Pokémon Espada Desembainhada',
    'Fireworks Pokémon': 'Pokémon Fogos de Artifício',
    'Parasite Pokémon': 'Pokémon Parasita',
    'Swollen Pokémon': 'Pokémon Inchado',
    'Lissome Pokémon': 'Pokémon Flexível',
    'Scaly Pokémon': 'Pokémon Escamoso',
    'Synthetic Pokémon': 'Pokémon Sintético',
    'Artificial Pokémon': 'Pokémon Artificial'
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
