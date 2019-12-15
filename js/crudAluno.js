//CRUD - funções

function cadastrar() {

  let form = document.querySelector('#form-aluno');

  let alunos = localStorage.alunos == null ? [] : JSON.parse(localStorage.alunos);

  let nome = document.querySelector("#aluno").value;
  let idade = document.querySelector("#idade").value;
  let serie = document.querySelector("#serie").value;
  let faltas = document.querySelector("#faltas").value;

  alunos.push({
    aluno: nome,
    idade: idade,
    serie: serie,
    faltas: faltas,
    situacao: faltas > 50 ? "Reprovado por faltas" : "Aprovado"
  });

  localStorage.alunos = JSON.stringify(alunos);

  listar();

  alert(`Dados do(a) aluno(a) ${nome} adicionados!`);

  form.reset();
}

function listar() {

  document.addEventListener('click', function (e) {

    e.preventDefault();

    let alunos = localStorage.alunos == null ? [] : JSON.parse(localStorage.alunos);

  let tabela = document.querySelector("#tbody-alunos");
  tabela.innerHTML = "";
  alunos.forEach(dados => {
    tabela.innerHTML += `
            <tr>
                <td>${dados.aluno}</td>
                <td>${dados.idade}</td>
                <td>${dados.serie}</td>
                <td>${dados.faltas}</td>
                <td>${dados.situacao}</td>
                <td>
                    <button id="botao-editar" onclick="editar(${dados.nome})">Editar</button>
                    <button id="botao-apagar" onclick="excluir(${dados.nome})">Excluir</button>
                </td>  
            </tr>
        `;
  });

  });
}

function editar(doc) {

  let alunos = localStorage.alunos == null ? [] : JSON.parse(localStorage.alunos);

  let nome = document.querySelector("#aluno");
  let idade = document.querySelector("#idade");
  let serie = document.querySelector("#serie");
  let faltas = document.querySelector("#faltas");
  let id = document.querySelector("#txtId");

  let botaoGuardar = document.querySelector("#cadastro");
  let botaoModificar = document.querySelector("#alterar");

  let resultado = alunos.find(e => e.nome === doc);
  let resultadoIndex = alunos.findIndex(e => e.nome === doc);

  if (resultado !== undefined) {

    botaoGuardar.style.display = "none";
    botaoModificar.style.display = "block";

    nome.value = resultado.aluno;
    idade.value = resultado.idade;
    serie.value = resultado.serie;
    faltas.value = resultado.faltas;

    id.value = resultadoIndex;

  } else {

    alert("Aluno(a) não encontrado(a)");
  }
}

function modificar() {

  let alunos = localStorage.alunos == null ? [] : JSON.parse(localStorage.alunos);
  let form = document.querySelector('#form-aluno');

  let nome = document.querySelector("#aluno").value;
  let idade = document.querySelector("#idade").value;
  let serie = document.querySelector("#serie").value;
  let faltas = document.querySelector("#faltas").value;
  let id = document.querySelector("#txtId").value;

  let botaoGuardar = document.querySelector("#cadastro");
  let botaoModificar = document.querySelector("#alterar");

  alunos[id].aluno = nome;
  alunos[id].idade = idade;
  alunos[id].serie = serie;
  alunos[id].faltas = faltas;
  alunos[id].situacao = faltas > 50 ? "Reprovado por faltas" : "Aprovado";

  botaoGuardar.style.display = "block";
  botaoModificar.style.display = "none";

  localStorage.alunos = JSON.stringify(alunos);

  listar();

  alert("Dados alterados!");

  form.reset();
}

function excluir(doc){

  let alunos = localStorage.alunos == null ? [] : JSON.parse(localStorage.alunos);

  let resultadoIndex = alunos.findIndex(e => e.nome === doc);

  if (resultadoIndex !== -1) {

    alunos.splice(resultadoIndex, 1);

    localStorage.alunos = JSON.stringify(alunos);

    listar();
  } else {
    alert("Aluno(a) não encontrado(a)");
  }
}
