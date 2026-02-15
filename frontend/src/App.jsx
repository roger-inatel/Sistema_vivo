import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/users'

function App() {
  const [users, setUsers] = useState([])
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [notification, setNotification] = useState(null)

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await axios.get(API_URL)
      setUsers(res.data)
    } catch (err) {
      showNotification('Erro ao carregar usuários. Verifique se a API está rodando!', 'error')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.name.length < 3) {
      showNotification('Nome deve ter no mínimo 3 caracteres', 'error')
      return
    }

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData)
        showNotification('Usuário atualizado! ✨', 'success')
        setEditingId(null)
      } else {
        await axios.post(API_URL, formData)
        showNotification('Usuário cadastrado! 🎉', 'success')
      }
      
      setFormData({ name: '', email: '', phone: '' })
      fetchUsers()
    } catch (err) {
      const errorMsg = err.response?.data?.errors?.join(', ') || 'Erro ao salvar usuário'
      showNotification(errorMsg, 'error')
    }
  }

  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email, phone: user.phone || '' })
    setEditingId(user.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancel = () => {
    setFormData({ name: '', email: '', phone: '' })
    setEditingId(null)
  }

  const deleteUser = async (id) => {
    if (window.confirm("Deseja realmente excluir este usuário?")) {
      try {
        await axios.delete(`${API_URL}/${id}`)
        showNotification('Usuário removido! 🗑️', 'success')
        fetchUsers()
      } catch (err) {
        showNotification('Erro ao excluir usuário', 'error')
      }
    }
  }

  return (
    <div className="app-container">
      <div className="background-gradient"></div>
      <div className="background-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {notification && (
        <div className={`notification ${notification.type}`}>
          <span className="notification-icon">
            {notification.type === 'success' ? '✓' : '⚠'}
          </span>
          {notification.message}
        </div>
      )}

      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">👥</div>
            <div>
              <h1 className="title">UserHub</h1>
              <p className="subtitle">Gerenciamento Moderno de Usuários</p>
            </div>
          </div>
          <div className="status-badge">
            <span className="status-dot"></span>
            {users.length} {users.length === 1 ? 'usuário' : 'usuários'}
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="card form-card">
          <div className="card-header">
            <h2 className="card-title">
              {editingId ? '✏️ Editar Usuário' : '✨ Novo Usuário'}
            </h2>
            {editingId && (
              <button onClick={handleCancel} className="btn-cancel-edit">✕</button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label className="form-label">Nome completo</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ex: João Silva"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="joao@email.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Telefone <span className="optional">(opcional)</span></label>
              <input
                type="tel"
                className="form-input"
                placeholder="(11) 98765-4321"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? '💾 Atualizar' : '➕ Cadastrar'}
              </button>
              {editingId && (
                <button type="button" onClick={handleCancel} className="btn btn-secondary">
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="users-section">
          <h2 className="section-title">👥 Pessoas Cadastradas</h2>

          {loading ? (
            <div className="loading-container">
              <div className="loader"></div>
              <p>Carregando usuários...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>Nenhum usuário ainda</h3>
              <p>Adicione o primeiro usuário acima para começar!</p>
            </div>
          ) : (
            <div className="users-grid">
              {users.map((user, index) => (
                <div 
                  key={user.id} 
                  className="user-card"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="user-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  
                  <div className="user-info">
                    <h3 className="user-name">{user.name}</h3>
                    <p className="user-email">✉️ {user.email}</p>
                    {user.phone && (
                      <p className="user-phone">📱 {user.phone}</p>
                    )}
                  </div>

                  <div className="user-actions">
                    <button 
                      onClick={() => handleEdit(user)}
                      className="btn-icon btn-edit"
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => deleteUser(user.id)}
                      className="btn-icon btn-delete"
                      title="Excluir"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>Feito com 💜 usando React + Vite + Axios</p>
      </footer>
    </div>
  )
}

export default App