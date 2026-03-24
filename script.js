// Inicialização do EmailJS (Você precisará criar uma conta gratuita no emailjs.com)
(function() {
    emailjs.init("SEU_USER_ID_AQUI"); 
})();

let tempoSaida = 0;

function iniciarProva() {
    const nome = document.getElementById('nome').value;
    const matricula = document.getElementById('matricula').value;

    if(!nome || !matricula) return alert("Preencha seus dados!");

    document.getElementById('login-area').classList.add('hidden');
    document.getElementById('prova-area').classList.remove('hidden');
    document.getElementById('info-aluno').innerText = `Aluno: ${nome} | Matrícula: ${matricula}`;

    // Ativar Fullscreen (Anti-cola)
    document.documentElement.requestFullscreen().catch(e => console.log("Erro ao entrar em tela cheia"));
    carregarQuestoes();
}

// Bloqueios de Segurança
document.addEventListener('contextmenu', e => e.preventDefault()); // Bloqueia botão direito
document.addEventListener('keydown', e => {
    if(e.ctrlKey && (e.key === 'c' || e.key === 'v')) {
        e.preventDefault();
        alert("Cópia e cola não permitidos!");
    }
});

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        tempoSaida++;
        alert(`AVISO: Você saiu da aba da prova ${tempoSaida} vez(es). Isso será enviado ao professor.`);
    }
});

function carregarQuestoes() {
    const lista = JSON.parse(localStorage.getItem('questoes') || "[]");
    const container = document.getElementById('questoes-container');
    
    lista.forEach((q, index) => {
        container.innerHTML += `
            <div class="questao">
                <p><strong>${index + 1}. ${q.pergunta}</strong></p>
                ${q.opcoes.map((opt, i) => `
                    <label><input type="radio" name="q${index}" value="${String.fromCharCode(65+i)}"> ${opt}</label><br>
                `).join('')}
            </div>
        `;
    });
}

function finalizarProva() {
    const emailDestino = localStorage.getItem('emailProfessor') || "seu-email@exemplo.com";
    const nome = document.getElementById('nome').value;
    
    // Lógica simples de envio (Simulação via EmailJS)
    const templateParams = {
        to_email: emailDestino,
        from_name: "Sistema de Provas",
        message: `O aluno ${nome} (Matrícula: ${document.getElementById('matricula').value}) finalizou a prova. Infrações de saída: ${tempoSaida}`
    };

    alert("Enviando prova... Por favor, aguarde.");
    
    // No uso real, aqui dispararia o emailjs.send(...)
    console.log("Dados que seriam enviados:", templateParams);
    alert("Prova enviada com sucesso ao e-mail do professor!");
    location.reload();
}
