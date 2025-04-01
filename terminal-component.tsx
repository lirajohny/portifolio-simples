import React, { useState, useEffect, useRef } from 'react';

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

// Função para processar perguntas e gerar respostas
const generateResponse = (input, lang) => {
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
};

const Terminal = ({ language = 'pt-br' }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // Inicializa o histórico com a mensagem de boas-vindas quando o componente é montado
  // ou quando o idioma muda
  useEffect(() => {
    setHistory([{
      text: personalData[language].welcome,
      type: 'system'
    }]);
  }, [language]);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focar no input quando o terminal é aberto
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Adiciona a pergunta do usuário ao histórico
    const newHistory = [...history, { text: input, type: 'user' }];

    // Processa a resposta
    const response = generateResponse(input.trim(), language);

    // Se for comando para limpar, reinicia o histórico
    if (response === "CLEAR_COMMAND") {
      setHistory([{ text: personalData[language].cleared, type: 'system' }]);
    } else {
      // Adiciona a resposta ao histórico
      setHistory([...newHistory, { text: response, type: 'system' }]);
    }

    // Limpa o input
    setInput('');
  };

  return (
    <>
      <button
        className="terminal-toggle"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: 'var(--primary-color)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--border-radius)',
          padding: '10px 15px',
          boxShadow: 'var(--box-shadow)',
          cursor: 'pointer',
          zIndex: 100,
          fontWeight: 500,
          transition: 'var(--transition)'
        }}
      >
        {isOpen ? 'Fechar Terminal' : 'Terminal Interativo'}
      </button>

      {isOpen && (
        <div
          className="terminal-container"
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '400px',
            maxWidth: '90vw',
            backgroundColor: 'var(--dark-bg)',
            borderRadius: 'var(--border-radius)',
            overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
            zIndex: 100,
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Barra de título do terminal */}
          <div
            className="terminal-header"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              padding: '10px 15px',
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div
              className="terminal-controls"
              style={{
                display: 'flex',
                gap: '8px'
              }}
            >
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#ff5f56'
              }}></div>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#ffbd2e'
              }}></div>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#27c93f'
              }}></div>
            </div>
            <div
              className="terminal-title"
              style={{
                color: 'white',
                fontSize: '14px',
                margin: '0 auto',
                opacity: 0.8
              }}
            >
              ~/johny-lira-terminal
            </div>
          </div>

          {/* Área de histórico do terminal */}
          <div
            ref={terminalRef}
            className="terminal-body"
            style={{
              padding: '15px',
              height: '300px',
              overflowY: 'auto',
              fontFamily: 'monospace',
              fontSize: '14px',
              color: 'white',
              backgroundColor: 'var(--dark-bg)'
            }}
          >
            {history.map((item, index) => (
              <div key={index} style={{ marginBottom: '8px' }}>
                {item.type === 'user' ? (
                  <div style={{ color: 'var(--secondary-color)' }}>
                    <span style={{ color: 'var(--primary-color)' }}>
                      {personalData[language].prompt}
                    </span> {item.text}
                  </div>
                ) : (
                  <div style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    {item.text.split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Área de input do terminal */}
          <form
            onSubmit={handleSubmit}
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '10px 15px',
              display: 'flex',
              backgroundColor: 'rgba(0, 0, 0, 0.2)'
            }}
          >
            <span style={{
              color: 'var(--primary-color)',
              marginRight: '8px',
              fontFamily: 'monospace'
            }}>
              {personalData[language].prompt}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flexGrow: 1,
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'white',
                fontFamily: 'monospace',
                fontSize: '14px'
              }}
              autoFocus
            />
          </form>
        </div>
      )}
    </>
  );
};

export default Terminal;
