'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import TaskForm from '../../../components/TaskForm'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

export default function TaskDetailPage() {
  const router = useRouter()
  const params = useParams()
  const taskId = params.id
  
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTask()
  }, [taskId])

  const fetchTask = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_BASE_URL}/tasks/${taskId}`)
      setTask(response.data.data)
    } catch (error) {
      console.error('Error fetching task:', error)
      setError('Task not found or failed to load')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (updatedData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, updatedData)
      setTask(response.data.data)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating task:', error)
      alert('Failed to update task. Please try again.')
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) {
      return
    }

    try {
      await axios.delete(`${API_BASE_URL}/tasks/${taskId}`)
      router.push('/')
    } catch (error) {
      console.error('Error deleting task:', error)
      alert('Failed to delete task. Please try again.')
    }
  }

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading task...</p>
        </div>
      </div>
    )
  }

  if (error || !task) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 text-lg">{error || 'Task not found'}</p>
        <button
          onClick={() => router.push('/')}
          className="btn btn-primary mt-4"
        >
          Back to Tasks
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{task.title}</h1>
            <p className="text-gray-600 mt-1">Task Details</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-secondary"
            >
              {isEditing ? 'Cancel Edit' : 'Edit Task'}
            </button>
            <button
              onClick={() => router.push('/')}
              className="btn btn-secondary"
            >
              Back to Tasks
            </button>
          </div>
        </div>
      </div>

      {isEditing ? (
        <TaskForm
          initialData={task}
          isEditing={true}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700">{task.description}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Status:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-500">Priority:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                
                {task.dueDate && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Due Date:</span>
                    <span className="ml-2 text-gray-700">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
                
                <div>
                  <span className="text-sm font-medium text-gray-500">Created:</span>
                  <span className="ml-2 text-gray-700">
                    {new Date(task.createdAt).toLocaleString()}
                  </span>
                </div>
                
                {task.updatedAt !== task.createdAt && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Last Updated:</span>
                    <span className="ml-2 text-gray-700">
                      {new Date(task.updatedAt).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {task.status !== 'completed' && (
                  <button
                    onClick={() => handleUpdate({ ...task, status: 'completed' })}
                    className="btn btn-primary"
                  >
                    Mark as Completed
                  </button>
                )}
                
                {task.status === 'pending' && (
                  <button
                    onClick={() => handleUpdate({ ...task, status: 'in-progress' })}
                    className="btn btn-secondary"
                  >
                    Start Progress
                  </button>
                )}
              </div>
              
              <button
                onClick={handleDelete}
                className="btn btn-danger"
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
