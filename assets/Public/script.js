// Dados simulados para usuários
let users = JSON.parse(localStorage.getItem('users')) || [
    { id: 1, nome: 'João Silva', email: 'joao@example.com', cpf: '123.456.789-00', telefone: '(11) 99999-9999', dataNascimento: '1990-01-01' },
    { id: 2, nome: 'Maria Santos', email: 'maria@example.com', cpf: '987.654.321-00', telefone: '(21) 88888-8888', dataNascimento: '1985-05-15' },
    { id: 3, nome: 'Pedro Oliveira', email: 'pedro@example.com', cpf: '456.789.123-00', telefone: '(31) 77777-7777', dataNascimento: '1992-10-20' }
];

// Elementos DOM
const userTableBody = document.getElementById('userTableBody');
const searchInput = document.getElementById('searchInput');
const addUserBtn = document.getElementById('addUserBtn');
const userModal = document.getElementById('userModal');
const userForm = document.getElementById('userForm');
const modalTitle = document.getElementById('modalTitle');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelBtn = document.getElementById('cancelBtn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Estado do modal
let isEditing = false;
let editingUserId = null;

// Funções utilitárias
function formatCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatTelefone(telefone) {
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

function formatData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

function saveToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users));
}

// Renderizar tabela de usuários
function renderUsers(filteredUsers = users) {
    userTableBody.innerHTML = '';
    filteredUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.nome}</td>
            <td>${user.email}</td>
            <td>${formatCPF(user.cpf)}</td>
            <td>${formatTelefone(user.telefone)}</td>
            <td>${formatData(user.dataNascimento)}</td>
            <td>
                <button class="btn btn-edit" onclick="editUser(${user.id})">Editar</button>
                <button class="btn btn-delete" onclick="deleteUser(${user.id})">Excluir</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

// Filtrar usuários
function filterUsers() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredUsers = users.filter(user =>
        user.nome.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.cpf.includes(searchTerm)
    );
    renderUsers(filteredUsers);
}

// Abrir modal para adicionar usuário
function openAddUserModal() {
    isEditing = false;
    editingUserId = null;
    modalTitle.textContent = 'Adicionar Usuário';
    userForm.reset();
    userModal.style.display = 'block';
}

// Abrir modal para editar usuário
function editUser(id) {
    const user = users.find(u => u.id === id);
    if (user) {
        isEditing = true;
        editingUserId = id;
        modalTitle.textContent = 'Editar Usuário';
        document.getElementById('nome').value = user.nome;
        document.getElementById('email').value = user.email;
        document.getElementById('cpf').value = user.cpf.replace(/\D/g, '');
        document.getElementById('telefone').value = user.telefone.replace(/\D/g, '');
        document.getElementById('dataNascimento').value = user.dataNascimento;
        userModal.style.display = 'block';
    }
}

// Fechar modal
function closeModal() {
    userModal.style.display = 'none';
    userForm.reset();
}

// Salvar usuário
function saveUser(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    const telefone = document.getElementById('telefone').value.replace(/\D/g, '');
    const dataNascimento = document.getElementById('dataNascimento').value;

    // Validações básicas
    if (!nome || !email || !cpf || !telefone || !dataNascimento) {
        showToast('Todos os campos são obrigatórios.', 'error');
        return;
    }

    if (cpf.length !== 11) {
        showToast('CPF deve ter 11 dígitos.', 'error');
        return;
    }

    if (telefone.length !== 11) {
        showToast('Telefone deve ter 11 dígitos.', 'error');
        return;
    }

    // Verificar CPF único
    const existingUser = users.find(u => u.cpf === cpf && u.id !== editingUserId);
    if (existingUser) {
        showToast('CPF já cadastrado.', 'error');
        return;
    }

    const userData = {
        nome,
        email,
        cpf,
        telefone,
        dataNascimento
    };

    if (isEditing) {
        // Atualizar usuário existente
        const index = users.findIndex(u => u.id === editingUserId);
        if (index !== -1) {
            users[index] = { ...users[index], ...userData };
            showToast('Usuário atualizado com sucesso!');
        }
    } else {
        // Adicionar novo usuário
        const newId = Math.max(...users.map(u => u.id), 0) + 1;
        users.push({ id: newId, ...userData });
        showToast('Usuário adicionado com sucesso!');
    }

    saveToLocalStorage();
    renderUsers();
    closeModal();
}

// Excluir usuário
function deleteUser(id) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        users = users.filter(u => u.id !== id);
        saveToLocalStorage();
        renderUsers();
        showToast('Usuário excluído com sucesso!');
    }
}

// Máscaras para inputs
function applyMask(input, maskFunction) {
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        e.target.value = maskFunction(value);
    });
}

function maskCPF(value) {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4').substr(0, 14);
}

function maskTelefone(value) {
    return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3').substr(0, 15);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    renderUsers();

    searchInput.addEventListener('input', filterUsers);
    addUserBtn.addEventListener('click', openAddUserModal);
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    userForm.addEventListener('submit', saveUser);

    // Fechar modal ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === userModal) {
            closeModal();
        }
    });

    // Aplicar máscaras
    applyMask(document.getElementById('cpf'), maskCPF);
    applyMask(document.getElementById('telefone'), maskTelefone);
});
