// ======================
// NAVEGAÇÃO
// ======================

const screens = document.querySelectorAll(".screen");
const navButtons = document.querySelectorAll(".nav-item");

function showScreen(screenId){

    screens.forEach(screen=>{
        screen.classList.remove("active");
    });

    const target = document.getElementById(screenId);

    if(target){
        target.classList.add("active");
    }

    navButtons.forEach(btn=>{
        btn.classList.remove("active");

        if(btn.dataset.screen === screenId){
            btn.classList.add("active");
        }
    });
}

navButtons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        const screen = btn.dataset.screen;

        if(screen === "mais"){

            const menu = document.getElementById("moreMenu");

            if(menu){
                menu.classList.toggle("hidden");
            }

            return;
        }

        const menu = document.getElementById("moreMenu");

        if(menu){
            menu.classList.add("hidden");
        }

        showScreen(screen);

    });

});

document.querySelectorAll("[data-screen-go]").forEach(btn=>{

    btn.addEventListener("click",()=>{

        const target = btn.dataset.screenGo;

        showScreen(target);

        const menu = document.getElementById("moreMenu");

        if(menu){
            menu.classList.add("hidden");
        }

    });

});

// ======================
// PASSEIOS
// ======================

let passeios = [];

const adicionarPasseioBtn =
document.getElementById("adicionarPasseio");

if(adicionarPasseioBtn){

    adicionarPasseioBtn.addEventListener("click",()=>{

        const nome = prompt(
            "Digite o nome do passeio:"
        );

        if(!nome) return;

        passeios.push(nome);

        renderPasseios();

    });

}

function renderPasseios(){

    const lista =
    document.getElementById("listaPasseios");

    if(!lista) return;

    lista.innerHTML = "";

    passeios.forEach((item,index)=>{

        lista.innerHTML += `
        <div class="item">
            ${item}
        </div>
        `;

    });

}

// ======================
// TRANSLADOS
// ======================

let translados = [];

const adicionarTransladoBtn =
document.getElementById("adicionarTranslado");

if(adicionarTransladoBtn){

    adicionarTransladoBtn.addEventListener("click",()=>{

        const nome = prompt(
            "Digite o translado:"
        );

        if(!nome) return;

        translados.push(nome);

        renderTranslados();

    });

}

function renderTranslados(){

    const lista =
    document.getElementById("listaTranslados");

    if(!lista) return;

    lista.innerHTML = "";

    translados.forEach(item=>{

        lista.innerHTML += `
        <div class="item">
            ${item}
        </div>
        `;

    });

}

// ======================
// PRÉVIA DO VOUCHER
// ======================

const previewBtn =
document.getElementById("previewVoucher");

if(previewBtn){

    previewBtn.addEventListener("click",()=>{

        const nome =
        document.getElementById("clienteNome")?.value || "";

        const passageiros =
        document.getElementById("totalPassageiros")?.value || "";

        let passeiosHtml =
        passeios.length
        ? passeios.join("<br>")
        : "Nenhum";

        let transladosHtml =
        translados.length
        ? translados.join("<br>")
        : "Nenhum";

        const popup = document.createElement("div");

        popup.className = "popup";

        popup.innerHTML = `
        <div class="popup-card preview-card">

            <h2>Prévia do Voucher</h2>

            <p><strong>Cliente:</strong> ${nome}</p>

            <p>
            <strong>Passageiros:</strong>
            ${passageiros}
            </p>

            <hr><br>

            <p>
            <strong>Passeios:</strong>
            <br>
            ${passeiosHtml}
            </p>

            <br>

            <p>
            <strong>Translados:</strong>
            <br>
            ${transladosHtml}
            </p>

            <button id="fecharPreview">
            Fechar
            </button>

        </div>
        `;

        document.body.appendChild(popup);

        document
        .getElementById("fecharPreview")
        .onclick = ()=>{

            popup.remove();

        };

    });

}

// ======================
// POPUP OPERAÇÃO
// ======================

function mostrarOperacao(){

    const popup = document.createElement("div");

    popup.className = "popup";

    popup.innerHTML = `
    <div class="popup-card">

        <h2>🔔 Próxima Operação</h2>

        <p>
        Você possui uma operação agendada.
        </p>

        <button id="fecharOperacao">
        Entendi
        </button>

    </div>
    `;

    document.body.appendChild(popup);

    document
    .getElementById("fecharOperacao")
    .onclick = ()=>{

        popup.remove();

    };

}

const fecharAlerta =
document.getElementById("fecharAlerta");

if(fecharAlerta){

    fecharAlerta.onclick = ()=>{

        document
        .querySelector(".alert-card")
        ?.remove();

    };

}

// ======================
// SOM
// ======================

function tocarSom(){

    try{

        const audio =
        new Audio(
            "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
        );

        audio.play();

    }catch(e){}

}

// ======================
// INICIALIZAÇÃO
// ======================

setTimeout(()=>{

    const possuiOperacao = false;

    if(possuiOperacao){

        mostrarOperacao();

        tocarSom();

    }

},1500);
