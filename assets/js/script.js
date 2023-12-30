document.addEventListener('DOMContentLoaded', function () {
    // Ao carregar a página, chama a função para obter um título aleatório relacionado à tecnologia e carregar o conteúdo
    loadRandomTechPage();
});

function loadRandomTechPage() {
    // Faz uma solicitação para a API da Wikipedia para obter a lista de páginas em uma categoria (por exemplo, Technology)
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=categorymembers&cmtitle=Category:Technology&origin=*', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            var pages = data.query.categorymembers;
            
            // Escolhe aleatoriamente uma página da lista
            var randomPageIndex = Math.floor(Math.random() * pages.length);
            var pageTitle = pages[randomPageIndex].title;

            // Com o título aleatório relacionado à tecnologia, carrega o conteúdo da página
            loadWikipediaContent(pageTitle);
        }
    };
    xhr.send();
}

function loadWikipediaContent(title) {
    // Faz uma solicitação para a API da Wikipedia para obter o conteúdo do artigo
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://en.wikipedia.org/w/api.php?action=parse&format=json&page=' + encodeURIComponent(title) + '&origin=*', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            var content = data.parse.text['*'];

            // Atualiza a seção 'main' com o conteúdo do artigo
            var contentElement = document.querySelector('.main');
            contentElement.innerHTML = "<div id='random-article'><h1><a href='https://en.wikipedia.org/wiki/" + encodeURIComponent(title) + "' target='_blank'>" + title + "</a></h1>" + content;

            // Corrige o caminho das imagens para exibir corretamente
            contentElement.innerHTML = contentElement.innerHTML.replace(/src="\/\//g, 'src="https://');

            // Adiciona o protocolo HTTPS às URLs de imagens que começam com "//"
            contentElement.innerHTML = contentElement.innerHTML.replace(/src="\/\//g, 'src="https://');

            // Adiciona o protocolo HTTPS às URLs de links que começam com "//"
            contentElement.innerHTML = contentElement.innerHTML.replace(/href="\/\//g, 'href="https://');
        }
    };
    xhr.send();
}
