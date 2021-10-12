

const filialSantos = async (dados) => {
    const constainerTabSantos = document.getElementById('_constainer_tab_santos')
    constainerTabSantos.innerHTML = ''
    await dados.map((e) => {
        constainerTabSantos.innerHTML += `
            <div class="_resultados">
                <span class="_spn _funcionario">${e.nome}</span>
                <span class="_spn _escritorio">${e.filial}</span>
                <span class="_spn _stacao">${e.estacao}</span>
                <spsn class="_spn data">${e.dataLabel}</spsn>
            </div>
        `
    })
}

const filialSaoPaulo = async (dados) => {
    const constainerTabSaoPaulo = document.getElementById('_constainer_tab_sao_paulo')
    constainerTabSaoPaulo.innerHTML = ''
    await dados.map((e) => {

        constainerTabSaoPaulo.innerHTML += `
            <div class="_resultados" id=${e._id}>
                <span class="_spn _funcionario">${e.nome}</span>
                <span class="_spn _escritorio">${e.filial}</span>
                <span class="_spn _stacao">${e.estacao}</span>
                <spsn class="_spn data">${e.dataLabel}</spsn>
            </div>
    `
    })
}

const enviar = document.getElementById('enviar')

const criarAgendamento = async (e) => {
    e.preventDefault()
    const { nome, escritorios, data, estacoes } = document.getElementById('_agendamento')

    // if (!nome.value
    //     || escritorios.value === 'Selecione um escriótorio'
    //     || !data.value
    //     || estacoes.value === 'Selecione uma estação') {
    //     alert('Todos os dados são obrigatórios')
    //     return
    // }

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

    const request = new Request(`https://landingpagenizael.herokuapp.com/criar`, options)
    const resposta = await fetch(request)
    const dados = await resposta.json()
    if (dados.status == 200) {
        buscarAgendamentos()
    } else {
        alert(dados.data)
    }
}

enviar.addEventListener('click', criarAgendamento)

const buscarAgendamentos = async () => {
    const request = new Request("https://landingpagenizael.herokuapp.com")
    const resposta = await fetch(request)
    const dados = await resposta.json()
    console.log(dados)
    const saoPaulo = dados.filter((e) => e.filial === 'São Paulo')
    filialSaoPaulo(saoPaulo)
    const santos = dados.filter((e) => e.filial === 'Santos')
    filialSantos(santos)
}

buscarAgendamentos()



const estacoes = (dados) => {
    const estacoes = document.querySelector('#estacoes')

    dados.map((e) => {
        estacoes.innerHTML += `<option>${e.nome}</option>`
    })
}



const buscaEstcaoes = async () => {
    const request = new Request("https://landingpagenizael.herokuapp.com/estacao")
    const resposta = await fetch(request)
    const dados = await resposta.json()
    console.log(dados)
    estacoes(dados)
}

buscaEstcaoes()