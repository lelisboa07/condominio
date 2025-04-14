// CADASTRO DE MORADOR

const form = document.querySelector('.form')
form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const bloco = document.getElementById('bloco').value;
    const apartamento = document.getElementById('apartamento').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const status = document.getElementById('status').value;

    const response = await fetch('http://localhost:3000/morador/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, bloco, apartamento, telefone, email, status })
    });

    const result = await response.json();

    if (result.success) {
        alert("Cadastro concluído!");
        window.location.href = 'listagem.html'
    } else {
        alert("Cadastro não concluído!");
    }
});


// CADASTRO DE VEÍCULO

const formCar = document.querySelector('.formCar')
formCar?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const placa = document.getElementById('placa').value;
    const modelo = document.getElementById('modelo').value;
    const cor = document.getElementById('cor').value;
    const box = document.getElementById('vaga').value;
    const morador_id = document.getElementById('morador_id').value;


    const response = await fetch('http://localhost:3000/veiculo/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ placa, modelo, cor, box, morador_id })
    });

    const result = await response.json();

    if (result.success) {
        alert("Cadastro do veículo concluído!");
        window.location.href = 'listagem.html'
    } else {
        alert("Erro ao cadastrar veículo!");
        console.log(result)
    }
});


// LISTAGEM

async function loadMorador() {
    const response = await fetch('http://localhost:3000/morador')
    const data = await response.json()
    const tbody = document.querySelector('.morador-tbody')
    tbody.innerHTML = ''

  
  
    data.morador.forEach(morador => {
      const row = document.createElement('tr')
      row.innerHTML = `
        <td>${morador.nome}</td>
        <td>${morador.bloco}</td>
        <td>${morador.apartamento}</td>
        <td>${morador.telefone}</td>
        <td>${morador.email}</td>
        <td>${morador.status}</td>
        <td>${morador.id}</td>
        <td>
        <button class='btn-edit-morador' onclick='editMorador(${morador.id})'>Editar</button>
          <button class='btn-delete-morador' onclick='deleteMorador(${morador.id})'>Excluir</button>
          <button class='btn-add-veiculo' onclick='addVeiculo(${morador.id});'>Novo veículo</button>
        </td>`
        
      tbody.appendChild(row)
    });
  }

function addVeiculo(moradorId) {
  localStorage.setItem("morador", moradorId);
  window.location.href = "carro.html";
}

async function deleteMorador(id) {
  await fetch(`http://localhost:3000/morador/${id}`, {
    method: 'DELETE'
  })
  loadMorador()
}

async function editMorador(id){
  const nome = prompt("Digite o novo nome: ")
  const bloco = prompt("Digite o novo bloco: ")
  const apartamento = prompt("Digite o novo apartamento: ")
  const telefone = prompt("Digite o novo telefone: ")
  const email = prompt("Digite o novo email: ")
  const status = prompt("Digite o seu status: ")

  await fetch(`http://localhost:3000/morador/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({nome, bloco, apartamento, telefone, email, status})
  })
  loadMorador()
}


async function loadVeiculo() {
  const response = await fetch('http://localhost:3000/veiculo')
  const data = await response.json()
  const tbody = document.querySelector('.veiculo-tbody')

  tbody.innerHTML = ''

  data.veiculo.forEach(veiculo => {
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>${veiculo.placa}</td>
      <td>${veiculo.modelo}</td>
      <td>${veiculo.cor}</td>
      <td>${veiculo.box}</td>
      <td>${veiculo.morador_id}</td>
      <td>
      
      <button class='btn-edit-veiculo' onclick='editVeiculo(${veiculo.id})'>Editar</button>
      <button class='btn-delete-veiculo' onclick='deleteVeiculo(${veiculo.id})'>Excluir</button>
        
  
      </td>`
      
    tbody.appendChild(row)
  });
}

async function deleteVeiculo(id) {
  await fetch(`http://localhost:3000/veiculo/${id}`, {
    method: 'DELETE'
  })
  loadVeiculo()
}

async function editVeiculo(id){
  const placa = prompt("Digite a nova placa: ")
  const modelo = prompt("Digite o novo modelo: ")
  const cor = prompt("Digite a nova cor: ")
  const box = prompt("Digite a nova vaga: ")

  await fetch(`http://localhost:3000/veiculo/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({placa, modelo, cor, box})
  })
  loadVeiculo()
}

window.onload = () => {
  loadMorador()
  loadVeiculo()
}