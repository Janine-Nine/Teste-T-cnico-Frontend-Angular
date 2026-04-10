const STORAGE_KEY = 'frontend_users_storage';
const defaultUsers = [
  {
    id: 1,
    nome: 'João Silva',
    email: 'joao@email.com',
    cpf: '12345678901',
    telefone: '(11) 99999-0001',
    tipoTelefone: 'Celular'
  },
  {
    id: 2,
    nome: 'Maria Souza',
    email: 'maria@email.com',
    cpf: '23456789012',
    telefone: '(21) 98888-0002',
    tipoTelefone: 'Residencial'
  },
  {
    id: 3,
    nome: 'Carlos Lima',
    email: 'carlos@email.com',
    cpf: '34567890123',
    telefone: '(31) 97777-0003',
    tipoTelefone: 'Comercial'
  }
];

const state = {
  users: [],
  filteredUsers: []
};

const elements = {
  appLoading: document.getElementById('app-loading'),
  progressBar: document.getElementById('progress-bar'),
  userTableBody: document.getElementById('userTableBody'),
  search: document.getElementById('search'),
  btnNovo: document.getElementById('btnNovo'),
  modal: document.getElementById('modal'),
  btnCloseModal: document.getElementById('btnCloseModal'),
  btnCancel: document.getElementById('btnCancel'),
  userForm: document.getElementById('userForm'),
  userId: document.getElementById('userId'),
  nome: document.getElementById('nome'),
  email: document.getElementById('email'),
  cpf: document.getElementById('cpf'),
  telefone: document.getElementById('telefone'),
  tipoTelefone: document.getElementById('tipoTelefone'),
  toastContainer: document.getElementById('toastContainer')
};

window.addEventListener('load', initApp);

function initApp() {
  bindEvents();
  loadUsers();
  setTimeout(() => hideLoader(), 500);
}

function bindEvents() {
  elements.btnNovo.addEventListener('click', openForm);
  elements.btnCloseModal.addEventListener('click', closeForm);
  elements.btnCancel.addEventListener('click', closeForm);
  elements.userForm.addEventListener('submit', handleFormSubmit);
  elements.search.addEventListener('input', handleSearch);
  elements.userTableBody.addEventListener('click', handleTableActions);
}

function hideLoader() {
  if (!elements.appLoading) return;
  elements.appLoading.classList.add('fade-out');
  setTimeout(() => elements.appLoading.remove(), 400);
}

function showProgress(value) {
  if (!elements.progressBar) return;
  elements.progressBar.style.width = `${value}%`;
}

function getSavedUsers() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
    return defaultUsers.slice();
  }

  try {
    return JSON.parse(saved);
  } catch (error) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
    return defaultUsers.slice();
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function loadUsers() {
  showProgress(20);
  state.users = getSavedUsers();
  state.filteredUsers = state.users.slice();
  renderTable();
  setTimeout(() => showProgress(100), 100);
  setTimeout(() => showProgress(0), 350);
}

function renderTable() {
  if (!elements.userTableBody) return;

  const users = state.filteredUsers;
  const emptyRow = `
    <tr>
      <td colspan="6" class="empty-state">Nenhum usuário encontrado.</td>
    </tr>
  `;

  elements.userTableBody.innerHTML = users.length
    ? users.map(user => createRow(user)).join('')
    : emptyRow;
}

function createRow(user) {
  return `
    <tr>
      <td>${user.nome}</td>
      <td>${user.email}</td>
      <td>${user.cpf}</td>
      <td>${user.telefone}</td>
      <td>${user.tipoTelefone}</td>
      <td>
        <div class="action-group">
          <button class="btn secondary" data-action="edit" data-id="${user.id}">Editar</button>
          <button class="btn danger" data-action="delete" data-id="${user.id}">Excluir</button>
        </div>
      </td>
    </tr>
  `;
}

function handleSearch(event) {
  const query = event.target.value.trim().toLowerCase();
  state.filteredUsers = state.users.filter(user => {
    return [user.nome, user.email, user.cpf, user.telefone, user.tipoTelefone]
      .some(value => value.toLowerCase().includes(query));
  });
  renderTable();
}

function handleTableActions(event) {
  const button = event.target.closest('button');
  if (!button) return;

  const action = button.dataset.action;
  const id = Number(button.dataset.id);

  if (action === 'edit') {
    editUser(id);
  }

  if (action === 'delete') {
    deleteUser(id);
  }
}

function openForm() {
  if (!elements.modal) return;
  clearForm();
  elements.modal.classList.add('open');
  elements.modal.setAttribute('aria-hidden', 'false');
  elements.nome.focus();
}

function closeForm() {
  if (!elements.modal) return;
  elements.modal.classList.remove('open');
  elements.modal.setAttribute('aria-hidden', 'true');
  clearForm();
}

function clearForm() {
  if (!elements.userForm) return;
  elements.userId.value = '';
  elements.nome.value = '';
  elements.email.value = '';
  elements.cpf.value = '';
  elements.telefone.value = '';
  elements.tipoTelefone.value = '';
}

function handleFormSubmit(event) {
  event.preventDefault();

  const id = Number(elements.userId.value);
  const user = {
    id: id || getNextId(),
    nome: elements.nome.value.trim(),
    email: elements.email.value.trim(),
    cpf: elements.cpf.value.trim(),
    telefone: elements.telefone.value.trim(),
    tipoTelefone: elements.tipoTelefone.value
  };

  const requiredFields = [user.nome, user.email, user.cpf, user.telefone, user.tipoTelefone];
  if (requiredFields.some(value => !value)) {
    showToast('Preencha todos os campos antes de salvar.', 'error');
    return;
  }

  if (id) {
    state.users = state.users.map(item => item.id === id ? user : item);
    showToast('Usuário atualizado com sucesso.', 'success');
  } else {
    state.users.push(user);
    showToast('Usuário adicionado com sucesso.', 'success');
  }

  saveUsers(state.users);
  state.filteredUsers = state.users.slice();
  renderTable();
  closeForm();
}

function getNextId() {
  return state.users.length ? Math.max(...state.users.map(item => item.id)) + 1 : 1;
}

function editUser(id) {
  const user = state.users.find(item => item.id === id);
  if (!user) return;

  elements.userId.value = String(user.id);
  elements.nome.value = user.nome;
  elements.email.value = user.email;
  elements.cpf.value = user.cpf;
  elements.telefone.value = user.telefone;
  elements.tipoTelefone.value = user.tipoTelefone;

  openForm();
}

function deleteUser(id) {
  const confirmDelete = confirm('Deseja realmente excluir este usuário?');
  if (!confirmDelete) return;

  state.users = state.users.filter(user => user.id !== id);
  saveUsers(state.users);
  state.filteredUsers = state.users.slice();
  renderTable();
  showToast('Usuário excluído com sucesso.', 'success');
}

function showToast(message, type = 'info') {
  if (!elements.toastContainer) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  elements.toastContainer.appendChild(toast);

  setTimeout(() => toast.classList.add('fade-out'), 2400);
  setTimeout(() => toast.remove(), 3000);
}
