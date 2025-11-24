require 'rails_helper'

RSpec.describe "Tasks", type: :request do
  describe "GET /tasks" do
    it "returns a list of tasks" do
      create_list(:task, 3)

      get "/tasks"

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)
      expect(json.size).to eq(3)
      expect(json.first).to include("id", "title", "status")
    end
  end

  describe "GET /tasks/:id" do
    it "returns a single task" do
      task = create(:task, title: "Important Task")

      get "/tasks/#{task.id}"

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)
      expect(json["id"]).to eq(task.id)
      expect(json["title"]).to eq("Important Task")
    end

    it "returns 404 when the task does not exist" do
      get "/tasks/999999"

      expect(response).to have_http_status(:not_found)
    end
  end

  describe "POST /tasks" do
    let(:valid_params) do
      {
        task: {
          title: "New Task",
          content: "Task details",
          status: "pending"
        }
      }
    end

    it "creates a task with valid params" do
      expect {
        post "/tasks", params: valid_params
      }.to change(Task, :count).by(1)

      expect(response).to have_http_status(:created)

      json = JSON.parse(response.body)
      expect(json["title"]).to eq("New Task")
      expect(json["status"]).to eq("pending")
    end

    it "returns errors with invalid params" do
      invalid_params = { task: { title: "" } }

      expect {
        post "/tasks", params: invalid_params
      }.not_to change(Task, :count)

      expect(response).to have_http_status(:unprocessable_content)

      json = JSON.parse(response.body)
      expect(json["errors"]).to include("title")
    end
  end

  describe "PATCH /tasks/:id" do
    let!(:task) { create(:task, title: "Old Title") }

    it "updates the task with valid params" do
      patch "/tasks/#{task.id}", params: { task: { title: "Updated Title" } }

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)
      expect(json["title"]).to eq("Updated Title")
      expect(task.reload.title).to eq("Updated Title")
    end

    it "returns errors with invalid params" do
      patch "/tasks/#{task.id}", params: { task: { title: "" } }

      expect(response).to have_http_status(:unprocessable_content)

      json = JSON.parse(response.body)
      expect(json["errors"]).to include("title")
    end
  end

  describe "DELETE /tasks/:id" do
    let!(:task) { create(:task) }

    it "deletes the task" do
      expect {
        delete "/tasks/#{task.id}"
      }.to change(Task, :count).by(-1)

      expect(response).to have_http_status(:no_content)
      expect(response.body).to be_blank
    end
  end
end
