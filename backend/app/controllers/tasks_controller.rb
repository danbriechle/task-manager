class TasksController < ApplicationController
  before_action :set_task, only: %i[show update destroy]

  def index
    tasks = Task.all.order(created_at: :desc)
    render json: tasks, status: :ok
  end

  def show
    render json: @task, status: :ok
  end

  def create
    task = Task.new(task_params)

    if task.save
      render json: task, status: :created
    else
      render json: { errors: task.errors.to_hash }, status: :unprocessable_content
    end
  end

  def update
    if @task.update(task_params)
      render json: @task, status: :ok
    else
      render json: { errors: @task.errors.to_hash }, status: :unprocessable_content
    end
  end

  def destroy
    @task.destroy
    head :no_content
  end

  private

  def set_task
    @task = Task.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    head :not_found
  end

  def task_params
    params.require(:task).permit(
      :title,
      :content,
      :status,
      :due_at
    )
  end
end
