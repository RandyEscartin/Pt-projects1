'use client'

import { useState } from 'react'

export default function TaskForm({ onSubmit, onCancel, initialData = null, isEditing = false }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    status: initialData?.status || 'pending',
    priority: initialData?.priority || 'medium',
    dueDate: initialData?.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    const submitData = {
      ...formData,
      dueDate: formData.dueDate || null
    }
    
    onSubmit(submitData)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return '⏳'
      case 'in-progress': return '🔄'
      case 'completed': return '✅'
      default: return '📝'
    }
  }

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'low': return '🟢'
      case 'medium': return '🟡'
      case 'high': return '🔴'
      default: return '⚪'
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
          <span className="text-3xl">
            {isEditing ? '✏️' : '✨'}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Task' : 'Create New Task'}
        </h3>
        <p className="text-gray-600 mt-2">
          {isEditing ? 'Update your task details below' : 'Fill in the details to create your new task'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <span className="mr-2">📝</span>
            Task Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`input text-lg ${errors.title ? 'border-red-500 ring-red-200' : 'focus:ring-blue-200'}`}
            placeholder="Enter a clear, descriptive title for your task..."
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <span className="mr-1">⚠️</span>
              {errors.title}
            </p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <span className="mr-2">📋</span>
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`input text-base ${errors.description ? 'border-red-500 ring-red-200' : 'focus:ring-blue-200'}`}
            placeholder="Provide detailed information about what needs to be done..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <span className="mr-1">⚠️</span>
              {errors.description}
            </p>
          )}
        </div>

        {/* Status, Priority, and Due Date */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <span className="mr-2">🎯</span>
              Status
            </label>
            <div className="relative">
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input appearance-none cursor-pointer"
              >
                <option value="pending">⏳ Pending</option>
                <option value="in-progress">🔄 In Progress</option>
                <option value="completed">✅ Completed</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-400">▼</span>
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span className="mr-2">{getStatusIcon(formData.status)}</span>
              <span className="capitalize">{formData.status}</span>
            </div>
          </div>

          {/* Priority */}
          <div>
            <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <span className="mr-2">🚨</span>
              Priority
            </label>
            <div className="relative">
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="input appearance-none cursor-pointer"
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-400">▼</span>
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span className="mr-2">{getPriorityIcon(formData.priority)}</span>
              <span className="capitalize">{formData.priority}</span>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <span className="mr-2">📅</span>
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="input cursor-pointer"
            />
            <div className="mt-2 text-sm text-gray-500">
              {formData.dueDate ? (
                <span className="flex items-center">
                  <span className="mr-2">📅</span>
                  Due: {new Date(formData.dueDate).toLocaleDateString()}
                </span>
              ) : (
                <span className="flex items-center">
                  <span className="mr-2">📅</span>
                  No due date set
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary px-8 py-3 text-base font-medium flex items-center"
          >
            <span className="mr-2">✕</span>
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary px-8 py-3 text-base font-medium flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
          >
            <span className="mr-2">
              {isEditing ? '💾' : '✨'}
            </span>
            {isEditing ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  )
}
