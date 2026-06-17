document.addEventListener("DOMContentLoaded", () => {

const screens = document.querySelectorAll(".screen");
const navButtons = document.querySelectorAll(".nav-item");
const moreMenu = document.getElementById("moreMenu");

function abrirTela(id) {

screens.forEach(screen => {
screen.classList.remove("active");
});

const tela = document.getElementById(id);

if(tela){
tela.classList.add("active");
}

navButtons.forEach(btn => {
btn.classList.remove("active");

if(btn.dataset.screen === id){
btn.classList.add("active");
}
});

window.scrollTo({
top:0,
behavior:"smooth"
});
}

navButtons.forEach(btn => {

btn.addEventListener("click", () => {

const tela = btn.dataset.screen;

if(tela === "mais"){

moreMenu.classList.toggle("hidden");

return;
}

moreMenu.classList.add("hidden");

abrirTela(tela);

});

});

document.querySelectorAll("[data-screen-go]").forEach(btn => {

btn.addEventListener("click", () => {

const tela = btn.dataset.screenGo;

moreMenu.classList.add("hidden");

abrirTela(tela);

});

});

const voucherForm = document.getElementById("voucherForm");

if(voucherForm){

voucherForm.addEventListener("submit", (e) => {

e.preventDefault();

const nome =
document.getElementById("clienteNome").value;

if(!nome){

alert("Informe o nome do cliente.");

return;

}

alert(
"Voucher salvo localmente.\n\nNa próxima etapa vamos conectar ao Supabase."
);

voucherForm.reset();

});

}

});
