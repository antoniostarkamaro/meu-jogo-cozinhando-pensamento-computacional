// Transição entre telas
document.getElementById('startBtn').addEventListener('click', () => {
  document.getElementById('introScreen').style.display = 'none';
  document.getElementById('explanationScreen').style.display = 'block';
});

document.getElementById('nextBtn1').addEventListener('click', () => {
  document.getElementById('explanationScreen').style.display = 'none';
  document.getElementById('gameScreen1').style.display = 'block';
});

// Função de arrastar os ingredientes
document.querySelectorAll('img').forEach(item => {
  item.addEventListener('dragstart', dragStart);
});

function dragStart(e) {
  e.dataTransfer.setData('text', e.target.id);
}

// Função para permitir que o ingrediente seja arrastado para a dropzone
function allowDrop(e) {
  e.preventDefault(); // Previne o comportamento padrão de bloqueio
}

// Função de arrastar o ingrediente
function drag(e) {
  e.dataTransfer.setData('text', e.target.id); // Armazena o ID do ingrediente que está sendo arrastado
}

// Função de soltar o ingrediente na dropzone
function drop(e) {
  e.preventDefault(); // Previne o comportamento que tava

  let dropzone = e.target; // Dropzone onde o ingrediente será solto
  const data = e.dataTransfer.getData('text'); // Obtém o ID do ingrediente arrastado
  const draggedElement = document.getElementById(data); // Seleciona o ingrediente arrastado

  // Verifica se o target é uma dropzone ou um elemento dentro da dropzone
  if (!dropzone.classList.contains('dropzone')) {
    // Se o target não for uma dropzone (se for o conteúdo dentro), suba na hierarquia até encontrar a dropzone
    dropzone = dropzone.closest('.dropzone');
  }

  // Verifica se a dropzone já tem um ingrediente
  if (dropzone.children.length === 0) {
    dropzone.appendChild(draggedElement); // Se a dropzone estiver vazia, aceita o ingrediente
  } else {
    // Se a dropzone estiver ocupada, o ingrediente volta para o container original

    // Verifica se o ingrediente pertence à receita de Misto Quente, Omelete, Macarronada ou Bolo
    if (draggedElement.id === 'virarOmelete' || draggedElement.id === 'mexerOvos' || draggedElement.id === 'despejarOvos' || draggedElement.id === 'aquecerFrigideira') {
      const containerOriginal = document.querySelector('#ingredientesOmelete'); // Container de origem do omelete
      containerOriginal.appendChild(draggedElement); // Retorna o ingrediente para o container original
    } else if (draggedElement.id === 'pao' || draggedElement.id === 'queijo' || draggedElement.id === 'presunto') {
      const containerOriginal = document.querySelector('#ingredientesMistoQuente'); // Container de origem do misto quente
      containerOriginal.appendChild(draggedElement); // Retorna o ingrediente para o container original
    } else if (draggedElement.id === 'ferverAgua' || draggedElement.id === 'molho' || draggedElement.id === 'cozinharMacarrao' || draggedElement.id === 'misturaMacarrao' || draggedElement.id === 'escorrerMacarrao') {
      const containerOriginal = document.querySelector('#ingredientesMacarronada'); // Container de origem da macarronada
      containerOriginal.appendChild(draggedElement); // Retorna o ingrediente para o container original
    } else if (draggedElement.id === 'despejarMassa' || draggedElement.id === 'boloForno' || draggedElement.id === 'misturaIngredientes' || draggedElement.id === 'servirBolo' || draggedElement.id === 'untarForma') {
      const containerOriginal = document.querySelector('#ingredientesBolo'); // Container de origem do bolo
      containerOriginal.appendChild(draggedElement); // Retorna o ingrediente para o container original
    }

    alert('A área já está ocupada! Coloque o ingrediente em outra área.');
  }
}


// Função para tocar os áudios corretos de acordo com o resultado
function tocarSomResultado(acertou) {
  const aplausos = document.getElementById('audioAplausos');
  const erro = document.getElementById('audioErro');

  // Reproduz o som correto de acordo com o resultado
  if (acertou) {
    aplausos.play();
  } else {
    erro.play();
  }
}

// Verificar o Misto Quente
document.getElementById('checkBtn1').addEventListener('click', () => {
  const dropzones = document.querySelectorAll('.dropzone');
  const correctOrder = ['pao', 'queijo', 'presunto'];

  let isCorrect = true;
  dropzones.forEach((zone, index) => {
    const child = zone.children[0];
    if (child && child.id !== correctOrder[index]) {
      isCorrect = false;
    }
  });

  if (isCorrect) {
    tocarSomResultado(true); // Toca som de aplausos
    alert('Parabéns! Você preparou o misto quente corretamente!');
    document.getElementById('nextBtn2').style.display = 'block';  // Mostra o botão Next
  } else {
    tocarSomResultado(false); // Toca som de erro
    alert('Ops, algo deu errado. Tente novamente!');
  }
});

// Transição para a tela do Omelete
document.getElementById('nextBtn2').addEventListener('click', () => {
  document.getElementById('gameScreen1').style.display = 'none';
  document.getElementById('gameScreen2').style.display = 'block';
});

// Verificar o Omelete
document.getElementById('checkBtn2').addEventListener('click', () => {
  const dropzones = [document.getElementById('dropOmelete1'), document.getElementById('dropOmelete2'), document.getElementById('dropOmelete3'), document.getElementById('dropOmelete4')];
  const correctOrder = ['aquecerFrigideira', 'despejarOvos', 'mexerOvos', 'virarOmelete'];

  let isCorrect = true;

  // Verifica a ordem dos itens nas dropzones específicas do omelete
  dropzones.forEach((zone, index) => {
    const child = zone.children[0];  // Verifica se existe um filho (ingrediente)
    if (!child || child.id !== correctOrder[index]) {
      isCorrect = false;
    }
  });

  if (isCorrect) {
    alert('Parabéns! Você preparou o Omelete corretamente!');
    document.getElementById('nextBtn3').style.display = 'block';  // Mostra o botão Next
    tocarSomResultado(true); // Toca som de aplausos
  } else {
    alert('Ops, algo deu errado. Tente novamente!');
    tocarSomResultado(false); // Toca som de erro
  }
});

// Transição para a tela do Omelete para a Macarronada
document.getElementById('nextBtn3').addEventListener('click', () => {
  document.getElementById('gameScreen2').style.display = 'none';
  document.getElementById('gameScreen3').style.display = 'block';
});

// Verificar Macarronada
document.getElementById('checkBtn3').addEventListener('click', () => {
  const dropzones = [document.getElementById('dropMacarronada01'), document.getElementById('dropMacarronada02'), document.getElementById('dropMacarronada03'), document.getElementById('dropMacarronada04'), document.getElementById('dropMacarronada05')];

  // Aqui vai a ordem correta que deve esta os ingredientes da macarronada
  const correctOrder = ['ferverAgua', 'cozinharMacarrao', 'escorrerMacarrao', 'molho', 'misturaMacarrao'];

  let isCorrect = true;

  // Verifica a ordem dos itens nas dropzones específicas da macarronada
  dropzones.forEach((zone, index) => {
    const child = zone.children[0];  // Verifica se existe um filho (ingrediente)
    if (!child || child.id !== correctOrder[index]) {
      isCorrect = false;
    }
  });

  if (isCorrect) {
    alert('Parabéns! Você preparou uma deliciosa Macarronada corretamente!');
    document.getElementById('nextBtn4').style.display = 'block';  // Mostra o botão Next
    tocarSomResultado(true); // Toca som de aplausos
  } else {
    alert('Ops, algo deu errado. Tente novamente!');
    tocarSomResultado(false); // Toca som de erro
  }
});

// Transição da tela da macarronada para tela do bolo
document.getElementById('nextBtn4').addEventListener('click', () => {
  document.getElementById('gameScreen3').style.display = 'none';
  document.getElementById('gameScreen4').style.display = 'block';
});

// Verificar Bolo 
document.getElementById('checkBtn4').addEventListener('click', () => {
  const dropzones = [document.getElementById('dropBolo01'), document.getElementById('dropBolo02'), document.getElementById('dropBolo03'), document.getElementById('dropBolo04'), document.getElementById('dropBolo05')];

  // Aqui vai a ordem correta que deve esta os ingredientes Bolo
  const correctOrder = ['untarForma', 'misturaIngredientes', 'despejarMassa', 'boloForno', 'servirBolo'];

  let isCorrect = true;

  // Verifica a ordem dos itens nas dropzones específicas da macarronada
  dropzones.forEach((zone, index) => {
    const child = zone.children[0];  // Verifica se existe um filho (ingrediente)
    if (!child || child.id !== correctOrder[index]) {
      isCorrect = false;
    }
  });

  if (isCorrect) {
    alert('Parabéns! Você preparou um delicioso Bolo corretamente!');
    document.getElementById('nextBtn5').style.display = 'block';  // Mostra o botão Next
    tocarSomResultado(true); // Toca som de aplausos
  } else {
    alert('Ops, algo deu errado. Tente novamente!');
    tocarSomResultado(false); // Toca som de erro
  }
});

// Transição da tela do Bolo para a tela de Parabéns 
document.getElementById('nextBtn5').addEventListener('click', () => {
  document.getElementById('gameScreen4').style.display = 'none';
  document.getElementById('gameScreen5').style.display = 'block';

  document.getElementById('nextBtn5').style.display = 'none';  // Ocultar botão nextBtn5
  document.getElementById('nextBtn6').style.display = 'block';  // Mostra o botão NextBtn6
});

// Transição da tela de parabéns para a tela de créditos
document.getElementById('nextBtn6').addEventListener('click', () => {
  document.getElementById('gameScreen5').style.display = 'none';
  document.getElementById('gameScreen6').style.display = 'block';

});

// Transição da tela de parabéns para a tela de créditos
document.getElementById('nextBtn7').addEventListener('click', () => {
  document.getElementById('gameScreen6').style.display = 'none';
  document.getElementById('gameScreen7').style.display = 'block';

});

// Função para retornar à tela inicial quando o jogador clica em "Reiniciar Game"
document.getElementById('reiniciarBtn').addEventListener('click', () => {
  // Esconde a tela final
  document.getElementById('gameScreen7').style.display = 'none';
  
  // Reseta para a tela inicial
  document.getElementById('introScreen').style.display = 'block';

  // Resetar as dropzones para que fiquem vazias
  resetDropzones()

  
  //resetIngredients();
  resetIngredients()

 
});

// Função para limpar as dropzones
function resetDropzones() {
  const allDropzones = document.querySelectorAll('.dropzone'); // Seleciona todas as dropzones do jogo
  
  allDropzones.forEach(zone => {
    // Limpa todos os filhos (ingredientes) das dropzones
    while (zone.firstChild) {
      const ingredient = zone.firstChild;
      
      // Move o ingrediente para o container correto
      if (ingredient.id === 'pao' || ingredient.id === 'queijo' || ingredient.id === 'presunto') {
        document.getElementById('ingredientesMistoQuente').appendChild(ingredient);
      } else if (ingredient.id === 'virarOmelete' || ingredient.id === 'mexerOvos' || ingredient.id === 'despejarOvos' || ingredient.id === 'aquecerFrigideira') {
        document.getElementById('ingredientesOmelete').appendChild(ingredient);
      } else if (ingredient.id === 'ferverAgua' || ingredient.id === 'molho' || ingredient.id === 'cozinharMacarrao' || ingredient.id === 'misturaMacarrao' || ingredient.id === 'escorrerMacarrao') {
        document.getElementById('ingredientesMacarronada').appendChild(ingredient);
      } else if (ingredient.id === 'despejarMassa' || ingredient.id === 'boloForno' || ingredient.id === 'misturaIngredientes' || ingredient.id === 'servirBolo' || ingredient.id === 'untarForma') {
        document.getElementById('ingredientesBolo').appendChild(ingredient);
      }
    }
    
    // Limpa o conteúdo da dropzone completamente
    zone.innerHTML = '';
  });
}

// Função para recolocar os ingredientes nas suas posições originais (se necessário)
function resetIngredients() {
  const ingredientesMistoQuente = document.querySelectorAll('#ingredientesMistoQuente img'); // Ingredientes do misto quente
  const containerMistoQuente = document.getElementById('ingredientesMistoQuente');
  ingredientesMistoQuente.forEach(ingredient => {
    if (!containerMistoQuente.contains(ingredient)) {
      containerMistoQuente.appendChild(ingredient);
    }
  });

  const ingredientesOmelete = document.querySelectorAll('#ingredientesOmelete img'); // Ingredientes do omelete
  const containerOmelete = document.getElementById('ingredientesOmelete');
  ingredientesOmelete.forEach(ingredient => {
    if (!containerOmelete.contains(ingredient)) {
      containerOmelete.appendChild(ingredient);
    }
  });

  const ingredientesMacarronada = document.querySelectorAll('#ingredientesMacarronada img'); // Ingredientes do omelete
  const containerMacarronada = document.getElementById('ingredientesMacarronada');
  ingredientesMacarronada.forEach(ingredient => {
    if (!containerMacarronada.contains(ingredient)) {
      containerMacarronada.appendChild(ingredient);
    }
  });

  const ingredientesBolo = document.querySelectorAll('#ingredientesBolo img'); // Ingredientes do omelete
  const containerBolo = document.getElementById('ingredientesBolo');
  ingredientesBolo.forEach(ingredient => {
    if (!containerBolo.contains(ingredient)) {
      containerBolo.appendChild(ingredient);
    }
  });
}


//                                               Música do Jogo 

// Função para iniciar a música de fundo e controlar o volume
function iniciarMusicaFundo() {
  const musicaFundo = document.getElementById('backgroundMusic');

  // Define o volume da música (valor entre 0.0 e 1.0)
  musicaFundo.volume = 0.2; // Ajuste o volume conforme necessário

  // Verifica se o áudio está pausado ou se não está tocando, e inicia a música
  if (musicaFundo.paused) {
    musicaFundo.play().catch((error) => {
      console.log('Erro ao tentar tocar a música de fundo:', error);
    });
  }
}

// Garantir que a música de fundo seja tocada ao clicar no botão de "Iniciar"
document.getElementById('startBtn').addEventListener('click', function() {
  iniciarMusicaFundo(); // Inicia a música de fundo ao clicar em "Iniciar"
});

// Chama a função de iniciar a música quando a página é carregada
window.onload = function() {
  iniciarMusica();
};

