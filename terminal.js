// Dados bilíngues sobre você
const personalData = {
  'pt-br': {
    name: "Johny Lira Cavalcante",
    skills: ["Python", "C", "Java", "Go", "Node.js", "JavaScript", "React", "TailwindCSS", "HTML", "CSS"],
    experience: "Desenvolvimento de software com foco em aplicações escaláveis, e-commerce e gerenciamento de tarefas.",
    education: "Análise e Desenvolvimento de Sistemas",
    interests: ["desenvolvimento web", "otimização de sistemas", "experiência do usuário"],
    contact: "GitHub: lirajohny, LinkedIn: johny-lira95",
    projects: ["Plataforma de E-commerce", "Aplicativo de Gerenciamento de Tarefas", "Fract-ol"],
    welcome: "Welcome to my interactive terminal! Type \'help\' to see available commands.",
    helpText: `Comandos disponíveis: 
    - "nome" - Saber quem sou
    - "habilidades" - Conhecer minhas tecnologias 
    - "experiência" - Conhecer minha experiência profissional
    - "formação" - Ver minha formação acadêmica
    - "interesses" - Descobrir meus interesses
    - "contato" - Obter informações de contato
    - "projetos" - Ver projetos em que trabalhei
    - "limpar" - Limpar o terminal`,
    unknown: "Desculpe, não entendi sua pergunta. Digite \"ajuda\" para ver os comandos disponíveis.",
    cleared: "Terminal limpo. Digite \"ajuda\" para ver os comandos disponíveis.",
    prompt: "visitante@portfolio:~$"
  },
  'en': {
    name: "Johny Lira Cavalcante",
    skills: ["Python", "C", "Java", "Go", "Node.js", "JavaScript", "React", "TailwindCSS", "HTML", "CSS"],
    experience: "Software development focusing on scalable applications, e-commerce, and task management.",
    education: "Systems Analysis and Development",
    interests: ["web development", "system optimization", "user experience"],
    contact: "GitHub: lirajohny, LinkedIn: johny-lira95",
    projects: ["E-commerce Platform", "Task Management Application", "Fract-ol"],
    welcome: "Welcome to my interactive terminal! Type \"help\" to see available commands.",
    helpText: `Available commands: 
    - "name" - Know who I am
    - "skills" - Learn about my technologies
    - "experience" - Know my professional experience
    - "education" - See my academic background
    - "interests" - Discover my interests
    - "contact" - Get contact information
    - "projects" - See projects I've worked on
    - "clear" - Clear the terminal`,
    unknown: "Sorry, I didn't understand your question. Type \"help\" to see available commands.",
    cleared: "Terminal cleared. Type \"help\" to see available commands.",
    prompt: "visitor@portfolio:~$"
  }
};

// Detectar idioma atual
function getCurrentLanguage() {
  return document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'pt-br';
}

// Função para processar perguntas e gerar respostas
function generateResponse(input, lang) {
  input = input.toLowerCase();
  const data = personalData[lang];

  // Comandos em português e inglês
  if (input.includes("nome") || input.includes("name") || input.includes("who")) {
    return `${data.name}`;
  } else if (input.includes("habilidade") || input.includes("skill") || input.includes("tecnologia")) {
    return `${data.skills.join(', ')}`;
  } else if (input.includes("experiência") || input.includes("experience") || input.includes("trabalho") || input.includes("work")) {
    return data.experience;
  } else if (input.includes("educação") || input.includes("education") || input.includes("formação")) {
    return data.education;
  } else if (input.includes("interesse") || input.includes("hobby") || input.includes("interests")) {
    return `${data.interests.join(', ')}`;
  } else if (input.includes("contato") || input.includes("contact") || input.includes("email")) {
    return data.contact;
  } else if (input.includes("projeto") || input.includes("project")) {
    return `${data.projects.join(', ')}`;
  } else if (input.includes("ajuda") || input.includes("help") || input.includes("comandos") || input.includes("commands")) {
    return data.helpText;
  } else if (input === "clear" || input === "limpar") {
    return "CLEAR_COMMAND";
  } else {
    return data.unknown;
  }
}

// Inicialize o terminal quando a página for carregada
window.addEventListener('load', function() {
  console.log('Inicializando terminal interativo...');

  // Encontre o elemento do terminal
  const terminalRoot = document.getElementById('terminal-root');
  if (!terminalRoot) {
    console.error('Elemento #terminal-root não encontrado!');
    return;
  }

  // Idioma atual
  let currentLanguage = getCurrentLanguage();

  // Crie o HTML do terminal
  terminalRoot.innerHTML = `
    <div class="terminal-container">
      <div class="terminal-header">
        <div class="terminal-controls">
          <span class="terminal-control close"></span>
          <span class="terminal-control minimize"></span>
          <span class="terminal-control maximize"></span>
        </div>
        <div class="terminal-title">~/johny-lira-terminal</div>
      </div>
      <div class="terminal-body">
        <div class="terminal-line system">
          ${personalData[currentLanguage].welcome}
        </div>
      </div>
      <form class="terminal-form">
        <span class="terminal-prompt">${personalData[currentLanguage].prompt}</span>
        <input type="text" class="terminal-input" autocomplete="off">
      </form>
    </div>
  `;

  // Adicione estilos específicos
  const style = document.createElement('style');
  style.textContent = `
    .terminal-container {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.1);
      animation: terminal-glow 3s infinite ease-in-out;
    }
    
    .terminal-header {
      background-color: #2c3e50;
      padding: 10px 15px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .terminal-controls {
      display: flex;
      gap: 8px;
    }
    
    .terminal-control {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      cursor: pointer;
    }
    
    .terminal-control.close {
      background-color: #ff5f56;
    }
    
    .terminal-control.minimize {
      background-color: #ffbd2e;
    }
    
    .terminal-control.maximize {
      background-color: #27c93f;
    }
    
    .terminal-title {
      color: white;
      font-size: 14px;
      margin: 0 auto;
      opacity: 0.8;
      font-family: monospace;
    }
    
    .terminal-body {
      padding: 15px;
      height: 350px;
      overflow-y: auto;
      font-family: monospace;
      font-size: 14px;
      color: white;
      background-color: var(--dark-bg, #353949);
    }
    
    .terminal-line {
      margin-bottom: 8px;
    }
    
    .terminal-line.user {
      color: var(--secondary-color, #A8E6CF);
    }
    
    .terminal-line.system {
      white-space: pre-line;
    }
    
    .terminal-prompt {
      color: var(--primary-color, #4354BD);
      margin-right: 8px;
    }
    
    .terminal-form {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding: 10px 15px;
      display: flex;
      background-color: rgba(0, 0, 0, 0.2);
    }
    
    .terminal-input {
      flex-grow: 1;
      background-color: transparent;
      border: none;
      outline: none;
      color: white;
      font-family: monospace;
      font-size: 14px;
    }
    
    @keyframes terminal-glow {
      0% { box-shadow: 0 5px 15px rgba(67, 84, 189, 0.3); }
      50% { box-shadow: 0 5px 25px rgba(67, 84, 189, 0.6); }
      100% { box-shadow: 0 5px 15px rgba(67, 84, 189, 0.3); }
    }
  `;
  document.head.appendChild(style);

  // Obtenha referências aos elementos
  const terminalBody = terminalRoot.querySelector('.terminal-body');
  const terminalForm = terminalRoot.querySelector('.terminal-form');
  const terminalInput = terminalRoot.querySelector('.terminal-input');

  // Histórico do terminal
  let terminalHistory = [
    { text: personalData[currentLanguage].welcome, type: 'system' }
  ];

  // Função para adicionar linhas ao histórico do terminal
  function addToHistory(text, type) {
    terminalHistory.push({ text, type });

    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;

    if (type === 'user') {
      line.innerHTML = `<span class="terminal-prompt">${personalData[currentLanguage].prompt}</span> ${text}`;
    } else {
      // Para quebras de linha em respostas do sistema
      line.innerHTML = text.replace(/\n/g, '<br>');
    }

    terminalBody.appendChild(line);

    // Rolagem para o final
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // Processa o envio do formulário
  terminalForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const input = terminalInput.value.trim();
    if (!input) return;

    // Adiciona a entrada do usuário ao histórico
    addToHistory(input, 'user');

    // Processa a resposta
    const response = generateResponse(input, currentLanguage);

    // Limpa o terminal ou adiciona a resposta
    if (response === "CLEAR_COMMAND") {
      terminalBody.innerHTML = '';
      addToHistory(personalData[currentLanguage].cleared, 'system');
    } else {
      addToHistory(response, 'system');
    }

    // Limpa o input
    terminalInput.value = '';
  });

  // Foca no input do terminal quando ele é carregado
  terminalInput.focus();

  // Método global para atualizar o idioma
  window.updateTerminalLanguage = function(newLang) {
    currentLanguage = newLang;
    terminalForm.querySelector('.terminal-prompt').textContent = personalData[newLang].prompt;
  };
});
