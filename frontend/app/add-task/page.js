'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TaskForm from '../../components/TaskForm'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

export default function AddTaskPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (taskData) => {
    try {
      setLoading(true)
      await axios.post(`${API_BASE_URL}/tasks`, taskData)
      router.push('/')
    } catch (error) {
      console.error('Error creating task:', error)
      alert('Failed to create task. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.push('/')
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
          <span className="text-4xl">✨</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Create New Task
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Add a new task to your productivity dashboard. Fill in the details below to get started on your next goal.
        </p>
      </div>
      
      {/* Task Form */}
      <div className="animate-fadeIn">
        <TaskForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isEditing={false}
        />
      </div>
      
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm mx-4">
            <div className="flex items-center space-x-4">
              <div className="spinner w-8 h-8"></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Creating Task</h3>
                <p className="text-gray-600">Please wait while we save your task...</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Back to Dashboard Link */}
      <div className="text-center mt-8">
        <button
          onClick={() => router.push('/')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <span className="mr-2">←</span>
          Back to Dashboard
        </button>
      </div>
    </div>
  )
}
