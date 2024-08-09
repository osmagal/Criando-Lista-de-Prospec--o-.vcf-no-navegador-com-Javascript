//Copie esse código
//Acesse o GMaps https://maps.google.com/
//Faça sua busca pressione F12
//Clique em Console
//Cole-o no Console do Navegador
//Mantenha a página aberta para que os dados possam ser baixados
//Esse código não foi testado em todos os navegadores, testado apenas no Chrome e no Edge para Desktop.
//Feito especialmente para uso de Listas no MetaBusiness

function criarArquivoTxtEDownload(conteudo, nomeArquivo) {
    // Cria um Blob com o conteúdo do arquivo de texto
    const blob = new Blob([conteudo], { type: 'text/plain' });

    // Cria um URL para o Blob
    const url = window.URL.createObjectURL(blob);

    // Cria um link de download
    const linkDownload = document.createElement('a');
    linkDownload.href = url;
    linkDownload.download = nomeArquivo;

    // Adiciona o link à página (é necessário para alguns navegadores)
    document.body.appendChild(linkDownload);

    // Dispara o clique no link automaticamente
    linkDownload.click();

    // Remove o link da página
    document.body.removeChild(linkDownload);

    // Limpa o URL do Blob
    window.URL.revokeObjectURL(url);
}

function extrairDadosContato() {
    const contatos = document.querySelectorAll('.UaQhfb');

    const dadosContato = Array.from(contatos).map(contato => {
        const nomes = Array.from(contato.querySelectorAll('.qBF1Pd')).map(nome => nome.textContent.trim());
        const telefones = Array.from(contato.querySelectorAll('.UsdlK')).map(telefone => telefone.textContent.trim());
        
        return {
            nomes: nomes,
            telefones: telefones
        };
    });

const busca = document.querySelectorAll('.searchboxinput')[0].value;
let conteudoArquivo = "fn,phone,ct,st,country,gen\n";
const nomeArquivo = busca + '.csv';
let ct = 'Curitiba';
let st = 'PR';
let country = 'BR';
let gen = 'F';

// Escrever arquivo
dadosContato.forEach(contato => {
	// Verifica se os dados de nome e telefone estão presentes e são válidos
    if (contato.nomes && contato.nomes[0] && contato.telefones && contato.telefones[0]) {
        // Formata o telefone removendo parênteses, hífen e espaços
        let telefoneFormatado = '+55' + contato.telefones[0].replace(/[\(\)\-\s]/g, '');
        
        // Concatena as informações no formato correto
        //conteudoArquivo += contato.nomes[0] + ',' + telefoneFormatado + ',' + ct + ',' + st + ',' + country + ',' + gen + '\n';
	conteudoArquivo += telefoneFormatado + ',' + ct + ',' + st + ',' + country + ',' + gen + '\n';
    }
});

criarArquivoTxtEDownload(conteudoArquivo, nomeArquivo);
    //console.log(conteudoArquivo);

}

// Função para rolar automaticamente o scroll
function rolarScroll() {
    // Selecione o contêiner que você deseja rolar
    const container =  document.querySelector('#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd');
    
    // Verifique se o contêiner existe e se o scroll ainda não atingiu o final
    if (container && container.scrollHeight > container.clientHeight + container.scrollTop) {
        container.scrollTop += 800; // Ajuste o valor conforme necessário para controlar a quantidade de rolagem
    } else {
        clearInterval(scrollInterval); // Pare o intervalo quando o scroll chegar ao final

	//chamada para extração dos dados
	extrairDadosContato();
    }
}

// Defina um intervalo para chamar a função de rolagem automaticamente a cada 1000 milissegundos (1 segundo)
const scrollInterval = setInterval(rolarScroll, 3000);
