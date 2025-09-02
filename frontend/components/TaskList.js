'use client'

import { useState } from 'react'

export default function TaskList({ tasks, onUpdate, onDelete, onEdit }) {
  const [editingTask, setEditingTask] = useState(null)

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleStatusChange = (taskId, newStatus) => {
    onUpdate(taskId, { status: newStatus })
  }

  const handleEdit = (task) => {
    setEditingTask(task)
  }

  const handleSaveEdit = (updatedData) => {
    onUpdate(editingTask._id, updatedData)
    setEditingTask(null)
  }

  const handleCancelEdit = () => {
    setEditingTask(null)
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No tasks found. Create your first task!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
          {editingTask?._id === task._id ? (
            <TaskForm
              initialData={task}
              isEditing={true}
              onSubmit={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          ) : (
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                <p className="text-gray-600 mt-1">{task.description}</p>
                
                <div className="flex items-center gap-2 mt-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  {task.dueDate && (
                    <span className="text-xs text-gray-500">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
                
                <div className="text-xs text-gray-400 mt-2">
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                  {task.updatedAt !== task.createdAt && (
                    <span className="ml-2">
                      Updated: {new Date(task.updatedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2 ml-4">
                {task.status !== 'completed' && (
                  <button
                    onClick={() => handleStatusChange(task._id, 'completed')}
                    className="btn btn-primary text-sm"
                  >
                    Complete
                  </button>
                )}
                
                <button
                  onClick={() => handleEdit(task)}
                  className="btn btn-secondary text-sm"
                >
                  Edit
                </button>
                
                <button
                  onClick={() => onDelete(task._id)}
                  className="btn btn-danger text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
