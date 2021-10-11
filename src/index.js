
const estacoesSaoPaulo = [
    'Estação 01', 'Estação 02', 'Estação 03', 'Estação 04', 'Estação 05',
    'Estação 06', 'Estação 07', 'Estação 08', 'Estação 09', 'Estação 10']

const estacoes = document.querySelector('#estacoes')

estacoesSaoPaulo.map((e) => {
    estacoes.innerHTML += `<option>${e}</option>`
})

const filialSantos = (dados) =>{

    const constainerTabSantos = document.getElementById('_constainer_tab_santos')
    
    dados.map((e) => {
        constainerTabSantos.innerHTML += `
        <div class="_resultados">
        <span class="_spn _funcionario">${e.nome}</span>
        <span class="_spn _escritorio">${e.filial}</span>
        <span class="_spn _stacao">${e.estacao}</span>
        <spsn class="_spn data">${e.data}</spsn>
        <button class="_editar">Editar</button>
        <button class="_excluir">Excluir</button>
        </div>
        `
    })
}


const filialSaoPaulo = (dados) => {
    const constainerTabSaoPaulo = document.getElementById('_constainer_tab_sao_paulo')
    // constainerTabSaoPaulo.innerHTML = ''
    dados.map((e) => {
        constainerTabSaoPaulo.innerHTML += `
                                <div class="_resultados">
                                    <span class="_spn _funcionario">${e.nome}</span>
                                    <span class="_spn _escritorio">${e.filial}</span>
                                    <span class="_spn _stacao">${e.estacao}</span>
                                    <spsn class="_spn data">${e.data}</spsn>
                                    <button class="_editar">Editar</button>
                                    <button class="_excluir">Excluir</button>
                                </div>
    `
    })
}

const enviar = document.getElementById('enviar')

const criarAgendamento = async (e) => {
    e.preventDefault()
    const { nome, escritorios, data, estacoes } = document.getElementById('_agendamento')

    console.log(nome.value, escritorios.value, data.value.split('-').reverse().join('/'), estacoes.value)

    let url = '/saopaSulo'

    if (escritorios.value == 'São Paulo') {
        url = '/saopaulo'
    } else if (escritorios.value == 'Santos') {
        url = '/santos'
    } else {
        return
    }

    const body = JSON.stringify({
        nome: nome.value,
        filial: escritorios.value,
        data: data.value,
        estacao: estacoes.value

    })

    const headers = new Headers()
    headers.append("Content-Type", "Application/json")

    const options = {
        method: 'POST',
        mode: 'cors',
        headers,
        body,
    }

    const request = new Request(`http://localhost:3000${url}/criar`, options)

    const resposta = await fetch(request)
    const dados = await resposta.json()
    console.log(dados)

    if (url == '/saopaulo') {
        filialSaoPaulo(dados)
    }
    else if (url == "/santos") {
        filialSantos(dados)
    }

}
enviar.addEventListener('click', criarAgendamento)

const buscarAgendamentosSaoPaulo = async () => {

    const request = new Request("http://localhost:3000/saopaulo")

    const resposta = await fetch(request)
    const dados = await resposta.json()
    console.log(dados)
    filialSaoPaulo(dados)
}

buscarAgendamentosSaoPaulo()


const buscarAgendamentosSantos = async () => {

    const requestn = new Request("http://localhost:3000/santos")

    const resposta = await fetch(requestn)
    const dados = await resposta.json()
    console.log(dados)
    filialSantos(dados)
}
buscarAgendamentosSantos()