//CRUD - funções

let botaoAdiciona = $("#cadastro");
let formAluno = $("#form-aluno");
let botaoModifica = $("#alterar");

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


  formAluno[0].reset();
}


function listar() {

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
                   <!-- <input type="submit" id="botao-editar" value=""Editar /> -->
                    <button id="botao-apagar" onclick="excluir(${dados.nome})">Excluir</button>
                   <!-- <input type="submit" id="botao-apagar" value="Excluir" /> -->
                </td>  
            </tr>
        `);
  });
}

function editar(doc) {

  let alunos = localStorage.alunos == null ? [] : JSON.parse(localStorage.alunos);

  let nome = $("#aluno");
  let idade = $("#idade");
  let serie = $("#serie");
  let faltas = $("#faltas");
  let id = $("#txtId");

  let resultado = alunos.find(e => e.nome === doc);
  let resultadoIndex = alunos.findIndex(e => e.nome === doc);

  if (resultado !== undefined) {

    botaoAdiciona.hide();
    botaoModifica.show();

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

  let aluno = $("#aluno").val();
  let idade = $("#idade").val();
  let serie = $("#serie").val();
  let faltas = $("#faltas").val();
  let id = $("#txtId").val();

  alunos[id].aluno = aluno;
  alunos[id].idade = idade;
  alunos[id].serie = serie;
  alunos[id].faltas = faltas;
  alunos[id].situacao = faltas > 50 ? "Reprovado por faltas" : "Aprovado";

  botaoAdiciona.show();
  botaoModifica.hide();

  localStorage.alunos = JSON.stringify(alunos);

  listar();

  alert("Dados alterados!");

  formAluno[0].reset();
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