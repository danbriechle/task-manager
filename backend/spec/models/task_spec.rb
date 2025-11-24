require 'rails_helper'

RSpec.describe Task, type: :model do
  describe 'enums' do
    it 'defines the correct statuses' do
      expect(described_class.statuses).to eq(
        'pending' => 0,
        'in_progress' => 1,
        'blocked' => 2,
        'completed' => 3
      )
    end
  end

  describe 'validations' do
    it 'is valid with the factory' do
      expect(build(:task)).to be_valid
    end

    it 'is invalid without a title' do
      task = build(:task, title: nil)
      expect(task).not_to be_valid
      expect(task.errors[:title]).to include("can't be blank")
    end

    it 'is invalid when the title is longer than 120 characters' do
      long_title = 'a' * 121
      task = build(:task, title: long_title)
      expect(task).not_to be_valid
      expect(task.errors[:title]).to include('is too long (maximum is 120 characters)')
    end
  end

  describe 'status behavior' do
    it 'defaults to pending' do
      task = build(:task)
      expect(task.status).to eq('pending')
    end

    it 'allows transitioning to in_progress' do
      task = create(:task)
      task.in_progress!
      expect(task.status).to eq('in_progress')
    end

    it 'allows transitioning to completed' do
      task = create(:task)
      task.completed!
      expect(task.status).to eq('completed')
    end
  end
end
