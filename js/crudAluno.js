//CRUD - funções

function cadastrar() {



  let alunos = localStorage.alunos == null ? [] : JSON.parse(localStorage.alunos);

  let nome = $("#aluno").val();
  let idade = $("#idade").val();
  let serie = $("#serie").val();
  let faltas = $("#faltas").val();

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

  $("#form-aluno")[0].reset();
}

function listar() {

  document.addEventListener('click', function (e) {

    e.preventDefault();

    let alunos = localStorage.alunos == null ? [] : JSON.parse(localStorage.alunos);

  let tabela = $("#tbody-alunos");
  tabela.html("");
  alunos.forEach(dados => {
    tabela.append(`
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
        `);
  });

  });
}

function editar(doc) {

  let alunos = localStorage.alunos == null ? [] : JSON.parse(localStorage.alunos);

  let nome = $("#aluno");
  let idade = $("#idade");
  let serie = $("#serie");
  let faltas = $("#faltas");
  let id = $("#txtId");

  let botaoGuardar = $("#cadastro");
  let botaoModificar = $("#alterar");

  let resultado = alunos.find(e => e.nome === doc);
  let resultadoIndex = alunos.findIndex(e => e.nome === doc);

  if (resultado !== undefined) {

    botaoGuardar.hide();
    botaoModificar.show();

    nome.val(resultado.aluno);
    idade.val(resultado.idade);
    serie.val(resultado.serie);
    faltas.val(resultado.faltas);

    id.val(resultadoIndex);

  } else {

    alert("Aluno(a) não encontrado(a)");
  }
}

function modificar() {

  let alunos = localStorage.alunos == null ? [] : JSON.parse(localStorage.alunos);
  // let form = $('#form-aluno');

  let nome = $("#aluno").val();
  let idade = $("#idade").val();
  let serie = $("#serie").val();
  let faltas = $("#faltas").val();
  let id = $("#txtId").val();

  let botaoGuardar = $("#cadastro");
  let botaoModificar = $("#alterar");

  alunos[id].aluno = nome;
  alunos[id].idade = idade;
  alunos[id].serie = serie;
  alunos[id].faltas = faltas;
  alunos[id].situacao = faltas > 50 ? "Reprovado por faltas" : "Aprovado";

  botaoGuardar.show();
  botaoModificar.hide();

  localStorage.alunos = JSON.stringify(alunos);

  listar();

  alert("Dados alterados!");

  $("#form-aluno")[0].reset();
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
