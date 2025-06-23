let contatos = JSON.parse(localStorage.getItem('contatos')) || [];

    window.onload = () => {
      contatos.forEach((contato, index) => {
        renderizarContato(contato.nome, contato.telefone, index);
      });
    };

    function adicionarContato() {
      const nome = document.getElementById('nome').value.trim();
      const telefone = document.getElementById('telefone').value.trim();

      if (!nome || !telefone) {
        alert("Preencha os dois campos!");
        return;
      }

      const novoContato = { nome, telefone };
      contatos.push(novoContato);
      localStorage.setItem('contatos', JSON.stringify(contatos));

      renderizarContato(nome, telefone, contatos.length - 1);
      document.getElementById('nome').value = '';
      document.getElementById('telefone').value = '';
    }

    function renderizarContato(nome, telefone, index) {
      const lista = document.getElementById('listaContatos');

      const contatoDiv = document.createElement('div');
      contatoDiv.className = 'contato';
      contatoDiv.id = `contato-${index}`;
      contatoDiv.innerHTML = `
      <div class="infos">
        <img src="imagens/usuario.png" />
        <strong>${nome}</strong>
        <div class="botoes">
          <img class="alter" src="imagens/editar.png" />
          <button class="editar" onclick="editarContato(${index})">EDITAR</button>
        </div>
      </div>
      <div class="infos">
        <img src="imagens/telefone.png" />
        <span>${telefone}</span>
        <div class="botoes">
          <img class="alter" src="imagens/lixeira.png" />
          <button class="excluir" onclick="excluirContato(${index})">EXCLUIR</button>
        </div>
      </div>
      `;
      lista.appendChild(contatoDiv);
    }

    function editarContato(index) {
      const novoNome = prompt("Novo nome:", contatos[index].nome);
      if (novoNome === null) return;

      const novoTelefone = prompt("Novo telefone:", contatos[index].telefone);
      if (novoTelefone === null) return;

      contatos[index].nome = novoNome.trim();
      contatos[index].telefone = novoTelefone.trim();
      localStorage.setItem('contatos', JSON.stringify(contatos));
      atualizarLista();
    }

    function excluirContato(index) {
      if (!confirm("Deseja excluir este contato?")) return;
      contatos.splice(index, 1);
      localStorage.setItem('contatos', JSON.stringify(contatos));
      atualizarLista();
    }

    function atualizarLista() {
      const lista = document.getElementById('listaContatos');
      lista.innerHTML = '<h3 style="width: 100%; text-align: center; margin-bottom: 10px;">Contatos Salvos</h3>';
      contatos.forEach((c, i) => renderizarContato(c.nome, c.telefone, i));
    }

    // Redimensionamento lateral
    const resizer = document.getElementById('resizer');
    const leftSide = document.getElementById('formulario');
    const rightSide = document.getElementById('listaContatos');
    const container = document.querySelector('.container');

    let isResizing = false;

    resizer.addEventListener('mousedown', () => {
      isResizing = true;
      document.body.style.cursor = 'col-resize';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isResizing) return;

      const minWidth = 200;
      const maxWidth = container.offsetWidth - 200;
      const newLeftWidth = e.clientX;

      if (newLeftWidth >= minWidth && newLeftWidth <= maxWidth) {
        leftSide.style.width = `${newLeftWidth}px`;
        rightSide.style.width = `${container.offsetWidth - newLeftWidth - resizer.offsetWidth}px`;
      }
    });

    document.addEventListener('mouseup', () => {
      isResizing = false;
      document.body.style.cursor = 'default';
    });